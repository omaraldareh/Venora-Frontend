import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import VenueBrowseCard from "./VenueBrowseCard";
import API from "../../api/axios";

const VenueGrid = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [halls, setHalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [serverErrors, setServerErrors] = useState("");

  
  const currentPage = parseInt(searchParams.get("page")) || 1;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchHalls = async () => {
      try {
        setLoading(true);

        
        const query = searchParams.toString();

        const response = await API.get(`/hall/browseHalls?${query}`);

        
        setHalls(response.data.data || []); 
        setTotalPages(response.data.pagination?.totalPages || 1); 

      } catch (error) {
        setServerErrors(
          error?.response?.data?.message ||
          "Something went wrong while fetching halls"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchHalls();
  }, [searchParams]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", pageNumber);
    setSearchParams(newParams);

  
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 4; 

    for (let i = 1; i <= Math.min(maxVisiblePages, totalPages); i++) {
      pages.push(i);
    }

    if (totalPages > maxVisiblePages) {
      if (currentPage > maxVisiblePages && currentPage < totalPages) {
        if (!pages.includes(currentPage - 1) && currentPage - 1 > maxVisiblePages) {
          pages.push("...");
        }
        if (!pages.includes(currentPage)) pages.push(currentPage);
      }

      if (totalPages - maxVisiblePages > 1 && currentPage < totalPages - 1) {
        pages.push("...");
      }

      if (!pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-24">
        <div className="w-10 h-10 border-2 border-[#D4A353] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (serverErrors) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl p-6 text-center">
        {serverErrors}
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
          <h2 className="text-2xl font-semibold">Popular Venues</h2>
          <p className="text-gray-400 text-sm">Showing {halls.length} venues</p>
        </div>

        {halls.length === 0 ? (
          <div className="bg-[#0F172A] border border-white/10 rounded-3xl p-10 text-center">
            <h3 className="text-xl font-semibold mb-2">No venues found</h3>
            <p className="text-gray-400 text-sm">Try adjusting your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-5 md:gap-7">
            {halls.map((venue) => (
              <VenueBrowseCard key={venue._id} venue={venue} />
            ))}
          </div>
        )}
      </div>

      
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-12 pt-6 border-t border-white/5 select-none">
          
          
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 border ${
              currentPage === 1
                ? "border-white/5 text-gray-600 cursor-not-allowed bg-white/1"
                : "border-white/10 text-gray-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            Previous
          </button>

          {renderPageNumbers().map((page, index) => {
            if (page === "...") {
              return (
                <span key={`dots-${index}`} className="px-2 text-gray-500 font-medium">
                  ...
                </span>
              );
            }

            return (
              <button
                key={`page-${page}`}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 flex items-center justify-center text-sm font-semibold rounded-xl border transition-all duration-200 ${
                  currentPage === page
                    ? "bg-[#C6A15B]/10 border-[#C6A15B] text-[#C6A15B] shadow-[0_0_15px_rgba(198,161,91,0.15)]"
                    : "border-white/10 text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {page}
              </button>
            );
          })}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 border ${
              currentPage === totalPages
                ? "border-white/5 text-gray-600 cursor-not-allowed bg-white/1"
                : "border-white/10 text-gray-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            Next
          </button>

        </div>
      )}
    </div>
  );
};

export default VenueGrid;