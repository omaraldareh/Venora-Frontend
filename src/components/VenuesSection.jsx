import { ArrowRightIcon, Heart, Briefcase, PartyPopper, ConciergeBell } from 'lucide-react'
import { Link } from 'react-router-dom'
import VenueCard from './VenueCard'
import weddingImg from '../assets/images/Wedding.png';
import eventImg from '../assets/images/Event.png';
import partyImg from '../assets/images/Parties.png';
import socialeventImg from '../assets/images/SocialEvent.png';

const VenuesSection = () => {
  const venuesData = [
    {
      type: 'Weddings',
      description: 'Make your dream wedding unforgettable with our luxury halls.',
      image: weddingImg,
      icons: Heart
    },
    {
      type: 'Corporate Events',
      description: 'Professional spaces designed for successful meetings and conferences.',
      image: eventImg,
      icons: Briefcase
    },
    {
      type: 'Parties',
      description: 'Celebrate birthdays, anniversaries and special moments with style.',
      image: partyImg,
      icons: PartyPopper
    },
    {
      type: 'Social Events',
      description: 'Engagements, reunions, and all your special gatherings.',
      image: socialeventImg,
      icons: ConciergeBell
    }
  ];

  return (
    <div className='bg-white py-16'>
      <div className='max-w-7xl mx-auto px-6 lg:px-8'>

        <div className='flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6'>
          <div>
            <p className='text-sm text-[#efa937] font-bold uppercase tracking-wider mb-2'>
              Explore Venues
            </p>
            <h2 className='text-3xl md:text-4xl font-extrabold text-gray-900'>
              Venues for Every Occasion
            </h2>
          </div>

          <button className="flex items-center w-fit gap-2 text-[#B8860B] border border-[#B8860B] py-2.5 px-6 rounded-lg transition-all duration-300 hover:bg-[#B8860B] hover:text-white hover:shadow-lg active:scale-95">
            <Link to="/browse">View all venues</Link>
            <ArrowRightIcon className="w-4 h-4" />
          </button>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {venuesData.map((venue, index) => (
            <VenueCard key={index} venue={venue} />
          ))}
        </div>

      </div>
    </div>
  )
}

export default VenuesSection