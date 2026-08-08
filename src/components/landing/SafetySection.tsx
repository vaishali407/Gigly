import React from 'react';
import { useGigly } from '../../context/GiglyContext';
import { ShieldCheck, AlertTriangle, EyeOff, UserCheck, Flag } from 'lucide-react';

export const SafetySection: React.FC = () => {
  const { openModal } = useGigly();

  return (
    <section className="py-20 bg-[#0C120E] border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-extrabold uppercase tracking-widest inline-flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" /> Safety & Trust First
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            Built with Security, Privacy & Integrity
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Gigly strictly enforces community standards to keep both posters and gig workers safe.
          </p>
        </div>

        {/* 4 Key Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Pillar 1: Location Privacy */}
          <div className="p-6 rounded-3xl bg-[#121814] border border-gray-800 hover:border-[#8CE600]/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#8CE600]/10 text-[#8CE600] flex items-center justify-center mb-4">
              <EyeOff className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Approximate Location Only</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              We never expose your exact home address on public gig boards. Only general neighborhood areas are displayed for discovery.
            </p>
          </div>

          {/* Pillar 2: Prohibited Tasks */}
          <div className="p-6 rounded-3xl bg-[#121814] border border-gray-800 hover:border-rose-500/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Zero Illegal or Dangerous Tasks</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              We strictly prohibit illegal activities, weapons, dangerous substances, sexual services, scams, password sharing, and high-risk work.
            </p>
          </div>

          {/* Pillar 3: Age & Minor Protection */}
          <div className="p-6 rounded-3xl bg-[#121814] border border-gray-800 hover:border-amber-500/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
              <UserCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Age Safeguards & Verification</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Under-18 users are subject to safety restrictions and adult guardian consent to prevent exploitation or unsafe interactions.
            </p>
          </div>

          {/* Pillar 4: Reporting & Blocking */}
          <div className="p-6 rounded-3xl bg-[#121814] border border-gray-800 hover:border-blue-500/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4">
              <Flag className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Instant Report & Block</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              In-app controls let you report suspicious posts or block users immediately. Our moderators review flagged items 24/7.
            </p>
          </div>

        </div>

        {/* CTA to Open Full Guidelines Modal */}
        <div className="mt-10 text-center">
          <button
            onClick={() => openModal('safety')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#18201A] text-[#8CE600] font-bold text-xs border border-[#8CE600]/30 hover:bg-[#8CE600]/10 transition-colors"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Read Full Community Safety & Prohibited Tasks Guidelines</span>
          </button>
        </div>

      </div>
    </section>
  );
};
