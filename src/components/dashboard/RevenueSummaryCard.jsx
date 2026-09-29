import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp } from 'lucide-react';

const RevenueSummaryCard = ({ data, totalRevenue, growth }) => {
  const maxRevenue = Math.max(...data.map((d) => d.revenue));

  return (
    <div className="bg-[#151c28] border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <motion.div
            whileHover={{ rotate: 15 }}
            className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400"
          >
            <DollarSign className="w-5 h-5" />
          </motion.div>
          <div>
            <h3 className="text-lg font-bold text-white">Weekly Revenue Summary</h3>
            <p className="text-xs text-slate-400">Sales performance & daily trend</p>
          </div>
        </div>
        <motion.span
          whileHover={{ scale: 1.05 }}
          className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold flex items-center gap-1 cursor-pointer"
        >
          <TrendingUp className="w-3.5 h-3.5" />
          {growth}
        </motion.span>
      </div>

      {/* Revenue Stats Big Display */}
      <div className="flex items-baseline gap-3">
        <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          ${totalRevenue.toLocaleString()}
        </span>
        <span className="text-xs text-slate-400">Total generated this week</span>
      </div>

      {/* Daily Revenue Bar Chart Visualizer with Framer Motion Bar Grow Animation */}
      <div className="space-y-3 pt-2">
        <div className="flex items-end justify-between gap-2 h-40 pt-4 px-2 bg-[#0b0f17] border border-slate-800 rounded-2xl">
          {data.map((item, index) => {
            const heightPercent = Math.round((item.revenue / maxRevenue) * 100);
            return (
              <div key={item.day} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                <div className="text-[10px] font-bold text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  ${item.revenue}
                </div>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${heightPercent}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: 'easeOut' }}
                  className="w-full max-w-[28px] rounded-t-lg bg-gradient-to-t from-amber-600 to-yellow-400 group-hover:from-amber-400 group-hover:to-yellow-300 transition-all duration-300 shadow-md shadow-amber-500/10"
                />
                <span className="text-[11px] font-semibold text-slate-400 group-hover:text-white transition-colors pb-2">
                  {item.day}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RevenueSummaryCard;
