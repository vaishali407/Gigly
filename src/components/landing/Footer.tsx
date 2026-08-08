import React from 'react';
import { useGigly } from '../../context/GiglyContext';
import { PlusCircle, Search, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onDiscoverClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onDiscoverClick }) => {
  const { openModal } = useGigly();

  return (
    <footer className="bg-[#050806] border-t border-gray-800 text-gray-400">
      
      {/* Final CTA Banner */}
      <div className="border-b border-gray-800/80 py-16 bg-gradient-to-b from-[#090D0A] to-[#050806]">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
            Ready to get things done? Or earn today?
          </h2>
          <p className="text-gray-300 text-base max-w-2xl mx-auto">
            Join thousands of neighbors posting tasks and turning free time into instant earnings on Gigly.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => openModal('create_gig')}
              className="w-full sm:w-auto bg-[#8CE600] hover:bg-[#78C800] text-black font-extrabold text-base px-8 py-4 rounded-2xl transition-all shadow-xl neon-glow flex items-center justify-center gap-2 hover:scale-105"
            >
              <PlusCircle className="w-5 h-5 stroke-[2.5]" />
              <span>Post a Gig Now</span>
            </button>
            <button
              onClick={onDiscoverClick}
              className="w-full sm:w-auto bg-[#121814] hover:bg-gray-800 text-white font-bold text-base px-8 py-4 rounded-2xl transition-all border border-gray-700 hover:border-[#8CE600]/40 flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5 text-[#8CE600]" />
              <span>Browse Micro-Gigs</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#8CE600] to-[#00FF66] p-0.5 shadow-lg">
                <div className="w-full h-full bg-[#090D0A] rounded-[14px] flex items-center justify-center">
                  <span className="gigly-logo-text text-xl">G</span>
                </div>
              </div>
              <span className="gigly-logo-text text-3xl tracking-tight">GIGLY</span>
            </div>

            <p className="text-sm text-gray-300 max-w-sm">
              <strong>"Got a task? Get it done."</strong><br />
              Supporting tagline: <i>"Got time? Turn it into money."</i>
            </p>
            <p className="text-xs text-gray-500">
              Gigly is a peer-to-peer micro-task platform connecting independent individuals. Gigly does not directly provide services or employ workers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Marketplace</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={onDiscoverClick} className="hover:text-[#8CE600] transition-colors">
                  Discover All Gigs
                </button>
              </li>
              <li>
                <button onClick={() => openModal('create_gig')} className="hover:text-[#8CE600] transition-colors">
                  Post a Micro-Task
                </button>
              </li>
              <li>
                <button onClick={() => openModal('auth')} className="hover:text-[#8CE600] transition-colors">
                  Signup / Account Switch
                </button>
              </li>
            </ul>
          </div>

          {/* Safety & Legal */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Safety & Trust</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => openModal('safety')} className="hover:text-[#8CE600] transition-colors flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#8CE600]" />
                  <span>Community Guidelines</span>
                </button>
              </li>
              <li>
                <button onClick={() => openModal('safety')} className="hover:text-[#8CE600] transition-colors">
                  Prohibited Activities List
                </button>
              </li>
              <li>
                <button onClick={() => openModal('safety')} className="hover:text-[#8CE600] transition-colors">
                  Minor & Age Safeguards
                </button>
              </li>
              <li>
                <button onClick={() => openModal('safety')} className="hover:text-[#8CE600] transition-colors">
                  Location Privacy Rule
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© 2026 Gigly Marketplace. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" /> for community empowerment.
          </p>
        </div>
      </div>

    </footer>
  );
};
