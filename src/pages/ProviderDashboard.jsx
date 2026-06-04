import { useEffect, useState } from 'react';
import API from '../api/axios';
import { Layers, CheckCircle2, Clock, Star } from 'lucide-react';
import StatsCard from '../components/ProviderDashboard/StatsCard';
import UpcomingBookings from '../components/ProviderDashboard/UpcomingBookings';
import YourHalls from '../components/ProviderDashboard/YourHalls';
import { useNavigate } from 'react-router-dom';
const ProviderDashboard = () => {

  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [halls, setHalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hallToDelete, setHallToDelete] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsRes, bookingsRes, hallsRes] = await Promise.all([
          API.get('/provider/statistics'), 
          API.get('/provider/bookings'),
          API.get('/provider/halls')
        ]);

        setStats(statsRes.data.data);
        setBookings(bookingsRes.data.data);
        setHalls(hallsRes.data.data);
      } catch (error) {
        console.error("Error loading Venora dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-purple-600 font-bold text-lg">
        Loading Venora Dashboard...
      </div>
    );
  }

  const handleAddNewHall = () => {
    navigate('/provider/add-hall');
  }
  const handleEditHall = (id) => {
    navigate(`/hall/updateHall/${id}`);
  }
  const handleDeleteHall = (id) => {
  setHallToDelete(id);
};

const confirmDeleteHall = async () => {
  try {
    await API.delete(
      `/hall/deleteHall/${hallToDelete}`
    );

    setHalls((prev) =>
      prev.filter(
        (hall) => hall._id !== hallToDelete
      )
    );

    setHallToDelete(null);

  } catch (error) {
    console.error(error);
    alert("Failed to delete hall");
  }
};



  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans text-left" dir="ltr">
      {/* Welcome Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome back! 👋</h1>
          <p className="text-gray-500 text-sm mt-1">Here's what's happening with your halls and bookings today.</p>
        </div>
      </div>

      {/* Statistics Cards - Updated to match your new time-safe backend filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Halls */}
        <StatsCard title="Total Halls" value={stats?.hallsNumber || 0} icon={Layers} />
        
        {/* Upcoming Bookings (Active/Future Bookings) */}
        <StatsCard title="Upcoming Bookings" value={stats?.upcomingBookingsNumber || 0} icon={Clock} />
        
        {/* Completed Bookings (Past Bookings) */}
        <StatsCard title="Completed Bookings" value={stats?.completedBookingsNumber || 0} icon={CheckCircle2} />
        
        {/* Average Rating */}
        <StatsCard title="Average Rating" value={`${stats?.avgRating || 0} / 5`} icon={Star} />
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <YourHalls 
            halls={halls} 
            onAddNew={handleAddNewHall} 
            onEdit={handleEditHall} 
            onDelete={handleDeleteHall} 
          />
        </div>
        
        <div className="lg:col-span-1">
          <UpcomingBookings bookings={bookings} />
        </div>
      </div>

    {hallToDelete && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
    
    <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
      
      <h3 className="text-xl font-bold text-gray-800 mb-2">
        Delete Hall
      </h3>

      <p className="text-gray-500 mb-6">
        Are you sure you want to delete this hall?
        This action cannot be undone.
      </p>

      <div className="flex justify-end gap-3">
        
        <button
          onClick={() => setHallToDelete(null)}
          className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50"
        >
          Cancel
        </button>

        <button
          onClick={confirmDeleteHall}
          className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700"
        >
          Delete
        </button>

      </div>

    </div>

  </div>
)}

    </div>
  );
};

export default ProviderDashboard;