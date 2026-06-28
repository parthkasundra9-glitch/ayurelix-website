import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "./Navbar";
import ProductCard from "./ProductCard";
import Footer from "./Footer";
import ProductDetailsModal from "./ProductDetailsModal";
import { products as fallbackProducts } from "../data/products";
import { motion } from "framer-motion";
import { supabase } from "../supabaseClient";

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productsList, setProductsList] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [searchParams] = useSearchParams();
  const searchVal = (searchParams.get("search") || "").toLowerCase();
  const categoryIdParam = searchParams.get("category");

  useEffect(() => {
    document.title = "Shop Ayurvedic Skincare Formulations | Ayurelix";
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("id", { ascending: true });

        if (error) {
          console.error("Error fetching products from database:", error.message);
        } else if (data) {
          setProductsList(data);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    }
    fetchProducts();
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

  const displayedProducts = productsList.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchVal) ||
                          product.description.toLowerCase().includes(searchVal);
    const matchesCategory = categoryIdParam ? String(product.category_id) === categoryIdParam : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-white min-h-screen text-[#1A2B49]">
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
          <span className="text-[#B89355] uppercase tracking-[0.25em] text-xs font-bold block">
            Pure apothecary
          </span>
          <h1 className="text-[#1A2B49] text-5xl md:text-6xl font-black font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
            {categoryName ? `Our ${categoryName}` : "Our Formulations"}
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover our carefully crafted range of premium Ayurvedic wellness formulations designed for modern life.
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className={`grid gap-8 z-10 relative justify-center ${
            displayedProducts.length === 1
              ? "grid-cols-1 max-w-sm mx-auto"
              : displayedProducts.length === 2
              ? "grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto"
          }`}
        >
          {displayedProducts.map(product => (
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

