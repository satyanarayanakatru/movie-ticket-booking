import React, { useState } from 'react';
import { Ticket, Search, Filter, CheckCircle2, Clock, XCircle } from 'lucide-react';

const RecentBookingsTable = ({ bookings }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.movie.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Confirmed':
      case 'Paid':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1 w-max">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {status === 'Paid' ? 'Paid & Confirmed' : 'Confirmed'}
          </span>
        );
      case 'Pending Payment':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1 w-max">
            <Clock className="w-3.5 h-3.5" />
            Pending Payment
          </span>
        );
      case 'Completed':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center gap-1 w-max">
            <Clock className="w-3.5 h-3.5" />
            Completed
          </span>
        );
      case 'Cancelled':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center gap-1 w-max">
            <XCircle className="w-3.5 h-3.5" />
            Cancelled
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1 w-max">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="bg-[#151c28] border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5">
      {/* Table Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Ticket className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Recent Ticket Bookings</h3>
            <p className="text-xs text-slate-400">Real-time reservation transactions</p>
          </div>
        </div>

        {/* Filter & Search */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative flex-1 sm:w-48">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search booking..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-[#0b0f17] border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:border-amber-500/60"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 bg-[#0b0f17] border border-slate-800 rounded-xl text-slate-300 text-xs focus:outline-none focus:border-amber-500/60 cursor-pointer"
          >
            <option value="All">All Status</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Table Area */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
              <th className="py-3 px-4">Booking ID</th>
              <th className="py-3 px-4">Movie</th>
              <th className="py-3 px-4">Theatre & City</th>
              <th className="py-3 px-4">Show Timing</th>
              <th className="py-3 px-4">Seats</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filteredBookings.length > 0 ? (
              filteredBookings.map((b) => (
                <tr key={b.id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-amber-400">{b.id}</td>
                  <td className="py-3.5 px-4 font-bold text-white">{b.movie}</td>
                  <td className="py-3.5 px-4 text-slate-300">
                    <p className="font-semibold text-slate-200">{b.theatre}</p>
                    <p className="text-[10px] text-slate-400">{b.city}</p>
                  </td>
                  <td className="py-3.5 px-4 text-slate-300 whitespace-nowrap">{b.showTime}</td>
                  <td className="py-3.5 px-4">
                    <div className="flex flex-wrap gap-1">
                      {b.seats.map((seat) => (
                        <span key={seat} className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-mono font-bold text-slate-300 border border-slate-700">
                          {seat}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-extrabold text-white">${b.totalPrice}</td>
                  <td className="py-3.5 px-4">{getStatusBadge(b.status)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-8 text-center text-slate-500 text-xs">
                  No bookings matching search criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentBookingsTable;
