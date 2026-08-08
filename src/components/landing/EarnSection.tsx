import React from 'react';
import { Clock, ShieldCheck, Banknote, Sparkles, ArrowRight } from 'lucide-react';

interface EarnSectionProps {
  onDiscoverClick: () => void;
}

export const EarnSection: React.FC<EarnSectionProps> = ({ onDiscoverClick }) => {
  return (
    <section className="py-20 bg-gradient-to-[#090D0A] via-[#101712] to-[#090D0A] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Text */}
          <div className="space-y-6">
            <span className="px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-extrabold uppercase tracking-widest inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Earn On Your Schedule
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display leading-tight">
              Turn your free time into <span className="text-[#8CE600]">extra income.</span>
            </h2>
            <p className="text-gray-300 text-base leading-relaxed">
              Have 1 hour between classes? Heading across town anyway? Put your free time to work by helping neighbors with errands, deliveries, and tech support.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-2xl bg-[#8CE600]/10 text-[#8CE600] border border-[#8CE600]/30 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Total Freedom & Flexibility</h4>
                  <p className="text-xs text-gray-400">Choose when, where, and which tasks you accept. No fixed hours.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-2xl bg-[#8CE600]/10 text-[#8CE600] border border-[#8CE600]/30 shrink-0">
                  <Banknote className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Transparent Price Negotiation</h4>
                  <p className="text-xs text-gray-400">Counter-offer starting prices to ensure fair compensation for your effort.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-2xl bg-[#8CE600]/10 text-[#8CE600] border border-[#8CE600]/30 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Dual Role Account</h4>
                  <p className="text-xs text-gray-400">Post a task today when you need help, and earn money completing tasks tomorrow.</p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={onDiscoverClick}
                className="bg-[#8CE600] hover:bg-[#78C800] text-black font-extrabold px-7 py-3.5 rounded-2xl transition-all shadow-xl neon-glow flex items-center gap-2"
              >
                <span>Browse Available Gigs</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          </div>

          {/* Right Visual Card Mockup */}
          <div className="relative">
            <div className="p-6 rounded-3xl bg-[#121814] border border-[#8CE600]/30 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
                    alt="Rahul"
                    className="w-12 h-12 rounded-2xl object-cover border border-[#8CE600]"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white">Rahul Sharma</h4>
                    <p className="text-xs text-[#8CE600]">⭐ 4.8 · 42 gigs completed</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#8CE600]/10 text-[#8CE600] text-xs font-bold">
                  Top Earner
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#090D0A] border border-gray-800 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">This Month's Earnings:</span>
                  <span className="text-[#8CE600] font-extrabold text-sm">₹12,450</span>
                </div>
                <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-[#8CE600] to-[#00FF66] h-full w-[78%]" />
                </div>
                <p className="text-[11px] text-gray-500 text-right">18 tasks completed this month</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#18201A] border border-emerald-500/20 text-xs text-gray-300">
                💬 <i>"I earn extra pocket money by helping hostel students move boxes & pick up packages between my classes!"</i>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
