import React, { useState } from 'react';
import { useGigly } from '../context/GiglyContext';
import { formatCurrency, getCategoryEmoji } from '../utils/helpers';
import { MapPin, Calendar, Clock, Star, Handshake, MessageSquare, ArrowLeft } from 'lucide-react';

interface GigDetailsPageProps {
  gigId: string;
}

export const GigDetailsPage: React.FC<GigDetailsPageProps> = ({ gigId }) => {
  const { gigs, currentUser, navigate, makeOffer } = useGigly();

  const gig = gigs.find(g => g.id === gigId);

  const [showOfferForm, setShowOfferForm] = useState(false);
  const [customPrice, setCustomPrice] = useState<number>(gig ? gig.price : 300);
  const [offerNote, setOfferNote] = useState('');

  if (!gig) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Gig Not Found</h2>
        <p className="text-xs text-gray-400">The task you requested may have been removed or completed.</p>
        <button
          onClick={() => navigate('/gigs')}
          className="bg-[#8CE600] text-black font-extrabold px-6 py-2.5 rounded-2xl text-xs"
        >
          Back to Discover Gigs
        </button>
      </div>
    );
  }

  const isPoster = gig.posterId === currentUser.id;

  const handleOfferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    makeOffer(gig.id, customPrice, offerNote || `Proposed offer: ₹${customPrice}`);
    setShowOfferForm(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back button */}
      <button
        onClick={() => navigate('/gigs')}
        className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-[#8CE600] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Find a Gig</span>
      </button>

      {/* Main Single Gig Focused Card */}
      <div className="p-8 rounded-3xl bg-[#121814] border border-[#8CE600]/30 shadow-2xl space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-800 pb-6">
          <div className="space-y-1">
            <span className="px-3 py-1 rounded-full bg-[#090D0A] border border-gray-800 text-xs font-bold text-gray-300 inline-flex items-center gap-1.5">
              <span>{getCategoryEmoji(gig.category)}</span>
              <span>{gig.category}</span>
            </span>
            <h1 className="text-3xl font-extrabold text-white font-display mt-2">{gig.title}</h1>
            <p className="text-xs text-gray-400">Posted {gig.createdAt}</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#090D0A] border border-gray-800 text-right shrink-0">
            <span className="text-3xl font-black text-[#8CE600] font-display">
              {formatCurrency(gig.acceptedPrice || gig.price)}
            </span>
            <p className="text-xs font-bold text-amber-400 mt-1">
              {gig.isNegotiable ? '🤝 Negotiable Price' : 'Fixed Price'}
            </p>
          </div>
        </div>

        {/* Task Description */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Task Description</h3>
          <p className="text-sm text-gray-200 leading-relaxed whitespace-pre-line bg-[#090D0A] p-5 rounded-2xl border border-gray-800">
            {gig.description}
          </p>
        </div>

        {/* Location, Date & Duration Meta */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-[#090D0A] border border-gray-800 space-y-1">
            <span className="text-xs font-semibold text-gray-400 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#8CE600]" /> Approximate Location
            </span>
            <p className="text-sm font-bold text-white">{gig.locationName}</p>
            <span className="text-[10px] text-gray-500">📍 {gig.distanceKm} km away</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#090D0A] border border-gray-800 space-y-1">
            <span className="text-xs font-semibold text-gray-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#8CE600]" /> Date & Time
            </span>
            <p className="text-sm font-bold text-white">{gig.date}</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#090D0A] border border-gray-800 space-y-1">
            <span className="text-xs font-semibold text-gray-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#8CE600]" /> Estimated Duration
            </span>
            <p className="text-sm font-bold text-white">{gig.estimatedDuration || '1 hour'}</p>
          </div>
        </div>

        {/* Poster Mini Profile */}
        <div className="p-5 rounded-2xl bg-[#18201A] border border-emerald-500/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <img
              src={gig.poster.avatar}
              alt={gig.poster.name}
              className="w-14 h-14 rounded-2xl object-cover border-2 border-[#8CE600]"
            />
            <div>
              <h4 className="text-base font-extrabold text-white">{gig.poster.name}</h4>
              <p className="text-xs text-amber-400 flex items-center gap-1 mt-0.5">
                <Star className="w-3.5 h-3.5 fill-current" /> {gig.poster.rating} · ({gig.poster.reviewCount} reviews)
              </p>
              <p className="text-[11px] text-gray-400 mt-0.5">{gig.poster.location}</p>
            </div>
          </div>

          <button
            onClick={() => navigate('/profile')}
            className="text-xs text-[#8CE600] font-bold hover:underline"
          >
            View Full Profile
          </button>
        </div>

        {/* Inline Negotiation Form if open */}
        {showOfferForm && (
          <form onSubmit={handleOfferSubmit} className="p-5 rounded-2xl bg-[#090D0A] border border-amber-500/40 space-y-4 animate-in fade-in">
            <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2">
              <Handshake className="w-4 h-4" /> Propose Your Counter Offer
            </h4>

            <div>
              <label className="block text-xs text-gray-400 mb-1">Your Price Offer (₹)</label>
              <input
                type="number"
                min="50"
                max="10000"
                step="50"
                value={customPrice}
                onChange={(e) => setCustomPrice(Number(e.target.value))}
                className="w-full bg-[#121814] text-white font-bold text-sm rounded-xl p-3 border border-gray-800 focus:border-[#8CE600] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1">Short Note</label>
              <input
                type="text"
                placeholder="e.g. 'Available to do this immediately'"
                value={offerNote}
                onChange={(e) => setOfferNote(e.target.value)}
                className="w-full bg-[#121814] text-white text-xs rounded-xl p-3 border border-gray-800 focus:outline-none"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowOfferForm(false)}
                className="flex-1 bg-gray-800 text-white font-bold py-2.5 rounded-xl text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-amber-500 text-black font-extrabold py-2.5 rounded-xl text-xs"
              >
                Send Offer ₹{customPrice}
              </button>
            </div>
          </form>
        )}

        {/* Action Buttons */}
        {!isPoster ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-800">
            <button
              onClick={() => setShowOfferForm(!showOfferForm)}
              className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/50 font-extrabold py-4 px-6 rounded-2xl transition-all text-sm flex items-center justify-center gap-2"
            >
              <Handshake className="w-5 h-5" />
              <span>Make an Offer</span>
            </button>

            <button
              onClick={() => navigate('/chat')}
              className="bg-[#8CE600] hover:bg-[#78C800] text-black font-extrabold py-4 px-6 rounded-2xl transition-all shadow-xl neon-glow text-sm flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-5 h-5 stroke-[2.5]" />
              <span>Message Poster</span>
            </button>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-[#090D0A] border border-gray-800 text-center text-xs text-gray-400">
            You posted this gig. Manage offers and responses in your <button onClick={() => navigate('/dashboard')} className="text-[#8CE600] font-bold underline">Dashboard</button>.
          </div>
        )}

      </div>
    </div>
  );
};
