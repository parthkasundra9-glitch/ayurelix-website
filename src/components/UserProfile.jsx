import { useState, useEffect, useCallback } from "react";
import { supabase } from "../supabaseClient";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { FiUser, FiMapPin, FiPhone, FiMail, FiCalendar, FiPackage, FiCheck, FiEdit2, FiChevronDown, FiChevronUp, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getProductImage } from "../data/products";

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
        // If the account is deactivated by an admin:
        if (profileData.is_active === false) {
          alert("Your account is deactivated. Please contact support.");
          await supabase.auth.signOut();
          navigate("/login");
          return;
        }

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
    document.title = "My Account | Ayurelix";
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
        .update({
          full_name: editForm.fullName,
          phone: editForm.phone,
          address: editForm.address,
          city: editForm.city,
          state: editForm.state,
          postal_code: editForm.postalCode,
          email: user.email,
          updated_at: new Date().toISOString()
        })
        .eq("id", user.id);

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

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/");
    } catch (err) {
      console.error("Error signing out:", err.message);
    }
  };

  const renderStatusStepper = (status) => {
    const steps = ["paid", "shipped", "delivered"];
    const currentIdx = steps.indexOf(status);

    return (
      <div className="flex items-center justify-between w-full max-w-md mx-auto py-6">
        {/* Step 1: Placed */}
        <div className="flex flex-col items-center relative z-10 w-20">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
            currentIdx >= 0 ? "bg-[#B89355] text-white shadow-sm" : "bg-gray-200 text-gray-400"
          }`}>
            {currentIdx >= 0 ? <FiCheck /> : "1"}
          </div>
          <span className="text-[8px] sm:text-[10px] uppercase tracking-wider font-bold mt-2 text-gray-600 text-center leading-tight">Order Placed</span>
        </div>

        {/* Line 1 */}
        <div className="flex-grow h-[2px] bg-gray-200 mx-1 relative -mt-5">
          <div className={`absolute inset-0 bg-[#B89355] transition-all duration-500`} style={{ width: currentIdx >= 1 ? "100%" : "0%" }} />
        </div>

        {/* Step 2: Shipped */}
        <div className="flex flex-col items-center relative z-10 w-20">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
            currentIdx >= 1 ? "bg-[#B89355] text-white shadow-sm" : "bg-gray-200 text-gray-400"
          }`}>
            {currentIdx >= 1 ? <FiCheck /> : "2"}
          </div>
          <span className="text-[8px] sm:text-[10px] uppercase tracking-wider font-bold mt-2 text-gray-600 text-center leading-tight">Shipped</span>
        </div>

        {/* Line 2 */}
        <div className="flex-grow h-[2px] bg-gray-200 mx-1 relative -mt-5">
          <div className={`absolute inset-0 bg-[#B89355] transition-all duration-500`} style={{ width: currentIdx >= 2 ? "100%" : "0%" }} />
        </div>

        {/* Step 3: Delivered */}
        <div className="flex flex-col items-center relative z-10 w-20">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
            currentIdx >= 2 ? "bg-[#B89355] text-white shadow-sm" : "bg-gray-200 text-gray-400"
          }`}>
            {currentIdx >= 2 ? <FiCheck /> : "3"}
          </div>
          <span className="text-[8px] sm:text-[10px] uppercase tracking-wider font-bold mt-2 text-gray-600 text-center leading-tight">Delivered</span>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="bg-white min-h-screen text-[#1A2B49] flex items-center justify-center">
        <p className="text-xl font-semibold">Loading your wellness dashboard...</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen text-[#1A2B49] flex flex-col justify-between overflow-x-hidden">
      <Navbar />

      <section className="max-w-7xl mx-auto py-20 sm:py-32 px-4 sm:px-8 w-full flex-grow relative">
        {/* Glow decoration */}
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-[#B89355]/3 blur-[120px] pointer-events-none" />

        {/* Page Title */}
        <div className="mb-12 border-b border-[#1A2B49]/10 pb-6 relative z-10">
          <span className="text-[#B89355] uppercase tracking-[0.25em] text-xs font-bold block mb-1">
            Welcome Back
          </span>
          <h1 className="text-[#1A2B49] text-2xl sm:text-4xl font-black font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
            {profile.fullName || user.email.split("@")[0]}'s Dashboard
          </h1>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start relative z-10">
          
          {/* LEFT PANEL: PROFILE CARD */}
          <div className="lg:col-span-4 bg-[#fbf9f4] border border-[#1A2B49]/5 p-4 sm:p-6 rounded-3xl shadow-xl space-y-6">
            <div className="flex items-center gap-4 border-b border-[#1A2B49]/5 pb-5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#B89355] to-[#8F6E35] flex items-center justify-center text-white text-2xl font-black">
                {profile.fullName ? profile.fullName[0].toUpperCase() : user.email[0].toUpperCase()}
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1A2B49] leading-tight">
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
                    <FiUser className="text-[#B89355] shrink-0" />
                    <span>{profile.fullName || <span className="text-gray-500 italic">Not set</span>}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-gray-600">
                    <FiPhone className="text-[#B89355] shrink-0" />
                    <span>{profile.phone || <span className="text-gray-500 italic">Not set</span>}</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-gray-600">
                    <FiMapPin className="text-[#B89355] mt-0.5 shrink-0" />
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
                  className="w-full mt-4 py-2.5 bg-transparent border border-[#1A2B49] hover:bg-[#1A2B49] text-[#1A2B49] hover:text-white font-bold rounded-xl transition duration-200 text-xs flex items-center justify-center gap-2 uppercase tracking-wider"
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
                    className="w-full bg-white border border-[#1A2B49]/10 rounded-xl px-3.5 py-2.5 text-[#1A2B49] focus:outline-none focus:border-[#B89355] transition"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-gray-600 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    className="w-full bg-white border border-[#1A2B49]/10 rounded-xl px-3.5 py-2.5 text-[#1A2B49] focus:outline-none focus:border-[#B89355] transition"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-gray-600 mb-1">Street Address</label>
                  <input
                    type="text"
                    value={editForm.address}
                    onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                    className="w-full bg-white border border-[#1A2B49]/10 rounded-xl px-3.5 py-2.5 text-[#1A2B49] focus:outline-none focus:border-[#B89355] transition"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-gray-600 mb-1">City</label>
                    <input
                      type="text"
                      value={editForm.city}
                      onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                      className="w-full bg-white border border-[#1A2B49]/10 rounded-xl px-3.5 py-2.5 text-[#1A2B49] focus:outline-none focus:border-[#B89355] transition"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-gray-600 mb-1">State</label>
                    <input
                      type="text"
                      value={editForm.state}
                      onChange={(e) => setEditForm({ ...editForm, state: e.target.value })}
                      className="w-full bg-white border border-[#1A2B49]/10 rounded-xl px-3.5 py-2.5 text-[#1A2B49] focus:outline-none focus:border-[#B89355] transition"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-gray-600 mb-1">Postal Code</label>
                  <input
                    type="text"
                    value={editForm.postalCode}
                    onChange={(e) => setEditForm({ ...editForm, postalCode: e.target.value })}
                    className="w-full bg-white border border-[#1A2B49]/10 rounded-xl px-3.5 py-2.5 text-[#1A2B49] focus:outline-none focus:border-[#B89355] transition"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setEditForm(profile);
                    }}
                    className="w-1/2 py-2.5 border border-[#1A2B49]/10 hover:bg-[#1A2B49]/5 text-gray-600 hover:text-[#1A2B49] font-bold rounded-xl transition duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saveLoading}
                    className="w-1/2 py-2.5 bg-[#1A2B49] text-white font-bold rounded-xl hover:bg-[#B89355] transition duration-200 disabled:opacity-50"
                  >
                    {saveLoading ? "Saving..." : "Save Details"}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* RIGHT PANEL: ORDERS ACCORDION */}
          <div className="lg:col-span-8 space-y-6">
            <h2 className="text-xl font-bold font-serif text-[#1A2B49] flex items-center gap-2">
              <FiPackage className="text-[#B89355]" />
              <span>Order History ({orders.length})</span>
            </h2>

            {orders.length === 0 ? (
              <div className="bg-[#fbf9f4] border border-[#1A2B49]/5 p-8 rounded-3xl text-center space-y-4 shadow-sm">
                <FiPackage size={40} className="text-gray-400 mx-auto" />
                <p className="text-gray-600 text-sm">You have not placed any orders yet.</p>
                <button
                  onClick={() => navigate("/products")}
                  className="px-6 py-2.5 bg-[#1A2B49] text-white font-bold rounded-xl text-xs uppercase tracking-wider hover:bg-[#B89355] transition shadow-md"
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
                      className="bg-[#fbf9f4] border border-[#1A2B49]/5 rounded-3xl overflow-hidden shadow-sm transition-all duration-300"
                    >
                      {/* Accordion Trigger Header */}
                      <button
                        onClick={() => handleToggleOrder(order.id)}
                        className="w-full text-left p-4 sm:p-6 flex flex-wrap justify-between items-center gap-4 hover:bg-[#f4efe2]/40 transition"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2.5">
                            <span className="text-xs text-[#B89355] font-bold tracking-wider font-mono">
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
                            <span className="font-bold text-[#1A2B49]">₹{order.total_amount}</span>
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
                            className="overflow-hidden border-t border-[#1A2B49]/5 bg-white/80"
                          >
                            <div className="p-4 sm:p-6 space-y-6">
                              {/* Visual Status Stepper */}
                              <div className="border-b border-[#1A2B49]/5 pb-6 text-center">
                                <h4 className="text-[10px] uppercase tracking-wider font-bold text-[#B89355] mb-2">
                                  Delivery Progress
                                </h4>
                                {renderStatusStepper(order.status)}
                              </div>

                              <div className="grid md:grid-cols-2 gap-6 sm:gap-8 text-xs">
                                {/* Order items */}
                                <div className="space-y-3">
                                  <h4 className="text-[10px] uppercase tracking-wider font-bold text-[#B89355]">Items Ordered</h4>
                                  <div className="space-y-3">
                                    {order.order_items?.map((item) => (
                                      <div key={item.id} className="flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                          {getProductImage(item.products?.image_url, item.products?.id, item.products?.name) ? (
                                            <img
                                              src={getProductImage(item.products.image_url, item.products.id, item.products.name)}
                                              alt={item.products.name || "Product"}
                                              className="w-10 h-10 rounded-lg object-cover shrink-0 border border-[#1A2B49]/5"
                                            />
                                          ) : (
                                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#B89355] to-[#8F6E35] shrink-0" />
                                          )}
                                          <div>
                                            <p className="font-bold text-[#1A2B49] truncate max-w-[150px] md:max-w-[200px]">
                                              {item.products?.name || "Deleted Product"}
                                            </p>
                                            <p className="text-[10px] text-gray-500 font-semibold">Qty: {item.quantity}</p>
                                          </div>
                                        </div>
                                        <span className="font-bold text-[#1A2B49]">₹{item.price * item.quantity}</span>
                                      </div>
                                    ))}
                                    <div className="flex justify-between items-center border-t border-[#1A2B49]/5 pt-3 mt-3 font-bold">
                                      <span className="text-gray-500">Total Amount Paid</span>
                                      <span className="text-[#B89355] text-sm">₹{order.total_amount}</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Shipping address details */}
                                <div className="space-y-2.5">
                                  <h4 className="text-[10px] uppercase tracking-wider font-bold text-[#B89355]">Shipping Destination</h4>
                                  <div className="p-4 rounded-2xl bg-white border border-[#1A2B49]/5 space-y-1 text-gray-600 shadow-sm">
                                    <p className="font-bold text-[#1A2B49]">{order.shipping_address.fullName}</p>
                                    <p>{order.shipping_address.address}</p>
                                    <p>{order.shipping_address.city}, {order.shipping_address.state} - {order.shipping_address.postalCode}</p>
                                    <p className="text-gray-500 font-semibold mt-1">Phone: {order.shipping_address.phone}</p>
                                    {order.payment_id && (
                                      <p className="text-[10px] text-gray-500 font-mono mt-2 pt-1 border-t border-[#1A2B49]/5">
                                        Payment ID: {order.payment_id}
                                      </p>
                                    )}
                                    {order.shipping_address?.shipment_id && (
                                      <div className="text-[10px] text-gray-500 font-medium pt-2 mt-2 border-t border-[#1A2B49]/5 space-y-1">
                                        <p className="font-bold text-[9px] uppercase tracking-wider text-gray-400">Shipping Partner Updates</p>
                                        {order.shipping_address.awb_code ? (
                                          <p>
                                            AWB / Tracking:{" "}
                                            <a 
                                              href={`https://shiprocket.co/tracking/${order.shipping_address.awb_code}`} 
                                              target="_blank" 
                                              rel="noopener noreferrer"
                                              className="text-blue-600 font-bold hover:underline"
                                            >
                                              {order.shipping_address.awb_code} (Click to Track)
                                            </a>
                                          </p>
                                        ) : (
                                          <p>Shipment ID: <span className="font-mono text-[#B89355]">{order.shipping_address.shipment_id}</span></p>
                                        )}
                                        <p className="text-gray-400 italic">Courier pickup scheduled from Ahmedabad warehouse.</p>
                                      </div>
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

        {/* Center-aligned red styled Sign Out button */}
        <div className="mt-16 flex justify-center border-t border-[#1A2B49]/10 pt-8 relative z-10">
          <button
            onClick={handleLogout}
            className="px-8 py-3 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 hover:border-red-300 font-black rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm transition duration-300 active:scale-95 cursor-pointer"
          >
            <FiLogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
