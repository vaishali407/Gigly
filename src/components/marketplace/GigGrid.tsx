import React, { useMemo } from 'react';
import { useGigly } from '../../context/GiglyContext';
import { GigCard } from './GigCard';
import { Sparkles, Inbox, RefreshCw } from 'lucide-react';

export const GigGrid: React.FC = () => {
  const { gigs, filters, resetFilters, userRoleMode } = useGigly();

  const filteredGigs = useMemo(() => {
    return gigs.filter((gig) => {
      // Role filter guidance
      if (userRoleMode === 'worker' && gig.status !== 'open' && gig.status !== 'negotiating') {
        // workers looking for open gigs primarily
      }

      // Category filter
      if (filters.category !== 'all') {
        if (gig.category.toLowerCase() !== filters.category.toLowerCase()) {
          return false;
        }
      }

      // Negotiable filter
      if (filters.negotiableOnly && !gig.isNegotiable) {
        return false;
      }

      // Max Distance filter
      if (gig.distanceKm > filters.distanceMax) {
        return false;
      }

      // Price Range filter
      if (gig.price < filters.priceMin || gig.price > filters.priceMax) {
        return false;
      }

      // Search Query filter
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const matchTitle = gig.title.toLowerCase().includes(q);
        const matchDesc = gig.description.toLowerCase().includes(q);
        const matchLoc = gig.locationName.toLowerCase().includes(q);
        const matchPoster = gig.poster.name.toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchLoc && !matchPoster) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'highest_price') return b.price - a.price;
      if (filters.sortBy === 'lowest_price') return a.price - b.price;
      if (filters.sortBy === 'closest') return a.distanceKm - b.distanceKm;
      // newest default
      return 0;
    });
  }, [gigs, filters, userRoleMode]);

  return (
    <div className="space-y-6">
      
      {/* Results Header Counter */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#8CE600]" />
          <h2 className="text-lg font-extrabold text-white">
            Available Micro-Gigs
          </h2>
          <span className="px-2.5 py-0.5 rounded-full bg-[#8CE600]/10 text-[#8CE600] border border-[#8CE600]/30 text-xs font-bold">
            {filteredGigs.length} found
          </span>
        </div>

        {filters.category !== 'all' || filters.searchQuery || filters.negotiableOnly ? (
          <button
            onClick={resetFilters}
            className="text-xs text-gray-400 hover:text-[#8CE600] flex items-center gap-1"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Clear active filters
          </button>
        ) : null}
      </div>

      {/* Grid or Empty Fallback */}
      {filteredGigs.length === 0 ? (
        <div className="py-16 text-center bg-[#121814] border border-gray-800 rounded-3xl p-8 space-y-4">
          <div className="w-16 h-16 rounded-full bg-gray-800/80 text-gray-400 flex items-center justify-center mx-auto">
            <Inbox className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white">No gigs matched your criteria</h3>
          <p className="text-xs text-gray-400 max-w-md mx-auto">
            Try adjusting your search terms, increasing max distance, or resetting category filters.
          </p>
          <button
            onClick={resetFilters}
            className="bg-[#8CE600] text-black font-bold px-5 py-2.5 rounded-2xl text-xs hover:bg-[#78C800] transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGigs.map((gig) => (
            <GigCard key={gig.id} gig={gig} />
          ))}
        </div>
      )}

    </div>
  );
};
