import React from 'react';
import { useGigly } from '../context/GiglyContext';
import { formatCurrency, getCategoryEmoji } from '../utils/helpers';
import { Search, PlusCircle, ArrowRight, Sparkles } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { currentUser, gigs, navigate } = useGigly();

  // Recommended Gigs: maximum 3 cards
  const recommendedGigs = gigs.filter(g => g.posterId !== currentUser.id && g.status === 'open').slice(0, 3);

  // Active Gig (if applicable)
  const activeGig = gigs.find(g => (g.posterId === currentUser.id || g.assignedWorkerId === currentUser.id) && (g.status === 'in_progress' || g.status === 'accepted'));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* 1. Personalized Greeting & Short Tagline */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8CE600]/10 text-[#8CE600] border border-[#8CE600]/30 text-xs font-extrabold">
          <Sparkles className="w-3.5 h-3.5 text-[#8CE600]" />
          <span>Peer-to-Peer Micro-Task Platform</span>
        </div>
        
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
          Welcome back, {currentUser.name.split(' ')[0]} 👋
        </h1>

        <p className="text-base sm:text-lg text-gray-300 max-w-xl font-medium leading-relaxed">
          "Got a task? Get it done. Got time? Turn it into money."
        </p>
      </div>

      {/* 2. Two Large Action Cards: Find a Gig vs Post a Gig */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Find a Gig */}
        <div 
          onClick={() => navigate('/gigs')}
          className="p-8 rounded-3xl bg-[#121814] border border-gray-800 hover:border-[#8CE600] transition-all cursor-pointer group hover:scale-[1.02] hover:shadow-2xl space-y-4 relative overflow-hidden"
        >
          <div className="w-14 h-14 rounded-2xl bg-[#8CE600]/10 text-[#8CE600] flex items-center justify-center group-hover:scale-110 transition-transform">
            <Search className="w-7 h-7 stroke-[2.5]" />
          </div>

          <div>
            <h2 className="text-2xl font-extrabold text-white group-hover:text-[#8CE600] transition-colors font-display">
              Find a Gig
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Browse nearby micro-tasks and earn money on your schedule.
            </p>
          </div>

          <div className="flex items-center text-xs font-extrabold text-[#8CE600] gap-2 pt-2">
            <span>Explore Gigs Marketplace</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Post a Gig */}
        <div 
          onClick={() => navigate('/post')}
          className="p-8 rounded-3xl bg-gradient-to-tr from-[#121814] to-[#1A241C] border border-[#8CE600]/40 hover:border-[#8CE600] transition-all cursor-pointer group hover:scale-[1.02] hover:shadow-2xl space-y-4 relative overflow-hidden neon-glow-sm"
        >
          <div className="w-14 h-14 rounded-2xl bg-[#8CE600] text-black flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
            <PlusCircle className="w-7 h-7 stroke-[2.5]" />
          </div>

          <div>
            <h2 className="text-2xl font-extrabold text-white font-display">
              Post a Gig
            </h2>
            <p className="text-xs text-gray-300 mt-1">
              Describe your task, set your price, and get it done fast.
            </p>
          </div>

          <div className="flex items-center text-xs font-extrabold text-[#8CE600] gap-2 pt-2">
            <span>Create a Task in 5 Steps</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

      </div>

      {/* 3. Your Active Gig Section (If applicable) */}
      {activeGig && (
        <div className="p-6 rounded-3xl bg-[#18201A] border border-emerald-500/30 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Your Active Gig
            </span>
            <span className="text-xs text-gray-400 font-medium">
              Status: <strong className="text-white uppercase">{activeGig.status.replace('_', ' ')}</strong>
            </span>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-lg font-bold text-white">{activeGig.title}</h3>
              <p className="text-xs text-gray-400">{activeGig.locationName} · {activeGig.date}</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xl font-extrabold text-[#8CE600]">
                {formatCurrency(activeGig.acceptedPrice || activeGig.price)}
              </span>

              <button
                onClick={() => navigate(`/gigs/${activeGig.id}`)}
                className="bg-[#8CE600] text-black font-extrabold px-4 py-2 rounded-xl text-xs hover:bg-[#78C800]"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Recommended Gigs (3 Cards Maximum) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-extrabold text-white font-display">
            Recommended Gigs
          </h3>

          <button
            onClick={() => navigate('/gigs')}
            className="text-xs text-[#8CE600] hover:underline font-bold flex items-center gap-1"
          >
            <span>View All Gigs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {recommendedGigs.map(gig => (
            <div
              key={gig.id}
              onClick={() => navigate(`/gigs/${gig.id}`)}
              className="p-5 rounded-2xl bg-[#121814] border border-gray-800 hover:border-[#8CE600]/50 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-gray-300 flex items-center gap-1">
                    <span>{getCategoryEmoji(gig.category)}</span>
                    <span>{gig.category}</span>
                  </span>
                  <span className="text-[10px] text-gray-500">{gig.createdAt}</span>
                </div>

                <h4 className="text-sm font-bold text-white group-hover:text-[#8CE600] transition-colors line-clamp-2 mb-2">
                  {gig.title}
                </h4>
              </div>

              <div className="pt-3 border-t border-gray-800/80 flex items-center justify-between">
                <span className="text-base font-extrabold text-[#8CE600]">
                  {formatCurrency(gig.price)}
                </span>
                <span className="text-[11px] text-gray-400">📍 {gig.distanceKm} km</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
