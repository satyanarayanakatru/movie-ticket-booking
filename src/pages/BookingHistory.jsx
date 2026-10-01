import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import {
  Ticket,
  Search,
  Calendar,
  Clock,
  Building2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  QrCode,
  Printer,
  X,
  CreditCard,
  Film,
  Sparkles,
  ChevronRight,
  User
} from 'lucide-react';
import { toast } from 'react-toastify';

const BookingHistory = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { bookings, cancelBooking } = useBooking();

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All'); // 'All' | 'Paid' | 'Confirmed' | 'Cancelled'

  // Modal states
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [cancelModalBooking, setCancelModalBooking] = useState(null);

  // Filtered Bookings logic
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.movie.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.theatre.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'All'
        ? true
        : statusFilter === 'Paid'
        ? b.paymentStatus === 'Paid'
        : b.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Handle Booking Cancellation Confirm
  const handleConfirmCancel = () => {
    if (cancelModalBooking) {
      cancelBooking(cancelModalBooking.id);
      setCancelModalBooking(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold mb-2">
            <Ticket className="w-3.5 h-3.5" />
            <span>Module 8: My Booking History</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            My Reservations & Passes
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage your past and active movie tickets, download E-Tickets or cancel reservations
          </p>
        </div>

        <button
          onClick={() => navigate('/movies')}
          className="px-4 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-extrabold text-xs flex items-center gap-2 hover:from-amber-400 hover:to-yellow-300 shadow-md cursor-pointer transition-colors"
        >
          <Film className="w-4 h-4" />
          <span>Book New Ticket</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-[#151c28] border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Movie, ID, Theatre..."
            className="w-full pl-10 pr-4 py-2 bg-[#0b0f17] border border-slate-800 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:border-amber-500/60 transition-colors"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto">
          {['All', 'Paid', 'Confirmed', 'Cancelled'].map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                statusFilter === tab
                  ? 'bg-amber-500/20 border border-amber-500/40 text-amber-400 shadow-sm'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <div className="bg-[#151c28] border border-slate-800 rounded-3xl p-12 text-center space-y-4 shadow-xl">
          <div className="w-16 h-16 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mx-auto">
            <Ticket className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white">No Bookings Found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            {searchQuery
              ? `No reservations match your search query "${searchQuery}".`
              : 'You have not booked any movie tickets yet.'}
          </p>
          <button
            onClick={() => navigate('/movies')}
            className="px-5 py-2.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold hover:bg-amber-500/20 cursor-pointer inline-flex items-center gap-2"
          >
            <Film className="w-4 h-4" />
            <span>Browse Now Playing Movies</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredBookings.map((booking) => {
            const isCancelled = booking.status === 'Cancelled';
            const isPaid = booking.paymentStatus === 'Paid';

            return (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-[#151c28] border rounded-3xl p-6 shadow-xl space-y-5 transition-all hover:border-amber-500/30 ${
                  isCancelled ? 'border-rose-500/20 opacity-75' : 'border-slate-800'
                }`}
              >
                {/* Top Badge & ID Row */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-black text-amber-400 bg-slate-900 px-3 py-1 rounded-xl border border-slate-800">
                    ID: {booking.id}
                  </span>

                  <div className="flex items-center gap-2">
                    {isCancelled ? (
                      <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 font-extrabold text-[10px] border border-rose-500/30 flex items-center gap-1">
                        <XCircle className="w-3 h-3" />
                        CANCELLED
                      </span>
                    ) : isPaid ? (
                      <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold text-[10px] border border-emerald-500/30 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        PAID & CONFIRMED
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-extrabold text-[10px] border border-amber-500/30 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        CONFIRMED (UNPAID)
                      </span>
                    )}
                  </div>
                </div>

                {/* Movie & Showtime Info */}
                <div className="flex items-start gap-4">
                  <img
                    src={booking.moviePoster}
                    alt={booking.movie}
                    className="w-20 h-28 rounded-2xl object-cover border border-slate-700 shadow-md flex-shrink-0"
                  />
                  <div className="space-y-2 flex-1">
                    <h3 className="text-xl font-black text-white">{booking.movie}</h3>

                    <div className="space-y-1 text-xs text-slate-300">
                      <p className="flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-amber-400" />
                        <span>{booking.theatre} ({booking.city})</span>
                      </p>
                      <p className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        <span>{booking.showDate} • {booking.showTime}</span>
                      </p>
                    </div>

                    <div className="pt-1 flex flex-wrap gap-1">
                      {booking.seats.map((seat) => (
                        <span
                          key={seat}
                          className="px-2.5 py-0.5 rounded-md bg-amber-500/10 text-amber-300 font-mono text-[10px] font-bold border border-amber-500/20"
                        >
                          Seat {seat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Actions & Price Row */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Total Price</p>
                    <p className="text-lg font-black text-amber-400">${booking.totalPrice?.toFixed(2)}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    {!isCancelled && !isPaid && (
                      <button
                        onClick={() => navigate('/payment', { state: { booking } })}
                        className="px-3.5 py-2 rounded-xl bg-emerald-500 text-slate-950 font-extrabold text-xs hover:bg-emerald-400 transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <CreditCard className="w-3.5 h-3.5" />
                        <span>Pay Now</span>
                      </button>
                    )}

                    {!isCancelled && (
                      <button
                        onClick={() => setSelectedTicket(booking)}
                        className="px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold text-xs hover:bg-amber-500/20 transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <QrCode className="w-3.5 h-3.5" />
                        <span>E-Ticket</span>
                      </button>
                    )}

                    {!isCancelled && (
                      <button
                        onClick={() => setCancelModalBooking(booking)}
                        className="px-3 py-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 font-semibold text-xs hover:bg-rose-500/20 transition-colors cursor-pointer"
                        title="Cancel Booking"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* VIEW E-TICKET POPUP MODAL */}
      <AnimatePresence>
        {selectedTicket && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#151c28] border border-slate-700 rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedTicket(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-center space-y-1">
                <span className="px-3 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-extrabold border border-amber-500/30">
                  DIGITAL PASS
                </span>
                <h3 className="text-2xl font-black text-white">{selectedTicket.movie}</h3>
                <p className="text-xs text-slate-400">{selectedTicket.theatre}</p>
              </div>

              {/* QR Code Container */}
              <div className="p-6 bg-white rounded-2xl text-center space-y-2 border-2 border-amber-400 shadow-inner max-w-xs mx-auto">
                <QrCode className="w-36 h-36 text-slate-950 mx-auto" />
                <p className="font-mono text-xs font-black text-slate-950 tracking-wider">
                  {selectedTicket.id}
                </p>
                <p className="text-[10px] text-slate-500">Admit {selectedTicket.seats.length} Persons</p>
              </div>

              {/* Key Details */}
              <div className="grid grid-cols-2 gap-3 text-xs bg-slate-900 p-4 rounded-2xl border border-slate-800">
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold">Date & Time</p>
                  <p className="font-bold text-white">{selectedTicket.showDate}</p>
                  <p className="text-slate-400">{selectedTicket.showTime}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold">Seats Reserved</p>
                  <p className="font-mono font-bold text-amber-400">
                    {selectedTicket.seats.join(', ')}
                  </p>
                  <p className="text-slate-400">{selectedTicket.city}</p>
                </div>
              </div>

              {/* Print Action */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => window.print()}
                  className="flex-1 py-3 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Ticket</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CANCEL BOOKING CONFIRMATION MODAL */}
      <AnimatePresence>
        {cancelModalBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#151c28] border border-rose-500/30 rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl"
            >
              <div className="flex items-center gap-3 text-rose-400">
                <AlertTriangle className="w-8 h-8" />
                <div>
                  <h3 className="text-lg font-bold text-white">Cancel Booking {cancelModalBooking.id}?</h3>
                  <p className="text-xs text-slate-400">This action will release your reserved seats.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1">
                <p><strong>Movie:</strong> {cancelModalBooking.movie}</p>
                <p><strong>Seats:</strong> {cancelModalBooking.seats.join(', ')}</p>
                <p><strong>Refund Amount:</strong> ${cancelModalBooking.totalPrice?.toFixed(2)} (Full Refund)</p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setCancelModalBooking(null)}
                  className="flex-1 py-3 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-800 cursor-pointer"
                >
                  Keep Booking
                </button>
                <button
                  onClick={handleConfirmCancel}
                  className="flex-1 py-3 rounded-full bg-rose-500 text-white text-xs font-bold hover:bg-rose-600 cursor-pointer shadow-lg shadow-rose-500/20"
                >
                  Yes, Cancel Reservation
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BookingHistory;
