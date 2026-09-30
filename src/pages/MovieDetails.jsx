import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getMovieById } from '../services/movieApi';
import TrailerModal from '../components/dashboard/TrailerModal';
import {
  Star,
  Play,
  Calendar,
  Clock,
  Globe,
  ArrowLeft,
  Ticket
} from 'lucide-react';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  useEffect(() => {
    const loadMovie = async () => {
      setLoading(true);
      const data = await getMovieById(id);
      setMovie(data);
      setLoading(false);
    };
    loadMovie();
  }, [id]);

  const handleBookMovieSeats = () => {
    if (!movie) return;
    navigate('/seat-selection', {
      state: {
        movieId: movie.id,
        movieTitle: movie.title,
        moviePoster: movie.poster,
        genre: movie.genre,
        rating: movie.rating,
        theatreId: 'th-101',
        theatreName: 'PVR IMAX, Forum Mall',
        city: 'Hyderabad',
        showDate: 'Today, 30 Sep 2026',
        showTime: '07:30 PM',
        screen: 'Screen 1 (IMAX 4K)'
      }
    });
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12 flex justify-center items-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Movie Not Found</h2>
        <button
          onClick={() => navigate('/movies')}
          className="px-4 py-2 rounded-full bg-amber-500 text-slate-950 font-bold text-xs"
        >
          Back to Movies
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-8">
      {/* Back Link */}
      <div>
        <Link
          to="/movies"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-amber-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Movie Listings</span>
        </Link>
      </div>

      {/* Hero Showcase Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#151c28] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative"
      >
        {/* Backdrop Hero Image */}
        <div className="relative h-72 sm:h-96 w-full overflow-hidden">
          <img
            src={movie.backdrop || movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover filter brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#151c28] via-[#151c28]/60 to-transparent" />
        </div>

        {/* Floating Content Details Layer */}
        <div className="p-6 sm:p-8 -mt-32 sm:-mt-44 relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
          {/* Left Column: Movie Poster */}
          <div className="w-48 sm:w-64 mx-auto md:mx-0 rounded-2xl overflow-hidden border-2 border-slate-700 shadow-2xl flex-shrink-0">
            <img src={movie.poster} alt={movie.title} className="w-full h-auto object-cover" />
          </div>

          {/* Right Column: Information & Actions */}
          <div className="md:col-span-2 space-y-5">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold border border-amber-500/30">
                  {movie.genre}
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold flex items-center gap-1">
                  <Globe className="w-3 h-3 text-amber-400" />
                  {movie.language}
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold flex items-center gap-1">
                  <Clock className="w-3 h-3 text-amber-400" />
                  {movie.duration}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                {movie.title}
              </h1>

              <div className="flex items-center gap-4 mt-3 text-xs sm:text-sm text-slate-300">
                <div className="flex items-center gap-1 text-amber-400 font-extrabold text-base">
                  <Star className="w-5 h-5 fill-amber-400" />
                  <span>{movie.rating} / 5.0</span>
                </div>
                <span>•</span>
                <span>Released: <strong>{movie.releaseDate}</strong></span>
              </div>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {movie.description}
            </p>

            {/* Director & Cast Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Director</p>
                <p className="text-sm font-semibold text-white mt-1">{movie.director || 'Renowned Director'}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Starring Cast</p>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {movie.cast ? (
                    movie.cast.map((actor) => (
                      <span key={actor} className="px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300">
                        {actor}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-300">Popular Lead Cast</span>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsTrailerOpen(true)}
                className="px-6 py-3.5 rounded-full bg-slate-900 border border-slate-800 hover:border-amber-500/40 text-slate-200 hover:text-amber-400 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Watch Official Trailer</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBookMovieSeats}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 text-xs font-extrabold flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
              >
                <Ticket className="w-4 h-4" />
                <span>Select Seats & Book Tickets</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Trailer Modal Component */}
      <TrailerModal
        isOpen={isTrailerOpen}
        onClose={() => setIsTrailerOpen(false)}
        movie={movie}
      />
    </div>
  );
};

export default MovieDetails;
