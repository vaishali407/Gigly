import React, { useMemo } from 'react';
import { useGigly } from '../context/GiglyContext';
import { formatCurrency, getCategoryEmoji } from '../utils/helpers';
import { Search, ArrowUpDown, MapPin, Calendar, Star, ArrowRight, X } from 'lucide-react';

export const DiscoverPage: React.FC = () => {
  const { gigs, categories, filters, setFilter, resetFilters, navigate } = useGigly();

  const filteredGigs = useMemo(() => {
    return gigs.filter((gig) => {
      // Category filter
      if (filters.category !== 'all') {
        if (gig.category.toLowerCase() !== filters.category.toLowerCase()) {
          return false;
        }
      }

      // Max Distance filter
      if (gig.distanceKm > filters.distanceMax) {
        return false;
      }

      // Price Range filter
      if (gig.price < filters.priceMin || gig.price > filters.priceMax) {
        return false;
      }

      // Negotiable filter
      if (filters.negotiableOnly && !gig.isNegotiable) {
        return false;
      }

      // Search Query filter
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const matchTitle = gig.title.toLowerCase().includes(q);
        const matchDesc = gig.description.toLowerCase().includes(q);
        const matchLoc = gig.locationName.toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchLoc) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'highest_price') return b.price - a.price;
      if (filters.sortBy === 'lowest_price') return a.price - b.price;
      if (filters.sortBy === 'closest') return a.distanceKm - b.distanceKm;
      return 0;
    });
  }, [gigs, filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
          Find a Gig
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Explore local micro-tasks near you and earn money.
        </p>
      </div>

      {/* Filter Controls Box */}
      <div className="bg-[#121814] border border-gray-800 rounded-3xl p-5 shadow-xl space-y-5">
        
        {/* Search & Sort */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:flex-1">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search gigs by keyword, title, or location..."
              value={filters.searchQuery}
              onChange={(e) => setFilter('searchQuery', e.target.value)}
              className="w-full bg-[#090D0A] text-white placeholder-gray-500 text-sm rounded-2xl pl-12 pr-10 py-3.5 border border-gray-800 focus:border-[#8CE600] focus:outline-none"
            />
            {filters.searchQuery && (
              <button
                onClick={() => setFilter('searchQuery', '')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <ArrowUpDown className="w-4 h-4 text-[#8CE600] shrink-0" />
            <span className="text-xs text-gray-400 font-semibold shrink-0">Sort:</span>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilter('sortBy', e.target.value as any)}
              className="w-full md:w-auto bg-[#090D0A] text-white text-xs font-bold rounded-2xl px-4 py-3 border border-gray-800 focus:border-[#8CE600] focus:outline-none cursor-pointer"
            >
              <option value="newest">🆕 Newest</option>
              <option value="highest_price">💰 Highest Price</option>
              <option value="lowest_price">🏷️ Lowest Price</option>
              <option value="closest">📍 Closest</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setFilter('category', 'all')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
              filters.category === 'all'
                ? 'bg-[#8CE600] text-black shadow-md'
                : 'bg-[#090D0A] text-gray-300 hover:bg-gray-800 border border-gray-800'
            }`}
          >
            ✨ All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter('category', cat.name)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                filters.category.toLowerCase() === cat.name.toLowerCase()
                  ? 'bg-[#8CE600] text-black shadow-md'
                  : 'bg-[#090D0A] text-gray-300 hover:bg-gray-800 border border-gray-800'
              }`}
            >
              <span>{cat.emoji}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

      </div>

      {/* Gig Cards Feed */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGigs.map((gig) => (
          <div
            key={gig.id}
            className="p-6 rounded-3xl bg-[#121814] border border-gray-800 hover:border-[#8CE600]/60 transition-all flex flex-col justify-between group hover:shadow-2xl hover:scale-[1.01]"
          >
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="px-3 py-1 rounded-full bg-[#090D0A] border border-gray-800 text-xs font-bold text-gray-300 flex items-center gap-1">
                  <span>{getCategoryEmoji(gig.category)}</span>
                  <span>{gig.category}</span>
                </span>
                <span className="text-[10px] text-gray-500">{gig.createdAt}</span>
              </div>

              <h3 
                onClick={() => navigate(`/gigs/${gig.id}`)}
                className="text-lg font-bold text-white group-hover:text-[#8CE600] transition-colors cursor-pointer line-clamp-2 mb-2 font-display"
              >
                {gig.title}
              </h3>

              <p className="text-xs text-gray-400 line-clamp-2 mb-4 leading-relaxed">
                {gig.description}
              </p>

              <div className="p-3 rounded-2xl bg-[#090D0A] border border-gray-800 mb-4 flex items-center justify-between">
                <span className="text-xl font-extrabold text-[#8CE600]">
                  {formatCurrency(gig.price)}
                </span>
                <span className="text-[10px] font-bold text-amber-400">
                  {gig.isNegotiable ? '🤝 Negotiable' : 'Fixed Price'}
                </span>
              </div>

              <div className="space-y-1 text-xs text-gray-300 mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#8CE600] shrink-0" />
                  <span className="truncate">{gig.locationName}</span>
                  <span className="text-[10px] text-gray-500 shrink-0">({gig.distanceKm} km)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <span>{gig.date}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={gig.poster.avatar}
                  alt={gig.poster.name}
                  className="w-7 h-7 rounded-xl object-cover border border-[#8CE600]"
                />
                <span className="text-xs font-bold text-gray-300 flex items-center gap-1">
                  {gig.poster.name.split(' ')[0]}
                  <Star className="w-3 h-3 text-amber-400 fill-current" />
                  <span className="text-amber-400">{gig.poster.rating}</span>
                </span>
              </div>

              <button
                onClick={() => navigate(`/gigs/${gig.id}`)}
                className="bg-[#8CE600] hover:bg-[#78C800] text-black font-extrabold px-4 py-2 rounded-xl text-xs transition-all shadow-md flex items-center gap-1"
              >
                <span>View Gig</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
