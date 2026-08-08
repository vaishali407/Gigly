import React, { useState } from 'react';
import { useGigly } from '../context/GiglyContext';
import { Smartphone, Mail, Sparkles, ShieldCheck, ArrowRight, CheckCircle2, Coins, Users, KeyRound } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { loginWithPhoneOtp, loginWithGoogle, signUpUser } = useGigly();

  const [authTab, setAuthTab] = useState<'phone' | 'google' | 'signup'>('phone');

  // Phone OTP State
  const [phone, setPhone] = useState('');
  const [otpStep, setOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpError, setOtpError] = useState(false);

  // Google State
  const [googleEmail, setGoogleEmail] = useState('');

  // Signup State
  const [name, setName] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [location, setLocation] = useState('Indiranagar, Bengaluru');
  const [bio, setBio] = useState('Passionate about helping out with local micro-tasks.');
  const [goal, setGoal] = useState<'earn' | 'post'>('earn');

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) return;
    setOtpStep(true);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginWithPhoneOtp(phone, otpCode);
    if (!success) {
      setOtpError(true);
    }
  };

  const handleGoogleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!googleEmail.trim()) return;
    loginWithGoogle(googleEmail);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !emailOrPhone.trim()) return;
    signUpUser({
      name,
      emailOrPhone,
      location,
      bio,
      goal,
    });
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl space-y-8">
        
        {/* Brand Banner */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-[#8CE600] to-[#00FF66] p-1 shadow-2xl mx-auto neon-glow">
            <div className="w-full h-full bg-[#090D0A] rounded-[22px] flex items-center justify-center">
              <span className="gigly-logo-text text-4xl">G</span>
            </div>
          </div>

          <h1 className="gigly-logo-text text-4xl sm:text-5xl tracking-tight">GIGLY</h1>
          
          <p className="text-base text-gray-300 font-medium max-w-md mx-auto">
            "Got a task? Get it done. Got time? Turn it into money."
          </p>

          <span className="inline-block px-3.5 py-1.5 rounded-full bg-[#8CE600]/10 text-[#8CE600] border border-[#8CE600]/30 text-xs font-extrabold">
            Sign In or Create Your Account Below
          </span>
        </div>

        {/* Auth Method Selector Tabs */}
        <div className="p-1.5 rounded-2xl bg-[#121814] border border-gray-800 flex items-center gap-1">
          <button
            onClick={() => { setAuthTab('phone'); setOtpStep(false); }}
            className={`flex-1 py-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 ${
              authTab === 'phone'
                ? 'bg-[#8CE600] text-black shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Phone OTP</span>
          </button>

          <button
            onClick={() => setAuthTab('google')}
            className={`flex-1 py-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 ${
              authTab === 'google'
                ? 'bg-[#8CE600] text-black shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Google Gmail</span>
          </button>

          <button
            onClick={() => setAuthTab('signup')}
            className={`flex-1 py-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 ${
              authTab === 'signup'
                ? 'bg-[#8CE600] text-black shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Create Account</span>
          </button>
        </div>

        {/* Tab 1: Phone OTP Verification */}
        {authTab === 'phone' && (
          <div className="p-8 rounded-3xl bg-[#121814] border border-[#8CE600]/30 shadow-2xl space-y-6">
            {!otpStep ? (
              <form onSubmit={handleSendOtp} className="space-y-5">
                <div className="space-y-1">
                  <h3 className="text-xl font-extrabold text-white">Sign In with Phone Number</h3>
                  <p className="text-xs text-gray-400">We'll send a 4-digit SMS OTP code to verify your mobile number.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                    Mobile Phone Number
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[#8CE600]">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      placeholder="98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#090D0A] text-white text-sm font-bold rounded-2xl pl-14 pr-4 py-3.5 border border-gray-800 focus:border-[#8CE600] focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#8CE600] hover:bg-[#78C800] text-black font-extrabold py-4 rounded-2xl text-xs transition-all shadow-xl neon-glow flex items-center justify-center gap-2"
                >
                  <span>Send 4-Digit OTP Code</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-5 animate-in fade-in">
                <div className="p-3.5 rounded-2xl bg-[#18201A] border border-[#8CE600]/40 text-xs text-[#8CE600] flex items-center gap-2">
                  <KeyRound className="w-4 h-4 shrink-0" />
                  <span>SMS OTP Code sent to <strong>+91 {phone}</strong>. Use code <strong>1234</strong> to verify.</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                    Enter 4-Digit Verification Code
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={4}
                    placeholder="1234"
                    value={otpCode}
                    onChange={(e) => { setOtpCode(e.target.value); setOtpError(false); }}
                    className="w-full bg-[#090D0A] text-white text-2xl font-black text-center tracking-[0.5em] rounded-2xl p-4 border border-gray-800 focus:border-[#8CE600] focus:outline-none font-display"
                  />
                  {otpError && (
                    <p className="text-xs text-rose-400 mt-1">Invalid OTP code. Please enter 1234 to verify.</p>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setOtpStep(false)}
                    className="flex-1 bg-gray-800 text-white font-bold py-3.5 rounded-2xl text-xs"
                  >
                    Change Phone
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-[#8CE600] hover:bg-[#78C800] text-black font-extrabold py-3.5 rounded-2xl text-xs shadow-xl neon-glow flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                    <span>Verify & Sign In</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Tab 2: Google Gmail Sign In */}
        {authTab === 'google' && (
          <div className="p-8 rounded-3xl bg-[#121814] border border-[#8CE600]/30 shadow-2xl space-y-6">
            <div className="space-y-1">
              <h3 className="text-xl font-extrabold text-white">Sign In with Google / Gmail</h3>
              <p className="text-xs text-gray-400">One-click sign in using your Google Gmail account.</p>
            </div>

            <form onSubmit={handleGoogleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                  Gmail Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="yourname@gmail.com"
                    value={googleEmail}
                    onChange={(e) => setGoogleEmail(e.target.value)}
                    className="w-full bg-[#090D0A] text-white text-sm rounded-2xl pl-12 pr-4 py-3.5 border border-gray-800 focus:border-[#8CE600] focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#8CE600] hover:bg-[#78C800] text-black font-extrabold py-4 rounded-2xl text-xs transition-all shadow-xl neon-glow flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
                <span>Sign In with Google</span>
              </button>
            </form>
          </div>
        )}

        {/* Tab 3: Create Custom Account */}
        {authTab === 'signup' && (
          <div className="p-8 rounded-3xl bg-[#121814] border border-[#8CE600]/30 shadow-2xl space-y-6">
            <div className="space-y-1">
              <h3 className="text-xl font-extrabold text-white">Create Your Gigly Account</h3>
              <p className="text-xs text-gray-400">Set up your profile with your own name, location, and role intent.</p>
            </div>

            <form onSubmit={handleSignupSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                  Your Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 'Vaishali', 'Rahul Sharma', 'Ananya'"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#090D0A] text-white text-sm rounded-2xl p-3.5 border border-gray-800 focus:border-[#8CE600] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                  Email or Mobile Phone <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 'vaishali@gmail.com' or '+91 9876543210'"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  className="w-full bg-[#090D0A] text-white text-sm rounded-2xl p-3.5 border border-gray-800 focus:border-[#8CE600] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                  General Location / Neighborhood
                </label>
                <input
                  type="text"
                  placeholder="e.g. 'Indiranagar, Bengaluru'"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-[#090D0A] text-white text-sm rounded-2xl p-3.5 border border-gray-800 focus:border-[#8CE600] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                  Short Bio
                </label>
                <input
                  type="text"
                  placeholder="e.g. 'Passionate about helping out with local micro-tasks.'"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full bg-[#090D0A] text-white text-sm rounded-2xl p-3.5 border border-gray-800 focus:border-[#8CE600] focus:outline-none"
                />
              </div>

              {/* Goal Choice */}
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                  What is your primary intent?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setGoal('earn')}
                    className={`p-3 rounded-2xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                      goal === 'earn'
                        ? 'bg-amber-500/20 text-amber-400 border-amber-500/50'
                        : 'bg-[#090D0A] text-gray-400 border-gray-800'
                    }`}
                  >
                    <Coins className="w-4 h-4" />
                    <span>💰 I want to earn</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setGoal('post')}
                    className={`p-3 rounded-2xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                      goal === 'post'
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50'
                        : 'bg-[#090D0A] text-gray-400 border-gray-800'
                    }`}
                  >
                    <Users className="w-4 h-4" />
                    <span>🙋 Post a task</span>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#8CE600] hover:bg-[#78C800] text-black font-extrabold py-4 rounded-2xl text-xs transition-all shadow-xl neon-glow flex items-center justify-center gap-2 pt-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Create Account & Start</span>
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
