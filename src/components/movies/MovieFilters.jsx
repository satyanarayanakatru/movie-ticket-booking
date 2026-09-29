import React from 'react';
import { Search, Filter, RotateCcw, ArrowUpDown, SlidersHorizontal } from 'lucide-react';

const MovieFilters = ({
  searchQuery,
  setSearchQuery,
  selectedGenre,
  setSelectedGenre,
  selectedLanguage,
  setSelectedLanguage,
  minRating,
  setMinRating,
  sortByDate,
  setSortByDate,
  onResetFilters,
  genresList,
  languagesList
}) => {
  return (
    <div className="bg-[#151c28] border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4">
      {/* Top Search & Reset Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Live Search Bar */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search movies by title, keyword, or actor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#0b0f17] border border-slate-800 rounded-full text-slate-100 placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/20 transition-all"
          />
        </div>

        {/* Reset Filters Button */}
        <button
          onClick={onResetFilters}
          className="px-4 py-2.5 rounded-full bg-slate-900 border border-slate-800 hover:border-amber-500/30 text-slate-400 hover:text-amber-400 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Filters</span>
        </button>
      </div>

      {/* Filter Dropdowns Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-800/80">
        {/* Genre Filter */}
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Genre
          </label>
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="w-full px-3 py-2 bg-[#0b0f17] border border-slate-800 rounded-xl text-slate-200 text-xs focus:outline-none focus:border-amber-500/60 cursor-pointer"
          >
            <option value="All">All Genres</option>
            {genresList.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        {/* Language Filter */}
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Language
          </label>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="w-full px-3 py-2 bg-[#0b0f17] border border-slate-800 rounded-xl text-slate-200 text-xs focus:outline-none focus:border-amber-500/60 cursor-pointer"
          >
            <option value="All">All Languages</option>
            {languagesList.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>

        {/* Min Rating Filter */}
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Min Rating
          </label>
          <select
            value={minRating}
            onChange={(e) => setMinRating(Number(e.target.value))}
            className="w-full px-3 py-2 bg-[#0b0f17] border border-slate-800 rounded-xl text-slate-200 text-xs focus:outline-none focus:border-amber-500/60 cursor-pointer"
          >
            <option value={0}>All Ratings</option>
            <option value={4.8}>⭐ 4.8 & Above</option>
            <option value={4.5}>⭐ 4.5 & Above</option>
            <option value={4.0}>⭐ 4.0 & Above</option>
          </select>
        </div>

        {/* Sort by Release Date */}
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Release Date Sort
          </label>
          <select
            value={sortByDate}
            onChange={(e) => setSortByDate(e.target.value)}
            className="w-full px-3 py-2 bg-[#0b0f17] border border-slate-800 rounded-xl text-slate-200 text-xs focus:outline-none focus:border-amber-500/60 cursor-pointer"
          >
            <option value="latest">Latest First (Newest)</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default MovieFilters;
