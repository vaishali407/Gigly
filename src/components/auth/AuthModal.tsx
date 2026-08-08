import React, { useState } from 'react';
import { useGigly } from '../../context/GiglyContext';
import { X, Sparkles, Coins, Users, Check, ArrowRight, Mail, Lock } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { activeModal, closeModal, switchUser, setUserRoleMode, showToast } = useGigly();

  const [mode, setMode] = useState<'onboarding' | 'login' | 'signup'>('onboarding');
  const [onboardingGoal, setOnboardingGoal] = useState<'earn' | 'post'>('earn');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (activeModal !== 'auth' && activeModal !== 'onboarding') return null;

  const handleOnboardingContinue = () => {
    if (onboardingGoal === 'earn') {
      setUserRoleMode('worker');
      showToast('💰 Welcome to Gigly! We set your initial view to Worker mode.');
    } else {
      setUserRoleMode('poster');
      showToast('🙋 Welcome to Gigly! We set your initial view to Poster mode.');
    }
    closeModal();
  };

  const handleCustomAuth = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(`Successfully authenticated as ${email || 'Gigly Member'}`);
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#121814] border border-[#8CE600]/40 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 my-8">
        
        {/* Header */}
        <div className="p-5 bg-[#090D0A] border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="gigly-logo-text text-2xl">GIGLY</span>
            <span className="text-xs text-[#8CE600] font-bold">Account Hub</span>
          </div>

          <button
            onClick={closeModal}
            className="p-2 rounded-xl text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {/* Onboarding View: "What brings you to Gigly?" */}
          {mode === 'onboarding' ? (
            <div className="space-y-5">
              <div className="text-center space-y-2">
                <span className="px-3 py-1 rounded-full bg-[#8CE600]/10 text-[#8CE600] border border-[#8CE600]/30 text-xs font-bold">
                  Onboarding Step 1 of 2
                </span>
                <h3 className="text-xl font-extrabold text-white font-display">
                  What brings you to Gigly?
                </h3>
                <p className="text-xs text-gray-400">
                  Select your primary initial intent. You can switch between posting and completing gigs anytime!
                </p>
              </div>

              <div className="space-y-3">
                {/* Option A: I want to earn */}
                <div
                  onClick={() => setOnboardingGoal('earn')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-4 ${
                    onboardingGoal === 'earn'
                      ? 'bg-amber-500/10 border-amber-400 text-white shadow-lg'
                      : 'bg-[#090D0A] border-gray-800 text-gray-400 hover:border-gray-700'
                  }`}
                >
                  <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
                    <Coins className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>💰 I want to earn</span>
                      {onboardingGoal === 'earn' && <Check className="w-4 h-4 text-amber-400" />}
                    </h4>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                      Find gigs and earn money by completing quick local tasks in your free time.
                    </p>
                  </div>
                </div>

                {/* Option B: I need something done */}
                <div
                  onClick={() => setOnboardingGoal('post')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-4 ${
                    onboardingGoal === 'post'
                      ? 'bg-emerald-500/10 border-emerald-400 text-white shadow-lg'
                      : 'bg-[#090D0A] border-gray-800 text-gray-400 hover:border-gray-700'
                  }`}
                >
                  <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>🙋 I need something done</span>
                      {onboardingGoal === 'post' && <Check className="w-4 h-4 text-emerald-400" />}
                    </h4>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                      Post a task in 60 seconds and find reliable nearby neighbors to help.
                    </p>
                  </div>
                </div>
              </div>

              {/* Dual-role Note */}
              <div className="p-3 rounded-xl bg-[#090D0A] border border-gray-800 text-[11px] text-gray-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#8CE600] shrink-0" />
                <span><strong>No permanent locks!</strong> Every account can both post tasks and earn money.</span>
              </div>

              <button
                onClick={handleOnboardingContinue}
                className="w-full bg-[#8CE600] hover:bg-[#78C800] text-black font-extrabold py-3.5 rounded-2xl text-xs transition-all shadow-xl neon-glow flex items-center justify-center gap-2"
              >
                <span>Continue to Marketplace</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>

              <div className="text-center pt-2">
                <button
                  onClick={() => setMode('login')}
                  className="text-xs text-gray-400 hover:text-[#8CE600] underline"
                >
                  Already have an account? Sign in with Email / Google
                </button>
              </div>
            </div>
          ) : (
            /* Login / Signup form */
            <form onSubmit={handleCustomAuth} className="space-y-4">
              <h3 className="text-lg font-extrabold text-white text-center">
                {mode === 'login' ? 'Sign In to Gigly' : 'Create Free Account'}
              </h3>

              <div className="space-y-3">
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#090D0A] text-white text-xs rounded-2xl pl-10 pr-4 py-3 border border-gray-800 focus:border-[#8CE600] focus:outline-none"
                  />
                </div>

                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#090D0A] text-white text-xs rounded-2xl pl-10 pr-4 py-3 border border-gray-800 focus:border-[#8CE600] focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#8CE600] hover:bg-[#78C800] text-black font-extrabold py-3 rounded-2xl text-xs transition-colors shadow-lg"
              >
                {mode === 'login' ? 'Sign In' : 'Sign Up'}
              </button>

              {/* Demo Account Switcher Buttons */}
              <div className="pt-4 border-t border-gray-800 text-center space-y-2">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Or Instant Fast Demo Sign-In
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      switchUser('user_rahul');
                      closeModal();
                    }}
                    className="p-2.5 rounded-xl bg-[#090D0A] border border-gray-800 hover:border-[#8CE600] text-xs font-bold text-gray-200"
                  >
                    Rahul Sharma (4.8⭐)
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      switchUser('user_ananya');
                      closeModal();
                    }}
                    className="p-2.5 rounded-xl bg-[#090D0A] border border-gray-800 hover:border-[#8CE600] text-xs font-bold text-gray-200"
                  >
                    Ananya Patel (4.9⭐)
                  </button>
                </div>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
