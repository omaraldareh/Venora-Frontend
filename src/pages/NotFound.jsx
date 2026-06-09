import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#020817] text-white flex flex-col justify-center items-center px-6 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D4A353]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="text-center max-w-md z-10">
        <h1 className="text-9xl font-serif font-extrabold text-[#D4A353] tracking-widest drop-shadow-md animate-pulse">
          404
        </h1>
        
        <h2 className="text-2xl md:text-3xl font-bold mt-4 mb-2">
          Page Not Found
        </h2>
        
        <p className="text-gray-400 text-sm md:text-base mb-8 leading-relaxed">
          Oops! The venue or page you are looking for doesn't exist, has been moved, or perhaps you took a wrong turn.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={() => window.history.back()}
            className="w-full sm:w-auto border border-white/20 hover:border-white hover:bg-white/5 px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
          
          <Link 
            to="/" 
            className="w-full sm:w-auto bg-[#D4A353] hover:bg-[#b88d45] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-[#D4A353]/10 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Home size={16} />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;