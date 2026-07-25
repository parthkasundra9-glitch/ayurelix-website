import { useState, useEffect, useCallback } from "react";
import { supabase } from "../supabaseClient";
import { FiStar } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function ProductReviews({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAllReviews, setShowAllReviews] = useState(false);

  const fetchReviews = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("product_id", productId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching reviews:", error.message);
      } else {
        setReviews(data || []);
      }
    } catch {
      console.error("Error fetching reviews");
    }
  }, [productId]);

  useEffect(() => {
    // Check if user is logged in
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    fetchReviews();
  }, [productId, fetchReviews]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("Please login to submit a review.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Get user full name from profiles table
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .single();

      const userName = profile?.full_name || user.email.split("@")[0];

      const { error: insertError } = await supabase.from("reviews").insert([
        {
          product_id: productId,
          user_id: user.id,
          rating,
          comment,
          user_name: userName
        }
      ]);

      if (insertError) {
        setError(insertError.message);
      } else {
        setComment("");
        setRating(5);
        fetchReviews();
      }
    } catch {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  return (
    <div className="mt-12 border-t border-[#1A2B49]/10 pt-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-serif text-[#1A2B49] font-bold" style={{ fontFamily: "'Cinzel', serif" }}>
          Customer Reviews ({reviews.length})
        </h3>
        {averageRating && (
          <div className="flex items-center gap-1.5 bg-[#fbf9f4] border border-[#B89355]/30 px-3.5 py-1.5 rounded-full shadow-sm">
            <span className="text-[#B89355] font-bold text-sm">{averageRating}</span>
            <div className="flex text-[#B89355]">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  size={12}
                  className={i < Math.round(averageRating) ? "fill-[#B89355]" : ""}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Review Form */}
      {user ? (
        <form onSubmit={handleSubmitReview} className="bg-[#fbf9f4] border border-[#1A2B49]/5 p-6 rounded-2xl mb-8 space-y-4 shadow-sm">
          <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Write a Review</h4>
          
          {error && (
            <div className="text-red-600 text-xs bg-red-500/10 border border-red-500/20 p-2.5 rounded-lg">
              {error}
            </div>
          )}

          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Rating</span>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className="text-[#B89355] hover:scale-110 transition"
                >
                  <FiStar
                    size={22}
                    className={star <= rating ? "fill-[#B89355]" : ""}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <textarea
              required
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience with this formulation..."
              className="w-full bg-white border border-[#1A2B49]/10 rounded-xl p-4 text-sm text-[#1A2B49] focus:outline-none focus:border-[#B89355] transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-[#1A2B49] hover:bg-[#B89355] text-white font-bold rounded-xl transition duration-200 disabled:opacity-50 text-xs uppercase tracking-wider"
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      ) : (
        <div className="bg-[#fbf9f4] border border-[#1A2B49]/5 p-6 rounded-2xl mb-8 text-center text-sm text-gray-500 font-medium shadow-sm">
          Please{" "}
          <Link to="/login" className="text-[#B89355] hover:underline font-bold">
            Login
          </Link>{" "}
          to write a customer review.
        </div>
      )}

      {/* Reviews List */}
      <div className="divide-y divide-gray-100">
        {reviews.length === 0 ? (
          <p className="text-gray-500 text-sm italic py-6">No reviews yet for this product. Be the first to review!</p>
        ) : (
          (showAllReviews ? reviews : reviews.slice(0, 3)).map((rev) => (
            <div key={rev.id} className="flex gap-4 sm:gap-6 py-6 items-start">
              {/* Left Column: User Profile Badge */}
              <div className="flex flex-col items-center text-center w-20 sm:w-28 shrink-0">
                {/* Avatar with dynamic initial and verified check icon */}
                <div className="relative inline-block shrink-0 mb-1.5">
                  <div className="w-10 h-10 rounded-full bg-[#B89355]/10 flex items-center justify-center text-sm font-bold text-[#B89355] uppercase">
                    {rev.user_name ? rev.user_name.charAt(0) : "A"}
                  </div>
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border border-white flex items-center justify-center text-[8px] text-white" title="Verified Buyer">
                    ✓
                  </span>
                </div>
                
                <span className="font-bold text-xs sm:text-sm text-[#1A2B49] truncate w-full" title={rev.user_name}>
                  {rev.user_name}
                </span>
                <span className="text-[8px] sm:text-[9px] text-[#B89355] font-bold uppercase tracking-wider mt-0.5">
                  Verified Buyer
                </span>
                <span className="text-[8px] sm:text-[9px] text-gray-400 font-medium mt-1">
                  {new Date(rev.created_at).toLocaleDateString()}
                </span>
              </div>

              {/* Right Column: Review comment and inline reply */}
              <div className="flex-1 space-y-1.5">
                {/* Rating stars */}
                <div className="flex text-[#B89355]">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      size={10}
                      className={i < rev.rating ? "fill-[#B89355]" : ""}
                    />
                  ))}
                </div>
                
                {/* Comment body */}
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-sans font-medium">
                  {rev.comment}
                </p>

                {/* Subtly Indented Admin Reply (Thread style instead of heavy box) */}
                {rev.admin_reply && (
                  <div className="mt-3 bg-[#FAF8F5]/80 border-l-2 border-[#B89355] pl-3 py-1.5 rounded-r-lg">
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#B89355] block">
                      Reply from Ayurelix:
                    </span>
                    <p className="text-xs text-gray-600 italic leading-relaxed font-sans mt-0.5">
                      {rev.admin_reply}
                    </p>
                  </div>
                )}

                {/* Share Link (Aesthetic matching screenshot 1) */}
                <button className="text-[9px] text-gray-400 hover:text-gray-600 font-bold block pt-1 cursor-pointer">
                  Share
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* See All / Show Less Toggle Buttons */}
      {reviews.length > 3 && (
        <div className="text-center mt-6 pt-4 border-t border-gray-100">
          <button
            onClick={() => setShowAllReviews(!showAllReviews)}
            className="px-6 py-2 border border-[#B89355]/30 rounded-full text-[10px] uppercase tracking-[0.2em] font-black text-[#B89355] hover:bg-[#B89355] hover:text-white transition duration-300 cursor-pointer shadow-sm"
          >
            {showAllReviews ? "Show Less" : `See All Reviews (${reviews.length})`}
          </button>
        </div>
      )}
    </div>
  );
}
