import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { fetchMoviesFromAPI } from '../services/movieApi';
import SkeletonLoader from '../components/ui/SkeletonLoader';

import {
  Film,
  Building2,
  Ticket,
  Clock,
  CalendarCheck,
  DollarSign,
  PlusCircle,
  Search,
  Compass,
  History,
  Sparkles,
  Flame,
  ArrowUpRight
} from 'lucide-react';

import StatCard from '../components/dashboard/StatCard';
import QuickActionCard from '../components/dashboard/QuickActionCard';
import UpcomingMovieCard from '../components/dashboard/UpcomingMovieCard';
import RecentBookingsTable from '../components/dashboard/RecentBookingsTable';
import RevenueSummaryCard from '../components/dashboard/RevenueSummaryCard';
import TrailerModal from '../components/dashboard/TrailerModal';

import {
  mockDashboardStats,
  mockRecentBookings,
  mockRevenueBreakdown
} from '../data/mockDashboardData';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [selectedMovieForTrailer, setSelectedMovieForTrailer] = useState(null);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [apiMovies, setApiMovies] = useState([]);
  const [loadingMovies, setLoadingMovies] = useState(true);

  // Fetch TMDB API movies on component mount
  useEffect(() => {
    const getMovies = async () => {
      setLoadingMovies(true);
      const data = await fetchMoviesFromAPI();
      setApiMovies(data);
      setLoadingMovies(false);
    };
    getMovies();
  }, []);

  const handleOpenTrailer = (movie) => {
    setSelectedMovieForTrailer(movie);
    setIsTrailerOpen(true);
  };

  const handleCloseTrailer = () => {
    setIsTrailerOpen(false);
    setSelectedMovieForTrailer(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-8">
      {/* 1. Header Banner & Welcome */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-500/10 via-[#151c28] to-[#151c28] border border-amber-500/20 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden">
        <div className="relative z-10 flex items-center gap-4">
          <img
            src={currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
            alt={currentUser?.name}
            className="w-14 h-14 rounded-2xl object-cover border-2 border-amber-500 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-extrabold uppercase tracking-wider border border-amber-500/30">
                Dashboard Overview
              </span>
              <span className="text-xs text-slate-400 font-medium hidden sm:inline">Module 2 Active</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white mt-1">
              Welcome back, {currentUser?.name || 'User'}! 👋
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Here is what is happening across your movie booking platform today.
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate('/movies')}
          className="relative z-10 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Book Tickets Now</span>
        </button>
      </div>

      {/* 2. Top Metric Cards (Stats Grid: Movies, Theatres, Bookings, Shows, Today's Bookings) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Total Movies"
          value={loadingMovies ? '...' : apiMovies.length || 20}
          subtext="TMDB API Live"
          icon={Film}
          trend="Live API"
          color="#f5a623"
        />
        <StatCard
          title="Total Theatres"
          value={mockDashboardStats.totalTheatres}
          subtext="Across 5 cities"
          icon={Building2}
          trend="16 active"
          color="#38bdf8"
        />
        <StatCard
          title="Total Bookings"
          value={mockDashboardStats.totalBookings.toLocaleString()}
          subtext="Lifetime tickets"
          icon={Ticket}
          trend="+18.4%"
          color="#10b981"
        />
        <StatCard
          title="Available Shows"
          value={mockDashboardStats.availableShows}
          subtext="Scheduled today"
          icon={Clock}
          trend="184 shows"
          color="#c084fc"
        />
        <StatCard
          title="Today's Bookings"
          value={mockDashboardStats.todaysBookings}
          subtext="Booked last 24h"
          icon={CalendarCheck}
          trend="+12%"
          color="#f43f5e"
        />
      </div>

      {/* 3. Quick Action Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>Quick Actions</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickActionCard
            title="Book Movie Ticket"
            description="Select seats, theatre, and timing for upcoming shows."
            icon={Ticket}
            onClick={() => navigate('/movies')}
            badge="Popular"
          />
          <QuickActionCard
            title="Explore Movies"
            description="Filter by genre, language, rating & release date."
            icon={Compass}
            onClick={() => navigate('/movies')}
          />
          <QuickActionCard
            title="Search Theatres"
            description="Find screens & available timings near your city."
            icon={Building2}
            onClick={() => navigate('/theatres')}
          />
          <QuickActionCard
            title="My Booking History"
            description="View your past tickets, status & e-tickets."
            icon={History}
            onClick={() => navigate('/bookings')}
          />
        </div>
      </div>

      {/* 4. Revenue Summary & Analytics + Upcoming Movies Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 cols): Revenue Summary Chart */}
        <div className="lg:col-span-2">
          <RevenueSummaryCard
            data={mockRevenueBreakdown}
            totalRevenue={mockDashboardStats.totalRevenue}
            growth={mockDashboardStats.monthlyRevenueGrowth}
          />
        </div>

        {/* Right Column (1 col): Occupancy & Summary Snapshot */}
        <div className="bg-[#151c28] border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-400" />
                <span>Occupancy Rate</span>
              </h3>
              <span className="text-xs font-bold text-amber-400">{mockDashboardStats.seatOccupancyRate}</span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Average seat occupancy across peak weekend and prime time show timings.
            </p>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-300">Prime Shows (7:00 PM - 10:00 PM)</span>
                <span className="text-amber-400">92%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <div className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full" style={{ width: '92%' }} />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-300">Matinee Shows (1:00 PM - 4:00 PM)</span>
                <span className="text-amber-400">65%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <div className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full" style={{ width: '65%' }} />
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 space-y-1">
            <p className="font-bold flex items-center gap-1">
              <ArrowUpRight className="w-4 h-4 text-amber-400" />
              <span>Revenue Growth</span>
            </p>
            <p className="text-[11px] text-slate-400">
              Weekend bookings grew by 18.4% compared to last week.
            </p>
          </div>
        </div>
      </div>

      {/* 5. Upcoming Movies Showcase */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Popular TMDB Movies</h2>
            <p className="text-xs text-slate-400">Live trending movies fetched directly from TMDB API</p>
          </div>
          <button
            onClick={() => navigate('/movies')}
            className="text-xs font-bold text-amber-400 hover:text-amber-300 hover:underline transition-colors cursor-pointer"
          >
            View All Movies →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loadingMovies ? (
            Array.from({ length: 4 }).map((_, idx) => (
              <SkeletonLoader key={idx} type="card" />
            ))
          ) : (
            apiMovies.slice(0, 4).map((movie, index) => (
              <UpcomingMovieCard
                key={movie.id}
                movie={movie}
                index={index}
                onWatchTrailer={handleOpenTrailer}
              />
            ))
          )}
        </div>
      </div>

      {/* 6. Recent Bookings Table */}
      <RecentBookingsTable bookings={mockRecentBookings} />

      {/* Trailer Modal Component */}
      <TrailerModal isOpen={isTrailerOpen} onClose={handleCloseTrailer} movie={selectedMovieForTrailer} />
    </div>
  );
};

export default Dashboard;
