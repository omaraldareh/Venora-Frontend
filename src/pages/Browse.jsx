import Navbar from "../components/Navbar";
import HeroSection from "../components/BrowsePage/Hero";
import FiltersSidebar from "../components/BrowsePage/FiltersSidebar";
import VenueGrid from "../components/BrowsePage/VenueGrid";

const Browse = () => {
  return (
    <div className="bg-[#020817] text-white min-h-screen">
      <Navbar />

      <HeroSection />

    <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-10">
          <FiltersSidebar />

        <VenueGrid />
      </section>
    </div>
  );
};

export default Browse;