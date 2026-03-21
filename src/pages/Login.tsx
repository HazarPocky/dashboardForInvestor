import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Loader2, AlertCircle } from 'lucide-react';

const Login: React.FC = () => {
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [touched, setTouched] = useState({ email: false, password: false, fullName: false });

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passwordValid = password.length >= 8;
  const nameValid = fullName.trim().length >= 2;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setTouched({ email: true, password: true, fullName: true });

    if (!emailValid || !passwordValid) return;
    if (mode === 'signup' && !nameValid) return;

    setLoading(true);

    if (mode === 'login') {
      const { error: err } = await signIn(email, password);
      if (err) {
        setError(err);
        setLoading(false);
      } else {
        navigate('/', { replace: true });
      }
    } else {
      const { error: err } = await signUp(email, password, fullName);
      if (err) {
        setError(err);
        setLoading(false);
      } else {
        navigate('/', { replace: true });
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left panel - branding */}
      <div className="hidden lg:flex lg:w-[480px] xl:w-[560px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-500/5 rounded-full translate-y-1/3 -translate-x-1/3" />
        <div className="absolute top-1/2 right-0 w-48 h-48 bg-teal-500/5 rounded-full translate-x-1/2" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-11 h-11 bg-emerald-500 rounded-xl flex items-center justify-center">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Apex Capital</h1>
              <p className="text-[11px] text-emerald-400 font-medium">Investor Portal</p>
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <h2 className="text-3xl xl:text-4xl font-bold leading-tight mb-4">
            Your investments,<br />
            <span className="text-emerald-400">always accessible.</span>
          </h2>
          <p className="text-slate-400 text-[15px] leading-relaxed max-w-sm">
            Securely access your portfolio, download tax documents, and stay informed on your investment performance — all in one place.
          </p>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-400">$2B+</p>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">Assets Managed</p>
            </div>
            <div className="w-px h-10 bg-slate-700" />
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-400">150+</p>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">Investors</p>
            </div>
            <div className="w-px h-10 bg-slate-700" />
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-400">25+</p>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">Active Deals</p>
            </div>
          </div>
          <p className="text-[11px] text-slate-600 mt-6">
            &copy; {new Date().getFullYear()} Apex Capital Group, LLC. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[420px]">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900">Apex Capital</h1>
              <p className="text-[11px] text-slate-500 font-medium">Investor Portal</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900">
              {mode === 'login' ? 'Welcome back' : 'Create your account'}
            </h2>
            <p className="text-[14px] text-slate-500 mt-1.5">
              {mode === 'login'
                ? 'Sign in to access your investor dashboard.'
                : 'Get started with your investor portal account.'}
            </p>
          </div>

          {error && (
            <div className="mb-5 flex items-start gap-2.5 p-3.5 bg-red-50 border border-red-200 rounded-xl animate-fade-in">
              <AlertCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-[13px] text-red-700 font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  onBlur={() => setTouched({ ...touched, fullName: true })}
                  placeholder="Enter your full name"
                  className={`w-full pl-4 pr-4 py-3 rounded-xl border text-[14px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                    touched.fullName && !nameValid
                      ? 'border-red-300 focus:ring-red-500/20 focus:border-red-400'
                      : 'border-slate-200 focus:ring-emerald-500/20 focus:border-emerald-400'
                  }`}
                />
                {touched.fullName && !nameValid && (
                  <p className="text-[11px] text-red-500 mt-1 font-medium">Please enter your full name.</p>
                )}
              </div>
            )}

            <div>
              <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched({ ...touched, email: true })}
                  placeholder="you@company.com"
                  autoComplete="email"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border text-[14px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                    touched.email && !emailValid
                      ? 'border-red-300 focus:ring-red-500/20 focus:border-red-400'
                      : 'border-slate-200 focus:ring-emerald-500/20 focus:border-emerald-400'
                  }`}
                />
              </div>
              {touched.email && !emailValid && (
                <p className="text-[11px] text-red-500 mt-1 font-medium">Please enter a valid email address.</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[12px] font-semibold text-slate-700">Password</label>
                {mode === 'login' && (
                  <Link to="/reset-password" className="text-[12px] font-medium text-emerald-600 hover:text-emerald-700 transition-colors">
                    Forgot password?
                  </Link>
                )}
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => setTouched({ ...touched, password: true })}
                  placeholder={mode === 'login' ? 'Enter your password' : 'Min. 8 characters'}
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                  className={`w-full pl-10 pr-11 py-3 rounded-xl border text-[14px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                    touched.password && !passwordValid
                      ? 'border-red-300 focus:ring-red-500/20 focus:border-red-400'
                      : 'border-slate-200 focus:ring-emerald-500/20 focus:border-emerald-400'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {touched.password && !passwordValid && (
                <p className="text-[11px] text-red-500 mt-1 font-medium">Password must be at least 8 characters.</p>
              )}
            </div>

            {mode === 'login' && (
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setRememberMe(!rememberMe)}
                  className={`w-[18px] h-[18px] rounded-[5px] border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                    rememberMe ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300 hover:border-slate-400'
                  }`}
                >
                  {rememberMe && (
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
                <span className="text-[13px] text-slate-600 font-medium">Remember me for 30 days</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-400 disabled:cursor-not-allowed text-white text-[14px] font-semibold transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  {mode === 'login' ? 'Signing in...' : 'Creating account...'}
                </>
              ) : (
                <>
                  {mode === 'login' ? 'Sign In' : 'Create Account'}
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[13px] text-slate-500">
              {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button
                onClick={() => {
                  setMode(mode === 'login' ? 'signup' : 'login');
                  setError('');
                  setTouched({ email: false, password: false, fullName: false });
                }}
                className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
              >
                {mode === 'login' ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-[11px] text-slate-400">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span>Secured with 256-bit SSL encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
