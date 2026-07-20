import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  // Only accept POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed. Use POST." });
  }

  try {
    const payload = req.body || {};
    console.log("Received Tracking Webhook payload:", JSON.stringify(payload));

    // Extract fields from webhook payload
    const rawStatus = String(
      payload.current_status || payload.status || payload.shipment_status || ""
    ).trim().toUpperCase();

    const awbCode = String(
      payload.awb || payload.awb_code || payload.tracking_number || ""
    ).trim();

    const orderIdRaw = String(
      payload.order_id || payload.channel_order_id || ""
    ).trim();

    if (!rawStatus && !awbCode && !orderIdRaw) {
      return res.status(400).json({ error: "Invalid payload: missing status, AWB, or order_id." });
    }

    // Map status to Supabase order status
    let targetStatus = null;
    if (rawStatus.includes("DELIVERED") && !rawStatus.includes("RTO")) {
      targetStatus = "delivered";
    } else if (
      rawStatus.includes("SHIPPED") ||
      rawStatus.includes("IN TRANSIT") ||
      rawStatus.includes("OUT FOR DELIVERY") ||
      rawStatus.includes("DISPATCHED")
    ) {
      targetStatus = "shipped";
    } else if (rawStatus.includes("CANCEL") || rawStatus.includes("RTO")) {
      targetStatus = "cancelled";
    }

    if (!targetStatus) {
      return res.status(200).json({
        success: true,
        message: `Status '${rawStatus}' received but no update required.`
      });
    }

    // Initialize Supabase client
    const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Supabase credentials missing in environment configuration.");
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Search for order in Supabase
    let matchedOrder = null;

    // 1. Search by Order ID if available
    if (orderIdRaw) {
      const parsedId = parseInt(orderIdRaw, 10);
      if (!isNaN(parsedId)) {
        const { data } = await supabase
          .from("orders")
          .select("id, status")
          .eq("id", parsedId)
          .maybeSingle();

        if (data) matchedOrder = data;
      }
    }

    // 2. Search by AWB code if not matched by ID
    if (!matchedOrder && awbCode) {
      const { data } = await supabase
        .from("orders")
        .select("id, status")
        .filter("shipping_address->>awb_code", "eq", awbCode)
        .maybeSingle();

      if (data) matchedOrder = data;
    }

    if (!matchedOrder) {
      console.warn(`Webhook received for AWB '${awbCode}' / Order '${orderIdRaw}' but no matching order was found in Supabase.`);
      return res.status(200).json({
        success: true,
        message: "Order not found in database, no status updated."
      });
    }

    // Update order status in Supabase if changed
    if (matchedOrder.status !== targetStatus) {
      const { error: updateError } = await supabase
        .from("orders")
        .update({ status: targetStatus })
        .eq("id", matchedOrder.id);

      if (updateError) {
        throw updateError;
      }

      console.log(`Successfully updated Order #${matchedOrder.id} status to '${targetStatus}' via Webhook.`);
    }

    return res.status(200).json({
      success: true,
      orderId: matchedOrder.id,
      newStatus: targetStatus,
      message: `Order #${matchedOrder.id} status updated to ${targetStatus}`
    });
  } catch (error) {
    console.error("Error processing tracking webhook:", error);
    return res.status(500).json({ error: "Internal Server Error: " + error.message });
  }
}
