import React, { useEffect } from "react";
import Navbar from "./Navbar";
import HeroSlider from "./HeroSlider";
import Certifications from "./Certifications";
import CategorySection from "./CategorySection";
import FeaturedProducts from "./FeaturedProducts";
import BestSellers from "./BestSellers";
import WhyChooseUs from "./WhyChooseUs";
import CustomerReviews from "./CustomerReviews";
import IngredientsShowcase from "./IngredientsShowcase";
import Footer from "./Footer";

export default function Home() {
  useEffect(() => {
    document.title = "Ayurelix | The Elixir of Ayurveda";
  }, []);

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#1A2B49] font-sans antialiased overflow-x-hidden">
      
      {/* Premium Sticky Navigation Header */}
      <Navbar />

      {/* Hero Banner Auto Slider */}
      <HeroSlider />

      {/* Trust Badge Certifications */}
      <Certifications />

      {/* Category Section Cards */}
      <div id="category-section">
        <CategorySection />
      </div>

      {/* Featured Products Section */}
      <FeaturedProducts />

      {/* Best Sellers Shopping Grid */}
      <BestSellers />

      {/* Botanical Ingredients Alchemy */}
      <IngredientsShowcase />

      {/* Why Choose Us Trust Pillars */}
      <WhyChooseUs />

      {/* Customer Testimonial Slider */}
      <CustomerReviews />

      {/* Newsletter Subscription Column & Global Footer */}
      <Footer />

    </div>
  );
}
