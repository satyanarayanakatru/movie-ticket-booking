import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import {
  Ticket,
  Film,
  Building2,
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  DollarSign,
  ShieldCheck,
  QrCode,
  Sparkles,
  User
} from 'lucide-react';
import { mockTheatresData } from '../data/mockTheatresData';

const TicketBooking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();
  const { createBooking, isDuplicateBooking, generateBookingId } = useBooking();

  // Booking payload passed from Seat Selection or defaults
  const stateData = location.state || {};

  const [selectedMovie, setSelectedMovie] = useState(stateData.movieTitle || 'Uncharted');
  const [selectedPoster, setSelectedPoster] = useState(
    stateData.moviePoster || 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=300&q=80'
  );
  const [selectedTheatre, setSelectedTheatre] = useState(
    stateData.theatreName || 'PVR IMAX, Forum Mall'
  );
  const [selectedCity, setSelectedCity] = useState(stateData.city || 'Hyderabad');
  const [selectedDate, setSelectedDate] = useState(stateData.showDate || 'Today, 30 Sep 2026');
  const [selectedTime, setSelectedTime] = useState(stateData.showTime || '07:30 PM');
  const [selectedSeats, setSelectedSeats] = useState(stateData.selectedSeats || ['C5', 'C6']);

  const [bookingIdPreview, setBookingIdPreview] = useState('');
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(null);

  // Calculate pricing
  const ticketCount = selectedSeats.length;
  const pricePerTicket = 16; // Average executive tier
  const subtotal = stateData.subtotal || ticketCount * pricePerTicket;
  const convenienceFee = stateData.convenienceFee || (ticketCount > 0 ? 3.5 : 0);
  const totalPrice = stateData.totalPrice || subtotal + convenienceFee;

  // Generate Booking ID preview & check duplicate status on mount/change
  useEffect(() => {
    setBookingIdPreview(generateBookingId());
    const duplicateCheck = isDuplicateBooking(
      stateData.theatreId || 'th-101',
      selectedDate,
      selectedTime,
      selectedSeats
    );
    setIsDuplicate(duplicateCheck);
  }, [selectedTheatre, selectedDate, selectedTime, selectedSeats]);

  // Handle final booking confirmation
  const handleConfirmBooking = () => {
    if (selectedSeats.length === 0) {
      return;
    }

    const payload = {
      userId: currentUser?.id || 'usr_guest',
      user: currentUser?.name || 'Guest User',
      movieId: stateData.movieId || '101',
      movie: selectedMovie,
      moviePoster: selectedPoster,
      theatreId: stateData.theatreId || 'th-101',
      theatre: selectedTheatre,
      city: selectedCity,
      showDate: selectedDate,
      showTime: selectedTime,
      seats: selectedSeats,
      ticketCount: ticketCount,
      subtotal: subtotal,
      convenienceFee: convenienceFee,
      totalPrice: totalPrice
    };

    const res = createBooking(payload);
    if (res.success) {
      setBookingSuccess(res.booking);
    }
  };

  const handleProceedToPayment = () => {
    if (bookingSuccess) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 space-y-8">
      {/* Header Banner */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold mb-2">
            <Ticket className="w-3.5 h-3.5" />
            <span>Module 6: Ticket Booking & Summary</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Booking Summary
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Review your movie selection, theatre showtime & complete your reservation
          </p>
        </div>

        <button
          onClick={() => navigate('/seat-selection')}
          className="px-4 py-2.5 rounded-full bg-slate-900 border border-slate-800 hover:border-amber-500/30 text-slate-300 hover:text-amber-400 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Change Seats</span>
        </button>
      </div>

      {/* Main Grid: Left Summary Details vs Right Confirmation Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN: BOOKING SUMMARY DETAILS */}
        <div className="lg:col-span-2 space-y-6">
          {/* Movie & Theatre Overview Card */}
          <div className="bg-[#151c28] border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-6 border-b border-slate-800">
              <img
                src={selectedPoster}
                alt={selectedMovie}
                className="w-20 h-28 rounded-2xl object-cover border border-slate-700 shadow-md"
              />
              <div className="space-y-2 flex-1">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-extrabold border border-amber-500/30">
                    CONFIRMED DRAFT
                  </span>
                  <span className="font-mono text-xs font-bold text-amber-400 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                    ID: {bookingSuccess ? bookingSuccess.id : bookingIdPreview}
                  </span>
                </div>

                <h2 className="text-2xl font-extrabold text-white">{selectedMovie}</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 pt-1">
                  <p className="flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-amber-400" />
                    <span><strong>Theatre:</strong> {selectedTheatre} ({selectedCity})</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span><strong>Timing:</strong> {selectedTime}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-amber-400" />
                    <span><strong>Date:</strong> {selectedDate}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <User className="w-4 h-4 text-amber-400" />
                    <span><strong>User:</strong> {currentUser?.name || 'Guest User'}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Selected Seats Badges */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                <span>Selected Seats ({ticketCount} Tickets)</span>
                <span className="text-amber-400">Guaranteed Reserved</span>
              </h4>

              <div className="flex flex-wrap gap-2">
                {selectedSeats.map((seat) => (
                  <span
                    key={seat}
                    className="px-3.5 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-300 font-mono font-extrabold text-sm flex items-center gap-1.5 shadow-sm"
                  >
                    <Ticket className="w-3.5 h-3.5 text-amber-400" />
                    Seat {seat}
                  </span>
                ))}
              </div>
            </div>

            {/* Duplicate Check Indicator */}
            {isDuplicate ? (
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300 flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0" />
                <div>
                  <p className="font-bold text-rose-200">Duplicate Booking Notice</p>
                  <p className="text-[11px] text-rose-300/80">
                    These seats are already reserved for this showtime in system memory.
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <div>
                  <p className="font-bold text-emerald-200">Seats Available & Verified</p>
                  <p className="text-[11px] text-emerald-300/80">
                    No duplicate bookings found for this theatre, date, and showtime combination.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: PRICE BREAKDOWN & CONFIRMATION ACTION */}
        <div className="bg-[#151c28] border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-amber-400" />
                <span>Payment Summary</span>
              </h3>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>

            {/* Price Calculations */}
            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>{ticketCount} x Ticket ({selectedSeats.join(', ')})</span>
                <span className="font-semibold text-white">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Convenience & Booking Fee</span>
                <span className="font-semibold text-white">${convenienceFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Digital QR Pass & SMS Ticket</span>
                <span className="font-semibold text-emerald-400">FREE</span>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
                <span className="text-sm font-extrabold text-white">Grand Total</span>
                <span className="text-2xl font-black text-amber-400">${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            {/* Barcode & Booking ID Card */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-2">
              <QrCode className="w-12 h-12 text-amber-400 mx-auto" />
              <p className="text-[10px] font-mono font-bold text-slate-400 tracking-wider">
                ID: {bookingSuccess ? bookingSuccess.id : bookingIdPreview}
              </p>
              <p className="text-[10px] text-slate-500">Scan at entrance for paperless entry</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            {!bookingSuccess ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleConfirmBooking}
                disabled={isDuplicate || ticketCount === 0}
                className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Confirm Ticket Booking</span>
                <CheckCircle2 className="w-4 h-4" />
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleProceedToPayment}
                className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer"
              >
                <span>Return to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            )}

            <p className="text-[10px] text-slate-400 text-center flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Instant Confirmation & Saved to LocalStorage</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketBooking;
