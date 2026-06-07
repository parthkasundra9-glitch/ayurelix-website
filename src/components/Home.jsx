import { useState } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import ProductCard from "./ProductCard";
import Certifications from "./Certifications";
import IngredientsShowcase from "./IngredientsShowcase";
import DoshaQuiz from "./DoshaQuiz";
import Footer from "./Footer";
import ProductDetailsModal from "./ProductDetailsModal";

import { products } from "../data/products";

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOpenDetails = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="bg-white min-h-screen text-[#0e1a30]">
      
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#c5a059]/3 blur-[120px] pointer-events-none" />

        <div className="text-center mb-16 z-10 relative">
          <span className="text-[#c5a059] uppercase tracking-[0.25em] text-xs font-bold block mb-3">
            Handcrafted Formulations
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#0e1a30] font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
            The Best Sellers
          </h2>
          <p className="text-gray-600 text-base max-w-xl mx-auto mt-4">
            Experience our most loved, highly potent remedies sought after by our community.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 z-10 relative">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onView={handleOpenDetails}
            />
          ))}
        </div>
      </section>

      {/* Interactive Ayurvedic Quiz Section */}
      <div id="dosha-quiz-section" className="scroll-mt-12">
        <DoshaQuiz onSelectProduct={handleOpenDetails} />
      </div>

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

