import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import ProductCard from "./ProductCard";
import Certifications from "./Certifications";
import IngredientsShowcase from "./IngredientsShowcase";
import Footer from "./Footer";
import ProductDetailsModal from "./ProductDetailsModal";
import { products as fallbackProducts } from "../data/products";
import { supabase } from "../supabaseClient";

export default function Home() {
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
          const filtered = data
            .filter(p => p.id === 1 || p.id === 2 || p.name.toLowerCase().includes('kumkumadi') || p.name.toLowerCase().includes('pigmentation'))
            .map(p => {
              if (p.id === 1 || p.name.toLowerCase().includes('kumkumadi')) {
                return { ...p, name: "Kumkumadi Oil" };
              }
              if (p.id === 2 || p.name.toLowerCase().includes('pigmentation')) {
                return { ...p, name: "Anti Pigmentation Cream" };
              }
              return p;
            });
          setProductsList(filtered);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    }
    fetchProducts();
  }, []);

  const handleOpenDetails = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="bg-white min-h-screen text-[#3C5A44]">
      
      {/* Navigation */}
      <Navbar />

      {/* Hero Welcome */}
      <Hero />

      {/* Trust Badges Certifications */}
      <Certifications />

      {/* Botanical Ingredients Section */}
      <IngredientsShowcase />

      {/* Best Sellers Shopping Grid */}
      <section id="best-sellers-section" className="max-w-7xl mx-auto py-24 px-8 relative scroll-mt-12 bg-white">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#B89355]/3 blur-[120px] pointer-events-none" />

        <div className="text-center mb-16 z-10 relative">
          <span className="text-[#B89355] uppercase tracking-[0.25em] text-xs font-bold block mb-3">
            Handcrafted Formulations
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#3C5A44] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
            The Best Sellers
          </h2>
          <p className="text-gray-600 text-base max-w-xl mx-auto mt-4">
            Experience our most loved, highly potent remedies sought after by our community.
          </p>
        </div>

        <div className={`grid gap-8 z-10 relative justify-center ${
          productsList.length === 2 ? "md:grid-cols-2 max-w-4xl mx-auto" : "md:grid-cols-3"
        }`}>
          {productsList.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onView={handleOpenDetails}
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

