import { ShieldCheck, SlidersHorizontal, UserCheck, CalendarCheck2 } from 'lucide-react';
const FeaturesSection = () => {
  const featuresData = [
    {
      title: 'Smart Venue Filtering',
      description: 'Find exactly what you need. Filter luxury spaces by location across Jordan, event type, and tailored budget options.',
      icon: SlidersHorizontal,
    },
    {
      title: 'Verified Premium Providers',
      description: 'Book with absolute confidence. Every hotel ballroom and conference hall on Venuora is strictly vetted and verified.',
      icon: UserCheck,
    },
    {
      title: 'Secure OTP Infrastructure',
      description: 'Your data is fully protected. Advanced encrypted verification ensures seamless, secure, and authenticated access.',
      icon: ShieldCheck,
    },
    {
      title: 'Direct Reservation',
      description: 'Eliminate the middleman. View real-time pricing and coordinate directly with providers for a flawless event flow.',
      icon: CalendarCheck2,
    },
  ];

  return (
    <div className='bg-[#050B17] py-24 border-t border-b border-[#D4A353]/10'>
      <div className='max-w-7xl mx-auto px-6 lg:px-8'>
        
        {/* Header */}
        <div className='text-center mb-20'>
          <p className='text-sm text-[#D4A353] font-bold uppercase tracking-widest mb-3'>
            The Venora Experience
          </p>
          <h2 className='text-3xl md:text-5xl font-extrabold text-white tracking-tight max-w-2xl mx-auto leading-tight'>
            Redefining How Elite Events Are Booked
          </h2>
          <div className='w-20 h-0.5 bg-[#D4A353] mx-auto mt-6 rounded-full opacity-50'></div>
        </div>

        {/* Features Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {featuresData.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index} 
                className='group relative bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl transition-all duration-300 hover:border-[#D4A353]/40 hover:-translate-y-2'>
                <div className='absolute inset-0 bg-linear-to-br from-[#D4A353]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl' />
                
                <div className='w-12 h-12 bg-[#D4A353]/10 text-[#D4A353] flex items-center justify-center rounded-xl mb-6 group-hover:bg-[#D4A353] group-hover:text-black transition-all duration-300 shadow-md'>
                  <IconComponent className='w-6 h-6' />
                </div>

                <h3 className='text-xl font-bold text-white mb-3 group-hover:text-[#D4A353] transition-colors duration-300'>
                  {feature.title}
                </h3>
                <p className='text-gray-400 text-sm leading-relaxed relative z-10'>
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default FeaturesSection;