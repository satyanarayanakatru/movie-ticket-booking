import React from 'react';
import { Film, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

const EmptyState = ({ title = 'No Movies Found', description = 'Try adjusting your search query or filters to find what you are looking for.', onReset }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-12 rounded-3xl bg-[#151c28] border border-slate-800 text-center space-y-4 max-w-lg mx-auto shadow-2xl my-8"
    >
      <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/5">
        <Film className="w-8 h-8" />
      </div>

      <h3 className="text-xl font-extrabold text-white">{title}</h3>
      <p className="text-xs text-slate-400 leading-relaxed">{description}</p>

      {onReset && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onReset}
          className="px-5 py-2.5 rounded-full bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-2 mx-auto cursor-pointer shadow-md shadow-amber-500/10"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset Filters</span>
        </motion.button>
      )}
    </motion.div>
  );
};

export default EmptyState;
