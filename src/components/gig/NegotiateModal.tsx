import React, { useState } from 'react';
import { useGigly } from '../../context/GiglyContext';
import { formatCurrency } from '../../utils/helpers';
import { X, Handshake, History, Send } from 'lucide-react';

export const NegotiateModal: React.FC = () => {
  const { activeModal, closeModal, selectedGigId, gigs, offers, makeOffer } = useGigly();

  if (activeModal !== 'negotiate' || !selectedGigId) return null;

  const gig = gigs.find(g => g.id === selectedGigId);
  if (!gig) return null;

  const gigOffers = offers.filter(o => o.gigId === gig.id);
  const [offerPrice, setOfferPrice] = useState<number>(gig.price);
  const [note, setNote] = useState('');

  const handleSendOffer = (e: React.FormEvent) => {
    e.preventDefault();
    makeOffer(gig.id, offerPrice, note || `Proposed price: ₹${offerPrice}`);
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#121814] border border-amber-500/40 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 my-8">
        
        {/* Modal Header */}
        <div className="p-5 bg-[#090D0A] border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Handshake className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-white font-display">Negotiate & Make an Offer</h2>
              <p className="text-xs text-gray-400 truncate max-w-xs">{gig.title}</p>
            </div>
          </div>

          <button
            onClick={closeModal}
            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Poster Starting Price Card */}
          <div className="p-4 rounded-2xl bg-[#090D0A] border border-gray-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-gray-400">Poster's Starting Price</span>
              <p className="text-xl font-extrabold text-[#8CE600]">{formatCurrency(gig.price)}</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/30">
              🤝 Open to negotiation
            </span>
          </div>

          {/* Offer History Timeline */}
          {gigOffers.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                <History className="w-3.5 h-3.5 text-amber-400" /> Negotiation History
              </h4>
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {gigOffers.map((off) => (
                  <div key={off.id} className="p-3 rounded-2xl bg-[#18201A] border border-gray-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <img src={off.senderAvatar} alt={off.senderName} className="w-7 h-7 rounded-xl object-cover" />
                      <div>
                        <span className="font-bold text-white">{off.senderName}</span>
                        <p className="text-[10px] text-gray-400">{off.note || `Offered ₹${off.amount}`}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-extrabold text-amber-400">₹{off.amount}</span>
                      <p className="text-[10px] text-gray-500 capitalize">{off.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Offer Form */}
          <form onSubmit={handleSendOffer} className="space-y-5 pt-2 border-t border-gray-800">
            
            {/* Interactive Slider & Price Input */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                  Your Proposed Offer Price (₹)
                </label>
                <span className="text-2xl font-black text-[#8CE600] font-display">
                  ₹{offerPrice}
                </span>
              </div>

              <input
                type="range"
                min={Math.max(50, Math.floor(gig.price * 0.5))}
                max={Math.floor(gig.price * 1.5)}
                step="50"
                value={offerPrice}
                onChange={(e) => setOfferPrice(Number(e.target.value))}
                className="w-full accent-[#8CE600] cursor-pointer"
              />

              <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                <span>Min: ₹{Math.max(50, Math.floor(gig.price * 0.5))}</span>
                <span>Asking: ₹{gig.price}</span>
                <span>Max: ₹{Math.floor(gig.price * 1.5)}</span>
              </div>
            </div>

            {/* Note Input */}
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                Note for Poster (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. 'I am nearby and can complete it within 30 mins!'"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full bg-[#090D0A] text-white placeholder-gray-500 text-sm rounded-2xl p-3.5 border border-gray-800 focus:border-[#8CE600] focus:outline-none"
              />
            </div>

            {/* Quick Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={closeModal}
                className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-bold py-3.5 rounded-2xl text-xs transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="flex-1 bg-amber-500 hover:bg-amber-400 text-black font-extrabold py-3.5 rounded-2xl text-xs transition-all shadow-xl neon-glow flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 stroke-[2.5]" />
                <span>Submit Offer (₹{offerPrice})</span>
              </button>
            </div>

          </form>

        </div>

      </div>
    </div>
  );
};
