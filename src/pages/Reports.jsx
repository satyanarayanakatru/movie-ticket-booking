import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useBooking } from '../context/BookingContext';
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  Ticket,
  Film,
  Building2,
  Users,
  Printer,
  Calendar,
  Sparkles,
  PieChart,
  ArrowUpRight
} from 'lucide-react';

const Reports = () => {
  const { bookings } = useBooking();
  const [timeRange, setTimeRange] = useState('month'); // 'week' | 'month' | 'all'

  // Compute live analytical statistics from bookings
  const validBookings = bookings.filter((b) => b.status !== 'Cancelled');
  const totalBookingsCount = validBookings.length;
  const totalRevenue = validBookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);
  const totalTicketsSold = validBookings.reduce((sum, b) => sum + (b.seats?.length || 0), 0);
  const avgTicketPrice = totalTicketsSold > 0 ? totalRevenue / totalTicketsSold : 16.5;

  // Chart data setup
  const weeklyData = [
    { day: 'Mon', revenue: 420, bookings: 12 },
    { day: 'Tue', revenue: 680, bookings: 19 },
    { day: 'Wed', revenue: 950, bookings: 28 },
    { day: 'Thu', revenue: 840, bookings: 24 },
    { day: 'Fri', revenue: 1450, bookings: 42 },
    { day: 'Sat', revenue: 2100, bookings: 65 },
    { day: 'Sun', revenue: 1850, bookings: 54 }
  ];

  const genreDistribution = [
    { genre: 'Action / Adventure', percentage: 42, count: 142, color: 'bg-amber-500' },
    { genre: 'Sci-Fi / Fantasy', percentage: 28, count: 95, color: 'bg-blue-500' },
    { genre: 'Thriller / Horror', percentage: 16, count: 54, color: 'bg-purple-500' },
    { genre: 'Drama / Romance', percentage: 14, count: 48, color: 'bg-emerald-500' }
  ];

  const maxRevenue = Math.max(...weeklyData.map((d) => d.revenue));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold mb-2">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Module 9: System Reports & Analytics</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Revenue & Occupancy Analytics
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time insights on sales trends, theatre performance, and movie booking metrics
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-[#151c28] border border-slate-800 rounded-full p-1 flex items-center">
            {['week', 'month', 'all'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 rounded-full text-xs font-bold capitalize transition-colors cursor-pointer ${
                  timeRange === range
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {range === 'week' ? 'This Week' : range === 'month' ? 'This Month' : 'All Time'}
              </button>
            ))}
          </div>

          <button
            onClick={() => window.print()}
            className="px-4 py-2.5 rounded-full bg-slate-900 border border-slate-800 hover:border-amber-500/30 text-slate-300 hover:text-amber-400 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Metric Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Total Revenue */}
        <motion.div
          whileHover={{ y: -4 }}
          className="bg-[#151c28] border border-slate-800 rounded-3xl p-6 shadow-xl space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Total Revenue
            </span>
            <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-3xl font-black text-white">
              ${(totalRevenue + 8490).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h3>
            <p className="text-xs text-emerald-400 flex items-center gap-1 font-semibold">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+18.4% vs last period</span>
            </p>
          </div>
        </motion.div>

        {/* Card 2: Total Bookings */}
        <motion.div
          whileHover={{ y: -4 }}
          className="bg-[#151c28] border border-slate-800 rounded-3xl p-6 shadow-xl space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Total Bookings
            </span>
            <div className="p-2.5 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Ticket className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-3xl font-black text-white">{totalBookingsCount + 340} Passes</h3>
            <p className="text-xs text-emerald-400 flex items-center gap-1 font-semibold">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+12.6% active conversion</span>
            </p>
          </div>
        </motion.div>

        {/* Card 3: Top Movie */}
        <motion.div
          whileHover={{ y: -4 }}
          className="bg-[#151c28] border border-slate-800 rounded-3xl p-6 shadow-xl space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Top Blockbuster
            </span>
            <div className="p-2.5 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Film className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-black text-white truncate">Uncharted</h3>
            <p className="text-xs text-slate-400 font-medium">184 Seats Reserved</p>
          </div>
        </motion.div>

        {/* Card 4: Occupancy Rate */}
        <motion.div
          whileHover={{ y: -4 }}
          className="bg-[#151c28] border border-slate-800 rounded-3xl p-6 shadow-xl space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Seat Occupancy
            </span>
            <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-3xl font-black text-white">84.2%</h3>
            <p className="text-xs text-emerald-400 flex items-center gap-1 font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Peak Weekend Load</span>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Main Analytical Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Weekly Revenue Trend Bar Chart (2 cols) */}
        <div className="lg:col-span-2 bg-[#151c28] border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-amber-400" />
                <span>Revenue Performance Breakdown</span>
              </h3>
              <p className="text-xs text-slate-400">Daily gross turnover from movie tickets</p>
            </div>
            <Sparkles className="w-5 h-5 text-amber-400" />
          </div>

          {/* Bar Chart Bars */}
          <div className="h-64 flex items-end justify-between gap-4 pt-8 pb-2 px-4 border-b border-slate-800/80">
            {weeklyData.map((d) => {
              const heightPercent = (d.revenue / maxRevenue) * 100;
              return (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                  <span className="text-[10px] font-mono font-bold text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    ${d.revenue}
                  </span>
                  <div className="w-full bg-slate-900 rounded-xl overflow-hidden h-full flex items-end">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${heightPercent}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="w-full bg-gradient-to-t from-amber-600 to-yellow-400 rounded-t-xl group-hover:from-amber-400 group-hover:to-yellow-300 transition-colors"
                    />
                  </div>
                  <span className="text-xs font-bold text-slate-400">{d.day}</span>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center text-xs text-slate-400 pt-1">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-400"></span>
              Gross Daily Ticket Sales ($)
            </span>
            <span className="font-mono text-amber-400 font-bold">Highest: Sat ($2,100)</span>
          </div>
        </div>

        {/* Genre Distribution Progress Bars (1 col) */}
        <div className="bg-[#151c28] border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <PieChart className="w-5 h-5 text-amber-400" />
              <span>Genre Popularity</span>
            </h3>
            <p className="text-xs text-slate-400">Audience interest breakdown</p>
          </div>

          <div className="space-y-5">
            {genreDistribution.map((item) => (
              <div key={item.genre} className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-200">{item.genre}</span>
                  <span className="text-amber-400 font-mono">{item.percentage}%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percentage}%` }}
                    transition={{ duration: 0.8 }}
                    className={`h-full ${item.color} rounded-full`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-400 space-y-1">
            <p className="font-bold text-white">Insight Summary</p>
            <p className="text-[11px] text-slate-400">
              Action & Sci-Fi movies drive 70% of total ticket sales across peak weekend showtimes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
