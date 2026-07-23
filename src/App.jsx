import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import CartDrawer from "./components/CartDrawer";

// Lazy-loaded routes
const Home = lazy(() => import("./components/Home"));
const Products = lazy(() => import("./components/Products"));
const About = lazy(() => import("./components/About"));
const Contact = lazy(() => import("./components/Contact"));
const Login = lazy(() => import("./components/Login"));
const Signup = lazy(() => import("./components/Signup"));
const AdminDashboard = lazy(() => import("./components/AdminDashboard"));
const UserProfile = lazy(() => import("./components/UserProfile"));
const ShippingDelivery = lazy(() => import("./components/ShippingDelivery"));
const RefundPolicy = lazy(() => import("./components/RefundPolicy"));
const TermsOfService = lazy(() => import("./components/TermsOfService"));
const PrivacyPolicy = lazy(() => import("./components/PrivacyPolicy"));
const CustomerSupport = lazy(() => import("./components/CustomerSupport"));
const ForgotPassword = lazy(() => import("./components/ForgotPassword"));
const ResetPassword = lazy(() => import("./components/ResetPassword"));
const Favorites = lazy(() => import("./components/Favorites"));

function App() {
  return (
    <CartProvider>
      <Router>
        <Suspense fallback={
          <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#FAF8F5] text-[#1A2B49]">
            <div className="w-10 h-10 border-4 border-[#B89355] border-t-transparent rounded-full animate-spin mb-4"></div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 animate-pulse">Loading Ayurelix...</span>
          </div>
        }>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/shipping-delivery" element={<ShippingDelivery />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/customer-support" element={<CustomerSupport />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/wishlist" element={<Favorites />} />
          </Routes>
        </Suspense>
        <CartDrawer />
      </Router>
    </CartProvider>
  );
}

export default App;

