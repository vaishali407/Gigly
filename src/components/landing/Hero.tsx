import React from 'react';
import { useGigly } from '../../context/GiglyContext';
import { PlusCircle, Search, Sparkles, Zap, Coins, Users } from 'lucide-react';

interface HeroProps {
  onDiscoverClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onDiscoverClick }) => {
  const { openModal, filters, setFilter } = useGigly();

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
      
      {/* Background Neon Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#8CE600]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-[#00FF66]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Tagline Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#121814] border border-[#8CE600]/30 shadow-lg text-xs sm:text-sm font-semibold text-gray-200">
            <Sparkles className="w-4 h-4 text-[#8CE600] animate-spin" style={{ animationDuration: '6s' }} />
            <span>Peer-to-Peer Micro-Gig Marketplace</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#8CE600]" />
            <span className="text-[#8CE600] font-bold">100% Free Peer Connect</span>
          </div>
        </div>

        {/* Main Headline & Subheading */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] font-display">
            Got a task? <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8CE600] via-[#00FF66] to-[#78C800] neon-text-glow">
              Get it done.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Gigly connects people who need things done with people ready to get them done.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => openModal('create_gig')}
              className="w-full sm:w-auto bg-[#8CE600] hover:bg-[#78C800] text-black font-extrabold text-base px-8 py-4 rounded-2xl transition-all shadow-xl neon-glow flex items-center justify-center gap-3 hover:scale-105 active:scale-95"
            >
              <PlusCircle className="w-5 h-5 stroke-[2.5]" />
              <span>Post a Gig</span>
            </button>

            <button
              onClick={onDiscoverClick}
              className="w-full sm:w-auto bg-[#121814] hover:bg-gray-800 text-white font-extrabold text-base px-8 py-4 rounded-2xl transition-all border border-gray-700 hover:border-[#8CE600]/50 flex items-center justify-center gap-3 hover:scale-105 active:scale-95"
            >
              <Search className="w-5 h-5 text-[#8CE600]" />
              <span>Find Gigs</span>
            </button>
          </div>

          {/* Quick Hero Search Input */}
          <div className="max-w-xl mx-auto mt-8 p-2 rounded-2xl bg-[#121814]/90 border border-gray-800 shadow-2xl flex items-center gap-3">
            <Search className="w-5 h-5 text-gray-400 ml-3" />
            <input
              type="text"
              placeholder="Try searching 'parcel delivery', 'moving help', 'pet walk'..."
              value={filters.searchQuery}
              onChange={(e) => setFilter('searchQuery', e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') onDiscoverClick();
              }}
              className="w-full bg-transparent text-white placeholder-gray-500 text-sm focus:outline-none py-2"
            />
            <button
              onClick={onDiscoverClick}
              className="bg-[#8CE600] text-black font-bold px-4 py-2 rounded-xl text-xs hover:bg-[#78C800] transition-colors"
            >
              Search
            </button>
          </div>
        </div>

        {/* Dual-Sided Marketplace Diagram (Modern Visual Widget) */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#121814] to-[#0A0F0D] border border-[#8CE600]/30 shadow-2xl relative overflow-hidden">
            
            <div className="text-center mb-6">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#8CE600]">
                How The Platform Connects You
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              
              {/* Left Side: Poster */}
              <div className="p-5 rounded-2xl bg-[#18201A] border border-emerald-500/20 text-center hover:border-emerald-500/50 transition-all">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">Need Help? 🙋</h3>
                <p className="text-xs text-gray-400">Post a task in 60 secs, set your price, pick a trusted helper.</p>
                <div className="mt-3 inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-bold">
                  Task Poster
                </div>
              </div>

              {/* Center: Gigly Hub */}
              <div className="text-center relative py-4">
                <div className="hidden md:flex items-center justify-between text-gray-500 font-extrabold text-xs mb-2">
                  <span>← Negotiate</span>
                  <span>Connect →</span>
                </div>
                <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-[#8CE600] to-[#00FF66] p-1 shadow-2xl neon-glow">
                  <div className="w-full h-full bg-[#090D0A] rounded-[22px] flex flex-col items-center justify-center text-center">
                    <span className="gigly-logo-text text-2xl">G</span>
                    <span className="text-[9px] font-extrabold text-[#8CE600] tracking-wider uppercase">Gigly</span>
                  </div>
                </div>
                <p className="text-xs font-bold text-[#8CE600] mt-3">Smart Marketplace</p>
              </div>

              {/* Right Side: Worker */}
              <div className="p-5 rounded-2xl bg-[#18201A] border border-amber-500/20 text-center hover:border-amber-500/50 transition-all">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
                  <Coins className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">Want to Earn? 💰</h3>
                <p className="text-xs text-gray-400">Find nearby micro-tasks, submit offers, earn instant cash.</p>
                <div className="mt-3 inline-block px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-[11px] font-bold">
                  Gig Worker
                </div>
              </div>

            </div>

            {/* Supporting Tagline */}
            <div className="mt-6 pt-4 border-t border-gray-800 text-center flex items-center justify-center gap-2 text-xs font-medium text-gray-400">
              <Zap className="w-4 h-4 text-[#8CE600]" />
              <span>Alternative supporting tagline: </span>
              <strong className="text-white font-bold">"Got time? Turn it into money."</strong>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
