import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import TrailerModal from '../components/dashboard/TrailerModal';
import {
  Film,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  Sparkles,
  Play,
  Star,
  Tv,
  Smartphone,
  Crown,
  ShieldCheck,
  Ticket
} from 'lucide-react';

const Register = () => {
  const { register: registerUser, loading } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Movie Showcase Data for Right Hero Side
  const heroMovies = [
    {
      id: 'm1',
      title: 'Dune: Part Two',
      rating: 4.9,
      genre: 'Sci-Fi / Action',
      format: 'IMAX 70mm 3D',
      duration: '166 mins',
      poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
      description: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
      trailerUrl: 'https://www.youtube.com/watch?v=Way9Dexny3w'
    },
    {
      id: 'm2',
      title: 'Uncharted',
      rating: 4.8,
      genre: 'Action / Adventure',
      format: '4K Laser IMAX',
      duration: '116 mins',
      poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80',
      description: 'Street-smart Nathan Drake is recruited by seasoned treasure hunter Sully to recover a lost fortune.',
      trailerUrl: 'https://www.youtube.com/watch?v=eHp3MbsCBaw'
    }
  ];

  const [activeMovieIndex, setActiveMovieIndex] = useState(0);
  const activeMovie = heroMovies[activeMovieIndex];

  // Trailer Modal State
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const passwordValue = watch('password', '');

  const onSubmit = async (data) => {
    const res = await registerUser(data.name, data.email, data.password);
    if (res.success) {
      navigate('/dashboard', { replace: true });
    }
  };

  return (
    <div className="auth-split-container">
      {/* LEFT FORM SIDE */}
      <div className="auth-form-side">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="auth-form-content"
        >
          {/* Logo Badge */}
          <motion.div
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            className="brand-glow-logo-gold"
          >
            <Film className="w-8 h-8 text-slate-950" />
          </motion.div>

          {/* Heading */}
          <h1 className="brand-split-title">
            Join <span>CineVerse</span> Today
          </h1>

          <p className="text-xs text-slate-400 text-center mb-6">
            Create an account to start booking your favorite movie seats
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Full Name */}
            <div className="split-form-group">
              <label className="split-form-label">Full Name</label>
              <div className="split-input-box">
                <div className="split-input-icon-gold">
                  <User className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  placeholder="Larry Davidson"
                  {...register('name', {
                    required: 'Full Name is required',
                    minLength: {
                      value: 2,
                      message: 'Name must be at least 2 characters'
                    }
                  })}
                  className="split-input-gold"
                  style={{ borderColor: errors.name ? '#ef4444' : '#262f3e' }}
                />
              </div>
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="mt-1 text-xs text-rose-400 font-medium ml-4"
                >
                  • {errors.name.message}
                </motion.p>
              )}
            </div>

            {/* Email Field */}
            <div className="split-form-group">
              <label className="split-form-label">Email Address</label>
              <div className="split-input-box">
                <div className="split-input-icon-gold">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  placeholder="name@example.com"
                  {...register('email', {
                    required: 'Email address is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Please enter a valid email address'
                    }
                  })}
                  className="split-input-gold"
                  style={{ borderColor: errors.email ? '#ef4444' : '#262f3e' }}
                />
              </div>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="mt-1 text-xs text-rose-400 font-medium ml-4"
                >
                  • {errors.email.message}
                </motion.p>
              )}
            </div>

            {/* Password Field */}
            <div className="split-form-group">
              <label className="split-form-label">Password</label>
              <div className="split-input-box">
                <div className="split-input-icon-gold">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••••••"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters'
                    }
                  })}
                  className="split-input-gold pr-12"
                  style={{ borderColor: errors.password ? '#ef4444' : '#262f3e' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="split-eye-btn-gold"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="mt-1 text-xs text-rose-400 font-medium ml-4"
                >
                  • {errors.password.message}
                </motion.p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="split-form-group">
              <label className="split-form-label">Confirm Password</label>
              <div className="split-input-box">
                <div className="split-input-icon-gold">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••••••"
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: (val) => val === passwordValue || 'Passwords do not match'
                  })}
                  className="split-input-gold pr-12"
                  style={{ borderColor: errors.confirmPassword ? '#ef4444' : '#262f3e' }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="split-eye-btn-gold"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="mt-1 text-xs text-rose-400 font-medium ml-4"
                >
                  • {errors.confirmPassword.message}
                </motion.p>
              )}
            </div>

            {/* Golden Gradient Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="btn-gold-pill mt-4"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </>
              )}
            </motion.button>
          </form>

          {/* Footer Link */}
          <div className="text-center text-xs text-slate-400 font-medium mt-6">
            Already have an account?{' '}
            <Link to="/login" className="split-link-gold ml-1 font-bold">
              Sign In
            </Link>
          </div>
        </motion.div>
      </div>

      {/* RIGHT HERO SIDE: MATCHING SLEEK MODERN CINEMA SHOWCASE */}
      <div className="auth-hero-side">
        {/* Background Poster Overlay with Smooth Crossfade */}
        <AnimatePresence mode="wait">
          <motion.img
            key={activeMovie.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            src={activeMovie.poster}
            alt={activeMovie.title}
            className="absolute inset-0 w-full h-full object-cover blur-sm scale-105"
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f17] via-[#0b0f17]/70 to-transparent z-10 pointer-events-none" />

        {/* Top Header Tag inside Hero */}
        <div className="relative z-20 flex items-center justify-between">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>EXCLUSIVES & VIP MEMBERSHIP</span>
          </div>

          {/* Interactive Movie Switcher Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-900/80 border border-slate-800 p-1 rounded-full backdrop-blur-md">
            {heroMovies.map((m, idx) => (
              <button
                key={m.id}
                onClick={() => setActiveMovieIndex(idx)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeMovieIndex === idx
                    ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {m.title}
              </button>
            ))}
          </div>
        </div>

        {/* Main Hero Content Area */}
        <div className="relative z-20 max-w-xl my-auto space-y-6">
          <div className="space-y-3">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Unlock VIP Benefits. <br />
              <span className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
                Earn Cinema Rewards.
              </span>
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed max-w-md">
              Create your account today to unlock early bird showtime bookings, zero cancellation fees, and discount perks on snacks & beverages.
            </p>
          </div>

          {/* Now Showing Card */}
          <motion.div
            key={activeMovie.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 rounded-3xl bg-[#151c28]/90 border border-slate-800 backdrop-blur-xl shadow-2xl flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={activeMovie.poster}
                alt={activeMovie.title}
                className="w-16 h-20 rounded-2xl object-cover border border-slate-700 shadow-md"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold border border-amber-500/30">
                    {activeMovie.genre}
                  </span>
                  <span className="text-amber-400 font-bold text-xs flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    {activeMovie.rating}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white mt-1">{activeMovie.title}</h4>
                <p className="text-xs text-slate-400">{activeMovie.format} • {activeMovie.duration}</p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsTrailerOpen(true)}
              className="px-4 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 shadow-md cursor-pointer flex-shrink-0"
            >
              <Play className="w-3.5 h-3.5 fill-slate-950 ml-0.5" />
              <span>Trailer</span>
            </motion.button>
          </motion.div>

          {/* 3 Key Feature Chips */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-1">
              <Tv className="w-4 h-4 text-amber-400 mx-auto" />
              <p className="text-[11px] font-bold text-white">4K Laser IMAX</p>
              <p className="text-[9px] text-slate-400">Ultra HD Projection</p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-1">
              <Smartphone className="w-4 h-4 text-amber-400 mx-auto" />
              <p className="text-[11px] font-bold text-white">QR Mobile Entry</p>
              <p className="text-[9px] text-slate-400">Paperless Boarding</p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-1">
              <Crown className="w-4 h-4 text-amber-400 mx-auto" />
              <p className="text-[11px] font-bold text-white">VIP Reclining</p>
              <p className="text-[9px] text-slate-400">Dolby Atmos Audio</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-20 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80 pt-4">
          <span className="flex items-center gap-1.5 text-slate-300">
            <ShieldCheck className="w-4 h-4 text-amber-400" /> 100% Verified Account Security
          </span>
          <span className="flex items-center gap-1.5 text-slate-300">
            <Ticket className="w-4 h-4 text-amber-400" /> Instant Rewards Points
          </span>
        </div>
      </div>

      {/* Trailer Modal Component */}
      <TrailerModal
        isOpen={isTrailerOpen}
        onClose={() => setIsTrailerOpen(false)}
        movie={activeMovie}
      />
    </div>
  );
};

export default Register;
