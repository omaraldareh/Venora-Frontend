import { useNavigate } from "react-router-dom";

const UpcomingBookings = ({ bookings = [] }) => {
  const navigate = useNavigate();
  // Displaying the top 5 upcoming bookings on the dashboard
  const displayBookings = bookings.slice(0, 5);

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800">Upcoming Bookings</h3>
        <button   className="text-purple-600 text-sm font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 hover:bg-purple-100 hover:text-purple-700"
          onClick={() => navigate('/provider/bookings')}
        >View all</button>
      </div>

      <div className="space-y-4">
        {displayBookings.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-4">No upcoming bookings</p>
        ) : (
          displayBookings.map((booking) => (
            <div key={booking._id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition">
              <div className="flex items-center gap-3">
                <img 
                  src={booking.hall?.images?.[0] || 'https://via.placeholder.com/150'} 
                  alt={booking.hall?.name} 
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm">{booking.user?.name || 'Anonymous User'}</h4>
                  <p className="text-gray-400 text-xs mt-0.5">
                    {booking.hall?.name} • {new Date(booking.eventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              </div>
              
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                booking.status === 'confirmed' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'
              }`}>
                {booking.status === 'confirmed' ? 'Confirmed' : 'Pending'}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UpcomingBookings;