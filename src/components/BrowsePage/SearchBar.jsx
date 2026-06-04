import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, CalendarDays, Users, ChevronDown } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SearchBar = () => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null); 

  const [city, setCity] = useState("");
  const [guests, setGuests] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCities, setShowCities] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowCities(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    const queryParams = new URLSearchParams();

    if (city.trim()) {
      queryParams.append("city", city);
    }
    if (guests.trim()) {
      queryParams.append("capacity", guests);
    }
    if (selectedDate) {
      queryParams.append("date", selectedDate.toISOString());
    }

    const queryString = queryParams.toString();
    navigate(queryString ? `/browse?${queryString}` : "/browse");
  };

  useEffect(() => {
    if (city === "" && guests === "" && selectedDate === null) {
      navigate("/browse");
    }
  }, [city, guests, selectedDate, navigate]);

  const cities = [
    "Amman",
    "Dead Sea",
    "Aqaba",
    "Irbid",
    "Zarqa",
    "Madaba",
    "Jerash",
    "Ajloun",
  ];

  return (
    <div className="w-full bg-[#050B17]/80 backdrop-blur-2xl border border-[#C6A15B]/20 rounded-3xl lg:rounded-full p-3 lg:px-4 lg:py-3 flex flex-col lg:flex-row items-stretch lg:items-center gap-3 shadow-[0_0_40px_rgba(198,161,91,0.08)] transition-all duration-300 max-w-6xl mx-auto z-30 relative">
      
      {/* City Selector Container */}
      <div 
        ref={dropdownRef} 
        className="relative flex items-center gap-3 px-4 py-3 w-full bg-white/5 lg:bg-transparent rounded-2xl lg:rounded-none border border-white/5 lg:border-0 group cursor-pointer"
        onClick={() => setShowCities(!showCities)}
      >
        <MapPin
          size={18}
          className="text-[#C6A15B] transition duration-300 group-hover:scale-110 code-icon"
        />

        <div className="flex items-center justify-between w-full text-left text-sm text-white select-none">
          <span className={city ? "text-white" : "text-gray-400"}>
            {city || "Select city"}
          </span>

          <ChevronDown
            size={14}
            className={`text-[#C6A15B]/80 transition-transform duration-300 ${
              showCities ? "rotate-180" : ""
            }`}
          />
        </div>


{showCities && (
  <div className="absolute top-full left-0 mt-2 w-full min-w-55 bg-[#0F172A] border border-[#D4A353]/30 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden z-999 max-h-46.25 overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#C6A15B]/30 [&::-webkit-scrollbar-thumb]:rounded-full">
    
  
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation(); 
        setCity(""); 
        setShowCities(false);
      }}
      className={`w-full px-4 py-2.5 text-left text-sm transition-all duration-200 border-b border-white/5 ${
        city === ""
          ? `bg-[#D4A353] text-black font-semibold`
          : `text-amber-400 hover:bg-white/10`
      }`}
    >
      All Cities 
    </button>


    {cities.map((item) => (
      <button
        key={item}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setCity(item);
          setShowCities(false);
        }}
        className={`w-full px-4 py-2.5 text-left text-sm transition-all duration-200 ${
          city === item
            ? `bg-[#D4A353] text-black font-semibold`
            : `text-gray-300 hover:bg-white/10 hover:text-white`
        }`}
      >
        {item}
      </button>
    ))}
  </div>
)}
      </div>

      <div className="hidden lg:block w-px h-10 bg-[#C6A15B]/20 shrink-0" />

      {/* Date Picker */}
      <div className="flex items-center gap-3 px-4 py-3 w-full bg-white/5 lg:bg-transparent rounded-2xl lg:rounded-none border border-white/5 lg:border-0 group">
        <CalendarDays size={18} className="text-[#C6A15B] transition duration-300 group-hover:scale-110" />
        <div className="relative w-full">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            placeholderText="Select event date"
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
            portalId="root"
            popperPlacement="bottom-start"
            className="bg-transparent outline-none text-sm w-full text-white placeholder-gray-400 font-light pr-6 cursor-pointer"
          />
          <ChevronDown size={14} className="absolute right-0 top-1/2 -translate-y-1/2 text-[#C6A15B]/80 pointer-events-none" />
        </div>
      </div>

      <div className="hidden lg:block w-px h-10 bg-[#C6A15B]/20 shrink-0" />

      {/* Guests Input */}
      <div className="flex items-center gap-3 px-4 py-3 w-full bg-white/5 lg:bg-transparent rounded-2xl lg:rounded-none border border-white/5 lg:border-0 group">
        <Users size={18} className="text-[#C6A15B] transition duration-300 group-hover:scale-110" />
        <input
          type="number"
          min="1"
          placeholder="Guests count"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          className="bg-transparent outline-none text-sm w-full text-white placeholder-gray-400 font-light [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="bg-linear-to-r from-[#C6A15B] to-[#D4AF37] hover:from-[#D4AF37] hover:to-[#C6A15B] text-[#020817] font-semibold text-sm px-7 py-4 rounded-2xl lg:rounded-full flex items-center justify-center gap-2 whitespace-nowrap shadow-[0_4px_20px_rgba(198,161,91,0.35)] hover:shadow-[0_4px_25px_rgba(198,161,91,0.5)] transition-all duration-300 active:scale-95 w-full lg:w-auto"
      >
        <Search size={17} strokeWidth={2.5} />
        <span>Search Venues</span>
      </button>

    </div>
  );
};

export default SearchBar;