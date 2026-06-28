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
  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#3C5A44] font-sans antialiased overflow-x-hidden">
      
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

      {/* Row Wrapper for Products, Best Seller, and The Alchemy of Ayurveda */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <FeaturedProducts />
          <BestSellers />
          <IngredientsShowcase />
        </div>
      </div>

      {/* Why Choose Us Trust Pillars */}
      <WhyChooseUs />

      {/* Customer Testimonial Slider */}
      <CustomerReviews />

      {/* Newsletter Subscription Column & Global Footer */}
      <Footer />

    </div>
  );
}
