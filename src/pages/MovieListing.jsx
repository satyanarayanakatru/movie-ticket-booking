import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchMoviesFromAPI } from '../services/movieApi';
import MovieCard from '../components/movies/MovieCard';
import MovieFilters from '../components/movies/MovieFilters';
import SkeletonLoader from '../components/ui/SkeletonLoader';
import EmptyState from '../components/ui/EmptyState';
import TrailerModal from '../components/dashboard/TrailerModal';
import { Film, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

const ITEMS_PER_PAGE = 8;

const MovieListing = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [minRating, setMinRating] = useState(0);
  const [sortByDate, setSortByDate] = useState('latest');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);

  // Trailer Modal State
  const [selectedMovieForTrailer, setSelectedMovieForTrailer] = useState(null);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  // Fetch Movies on Mount
  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchMoviesFromAPI();
        setMovies(data);
      } catch (err) {
        console.error('Failed to load movies:', err);
        setError('Failed to fetch movie data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, []);

  // Extract Unique Genres & Languages dynamically
  const genresList = useMemo(() => {
    const genres = movies.map((m) => m.genre).filter(Boolean);
    return Array.from(new Set(genres));
  }, [movies]);

  const languagesList = useMemo(() => {
    const langs = movies.map((m) => m.language).filter(Boolean);
    return Array.from(new Set(langs));
  }, [movies]);

  // Filter & Sort Movies
  const filteredMovies = useMemo(() => {
    return movies
      .filter((m) => {
        const matchesSearch =
          m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesGenre = selectedGenre === 'All' || m.genre === selectedGenre;
        const matchesLanguage = selectedLanguage === 'All' || m.language === selectedLanguage;
        const matchesRating = m.rating >= minRating;

        return matchesSearch && matchesGenre && matchesLanguage && matchesRating;
      })
      .sort((a, b) => {
        const dateA = new Date(a.releaseDate).getTime();
        const dateB = new Date(b.releaseDate).getTime();
        return sortByDate === 'latest' ? dateB - dateA : dateA - dateB;
      });
  }, [movies, searchQuery, selectedGenre, selectedLanguage, minRating, sortByDate]);

  // Reset Page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedGenre, selectedLanguage, minRating, sortByDate]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredMovies.length / ITEMS_PER_PAGE);
  const paginatedMovies = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredMovies.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredMovies, currentPage]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedGenre('All');
    setSelectedLanguage('All');
    setMinRating(0);
    setSortByDate('latest');
    setCurrentPage(1);
  };

  const handleOpenTrailer = (movie) => {
    setSelectedMovieForTrailer(movie);
    setIsTrailerOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold mb-2">
            <Film className="w-3.5 h-3.5" />
            <span>Module 3: Third-Party API Dynamic Movies</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Explore Movies
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Browse through latest blockbusters, filter by genre, rating & language
          </p>
        </div>

        <div className="text-right text-xs text-slate-400">
          Showing <strong className="text-amber-400">{filteredMovies.length}</strong> movies available
        </div>
      </div>

      {/* Filter Component */}
      <MovieFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        minRating={minRating}
        setMinRating={setMinRating}
        sortByDate={sortByDate}
        setSortByDate={setSortByDate}
        onResetFilters={handleResetFilters}
        genresList={genresList}
        languagesList={languagesList}
      />

      {/* Movies Grid / Loading / Error / Empty States */}
      {loading ? (
        <SkeletonLoader count={8} />
      ) : error ? (
        <EmptyState title="API Connection Error" description={error} onReset={handleResetFilters} />
      ) : paginatedMovies.length === 0 ? (
        <EmptyState
          title="No Movies Match Your Criteria"
          description="We couldn't find any movies matching your current search or filter combinations."
          onReset={handleResetFilters}
        />
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {paginatedMovies.map((movie, index) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onWatchTrailer={handleOpenTrailer}
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

      {/* Trailer Modal */}
      <TrailerModal
        isOpen={isTrailerOpen}
        onClose={() => setIsTrailerOpen(false)}
        movie={selectedMovieForTrailer}
      />
    </div>
  );
};

export default MovieListing;
