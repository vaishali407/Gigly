import React from 'react';
import { useGigly } from '../../context/GiglyContext';
import { CheckCircle2 } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useGigly();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-[100] animate-bounce">
      <div className="bg-[#121814] text-white border border-[#8CE600]/40 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-md neon-glow-sm">
        <CheckCircle2 className="w-5 h-5 text-[#8CE600]" />
        <span className="text-sm font-semibold text-gray-100">{toastMessage}</span>
      </div>
    </div>
  );
};
