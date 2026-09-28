import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import Navbar from './Navbar';
import { Home, Heart, LayoutGrid, User, Film, Ticket } from 'lucide-react';

const Layout = () => {
  const navItems = [
    { label: 'Home', icon: Home, path: '/dashboard' },
    { label: 'Movies', icon: Film, path: '/movies' },
    { label: 'Bookings', icon: Ticket, path: '/bookings' },
    { label: 'Profile', icon: User, path: '/profile' }
  ];

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Page Area */}
      <main className="flex-1 pb-24 sm:pb-8">
        <Outlet />
      </main>

      {/* Bottom Floating Navigation Bar (Matches mobile & desktop style in reference UI) */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-[#151c28]/95 border border-slate-800/80 shadow-2xl backdrop-blur-xl flex items-center gap-2 sm:gap-6">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`
              }
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default Layout;
