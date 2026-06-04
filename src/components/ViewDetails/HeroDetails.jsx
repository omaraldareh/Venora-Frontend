import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Users,
  Calendar,
  Star,
  CheckCircle2,
  Clock3,
  Phone,
} from "lucide-react";

import API from "../../api/axios";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import ReviewsSection from "../ReviewLayout/ReviewsSection";


const HeroDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState("");

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

const handleReserve = (slot) => {
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login", {
      state: {
        redirectTo: `/browse/${venue._id}/book`,
        selectedSlot: slot,
      },
    });

    return;
  }

  navigate(`/browse/${venue._id}/book`, {
    state: {
      selectedSlot: slot,
    },
  });
};

  useEffect(() => {
    const fetchVenueData = async () => {
      try {
        setLoading(true);
        setServerError("");

        const response = await API.get(`/hall/${id}`);

        setVenue(response.data.data);
      } catch (error) {
        console.error("Error fetching hall details:", error);

        setServerError(
          error?.response?.data?.message ||
            "Failed to load venue details. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchVenueData();
    }
  }, [id]);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-[#020817] flex flex-col items-center justify-center">
        <div className="w-14 h-14 border-[3px] border-[#D4A353] border-t-transparent rounded-full animate-spin"></div>

        <p className="mt-5 text-sm text-gray-400 tracking-wide">
          Fetching luxury venue details...
        </p>
      </div>
    );
  }

  // Error State
  if (serverError) {
    return (
      <div className="min-h-screen bg-[#020817] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-red-500/10 border border-red-500/20 rounded-3xl p-8 text-center space-y-5">
          <p className="text-red-400 text-sm">
            {serverError}
          </p>

          <button
            onClick={() => navigate(-1)}
            className="bg-[#D4A353] hover:bg-[#e2b760] text-black text-sm font-semibold px-6 py-3 rounded-2xl transition-all duration-300"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020817] text-white">

      {/* Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-all duration-300 group mb-10"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform duration-300"
          />

          Go Back
        </button>

        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          <div className="space-y-4">

            <div className="relative overflow-hidden rounded-4xl border border-white/10 bg-[#0F172A] shadow-2xl aspect-4/3">

              <img
                src={
                  venue?.images?.[0] ||
                  "https://placehold.co/1200x800"
                }
                alt={venue?.name}
                className="w-full h-full object-cover cursor-pointer hover:scale-105 transition duration-500"
                onClick={() => {
                  setIndex(0);
                  setOpen(true);
                }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent"></div>

              {/* Hall Type */}
              <div className="absolute top-5 left-5">
                <span className="bg-[#D4A353] text-black text-[11px] uppercase tracking-[2px] font-bold px-4 py-2 rounded-full shadow-lg">
                  {venue?.hallType || "Luxury Venue"}
                </span>
              </div>

              {/* View Photos */}
              {venue?.images?.length > 1 && (
                <button
                  onClick={() => {
                    setIndex(0);
                    setOpen(true);
                  }}
                  className="absolute bottom-5 right-5 bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/10 text-white text-xs px-5 py-3 rounded-2xl transition-all duration-300"
                >
                  View All Photos
                </button>
              )}
            </div>

            {/* Thumbnails */}
            {venue?.images?.length > 1 && (
              <div className="grid grid-cols-4 gap-3">

                {venue.images.map((img, imgIndex) => (
                  <div
                    key={imgIndex}
                    onClick={() => {
                      setIndex(imgIndex);
                      setOpen(true);
                    }}
                    className={`relative overflow-hidden rounded-2xl cursor-pointer border transition-all duration-300 group ${
                      imgIndex === index
                        ? "border-[#D4A353]"
                        : "border-white/5 hover:border-[#D4A353]/40"
                    }`}
                  >

                    <img
                      src={img}
                      alt={`venue-${imgIndex}`}
                      className="w-full h-24 object-cover group-hover:scale-110 transition duration-500"
                    />

                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition duration-300"></div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT SIDE - DETAILS */}
          <div className="space-y-8">

            {/* Header */}
            <div className="space-y-4">

              {/* Rating */}
              <div className="inline-flex items-center gap-2 bg-[#111827] border border-white/5 px-4 py-2 rounded-full text-yellow-400 text-xs w-fit">

                <Star fill="currentColor" size={14} />

                <span className="font-semibold text-white">
                  {venue?.rating > 0
                    ? venue.rating.toFixed(1)
                    : "New Venue"}
                </span>
              </div>

              {/* Name */}
              <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
                {venue?.name}
              </h1>

              {/* Location */}
              <div className="flex items-center gap-2 text-gray-400">

                <MapPin
                  size={17}
                  className="text-[#D4A353]"
                />

                <span className="text-sm">
                  {venue?.location?.address
                    ? `${venue.location.address}, `
                    : ""}
                  {venue?.location?.city || "Amman"}
                </span>
              </div>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-4">

              {/* Capacity */}
              <div className="bg-[#0F172A] border border-white/5 rounded-3xl p-5 flex items-center gap-4">

                <div className="w-12 h-12 rounded-2xl bg-[#D4A353]/10 flex items-center justify-center">
                  <Users
                    size={22}
                    className="text-[#D4A353]"
                  />
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-[2px] text-gray-500">
                    Max Capacity
                  </p>

                  <p className="text-lg font-bold text-white">
                    {venue?.capacity || "N/A"} Guests
                  </p>
                </div>
                
              </div>

              {/* Status */}
              <div className="bg-[#0F172A] border border-white/5 rounded-3xl p-5 flex items-center gap-4">

                <div className="w-12 h-12 rounded-2xl bg-[#D4A353]/10 flex items-center justify-center">
                  <Calendar
                    size={22}
                    className="text-[#D4A353]"
                  />
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-[2px] text-gray-500">
                    Booking Status
                  </p>

                  <p className="text-lg font-bold text-green-400">
                    Slots Open
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#0F172A] border border-white/5 rounded-3xl p-5 mt-4">
              <p className="text-[11px] uppercase tracking-[2px] text-gray-500 mb-2">
                Contact Provider
              </p>

              <div className="flex items-center gap-2">
                <Phone size={18} className="text-[#D4A353]" />

                <p className="text-white font-medium">
                  {venue?.provider?.phone || "Not Available"}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">

              <h3 className="text-xs uppercase tracking-[2px] text-gray-400 font-semibold">
                About the Venue
              </h3>

              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                {venue?.description ||
                  "No venue description available."}
              </p>
            </div>

            {/* Amenities */}
            {venue?.amenities?.length > 0 && (
              <div className="space-y-4">

                <h3 className="text-xs uppercase tracking-[2px] text-gray-400 font-semibold">
                  Offered Amenities
                </h3>

                <div className="flex flex-wrap gap-3">

                  {venue.amenities.map(
                    (amenity, amenityIndex) => (
                      <div
                        key={amenityIndex}
                        className="inline-flex items-center gap-2 bg-[#0F172A] border border-white/5 px-4 py-2 rounded-2xl text-sm text-gray-300 hover:border-[#D4A353]/30 transition-all duration-300"
                      >
                        <CheckCircle2
                          size={15}
                          className="text-[#D4A353]"
                        />

                        {amenity}
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            <div className="space-y-5">

              <div className="flex items-center justify-between">
                <h3 className="text-xs uppercase tracking-[2px] text-gray-400 font-semibold">
                  Available Booking Slots
                </h3>

                <span className="text-xs text-[#D4A353]">
                  {venue?.availableSlots?.length || 0} Slots Available
                </span>
              </div>

              {venue?.availableSlots?.length > 0 ? (

                <div className="space-y-4">

                  {venue.availableSlots.map(
                    (slot, slotIndex) => (
                      <div
                        key={slot._id || slotIndex}
                        className="group bg-[#0F172A] border border-white/5 hover:border-[#D4A353]/40 rounded-3xl p-5 transition-all duration-300 shadow-xl hover:shadow-[#D4A353]/5"
                      >

                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                          {/* Left */}
                          <div className="space-y-3">

                            {/* Time */}
                            <div className="flex items-center gap-2 text-gray-300">

                              <Clock3
                                size={16}
                                className="text-[#D4A353]"
                              />

                              <span className="font-medium">
                                {slot.startTime} - {slot.endTime}
                              </span>
                            </div>

                            {/* Price */}
                            <div>
                              <p className="text-3xl font-bold text-[#D4A353]">
                                {slot.price}

                                <span className="text-sm text-gray-400 ml-2 font-medium">
                                  JOD
                                </span>
                              </p>
                            </div>
                          </div>
                        <button
                        onClick={() => handleReserve(slot)}
                        className="bg-linear-to-r from-[#C6A15B] to-[#D4AF37] hover:from-[#D4AF37] hover:to-[#C6A15B] text-[#020817] font-bold text-sm px-7 py-4 rounded-2xl transition-all duration-300 active:scale-95 shadow-lg shadow-[#D4A353]/10 whitespace-nowrap">
                        Reserve This Slot
                        </button>
                        </div>
                      </div>
                    )
                  )}
                </div>

              ) : (

                <div className="bg-[#0F172A] border border-white/5 rounded-3xl p-6 text-center text-gray-400 text-sm">
                  No booking slots available at the moment.
                </div>

              )}
            </div>
          </div>
        </div>
              <ReviewsSection hallId={venue._id} />

      </div>



      {/* Lightbox */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        plugins={[Thumbnails, Zoom]}
        slides={
          venue?.images?.map((img) => ({
            src: img,
          })) || []
        }
      />
    </div>
  );
};

export default HeroDetails;