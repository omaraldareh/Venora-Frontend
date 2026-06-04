import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Building2, CalendarDays, ShieldCheck, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const getTargetRoute = () => {
    if (!user) return "/register?role=provider";
    if (user.role === "provider") return "/Provider/dashboard";
    return "/browse";
  };

  return (
    <div className="min-h-screen bg-white text-[#020817] flex flex-col">
      <div className="relative w-full bg-[#0A1120] h-24 [&_nav]:bg-[#0A1120] [&_nav]:border-b [&_nav]:border-white/5 shadow-md">
        <Navbar />
      </div>

      <section className="flex-1 max-w-6xl mx-auto px-6 pt-16 pb-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#C6A15B] uppercase tracking-[4px] text-xs font-bold">
            About Venora
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mt-4 mb-4 tracking-tight">
            Redefining Event Venue Booking
          </h1>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-8">
            Venora is a modern ecosystem built to connect customers with premium event venues seamlessly. 
            We eliminate traditional planning friction, offering a transparent, secure, and instant reservation experience.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to={getTargetRoute()}
              className="group bg-[#D4A353] hover:bg-[#b88d45] text-white px-8 py-3.5 rounded-xl font-bold text-sm md:text-base shadow-lg shadow-[#D4A353]/20 transition-all duration-300 flex items-center justify-center gap-2"
            >
              {user && user.role === "provider" ? "Go to Dashboard" : user && user.role === "user" ? "Explore Venues" : "Join as Provider"}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              Who We Are & Our Story
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base">
              We founded Venora to solve the tedious challenges of venue discovery. Traditional methods 
              involved endless phone calls and hidden pricing. Our platform centralizes everything, helping 
              guests compare options with confidence while empowering venue providers to showcase their spaces 
              and scale operations effortlessly through a unified dashboard.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 md:p-8">
            <Building2 size={40} className="text-[#C6A15B] mb-3" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Our Mission
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              To deliver a flawless digital journey for venue discovery and immediate reservation management, 
              bridging the gap between hosts and clients with full transparency.
            </p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-center text-2xl md:text-3xl font-bold text-slate-900 mb-10 tracking-tight">
            What We Offer
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 transition-all duration-300 hover:shadow-md">
              <CalendarDays className="text-[#C6A15B] mb-3" size={36} />
              <h3 className="font-bold text-base text-slate-900 mb-1">
                Easy Reservations
              </h3>
              <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                Browse elite spaces, inspect live available slots, and book instantly.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 transition-all duration-300 hover:shadow-md">
              <ShieldCheck className="text-[#C6A15B] mb-3" size={36} />
              <h3 className="font-bold text-base text-slate-900 mb-1">
                Verified Providers
              </h3>
              <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                Every venue host undergoes rigorous compliance validation to ensure absolute trust.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 transition-all duration-300 hover:shadow-md sm:col-span-2 md:col-span-1">
              <Users className="text-[#C6A15B] mb-3" size={36} />
              <h3 className="font-bold text-base text-slate-900 mb-1">
                Real Reviews
              </h3>
              <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                Gain insight through factual metrics and honest feedback from verified users.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;