import { useEffect, useState } from "react";
import API from "../api/axios";
import VenueBrowseCard from "../components/BrowsePage/VenueBrowseCard";
import { Heart, Loader } from "lucide-react";

const Favourite = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await API.get("/favorite/myFavorites");
        setFavorites(response.data.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-10 border-b border-white/10 pb-6">
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <Heart className="text-red-500 fill-red-500" size={28} />
            My Favorites
          </h1>
          <p className="text-gray-400 mt-2 text-sm">
            View and manage all your saved luxury venues and halls.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center p-24 text-gray-400 space-y-4">
            <Loader className="animate-spin text-[#D4A353]" size={36} />
            <p className="text-sm">Loading your favorite venues...</p>
          </div>
        ) : favorites.length === 0 ? (
          <div className="text-center p-20 bg-[#0F172A] rounded-2xl border border-dashed border-white/10 max-w-md mx-auto">
            <Heart size={48} className="text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-1">Your list is empty</h3>
            <p className="text-gray-400 text-sm mb-6">Explore venues and click the heart icon to save them here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map((fav) => {
              if (!fav.hall) return null;
              return (
                <VenueBrowseCard 
                  key={fav._id} 
                  venue={typeof fav.hall === "object" ? fav.hall : fav} 
                />
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};

export default Favourite;