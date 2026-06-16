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
    <div className="mt-12 border-t border-[#3C5A44]/10 pt-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-serif text-[#3C5A44] font-bold" style={{ fontFamily: "'Cinzel', serif" }}>
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
        <form onSubmit={handleSubmitReview} className="bg-[#fbf9f4] border border-[#3C5A44]/5 p-6 rounded-2xl mb-8 space-y-4 shadow-sm">
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
              className="w-full bg-white border border-[#3C5A44]/10 rounded-xl p-4 text-sm text-[#3C5A44] focus:outline-none focus:border-[#B89355] transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-[#3C5A44] hover:bg-[#B89355] text-white font-bold rounded-xl transition duration-200 disabled:opacity-50 text-xs uppercase tracking-wider"
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      ) : (
        <div className="bg-[#fbf9f4] border border-[#3C5A44]/5 p-6 rounded-2xl mb-8 text-center text-sm text-gray-500 font-medium shadow-sm">
          Please{" "}
          <Link to="/login" className="text-[#B89355] hover:underline font-bold">
            Login
          </Link>{" "}
          to write a customer review.
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <p className="text-gray-500 text-sm italic py-4">No reviews yet for this product. Be the first to review!</p>
        ) : (
          reviews.map((rev) => (
            <div key={rev.id} className="bg-[#fbf9f4] border border-[#3C5A44]/5 p-5 rounded-2xl space-y-2 shadow-sm">
              <div className="flex justify-between items-center">
                <span className="font-bold text-sm text-[#3C5A44]">{rev.user_name}</span>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                  {new Date(rev.created_at).toLocaleDateString()}
                </span>
              </div>
              <div className="flex text-[#B89355]">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    size={12}
                    className={i < rev.rating ? "fill-[#B89355]" : ""}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-600 leading-relaxed font-sans mt-2">{rev.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
