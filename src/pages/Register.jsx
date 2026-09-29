import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Clapperboard,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  Sparkles,
  Play
} from 'lucide-react';

const Register = () => {
  const { register: registerUser, loading } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
        <div className="auth-form-content">
          {/* Glowing Circular Logo Badge */}
          <div className="brand-glow-logo">
            <Clapperboard className="w-8 h-8 text-white" />
          </div>

          {/* Heading */}
          <h1 className="brand-split-title">
            Join <span>CineVerse</span> Today
          </h1>

          <p className="text-xs text-slate-400 text-center mb-6">
            Create your account to unlock instant seat reservations & rewards
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Full Name */}
            <div className="split-form-group">
              <label className="split-form-label">Full Name:</label>
              <div className="split-input-box">
                <div className="split-input-icon">
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
                  className="split-input"
                  style={{ borderColor: errors.name ? '#ef4444' : 'transparent' }}
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-xs text-rose-400 font-medium ml-4">
                  • {errors.name.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="split-form-group">
              <label className="split-form-label">Email Address:</label>
              <div className="split-input-box">
                <div className="split-input-icon">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  placeholder="cinema@movietickets.com"
                  {...register('email', {
                    required: 'Email address is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Please enter a valid email address'
                    }
                  })}
                  className="split-input"
                  style={{ borderColor: errors.email ? '#ef4444' : 'transparent' }}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-rose-400 font-medium ml-4">
                  • {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="split-form-group">
              <label className="split-form-label">Password:</label>
              <div className="split-input-box">
                <div className="split-input-icon">
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
                  className="split-input pr-12"
                  style={{ borderColor: errors.password ? '#ef4444' : 'transparent' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="split-eye-btn"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-rose-400 font-medium ml-4">
                  • {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="split-form-group">
              <label className="split-form-label">Confirm Password:</label>
              <div className="split-input-box">
                <div className="split-input-icon">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••••••"
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: (val) => val === passwordValue || 'Passwords do not match'
                  })}
                  className="split-input pr-12"
                  style={{ borderColor: errors.confirmPassword ? '#ef4444' : 'transparent' }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="split-eye-btn"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-rose-400 font-medium ml-4">
                  • {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Gradient Action Button */}
            <button type="submit" disabled={loading} className="btn-gradient-pill mt-4">
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </>
              )}
            </button>
          </form>

          {/* Footer Link */}
          <div className="text-center text-xs text-slate-400 font-medium mt-6">
            Already have an account?{' '}
            <Link to="/login" className="split-link ml-1 font-bold">
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* RIGHT HERO SIDE */}
      <div className="auth-hero-side">
        <img
          src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80"
          alt="Cinema Auditorium"
          className="auth-hero-bg"
        />
        <div className="auth-hero-overlay" />

        <div className="hero-floating-badge">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Instant Mobile E-Tickets & Concession Rewards</span>
        </div>

        <div className="hero-main-content">
          <div className="hero-tag">
            <span>✨ EXCLUSIVE MEMBERSHIP</span>
          </div>

          <h2 className="hero-title">
            Reserve Your <span>Best Seats</span>
          </h2>

          <p className="hero-desc">
            Get early access to premier movie shows, select recliners in real-time, and earn reward points on every ticket booking.
          </p>

          <div className="hero-btn-row">
            <button onClick={() => navigate('/dashboard')} className="btn-hero-explore cursor-pointer">
              Explore Cinema Showtimes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
