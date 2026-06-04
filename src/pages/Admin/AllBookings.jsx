import { useEffect, useState } from "react";
import API from "../../api/axios";
import SideBar from "../../components/AdminLayout/SideBar";
import { Calendar, User, Building, Clock } from "lucide-react"; 

const AllBookings = () => {
const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const fetchBookings = async () => {
      try {
        const response = await API.get('/booking/all');
        setBookings(response.data.data || []);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="flex bg-slate-50 min-h-screen text-slate-800 font-sans">
      <SideBar />
      
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          
          <div className="mb-8 border-b border-slate-200 pb-5 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">All Bookings</h1>
              <p className="text-slate-500 mt-1 text-sm">Monitor and manage all hall reservations across the platform.</p>
            </div>
            <div className="bg-[#D4A353]/10 text-[#D4A353] px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider">
              Total: {bookings.length} Bookings
            </div>
          </div>


          {loading ? (
            <div className="flex flex-col items-center justify-center p-20 text-slate-500 space-y-3">
              <div className="w-10 h-10 border-[3px] border-[#D4A353] border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm">Loading reservations...</p>
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center p-16 bg-white rounded-2xl border border-dashed border-slate-300">
              <Calendar size={40} className="text-slate-300 mx-auto mb-3" />
              <p className="text-slate-400 font-medium">No bookings found in the system.</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-500">
                      <th className="py-4 px-6">Venue Name</th>
                      <th className="py-4 px-6">Customer Details</th>
                      <th className="py-4 px-6">Booking Date / Slot</th>
                      <th className="py-4 px-6">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                    {bookings.map((booking) => (
                      <tr key={booking._id} className="hover:bg-slate-50/80 transition-colors">
                        
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
                              <Building size={16} />
                            </div>
                            <span className="font-semibold text-slate-900">
                              {booking.hall?.name || "Deleted Venue"}
                            </span>
                          </div>
                        </td>

                        <td className="py-4 px-6">
                          <div className="flex flex-col">
                            <span className="font-medium text-slate-800 flex items-center gap-1.5">
                              <User size={14} className="text-slate-400" />
                              {booking.user?.name || "Unknown User"}
                            </span>
                            <span className="text-xs text-slate-400 ml-5">
                              {booking.user?.email || "No Email"}
                            </span>
                          </div>
                        </td>

                        <td className="py-4 px-6">
                          <div className="flex flex-col space-y-1">
                            <span className="text-slate-600 font-mono text-xs flex items-center gap-1.5">
                              <Clock size={14} className="text-[#D4A353]" />
                              {booking.slot?.startTime || "00:00"} - {booking.slot?.endTime || "00:00"}
                            </span>
                            {booking.bookingDate && (
                              <span className="text-[11px] text-slate-400 bg-slate-100 w-fit px-2 py-0.5 rounded-md">
                                {new Date(booking.bookingDate).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="py-4 px-6">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100 capitalize">
                            Confirmed
                          </span>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default AllBookings;