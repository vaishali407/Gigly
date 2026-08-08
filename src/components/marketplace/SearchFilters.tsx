import React from 'react';
import { useGigly } from '../../context/GiglyContext';
import { Search, ArrowUpDown, X, MapPin, Tag } from 'lucide-react';

export const SearchFilters: React.FC = () => {
  const { categories, filters, setFilter, resetFilters } = useGigly();

  return (
    <div className="bg-[#121814] border border-gray-800 rounded-3xl p-5 shadow-xl space-y-5">
      
      {/* Top Search Bar & Sort Dropdown */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Live Search Input */}
        <div className="relative w-full md:flex-1">
          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search gigs by title, location, description (e.g. 'parcel', 'moving', 'pet')..."
            value={filters.searchQuery}
            onChange={(e) => setFilter('searchQuery', e.target.value)}
            className="w-full bg-[#090D0A] text-white placeholder-gray-500 text-sm rounded-2xl pl-12 pr-10 py-3.5 border border-gray-800 focus:border-[#8CE600] focus:outline-none transition-colors"
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

        {/* Sort Select */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <ArrowUpDown className="w-4 h-4 text-[#8CE600] shrink-0" />
          <span className="text-xs text-gray-400 font-semibold shrink-0">Sort by:</span>
          <select
            value={filters.sortBy}
            onChange={(e) => setFilter('sortBy', e.target.value as any)}
            className="w-full md:w-auto bg-[#090D0A] text-white text-xs font-bold rounded-2xl px-4 py-3 border border-gray-800 focus:border-[#8CE600] focus:outline-none cursor-pointer"
          >
            <option value="newest">🆕 Newest Posted</option>
            <option value="highest_price">💰 Highest Price</option>
            <option value="lowest_price">🏷️ Lowest Price</option>
            <option value="closest">📍 Closest Distance</option>
          </select>
        </div>

      </div>

      {/* Category Pills */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Categories</span>
          {filters.category !== 'all' && (
            <button
              onClick={() => setFilter('category', 'all')}
              className="text-xs text-[#8CE600] hover:underline"
            >
              Show all
            </button>
          )}
        </div>
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

      {/* Secondary Controls: Distance, Price, Negotiable Toggle */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-gray-800/80 items-center">
        
        {/* Distance Slider */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#8CE600]" /> Max Distance:
            </span>
            <span className="text-white font-bold">{filters.distanceMax} km</span>
          </div>
          <input
            type="range"
            min="1"
            max="50"
            value={filters.distanceMax}
            onChange={(e) => setFilter('distanceMax', Number(e.target.value))}
            className="w-full accent-[#8CE600] cursor-pointer"
          />
        </div>

        {/* Max Price Filter */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-[#8CE600]" /> Max Price:
            </span>
            <span className="text-[#8CE600] font-bold">₹{filters.priceMax}</span>
          </div>
          <input
            type="range"
            min="100"
            max="5000"
            step="100"
            value={filters.priceMax}
            onChange={(e) => setFilter('priceMax', Number(e.target.value))}
            className="w-full accent-[#8CE600] cursor-pointer"
          />
        </div>

        {/* Negotiable Toggle & Reset */}
        <div className="flex items-center justify-between sm:justify-end gap-4">
          <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-300">
            <input
              type="checkbox"
              checked={filters.negotiableOnly}
              onChange={(e) => setFilter('negotiableOnly', e.target.checked)}
              className="w-4 h-4 rounded accent-[#8CE600]"
            />
            <span>Negotiable Only 🤝</span>
          </label>

          <button
            onClick={resetFilters}
            className="text-xs text-gray-400 hover:text-[#8CE600] underline"
          >
            Reset
          </button>
        </div>

      </div>

    </div>
  );
};
