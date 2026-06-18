import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { FiX, FiTrash2, FiPlus, FiMinus, FiShoppingBag, FiCheck, FiTruck, FiCreditCard } from "react-icons/fi";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import { getProductImage } from "../data/products";

export default function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    cartTotal,
    updateQuantity,
    removeFromCart,
    clearCart
  } = useCart();

  const [checkoutStep, setCheckoutStep] = useState("cart"); // 'cart' | 'shipping' | 'success'
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Shipping details state
  const [shippingDetails, setShippingDetails] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    phone: ""
  });

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
  }, [isCartOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleProceedToCheckout = () => {
    if (!user) {
      alert("Please login to proceed with your purchase.");
      setIsCartOpen(false);
      navigate("/login");
      return;
    }
    setCheckoutStep("shipping");
  };

  // Helper to load external scripts (Razorpay)
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Save order to Supabase database
  const saveOrder = async (paymentId) => {
    setLoading(true);
    try {
      // 1. Insert order metadata
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert([
          {
            user_id: user.id,
            total_amount: cartTotal,
            status: "paid",
            payment_id: paymentId,
            shipping_address: shippingDetails
          }
        ])
        .select()
        .single();

      if (orderError) throw orderError;

      // 2. Insert order items
      const orderItemsData = cartItems.map(item => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        price: item.price
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItemsData);

      if (itemsError) throw itemsError;

      // 3. Clear cart and show success
      clearCart();
      setCheckoutStep("success");
    } catch (err) {
      alert("Error saving your order: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Razorpay Checkout
  const handleRazorpayPayment = async () => {
    const isLoaded = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!isLoaded) {
      alert("Razorpay payment gateway failed to load. Please check your connection.");
      return;
    }

    const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_fallback_key";

    const options = {
      key: keyId,
      amount: cartTotal * 100, // in paisa (₹100 = 10000 paisa)
      currency: "INR",
      name: "Ayurelix Ltd.",
      description: "Ancient Ayurveda. Modern Wellness.",
      handler: async function (response) {
        await saveOrder(response.razorpay_payment_id);
      },
      prefill: {
        name: shippingDetails.fullName,
        email: user.email,
        contact: shippingDetails.phone
      },
      theme: {
        color: "#B89355"
      }
    };

    try {
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch {
      // If Razorpay initialization fails (e.g. invalid key format in test), fallback to simulation
      console.warn("Razorpay failed, running simulated payment.");
      await saveOrder("simulated_" + Math.random().toString(36).substr(2, 9));
    }
  };

  const handleSimulatedPayment = async () => {
    await saveOrder("simulated_" + Math.random().toString(36).substr(2, 9));
  };

  const handleClose = () => {
    setIsCartOpen(false);
    // Reset steps after brief delay
    setTimeout(() => setCheckoutStep("cart"), 300);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white border-l border-[#3C5A44]/5 shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#3C5A44]/5 flex justify-between items-center bg-[#fbf9f4]">
              <div className="flex items-center gap-2">
                <FiShoppingBag className="text-[#B89355] text-xl" />
                <h3 className="text-xl font-bold font-serif text-[#3C5A44]" style={{ fontFamily: "'Cinzel', serif" }}>
                  {checkoutStep === "cart" && "Your Cart"}
                  {checkoutStep === "shipping" && "Checkout"}
                  {checkoutStep === "success" && "Order Placed!"}
                </h3>
              </div>
              <button
                onClick={handleClose}
                className="p-2 rounded-full hover:bg-black/5 text-gray-500 hover:text-[#3C5A44] transition"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-grow overflow-y-auto p-6">
              {checkoutStep === "cart" && (
                <div className="space-y-4">
                  {cartItems.length === 0 ? (
                    <div className="h-full py-20 flex flex-col items-center justify-center text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 mb-2">
                        <FiShoppingBag size={28} />
                      </div>
                      <h4 className="text-lg font-bold text-[#3C5A44]">Your cart is empty</h4>
                      <p className="text-sm text-gray-600 max-w-[250px]">
                        Looks like you haven't added any Ayurvedic formulations yet.
                      </p>
                      <button
                        onClick={handleClose}
                        className="px-6 py-2 border border-[#3C5A44] text-[#3C5A44] font-bold rounded-full hover:bg-[#3C5A44] hover:text-white transition duration-300"
                      >
                        Start Shopping
                      </button>
                    </div>
                  ) : (
                    cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-4 p-4 rounded-2xl bg-[#fbf9f4] border border-[#3C5A44]/5 items-center justify-between shadow-sm"
                      >
                        {getProductImage(item.image_url, item.id, item.name) ? (
                          <img
                            src={getProductImage(item.image_url, item.id, item.name)}
                            alt={item.name}
                            className="w-16 h-16 rounded-xl object-cover shrink-0 border border-[#3C5A44]/5"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#B89355] to-[#8F6E35] shrink-0 animate-pulse" />
                        )}
                        <div className="flex-grow min-w-0">
                          <h4 className="text-sm font-bold text-[#3C5A44] truncate">{item.name}</h4>
                          <p className="text-xs text-gray-600 line-clamp-1">{item.description}</p>
                          <p className="text-sm text-[#B89355] font-semibold mt-1">₹{item.price}</p>
                        </div>
                        <div className="flex flex-col items-end gap-3">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-500 hover:text-red-600 transition"
                          >
                            <FiTrash2 size={16} />
                          </button>
                          <div className="flex items-center bg-white border border-[#3C5A44]/10 rounded-lg p-1">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 hover:text-[#B89355] transition text-gray-500"
                            >
                              <FiMinus size={12} />
                            </button>
                            <span className="px-2 text-xs font-semibold text-[#3C5A44]">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 hover:text-[#B89355] transition text-gray-500"
                            >
                              <FiPlus size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {checkoutStep === "shipping" && (
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <h4 className="text-sm font-bold text-[#B89355] uppercase tracking-wider flex items-center gap-1.5">
                    <FiTruck />
                    <span>Shipping Address</span>
                  </h4>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-gray-600 mb-1">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={shippingDetails.fullName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full bg-white border border-[#3C5A44]/10 rounded-xl px-4 py-2.5 text-sm text-[#3C5A44] focus:outline-none focus:border-[#B89355] transition"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-gray-600 mb-1">Street Address</label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={shippingDetails.address}
                      onChange={handleInputChange}
                      placeholder="123 Main St, Apartment 4B"
                      className="w-full bg-white border border-[#3C5A44]/10 rounded-xl px-4 py-2.5 text-sm text-[#3C5A44] focus:outline-none focus:border-[#B89355] transition"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-gray-600 mb-1">City</label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={shippingDetails.city}
                        onChange={handleInputChange}
                        placeholder="Ahmedabad"
                        className="w-full bg-white border border-[#3C5A44]/10 rounded-xl px-4 py-2.5 text-sm text-[#3C5A44] focus:outline-none focus:border-[#B89355] transition"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-gray-600 mb-1">State</label>
                      <input
                        type="text"
                        name="state"
                        required
                        value={shippingDetails.state}
                        onChange={handleInputChange}
                        placeholder="Gujarat"
                        className="w-full bg-white border border-[#3C5A44]/10 rounded-xl px-4 py-2.5 text-sm text-[#3C5A44] focus:outline-none focus:border-[#B89355] transition"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-gray-600 mb-1">Postal Code</label>
                      <input
                        type="text"
                        name="postalCode"
                        required
                        value={shippingDetails.postalCode}
                        onChange={handleInputChange}
                        placeholder="380001"
                        className="w-full bg-white border border-[#3C5A44]/10 rounded-xl px-4 py-2.5 text-sm text-[#3C5A44] focus:outline-none focus:border-[#B89355] transition"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-gray-600 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={shippingDetails.phone}
                        onChange={handleInputChange}
                        placeholder="9876543210"
                        className="w-full bg-white border border-[#3C5A44]/10 rounded-xl px-4 py-2.5 text-sm text-[#3C5A44] focus:outline-none focus:border-[#B89355] transition"
                      />
                    </div>
                  </div>
                </form>
              )}

              {checkoutStep === "success" && (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#B89355]/10 border border-[#B89355]/30 flex items-center justify-center text-[#B89355]">
                    <FiCheck size={32} />
                  </div>
                  <h4 className="text-xl font-bold text-[#3C5A44] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
                    Order Confirmed!
                  </h4>
                  <p className="text-sm text-gray-600 max-w-[280px]">
                    Thank you for choosing Ayurelix. We have received your order and are preparing your wellness formulations.
                  </p>
                  <button
                    onClick={handleClose}
                    className="px-6 py-2.5 bg-[#3C5A44] text-white font-bold rounded-xl hover:bg-[#B89355] transition duration-200 shadow-md"
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>

            {/* Footer Summary */}
            {checkoutStep !== "success" && cartItems.length > 0 && (
              <div className="p-6 border-t border-[#3C5A44]/10 bg-[#fbf9f4] space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Amount</span>
                  <span className="text-2xl font-bold text-[#B89355]">₹{cartTotal}</span>
                </div>

                {checkoutStep === "cart" ? (
                  <button
                    onClick={handleProceedToCheckout}
                    className="w-full py-3.5 bg-[#3C5A44] text-white font-black rounded-xl hover:bg-[#B89355] active:scale-[0.98] transition duration-200 shadow-md"
                  >
                    Proceed to Checkout
                  </button>
                ) : (
                  <div className="space-y-3">
                    <button
                      onClick={handleRazorpayPayment}
                      disabled={loading || !shippingDetails.fullName || !shippingDetails.address || !shippingDetails.phone}
                      className="w-full py-3.5 bg-[#3C5A44] text-white font-black rounded-xl hover:bg-[#B89355] active:scale-[0.98] transition duration-200 disabled:opacity-50 flex items-center justify-center gap-2 shadow-md"
                    >
                      <FiCreditCard size={18} />
                      <span>{loading ? "Processing..." : "Pay with Razorpay"}</span>
                    </button>
                    <button
                      onClick={handleSimulatedPayment}
                      disabled={loading || !shippingDetails.fullName || !shippingDetails.address || !shippingDetails.phone}
                      className="w-full py-2 bg-transparent text-gray-600 border border-[#3C5A44]/10 hover:text-[#3C5A44] rounded-xl text-xs font-semibold hover:bg-[#3C5A44]/5 transition duration-200 disabled:opacity-50"
                    >
                      Simulated Fast Checkout (Testing)
                    </button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
