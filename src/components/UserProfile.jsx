import { useState, useEffect, useCallback } from "react";
import { supabase } from "../supabaseClient";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { FiUser, FiMapPin, FiPhone, FiMail, FiCalendar, FiPackage, FiCheck, FiEdit2, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: ""
  });
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [expandedOrders, setExpandedOrders] = useState({});
  const [saveLoading, setSaveLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" }); // { text: "", type: "success" | "error" }

  const navigate = useNavigate();

  const fetchUserData = useCallback(async (currentUser) => {
    try {
      // 1. Fetch Profile
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", currentUser.id)
        .maybeSingle();

      if (profileError) throw profileError;

      if (profileData) {
        const loadedProfile = {
          fullName: profileData.full_name || "",
          phone: profileData.phone || "",
          address: profileData.address || "",
          city: profileData.city || "",
          state: profileData.state || "",
          postalCode: profileData.postal_code || ""
        };
        setProfile(loadedProfile);
        setEditForm(loadedProfile);
      }

      // 2. Fetch Orders
      const { data: ordersData, error: ordersError } = await supabase
        .from("orders")
        .select(`
          *,
          order_items (
            *,
            products (*)
          )
        `)
        .eq("user_id", currentUser.id)
        .order("created_at", { ascending: false });

      if (ordersError) throw ordersError;
      setOrders(ordersData || []);

    } catch (err) {
      console.error("Error fetching user dashboard data:", err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user: currentUser } }) => {
      if (!currentUser) {
        navigate("/login");
      } else {
        setUser(currentUser);
        fetchUserData(currentUser);
      }
    });
  }, [navigate, fetchUserData]);

  const handleToggleOrder = (orderId) => {
    setExpandedOrders(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setSaveLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const { error } = await supabase
        .from("profiles")
        .upsert({
          id: user.id,
          full_name: editForm.fullName,
          phone: editForm.phone,
          address: editForm.address,
          city: editForm.city,
          state: editForm.state,
          postal_code: editForm.postalCode,
          email: user.email,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      setProfile(editForm);
      setIsEditing(false);
      setMessage({ text: "Profile updated successfully!", type: "success" });
    } catch (err) {
      setMessage({ text: "Error updating profile: " + err.message, type: "error" });
    } finally {
      setSaveLoading(false);
    }
  };

  const renderStatusStepper = (status) => {
    const steps = ["paid", "shipped", "delivered"];
    const currentIdx = steps.indexOf(status);

    return (
      <div className="flex items-center justify-between w-full max-w-md mx-auto py-6">
        {/* Step 1: Placed */}
        <div className="flex flex-col items-center relative z-10">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
            currentIdx >= 0 ? "bg-[#c5a059] text-white shadow-sm" : "bg-gray-200 text-gray-400"
          }`}>
            {currentIdx >= 0 ? <FiCheck /> : "1"}
          </div>
          <span className="text-[10px] uppercase tracking-wider font-bold mt-2 text-gray-600">Order Placed</span>
        </div>

        {/* Line 1 */}
        <div className="flex-grow h-[2px] bg-gray-200 mx-2 relative -mt-5">
          <div className={`absolute inset-0 bg-[#c5a059] transition-all duration-500`} style={{ width: currentIdx >= 1 ? "100%" : "0%" }} />
        </div>

        {/* Step 2: Shipped */}
        <div className="flex flex-col items-center relative z-10">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
            currentIdx >= 1 ? "bg-[#c5a059] text-white shadow-sm" : "bg-gray-200 text-gray-400"
          }`}>
            {currentIdx >= 1 ? <FiCheck /> : "2"}
          </div>
          <span className="text-[10px] uppercase tracking-wider font-bold mt-2 text-gray-600">Shipped</span>
        </div>

        {/* Line 2 */}
        <div className="flex-grow h-[2px] bg-gray-200 mx-2 relative -mt-5">
          <div className={`absolute inset-0 bg-[#c5a059] transition-all duration-500`} style={{ width: currentIdx >= 2 ? "100%" : "0%" }} />
        </div>

        {/* Step 3: Delivered */}
        <div className="flex flex-col items-center relative z-10">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
            currentIdx >= 2 ? "bg-[#c5a059] text-white shadow-sm" : "bg-gray-200 text-gray-400"
          }`}>
            {currentIdx >= 2 ? <FiCheck /> : "3"}
          </div>
          <span className="text-[10px] uppercase tracking-wider font-bold mt-2 text-gray-600">Delivered</span>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="bg-white min-h-screen text-[#0e1a30] flex items-center justify-center">
        <p className="text-xl font-semibold">Loading your wellness dashboard...</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen text-[#0e1a30] flex flex-col justify-between">
      <Navbar />

      <section className="max-w-7xl mx-auto py-32 px-8 w-full flex-grow">
        {/* Glow decoration */}
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-[#c5a059]/3 blur-[120px] pointer-events-none" />

        {/* Page Title */}
        <div className="mb-12 border-b border-[#0e1a30]/10 pb-6 relative z-10">
          <span className="text-[#c5a059] uppercase tracking-[0.25em] text-xs font-bold block mb-1">
            Welcome Back
          </span>
          <h1 className="text-[#0e1a30] text-4xl font-black font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
            {profile.fullName || user.email.split("@")[0]}'s Dashboard
          </h1>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start relative z-10">
          
          {/* LEFT PANEL: PROFILE CARD */}
          <div className="lg:col-span-4 bg-[#fbf9f4] border border-[#0e1a30]/5 p-6 rounded-3xl shadow-xl space-y-6">
            <div className="flex items-center gap-4 border-b border-[#0e1a30]/5 pb-5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#c5a059] to-[#9c772c] flex items-center justify-center text-white text-2xl font-black">
                {profile.fullName ? profile.fullName[0].toUpperCase() : user.email[0].toUpperCase()}
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0e1a30] leading-tight">
                  {profile.fullName || "Add your Name"}
                </h3>
                <p className="text-xs text-gray-600 font-mono mt-0.5 truncate">{user.email}</p>
              </div>
            </div>

            {message.text && (
              <div className={`p-3 rounded-xl text-xs font-semibold text-center border ${
                message.type === "success" 
                  ? "bg-green-50 border-green-200 text-green-600" 
                  : "bg-red-50 border-red-200 text-red-600"
              }`}>
                {message.text}
              </div>
            )}

            {!isEditing ? (
              <div className="space-y-4 text-sm">
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5 text-gray-600">
                    <FiUser className="text-[#c5a059] shrink-0" />
                    <span>{profile.fullName || <span className="text-gray-500 italic">Not set</span>}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-gray-600">
                    <FiPhone className="text-[#c5a059] shrink-0" />
                    <span>{profile.phone || <span className="text-gray-500 italic">Not set</span>}</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-gray-600">
                    <FiMapPin className="text-[#c5a059] mt-0.5 shrink-0" />
                    <div className="leading-relaxed">
                      {profile.address ? (
                        <>
                          <p>{profile.address}</p>
                          <p>{profile.city}, {profile.state} - {profile.postalCode}</p>
                        </>
                      ) : (
                        <span className="text-gray-500 italic">No address saved</span>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full mt-4 py-2.5 bg-transparent border border-[#0e1a30] hover:bg-[#0e1a30] text-[#0e1a30] hover:text-white font-bold rounded-xl transition duration-200 text-xs flex items-center justify-center gap-2 uppercase tracking-wider"
                >
                  <FiEdit2 size={12} />
                  <span>Edit Profile</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleProfileUpdate} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-gray-600 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={editForm.fullName}
                    onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                    className="w-full bg-white border border-[#0e1a30]/10 rounded-xl px-3.5 py-2.5 text-[#0e1a30] focus:outline-none focus:border-[#c5a059] transition"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-gray-600 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    className="w-full bg-white border border-[#0e1a30]/10 rounded-xl px-3.5 py-2.5 text-[#0e1a30] focus:outline-none focus:border-[#c5a059] transition"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-gray-600 mb-1">Street Address</label>
                  <input
                    type="text"
                    value={editForm.address}
                    onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                    className="w-full bg-white border border-[#0e1a30]/10 rounded-xl px-3.5 py-2.5 text-[#0e1a30] focus:outline-none focus:border-[#c5a059] transition"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-gray-600 mb-1">City</label>
                    <input
                      type="text"
                      value={editForm.city}
                      onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                      className="w-full bg-white border border-[#0e1a30]/10 rounded-xl px-3.5 py-2.5 text-[#0e1a30] focus:outline-none focus:border-[#c5a059] transition"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-gray-600 mb-1">State</label>
                    <input
                      type="text"
                      value={editForm.state}
                      onChange={(e) => setEditForm({ ...editForm, state: e.target.value })}
                      className="w-full bg-white border border-[#0e1a30]/10 rounded-xl px-3.5 py-2.5 text-[#0e1a30] focus:outline-none focus:border-[#c5a059] transition"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-gray-600 mb-1">Postal Code</label>
                  <input
                    type="text"
                    value={editForm.postalCode}
                    onChange={(e) => setEditForm({ ...editForm, postalCode: e.target.value })}
                    className="w-full bg-white border border-[#0e1a30]/10 rounded-xl px-3.5 py-2.5 text-[#0e1a30] focus:outline-none focus:border-[#c5a059] transition"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setEditForm(profile);
                    }}
                    className="w-1/2 py-2.5 border border-[#0e1a30]/10 hover:bg-[#0e1a30]/5 text-gray-600 hover:text-[#0e1a30] font-bold rounded-xl transition duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saveLoading}
                    className="w-1/2 py-2.5 bg-[#0e1a30] text-white font-bold rounded-xl hover:bg-[#c5a059] transition duration-200 disabled:opacity-50"
                  >
                    {saveLoading ? "Saving..." : "Save Details"}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* RIGHT PANEL: ORDERS ACCORDION */}
          <div className="lg:col-span-8 space-y-6">
            <h2 className="text-xl font-bold font-serif text-[#0e1a30] flex items-center gap-2">
              <FiPackage className="text-[#c5a059]" />
              <span>Order History ({orders.length})</span>
            </h2>

            {orders.length === 0 ? (
              <div className="bg-[#fbf9f4] border border-[#0e1a30]/5 p-8 rounded-3xl text-center space-y-4 shadow-sm">
                <FiPackage size={40} className="text-gray-400 mx-auto" />
                <p className="text-gray-600 text-sm">You have not placed any orders yet.</p>
                <button
                  onClick={() => navigate("/products")}
                  className="px-6 py-2.5 bg-[#0e1a30] text-white font-bold rounded-xl text-xs uppercase tracking-wider hover:bg-[#c5a059] transition shadow-md"
                >
                  Explore Formulations
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => {
                  const isExpanded = !!expandedOrders[order.id];
                  const formattedDate = new Date(order.created_at).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  });

                  return (
                    <div
                      key={order.id}
                      className="bg-[#fbf9f4] border border-[#0e1a30]/5 rounded-3xl overflow-hidden shadow-sm transition-all duration-300"
                    >
                      {/* Accordion Trigger Header */}
                      <button
                        onClick={() => handleToggleOrder(order.id)}
                        className="w-full text-left p-6 flex flex-wrap justify-between items-center gap-4 hover:bg-[#f4efe2]/40 transition"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2.5">
                            <span className="text-xs text-[#c5a059] font-bold tracking-wider font-mono">
                              ID: {order.id.slice(0, 8)}...
                            </span>
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${
                              order.status === "paid"
                                ? "bg-green-50 text-green-700 border-green-200"
                                : order.status === "shipped"
                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                : "bg-gray-50 text-gray-700 border-gray-200"
                            }`}>
                              {order.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-gray-600">
                            <span className="flex items-center gap-1">
                              <FiCalendar size={12} />
                              {formattedDate}
                            </span>
                            <span className="font-bold text-[#0e1a30]">₹{order.total_amount}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                            {isExpanded ? "Hide Details" : "Show Details"}
                          </span>
                          {isExpanded ? <FiChevronUp className="text-gray-500" /> : <FiChevronDown className="text-gray-500" />}
                        </div>
                      </button>

                      {/* Accordion Expandable Content */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "auto" }}
                            exit={{ height: 0 }}
                            className="overflow-hidden border-t border-[#0e1a30]/5 bg-white/80"
                          >
                            <div className="p-6 space-y-6">
                              {/* Visual Status Stepper */}
                              <div className="border-b border-[#0e1a30]/5 pb-6">
                                <h4 className="text-[10px] uppercase tracking-wider font-bold text-[#c5a059] mb-2 text-center">
                                  Delivery Progress
                                </h4>
                                {renderStatusStepper(order.status)}
                              </div>

                              <div className="grid md:grid-cols-2 gap-8 text-xs">
                                {/* Order items */}
                                <div className="space-y-3">
                                  <h4 className="text-[10px] uppercase tracking-wider font-bold text-[#c5a059]">Items Ordered</h4>
                                  <div className="space-y-3">
                                    {order.order_items?.map((item) => (
                                      <div key={item.id} className="flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#c5a059] to-[#9c772c] shrink-0" />
                                          <div>
                                            <p className="font-bold text-[#0e1a30] truncate max-w-[150px] md:max-w-[200px]">
                                              {item.products?.name || "Deleted Product"}
                                            </p>
                                            <p className="text-[10px] text-gray-500 font-semibold">Qty: {item.quantity}</p>
                                          </div>
                                        </div>
                                        <span className="font-bold text-[#0e1a30]">₹{item.price * item.quantity}</span>
                                      </div>
                                    ))}
                                    <div className="flex justify-between items-center border-t border-[#0e1a30]/5 pt-3 mt-3 font-bold">
                                      <span className="text-gray-500">Total Amount Paid</span>
                                      <span className="text-[#c5a059] text-sm">₹{order.total_amount}</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Shipping address details */}
                                <div className="space-y-2.5">
                                  <h4 className="text-[10px] uppercase tracking-wider font-bold text-[#c5a059]">Shipping Destination</h4>
                                  <div className="p-4 rounded-2xl bg-white border border-[#0e1a30]/5 space-y-1 text-gray-600 shadow-sm">
                                    <p className="font-bold text-[#0e1a30]">{order.shipping_address.fullName}</p>
                                    <p>{order.shipping_address.address}</p>
                                    <p>{order.shipping_address.city}, {order.shipping_address.state} - {order.shipping_address.postalCode}</p>
                                    <p className="text-gray-500 font-semibold mt-1">Phone: {order.shipping_address.phone}</p>
                                    {order.payment_id && (
                                      <p className="text-[10px] text-gray-500 font-mono mt-2 pt-1 border-t border-[#0e1a30]/5">
                                        Payment ID: {order.payment_id}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
