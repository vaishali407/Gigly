import React from 'react';
import type { Gig } from '../../types';
import { useGigly } from '../../context/GiglyContext';
import { formatCurrency, getCategoryEmoji, getStatusBadgeStyle } from '../../utils/helpers';
import { MapPin, Calendar, Star, Handshake, ArrowRight, AlertCircle } from 'lucide-react';

interface GigCardProps {
  gig: Gig;
}

export const GigCard: React.FC<GigCardProps> = ({ gig }) => {
  const { openModal, currentUser } = useGigly();

  const isOwner = gig.posterId === currentUser.id;

  return (
    <div className="p-6 rounded-3xl bg-[#121814] border border-gray-800 hover:border-[#8CE600]/60 transition-all duration-200 flex flex-col justify-between group hover:shadow-2xl hover:scale-[1.01] relative overflow-hidden">
      
      {/* Urgent Highlight Stripe if urgent */}
      {gig.urgent && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-[#8CE600]" />
      )}

      <div>
        {/* Top Meta: Category & Status / Urgent */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#090D0A] border border-gray-800 text-xs font-bold text-gray-300 flex items-center gap-1.5">
              <span>{getCategoryEmoji(gig.category)}</span>
              <span>{gig.category}</span>
            </span>

            {gig.urgent && (
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 text-[10px] font-extrabold uppercase animate-pulse flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> Urgent
              </span>
            )}
          </div>

          <span className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider border ${getStatusBadgeStyle(gig.status)}`}>
            {gig.status.replace('_', ' ')}
          </span>
        </div>

        {/* Gig Title */}
        <h3 
          onClick={() => openModal('gig_details', { gigId: gig.id })}
          className="text-lg font-bold text-white group-hover:text-[#8CE600] transition-colors cursor-pointer line-clamp-2 mb-2 font-display"
        >
          {gig.title}
        </h3>

        {/* Short Description */}
        <p className="text-xs text-gray-400 line-clamp-2 mb-4 leading-relaxed">
          {gig.description}
        </p>

        {/* Price & Negotiable Badge */}
        <div className="p-3.5 rounded-2xl bg-[#090D0A] border border-gray-800/80 mb-4 flex items-center justify-between">
          <div>
            <div className="text-xl font-extrabold text-[#8CE600]">
              {formatCurrency(gig.price)}
            </div>
            {gig.isNegotiable ? (
              <span className="text-[10px] font-bold text-amber-400 flex items-center gap-1">
                <Handshake className="w-3 h-3" /> Price Negotiable
              </span>
            ) : (
              <span className="text-[10px] font-bold text-gray-500">Fixed Price</span>
            )}
          </div>

          <div className="text-right text-[11px] text-gray-400">
            <p className="font-semibold text-gray-300">{gig.offersCount} offers</p>
            <p className="text-[10px] text-gray-500">{gig.createdAt}</p>
          </div>
        </div>

        {/* Location & Date */}
        <div className="space-y-1.5 text-xs text-gray-300 mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#8CE600] shrink-0" />
            <span className="truncate">{gig.locationName}</span>
            <span className="text-[10px] text-gray-500 shrink-0">({gig.distanceKm} km away)</span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <span>{gig.date}</span>
            {gig.estimatedDuration && (
              <span className="text-gray-500 text-[11px]">· {gig.estimatedDuration}</span>
            )}
          </div>
        </div>
      </div>

      {/* Footer Poster Info & CTA */}
      <div className="pt-4 border-t border-gray-800/80 flex items-center justify-between gap-3">
        
        {/* Customer Profile Snippet */}
        <button
          onClick={() => openModal('profile', { userId: gig.poster.id })}
          className="flex items-center gap-2 hover:opacity-85 text-left"
        >
          <img
            src={gig.poster.avatar}
            alt={gig.poster.name}
            className="w-8 h-8 rounded-xl object-cover border border-[#8CE600]"
          />
          <div>
            <p className="text-xs font-bold text-white leading-tight truncate max-w-[100px]">
              {gig.poster.name}
            </p>
            <p className="text-[10px] text-amber-400 flex items-center gap-0.5">
              <Star className="w-2.5 h-2.5 fill-current" /> {gig.poster.rating}
            </p>
          </div>
        </button>

        {/* Action CTAs */}
        <div className="flex items-center gap-2">
          {gig.isNegotiable && gig.status === 'open' && !isOwner && (
            <button
              onClick={() => openModal('negotiate', { gigId: gig.id })}
              className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 px-3 py-2 rounded-xl text-xs font-bold transition-all"
            >
              Offer
            </button>
          )}

          <button
            onClick={() => openModal('gig_details', { gigId: gig.id })}
            className="bg-[#8CE600] hover:bg-[#78C800] text-black font-extrabold px-4 py-2 rounded-xl text-xs transition-all shadow-md flex items-center gap-1 group-hover:scale-105"
          >
            <span>View Gig</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
          </button>
        </div>

      </div>

    </div>
  );
};
