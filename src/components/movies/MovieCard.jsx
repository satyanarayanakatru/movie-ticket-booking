import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Play, Calendar, Clock, Globe, ArrowRight } from 'lucide-react';

const MovieCard = ({ movie, onWatchTrailer, index = 0 }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -6 }}
      className="bg-[#151c28] border border-slate-800 rounded-3xl overflow-hidden shadow-xl hover:border-amber-500/40 transition-all duration-300 flex flex-col group"
    >
      {/* Poster Container */}
      <div className="relative h-56 overflow-hidden cursor-pointer" onClick={() => navigate(`/movies/${movie.id}`)}>
        <motion.img
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.4 }}
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#151c28] via-[#151c28]/20 to-transparent pointer-events-none" />

        {/* Rating Badge */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/80 border border-slate-700/60 text-amber-400 text-xs font-extrabold flex items-center gap-1 backdrop-blur-md">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{movie.rating}</span>
        </div>

        {/* Language Tag */}
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/80 border border-slate-700/60 text-slate-300 text-[10px] font-bold flex items-center gap-1 backdrop-blur-md">
          <Globe className="w-3 h-3 text-amber-400" />
          <span>{movie.language}</span>
        </div>

        {/* Duration & Release Tag */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-semibold text-slate-300">
          <span className="bg-slate-900/80 px-2.5 py-1 rounded-full border border-slate-800 flex items-center gap-1">
            <Clock className="w-3 h-3 text-amber-400" />
            {movie.duration}
          </span>
          <span className="bg-slate-900/80 px-2.5 py-1 rounded-full border border-slate-800 flex items-center gap-1">
            <Calendar className="w-3 h-3 text-amber-400" />
            {movie.releaseDate}
          </span>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <Link to={`/movies/${movie.id}`}>
            <h3 className="text-lg font-extrabold text-white hover:text-amber-400 transition-colors line-clamp-1">
              {movie.title}
            </h3>
          </Link>

          <div className="flex items-center gap-2 mt-1">
            <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-bold">
              {movie.genre}
            </span>
          </div>

          <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
            {movie.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onWatchTrailer(movie)}
            className="py-2 px-3 rounded-full bg-slate-900 border border-slate-800 hover:border-amber-500/40 text-slate-300 hover:text-amber-400 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer flex-1"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Trailer</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate(`/movies/${movie.id}`)}
            className="py-2 px-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 text-xs font-extrabold flex items-center justify-center gap-1 transition-all shadow-md shadow-amber-500/10 cursor-pointer flex-1"
          >
            <span>Book</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieCard;
