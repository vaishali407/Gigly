import React from 'react';
import { useGigly } from '../../context/GiglyContext';
import { ArrowRight } from 'lucide-react';

interface CategoriesSectionProps {
  onSelectCategory: (catId: string) => void;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({ onSelectCategory }) => {
  const { categories } = useGigly();

  return (
    <section className="py-20 bg-[#090D0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="px-3 py-1 rounded-full bg-[#8CE600]/10 text-[#8CE600] border border-[#8CE600]/30 text-xs font-extrabold uppercase tracking-widest">
              Popular Categories
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display mt-2">
              Explore Micro-Task Categories
            </h2>
          </div>
          <p className="text-gray-400 text-sm max-w-md">
            From quick parcel drop-offs to coding tuition and pet walking—find help or jobs in your neighborhood.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.name)}
              className="p-6 rounded-3xl bg-[#121814] border border-gray-800 hover:border-[#8CE600] transition-all cursor-pointer group hover:scale-[1.02] hover:shadow-xl neon-glow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl p-3 rounded-2xl bg-[#090D0A] border border-gray-800 group-hover:scale-110 transition-transform">
                  {cat.emoji}
                </span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#8CE600]/10 text-[#8CE600]">
                  {cat.count} gigs
                </span>
              </div>

              <h3 className="text-lg font-bold text-white group-hover:text-[#8CE600] transition-colors flex items-center justify-between">
                <span>{cat.name}</span>
                <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-[#8CE600] group-hover:translate-x-1 transition-all" />
              </h3>

              <p className="text-xs text-gray-400 mt-2 line-clamp-2">
                {cat.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
