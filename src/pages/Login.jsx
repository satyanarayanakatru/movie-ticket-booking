import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Film, Eye, EyeOff, Mail, Lock, LogIn, ArrowRight, UserCheck } from 'lucide-react';

const Login = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

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
            Sign in to explore movies, select seats & manage your bookings
          </p>
        </div>

        {/* Card Form */}
        <div className="auth-card">
          <div className="card-header-flex">
            <h2 className="card-title">
              <LogIn className="w-5 h-5" style={{ color: '#f5a623' }} />
              <span>Welcome Back</span>
            </h2>
            <button type="button" onClick={handleQuickDemo} className="pill-badge">
              <UserCheck className="w-3.5 h-3.5" />
              <span>Demo Fill</span>
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
              <div className="form-label-row">
                <label className="form-label" style={{ margin: 0 }}>
                  Password
                </label>
                <Link to="/forgot-password" className="link-gold" style={{ fontSize: '0.75rem' }}>
                  Forgot password?
                </Link>
              </div>
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

            {/* Submit Button */}
            <button type="submit" disabled={loading} className="btn-gold">
              {loading ? (
                <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer Link */}
          <div className="card-footer">
            Don't have an account?{' '}
            <Link to="/register" className="link-gold">
              Create Account
            </Link>
          </div>
        </div>

        {/* Demo Box */}
        <div className="demo-box">
          <span className="link-gold">Demo Account:</span> demo@example.com / Password123!
        </div>
      </div>
    </div>
  );
};

export default Login;
