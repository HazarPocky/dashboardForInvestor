import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

const ResetPassword: React.FC = () => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [touched, setTouched] = useState(false);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!emailValid) return;

    setLoading(true);
    setError('');

    const { error: err } = await resetPassword(email);
    setLoading(false);

    if (err) {
      setError(err);
    } else {
      setSuccess(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-[420px]">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900">Hellacious</h1>
            <p className="text-[11px] text-slate-500 font-medium">Investor Portal</p>
          </div>
        </div>

        {success ? (
          <div className="animate-fade-in">
            <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-5">
              <CheckCircle2 size={28} className="text-emerald-500" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Check your email</h2>
            <p className="text-[14px] text-slate-500 leading-relaxed mb-6">
              We've sent a password reset link to <span className="font-semibold text-slate-700">{email}</span>. 
              Please check your inbox and follow the instructions to reset your password.
            </p>
            <p className="text-[13px] text-slate-400 mb-6">
              Didn't receive the email? Check your spam folder or{' '}
              <button
                onClick={() => {
                  setSuccess(false);
                  setEmail('');
                }}
                className="text-emerald-600 font-medium hover:text-emerald-700"
              >
                try again
              </button>.
            </p>
            <Link
              to="/login"
              className="flex items-center gap-2 text-[13px] font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              <ArrowLeft size={15} />
              Back to Sign In
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900">Reset your password</h2>
              <p className="text-[14px] text-slate-500 mt-1.5">
                Enter the email address associated with your account and we'll send you a link to reset your password.
              </p>
            </div>

            {error && (
              <div className="mb-5 flex items-start gap-2.5 p-3.5 bg-red-50 border border-red-200 rounded-xl animate-fade-in">
                <AlertCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-[13px] text-red-700 font-medium">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => setTouched(true)}
                    placeholder="you@company.com"
                    autoComplete="email"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border text-[14px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                      touched && !emailValid
                        ? 'border-red-300 focus:ring-red-500/20 focus:border-red-400'
                        : 'border-slate-200 focus:ring-emerald-500/20 focus:border-emerald-400'
                    }`}
                  />
                </div>
                {touched && !emailValid && (
                  <p className="text-[11px] text-red-500 mt-1 font-medium">Please enter a valid email address.</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-400 disabled:cursor-not-allowed text-white text-[14px] font-semibold transition-all shadow-lg shadow-emerald-500/20"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending reset link...
                  </>
                ) : (
                  'Send Reset Link'
                )}
              </button>
            </form>

            <div className="mt-6">
              <Link
                to="/login"
                className="flex items-center gap-2 text-[13px] font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                <ArrowLeft size={15} />
                Back to Sign In
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
