import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Eye, EyeOff, ArrowLeft, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

const UpdatePassword: React.FC = () => {
  const { updatePassword } = useAuth();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [touched, setTouched] = useState({ password: false, confirm: false });

  const passwordValid = password.length >= 8;
  const passwordsMatch = password === confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ password: true, confirm: true });

    if (!passwordValid || !passwordsMatch) return;

    setLoading(true);
    setError('');

    const { error: err } = await updatePassword(password);
    setLoading(false);

    if (err) {
      setError(err);
    } else {
      setSuccess(true);
      setTimeout(() => navigate('/', { replace: true }), 2000);
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
            <h1 className="text-lg font-bold text-slate-900">Apex Capital</h1>
            <p className="text-[11px] text-slate-500 font-medium">Investor Portal</p>
          </div>
        </div>

        {success ? (
          <div className="animate-fade-in">
            <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-5">
              <CheckCircle2 size={28} className="text-emerald-500" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Password updated</h2>
            <p className="text-[14px] text-slate-500 leading-relaxed">
              Your password has been successfully updated. Redirecting you to the dashboard...
            </p>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900">Set new password</h2>
              <p className="text-[14px] text-slate-500 mt-1.5">
                Enter your new password below. It must be at least 8 characters long.
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
                <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">New Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => setTouched({ ...touched, password: true })}
                    placeholder="Min. 8 characters"
                    autoComplete="new-password"
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

              <div>
                <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">Confirm Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onBlur={() => setTouched({ ...touched, confirm: true })}
                    placeholder="Re-enter your password"
                    autoComplete="new-password"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border text-[14px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                      touched.confirm && !passwordsMatch
                        ? 'border-red-300 focus:ring-red-500/20 focus:border-red-400'
                        : 'border-slate-200 focus:ring-emerald-500/20 focus:border-emerald-400'
                    }`}
                  />
                </div>
                {touched.confirm && !passwordsMatch && (
                  <p className="text-[11px] text-red-500 mt-1 font-medium">Passwords do not match.</p>
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
                    Updating password...
                  </>
                ) : (
                  'Update Password'
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

export default UpdatePassword;
