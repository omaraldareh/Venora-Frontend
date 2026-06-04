import { User, Building2, ArrowLeft } from 'lucide-react';
import heroImg from "../assets/images/hero-bg.png"; 

const ChooseAccount = () => {
  
  const handleSelectRole = (roleType) => {
    
    window.location.href = `/register?role=${roleType}`;
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-[#030712] px-6">
      
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="Luxury Ambience"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-[#050B17]/90" />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#050B17]/50 to-[#050B17]" />
      </div>

      <div className="relative z-10 w-full max-w-3xl text-center flex flex-col items-center">
        
        <a href="/" className="absolute -top-10 md:-top-15 flex items-center gap-2 text-sm text-gray-400 hover:text-[#D4A353] transition-colors group">
          <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
          Back to Home
        </a>

      
        <h2 className="text-white text-3xl sm:text-5xl font-serif mb-3">Join Venora</h2>
        <p className="text-gray-400 text-sm sm:text-base max-w-md mb-12">
          To tailor your premium experience, please tell us how you plan to use our platform.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
          
          <button
            onClick={() => handleSelectRole("user")}
            className="group relative rounded-2xl p-8 border border-white/10 bg-[#0B1426]/60 backdrop-blur-md hover:border-[#D4A353] hover:bg-[#D4A353]/5 text-left flex flex-col justify-between gap-8 transition-all duration-500 shadow-2xl hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 group-hover:border-[#D4A353]/30 group-hover:bg-[#D4A353]/10 flex items-center justify-center transition-all duration-500">
              <User className="w-6 h-6 text-gray-400 group-hover:text-[#D4A353] transition-colors" />
            </div>
            <div>
              <h3 className="text-white font-serif text-xl font-semibold group-hover:text-[#D4A353] transition-colors">Regular User</h3>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                Discover world-class venues, check real-time availability, and book your dream events effortlessly.
              </p>
            </div>
          </button>

          
          <button
            onClick={() => handleSelectRole("provider")}
            className="group relative rounded-2xl p-8 border border-white/10 bg-[#0B1426]/60 backdrop-blur-md hover:border-[#D4A353] hover:bg-[#D4A353]/5 text-left flex flex-col justify-between gap-8 transition-all duration-500 shadow-2xl hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 group-hover:border-[#D4A353]/30 group-hover:bg-[#D4A353]/10 flex items-center justify-center transition-all duration-500">
              <Building2 className="w-6 h-6 text-gray-400 group-hover:text-[#D4A353] transition-colors" />
            </div>
            <div>
              <h3 className="text-white font-serif text-xl font-semibold group-hover:text-[#D4A353] transition-colors">Hall Provider</h3>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                Showcase your premium venues, manage bookings, and scale your business with luxury event clients.
              </p>
            </div>
          </button>

        </div>

        <p className="text-sm text-gray-500 mt-12">
          Already have an account?{' '}
          <a href="/login" className="text-[#D4A353] font-semibold hover:underline">
            Sign In
          </a>
        </p>

      </div>
    </div>
  );
};

export default ChooseAccount;