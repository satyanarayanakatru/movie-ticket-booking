import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Film, Eye, EyeOff, Mail, Lock, KeyRound, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

const ForgotPassword = () => {
  const { resetPassword, users, loading } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // Step 1: Email verification, Step 2: Set New Password
  const [verifiedEmail, setVerifiedEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form for Step 1
  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    setError: setEmailError,
    formState: { errors: emailErrors }
  } = useForm({
    defaultValues: { email: '' }
  });

  // Form for Step 2
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    watch: watchPassword,
    formState: { errors: passwordErrors }
  } = useForm({
    defaultValues: { newPassword: '', confirmNewPassword: '' }
  });

  const newPasswordValue = watchPassword('newPassword', '');

  const onVerifyEmail = (data) => {
    const normalizedEmail = data.email.trim().toLowerCase();
    const userExists = users.some((u) => u.email.toLowerCase() === normalizedEmail);

    if (!userExists) {
      setEmailError('email', {
        type: 'manual',
        message: 'No account registered with this email address.'
      });
      return;
    }

    setVerifiedEmail(normalizedEmail);
    setStep(2);
  };

  const onResetPassword = async (data) => {
    const res = await resetPassword(verifiedEmail, data.newPassword);
    if (res.success) {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background Amber Glow Decorators */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 mb-4 shadow-lg shadow-amber-500/5">
            <Film className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-2">
            Cine<span className="text-amber-400">Verse</span>
          </h1>
          <p className="text-slate-400 text-sm">
            {step === 1
              ? 'Enter your registered email address to recover your account'
              : 'Create a new secure password for your account'}
          </p>
        </div>

        {/* Card Form */}
        <div className="bg-[#151c28] border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-amber-400" />
              <span>{step === 1 ? 'Forgot Password' : 'Reset Password'}</span>
            </h2>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-amber-400 border border-slate-700">
              Step {step} of 2
            </span>
          </div>

          {step === 1 ? (
            /* Step 1 Form */
            <form onSubmit={handleSubmitEmail(onVerifyEmail)} className="space-y-5" noValidate>
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Account Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    {...registerEmail('email', {
                      required: 'Email address is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Please enter a valid email address'
                      }
                    })}
                    className={`w-full pl-11 pr-4 py-3 bg-[#0b0f17] border ${
                      emailErrors.email ? 'border-red-500/80 focus:ring-red-500/30' : 'border-slate-800 focus:border-amber-500/60 focus:ring-amber-500/20'
                    } rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 transition-all duration-200 text-sm`}
                  />
                </div>
                {emailErrors.email && (
                  <p className="mt-1.5 text-xs text-red-400 font-medium flex items-center gap-1">
                    <span>•</span> {emailErrors.email.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>Verify Email</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            /* Step 2 Form */
            <form onSubmit={handleSubmitPassword(onResetPassword)} className="space-y-4" noValidate>
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Verified email: <strong className="text-white">{verifiedEmail}</strong></span>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    {...registerPassword('newPassword', {
                      required: 'New Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters'
                      }
                    })}
                    className={`w-full pl-11 pr-11 py-3 bg-[#0b0f17] border ${
                      passwordErrors.newPassword ? 'border-red-500/80 focus:ring-red-500/30' : 'border-slate-800 focus:border-amber-500/60 focus:ring-amber-500/20'
                    } rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 transition-all duration-200 text-sm`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {passwordErrors.newPassword && (
                  <p className="mt-1 text-xs text-red-400 font-medium flex items-center gap-1">
                    <span>•</span> {passwordErrors.newPassword.message}
                  </p>
                )}
              </div>

              {/* Confirm New Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Confirm New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    {...registerPassword('confirmNewPassword', {
                      required: 'Please confirm your new password',
                      validate: (val) => val === newPasswordValue || 'Passwords do not match'
                    })}
                    className={`w-full pl-11 pr-11 py-3 bg-[#0b0f17] border ${
                      passwordErrors.confirmNewPassword ? 'border-red-500/80 focus:ring-red-500/30' : 'border-slate-800 focus:border-amber-500/60 focus:ring-amber-500/20'
                    } rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 transition-all duration-200 text-sm`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {passwordErrors.confirmNewPassword && (
                  <p className="mt-1 text-xs text-red-400 font-medium flex items-center gap-1">
                    <span>•</span> {passwordErrors.confirmNewPassword.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-4"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Update Password</span>
                    <CheckCircle className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Footer Back Link */}
          <div className="mt-6 pt-5 border-t border-slate-800/80 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-400 hover:text-amber-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Sign In</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
