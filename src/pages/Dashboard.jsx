import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Star, Flame, Calendar, Clock, MapPin, ShieldCheck, Film, Bookmark, Sparkles, LogOut } from 'lucide-react';

const Dashboard = () => {
  const { currentUser, logout } = useAuth();

  // Reference UI mockup data matching "Uncharted" showcase
  const featuredMovie = {
    title: 'Uncharted',
    rating: 4.3,
    director: 'Ruben Fleischer',
    writers: 'Rafe Judkins',
    synopsis:
      'Street-smart Nathan Drake is recruited by seasoned treasure hunter Victor "Sully" Sullivan to recover a fortune amassed by Ferdinand Magellan, and lost 500 years ago by the House of Moncada.',
    poster:
      'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80',
    cast: [
      { name: 'Tom Holland', role: 'Nate', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80' },
      { name: 'Mark Wahlberg', role: 'Victor Sullivan', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80' },
      { name: 'Sophia Taylor', role: 'Chloe Fraser', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80' }
    ]
  };

  const categories = ['😱 Horror', '🤠 Action', '🎭 Drama', '🚀 Sci-Fi', '🥰 Romance'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-8">
      {/* Auth Banner & Greeting */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-900 border border-amber-500/20 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
              alt={currentUser?.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-500 shadow-md"
            />
            <div className="absolute -bottom-1 -right-1 bg-amber-500 text-slate-950 p-1 rounded-full text-xs" title="Authenticated User">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-semibold border border-amber-500/30">
                Module 1 Active
              </span>
              <span className="text-xs text-slate-400">Local Storage Synced</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white mt-1">
              Welcome Back, {currentUser?.name}! 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Logged in as <strong className="text-amber-300">{currentUser?.email}</strong>
            </p>
          </div>
        </div>

        <button
          onClick={logout}
          className="px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/10"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Category Pills (Matching Reference Image) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-400" />
            <span>Popular Genres</span>
          </h3>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat, i) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                i === 1
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                  : 'bg-[#151c28] text-slate-300 border border-slate-800 hover:border-amber-500/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Showcase Grid (Matching Reference UI Theme) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Movie Details Hero (Center Card from reference image) */}
        <div className="lg:col-span-2 bg-[#151c28] border border-slate-800 rounded-3xl p-6 relative overflow-hidden shadow-2xl space-y-6">
          <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden group">
            <img
              src={featuredMovie.poster}
              alt={featuredMovie.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#151c28] via-[#151c28]/40 to-transparent" />
            
            <button className="absolute top-4 right-4 p-3 rounded-full bg-slate-900/80 border border-slate-700/60 text-amber-400 hover:scale-110 transition-transform">
              <Bookmark className="w-5 h-5 fill-amber-400" />
            </button>

            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
              <div>
                <h2 className="text-3xl font-extrabold text-white tracking-wide">{featuredMovie.title}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-bold text-amber-400">{featuredMovie.rating}</span>
                  <span className="text-slate-400 text-xs">• Action / Adventure</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {featuredMovie.synopsis}
            </p>

            <div className="flex items-center gap-4 text-xs text-slate-400 pt-2 border-t border-slate-800">
              <span><strong>Director:</strong> {featuredMovie.director}</span>
              <span>•</span>
              <span><strong>Writers:</strong> {featuredMovie.writers}</span>
            </div>

            {/* Starring Cast */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Starring</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {featuredMovie.cast.map((actor) => (
                  <div key={actor.name} className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                    <img src={actor.img} alt={actor.name} className="w-8 h-8 rounded-full object-cover" />
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-slate-200 truncate">{actor.name}</p>
                      <p className="text-[10px] text-slate-400 truncate">{actor.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-extrabold text-sm tracking-wide shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-yellow-400 transition-all duration-200 cursor-pointer">
              Reservation
            </button>
          </div>
        </div>

        {/* Seat Selection Preview Card (Right Card from reference image) */}
        <div className="bg-[#151c28] border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-lg font-bold text-white">Uncharted</h3>
              <p className="text-xs text-slate-400">Session Selection</p>
            </div>
            <Sparkles className="w-5 h-5 text-amber-400" />
          </div>

          {/* Date Selector */}
          <div className="grid grid-cols-5 gap-1.5">
            {[
              { day: 'Mar', num: 24 },
              { day: 'Mar', num: 25 },
              { day: 'Mar', num: 26, active: true },
              { day: 'Mar', num: 27 },
              { day: 'Mar', num: 28 }
            ].map((d) => (
              <div
                key={d.num}
                className={`p-2 rounded-xl text-center cursor-pointer transition-all ${
                  d.active
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                    : 'bg-slate-900 text-slate-400 border border-slate-800 hover:border-amber-500/30'
                }`}
              >
                <div className="text-[10px] uppercase">{d.day}</div>
                <div className="text-sm font-extrabold">{d.num}</div>
              </div>
            ))}
          </div>

          {/* Time Slots */}
          <div className="flex items-center justify-between gap-1 overflow-x-auto py-1">
            {['15:30', '17:30', '19:30', '21:30', '23:30'].map((time, idx) => (
              <span
                key={time}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer whitespace-nowrap ${
                  idx === 2
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}
              >
                {time}
              </span>
            ))}
          </div>

          {/* Screen Curve */}
          <div className="text-center pt-2">
            <div className="h-1 w-3/4 mx-auto bg-gradient-to-r from-transparent via-amber-400 to-transparent rounded-full shadow-[0_0_12px_#f59e0b]" />
            <p className="text-[10px] tracking-widest text-slate-500 uppercase mt-1">SCREEN</p>
          </div>

          {/* Mini Seat Layout */}
          <div className="space-y-2 py-2">
            {[6, 8, 8, 8, 8].map((seatsCount, rowIdx) => (
              <div key={rowIdx} className="flex justify-center items-center gap-1.5">
                {Array.from({ length: seatsCount }).map((_, colIdx) => {
                  const isSelected = rowIdx === 2 && colIdx === 2;
                  const isReserved = (rowIdx === 1 && colIdx === 3) || (rowIdx === 3 && colIdx === 1);
                  return (
                    <div
                      key={colIdx}
                      className={`w-4 h-4 rounded-sm transition-all ${
                        isSelected
                          ? 'bg-amber-500 shadow-sm shadow-amber-500/50'
                          : isReserved
                          ? 'bg-amber-500/30'
                          : 'bg-slate-800 hover:bg-slate-700'
                      }`}
                    />
                  );
                })}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-4 text-[10px] text-slate-400 pt-2 border-t border-slate-800">
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-slate-800" />
              <span>Available</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-amber-500/30" />
              <span>Reserved</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-amber-500" />
              <span>Selected</span>
            </div>
          </div>

          {/* Buy Ticket Button */}
          <button className="w-full py-3 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-extrabold text-sm tracking-wide shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-yellow-400 transition-all duration-200 cursor-pointer flex items-center justify-between px-6">
            <span>Buy ticket</span>
            <span className="font-black text-slate-900 border-l border-slate-900/20 pl-4">$45</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
