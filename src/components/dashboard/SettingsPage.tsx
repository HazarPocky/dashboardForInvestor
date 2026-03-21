import React, { useState, useEffect } from 'react';
import { User, Lock, Bell, Shield, Save, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

const SettingsPage: React.FC = () => {
  const { profile, user, session, updateProfile, updatePassword } = useAuth();

  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications'>('profile');
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const [profileData, setProfileData] = useState({
    full_name: '',
    email: '',
    phone: '',
    company: '',
    address: '',
  });

  // Populate from profile
  useEffect(() => {
    if (profile) {
      setProfileData({
        full_name: profile.full_name || '',
        email: profile.email || user?.email || '',
        phone: profile.phone || '',
        company: profile.company || '',
        address: profile.address || '',
      });
    }
  }, [profile, user]);

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [notifPrefs, setNotifPrefs] = useState({
    emailNewDocs: true,
    emailDealUpdates: true,
    emailReports: true,
    emailDigest: false,
  });

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileLoading(true);

    const { error } = await updateProfile({
      full_name: profileData.full_name,
      phone: profileData.phone,
      company: profileData.company,
      address: profileData.address,
    });

    setProfileLoading(false);

    if (error) {
      toast({
        title: 'Error',
        description: error,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Profile Updated',
        description: 'Your profile information has been saved successfully.',
      });
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: 'Password Mismatch',
        description: 'New password and confirmation do not match.',
        variant: 'destructive',
      });
      return;
    }
    if (passwordData.newPassword.length < 8) {
      toast({
        title: 'Password Too Short',
        description: 'Password must be at least 8 characters long.',
        variant: 'destructive',
      });
      return;
    }

    setPasswordLoading(true);
    const { error } = await updatePassword(passwordData.newPassword);
    setPasswordLoading(false);

    if (error) {
      toast({
        title: 'Error',
        description: error,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Password Updated',
        description: 'Your password has been changed successfully.',
      });
      setPasswordData({ newPassword: '', confirmPassword: '' });
    }
  };

  const handleNotifSave = () => {
    toast({
      title: 'Preferences Saved',
      description: 'Your notification preferences have been updated.',
    });
  };

  const lastSignIn = session?.user?.last_sign_in_at
    ? new Date(session.user.last_sign_in_at).toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      })
    : 'N/A';

  const memberSince = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      })
    : 'N/A';

  const tabs = [
    { id: 'profile' as const, label: 'Profile', icon: User },
    { id: 'security' as const, label: 'Security', icon: Lock },
    { id: 'notifications' as const, label: 'Notifications', icon: Bell },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Settings</h2>
        <p className="text-[13px] text-slate-500 mt-1">
          Manage your account settings, security, and notification preferences.
        </p>
      </div>

      <div className="flex items-center gap-1 mb-6 bg-slate-100 rounded-lg p-1 w-fit">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-[13px] font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Icon size={15} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-xl border border-slate-200/80 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h3 className="text-[15px] font-semibold text-slate-900">Personal Information</h3>
            <p className="text-[12px] text-slate-500 mt-0.5">Update your personal details and contact information.</p>
          </div>
          <form onSubmit={handleProfileSave} className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="sm:col-span-2">
                <label className="block text-[12px] font-medium text-slate-700 mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={profileData.full_name}
                  onChange={(e) => setProfileData({ ...profileData, full_name: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-[13px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all"
                />
              </div>
              <div>
                <label className="block text-[12px] font-medium text-slate-700 mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={profileData.email}
                  disabled
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-[13px] text-slate-500 bg-slate-50 cursor-not-allowed"
                />
                <p className="text-[11px] text-slate-400 mt-1">Email cannot be changed here.</p>
              </div>
              <div>
                <label className="block text-[12px] font-medium text-slate-700 mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-[13px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all"
                />
              </div>
              <div>
                <label className="block text-[12px] font-medium text-slate-700 mb-1.5">Company / Entity</label>
                <input
                  type="text"
                  value={profileData.company}
                  onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                  placeholder="Your company name"
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-[13px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all"
                />
              </div>
              <div>
                <label className="block text-[12px] font-medium text-slate-700 mb-1.5">Address</label>
                <input
                  type="text"
                  value={profileData.address}
                  onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                  placeholder="Your address"
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-[13px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all"
                />
              </div>
            </div>
            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button
                type="submit"
                disabled={profileLoading}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-400 text-white text-[13px] font-medium transition-colors"
              >
                {profileLoading ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
                {profileLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="space-y-5">
          <div className="bg-white rounded-xl border border-slate-200/80 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100">
              <h3 className="text-[15px] font-semibold text-slate-900">Change Password</h3>
              <p className="text-[12px] text-slate-500 mt-0.5">Update your password to keep your account secure.</p>
            </div>
            <form onSubmit={handlePasswordChange} className="p-6">
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-[12px] font-medium text-slate-700 mb-1.5">New Password</label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      className="w-full px-3 py-2.5 pr-10 rounded-lg border border-slate-200 text-[13px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all"
                      placeholder="Min. 8 characters"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-slate-700 mb-1.5">Confirm New Password</label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-[13px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all"
                    placeholder="Confirm new password"
                  />
                </div>
              </div>
              <div className="flex justify-end pt-6 mt-6 border-t border-slate-100">
                <button
                  type="submit"
                  disabled={passwordLoading}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-400 text-white text-[13px] font-medium transition-colors"
                >
                  {passwordLoading ? <Loader2 size={15} className="animate-spin" /> : <Lock size={15} />}
                  {passwordLoading ? 'Updating...' : 'Update Password'}
                </button>
              </div>
            </form>
          </div>

          <div className="bg-white rounded-xl border border-slate-200/80 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100">
              <h3 className="text-[15px] font-semibold text-slate-900">Account Security</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                    <Shield size={18} className="text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-slate-900">Two-Factor Authentication</p>
                    <p className="text-[12px] text-slate-500">Add an extra layer of security to your account</p>
                  </div>
                </div>
                <span className="text-[12px] font-medium text-slate-400 bg-slate-200 px-3 py-1 rounded-md">Coming Soon</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div>
                  <p className="text-[13px] font-medium text-slate-900">Last Login</p>
                  <p className="text-[12px] text-slate-500">{lastSignIn}</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div>
                  <p className="text-[13px] font-medium text-slate-900">Account Status</p>
                  <p className="text-[12px] text-slate-500">Member since {memberSince}</p>
                </div>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">Active</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="bg-white rounded-xl border border-slate-200/80 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h3 className="text-[15px] font-semibold text-slate-900">Email Notifications</h3>
            <p className="text-[12px] text-slate-500 mt-0.5">Choose what email notifications you'd like to receive.</p>
          </div>
          <div className="p-6 space-y-4">
            {[
              { key: 'emailNewDocs' as const, label: 'New Documents', desc: 'Get notified when new documents are uploaded to your account' },
              { key: 'emailDealUpdates' as const, label: 'Deal Updates', desc: 'Receive updates about your active investments' },
              { key: 'emailReports' as const, label: 'Quarterly Reports', desc: 'Get notified when new quarterly reports are available' },
              { key: 'emailDigest' as const, label: 'Weekly Digest', desc: 'Receive a weekly summary of all account activity' },
            ].map((pref) => (
              <div key={pref.key} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div>
                  <p className="text-[13px] font-medium text-slate-900">{pref.label}</p>
                  <p className="text-[12px] text-slate-500">{pref.desc}</p>
                </div>
                <button
                  onClick={() => setNotifPrefs({ ...notifPrefs, [pref.key]: !notifPrefs[pref.key] })}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    notifPrefs[pref.key] ? 'bg-emerald-500' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                      notifPrefs[pref.key] ? 'translate-x-[22px]' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            ))}
            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button
                onClick={handleNotifSave}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-[13px] font-medium transition-colors"
              >
                <Save size={15} />
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
