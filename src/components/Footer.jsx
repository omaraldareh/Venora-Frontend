import {
  Home,
  Search,
  Users,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Building2,
  UserPlus,
} from 'lucide-react';
import { FaInstagram, FaTwitter, FaFacebookF, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logoImg from "../assets/images/Logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const user = JSON.parse(localStorage.getItem("user"));

  const getTargetRoute = () => {
    if (!user) return "/register?role=provider";
    if (user.role === "provider") return "/Provider/dashboard";
    return "/browse";
  };

  return (
    <footer className="bg-[#050B17] text-[#B8860B] py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="flex flex-col gap-4">
            <Link to="/">
              <img 
                src={logoImg} 
                alt="Logo" 
                className="h-10 w-auto object-contain self-start" 
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your premier destination to find and book the perfect venue for your unforgettable moments.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <span className="text-white font-bold text-lg">Quick Links</span>
              <nav className="flex flex-col gap-3">
                <Link to="/" className="flex items-center text-[#efa937] gap-2 hover:text-white transition-colors">
                  <Home size={18} /> Home
                </Link>
                <Link to="/browse" className="flex items-center text-[#efa937] gap-2 hover:text-white transition-colors">
                  <Search size={18} /> Venues
                </Link>
                <a href="/#how-it-works" className="flex items-center text-[#efa937] gap-2 hover:text-white transition-colors">
                  <Users size={18} /> How It Works
                </a>
              </nav>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-white font-bold text-lg">Follow Us</span>
              <div className="flex gap-3">
                <a href="#" className="p-2 rounded-full bg-[#0B1426] hover:bg-[#B8860B] hover:text-white transition-all duration-300">
                  <FaInstagram />
                </a>
                <a href="#" className="p-2 rounded-full bg-[#0B1426] hover:bg-[#B8860B] hover:text-white transition-all duration-300">
                  <FaTwitter />
                </a>
                <a href="#" className="p-2 rounded-full bg-[#0B1426] hover:bg-[#B8860B] hover:text-white transition-all duration-300">
                  <FaFacebookF />
                </a>
                <a href="#" className="p-2 rounded-full bg-[#0B1426] hover:bg-[#B8860B] hover:text-white transition-all duration-300">
                  <FaYoutube />
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-white font-bold text-lg">For Hall Providers</span>
            
            <Link
              to={getTargetRoute()}
              className="block border border-[#efa937]/30 bg-[#0B1426] rounded-xl p-4 hover:border-[#efa937] transition-all duration-300 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full border border-[#efa937] flex items-center justify-center mb-3 text-[#efa937]">
                <Building2 size={18} />
              </div>
              <h4 className="text-white font-medium mb-2">List Your Venue</h4>
              <p className="text-sm text-gray-400">
                Showcase your venue to thousands of potential customers.
              </p>
              <ArrowRight size={18} className="mt-3 text-[#efa937]" />
            </Link>

            <Link
              to={getTargetRoute()}
              className="block border border-[#efa937]/30 bg-[#0B1426] rounded-xl p-4 hover:border-[#efa937] transition-all duration-300 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full border border-[#efa937] flex items-center justify-center mb-3 text-[#efa937]">
                <UserPlus size={18} />
              </div>
              <h4 className="text-white font-medium mb-2">Become a Partner</h4>
              <p className="text-sm text-gray-400">
                Join our network of trusted partners and grow your bookings.
              </p>
              <ArrowRight size={18} className="mt-3 text-[#efa937]" />
            </Link>
          </div>

          <div id="contact" className="flex flex-col gap-4">
            <span className="text-white font-bold text-lg">Contact Us</span>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-gray-400">
                <Mail size={18} className="text-[#efa937]" />
                info@venuehub.jo
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Phone size={18} className="text-[#efa937]" />
                +962 7XXXXXXXX
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin size={18} className="text-[#efa937]" />
                Amman, Jordan
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>&copy; {currentYear} Venora. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;