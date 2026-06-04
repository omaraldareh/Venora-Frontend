import { useState } from 'react';
import { Heart, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import logoImg from '../assets/images/Logo.png';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  return (
    <nav className="absolute top-0 left-0 w-full z-50 px-6 md:px-20 py-3 flex items-center justify-between text-white">
      <Link to="/">
        <img
          src={logoImg}
          alt="Logo"
          className="h-20 w-auto object-contain transition-all"
        />
      </Link>

      <ul className="hidden md:flex gap-8 font-medium">
        <li>
          <Link to="/" className="hover:text-[#D4A353] cursor-pointer">Home</Link>
        </li>
        <li>
          <Link to="/browse" className="hover:text-[#D4A353] cursor-pointer">Venues</Link>
        </li>
        <li>
          <a href="/#how-it-works" className="hover:text-[#D4A353] cursor-pointer">How it Works</a>
        </li>
        <li>
          <Link to="/AboutUs" className="hover:text-[#D4A353] cursor-pointer">About</Link>
        </li>
        <li>
          <a href="/#contact" className="hover:text-[#D4A353] cursor-pointer">Contact</a>
        </li>
      </ul>

      <div className="hidden md:flex items-center gap-6">
        {user ? (
          <>
            {user.role === "user" && (
              <Link
                to="/MyFavourite"
                className="flex items-center gap-2 hover:text-[#D4A353] transition"
              >
                <Heart size={18} />
                My Favorites
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 hover:bg-red-500 hover:text-white px-4 py-2 rounded-lg transition-all"
            >
              <LogOut size={18} />
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-[#D4A353] transition">Log in</Link>
            <Link
              to="/ChooseAccount"
              className="bg-[#D4A353] px-5 py-2 rounded-md hover:bg-[#b88d45] transition"
            >
              Sign up
            </Link>
          </>
        )}
      </div>

      <button
        className="md:hidden text-2xl"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      {open && (
        <div className="absolute top-full left-0 w-full bg-[#050B17] flex flex-col items-center py-3 gap-4 md:hidden">
          <Link to="/" onClick={() => setOpen(false)} className="cursor-pointer hover:text-[#D4A353]">Home</Link>
          <Link to="/browse" onClick={() => setOpen(false)} className="cursor-pointer hover:text-[#D4A353]">Venues</Link>
          <a href="/#how-it-works" onClick={() => setOpen(false)} className="cursor-pointer hover:text-[#D4A353]">How it Works</a>
          <span className="cursor-pointer hover:text-[#D4A353]">About</span>
          <a href="/#contact" onClick={() => setOpen(false)} className="cursor-pointer hover:text-[#D4A353]">Contact</a>
          {user ? (
            <>
              {user.role === "user" && (
                <Link
                  to="/MyFavourite"
                  onClick={() => setOpen(false)}
                  className="hover:text-[#D4A353]"
                >
                  My Favorites
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="bg-red-500 px-5 py-2 rounded-md"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setOpen(false)} className="hover:text-[#D4A353]">Log in</Link>
              <Link
                to="/ChooseAccount"
                onClick={() => setOpen(false)}
                className="bg-[#D4A353] px-5 py-2 rounded-md text-center w-2/3"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;