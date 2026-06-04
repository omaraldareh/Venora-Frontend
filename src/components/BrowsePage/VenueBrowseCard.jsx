import { Heart, Star, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom"; 
import { useState, useEffect } from "react"; 
import API from "../../api/axios"; 

const VenueBrowseCard = ({ venue }) => {
  const navigate = useNavigate(); 
  const [isFavorite, setIsFavorite] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "" });
  
  const storedUser = localStorage.getItem("user");
  const storedRole = localStorage.getItem("role");
  
  let userRole = null;
  if (storedRole) {
    userRole = storedRole;
  } else if (storedUser) {
    try {
      const parsedUser = JSON.parse(storedUser);
      userRole = parsedUser.role || parsedUser.userRole;
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        const response = await API.get("/favorite/myFavorites"); 
        const favs = response.data.data || [];
        const found = favs.some(f => {
          if (!f.hall) return false;
          const hallId = typeof f.hall === "object" ? f.hall._id : f.hall;
          return hallId === venue._id;
        });
        setIsFavorite(found);
      } catch (err) {
        console.error(err);
      }
    };
    if (venue?._id && userRole === "user") {
      checkFavoriteStatus();
    }
  }, [venue._id, userRole]);

  const handleCardClick = () => {
    navigate(`/browse/${venue._id}`); 
  };

  const handleFavoriteToggle = async (e) => {
    e.stopPropagation(); 

    try {
      if (isFavorite) {
        await API.delete(`/favorite/${venue._id}`); 
        setIsFavorite(false);
        showToastMessage("Removed from Favorites");
      } else {
        await API.post(`/favorite/${venue._id}`); 
        setIsFavorite(true);
        showToastMessage("Added to Favorites! ❤️");
      }
    } catch (error) {
      console.error(error);
      showToastMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  const showToastMessage = (msg) => {
    setToast({ show: true, message: msg });
    setTimeout(() => setToast({ show: false, message: "" }), 2000);
  };

  return (
    <div 
      onClick={handleCardClick} 
      className="group relative bg-[#0F172A] border border-white/10 rounded-2xl overflow-hidden hover:border-[#D4A353]/30 transition-all duration-500 hover:-translate-y-1 cursor-pointer"
    >
      {toast.show && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-50 bg-black/90 backdrop-blur-md border border-white/10 text-white text-[11px] font-semibold px-4 py-2 rounded-xl shadow-2xl transition-all duration-300 whitespace-nowrap">
          {toast.message}
        </div>
      )}

      <div className="relative overflow-hidden">
        <img
          src={venue.images?.[0] || "https://placehold.co/600x400"}
          alt={venue.name}
          className="h-40 sm:h-44 md:h-48 w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
        
        <span className="absolute top-3 left-3 bg-[#D4A353] text-black text-[10px] font-semibold px-2.5 py-1 rounded-full capitalize shadow-lg">
          {venue.hallType}
        </span>
        
        {userRole === "user" && (
          <button 
            onClick={handleFavoriteToggle}
            className={`absolute top-3 right-3 backdrop-blur-md p-1.5 rounded-full transition-all duration-300 shadow-lg z-10 ${
              isFavorite 
                ? "bg-red-500 text-white hover:bg-red-600 scale-110" 
                : "bg-black/60 text-white hover:bg-[#D4A353] hover:text-black"
            }`}
          >
            <Heart size={15} fill={isFavorite ? "currentColor" : "none"} />
          </button>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-base leading-snug text-white line-clamp-1">
            {venue.name}
          </h3>
          <div className="flex items-center gap-1 bg-[#111827] px-2 py-1 rounded-full text-yellow-400 text-xs whitespace-nowrap">
            <Star fill="currentColor" size={12} />
            {venue.rating > 0 ? venue.rating.toFixed(1) : "New"}
          </div>
        </div>

        <div className="flex items-center gap-2 text-gray-400 text-xs mb-4">
          <MapPin size={13} className="text-[#D4A353]" />
          <span>{venue.location?.city || "Amman"}</span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] text-gray-500 mb-0.5">Starting from</p>
            <span className="text-[#D4A353] font-bold text-lg">
              {venue.availableSlots?.[0]?.price ?? 0} JOD
            </span>
          </div>
          
          <button className="bg-[#D4A353] hover:bg-[#e6bc63] text-black text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 shadow-lg shadow-[#D4A353]/20 whitespace-nowrap">
            View 
          </button>
        </div>
      </div>
    </div>
  );
};

export default VenueBrowseCard;