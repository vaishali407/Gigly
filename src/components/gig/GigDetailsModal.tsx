import React from 'react';
import { useGigly } from '../../context/GiglyContext';
import { formatCurrency, getCategoryEmoji, getStatusBadgeStyle } from '../../utils/helpers';
import { X, MapPin, Calendar, Star, Handshake, MessageSquare, ShieldCheck, Flag, CheckCircle2 } from 'lucide-react';

export const GigDetailsModal: React.FC = () => {
  const { activeModal, closeModal, selectedGigId, gigs, currentUser, openModal, acceptOffer, offers, updateGigStatus, makeOffer } = useGigly();

  if (activeModal !== 'gig_details' || !selectedGigId) return null;

  const gig = gigs.find(g => g.id === selectedGigId);
  if (!gig) return null;

  const isPoster = gig.posterId === currentUser.id;
  const gigOffers = offers.filter(o => o.gigId === gig.id);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#121814] border border-[#8CE600]/30 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 my-8">
        
        {/* Modal Top Header */}
        <div className="p-6 bg-[#090D0A] border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl p-2 rounded-2xl bg-[#121814] border border-gray-800">
              {getCategoryEmoji(gig.category)}
            </span>
            <div>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${getStatusBadgeStyle(gig.status)}`}>
                {gig.status.replace('_', ' ')}
              </span>
              <p className="text-xs text-gray-400 mt-0.5">Posted {gig.createdAt}</p>
            </div>
          </div>

          <button
            onClick={closeModal}
            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Details */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Title & Price Row */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl font-extrabold text-white font-display leading-tight">{gig.title}</h2>
              <span className="text-xs font-bold text-[#8CE600]">{gig.category} Category</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#090D0A] border border-gray-800 text-right shrink-0">
              <span className="text-2xl font-black text-[#8CE600]">
                {formatCurrency(gig.acceptedPrice || gig.price)}
              </span>
              <p className="text-[10px] font-bold text-amber-400">
                {gig.isNegotiable ? '🤝 Negotiable Price' : 'Fixed Price'}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="p-4 rounded-2xl bg-[#090D0A] border border-gray-800 space-y-2">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Task Description</h4>
            <p className="text-sm text-gray-200 leading-relaxed whitespace-pre-line">{gig.description}</p>
          </div>

          {/* Meta Grid: Location & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-[#090D0A] border border-gray-800 flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#8CE600] shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-white mb-0.5">Approximate Location</h5>
                <p className="text-gray-300">{gig.locationName}</p>
                <span className="text-[10px] text-gray-500">📍 {gig.distanceKm} km away from you</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#090D0A] border border-gray-800 flex items-start gap-3">
              <Calendar className="w-5 h-5 text-[#8CE600] shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-white mb-0.5">Date & Estimated Time</h5>
                <p className="text-gray-300">{gig.date}</p>
                <span className="text-[10px] text-gray-500">⏱️ Est. {gig.estimatedDuration || '1 hour'}</span>
              </div>
            </div>
          </div>

          {/* Customer / Poster Profile Card */}
          <div className="p-4 rounded-2xl bg-[#18201A] border border-emerald-500/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={gig.poster.avatar}
                alt={gig.poster.name}
                className="w-12 h-12 rounded-2xl object-cover border-2 border-[#8CE600]"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-extrabold text-white">{gig.poster.name}</h4>
                  <span className="text-[10px] font-bold text-[#8CE600] px-2 py-0.5 rounded-full bg-[#8CE600]/10">
                    Poster
                  </span>
                </div>
                <p className="text-xs text-amber-400 flex items-center gap-1 mt-0.5">
                  <Star className="w-3 h-3 fill-current" /> {gig.poster.rating} · ({gig.poster.reviewCount} reviews)
                </p>
                <p className="text-[10px] text-gray-400 mt-0.5">{gig.poster.location}</p>
              </div>
            </div>

            <button
              onClick={() => openModal('profile', { userId: gig.poster.id })}
              className="text-xs text-[#8CE600] hover:underline font-bold"
            >
              View Profile
            </button>
          </div>

          {/* Active Offers History Timeline if poster viewing */}
          {isPoster && gigOffers.length > 0 && (
            <div className="p-4 rounded-2xl bg-[#090D0A] border border-gray-800 space-y-3">
              <h4 className="text-xs font-bold text-[#8CE600] uppercase tracking-wider flex items-center gap-1.5">
                <Handshake className="w-4 h-4" /> Received Offers ({gigOffers.length})
              </h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {gigOffers.map((off) => (
                  <div key={off.id} className="p-3 rounded-xl bg-[#121814] border border-gray-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <img src={off.senderAvatar} alt={off.senderName} className="w-7 h-7 rounded-xl object-cover" />
                      <div>
                        <span className="font-bold text-white">{off.senderName}</span>
                        <p className="text-[10px] text-gray-400">{off.note || 'No note attached'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-extrabold text-[#8CE600]">₹{off.amount}</span>
                      {off.status === 'pending' && gig.status === 'open' && (
                        <button
                          onClick={() => acceptOffer(off.id)}
                          className="bg-[#8CE600] text-black font-extrabold px-3 py-1 rounded-lg text-[11px] hover:bg-[#78C800]"
                        >
                          Accept
                        </button>
                      )}
                      {off.status === 'accepted' && (
                        <span className="text-[10px] text-emerald-400 font-extrabold">Accepted</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ACTION BUTTONS */}
          <div className="pt-4 border-t border-gray-800 space-y-3">
            {!isPoster ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Accept Price Button */}
                <button
                  onClick={() => {
                    makeOffer(gig.id, gig.price, 'Accepted starting asking price');
                    closeModal();
                  }}
                  className="bg-[#8CE600] hover:bg-[#78C800] text-black font-extrabold py-3.5 px-4 rounded-2xl transition-all shadow-lg neon-glow text-xs flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                  <span>Accept ₹{gig.price}</span>
                </button>

                {/* Make an Offer Button (Prominent if Negotiable) */}
                {gig.isNegotiable && (
                  <button
                    onClick={() => {
                      closeModal();
                      openModal('negotiate', { gigId: gig.id });
                    }}
                    className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/50 font-extrabold py-3.5 px-4 rounded-2xl transition-all text-xs flex items-center justify-center gap-1.5"
                  >
                    <Handshake className="w-4 h-4" />
                    <span>Make an Offer</span>
                  </button>
                )}

                {/* Message Customer Button */}
                <button
                  onClick={() => {
                    closeModal();
                    openModal('chat', { convGigId: gig.id });
                  }}
                  className="bg-[#18201A] hover:bg-gray-800 text-white font-bold py-3.5 px-4 rounded-2xl transition-all border border-gray-700 text-xs flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-4 h-4 text-[#8CE600]" />
                  <span>Message Poster</span>
                </button>
              </div>
            ) : (
              /* Poster Controls */
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-[#090D0A] border border-gray-800">
                <span className="text-xs font-semibold text-gray-400">
                  You are the poster of this gig.
                </span>

                <div className="flex gap-2">
                  {gig.status === 'accepted' && (
                    <button
                      onClick={() => updateGigStatus(gig.id, 'in_progress')}
                      className="bg-purple-500 text-white text-xs font-bold px-4 py-2 rounded-xl"
                    >
                      Start Task
                    </button>
                  )}

                  {gig.status === 'in_progress' && (
                    <button
                      onClick={() => updateGigStatus(gig.id, 'completed')}
                      className="bg-[#8CE600] text-black text-xs font-extrabold px-4 py-2 rounded-xl"
                    >
                      Mark Completed
                    </button>
                  )}

                  <button
                    onClick={() => {
                      closeModal();
                      openModal('chat', { convGigId: gig.id });
                    }}
                    className="bg-gray-800 text-white text-xs font-bold px-4 py-2 rounded-xl"
                  >
                    View Chat Messages
                  </button>
                </div>
              </div>
            )}

            {/* Safety Report Disclaimer */}
            <div className="flex items-center justify-between text-[11px] text-gray-500 pt-2">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#8CE600]" />
                Gigly Protection & Community Safeguards
              </span>

              <button
                onClick={() => openModal('report', { gigId: gig.id })}
                className="hover:text-rose-400 flex items-center gap-1 transition-colors"
              >
                <Flag className="w-3 h-3" /> Report Gig
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
