import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Play, Calendar, Bookmark } from 'lucide-react';

const UpcomingMovieCard = ({ movie, onWatchTrailer, index = 0 }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
      whileHover={{ y: -6 }}
      className="bg-[#151c28] border border-slate-800 rounded-3xl overflow-hidden shadow-xl hover:border-amber-500/40 transition-all duration-300 flex flex-col group cursor-pointer"
      onClick={() => navigate(`/movies/${movie.id}`)}
    >
      {/* Poster Image Hero */}
      <div className="relative h-48 overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.4 }}
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#151c28] via-[#151c28]/30 to-transparent pointer-events-none" />
        
        {/* Rating Badge */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/80 border border-slate-700/60 text-amber-400 text-xs font-bold flex items-center gap-1 backdrop-blur-md">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{movie.rating}</span>
        </div>

        {/* Bookmark Action */}
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-3 right-3 p-2 rounded-full bg-slate-950/80 border border-slate-700/60 text-slate-400 hover:text-amber-400 transition-colors backdrop-blur-md cursor-pointer"
        >
          <Bookmark className="w-4 h-4" />
        </motion.button>

        {/* Release Tag */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-[11px] font-semibold text-slate-300 bg-slate-900/80 px-2.5 py-1 rounded-full border border-slate-800">
          <Calendar className="w-3 h-3 text-amber-400" />
          <span>{movie.releaseDate}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h4 className="text-lg font-extrabold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
            {movie.title}
          </h4>
          <p className="text-xs text-amber-400 font-medium mt-0.5">{movie.genre}</p>
          <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
            {movie.description}
          </p>
        </div>

        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={(e) => {
              e.stopPropagation();
              onWatchTrailer(movie);
            }}
            className="flex-1 py-2 px-3 rounded-full bg-slate-900 border border-slate-800 hover:border-amber-500/40 text-slate-300 hover:text-amber-400 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Trailer</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/movies/${movie.id}`);
            }}
            className="flex-1 py-2 px-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 text-xs font-extrabold flex items-center justify-center transition-all shadow-md shadow-amber-500/10 cursor-pointer"
          >
            Pre-Book
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default UpcomingMovieCard;
