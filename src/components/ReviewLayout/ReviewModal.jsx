import { useState } from "react";
import { X, Star } from "lucide-react";

const ReviewModal = ({ isOpen, onClose, onSubmit, isSubmitting, error }) => {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");
  const [validationError, setValidationError] = useState("");

  if (!isOpen) return null;

  const handleClose = () => {
    setRating(0);
    setHovered(0);
    setComment("");
    setValidationError("");
    onClose();
  };

  const handleSubmit = () => {
    if (!rating) {
      setValidationError("Please select a rating before submitting.");
      return;
    }
    if (!comment.trim()) {
      setValidationError("Please write a comment before submitting.");
      return;
    }
    setValidationError("");
    onSubmit({ rating, comment: comment.trim() });
  };

  const ratingLabels = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div className="relative w-full max-w-md bg-[#0A1120] border border-white/10 rounded-4xl shadow-2xl shadow-black/50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="h-0.5 w-full bg-linear-to-r from-transparent via-[#D4A353] to-transparent" />

        <div className="p-8 space-y-7">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Share Your Experience
              </h2>
              <p className="text-gray-500 text-xs mt-1 tracking-wide">
                Your review helps others choose with confidence.
              </p>
            </div>

            <button
              onClick={handleClose}
              className="w-9 h-9 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200"
            >
              <X size={16} />
            </button>
          </div>

          <div className="space-y-3">
            <p className="text-[11px] uppercase tracking-[2px] text-gray-500 font-semibold">
              Your Rating
            </p>

            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onMouseEnter={() => setHovered(star)}
                  onMouseLeave={() => setHovered(0)}
                  onClick={() => setRating(star)}
                  className="transition-transform duration-150 hover:scale-110 active:scale-95"
                >
                  <Star
                    size={32}
                    className={`transition-colors duration-150 ${
                      star <= (hovered || rating)
                        ? "text-[#D4A353] fill-[#D4A353]"
                        : "text-gray-700 fill-gray-700"
                    }`}
                  />
                </button>
              ))}

              {(hovered || rating) > 0 && (
                <span className="ml-2 text-sm text-[#D4A353] font-medium">
                  {ratingLabels[hovered || rating]}
                </span>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-[11px] uppercase tracking-[2px] text-gray-500 font-semibold">
              Your Comment
            </p>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us about your experience at this venue..."
              rows={4}
              className="w-full bg-[#0F172A] border border-white/5 focus:border-[#D4A353]/40 rounded-2xl px-4 py-3 text-sm text-gray-200 placeholder-gray-600 resize-none outline-none transition-colors duration-200 leading-relaxed"
            />

            <div className="flex justify-end">
              <span
                className={`text-[11px] ${
                  comment.length > 480 ? "text-red-400" : "text-gray-600"
                }`}
              >
                {comment.length}/500
              </span>
            </div>
          </div>

          {(validationError || error) && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl px-4 py-3">
              <p className="text-red-400 text-sm">
                {validationError || error}
              </p>
            </div>
          )}

          <div className="flex gap-3 pt-1">
            <button
              onClick={handleClose}
              disabled={isSubmitting}
              className="flex-1 bg-white/5 hover:bg-white/10 border border-white/5 text-gray-300 text-sm font-semibold py-3.5 rounded-2xl transition-all duration-200"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 bg-linear-to-r from-[#C6A15B] to-[#D4AF37] hover:from-[#D4AF37] hover:to-[#C6A15B] text-[#020817] text-sm font-bold py-3.5 rounded-2xl transition-all duration-300 active:scale-95 shadow-lg shadow-[#D4A353]/10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-[#020817]/30 border-t-[#020817] rounded-full animate-spin" />
                  Submitting...
                </span>
              ) : (
                "Submit Review"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;