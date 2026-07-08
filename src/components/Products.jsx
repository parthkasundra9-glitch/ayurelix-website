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
        <div className="text-center mb-16 space-y-4">
          <span className="text-[#B89355] uppercase tracking-[0.25em] text-xs font-bold block">
            Pure apothecary
          </span>
          <h1 className="text-[#1A2B49] text-5xl md:text-6xl font-black font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
            {categoryName ? `Our ${categoryName}` : "Our Formulations"}
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover our carefully crafted range of premium Ayurvedic wellness formulations designed for modern life.
          </p>
        </div>

        {/* Products Grid */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 z-10 relative justify-center max-w-7xl mx-auto"
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

