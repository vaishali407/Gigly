import React, { useState } from 'react';
import { useGigly } from '../../context/GiglyContext';
import { X, ShieldAlert } from 'lucide-react';

export const ReportModal: React.FC = () => {
  const { activeModal, closeModal, reportItem, selectedGigId, selectedUserId } = useGigly();

  const [reason, setReason] = useState('Safety or Scam Concern');
  const [details, setDetails] = useState('');

  if (activeModal !== 'report') return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const type = selectedGigId ? 'gig' : 'user';
    const targetId = selectedGigId || selectedUserId || 'unknown';
    reportItem(type, targetId, `${reason}: ${details}`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#121814] border border-rose-500/40 rounded-3xl w-full max-w-md p-6 space-y-4 shadow-2xl animate-in fade-in zoom-in-95">
        
        <div className="flex items-center justify-between border-b border-gray-800 pb-3">
          <div className="flex items-center gap-2 text-rose-400">
            <ShieldAlert className="w-5 h-5" />
            <h3 className="text-base font-extrabold text-white">Report Security Violation</h3>
          </div>

          <button onClick={closeModal} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
              Reason for Report
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full bg-[#090D0A] text-white text-xs rounded-2xl p-3 border border-gray-800 focus:border-rose-500 focus:outline-none"
            >
              <option value="Prohibited or Illegal Task">Illegal or Prohibited Activity</option>
              <option value="Safety or Scam Concern">Safety Hazard or Financial Scam</option>
              <option value="Harassment or Inappropriate">Harassment or Offensive Behavior</option>
              <option value="Fake Account or Fraud">Fake Profile or Impersonation</option>
              <option value="Other Violation">Other Policy Violation</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
              Additional Details
            </label>
            <textarea
              rows={3}
              required
              placeholder="Describe what happened to help our moderation team investigate..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full bg-[#090D0A] text-white text-xs rounded-2xl p-3 border border-gray-800 focus:border-rose-500 focus:outline-none"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={closeModal}
              className="flex-1 bg-gray-800 text-white font-bold py-2.5 rounded-xl text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-rose-500 hover:bg-rose-400 text-white font-extrabold py-2.5 rounded-xl text-xs transition-colors"
            >
              Submit Report
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
