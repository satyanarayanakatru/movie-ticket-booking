import React from 'react';
import { motion } from 'framer-motion';

const QuickActionCard = ({ title, description, icon: Icon, onClick, badge, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.2 + index * 0.08 }}
      whileHover={{ y: -4, scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="dash-action-card cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-3">
        <motion.div
          whileHover={{ rotate: 12, scale: 1.1 }}
          className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center transition-transform"
        >
          <Icon className="w-5 h-5 text-amber-400" />
        </motion.div>
        {badge && (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
            {badge}
          </span>
        )}
      </div>
      <h3 className="text-base font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">
        {title}
      </h3>
      <p className="text-xs text-slate-400 leading-relaxed">{description}</p>
    </motion.div>
  );
};

export default QuickActionCard;
