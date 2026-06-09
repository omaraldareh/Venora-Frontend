import heroImg from "../assets/images/hero-bg.png";
import { ArrowUpRight, ShieldCheck, Handshake, Calendar, Headset } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const getButtonConfig = () => {
    if (!user) {
      return { text: "Become a Partner", to: "/register?role=provider" };
    }
    if (user.role === "provider") {
      return { text: "Go to Dashboard", to: "/Provider/dashboard" };
    }
    return { text: "My Bookings", to: "/MyBookings" }; 
  };

  const buttonConfig = getButtonConfig();

  return (
    <>
      <main className="relative min-h-screen w-full overflow-hidden">

        <div className="absolute inset-0 z-0">
          <img
            src={heroImg}
            alt="Luxury Venue"
            className="w-full h-full object-cover"
            loading="eager" 
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#050B17]/95 via-[#050B17]/80 to-transparent" />
          <div className="absolute inset-0 bg-[#050B17]/40" />
        </div>

        <div className="relative z-10 flex items-center min-h-screen px-6 md:px-20 pt-28 pb-12">
          <div className="w-full max-w-xl md:max-w-3xl">
   
            <div className="mb-6">
              <span className="bg-[#D4A353]/20 text-[#D4A353] px-4 py-1.5 rounded-full text-xs font-semibold border border-[#D4A353]/30 tracking-wide">
                ✨ Find. Book. Celebrate.
              </span>
            </div>

            <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif leading-tight">
              Find Your Perfect <br />
              <span className="text-[#D4A353] inline-block mt-2">Venue, Effortlessly</span>
            </h1>

            <p className="text-gray-300 mt-6 text-sm sm:text-base md:text-lg max-w-lg leading-relaxed">
              Discover and book the best event venues for any occasion.
              Weddings, meetings, parties, and more.
            </p>

            <div className="mt-10 mb-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link 
                to="/browse" 
                className="group bg-[#D4A353] hover:bg-[#b88d45] text-white px-8 py-4 rounded-xl font-bold text-sm md:text-base shadow-lg shadow-[#D4A353]/20 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Explore Venues
                <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              <Link 
                to={buttonConfig.to} 
                className="border border-white/30 hover:border-white hover:bg-white/10 text-white px-8 py-4 rounded-xl font-bold text-sm md:text-base transition-all duration-300 flex items-center justify-center text-center"
              >
                {buttonConfig.text}
              </Link>
            </div>

            <div className='grid grid-cols-2 md:grid-cols-4 gap-6 mt-4'>
              <div className="flex items-start gap-3">
                <ShieldCheck className="text-[#D4A353] w-5 h-5 mt-0.5 shrink-0" />
                <div>
                  <p className="text-white font-semibold text-sm">Verified Venues</p>
                  <p className="text-gray-400 text-xs mt-0.5">Trusted and reviewed</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Handshake className="text-[#D4A353] w-5 h-5 mt-0.5 shrink-0" />
                <div>
                  <p className="text-white font-semibold text-sm">Best Price</p>
                  <p className="text-gray-400 text-xs mt-0.5">Get the best deals</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="text-[#D4A353] w-5 h-5 mt-0.5 shrink-0" />
                <div>
                  <p className="text-white font-semibold text-sm">Easy Booking</p>
                  <p className="text-gray-400 text-xs mt-0.5">Quick and secure</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Headset className="text-[#D4A353] w-5 h-5 mt-0.5 shrink-0" />
                <div>
                  <p className="text-white font-semibold text-sm">24/7 Support</p>
                  <p className="text-gray-400 text-xs mt-0.5">We are here for you</p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </main>
    </>
  );
}

export default HeroSection;