import { Star } from "lucide-react";

const StarDisplay = ({ rating, size = 14 }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className={
            star <= rating
              ? "text-[#D4A353] fill-[#D4A353]"
              : "text-gray-700 fill-gray-700"
          }
        />
      ))}
    </div>
  );
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const ReviewCard = ({ review }) => {
  const initials = review?.user?.name
    ? review.user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <div className="group bg-[#0F172A] border border-white/5 hover:border-[#D4A353]/20 rounded-3xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-[#D4A353]/5">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="shrink-0 w-11 h-11 rounded-2xl bg-linear-to-br from-[#D4A353]/20 to-[#D4A353]/5 border border-[#D4A353]/20 flex items-center justify-center">
          <span className="text-[#D4A353] text-sm font-bold tracking-wide">
            {initials}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="space-y-1">
              <p className="text-white font-semibold text-sm leading-none">
                {review?.user?.name || "Anonymous"}
              </p>
              <StarDisplay rating={review?.rating || 0} />
            </div>

            <span className="text-[11px] text-gray-500 uppercase tracking-[1.5px] shrink-0">
              {review?.createdAt ? formatDate(review.createdAt) : ""}
            </span>
          </div>

          {review?.comment && (
            <p className="text-gray-400 text-sm leading-relaxed">
              {review.comment}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;