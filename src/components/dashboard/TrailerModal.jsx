import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Film } from 'lucide-react';

const TrailerModal = ({ isOpen, onClose, movie }) => {
  return (
    <AnimatePresence>
      {isOpen && movie && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="bg-[#151c28] border border-slate-800 rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-4 relative"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Film className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold text-white">{movie.title} - Official Trailer</h3>
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

            {/* Video Player Placeholder */}
            <div className="relative aspect-video rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden flex flex-col items-center justify-center group">
              <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover opacity-40 blur-xs" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent flex flex-col items-center justify-center p-6 text-center space-y-3">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-16 h-16 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/30 cursor-pointer"
                >
                  <Play className="w-8 h-8 fill-slate-950 ml-1" />
                </motion.div>
                <div>
                  <p className="text-white font-bold text-base">{movie.title}</p>
                  <p className="text-xs text-slate-400 mt-1">Playing Official HD Teaser Trailer</p>
                </div>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={movie.trailerUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold hover:bg-amber-500/30 transition-colors inline-block"
                >
                  Watch on YouTube
                </motion.a>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
              <span><strong>Director:</strong> {movie.director}</span>
              <span><strong>Rating:</strong> ⭐ {movie.rating} / 5</span>
              <span><strong>Release:</strong> {movie.releaseDate}</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TrailerModal;
