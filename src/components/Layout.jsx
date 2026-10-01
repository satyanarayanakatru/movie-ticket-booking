import React from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import { Home, Film, Building2, Ticket, BarChart3 } from "lucide-react";

const Layout = () => {
  const location = useLocation();

  const navItems = [
    { label: "Dashboard", icon: Home, path: "/dashboard" },
    { label: "Movies", icon: Film, path: "/movies" },
    { label: "Theatres", icon: Building2, path: "/theatres" },
    { label: "Bookings", icon: Ticket, path: "/bookings" },
    { label: "Reports", icon: BarChart3, path: "/reports" },
  ];

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Page Area with AnimatePresence Page Transitions */}
      <main className="flex-1 pb-24 sm:pb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Perfectly Centered Bottom Floating Animated Navigation Bar */}
      <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center items-center pointer-events-none px-4">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
          className="pointer-events-auto px-4 py-2.5 rounded-full bg-[#151c28]/95 border border-slate-800/80 shadow-2xl backdrop-blur-xl flex items-center gap-2 sm:gap-6"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  `relative flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold transition-colors ${
                    isActive
                      ? "text-slate-950 font-extrabold"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.div
                        layoutId="activeNavPill"
                        className="absolute inset-0 bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full shadow-md shadow-amber-500/20"
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      <span className="hidden sm:inline">{item.label}</span>
                    </span>
                  </>
                )}
              </NavLink>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default Layout;
