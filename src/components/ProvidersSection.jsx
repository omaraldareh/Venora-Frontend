import { LayoutDashboard, TrendingUp, CalendarDays, Wallet, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; 

const ProvidersSection = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const providerBenefits = [
    {
      title: 'Advanced Provider Dashboard',
      description: "Track your venue's performance. Manage reservations, view earnings, and monitor custom event analytics in one place.",
      icon: LayoutDashboard,
    },
    {
      title: 'Maximize Your Occupancy',
      description: 'Fill your calendar. Showcase your luxury halls to corporate event planners and thousands of premium clients across Jordan.',
      icon: TrendingUp,
    },
    {
      title: 'Seamless Calendar Control',
      description: 'Zero scheduling conflicts. Update your venue availability in real-time, handle peak seasons, and block dates instantly.',
      icon: CalendarDays,
    },
    {
      title: 'Streamlined Financials',
      description: 'Fast and secure payouts. Automatically generate premium invoices and receive corporate and individual deposits smoothly.',
      icon: Wallet,
    },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.2 } 
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  const handleNavigation = () => {
    if (!user) {
      navigate('/register?role=provider');
    } else if (user.role === "provider") {
      navigate('/Provider/dashboard');
    } else {
      navigate('/browse');
    }
  };

  return (
    <div className='bg-[#050B17] py-24 border-b border-[#D4A353]/10 relative overflow-hidden'>
      <div className='absolute -right-40 top-40 w-96 h-96 bg-[#D4A353]/5 rounded-full blur-3xl pointer-events-none' />

      <div className='max-w-7xl mx-auto px-6 lg:px-8'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-16 items-center'>
          
          <motion.div 
            className='lg:col-span-5 flex flex-col justify-center text-left'
            initial="hidden"
            whileInView="visible" 
            viewport={{ once: true, margin: "-100px" }} 
            variants={fadeUp}
          >
            <p className='text-sm text-[#D4A353] font-bold uppercase tracking-widest mb-3'>
              For Venue Owners
            </p>
            <h2 className='text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6'>
              List Your Luxury Venue, Automate Your Bookings
            </h2>
            <p className='text-gray-400 text-base leading-relaxed mb-8 max-w-lg'>
              Join Jordan’s elite event marketplace. Empower your business with enterprise-grade management tools designed to elevate your brand and skyrocket your revenue.
            </p>
            
            <button 
              onClick={handleNavigation}
              className="flex items-center gap-2 w-fit bg-transparent text-[#D4A353] border-2 border-[#D4A353] py-3.5 px-8 rounded-xl font-semibold transition-all duration-300 hover:bg-[#D4A353] hover:text-black hover:shadow-xl active:scale-95 group"
            >
              {user && user.role === "provider" ? "Go to Dashboard" : user && user.role === "user" ? "Explore Venues" : "List Your Venue Now"}
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </motion.div>

          <motion.div 
            className='lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6'
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {providerBenefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <motion.div 
                  key={index} 
                  variants={cardVariants}
                  onClick={handleNavigation}
                  whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.2 } }}
                  className='bg-white/5 backdrop-blur-md border border-white/5 p-8 rounded-2xl transition-all duration-300 hover:border-[#D4A353]/30 hover:bg-white/[0.07] cursor-pointer shadow-lg'
                >
                  <div className='w-12 h-12 bg-[#D4A353]/10 text-[#D4A353] flex items-center justify-center rounded-xl mb-5 shadow-sm'>
                    <IconComponent className='w-6 h-6' />
                  </div>
                  <h3 className='text-lg font-bold text-white mb-2'>
                    {benefit.title}
                  </h3>
                  <p className='text-gray-400 text-sm leading-relaxed'>
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default ProvidersSection;