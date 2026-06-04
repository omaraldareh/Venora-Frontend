
const VenueCard = ({ venue }) => {
  const IconComponent = venue.icons;

  return (
    <div className='bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col h-full group border border-gray-100 hover:shadow-md transition-shadow duration-300'>
      <div className="relative h-48 w-full">
        <img
          src={venue.image}
          alt={venue.type}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        <div className="absolute -bottom-6 left-6 bg-white p-3 rounded-full shadow-lg z-10 border border-gray-50">
          <div className="text-[#B8860B]">
             {IconComponent && <IconComponent size={24} strokeWidth={2} />} 
          </div>
        </div>
      </div>

      <div className='p-6 pt-10 flex flex-col gap-2'>
          <h3 className="text-lg font-bold text-gray-900">{venue.type}</h3>
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
              {venue.description}
          </p>
      </div>
    </div>
  )
}

export default VenueCard