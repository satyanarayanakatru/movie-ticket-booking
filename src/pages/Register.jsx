import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Film, Eye, EyeOff, Mail, Lock, User, UserPlus, ArrowRight } from 'lucide-react';

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
    <div className="auth-bg">
      <div className="auth-wrapper">
        {/* Brand Header */}
        <div className="brand-header">
          <div className="brand-icon-box">
            <Film className="w-8 h-8" />
          </div>
          <h1 className="brand-title">
            Cine<span>Verse</span>
          </h1>
          <p className="brand-subtitle">
            Create an account to start booking your favorite movie seats
          </p>
        </div>

        {/* Card Form */}
        <div className="auth-card">
          <div className="card-header-flex">
            <h2 className="card-title">
              <UserPlus className="w-5 h-5" style={{ color: '#f5a623' }} />
              <span>Create Account</span>
            </h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Full Name */}
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div className="input-relative">
                <div className="input-icon-left">
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
                  className="auth-input"
                  style={{ borderColor: errors.name ? '#ef4444' : '#262f3e' }}
                />
              </div>
              {errors.name && <p className="error-text">• {errors.name.message}</p>}
            </div>

            {/* Email Field */}
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="input-relative">
                <div className="input-icon-left">
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
                  className="auth-input"
                  style={{ borderColor: errors.email ? '#ef4444' : '#262f3e' }}
                />
              </div>
              {errors.email && <p className="error-text">• {errors.email.message}</p>}
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-relative">
                <div className="input-icon-left">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters'
                    }
                  })}
                  className="auth-input pr-11"
                  style={{ borderColor: errors.password ? '#ef4444' : '#262f3e' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="input-icon-right"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="error-text">• {errors.password.message}</p>}
            </div>

            {/* Confirm Password Field */}
            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <div className="input-relative">
                <div className="input-icon-left">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: (val) => val === passwordValue || 'Passwords do not match'
                  })}
                  className="auth-input pr-11"
                  style={{ borderColor: errors.confirmPassword ? '#ef4444' : '#262f3e' }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="input-icon-right"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="error-text">• {errors.confirmPassword.message}</p>}
            </div>

            {/* Submit Button */}
            <button type="submit" disabled={loading} className="btn-gold">
              {loading ? (
                <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer Link */}
          <div className="card-footer">
            Already have an account?{' '}
            <Link to="/login" className="link-gold">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
