import React from 'react';
import { ShieldCheck, EyeOff, AlertOctagon, UserCheck, Flag } from 'lucide-react';

export const SafetyPage: React.FC = () => {

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
          Community Guidelines & Safety
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Safety rules, privacy protection, and community standards on Gigly.
        </p>
      </div>

      {/* Grid of Guidelines */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* 1. Safe Communication */}
        <div className="p-6 rounded-3xl bg-[#121814] border border-gray-800 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-[#8CE600]/10 text-[#8CE600] flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Safe Communication</h3>
          <p className="text-xs text-gray-300 leading-relaxed">
            Always use Gigly's in-app messaging for negotiation and scheduling. Never transfer payments outside the agreed platform offers.
          </p>
        </div>

        {/* 2. Meeting Safely */}
        <div className="p-6 rounded-3xl bg-[#121814] border border-gray-800 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <UserCheck className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Meeting Safely</h3>
          <p className="text-xs text-gray-300 leading-relaxed">
            Meet in well-lit, public places whenever possible. Verify user ratings and reviews on public profiles before accepting task requests.
          </p>
        </div>

        {/* 3. Approximate Locations */}
        <div className="p-6 rounded-3xl bg-[#121814] border border-gray-800 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-[#8CE600]/10 text-[#8CE600] flex items-center justify-center">
            <EyeOff className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Approximate Locations Only</h3>
          <p className="text-xs text-gray-300 leading-relaxed">
            We protect your privacy. Public gig cards only show general neighborhood distances. Exact addresses are only shared after a task offer is accepted.
          </p>
        </div>

        {/* 4. Prohibited Tasks */}
        <div className="p-6 rounded-3xl bg-[#121814] border border-rose-500/30 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center">
            <AlertOctagon className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Strictly Prohibited Gigs</h3>
          <p className="text-xs text-rose-300 leading-relaxed">
            Illegal tasks, weapons, hazardous materials, sexual services, financial scams, account sharing, and high-risk activities are strictly prohibited.
          </p>
        </div>

        {/* 5. Reporting & Blocking */}
        <div className="p-6 rounded-3xl bg-[#121814] border border-gray-800 space-y-3 md:col-span-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <Flag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Reporting & Blocking Users</h3>
              <p className="text-xs text-gray-400">Moderators review reported profiles 24/7 to maintain community trust.</p>
            </div>
          </div>

          <p className="text-xs text-gray-300 leading-relaxed pt-2 border-t border-gray-800">
            If you encounter suspicious behavior, inappropriate messages, or policy violations, use the in-app "Report Gig" or "Report User" actions immediately.
          </p>
        </div>

      </div>

    </div>
  );
};
