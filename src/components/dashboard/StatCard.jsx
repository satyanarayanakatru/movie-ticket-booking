import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, subtext, icon: Icon, trend, color = '#f5a623', index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="dash-stat-card cursor-pointer"
    >
      <div className="dash-stat-header">
        <span className="dash-stat-title">{title}</span>
        <motion.div
          whileHover={{ rotate: 15, scale: 1.1 }}
          className="dash-stat-icon-box"
          style={{ color, backgroundColor: `${color}18`, borderColor: `${color}35` }}
        >
          <Icon className="w-5 h-5" />
        </motion.div>
      </div>
      <div className="dash-stat-value">{value}</div>
      <div className="dash-stat-footer">
        {trend && <span className="dash-stat-trend">{trend}</span>}
        <span className="dash-stat-subtext">{subtext}</span>
      </div>
    </motion.div>
  );
};

export default StatCard;
