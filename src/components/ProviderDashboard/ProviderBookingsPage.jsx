import { useEffect, useMemo, useState } from "react";
import API from "../../api/axios";
import { 
  User, Phone, Mail, Calendar, Clock, DollarSign, MapPin, 
  X, ExternalLink, ShieldAlert, Info 
} from "lucide-react";

const ProviderBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await API.get("/provider/bookings");
        setBookings(res.data.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // 🛠️ الفلترة الذكية مع حماية الـ UTC وتصفير الوقت
  const filteredBookings = useMemo(() => {
    const today = new Date();
    const utcToday = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());

    return bookings.filter((booking) => {
      const eventDate = new Date(booking.bookingDate);
      const utcEventDate = Date.UTC(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());

      switch (filter) {
        case "upcoming":
          return booking.status === "confirmed" && utcEventDate >= utcToday;

        case "completed":
          return booking.status === "confirmed" && utcEventDate < utcToday;

        case "cancelled":
          return booking.status === "cancelled";

        default:
          return true;
      }
    });
  }, [bookings, filter]);

  // منطق تسمية الحالة زمنيًا وتلوينها
  const getEnrichedStatus = (booking) => {
    if (booking.status === "cancelled") return { text: "Cancelled", style: "bg-red-50 text-red-600 border-red-100" };
    
    const today = new Date();
    const utcToday = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
    const eventDate = new Date(booking.bookingDate);
    const utcEventDate = Date.UTC(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());

    if (utcEventDate === utcToday) return { text: "Today's Event", style: "bg-purple-50 text-purple-600 border-purple-100" };
    if (utcEventDate < utcToday) return { text: "Completed", style: "bg-green-50 text-green-600 border-green-100" };
    return { text: "Upcoming", style: "bg-blue-50 text-blue-600 border-blue-100" };
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-purple-600 font-bold text-lg animate-pulse">
        Loading Venuora Bookings...
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans text-left" dir="ltr">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
          All Bookings
        </h1>
        <p className="text-gray-500 mt-2 text-sm">
          Manage, track, and review all reservations for your event halls.
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap mb-6">
        {["all", "upcoming", "completed", "cancelled"].map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold border transition duration-200 ${
              filter === item
                ? "bg-purple-600 border-purple-600 text-white shadow-sm"
                : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"
            }`}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-400 text-[11px] font-bold uppercase tracking-wider border-b border-gray-100 text-left">
                <th className="py-4 px-6">Customer</th>
                <th className="py-4 px-6">Phone</th>
                <th className="py-4 px-6">Hall</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6">Time Slot</th>
                <th className="py-4 px-6 text-center">Price</th>
                <th className="py-4 px-6 text-center">Status</th>
                <th className="py-4 px-6 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50 text-sm font-medium text-gray-700">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-14 text-gray-400">
                    <div className="flex flex-col items-center justify-center">
                      <ShieldAlert className="text-gray-300 mb-2" size={32} />
                      <p className="font-bold text-gray-600">No bookings found</p>
                      <p className="text-xs text-gray-400 mt-0.5">Try changing the active filters.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredBookings.map((booking) => {
                  const statusInfo = getEnrichedStatus(booking);
                  return (
                    <tr key={booking._id} className="hover:bg-gray-50/60 transition">
                      <td className="py-4 px-6 font-semibold text-gray-800">
                        {booking.user?.name || "-"}
                      </td>
                      <td className="py-4 px-6 text-gray-500">{booking.user?.phone || "-"}</td>
                      <td className="py-4 px-6 text-gray-600">{booking.hall?.name || "-"}</td>
                      <td className="py-4 px-6 text-gray-600">
                        {new Date(booking.bookingDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </td>
                      <td className="py-4 px-6 text-xs text-gray-500">
                        <span className="bg-gray-100 px-2 py-1 rounded-md font-mono">{booking.slot?.startTime} - {booking.slot?.endTime}</span>
                      </td>
                      <td className="py-4 px-6 text-center font-bold text-gray-800">
                        {booking.totalPrice} JD
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${statusInfo.style}`}>
                          {statusInfo.text}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => setSelectedBooking(booking)}
                          className="text-purple-600 hover:text-purple-700 bg-purple-50 hover:bg-purple-100 px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ml-auto"
                        >
                          <Info size={14} />
                          Details
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= PREMIUM MODERN MODAL POPUP ================= */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden transform transition-all animate-zoom-in border border-gray-100">
            
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-purple-50/40">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-purple-600 text-white rounded-xl shadow-sm shadow-purple-200">
                  <Calendar size={18} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-gray-800">Reservation Deep-Dive</h2>
                  <p className="text-gray-400 text-[11px] font-medium mt-0.5">Booking ID: {selectedBooking._id}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition border border-transparent hover:border-gray-200"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content Body - Split Layout */}
            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Left Side: Client profile details */}
                <div className="space-y-4">
                  <h4 className="text-[11px] font-bold text-purple-600 uppercase tracking-wider flex items-center gap-1">
                    <User size={12} /> Customer Information
                  </h4>
                  <div className="bg-gray-50/70 border border-gray-100 rounded-2xl p-4 space-y-3 shadow-inner">
                    <div>
                      <span className="text-[10px] text-gray-400 font-bold block uppercase">Full Name</span>
                      <span className="text-sm font-bold text-gray-800">{selectedBooking.user?.name || "Guest Client"}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 font-bold block uppercase">Phone Number</span>
                      <a href={`tel:${selectedBooking.user?.phone}`} className="text-sm font-semibold text-purple-600 hover:underline flex items-center gap-1 mt-0.5">
                        <Phone size={13} /> {selectedBooking.user?.phone || "N/A"}
                      </a>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 font-bold block uppercase">Email Address</span>
                      <span className="text-xs font-medium text-gray-600 break-all flex items-center gap-1 mt-0.5">
                        <Mail size={13} /> {selectedBooking.user?.email || "No email attached"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Side: Event schedule & financial breakdown */}
                <div className="space-y-4">
                  <h4 className="text-[11px] font-bold text-purple-600 uppercase tracking-wider flex items-center gap-1">
                    <Clock size={12} /> Event & Booking Details
                  </h4>
                  <div className="bg-gray-50/70 border border-gray-100 rounded-2xl p-4 space-y-3 shadow-inner">
                    <div>
                      <span className="text-[10px] text-gray-400 font-bold block uppercase">Target Hall</span>
                      <span className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
                        {selectedBooking.hall?.name}
                        <ExternalLink size={12} className="text-gray-400 cursor-pointer hover:text-purple-600" />
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-[10px] text-gray-400 font-bold block uppercase">Event Date</span>
                        <span className="text-xs font-bold text-gray-700">
                          {new Date(selectedBooking.bookingDate).toLocaleDateString("en-US", { dateStyle: "medium" })}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-gray-400 font-bold block uppercase">Time Slot</span>
                        <span className="text-xs font-bold text-gray-700 font-mono">{selectedBooking.slot?.startTime} - {selectedBooking.slot?.endTime}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-1 border-t border-gray-200/60">
                      <div>
                        <span className="text-[10px] text-gray-400 font-bold block uppercase">Current Status</span>
                        <span className={`inline-block text-[10px] font-extrabold uppercase mt-0.5 px-2 py-0.5 rounded-md border ${getEnrichedStatus(selectedBooking).style}`}>
                          {getEnrichedStatus(selectedBooking).text}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-gray-400 font-bold block uppercase">Total Revenue</span>
                        <span className="text-sm font-extrabold text-purple-600 flex items-center"><DollarSign size={14} />{selectedBooking.totalPrice} JD</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hall Preview Image Section if exists */}
              {selectedBooking.hall?.images?.[0] && (
                <div className="relative group rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                  <img
                    src={selectedBooking.hall.images[0]}
                    alt={selectedBooking.hall.name}
                    className="w-full h-44 object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-4">
                    <p className="text-white text-xs font-bold flex items-center gap-1">
                      <MapPin size={12} /> Hall Premise Snapshot
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer buttons */}
            <div className="border-t border-gray-100 p-4 flex justify-end bg-gray-50/50 gap-2">
              <button
                onClick={() => setSelectedBooking(null)}
                className="px-4 py-2 text-xs font-bold text-gray-500 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:text-gray-700 transition"
              >
                Close View
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default ProviderBookingsPage;