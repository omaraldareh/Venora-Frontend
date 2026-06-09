import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import API from '../api/axios';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMyBookings = async () => {
            try {
                const response = await API.get('/booking/myBookings');
                setBookings(response.data.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching bookings:", err);
                setError(err.response?.data?.message || "Failed to fetch bookings");
                setLoading(false);
            }
        };

        fetchMyBookings();
    }, []);

    return (
        <div className="min-h-screen bg-[#020817] text-white flex flex-col">
            <Navbar />
            
            {/* mt-32 تضمن نزول المحتوى بالكامل تحت النيفبار بدون تداخل */}
            <div className="max-w-6xl w-full mx-auto px-4 mt-32 pb-10 flex-1">
                <h1 className="text-3xl font-bold border-b border-gray-800 pb-4 mb-8">
                    My Bookings <span className="text-[#D4A353]">({bookings.length})</span>
                </h1>

                {loading && (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4A353]"></div>
                    </div>
                )}

                {error && (
                    <div className="bg-red-900/20 border border-red-500 text-red-200 p-4 rounded-xl text-center">
                        {error}
                    </div>
                )}

                {!loading && !error && bookings.length === 0 && (
                    <div className="text-center py-20 bg-slate-900/50 rounded-2xl border border-slate-800">
                        <p className="text-gray-400 text-lg mb-4">You don't have any bookings yet.</p>
                    </div>
                )}

                {!loading && !error && bookings.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {bookings.map((booking) => (
                            <div 
                                key={booking._id} 
                                className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden hover:border-[#D4A353]/40 transition-all duration-300 flex flex-col justify-between shadow-xl"
                            >
                                {/* الصورة */}
                                {booking.hall?.images && booking.hall.images.length > 0 ? (
                                    <img 
                                        src={booking.hall.images[0]} 
                                        alt={booking.hall.name} 
                                        className="w-full h-48 object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-48 bg-slate-800 flex items-center justify-center text-gray-500">
                                        No Image Available
                                    </div>
                                )}

                                {/* التفاصيل الداخية */}
                                <div className="p-6 flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start mb-2 gap-2">
                                            <h2 className="text-xl font-bold text-white truncate">{booking.hall?.name || "Unknown Hall"}</h2>
                                            <span className={`text-[10px] px-2 py-0.5 rounded-md font-semibold capitalize shrink-0 ${
                                                booking.status === 'confirmed' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                                            }`}>
                                                {booking.status || 'confirmed'}
                                            </span>
                                        </div>

                                        <p className="text-gray-400 text-sm mb-4">
                                            📍 {booking.hall?.location ? `${booking.hall.location.city || ''}, ${booking.hall.location.address || ''}` : "No Location Specified"}
                                        </p> 

                                        {/* بوكس تفاصيل الوقت والتاريخ بعد تعديل الأسماء بناءً على الـ Model */}
                                        <div className="bg-[#020817] p-4 rounded-xl border border-slate-800 space-y-3 text-sm text-gray-300">
                                            {/* التاريخ - صلحنا الاسم إلى bookingDate */}
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-500">Date:</span>
                                                <span className="text-[#D4A353] font-mono font-semibold">
                                                    {booking.bookingDate ? new Date(booking.bookingDate).toLocaleDateString('en-GB') : "N/A"}
                                                </span>
                                            </div>
                                            
                                            {/* الوقت (Slot) - أضفنا عرض الـ startTime والـ endTime */}
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-500">Time Slot:</span>
                                                <span className="text-white font-mono bg-slate-800 px-2 py-0.5 rounded text-xs">
                                                    {booking.slot?.startTime || '00:00'} - {booking.slot?.endTime || '00:00'}
                                                </span>
                                            </div>
                                        </div>

                                        {/* الـ Booking ID */}
                                        <div className="flex justify-between text-xs text-gray-500 pt-3 mt-3 border-t border-slate-800/60">
                                            <span>Booking ID:</span>
                                            <span className="font-mono text-gray-400">{booking._id?.substring(0, 8)}...</span>
                                        </div>
                                    </div>

                                    {/* السعر المدفوع الحقيقي من الـ booking نفسه ليتصلح الـ $0 */}
                                    <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between items-center">
                                        <span className="text-gray-400 text-sm">Price paid</span>
                                        <span className="text-xl font-bold text-[#D4A353]">${booking.totalPrice !== undefined ? booking.totalPrice : 0}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBookings;