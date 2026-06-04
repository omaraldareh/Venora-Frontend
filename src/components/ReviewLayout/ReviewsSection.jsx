import { useState, useEffect } from "react";
import { Star, MessageSquare, PenLine } from "lucide-react";
import API from "../../api/axios";
import ReviewCard from "./ReviewCard";
import ReviewModal from "./ReviewModal";

const StarRow = ({ rating, size = 16 }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => {
      const filled = star <= Math.floor(rating);
      const partial = !filled && star - 1 < rating && star > Math.floor(rating);
      return (
        <div key={star} className="relative">
          <Star size={size} className="text-gray-700 fill-gray-700" />
          {(filled || partial) && (
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: filled ? "100%" : `${(rating % 1) * 100}%` }}
            >
              <Star size={size} className="text-[#D4A353] fill-[#D4A353]" />
            </div>
          )}
        </div>
      );
    })}
  </div>
);

const ReviewSkeleton = () => (
  <div className="bg-[#0F172A] border border-white/5 rounded-3xl p-6 animate-pulse space-y-3">
    <div className="flex items-center gap-4">
      <div className="w-11 h-11 rounded-2xl bg-white/5" />
      <div className="flex-1 space-y-2">
        <div className="h-3 w-28 bg-white/5 rounded-full" />
        <div className="h-3 w-20 bg-white/5 rounded-full" />
      </div>
      <div className="h-3 w-16 bg-white/5 rounded-full" />
    </div>
    <div className="space-y-2 pt-1">
      <div className="h-3 w-full bg-white/5 rounded-full" />
      <div className="h-3 w-3/4 bg-white/5 rounded-full" />
    </div>
  </div>
);

const RatingBar = ({ star, count, total }) => {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-gray-500 w-3 shrink-0">{star}</span>
      <Star size={11} className="text-[#D4A353] fill-[#D4A353] shrink-0" />
      <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full bg-linear-to-r from-[#C6A15B] to-[#D4AF37] rounded-full transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs text-gray-600 w-6 text-right shrink-0">{count}</span>
    </div>
  );
};

const ReviewsSection = ({ hallId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const token = localStorage.getItem("token");
  let userRole = null;
  try {
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      userRole = payload?.role;
    }
  } catch (e) {
    void e;
  }
  const canReview = !!token && userRole === "user";

  useEffect(() => {
    if (!hallId) return;
    
    let isMounted = true;

    const loadReviews = async () => {
      try {
        const res = await API.get(`/review/HallReviews/${hallId}`);
        if (isMounted) {
          setReviews(res.data?.data || []);
        }
      } catch (err) {
        if (isMounted) {
          setFetchError(err?.response?.data?.message || "Failed to load reviews.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadReviews();

    return () => {
      isMounted = false;
    };
  }, [hallId, refreshTrigger]);

  const handleSubmit = async ({ rating, comment }) => {
    try {
      setSubmitting(true);
      setSubmitError("");
      await API.post(`/review/createReview/${hallId}`, { rating, comment });
      setModalOpen(false);
      setLoading(true);
      setFetchError("");
      setRefreshTrigger(prev => prev + 1);
    } catch (err) {
      setSubmitError(
        err?.response?.data?.message || "Failed to submit review. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  const distribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));

  return (
    <>
      <section className="mt-16 space-y-8">
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-white/5" />
          <div className="flex items-center gap-2 px-4">
            <MessageSquare size={16} className="text-[#D4A353]" />
            <span className="text-[11px] uppercase tracking-[3px] text-gray-400 font-semibold">
              Guest Reviews
            </span>
          </div>
          <div className="h-px flex-1 bg-white/5" />
        </div>

        {!loading && !fetchError && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center bg-[#0F172A]/40 border border-white/5 rounded-3xl p-6 md:p-8">
            <div className="text-center md:text-left space-y-2 flex flex-col items-center md:items-start justify-center">
              <p className="text-6xl font-bold text-white leading-none tracking-tight">
                {reviews.length > 0 ? avgRating.toFixed(1) : "—"}
              </p>
              <StarRow rating={avgRating} size={15} />
              <p className="text-[11px] text-gray-500 uppercase tracking-[1.5px]">
                {reviews.length} {reviews.length === 1 ? "Review" : "Reviews"}
              </p>
            </div>

            <div className="space-y-2 w-full flex flex-col justify-center">
              {reviews.length > 0 ? (
                distribution.map(({ star, count }) => (
                  <RatingBar
                    key={star}
                    star={star}
                    count={count}
                    total={reviews.length}
                  />
                ))
              ) : (
                <p className="text-sm text-gray-500 text-center md:text-left">No ratings breakdown available</p>
              )}
            </div>

            <div className="flex justify-center md:justify-end w-full">
              {canReview && (
                <button
                  onClick={() => setModalOpen(true)}
                  className="inline-flex items-center gap-2 bg-linear-to-r from-[#C6A15B] to-[#D4AF37] hover:from-[#D4AF37] hover:to-[#C6A15B] text-[#020817] text-sm font-bold px-6 py-3.5 rounded-2xl transition-all duration-300 active:scale-95 shadow-lg shadow-[#D4A353]/10 whitespace-nowrap"
                >
                  <PenLine size={16} />
                  Write a Review
                </button>
              )}
            </div>
          </div>
        )}

        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <ReviewSkeleton key={i} />
            ))}
          </div>
        )}

        {!loading && fetchError && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-3xl p-6 text-center">
            <p className="text-red-400 text-sm">{fetchError}</p>
          </div>
        )}

        {!loading && !fetchError && reviews.length === 0 && (
          <div className="bg-[#0F172A] border border-white/5 rounded-3xl p-10 text-center space-y-4">
            <div className="w-14 h-14 rounded-3xl bg-[#D4A353]/10 border border-[#D4A353]/10 flex items-center justify-center mx-auto">
              <MessageSquare size={24} className="text-[#D4A353]/60" />
            </div>
            <div className="space-y-1.5">
              <p className="text-white font-semibold text-base">
                No reviews yet
              </p>
              <p className="text-gray-500 text-sm">
                Be the first to share your experience.
              </p>
            </div>
            {canReview && (
              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-2 bg-[#0F172A] hover:bg-[#D4A353]/10 border border-[#D4A353]/30 hover:border-[#D4A353]/60 text-[#D4A353] text-sm font-semibold px-5 py-2.5 rounded-2xl transition-all duration-300"
              >
                <PenLine size={14} />
                Write the first review
              </button>
            )}
          </div>
        )}

        {!loading && !fetchError && reviews.length > 0 && (
          <div className="space-y-4">
            {reviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
          </div>
        )}
      </section>

      <ReviewModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSubmitError("");
        }}
        onSubmit={handleSubmit}
        isSubmitting={submitting}
        error={submitError}
      />
    </>
  );
};

export default ReviewsSection;