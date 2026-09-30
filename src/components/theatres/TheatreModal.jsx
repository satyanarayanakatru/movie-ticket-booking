import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Building2,
  MapPin,
  Phone,
  Mail,
  Film,
  Clock,
  Tv,
  Sparkles,
  Ticket,
  Star
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TheatreModal = ({ isOpen, onClose, theatre }) => {
  const navigate = useNavigate();

  if (!isOpen || !theatre) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="bg-[#151c28] border border-slate-800 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-start justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold border border-amber-500/30">
                    {theatre.city}
                  </span>
                  <span className="text-xs text-amber-400 font-bold flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    {theatre.rating}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                  {theatre.name}
                </h2>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.15, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Location & Contact Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs">
            <div className="space-y-1.5">
              <p className="font-bold text-slate-300 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Address</span>
              </p>
              <p className="text-slate-400 leading-relaxed pl-5.5">{theatre.address}</p>
            </div>

            <div className="space-y-1.5">
              <p className="font-bold text-slate-300 flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Contact Info</span>
              </p>
              <p className="text-slate-400 pl-5.5">{theatre.phone}</p>
              <p className="text-slate-400 pl-5.5">{theatre.email}</p>
            </div>
          </div>

          {/* Screens & Amenities */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Screens & Amenities ({theatre.screens} Screens)
            </h4>
            <div className="flex flex-wrap gap-2">
              {theatre.amenities.map((amenity) => (
                <span
                  key={amenity}
                  className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold flex items-center gap-1.5"
                >
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  {amenity}
                </span>
              ))}
            </div>
          </div>

          {/* Available Movies & Show Timings */}
          <div className="space-y-4 pt-2">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Film className="w-4 h-4 text-amber-400" />
              <span>Now Showing & Available Show Timings</span>
            </h4>

            <div className="space-y-4">
              {theatre.shows.map((show) => (
                <div
                  key={show.movieId}
                  className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={show.poster}
                      alt={show.title}
                      className="w-12 h-16 rounded-xl object-cover border border-slate-700"
                    />
                    <div>
                      <h5 className="text-base font-bold text-white">{show.title}</h5>
                      <span className="text-xs text-amber-400 font-medium">{show.genre}</span>
                    </div>
                  </div>

                  {/* Timings Pills */}
                  <div className="flex flex-wrap items-center gap-2">
                    {show.timings.map((t, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          onClose();
                          navigate('/movies');
                        }}
                        className="px-3 py-1.5 rounded-xl bg-[#151c28] border border-slate-700 hover:border-amber-500 text-xs font-semibold text-slate-200 hover:text-amber-400 flex flex-col items-center cursor-pointer transition-all"
                      >
                        <span>{t.time}</span>
                        <span className="text-[9px] text-slate-400">{t.screen}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                onClose();
                navigate('/movies');
              }}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-extrabold text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/10"
            >
              <Ticket className="w-4 h-4" />
              <span>Select Movie & Book Seats</span>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TheatreModal;
