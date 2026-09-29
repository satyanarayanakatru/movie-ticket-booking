import React from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Search, LogOut, Film } from 'lucide-react';

const Navbar = () => {
  const { currentUser, logout } = useAuth();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="bg-[#151c28]/90 border-b border-slate-800/80 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4"
    >
      {/* Brand & Greeting */}
      <div className="flex items-center gap-3">
        <motion.div
          whileHover={{ rotate: 12, scale: 1.1 }}
          className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-lg shadow-sm cursor-pointer"
        >
          <Film className="w-5 h-5" />
        </motion.div>
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
            <span>Welcome</span>
            <span className="text-white font-semibold">{currentUser?.name || 'User'}</span>
            <span>👋</span>
          </div>
          <h2 className="text-sm sm:text-base font-bold text-slate-100 hidden sm:block">
            What movie are we going to see today?
          </h2>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="flex-1 max-w-md hidden md:block">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search movies, theatres, genres..."
            className="w-full pl-10 pr-4 py-2 bg-[#0b0f17] border border-slate-800 rounded-full text-slate-100 placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/20 transition-all duration-200"
          />
        </div>
      </div>

      {/* User Actions & Logout */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 pr-3 border-r border-slate-800">
          <motion.img
            whileHover={{ scale: 1.1 }}
            src={currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
            alt={currentUser?.name}
            className="w-9 h-9 rounded-full object-cover border-2 border-amber-500/40 cursor-pointer"
          />
          <div className="hidden lg:block text-left">
            <p className="text-xs font-bold text-slate-100 leading-tight">{currentUser?.name}</p>
            <p className="text-[10px] text-slate-400 leading-tight">{currentUser?.email}</p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={logout}
          title="Logout"
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-400 hover:border-amber-500/30 hover:bg-slate-800/80 transition-all duration-200 cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Logout</span>
        </motion.button>
      </div>
    </motion.header>
  );
};

export default Navbar;
