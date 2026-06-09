import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  MapPin, Clock3, Users, CalendarDays, CheckCircle2,
  X, Lock, Sparkles, AlertCircle
} from "lucide-react";
import API from "../api/axios";


const formatTimeRange = (slot) => `${slot.startTime} – ${slot.endTime}`;

const slotDurationHours = (startTime, endTime) => {
  const toMins = (t) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };
  let diff = toMins(endTime) - toMins(startTime);
  if (diff <= 0) diff += 24 * 60;
  return diff / 60;
};

const formatToLocalDateString = (date) => {
  if (!date) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const SlotCard = ({ slot, isSelected, onSelect }) => {
  const isBooked = slot.status === "booked";
  const duration = slotDurationHours(slot.startTime, slot.endTime);

  const baseClasses =
    "relative w-full text-left rounded-2xl border p-5 transition-all duration-300 group";

  const stateClasses = isBooked
    ? "border-white/5 bg-white/[0.02] opacity-50 cursor-not-allowed"
    : isSelected
    ? "border-[#D4A353] bg-[#D4A353]/10 shadow-lg shadow-[#D4A353]/10 ring-1 ring-[#D4A353]/30"
    : "border-white/8 bg-white/[0.03] hover:border-[#D4A353]/40 hover:bg-white/[0.05] cursor-pointer hover:shadow-md hover:shadow-[#D4A353]/5";

  return (
    <button
      className={`${baseClasses} ${stateClasses}`}
      onClick={() => !isBooked && onSelect(slot)}
      disabled={isBooked}
      aria-disabled={isBooked}
      aria-pressed={isSelected}
      title={isBooked ? "This slot is already booked" : undefined}>
      {isSelected && (
        <span className="absolute inset-0 rounded-2xl animate-pulse bg-[#D4A353]/5 pointer-events-none" />
      )}

      <div className="flex items-center justify-between gap-4">
        {/* Left: time + duration */}
        <div className="flex items-start gap-3">
          <div
            className={`mt-0.5 p-2 rounded-xl transition-colors ${
              isBooked
                ? "bg-red-500/10 text-red-400/60"
                : isSelected
                ? "bg-[#D4A353]/20 text-[#D4A353]"
                : "bg-white/5 text-gray-400 group-hover:bg-[#D4A353]/10 group-hover:text-[#D4A353]"
            }`}
          >
            {isBooked ? <Lock size={14} /> : <Clock3 size={14} />}
          </div>

          <div>
            <p
              className={`font-bold text-base leading-tight ${
                isBooked
                  ? "text-gray-600 line-through decoration-red-400/40"
                  : isSelected
                  ? "text-white"
                  : "text-gray-200 group-hover:text-white"
              }`}
            >
              {formatTimeRange(slot)}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              {duration}h session
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1.5 shrink-0">
          <p
            className={`text-lg font-bold ${
              isBooked ? "text-gray-600" : "text-[#D4A353]"
            }`}
          >
            {isBooked ? "—" : `${slot.price} JOD`}
          </p>

          <span
            className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
              isBooked
                ? "bg-red-500/10 text-red-400/70 border-red-500/20"
                : isSelected
                ? "bg-[#D4A353]/20 text-[#D4A353] border-[#D4A353]/30"
                : "bg-green-500/10 text-green-400 border-green-500/20"
            }`}
          >
            {isBooked ? "Booked" : isSelected ? "Selected" : "Available"}
          </span>
        </div>
      </div>
    </button>
  );
};


const SlotSkeleton = () => (
  <div className="w-full rounded-2xl border border-white/5 p-5 animate-pulse">
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-white/5" />
        <div className="space-y-2">
          <div className="h-4 w-36 rounded-md bg-white/5" />
          <div className="h-3 w-16 rounded-md bg-white/5" />
        </div>
      </div>
      <div className="space-y-2 items-end flex flex-col">
        <div className="h-5 w-20 rounded-md bg-white/5" />
        <div className="h-4 w-16 rounded-full bg-white/5" />
      </div>
    </div>
  </div>
);


const Toast = ({ message, type = "error", onClose }) => {
  useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-100 flex items-center gap-3 px-5 py-3.5 rounded-2xl border shadow-2xl text-sm font-medium animate-slideUp ${
        type === "error"
          ? "bg-[#0F172A] border-red-500/30 text-red-300"
          : "bg-[#0F172A] border-green-500/30 text-green-300"
      }`}
    >
      <AlertCircle size={16} />
      {message}
      <button onClick={onClose} className="ml-1 opacity-60 hover:opacity-100">
        <X size={14} />
      </button>
    </div>
  );
};

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));
  const selectedSlotFromState = location.state?.selectedSlot;

  const [venue, setVenue] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [slots, setSlots] = useState([]); 
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(selectedSlotFromState || null);
  const [pageLoading, setPageLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [toast, setToast] = useState(null); 

  const [showVisaModal, setShowVisaModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [visaData, setVisaData] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [isCvvFocused, setIsCvvFocused] = useState(false);

  const bookingInFlight = useRef(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/login"); return; }
    if (user?.role !== "user") navigate("/");
  }, [navigate, user]);

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const res = await API.get(`/hall/${id}`);
        setVenue(res.data.data);
      } catch {
        navigate("/browse");
      } finally {
        setPageLoading(false);
      }
    };
    fetchVenue();
  }, [id, navigate]);

  const preselectedStart = selectedSlotFromState?.startTime;
  const preselectedEnd = selectedSlotFromState?.endTime;

  const fetchSlots = async (targetDate) => {
    if (!targetDate) return;

    setSlotsLoading(true);

    try {
      const formattedDate = formatToLocalDateString(targetDate);
    
      const res = await API.get(
        `/booking/available-slots/${id}?date=${formattedDate}`
      );

      const fetchedSlots = res.data.data || [];

      const merged = fetchedSlots.sort((a, b) =>
        a.startTime.localeCompare(b.startTime)
      );

      setSlots(merged);

      if (preselectedStart && preselectedEnd) {
        const match = fetchedSlots.find(
          (s) =>
            s.startTime === preselectedStart &&
            s.endTime === preselectedEnd &&
            s.status === "available"
        );

        if (match) {
          setSelectedSlot(match);
        }
      }

    } catch {
      setToast({
        message: "Failed to load slots. Please try again.",
        type: "error",
      });
    } finally {
      setSlotsLoading(false);
    }
  };

  const handleOpenPayment = () => {
    if (!selectedDate || !selectedSlot) {
      setToast({ message: "Please select a date and an available slot.", type: "error" });
      return;
    }
    setShowVisaModal(true);
  };

  const handleVisaChange = (e) => {
    let { name, value } = e.target;
    if (name === "number") {
      value = value.replace(/\s?/g, "").replace(/(\d{4})/g, "$1 ").trim().substring(0, 19);
    } else if (name === "expiry") {
      value = value.replace(/\//g, "").replace(/(\d{2})/g, "$1/").trim().substring(0, 5);
      if (value.endsWith("/")) value = value.slice(0, -1);
    } else if (name === "cvv") {
      value = value.replace(/\D/g, "").substring(0, 3);
    }
    setVisaData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFinalBooking = async (e) => {
    e.preventDefault();
    if (bookingInFlight.current) return; 
    bookingInFlight.current = true;

    const stillAvailable = slots.find(
      (s) =>
        s.startTime === selectedSlot.startTime &&
        s.endTime === selectedSlot.endTime &&
        s.status === "available"
    );
    if (!stillAvailable) {
      bookingInFlight.current = false;
      setShowVisaModal(false);
      setToast({ message: "This slot is no longer available. Please choose another.", type: "error" });
      fetchSlots(selectedDate);
      return;
    }

    try {
      setShowVisaModal(false);
      setBookingLoading(true);

      await API.post(`/booking/createBooking/${id}`, {
        bookingDate: formatToLocalDateString(selectedDate),
        slot: { startTime: selectedSlot.startTime, endTime: selectedSlot.endTime },
      });

      setVisaData({ number: "", name: "", expiry: "", cvv: "" });
      setShowSuccessModal(true);
    } catch (err) {
      setToast({
        message: err?.response?.data?.message || "Booking failed. Please try again.",
        type: "error",
      });
    } finally {
      setBookingLoading(false);
      bookingInFlight.current = false;
    }
  };

  if (pageLoading) {
    return (
      <div className="min-h-screen bg-[#020817] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-2 border-[#D4A353] border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-gray-500 tracking-widest uppercase">
          Loading venue details…
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020817] text-white py-10 px-4 relative">

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-150 h-100 bg-[#D4A353]/4 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 relative">

        <div className="lg:col-span-2 space-y-5">

          <section className="bg-[#0F172A] rounded-3xl p-6 border border-white/5">
            <div className="flex items-center gap-2 mb-5">
              <CalendarDays size={16} className="text-[#D4A353]" />
              <h2 className="text-base font-bold text-white tracking-tight">
                Select Date
              </h2>
            </div>

            <DatePicker
                selected={selectedDate}
                onChange={(date) => {
                  setSelectedDate(date);
                  setSelectedSlot(null);
                  if (date) {
                    fetchSlots(date);
                  }
                }}
                minDate={new Date()}
                placeholderText="Choose a date"
                wrapperClassName="w-full"
                className="w-full bg-[#020817] border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm outline-none focus:border-[#D4A353] cursor-pointer transition-colors placeholder:text-gray-600"
                calendarClassName="booking-calendar"
              />
          </section>

          {selectedDate && (
            <section className="bg-[#0F172A] rounded-3xl p-6 border border-white/5">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <Clock3 size={16} className="text-[#D4A353]" />
                  <h2 className="text-base font-bold text-white tracking-tight">
                    Time Slots
                  </h2>
                </div>

                {!slotsLoading && slots.length > 0 && (
                  <div className="flex items-center gap-3 text-[10px] text-gray-500">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-green-400/70 inline-block" />
                      Available
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-[#D4A353] inline-block" />
                      Selected
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-red-400/60 inline-block" />
                      Booked
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                {slotsLoading ? (
                  Array.from({ length: 3 }).map((_, i) => <SlotSkeleton key={i} />)
                ) : slots.length > 0 ? (
                  slots.map((slot, i) => (
                    <SlotCard
                      key={i}
                      slot={slot}
                      isSelected={
                        selectedSlot?.startTime === slot.startTime &&
                        selectedSlot?.endTime === slot.endTime
                      }
                      onSelect={setSelectedSlot}
                    />
                  ))
                ) : (
                  <div className="bg-[#020817] border border-white/5 rounded-2xl p-8 text-center space-y-2">
                    <p className="text-gray-500 text-sm">No slots available for this date.</p>
                    <p className="text-gray-600 text-xs">Try choosing a different date.</p>
                  </div>
                )}
              </div>
            </section>
          )}
        </div>

        <div>
          <div className="bg-[#0F172A] rounded-3xl border border-white/5 overflow-hidden sticky top-6">

            <div className="relative">
              <img
                src={venue?.images?.[0] || "https://placehold.co/1200x800"}
                alt={venue?.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#0F172A] via-transparent to-transparent" />
              <span className="absolute bottom-3 left-4 text-[10px] uppercase tracking-wider bg-[#D4A353]/90 text-[#020817] px-2.5 py-1 rounded-full font-bold">
                {venue?.hallType}
              </span>
            </div>

            <div className="p-5 space-y-4">
              <h2 className="text-xl font-bold leading-tight">{venue?.name}</h2>

              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <MapPin size={13} className="text-[#D4A353]/70 shrink-0" />
                  {venue?.location?.city}
                </div>
                <div className="flex items-center gap-2">
                  <Users size={13} className="text-[#D4A353]/70 shrink-0" />
                  Up to {venue?.capacity} guests
                </div>
                {selectedSlot && (
                  <div className="flex items-center gap-2">
                    <Clock3 size={13} className="text-[#D4A353]/70 shrink-0" />
                    {formatTimeRange(selectedSlot)}
                  </div>
                )}
                {selectedDate && (
                  <div className="flex items-center gap-2">
                    <CalendarDays size={13} className="text-[#D4A353]/70 shrink-0" />
                    {selectedDate.toDateString()}
                  </div>
                )}
              </div>

              <div className="border-t border-white/5 pt-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-gray-500 uppercase tracking-wider">Total</span>
                  <span className="text-3xl font-black text-[#D4A353]">
                    {selectedSlot?.price ?? 0}
                    <span className="text-sm font-medium ml-1 text-[#D4A353]/70">JOD</span>
                  </span>
                </div>
              </div>

              <button
                onClick={handleOpenPayment}
                disabled={bookingLoading || !selectedSlot || !selectedDate}
                className="w-full mt-1 relative overflow-hidden bg-linear-to-r from-[#C6A15B] to-[#D4AF37] text-[#020817] font-bold py-4 rounded-2xl transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] shadow-lg shadow-[#D4A353]/20 cursor-pointer"
              >
                {bookingLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-[#020817]/30 border-t-[#020817] rounded-full animate-spin" />
                    Processing…
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Sparkles size={15} />
                    Confirm Reservation
                  </span>
                )}
              </button>

              {!selectedDate && (
                <p className="text-center text-xs text-gray-600 mt-1">
                  Select a date to view slots
                </p>
              )}
              {selectedDate && !selectedSlot && (
                <p className="text-center text-xs text-gray-600 mt-1">
                  Choose an available slot above
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {showVisaModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-[#0F172A] border border-white/10 rounded-3xl w-full max-w-md p-6 relative space-y-5 shadow-2xl my-6 animate-slideUp">

              <button
                onClick={() => setShowVisaModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="text-center">
                <h3 className="text-xl font-bold text-[#D4A353]">Secure Checkout</h3>
                <p className="text-xs text-gray-400 mt-1">
                  Enter your card details to finalize your reservation.
                </p>
              </div>

              <div className="w-full max-w-75 h-43 mx-auto perspective-[1000px]">
                <div
                  className={`relative w-full h-full rounded-2xl transition-transform duration-700 transform-3d shadow-2xl ${
                    isCvvFocused ? "transform-[rotateY(180deg)]" : ""
                  }`}
                >
                  {/* Front */}
                  <div className="absolute inset-0 bg-linear-to-br from-[#1E293B] via-[#0F172A] to-[#334155] p-5 rounded-2xl backface-hidden flex flex-col justify-between border border-white/10">
                    <div className="flex justify-between items-start">
                      <div className="w-10 h-7 bg-amber-400/20 rounded-md border border-amber-400/30 flex items-center p-1">
                        <div className="w-full h-full bg-linear-to-r from-amber-500/40 to-yellow-300/30 rounded-sm" />
                      </div>
                      <span className="text-white font-black italic text-lg tracking-widest">VISA</span>
                    </div>
                    <div className="text-base font-mono tracking-[3px] text-gray-200">
                      {visaData.number || "•••• •••• •••• ••••"}
                    </div>
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-[9px] uppercase tracking-wider text-gray-500">Card Holder</p>
                        <p className="font-mono text-xs text-white uppercase truncate max-w-37.5">
                          {visaData.name || "YOUR NAME"}
                        </p>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase tracking-wider text-gray-500">Expires</p>
                        <p className="font-mono text-xs text-white">{visaData.expiry || "MM/YY"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Back */}
                  <div className="absolute inset-0 bg-linear-to-br from-[#0F172A] to-[#1E293B] rounded-2xl backface-hidden transform-[rotateY(180deg)] flex flex-col justify-between py-4 border border-white/10">
                    <div className="w-full h-9 bg-black/80 mt-1" />
                    <div className="px-5 space-y-1">
                      <p className="text-[8px] uppercase tracking-wider text-right text-gray-400 pr-2">CVV</p>
                      <div className="w-full bg-gray-200 text-black font-mono text-right pr-3 py-1.5 rounded-sm text-sm italic tracking-widest font-bold">
                        {visaData.cvv || "•••"}
                      </div>
                    </div>
                    <div className="px-5 text-[8px] text-gray-500 font-mono">
                      Simulated secure sandbox checkout.
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[11px] text-gray-400 uppercase tracking-wide">Card Number</label>
                  <input
                    type="text"
                    name="number"
                    placeholder="4111 2222 3333 4444"
                    value={visaData.number}
                    onChange={handleVisaChange}
                    className="w-full bg-[#020817] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#D4A353] outline-none font-mono transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-gray-400 uppercase tracking-wide">Cardholder Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={visaData.name}
                    onChange={handleVisaChange}
                    className="w-full bg-[#020817] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#D4A353] outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] text-gray-400 uppercase tracking-wide">Expiry</label>
                    <input
                      type="text"
                      name="expiry"
                      placeholder="MM/YY"
                      value={visaData.expiry}
                      onChange={handleVisaChange}
                      className="w-full bg-[#020817] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#D4A353] outline-none font-mono transition-colors"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] text-gray-400 uppercase tracking-wide">CVV</label>
                    <input
                      type="password"
                      name="cvv"
                      placeholder="•••"
                      value={visaData.cvv}
                      onChange={handleVisaChange}
                      onFocus={() => setIsCvvFocused(true)}
                      onBlur={() => setIsCvvFocused(false)}
                      className="w-full bg-[#020817] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#D4A353] outline-none font-mono transition-colors"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowVisaModal(false)}
                    className="w-full border border-white/10 hover:border-white/20 bg-white/5 text-white font-semibold py-3 rounded-xl transition-all duration-200 cursor-pointer text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleFinalBooking}
                    disabled={
                      !visaData.number || !visaData.name || !visaData.expiry || !visaData.cvv
                    }
                    className="w-full bg-linear-to-r from-[#C6A15B] to-[#D4AF37] text-[#020817] font-bold py-3 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] text-sm cursor-pointer"
                  >
                    Pay {selectedSlot?.price} JOD
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-[#0F172A] border border-[#D4A353]/20 rounded-3xl w-full max-w-md p-8 text-center space-y-5 shadow-2xl relative overflow-hidden animate-slideUp">

            <div className="absolute -top-12 -left-12 w-40 h-40 bg-[#D4A353]/8 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-green-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="w-20 h-20 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto text-green-400 animate-scaleUp">
              <CheckCircle2 size={44} />
            </div>

            <div>
              <h3 className="text-2xl font-black text-white tracking-tight">
                Reservation Confirmed!
              </h3>
              <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                Your payment was successful and your slot at{" "}
                <span className="text-[#D4A353] font-medium">{venue?.name}</span> is locked in.
              </p>
            </div>

            <div className="bg-[#020817] border border-white/5 rounded-2xl p-4 text-xs text-left space-y-2 text-gray-400 font-mono">
              <div><span className="text-gray-600">Date: </span>{selectedDate?.toDateString()}</div>
              <div><span className="text-gray-600">Time: </span>{selectedSlot && formatTimeRange(selectedSlot)}</div>
              <div><span className="text-gray-600">Amount: </span>{selectedSlot?.price} JOD</div>
            </div>

            <button
              onClick={() => navigate("/MyBookings")}
              className="w-full bg-[#D4A353] hover:bg-[#e2b760] text-[#020817] font-bold py-4 rounded-xl transition-all duration-200 text-sm cursor-pointer shadow-lg shadow-[#D4A353]/10"
            >
              View My Bookings
            </button> 

            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full border border-white/10 hover:border-white/20 text-white font-medium py-3 rounded-xl transition-all duration-200 text-sm cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* ── STYLES ── */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleUp {
          from { transform: scale(0.75); opacity: 0; }
          to   { transform: scale(1);    opacity: 1; }
        }

        .animate-fadeIn  { animation: fadeIn  0.25s ease-out forwards; }
        .animate-slideUp { animation: slideUp 0.30s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        .animate-scaleUp { animation: scaleUp 0.40s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }

        /* DatePicker dark theme overrides */
        .react-datepicker {
          background: #0F172A !important;
          border: 1px solid rgba(255,255,255,0.08) !important;
          border-radius: 1rem !important;
          font-family: inherit !important;
          color: #fff !important;
        }
        .react-datepicker__header {
          background: #0F172A !important;
          border-bottom: 1px solid rgba(255,255,255,0.06) !important;
          border-radius: 1rem 1rem 0 0 !important;
        }
        .react-datepicker__current-month,
        .react-datepicker__day-name { color: #D4A353 !important; }
        .react-datepicker__day { color: #e2e8f0 !important; border-radius: 0.5rem !important; }
        .react-datepicker__day:hover { background: #D4A353/20 !important; color: #D4A353 !important; }
        .react-datepicker__day--selected,
        .react-datepicker__day--keyboard-selected {
          background: #D4A353 !important;
          color: #020817 !important;
          font-weight: 700 !important;
        }
        .react-datepicker__day--disabled { color: #374151 !important; }
        .react-datepicker__navigation-icon::before { border-color: #D4A353 !important; }
      `}</style>
    </div>
  );
};

export default BookingPage;