import { useState, useEffect, useCallback } from "react";
import { supabase } from "../supabaseClient";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { 
  FiUser, FiMapPin, FiPhone, FiMail, FiCalendar, FiPackage, 
  FiCheck, FiEdit2, FiChevronDown, FiChevronUp, FiLogOut, 
  FiShoppingBag, FiAward, FiClock, FiShield, FiCheckCircle, FiTruck, FiArrowRight
} from "react-icons/fi";
import { useNavigate, Link } from "react-router-dom";
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
  const [orderFilter, setOrderFilter] = useState("all"); // 'all' | 'active' | 'delivered'
  const [message, setMessage] = useState({ text: "", type: "" });

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
  }, [navigate]);

  useEffect(() => {
    document.title = "My Account & Orders | Ayurelix Sanctuary";
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
      setMessage({ text: "Profile details updated successfully!", type: "success" });
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

  // Metric Calculation
  const totalSpent = orders.reduce((sum, o) => sum + (Number(o.total_amount) || 0), 0);
  const activeOrdersCount = orders.filter(o => o.status !== "delivered").length;
  const filteredOrders = orders.filter(o => {
    if (orderFilter === "active") return o.status !== "delivered";
    if (orderFilter === "delivered") return o.status === "delivered";
    return true;
  });

  const renderStatusStepper = (status) => {
    const steps = ["paid", "shipped", "delivered"];
    const currentIdx = steps.indexOf(status);

    return (
      <div className="flex items-center justify-between w-full max-w-lg mx-auto py-6 px-2">
        {/* Step 1: Placed */}
        <div className="flex flex-col items-center relative z-10 w-24">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
            currentIdx >= 0 ? "bg-[#B89355] text-white shadow-md ring-4 ring-[#B89355]/20" : "bg-gray-200 text-gray-400"
          }`}>
            {currentIdx >= 0 ? <FiCheck size={16} /> : "1"}
          </div>
          <span className="text-[9px] sm:text-[11px] uppercase tracking-wider font-bold mt-2.5 text-[#1A2B49] text-center leading-tight">
            Order Confirmed
          </span>
        </div>

        {/* Line 1 */}
        <div className="flex-grow h-[3px] bg-gray-200 mx-1 relative -mt-5 rounded-full overflow-hidden">
          <div className={`absolute inset-0 bg-[#B89355] transition-all duration-500`} style={{ width: currentIdx >= 1 ? "100%" : "0%" }} />
        </div>

        {/* Step 2: Shipped */}
        <div className="flex flex-col items-center relative z-10 w-24">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
            currentIdx >= 1 ? "bg-[#B89355] text-white shadow-md ring-4 ring-[#B89355]/20" : "bg-gray-200 text-gray-400"
          }`}>
            {currentIdx >= 1 ? <FiCheck size={16} /> : "2"}
          </div>
          <span className="text-[9px] sm:text-[11px] uppercase tracking-wider font-bold mt-2.5 text-[#1A2B49] text-center leading-tight">
            In Transit
          </span>
        </div>

        {/* Line 2 */}
        <div className="flex-grow h-[3px] bg-gray-200 mx-1 relative -mt-5 rounded-full overflow-hidden">
          <div className={`absolute inset-0 bg-[#B89355] transition-all duration-500`} style={{ width: currentIdx >= 2 ? "100%" : "0%" }} />
        </div>

        {/* Step 3: Delivered */}
        <div className="flex flex-col items-center relative z-10 w-24">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
            currentIdx >= 2 ? "bg-emerald-600 text-white shadow-md ring-4 ring-emerald-600/20" : "bg-gray-200 text-gray-400"
          }`}>
            {currentIdx >= 2 ? <FiCheckCircle size={16} /> : "3"}
          </div>
          <span className="text-[9px] sm:text-[11px] uppercase tracking-wider font-bold mt-2.5 text-[#1A2B49] text-center leading-tight">
            Delivered
          </span>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="bg-[#FAF8F5] min-h-screen text-[#1A2B49] flex flex-col justify-between">
        <Navbar />
        <div className="max-w-7xl mx-auto pt-36 pb-32 px-6 w-full space-y-8">
          <div className="h-10 w-64 skeleton-shimmer rounded-xl" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-28 skeleton-shimmer rounded-2xl" />
            ))}
          </div>
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 h-96 skeleton-shimmer rounded-3xl" />
            <div className="lg:col-span-8 h-96 skeleton-shimmer rounded-3xl" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#1A2B49] flex flex-col justify-between overflow-x-hidden font-sans">
      <Navbar />

      <section className="max-w-7xl mx-auto pt-32 lg:pt-40 pb-32 px-4 sm:px-8 w-full flex-grow relative">
        
        {/* Glow decoration */}
        <div className="absolute top-20 right-10 w-[500px] h-[500px] rounded-full bg-[#B89355]/5 blur-[140px] pointer-events-none" />

        {/* Page Title & User Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between border-b border-[#1A2B49]/10 pb-6 relative z-10 gap-4">
          <div>
            <span className="text-[#B89355] uppercase tracking-[0.25em] text-xs font-bold flex items-center gap-1.5 mb-1">
              <FiShield />
              <span>Ayurelix Member Sanctuary</span>
            </span>
            <h1 className="text-[#1A2B49] text-3xl sm:text-4xl lg:text-5xl font-black font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
              Welcome, {profile.fullName || user.email.split("@")[0]}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/products"
              className="px-5 py-2.5 rounded-full bg-[#1A2B49] hover:bg-[#B89355] text-white text-xs uppercase font-bold tracking-wider transition shadow-sm flex items-center gap-2"
            >
              <FiShoppingBag />
              <span>Explore Formulations</span>
            </Link>
          </div>
        </div>

        {/* METRICS SUMMARY CARDS (Apple Store / Wallet Style) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 relative z-10">
          
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-white border border-[#1A2B49]/5 p-5 rounded-2xl shadow-[0_4px_20px_rgba(26,43,73,0.03)] flex flex-col justify-between"
          >
            <div className="flex justify-between items-center text-[#B89355] mb-3">
              <span className="text-[10px] uppercase tracking-wider font-bold text-gray-600">Total Orders</span>
              <div className="p-2 rounded-xl bg-[#B89355]/10">
                <FiPackage size={18} />
              </div>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-black text-[#1A2B49] font-serif">{orders.length}</span>
              <p className="text-[10px] text-gray-600 mt-1">Formulations ordered</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="bg-white border border-[#1A2B49]/5 p-5 rounded-2xl shadow-[0_4px_20px_rgba(26,43,73,0.03)] flex flex-col justify-between"
          >
            <div className="flex justify-between items-center text-blue-600 mb-3">
              <span className="text-[10px] uppercase tracking-wider font-bold text-gray-600">Active Shipments</span>
              <div className="p-2 rounded-xl bg-blue-50">
                <FiTruck size={18} />
              </div>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-black text-[#1A2B49] font-serif">{activeOrdersCount}</span>
              <p className="text-[10px] text-gray-600 mt-1">{activeOrdersCount > 0 ? "On the way to you" : "All orders delivered"}</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="bg-white border border-[#1A2B49]/5 p-5 rounded-2xl shadow-[0_4px_20px_rgba(26,43,73,0.03)] flex flex-col justify-between"
          >
            <div className="flex justify-between items-center text-emerald-600 mb-3">
              <span className="text-[10px] uppercase tracking-wider font-bold text-gray-600">Total Investments</span>
              <div className="p-2 rounded-xl bg-emerald-50">
                <FiShoppingBag size={18} />
              </div>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-black text-[#1A2B49] font-serif">₹{totalSpent.toLocaleString()}</span>
              <p className="text-[10px] text-gray-600 mt-1">Invested in wellness</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="bg-gradient-to-br from-[#1A2B49] to-[#0E1B33] text-white p-5 rounded-2xl shadow-md flex flex-col justify-between"
          >
            <div className="flex justify-between items-center text-[#D3B685] mb-3">
              <span className="text-[10px] uppercase tracking-wider font-bold text-[#D3B685]">Sanctuary Tier</span>
              <div className="p-2 rounded-xl bg-white/10">
                <FiAward size={18} />
              </div>
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black font-serif text-[#D3B685]" style={{ fontFamily: "'Cinzel', serif" }}>
                {totalSpent > 5000 ? "Royal Patron" : "Golden Member"}
              </span>
              <p className="text-[10px] text-white/70 mt-1">Free Delivery Privileges</p>
            </div>
          </motion.div>

        </div>

        {/* MAIN DASHBOARD CONTENT GRID */}
        <div className="grid lg:grid-cols-12 gap-8 items-start relative z-10">
          
          {/* LEFT PANEL: PERSONAL PROFILE & SHIPPING INFO */}
          <div className="lg:col-span-4 bg-white border border-[#1A2B49]/5 p-6 rounded-3xl shadow-[0_4px_25px_rgba(26,43,73,0.04)] space-y-6">
            <div className="flex items-center gap-4 border-b border-[#1A2B49]/5 pb-5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#B89355] to-[#8F6E35] flex items-center justify-center text-white text-2xl font-black shadow-md shrink-0">
                {profile.fullName ? profile.fullName[0].toUpperCase() : user.email[0].toUpperCase()}
              </div>
              <div className="min-w-0">
                <h3 className="text-base font-bold text-[#1A2B49] leading-tight truncate">
                  {profile.fullName || "Add your Name"}
                </h3>
                <p className="text-xs text-gray-500 font-mono mt-0.5 truncate">{user.email}</p>
                <span className="inline-block mt-1 text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#B89355]/10 text-[#B89355]">
                  Verified Customer
                </span>
              </div>
            </div>

            {message.text && (
              <div className={`p-3 rounded-xl text-xs font-semibold text-center border ${
                message.type === "success" 
                  ? "bg-emerald-50 border-emerald-200 text-emerald-700" 
                  : "bg-red-50 border-red-200 text-red-700"
              }`}>
                {message.text}
              </div>
            )}

            {!isEditing ? (
              <div className="space-y-4 text-xs">
                <div className="space-y-3.5">
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="p-2 rounded-lg bg-[#FAF8F5] text-[#B89355]">
                      <FiUser size={14} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-gray-400">Full Name</p>
                      <p className="font-semibold text-[#1A2B49]">{profile.fullName || <span className="text-gray-400 italic">Not specified</span>}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="p-2 rounded-lg bg-[#FAF8F5] text-[#B89355]">
                      <FiPhone size={14} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-gray-400">Phone Contact</p>
                      <p className="font-semibold text-[#1A2B49]">{profile.phone || <span className="text-gray-400 italic">Not specified</span>}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-gray-700">
                    <div className="p-2 rounded-lg bg-[#FAF8F5] text-[#B89355] mt-0.5">
                      <FiMapPin size={14} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-gray-400">Default Shipping Address</p>
                      {profile.address ? (
                        <div className="font-semibold text-[#1A2B49] leading-relaxed">
                          <p>{profile.address}</p>
                          <p>{profile.city}, {profile.state} - {profile.postalCode}</p>
                        </div>
                      ) : (
                        <span className="text-gray-400 italic">No primary shipping address saved</span>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full mt-4 py-3 bg-[#FAF8F5] border border-[#1A2B49]/10 hover:bg-[#1A2B49] text-[#1A2B49] hover:text-white font-bold rounded-xl transition duration-300 text-xs flex items-center justify-center gap-2 uppercase tracking-wider cursor-pointer shadow-sm"
                >
                  <FiEdit2 size={13} />
                  <span>Update Address Info</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleProfileUpdate} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-gray-600 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={editForm.fullName}
                    onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#1A2B49]/10 rounded-xl px-3.5 py-2.5 text-[#1A2B49] focus:outline-none focus:border-[#B89355] transition"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-gray-600 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#1A2B49]/10 rounded-xl px-3.5 py-2.5 text-[#1A2B49] focus:outline-none focus:border-[#B89355] transition"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-gray-600 mb-1">Street Address</label>
                  <input
                    type="text"
                    value={editForm.address}
                    onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#1A2B49]/10 rounded-xl px-3.5 py-2.5 text-[#1A2B49] focus:outline-none focus:border-[#B89355] transition"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-gray-600 mb-1">City</label>
                    <input
                      type="text"
                      value={editForm.city}
                      onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-[#1A2B49]/10 rounded-xl px-3.5 py-2.5 text-[#1A2B49] focus:outline-none focus:border-[#B89355] transition"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-gray-600 mb-1">State</label>
                    <input
                      type="text"
                      value={editForm.state}
                      onChange={(e) => setEditForm({ ...editForm, state: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-[#1A2B49]/10 rounded-xl px-3.5 py-2.5 text-[#1A2B49] focus:outline-none focus:border-[#B89355] transition"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-gray-600 mb-1">Postal Code</label>
                  <input
                    type="text"
                    value={editForm.postalCode}
                    onChange={(e) => setEditForm({ ...editForm, postalCode: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#1A2B49]/10 rounded-xl px-3.5 py-2.5 text-[#1A2B49] focus:outline-none focus:border-[#B89355] transition"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setEditForm(profile);
                    }}
                    className="w-1/2 py-2.5 border border-[#1A2B49]/10 hover:bg-gray-100 text-gray-600 font-bold rounded-xl transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saveLoading}
                    className="w-1/2 py-2.5 bg-[#1A2B49] text-white font-bold rounded-xl hover:bg-[#B89355] transition disabled:opacity-50 cursor-pointer shadow-md"
                  >
                    {saveLoading ? "Saving..." : "Save Details"}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* RIGHT PANEL: ORDERS & SHIPMENT TRACKING ACCORDION */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Header & Filter Pill Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1A2B49]/5 pb-4">
              <h2 className="text-xl font-bold font-serif text-[#1A2B49] flex items-center gap-2" style={{ fontFamily: "'Cinzel', serif" }}>
                <FiPackage className="text-[#B89355]" />
                <span>Order History & Tracking</span>
              </h2>

              {/* Order Filter Tabs */}
              <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-[#1A2B49]/10 shadow-sm self-start">
                <button
                  onClick={() => setOrderFilter("all")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    orderFilter === "all" ? "bg-[#1A2B49] text-white shadow-sm" : "text-gray-500 hover:text-[#1A2B49]"
                  }`}
                >
                  All ({orders.length})
                </button>
                <button
                  onClick={() => setOrderFilter("active")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    orderFilter === "active" ? "bg-[#1A2B49] text-white shadow-sm" : "text-gray-500 hover:text-[#1A2B49]"
                  }`}
                >
                  In Transit ({activeOrdersCount})
                </button>
                <button
                  onClick={() => setOrderFilter("delivered")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    orderFilter === "delivered" ? "bg-[#1A2B49] text-white shadow-sm" : "text-gray-500 hover:text-[#1A2B49]"
                  }`}
                >
                  Delivered ({orders.length - activeOrdersCount})
                </button>
              </div>
            </div>

            {filteredOrders.length === 0 ? (
              <div className="bg-white border border-[#1A2B49]/5 p-12 rounded-3xl text-center space-y-4 shadow-[0_4px_20px_rgba(26,43,73,0.03)]">
                <div className="w-16 h-16 rounded-full bg-[#FAF8F5] flex items-center justify-center text-[#B89355] mx-auto">
                  <FiPackage size={32} />
                </div>
                <h3 className="text-lg font-bold text-[#1A2B49] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
                  No orders found in this view
                </h3>
                <p className="text-gray-500 text-xs max-w-sm mx-auto">
                  Explore our handcrafted range of face pack remedies, Kumkumadi oil, and organic formulations.
                </p>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A2B49] text-white font-bold rounded-xl text-xs uppercase tracking-wider hover:bg-[#B89355] transition shadow-md"
                >
                  <span>Shop Wellness Remedies</span>
                  <FiArrowRight />
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((order) => {
                  const isExpanded = !!expandedOrders[order.id];
                  const formattedDate = new Date(order.created_at).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  });

                  return (
                    <motion.div
                      layout
                      key={order.id}
                      className="bg-white border border-[#1A2B49]/5 rounded-3xl overflow-hidden shadow-[0_4px_20px_rgba(26,43,73,0.03)] hover:shadow-[0_8px_30px_rgba(26,43,73,0.06)] transition-all duration-300"
                    >
                      {/* Accordion Trigger Header */}
                      <button
                        onClick={() => handleToggleOrder(order.id)}
                        className="w-full text-left p-5 sm:p-6 flex flex-wrap justify-between items-center gap-4 hover:bg-[#FAF8F5] transition cursor-pointer"
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2.5">
                            <span className="text-xs text-[#B89355] font-bold tracking-wider font-mono bg-[#B89355]/10 px-2 py-0.5 rounded-lg">
                              ORD-{order.id.slice(0, 8).toUpperCase()}
                            </span>
                            <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${
                              order.status === "delivered"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : order.status === "shipped"
                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                : "bg-amber-50 text-amber-700 border-amber-200"
                            }`}>
                              {order.status === "paid" ? "Confirmed" : order.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-gray-500 font-medium">
                            <span className="flex items-center gap-1">
                              <FiCalendar size={12} className="text-[#B89355]" />
                              {formattedDate}
                            </span>
                            <span>•</span>
                            <span className="font-bold text-[#1A2B49] text-sm">₹{order.total_amount}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 bg-[#FAF8F5] px-3 py-1.5 rounded-xl border border-[#1A2B49]/5">
                          <span className="text-xs text-[#1A2B49] font-bold">
                            {isExpanded ? "Hide Tracking" : "View Shipment Details"}
                          </span>
                          {isExpanded ? <FiChevronUp className="text-[#B89355]" /> : <FiChevronDown className="text-[#B89355]" />}
                        </div>
                      </button>

                      {/* Accordion Expandable Content */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden border-t border-[#1A2B49]/5 bg-[#FAF8F5]/50"
                          >
                            <div className="p-5 sm:p-6 space-y-6">
                              {/* Visual Status Stepper */}
                              <div className="bg-white border border-[#1A2B49]/5 rounded-2xl p-4 shadow-sm text-center">
                                <h4 className="text-[10px] uppercase tracking-wider font-bold text-[#B89355] mb-1">
                                  Real-Time Logistics Status
                                </h4>
                                {renderStatusStepper(order.status)}
                              </div>

                              <div className="grid md:grid-cols-2 gap-6 text-xs">
                                {/* Order items */}
                                <div className="space-y-3 bg-white p-4 rounded-2xl border border-[#1A2B49]/5 shadow-sm">
                                  <h4 className="text-[10px] uppercase tracking-wider font-bold text-[#B89355]">Items in Parcel</h4>
                                  <div className="space-y-3">
                                    {order.order_items?.map((item) => (
                                      <div key={item.id} className="flex justify-between items-center gap-3">
                                        <div className="flex items-center gap-3 min-w-0">
                                          {getProductImage(item.products?.image_url, item.products?.id, item.products?.name) ? (
                                            <img
                                              src={getProductImage(item.products.image_url, item.products.id, item.products.name)}
                                              alt={item.products.name || "Product"}
                                              className="w-12 h-12 rounded-xl object-cover shrink-0 border border-[#1A2B49]/5"
                                            />
                                          ) : (
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#B89355] to-[#8F6E35] shrink-0" />
                                          )}
                                          <div className="min-w-0">
                                            <p className="font-bold text-[#1A2B49] truncate max-w-[140px] sm:max-w-[180px]">
                                              {item.products?.name || "Deleted Product"}
                                            </p>
                                            <p className="text-[10px] text-gray-500 font-medium">Quantity: {item.quantity}</p>
                                          </div>
                                        </div>
                                        <div className="text-right shrink-0">
                                          {item.products?.original_price && Number(item.products.original_price) > Number(item.price) && (
                                            <span className="text-[10px] text-gray-400 line-through block">
                                              ₹{Number(item.products.original_price) * item.quantity}
                                            </span>
                                          )}
                                          <span className="font-bold text-[#1A2B49]">
                                            ₹{item.price * item.quantity}
                                          </span>
                                        </div>
                                      </div>
                                    ))}
                                    <div className="flex justify-between items-center border-t border-[#1A2B49]/5 pt-3 mt-3 font-bold">
                                      <span className="text-gray-500">Total Invoice Amount</span>
                                      <span className="text-[#B89355] text-sm">₹{order.total_amount}</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Shipping address details */}
                                <div className="space-y-3 bg-white p-4 rounded-2xl border border-[#1A2B49]/5 shadow-sm">
                                  <h4 className="text-[10px] uppercase tracking-wider font-bold text-[#B89355]">Shipping Address</h4>
                                  <div className="space-y-1.5 text-gray-600">
                                    <p className="font-bold text-[#1A2B49]">{order.shipping_address.fullName}</p>
                                    <p>{order.shipping_address.address}</p>
                                    <p>{order.shipping_address.city}, {order.shipping_address.state} - {order.shipping_address.postalCode}</p>
                                    <p className="text-gray-500 font-semibold mt-1">Phone: {order.shipping_address.phone}</p>
                                    {order.payment_id && (
                                      <p className="text-[10px] text-gray-400 font-mono mt-2 pt-1 border-t border-[#1A2B49]/5">
                                        Razorpay TXN: {order.payment_id}
                                      </p>
                                    )}
                                    {order.shipping_address?.awb_code && (
                                      <div className="pt-2 mt-2 border-t border-[#1A2B49]/5">
                                        <a 
                                          href={`https://shiprocket.co/tracking/${order.shipping_address.awb_code}`} 
                                          target="_blank" 
                                          rel="noopener noreferrer"
                                          className="inline-flex items-center gap-1.5 text-blue-600 font-bold hover:underline text-xs"
                                        >
                                          <FiTruck size={14} />
                                          <span>Track on Shiprocket ({order.shipping_address.awb_code})</span>
                                        </a>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

        {/* CENTERED RED STYLED SIGN OUT BUTTON */}
        <div className="mt-16 flex justify-center border-t border-[#1A2B49]/10 pt-8 relative z-10">
          <button
            onClick={handleLogout}
            className="px-8 py-3 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 hover:border-red-300 font-black rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm transition duration-300 active:scale-95 cursor-pointer"
          >
            <FiLogOut size={15} />
            <span>Sign Out of Account</span>
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
