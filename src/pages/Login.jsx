import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Film,
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  Play,
  Volume2,
  Tv,
  CheckCircle2,
  Ticket,
  Star,
  Zap,
  ShieldCheck
} from 'lucide-react';

const Login = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Live Seat Picking Interactive Demo
  const [selectedSeats, setSelectedSeats] = useState([12, 13]);
  const ticketPrice = 15;

  // Movie Showcase Tabs
  const heroMovies = [
    {
      id: 'm1',
      title: 'Uncharted',
      rating: 4.8,
      sound: 'Dolby Atmos 7.1',
      format: '4K Laser IMAX',
      poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80',
      time: '19:30 PM'
    },
    {
      id: 'm2',
      title: 'Dune: Part Two',
      rating: 4.9,
      sound: 'DTS-X Master Audio',
      format: 'IMAX 70mm 3D',
      poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
      time: '21:00 PM'
    }
  ];
  const [activeMovieIndex, setActiveMovieIndex] = useState(0);
  const activeMovie = heroMovies[activeMovieIndex];

  const from = location.state?.from?.pathname || '/dashboard';

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data) => {
    const res = await login(data.email, data.password);
    if (res.success) {
      navigate(from, { replace: true });
    }
  };

  const handleQuickDemo = () => {
    setValue('email', 'demo@example.com');
    setValue('password', 'Password123!');
  };

  const toggleSeat = (seatId) => {
    if (seatId === 5 || seatId === 18) return;
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
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
          {/* Logo Badge with Subtle Motion Glow */}
          <motion.div
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            className="brand-glow-logo-gold"
          >
            <Film className="w-8 h-8 text-slate-950" />
          </motion.div>

          {/* Heading */}
          <h1 className="brand-split-title">
            Sign In To <span>CineVerse</span>
          </h1>

          {/* Quick Auto-Fill Pill */}
          <div className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              type="button"
              onClick={handleQuickDemo}
              className="autofill-badge-gold"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Click to Auto-fill: demo@example.com</span>
            </motion.button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
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

            {/* Remember Me & Forgot Password */}
            <div className="form-options-row">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className="split-link-gold">
                Forgot password?
              </Link>
            </div>

            {/* Golden Gradient Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="btn-gold-pill"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In To CineVerse</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </>
              )}
            </motion.button>
          </form>

          {/* Social Divider */}
          <div className="social-divider">
            <span>or connect with</span>
          </div>

          <div className="social-btns-row">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={handleQuickDemo}
              className="social-icon-btn"
              title="Facebook Login"
            >
              <svg className="w-5 h-5 fill-[#1877F2]" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={handleQuickDemo}
              className="social-icon-btn"
              title="Google Login"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
            </motion.button>
          </div>

          <div className="text-center text-xs text-slate-400 font-medium">
            Don't have an account?{' '}
            <Link to="/register" className="split-link-gold ml-1 font-bold">
              Sign up
            </Link>
          </div>
        </motion.div>
      </div>

      {/* RIGHT HERO SIDE WITH FRAMER MOTION INTERACTIVE SEAT WIDGET */}
      <div className="auth-hero-side">
        {/* Ambient Backdrop */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0b0f17] via-[#151c28] to-[#080c14]" />
        
        {/* Background Poster Overlay with smooth crossfade */}
        <AnimatePresence mode="wait">
          <motion.img
            key={activeMovie.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.25 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            src={activeMovie.poster}
            alt={activeMovie.title}
            className="absolute inset-0 w-full h-full object-cover blur-sm"
          />
        </AnimatePresence>

        {/* Top Header Bar inside Hero */}
        <div className="relative z-20 flex items-center justify-between">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-amber-500/30 text-amber-300 text-xs font-semibold backdrop-blur-md">
            <Tv className="w-3.5 h-3.5 text-amber-400" />
            <span>Interactive Theater Demo</span>
          </div>

          {/* Movie Switcher */}
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

        {/* Center Interactive Widget with Motion Entrance */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="gold-widget-card max-w-lg mx-auto w-full my-auto"
        >
          {/* Movie Title & Sound Tag */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-extrabold text-white">{activeMovie.title}</h3>
                <span className="flex items-center gap-1 text-[11px] font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                  <Star className="w-3 h-3 fill-amber-400" />
                  {activeMovie.rating}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Auditorium 4 • {activeMovie.time}</p>
            </div>

            <div className="text-right">
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                <Volume2 className="w-3.5 h-3.5" />
                {activeMovie.sound}
              </span>
            </div>
          </div>

          {/* Interactive Screen Curve */}
          <div className="text-center mb-4">
            <div className="gold-screen-curve" />
            <p className="text-[10px] tracking-widest text-amber-400 uppercase font-bold">
              CURVED 4K LASER SCREEN
            </p>
          </div>

          {/* Interactive Seat Selection Mini Grid */}
          <div className="seat-grid-mini">
            {[0, 6, 12, 18].map((rowStart) => (
              <div key={rowStart} className="seat-row-mini">
                {[0, 1, 2, 3, 4, 5].map((col) => {
                  const seatId = rowStart + col;
                  const isSelected = selectedSeats.includes(seatId);
                  const isReserved = seatId === 5 || seatId === 18;

                  return (
                    <motion.button
                      key={seatId}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      type="button"
                      onClick={() => toggleSeat(seatId)}
                      className={`seat-cell ${
                        isReserved ? 'reserved' : isSelected ? 'selected' : 'available'
                      }`}
                      title={
                        isReserved
                          ? 'Seat Reserved'
                          : isSelected
                          ? 'Seat Selected ($15)'
                          : 'Click to select seat ($15)'
                      }
                    />
                  );
                })}
              </div>
            ))}
          </div>

          {/* Legend & Real-Time Price Calculation Widget */}
          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3 text-[10px] text-slate-400">
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-slate-800 border border-slate-700" />
                <span>Free</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-amber-500" />
                <span>Selected</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">
                {selectedSeats.length} {selectedSeats.length === 1 ? 'Seat' : 'Seats'}
              </span>
              <motion.span
                key={selectedSeats.length}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="text-base font-extrabold text-slate-950 px-3 py-1 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 shadow-md"
              >
                ${selectedSeats.length * ticketPrice}
              </motion.span>
            </div>
          </div>
        </motion.div>

        {/* Hero Bottom Bar Highlights */}
        <div className="relative z-20 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80 pt-4">
          <span className="flex items-center gap-1.5 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-amber-400" /> Instant Digital QR Boarding
          </span>
          <span className="flex items-center gap-1.5 text-slate-300">
            <Ticket className="w-4 h-4 text-amber-400" /> Zero Convenience Fees
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
