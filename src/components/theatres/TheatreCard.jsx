import React from 'react';
import { motion } from 'framer-motion';
import { Building2, MapPin, Phone, Film, Sparkles, Star, ArrowRight } from 'lucide-react';

const TheatreCard = ({ theatre, onViewDetails, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="bg-[#151c28] border border-slate-800 rounded-3xl overflow-hidden shadow-xl hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between group"
    >
      {/* Top Image Banner */}
      <div className="relative h-44 overflow-hidden cursor-pointer" onClick={() => onViewDetails(theatre)}>
        <motion.img
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.4 }}
          src={theatre.image}
          alt={theatre.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#151c28] via-[#151c28]/40 to-transparent" />

        {/* City Badge */}
        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 border border-slate-700/60 text-amber-400 text-xs font-extrabold backdrop-blur-md">
          {theatre.city}
        </div>

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/80 border border-slate-700/60 text-amber-400 text-xs font-extrabold flex items-center gap-1 backdrop-blur-md">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{theatre.rating}</span>
        </div>

        {/* Screens Count Tag */}
        <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-slate-900/90 text-slate-200 border border-slate-800 text-[11px] font-bold">
          {theatre.screens} Screens Available
        </div>
      </div>

      {/* Content Info */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3
            onClick={() => onViewDetails(theatre)}
            className="text-lg font-extrabold text-white group-hover:text-amber-400 transition-colors cursor-pointer line-clamp-1"
          >
            {theatre.name}
          </h3>

          <p className="text-xs text-slate-400 flex items-start gap-1.5 leading-relaxed line-clamp-2">
            <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <span>{theatre.address}</span>
          </p>

          <p className="text-xs text-slate-400 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            <span>{theatre.phone}</span>
          </p>

          {/* Amenities Chips */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {theatre.amenities.slice(0, 3).map((amenity) => (
              <span
                key={amenity}
                className="px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-[10px] font-semibold flex items-center gap-1"
              >
                <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                {amenity}
              </span>
            ))}
          </div>
        </div>

        {/* Available Shows Preview */}
        <div className="pt-3 border-t border-slate-800/80 space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
            <Film className="w-3 h-3 text-amber-400" />
            <span>Now Showing ({theatre.shows.length} Movies)</span>
          </p>

          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {theatre.shows.map((show) => (
              <span
                key={show.movieId}
                className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-semibold text-amber-300 whitespace-nowrap"
              >
                {show.title}
              </span>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onViewDetails(theatre)}
            className="w-full py-2.5 px-4 rounded-full bg-slate-900 border border-slate-800 hover:border-amber-500/40 text-amber-400 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
          >
            <span>View Details & Show Timings</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default TheatreCard;
