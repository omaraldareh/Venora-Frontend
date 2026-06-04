import SearchBar from "./SearchBar";
import CategoryTags from "./CategoryTags";

const Hero = () => {
  return (
<section className="relative overflow-visible pt-32 md:pt-40 pb-16 md:pb-24">
        <img
        src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1600&auto=format&fit=crop"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />

      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-[#D4A353] text-center text-3xl sm:text-4xl md:text-6xl font-serif font-bold mb-4 leading-tight">
          Find Your Perfect Venue
          </h1>

        <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
          Discover exclusive spaces and curated experiences for unforgettable
          luxury events.
        </p>

        <SearchBar />

        <CategoryTags />
      </div>
    </section>
  );
};

export default Hero;