import { useState, useEffect, useCallback } from "react";
import { supabase } from "../supabaseClient";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { FiShoppingBag, FiLayers, FiStar, FiTruck, FiPlus, FiTrash2, FiCheckCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("orders"); // 'orders' | 'products' | 'reviews'

  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Data lists
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);

  // New product form state
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    category: "1",
    stock: "100"
  });

  const navigate = useNavigate();

  const checkAdminAccess = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || user.email !== "admin@ayurelix.com") {
        setIsAdmin(false);
        setLoading(false);
        // Wait 3 seconds and redirect if not admin
        setTimeout(() => navigate("/login"), 3000);
      } else {

        setIsAdmin(true);
        setLoading(false);
      }
    } catch {
      setIsAdmin(false);
      setLoading(false);
    }
  }, [navigate]);

  const fetchData = useCallback(async () => {
    if (activeTab === "orders") {
      // Fetch orders and join order items
      const { data: ordersData } = await supabase
        .from("orders")
        .select(`
          *,
          order_items (
            *,
            products (*)
          )
        `)
        .order("created_at", { ascending: false });

      setOrders(ordersData || []);
    } else if (activeTab === "products") {
      const { data: productsData } = await supabase
        .from("products")
        .select("*")
        .order("id", { ascending: true });

      setProducts(productsData || []);
    } else if (activeTab === "reviews") {
      const { data: reviewsData } = await supabase
        .from("reviews")
        .select(`
          *,
          products (*)
        `)
        .order("created_at", { ascending: false });

      setReviews(reviewsData || []);
    }
  }, [activeTab]);

  useEffect(() => {
    checkAdminAccess();
  }, [checkAdminAccess]);

  useEffect(() => {
    if (isAdmin) {
      fetchData();
    }
  }, [isAdmin, activeTab, fetchData]);

  // Update order status
  const handleUpdateOrderStatus = async (orderId, currentStatus) => {
    const nextStatus = currentStatus === "paid" ? "shipped" : "delivered";
    const { error } = await supabase
      .from("orders")
      .update({ status: nextStatus })
      .eq("id", orderId);

    if (error) {
      alert("Error updating order status: " + error.message);
    } else {
      fetchData();
    }
  };

  // Add new product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("products").insert([
      {
        name: newProduct.name,
        price: parseFloat(newProduct.price),
        description: newProduct.description,
        category: newProduct.category,
        stock: parseInt(newProduct.stock)
      }
    ]);

    if (error) {
      alert("Error adding product: " + error.message);
    } else {
      setNewProduct({
        name: "",
        price: "",
        description: "",
        category: "1",
        stock: "100"
      });
      alert("Product added successfully!");
      fetchData();
    }
  };

  // Delete review
  const handleDeleteReview = async (reviewId) => {
    if (confirm("Are you sure you want to delete this review?")) {
      const { error } = await supabase
        .from("reviews")
        .delete()
        .eq("id", reviewId);

      if (error) {
        alert("Error deleting review: " + error.message);
      } else {
        fetchData();
      }
    }
  };

  if (loading) {
    return (
      <div className="bg-white min-h-screen text-[#0e1a30] flex items-center justify-center">
        <p className="text-xl font-semibold">Verifying credentials...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="bg-white min-h-screen text-[#0e1a30] flex flex-col items-center justify-center space-y-4">
        <h2 className="text-3xl font-bold text-red-600 font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
          Access Denied
        </h2>
        <p className="text-gray-600 text-sm">
          You do not have administrative privileges. Redirecting to login...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen text-[#0e1a30] flex flex-col justify-between">
      <Navbar />

      <section className="max-w-7xl mx-auto py-32 px-8 w-full flex-grow">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 border-b border-[#0e1a30]/10 pb-6 gap-4">
          <div>
            <span className="text-[#c5a059] uppercase tracking-[0.25em] text-xs font-bold block">
              Ayurelix Portal
            </span>
            <h1 className="text-[#0e1a30] text-4xl font-black font-serif mt-1" style={{ fontFamily: "'Cinzel', serif" }}>
              Admin Dashboard
            </h1>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("orders")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition shadow-sm ${
                activeTab === "orders" ? "bg-[#0e1a30] text-white" : "bg-white border border-[#0e1a30]/5 text-gray-600 hover:text-[#0e1a30]"
              }`}
            >
              <FiShoppingBag />
              <span>Orders</span>
            </button>
            <button
              onClick={() => setActiveTab("products")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition shadow-sm ${
                activeTab === "products" ? "bg-[#0e1a30] text-white" : "bg-white border border-[#0e1a30]/5 text-gray-600 hover:text-[#0e1a30]"
              }`}
            >
              <FiLayers />
              <span>Products</span>
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition shadow-sm ${
                activeTab === "reviews" ? "bg-[#0e1a30] text-white" : "bg-white border border-[#0e1a30]/5 text-gray-600 hover:text-[#0e1a30]"
              }`}
            >
              <FiStar />
              <span>Reviews</span>
            </button>
          </div>
        </div>

        {/* Tab Contents */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold font-serif text-[#0e1a30]">Customer Orders ({orders.length})</h2>
            {orders.length === 0 ? (
              <p className="text-gray-500 italic">No orders received yet.</p>
            ) : (
              <div className="grid gap-6">
                {orders.map((order) => (
                  <div key={order.id} className="bg-[#fbf9f4] border border-[#0e1a30]/5 p-6 rounded-3xl space-y-4 shadow-sm">
                    <div className="flex flex-wrap justify-between items-start border-b border-[#0e1a30]/5 pb-4 gap-2">
                      <div>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Order ID</p>
                        <p className="text-xs text-[#c5a059] font-mono">{order.id}</p>
                        <p className="text-xs text-gray-600 mt-1">
                          Placed on: {new Date(order.created_at).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                          order.status === "paid"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : order.status === "shipped"
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : "bg-gray-50 text-gray-700 border-gray-200"
                        }`}>
                          Status: {order.status}
                        </span>
                        {order.status !== "delivered" && (
                          <button
                            onClick={() => handleUpdateOrderStatus(order.id, order.status)}
                            className="bg-[#0e1a30] hover:bg-[#c5a059] text-white px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition shadow-sm"
                          >
                            <FiCheckCircle size={12} />
                            <span>Mark as {order.status === "paid" ? "Shipped" : "Delivered"}</span>
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Shipping details */}
                      <div className="space-y-1.5 text-xs">
                        <h4 className="font-bold text-[#c5a059] uppercase tracking-wider flex items-center gap-1">
                          <FiTruck />
                          <span>Shipping Details</span>
                        </h4>
                        <p className="text-[#0e1a30] font-medium">{order.shipping_address.fullName}</p>
                        <p className="text-gray-600">{order.shipping_address.address}</p>
                        <p className="text-gray-600">
                          {order.shipping_address.city}, {order.shipping_address.state} - {order.shipping_address.postalCode}
                        </p>
                        <p className="text-gray-600">Phone: {order.shipping_address.phone}</p>
                      </div>

                      {/* Order items */}
                      <div className="space-y-2 text-xs">
                        <h4 className="font-bold text-[#c5a059] uppercase tracking-wider">Ordered Items</h4>
                        <div className="space-y-1.5">
                          {order.order_items.map((item) => (
                            <div key={item.id} className="flex justify-between items-center text-gray-600">
                              <span>
                                {item.products?.name || "Deleted Product"} (x{item.quantity})
                              </span>
                              <span className="font-bold text-[#0e1a30]">₹{item.price * item.quantity}</span>
                            </div>
                          ))}
                          <div className="flex justify-between items-center border-t border-[#0e1a30]/5 pt-2 mt-2 font-bold">
                            <span className="text-gray-500 text-sm">Total Paid</span>
                            <span className="text-[#c5a059] text-base">₹{order.total_amount}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "products" && (
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Products list */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-xl font-bold font-serif text-[#0e1a30]">Store Products ({products.length})</h2>
              <div className="bg-white border border-[#0e1a30]/5 rounded-3xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#0e1a30]/10 text-[10px] text-gray-600 uppercase tracking-wider font-bold bg-[#fbf9f4]">
                      <th className="p-4">ID</th>
                      <th className="p-4">Name</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Stock</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs">
                    {products.map((prod) => (
                      <tr key={prod.id} className="border-b border-[#0e1a30]/5 hover:bg-[#fbf9f4]/50 transition">
                        <td className="p-4 text-gray-500 font-mono">{prod.id}</td>
                        <td className="p-4 text-[#0e1a30] font-medium">{prod.name}</td>
                        <td className="p-4 text-[#c5a059] font-bold">₹{prod.price}</td>
                        <td className="p-4 text-gray-600">{prod.stock} left</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Add product form */}
            <div className="lg:col-span-5">
              <div className="bg-[#fbf9f4] border border-[#0e1a30]/5 p-6 rounded-3xl shadow-xl sticky top-28 space-y-4">
                <h3 className="text-lg font-bold font-serif text-[#0e1a30] flex items-center gap-2">
                  <FiPlus className="text-[#c5a059]" />
                  <span>Add New Product</span>
                </h3>
                <form onSubmit={handleAddProduct} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-gray-600 mb-1">Product Name</label>
                    <input
                      type="text"
                      required
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      placeholder="Ayurelix Energy Booster"
                      className="w-full bg-white border border-[#0e1a30]/10 rounded-xl px-4 py-2.5 text-[#0e1a30] focus:outline-none focus:border-[#c5a059] transition"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-gray-600 mb-1">Price (₹)</label>
                      <input
                        type="number"
                        required
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        placeholder="1199"
                        className="w-full bg-white border border-[#0e1a30]/10 rounded-xl px-4 py-2.5 text-[#0e1a30] focus:outline-none focus:border-[#c5a059] transition"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-gray-600 mb-1">Category Code</label>
                      <select
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                        className="w-full bg-white border border-[#0e1a30]/10 rounded-xl px-4 py-2.5 text-[#0e1a30] focus:outline-none focus:border-[#c5a059] transition"
                      >
                        <option value="1">Immunity (1)</option>
                        <option value="2">Hair Care (2)</option>
                        <option value="3">Detox (3)</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-gray-600 mb-1">Initial Stock</label>
                    <input
                      type="number"
                      required
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                      placeholder="100"
                      className="w-full bg-white border border-[#0e1a30]/10 rounded-xl px-4 py-2.5 text-[#0e1a30] focus:outline-none focus:border-[#c5a059] transition"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-gray-600 mb-1">Description</label>
                    <textarea
                      required
                      rows={3}
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                      placeholder="A premium wellness blend of..."
                      className="w-full bg-white border border-[#0e1a30]/10 rounded-xl p-4 text-[#0e1a30] focus:outline-none focus:border-[#c5a059] transition"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#0e1a30] text-white font-black rounded-xl hover:bg-[#c5a059] active:scale-[0.98] transition duration-200 uppercase tracking-wider shadow-md"
                  >
                    Add Product to Shop
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold font-serif text-[#0e1a30]">Product Reviews ({reviews.length})</h2>
            {reviews.length === 0 ? (
              <p className="text-gray-500 italic">No reviews submitted yet.</p>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {reviews.map((rev) => (
                  <div key={rev.id} className="bg-[#fbf9f4] border border-[#0e1a30]/5 p-5 rounded-3xl space-y-3 relative group shadow-sm">
                    <button
                      onClick={() => handleDeleteReview(rev.id)}
                      className="absolute right-4 top-4 p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 hover:bg-red-500 hover:text-white transition duration-200 opacity-0 group-hover:opacity-100"
                    >
                      <FiTrash2 size={14} />
                    </button>
                    <div className="flex justify-between items-center text-xs">
                      <div>
                        <p className="font-bold text-[#0e1a30]">{rev.user_name}</p>
                        <p className="text-gray-600 text-[10px] mt-0.5">
                          On product: <span className="text-[#c5a059] font-semibold">{rev.products?.name || "Deleted"}</span>
                        </p>
                      </div>
                      <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">
                        {new Date(rev.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex text-[#c5a059]">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          size={12}
                          className={i < rev.rating ? "fill-[#c5a059]" : ""}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed font-sans mt-2">{rev.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
