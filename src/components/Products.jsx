import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "./Navbar";
import ProductCard from "./ProductCard";
import Footer from "./Footer";
import ProductDetailsModal from "./ProductDetailsModal";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";
import { supabase } from "../supabaseClient";

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { products, loadingProducts } = useCart();
  const [categoryName, setCategoryName] = useState("");
  const [searchParams] = useSearchParams();
  const searchVal = (searchParams.get("search") || "").toLowerCase();
  const categoryIdParam = searchParams.get("category");

  useEffect(() => {
    document.title = "Shop Ayurvedic Skincare Formulations | Ayurelix";
  }, []);

  useEffect(() => {
    async function fetchCategoryName() {
      if (categoryIdParam) {
        try {
          const { data, error } = await supabase
            .from("categories")
            .select("name")
            .eq("id", parseInt(categoryIdParam))
            .single();
          if (error) {
            console.error("Error fetching category name:", error.message);
          } else if (data) {
            setCategoryName(data.name);
          }
        } catch (err) {
          console.error("Error fetching category name:", err);
        }
      } else {
        setCategoryName("");
      }
    }
    fetchCategoryName();
  }, [categoryIdParam]);

  const displayedProducts = products.filter(product => {
    const matchesSearch = (product.name || "").toLowerCase().includes(searchVal) ||
                          (product.description || "").toLowerCase().includes(searchVal);
    const matchesCategory = categoryIdParam ? String(product.category_id) === categoryIdParam : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-white min-h-screen text-[#1A2B49]">
      {/* Navigation */}
      <Navbar />

      <section className="max-w-7xl mx-auto pt-32 lg:pt-44 pb-32 px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-[#B89355] uppercase tracking-[0.25em] text-xs font-bold block">
            Pure apothecary
          </span>
          <h1 className="text-[#1A2B49] text-5xl md:text-6xl font-black font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
            {categoryName ? categoryName : "Products"}
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover our carefully crafted range of premium Ayurvedic wellness formulations designed for modern life.
          </p>
        </div>

        {/* Products Grid */}
        {loadingProducts && displayedProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-12 h-12 rounded-full border-2 border-[#B89355]/20 border-t-[#1A2B49] animate-spin" />
            <p className="text-gray-500 font-serif italic text-sm">Harmonizing wellness formulations...</p>
          </div>
        ) : (
          <div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 z-10 relative justify-center max-w-7xl mx-auto"
          >
            {displayedProducts.map(product => (
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

      {/* Brand Footer */}
      <Footer />

      {/* Dynamic Overlay Product Detail Modal */}
      <ProductDetailsModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}

