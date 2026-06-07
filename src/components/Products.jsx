import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import ProductCard from "./ProductCard";
import Footer from "./Footer";
import ProductDetailsModal from "./ProductDetailsModal";
import { products as fallbackProducts } from "../data/products";
import { motion } from "framer-motion";
import { supabase } from "../supabaseClient";

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productsList, setProductsList] = useState(fallbackProducts);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("id", { ascending: true });

        if (error) {
          console.error("Error fetching products from database:", error.message);
        } else if (data && data.length > 0) {
          setProductsList(data);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    }
    fetchProducts();
  }, []);

  // Map category values to product IDs or attributes
  // 1: Immunity, 2: Hair Care, 3: Detox
  const categories = [
    { name: "All Remedies", value: "all" },
    { name: "Immunity", value: 1 },
    { name: "Hair Care", value: 2 },
    { name: "Detoxification", value: 3 }
  ];

  const filteredProducts = selectedCategory === "all"
    ? productsList
    : productsList.filter(p => p.category === String(selectedCategory) || p.id === Number(selectedCategory));

  return (
    <div className="bg-white min-h-screen text-[#0e1a30]">
      {/* Navigation */}
      <Navbar />

      <section className="max-w-7xl mx-auto py-32 px-8">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 space-y-4"
        >
          <span className="text-[#c5a059] uppercase tracking-[0.25em] text-xs font-bold block">
            Pure apothecary
          </span>
          <h1 className="text-[#0e1a30] text-5xl md:text-6xl font-black font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
            Our Formulations
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover our carefully crafted range of premium Ayurvedic wellness formulations designed for modern life.
          </p>
        </motion.div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(cat.value)}
              className={`
              px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300
              ${selectedCategory === cat.value
                ? "bg-[#0e1a30] text-white shadow-sm"
                : "bg-white border border-[#0e1a30]/5 text-gray-600 hover:text-[#0e1a30] hover:border-[#c5a059]/40 shadow-sm"
              }
              `}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <motion.div
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="grid md:grid-cols-3 gap-8 min-h-[300px]"
        >
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onView={(p) => setSelectedProduct(p)}
            />
          ))}
        </motion.div>
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

