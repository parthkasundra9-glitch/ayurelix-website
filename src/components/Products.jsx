import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import ProductCard from "./ProductCard";
import Footer from "./Footer";
import ProductDetailsModal from "./ProductDetailsModal";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";
import { supabase } from "../supabaseClient";
import { FiFilter, FiSliders, FiRefreshCw, FiSearch } from "react-icons/fi";

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { products, loadingProducts } = useCart();
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [sortBy, setSortBy] = useState("featured"); // 'featured' | 'price-low' | 'price-high' | 'rating'
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const searchVal = (searchParams.get("search") || "").toLowerCase();
  const categoryIdParam = searchParams.get("category");

  useEffect(() => {
    document.title = "Shop Ayurvedic Skincare Formulations | Ayurelix";
  }, []);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data } = await supabase.from("categories").select("*").order("name");
        if (data) setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchCategoryName() {
      if (categoryIdParam) {
        try {
          const { data } = await supabase
            .from("categories")
            .select("name")
            .eq("id", parseInt(categoryIdParam))
            .single();
          if (data) setCategoryName(data.name);
        } catch {
          setCategoryName("");
        }
      } else {
        setCategoryName("");
      }
    }
    fetchCategoryName();
  }, [categoryIdParam]);

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = (product.name || "").toLowerCase().includes(searchVal) ||
                          (product.description || "").toLowerCase().includes(searchVal);
    const matchesCategory = categoryIdParam ? String(product.category_id) === categoryIdParam : true;
    return matchesSearch && matchesCategory;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return Number(a.price) - Number(b.price);
    if (sortBy === "price-high") return Number(b.price) - Number(a.price);
    if (sortBy === "rating") return (b.rating || 5) - (a.rating || 5);
    return a.id - b.id; // default featured
  });

  const handleSelectCategory = (catId) => {
    const params = new URLSearchParams(searchParams);
    if (catId) {
      params.set("category", catId);
    } else {
      params.delete("category");
    }
    setSearchParams(params);
  };

  const handleResetFilters = () => {
    setSearchParams({});
    setSortBy("featured");
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#1A2B49] font-sans">
      <Navbar />

      <section className="max-w-7xl mx-auto pt-32 lg:pt-44 pb-32 px-4 sm:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-12 space-y-4">
          <span className="text-[#B89355] uppercase tracking-[0.25em] text-xs font-bold block">
            Pure Botanical Apothecary
          </span>
          <h1 className="text-[#1A2B49] text-4xl sm:text-5xl lg:text-6xl font-black font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
            {categoryName ? categoryName : searchVal ? `Results for "${searchVal}"` : "Formulation Catalog"}
          </h1>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Discover our carefully crafted range of chemical-free, organic Ayurvedic wellness formulations designed for modern skin rituals.
          </p>
        </div>

        {/* INTERACTIVE CONTROLS BAR: CATEGORY PILLS & SORT SELECTOR */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#1A2B49]/10">
          
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
            <button
              onClick={() => handleSelectCategory(null)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                !categoryIdParam 
                  ? "bg-[#1A2B49] text-white shadow-md" 
                  : "bg-white text-[#1A2B49] hover:bg-[#B89355]/10 border border-[#1A2B49]/10"
              }`}
            >
              All Formulations ({products.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleSelectCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  categoryIdParam === String(cat.id)
                    ? "bg-[#B89355] text-white shadow-md"
                    : "bg-white text-[#1A2B49] hover:bg-[#B89355]/10 border border-[#1A2B49]/10"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Sort Selector Dropdown */}
          <div className="flex items-center gap-3 shrink-0 self-end md:self-auto">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
              <FiSliders className="text-[#B89355]" />
              <span>Sort By:</span>
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-[#1A2B49]/15 rounded-xl px-3.5 py-2 text-xs font-bold text-[#1A2B49] focus:outline-none focus:border-[#B89355] shadow-sm cursor-pointer"
            >
              <option value="featured">Featured Formulations</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Customer Rating</option>
            </select>
          </div>
        </div>

        {/* Active Filter Tags */}
        {(searchVal || categoryIdParam) && (
          <div className="flex items-center gap-3 mb-8 bg-white p-3 rounded-2xl border border-[#1A2B49]/5 shadow-sm text-xs">
            <span className="text-gray-400 font-bold uppercase tracking-wider">Active Filters:</span>
            {searchVal && (
              <span className="bg-[#FAF8F5] text-[#1A2B49] font-semibold px-3 py-1 rounded-lg border border-[#1A2B49]/10">
                Search: "{searchVal}"
              </span>
            )}
            {categoryName && (
              <span className="bg-[#B89355]/10 text-[#B89355] font-bold px-3 py-1 rounded-lg border border-[#B89355]/20">
                Category: {categoryName}
              </span>
            )}
            <button
              onClick={handleResetFilters}
              className="ml-auto text-xs text-red-600 hover:underline font-bold flex items-center gap-1 cursor-pointer"
            >
              <FiRefreshCw size={12} />
              <span>Reset All</span>
            </button>
          </div>
        )}

        {/* Products Grid & Loading States */}
        {loadingProducts ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-80 skeleton-shimmer rounded-3xl" />
            ))}
          </div>
        ) : sortedProducts.length === 0 ? (
          /* Contextual Empty State */
          <div className="bg-white border border-[#1A2B49]/5 p-16 rounded-3xl text-center space-y-4 shadow-sm max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#FAF8F5] flex items-center justify-center text-gray-400 mx-auto">
              <FiSearch size={28} />
            </div>
            <h3 className="text-xl font-bold text-[#1A2B49] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
              No formulations found
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              We couldn't find any Ayurvedic remedies matching your current filter criteria. Try searching for "Kumkumadi", "Saffron", or reset your filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-6 py-2.5 bg-[#1A2B49] text-white font-bold rounded-xl text-xs uppercase tracking-wider hover:bg-[#B89355] transition shadow-md cursor-pointer"
            >
              Show All Formulations
            </button>
          </div>
        ) : (
          /* Products Grid */
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 z-10 relative justify-center max-w-7xl mx-auto">
            {sortedProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onView={(p) => setSelectedProduct(p)}
                isGrid={true}
              />
            ))}
          </div>
        )}
      </section>

      <Footer />

      {/* Dynamic PDP Modal */}
      <ProductDetailsModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
