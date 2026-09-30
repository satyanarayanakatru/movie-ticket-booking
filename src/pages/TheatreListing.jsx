import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockTheatresData } from '../data/mockTheatresData';
import TheatreCard from '../components/theatres/TheatreCard';
import TheatreModal from '../components/theatres/TheatreModal';
import SkeletonLoader from '../components/ui/SkeletonLoader';
import EmptyState from '../components/ui/EmptyState';
import {
  Building2,
  Search,
  MapPin,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Filter
} from 'lucide-react';

const ITEMS_PER_PAGE = 6;

const TheatreListing = () => {
  const [loading, setLoading] = useState(true);

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [minScreens, setMinScreens] = useState(0);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);

  // Modal State
  const [selectedTheatre, setSelectedTheatre] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Simulate loading delay for skeleton check
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // Extract unique cities list
  const citiesList = useMemo(() => {
    const cities = mockTheatresData.map((t) => t.city);
    return Array.from(new Set(cities));
  }, []);

  // Filter theatres based on criteria
  const filteredTheatres = useMemo(() => {
    return mockTheatresData.filter((t) => {
      const matchesSearch =
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.city.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCity = selectedCity === 'All' || t.city === selectedCity;
      const matchesScreens = t.screens >= minScreens;

      return matchesSearch && matchesCity && matchesScreens;
    });
  }, [searchQuery, selectedCity, minScreens]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCity, minScreens]);

  // Pagination logic
  const totalPages = Math.ceil(filteredTheatres.length / ITEMS_PER_PAGE);
  const paginatedTheatres = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredTheatres.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredTheatres, currentPage]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCity('All');
    setMinScreens(0);
    setCurrentPage(1);
  };

  const handleOpenModal = (theatre) => {
    setSelectedTheatre(theatre);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold mb-2">
            <Building2 className="w-3.5 h-3.5" />
            <span>Module 4: Theatre Listing & Screens</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Explore Theatres
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Discover cinema multiplexes, available screens & show timings in your city
          </p>
        </div>

        <div className="text-right text-xs text-slate-400">
          Showing <strong className="text-amber-400">{filteredTheatres.length}</strong> theatres found
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div className="bg-[#151c28] border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search theatre name, area, or landmark..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#0b0f17] border border-slate-800 rounded-full text-slate-100 placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/20 transition-all"
            />
          </div>

          {/* Reset Filters */}
          <button
            onClick={handleResetFilters}
            className="px-4 py-2.5 rounded-full bg-slate-900 border border-slate-800 hover:border-amber-500/30 text-slate-400 hover:text-amber-400 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        </div>

        {/* Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800/80">
          {/* City Filter */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Select City
            </label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-3 py-2 bg-[#0b0f17] border border-slate-800 rounded-xl text-slate-200 text-xs focus:outline-none focus:border-amber-500/60 cursor-pointer"
            >
              <option value="All">All Cities</option>
              {citiesList.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Screens Filter */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Minimum Screens
            </label>
            <select
              value={minScreens}
              onChange={(e) => setMinScreens(Number(e.target.value))}
              className="w-full px-3 py-2 bg-[#0b0f17] border border-slate-800 rounded-xl text-slate-200 text-xs focus:outline-none focus:border-amber-500/60 cursor-pointer"
            >
              <option value={0}>All Screens</option>
              <option value={6}>6+ Screens (Multiplex)</option>
              <option value={8}>8+ Screens (Megaplex / IMAX)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Theatres Grid / Loading / Empty */}
      {loading ? (
        <SkeletonLoader count={6} />
      ) : paginatedTheatres.length === 0 ? (
        <EmptyState
          title="No Theatres Found"
          description="No cinema theatres match your selected city or search keyword."
          onReset={handleResetFilters}
        />
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {paginatedTheatres.map((theatre, index) => (
                <TheatreCard
                  key={theatre.id}
                  theatre={theatre}
                  onViewDetails={handleOpenModal}
                  index={index}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-6 border-t border-slate-800/80">
              <span className="text-xs text-slate-400">
                Page <strong className="text-white">{currentPage}</strong> of <strong className="text-white">{totalPages}</strong>
              </span>

              <div className="flex items-center gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  className="px-3.5 py-2 rounded-xl bg-[#151c28] border border-slate-800 text-slate-300 hover:text-amber-400 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                {Array.from({ length: totalPages }).map((_, idx) => {
                  const pageNum = idx + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-9 h-9 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        currentPage === pageNum
                          ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                          : 'bg-[#151c28] border border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  className="px-3.5 py-2 rounded-xl bg-[#151c28] border border-slate-800 text-slate-300 hover:text-amber-400 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Detailed Modal Component */}
      <TheatreModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        theatre={selectedTheatre}
      />
    </div>
  );
};

export default TheatreListing;
