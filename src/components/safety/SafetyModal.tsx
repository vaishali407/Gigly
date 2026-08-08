import React from 'react';
import { useGigly } from '../../context/GiglyContext';
import { X, ShieldCheck, AlertOctagon, EyeOff, UserCheck } from 'lucide-react';

export const SafetyModal: React.FC = () => {
  const { activeModal, closeModal } = useGigly();

  if (activeModal !== 'safety') return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#121814] border border-[#8CE600]/40 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 my-8">
        
        {/* Header */}
        <div className="p-5 bg-[#090D0A] border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#8CE600]/10 text-[#8CE600] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-white font-display">Community Guidelines & Safety</h2>
              <p className="text-xs text-gray-400">Gigly Platform Rules & Protection Standards</p>
            </div>
          </div>

          <button
            onClick={closeModal}
            className="p-2 rounded-xl text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-xs text-gray-300">
          
          {/* Prohibited Activities Box */}
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 space-y-3">
            <h3 className="text-sm font-extrabold text-rose-400 flex items-center gap-2">
              <AlertOctagon className="w-4 h-4" /> Strictly Prohibited Gigs & Activities
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Posting or offering any of the following tasks will lead to an immediate permanent ban:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-rose-300 font-semibold list-disc list-inside">
              <li>Illegal activities & contraband</li>
              <li>Weapons or explosives</li>
              <li>Dangerous/hazardous substances</li>
              <li>Sexual services or adult content</li>
              <li>Fraud, scams & financial abuse</li>
              <li>Account or password sharing</li>
              <li>Dangerous high-risk physical work</li>
              <li>Impersonation or stolen IDs</li>
            </ul>
          </div>

          {/* Privacy Rules */}
          <div className="p-4 rounded-2xl bg-[#090D0A] border border-gray-800 space-y-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <EyeOff className="w-4 h-4 text-[#8CE600]" /> Location Privacy Protection
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Gigly never publicly exposes a user's exact home address or GPS coordinates on marketplace feeds. All discovery is calculated using approximate neighborhood distance. Exact pickup/drop details are only shared between mutually agreed parties once an offer is accepted.
            </p>
          </div>

          {/* Age Safeguards */}
          <div className="p-4 rounded-2xl bg-[#090D0A] border border-gray-800 space-y-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-amber-400" /> Minor & Youth Safeguards
            </h3>
            <p className="text-gray-400 leading-relaxed">
              For users under 18 years of age, Gigly enforces age-appropriate task restrictions, adult guardian consent, and limits interactions to low-risk micro-gigs (e.g., tutoring, pet walking) to prevent exploitation or unsafe environments.
            </p>
          </div>

          {/* Reporting & Mutual Respect */}
          <div className="p-4 rounded-2xl bg-[#090D0A] border border-gray-800 space-y-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Mutual Respect & Fair Pay
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Both task posters and gig workers deserve fair negotiation, transparent communication, and timely reviews. If you encounter any suspicious activity, use the in-app "Report" or "Block User" options.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-[#090D0A] border-t border-gray-800 text-center">
          <button
            onClick={closeModal}
            className="bg-[#8CE600] text-black font-extrabold px-6 py-2.5 rounded-2xl text-xs hover:bg-[#78C800] transition-colors"
          >
            I Understand & Agree to Guidelines
          </button>
        </div>

      </div>
    </div>
  );
};
