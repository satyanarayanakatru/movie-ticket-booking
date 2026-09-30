import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import {
  Film,
  Building2,
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Ticket,
  CheckCircle2,
  Info,
  DollarSign,
  Tv,
  Crown
} from 'lucide-react';

const MAX_SEATS_LIMIT = 8;

// Seat Tier Definitions
const SEAT_TIERS = {
  VIP: { name: 'VIP Recliner', price: 22, rows: ['A', 'B'], color: '#f59e0b' },
  EXECUTIVE: { name: 'Executive Premium', price: 16, rows: ['C', 'D', 'E'], color: '#38bdf8' },
  STANDARD: { name: 'Standard Economy', price: 12, rows: ['F', 'G', 'H'], color: '#a855f7' }
};

// Generate initial seat map layout
const generateSeatLayout = () => {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const seatsPerRow = 12;

  // Pre-booked seats for realism
  const bookedSeats = new Set([
    'A5', 'A6', 'B3', 'B4', 'C8', 'C9', 'D1', 'D2', 'E11', 'E12', 'F5', 'F6', 'G7', 'H2'
  ]);

  const layout = [];
  rows.forEach((rowLetter) => {
    let tier = SEAT_TIERS.STANDARD;
    if (SEAT_TIERS.VIP.rows.includes(rowLetter)) tier = SEAT_TIERS.VIP;
    else if (SEAT_TIERS.EXECUTIVE.rows.includes(rowLetter)) tier = SEAT_TIERS.EXECUTIVE;

    const rowSeats = [];
    for (let num = 1; num <= seatsPerRow; num++) {
      const seatId = `${rowLetter}${num}`;
      rowSeats.push({
        id: seatId,
        row: rowLetter,
        number: num,
        tier: tier.name,
        price: tier.price,
        isBooked: bookedSeats.has(seatId)
      });
    }
    layout.push({ rowLetter, tier, seats: rowSeats });
  });

  return layout;
};

const SeatSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Selected Booking Details (Passed via navigation state or fallback defaults)
  const bookingState = location.state || {
    movieId: '101',
    movieTitle: 'Uncharted',
    moviePoster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=300&q=80',
    genre: 'Action / Adventure',
    rating: 4.8,
    theatreId: 'th-101',
    theatreName: 'PVR IMAX, Forum Mall',
    city: 'Hyderabad',
    showDate: 'Today, 30 Sep 2026',
    showTime: '07:30 PM',
    screen: 'Screen 1 (IMAX 4K)'
  };

  const seatLayout = useMemo(() => generateSeatLayout(), []);
  const [selectedSeatIds, setSelectedSeatIds] = useState(['C5', 'C6']); // Default pre-selected seats
  const [activeShowTime, setActiveShowTime] = useState(bookingState.showTime);

  const availableShowTimes = ['10:30 AM', '02:15 PM', '06:00 PM', '07:30 PM', '09:45 PM'];

  // Toggle Seat Selection
  const handleSeatClick = (seat) => {
    if (seat.isBooked) {
      toast.info(`Seat ${seat.id} is already booked by another user.`);
      return;
    }

    if (selectedSeatIds.includes(seat.id)) {
      setSelectedSeatIds(selectedSeatIds.filter((id) => id !== seat.id));
    } else {
      if (selectedSeatIds.length >= MAX_SEATS_LIMIT) {
        toast.warning(`Maximum ${MAX_SEATS_LIMIT} seats allowed per booking!`);
        return;
      }
      setSelectedSeatIds([...selectedSeatIds, seat.id]);
    }
  };

  // Compute selected seat details & totals
  const selectedSeatsInfo = useMemo(() => {
    const allSeats = seatLayout.flatMap((r) => r.seats);
    return allSeats.filter((s) => selectedSeatIds.includes(s.id));
  }, [seatLayout, selectedSeatIds]);

  const ticketSubtotal = useMemo(() => {
    return selectedSeatsInfo.reduce((sum, s) => sum + s.price, 0);
  }, [selectedSeatsInfo]);

  const convenienceFee = selectedSeatsInfo.length > 0 ? 3.50 : 0;
  const totalPrice = ticketSubtotal + convenienceFee;

  // Proceed to Module 6 Ticket Booking
  const handleProceedToBooking = () => {
    if (selectedSeatsInfo.length === 0) {
      toast.error('Please select at least 1 seat to proceed!');
      return;
    }

    const payload = {
      ...bookingState,
      showTime: activeShowTime,
      selectedSeats: selectedSeatIds,
      seatDetails: selectedSeatsInfo,
      ticketCount: selectedSeatsInfo.length,
      subtotal: ticketSubtotal,
      convenienceFee: convenienceFee,
      totalPrice: totalPrice
    };

    navigate('/ticket-booking', { state: payload });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-8">
      {/* Top Navigation & Movie Summary Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-[#151c28] border border-slate-800 shadow-2xl">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/movies')}
            className="w-10 h-10 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
            title="Back to Movies"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <img
            src={bookingState.moviePoster}
            alt={bookingState.movieTitle}
            className="w-14 h-20 rounded-xl object-cover border border-slate-700 shadow-md"
          />

          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-extrabold border border-amber-500/30">
                {bookingState.genre}
              </span>
              <span className="text-xs text-slate-400 font-semibold">{bookingState.screen}</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white mt-1">
              {bookingState.movieTitle}
            </h1>
            <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-amber-400" />
              <span>{bookingState.theatreName}, {bookingState.city}</span>
            </p>
          </div>
        </div>

        {/* Timing Selector */}
        <div className="space-y-2 text-right">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Select Show Timing</p>
          <div className="flex flex-wrap items-center gap-1.5 justify-end">
            {availableShowTimes.map((time) => (
              <button
                key={time}
                onClick={() => setActiveShowTime(time)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeShowTime === time
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Left Seat Map (2 cols) vs Right Summary Sidebar (1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN: INTERACTIVE AUDITORIUM SEAT MAP */}
        <div className="lg:col-span-2 bg-[#151c28] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          {/* Curved 4K Screen Display */}
          <div className="text-center pt-2 pb-4">
            <div className="h-1.5 w-3/4 mx-auto bg-gradient-to-r from-transparent via-amber-400 to-transparent rounded-full shadow-[0_0_20px_#f59e0b]" />
            <p className="text-[10px] tracking-widest text-amber-400 font-extrabold uppercase mt-2 flex items-center justify-center gap-1.5">
              <Tv className="w-3.5 h-3.5" />
              <span>CURVED 4K LASER SCREEN • ALL EYES THIS WAY</span>
            </p>
          </div>

          {/* Seat Layout Map */}
          <div className="overflow-x-auto pb-4">
            <div className="min-w-[500px] space-y-4">
              {seatLayout.map(({ rowLetter, tier, seats }) => (
                <div key={rowLetter} className="flex items-center justify-between gap-3">
                  {/* Row Letter */}
                  <span className="w-6 text-xs font-bold text-slate-400 text-center">{rowLetter}</span>

                  {/* Left Cluster (Seats 1-6) */}
                  <div className="flex items-center gap-2">
                    {seats.slice(0, 6).map((seat) => {
                      const isSelected = selectedSeatIds.includes(seat.id);
                      return (
                        <motion.button
                          key={seat.id}
                          whileHover={!seat.isBooked ? { scale: 1.15 } : {}}
                          whileTap={!seat.isBooked ? { scale: 0.9 } : {}}
                          onClick={() => handleSeatClick(seat)}
                          disabled={seat.isBooked}
                          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs font-bold transition-all flex items-center justify-center ${
                            seat.isBooked
                              ? 'bg-slate-800/40 border border-slate-800 text-slate-600 cursor-not-allowed'
                              : isSelected
                              ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/40 border-2 border-amber-400 font-extrabold'
                              : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-amber-500/40 hover:text-amber-400'
                          }`}
                          title={`${seat.id} - ${seat.tier} ($${seat.price})`}
                        >
                          {seat.number}
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Aisle Space */}
                  <div className="w-8 text-[9px] font-bold text-slate-600 text-center uppercase tracking-widest">
                    AISLE
                  </div>

                  {/* Right Cluster (Seats 7-12) */}
                  <div className="flex items-center gap-2">
                    {seats.slice(6, 12).map((seat) => {
                      const isSelected = selectedSeatIds.includes(seat.id);
                      return (
                        <motion.button
                          key={seat.id}
                          whileHover={!seat.isBooked ? { scale: 1.15 } : {}}
                          whileTap={!seat.isBooked ? { scale: 0.9 } : {}}
                          onClick={() => handleSeatClick(seat)}
                          disabled={seat.isBooked}
                          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs font-bold transition-all flex items-center justify-center ${
                            seat.isBooked
                              ? 'bg-slate-800/40 border border-slate-800 text-slate-600 cursor-not-allowed'
                              : isSelected
                              ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/40 border-2 border-amber-400 font-extrabold'
                              : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-amber-500/40 hover:text-amber-400'
                          }`}
                          title={`${seat.id} - ${seat.tier} ($${seat.price})`}
                        >
                          {seat.number}
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Row Letter */}
                  <span className="w-6 text-xs font-bold text-slate-400 text-center">{rowLetter}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Seat Tiers Legend Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <span className="w-4 h-4 rounded bg-slate-900 border border-slate-800" />
              <span>Available</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <span className="w-4 h-4 rounded bg-amber-500" />
              <span>Selected</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <span className="w-4 h-4 rounded bg-slate-800/40 border border-slate-800" />
              <span>Booked</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <Crown className="w-4 h-4 text-amber-400" />
              <span>VIP Recliner ($22)</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: BOOKING SUMMARY SIDEBAR */}
        <div className="bg-[#151c28] border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Ticket className="w-5 h-5 text-amber-400" />
                <span>Selection Summary</span>
              </h3>
              <span className="text-xs text-slate-400 font-medium">Max 8 seats</span>
            </div>

            {/* Selected Seats Badges */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Selected Seats ({selectedSeatsInfo.length})
              </p>
              {selectedSeatsInfo.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {selectedSeatsInfo.map((s) => (
                    <span
                      key={s.id}
                      className="px-3 py-1 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400 font-extrabold text-xs flex items-center gap-1"
                    >
                      {s.id} <span className="text-[10px] text-slate-400">(${s.price})</span>
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic">No seats selected yet. Click seats on the layout.</p>
              )}
            </div>

            {/* Price Calculation */}
            <div className="space-y-3 pt-3 border-t border-slate-800 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Tickets Subtotal</span>
                <span className="font-semibold text-white">${ticketSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Convenience & Booking Fee</span>
                <span className="font-semibold text-white">${convenienceFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Digital QR Boarding Pass</span>
                <span className="font-semibold text-emerald-400">FREE</span>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
                <span className="text-sm font-extrabold text-white">Total Ticket Price</span>
                <span className="text-2xl font-black text-amber-400">${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="space-y-3 pt-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleProceedToBooking}
              className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
            >
              <span>Proceed to Booking</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>

            <p className="text-[10px] text-slate-400 text-center flex items-center justify-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Seats are held for 10 minutes upon proceeding</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
