import React, { useState } from 'react';
import { useGigly } from '../../context/GiglyContext';
import { formatCurrency } from '../../utils/helpers';
import { X, Send, Handshake, Flag, MessageSquare } from 'lucide-react';

export const ChatDrawer: React.FC = () => {
  const { activeModal, closeModal, selectedConversationGigId, gigs, messages, sendMessage, acceptOffer, currentUser, reportItem } = useGigly();

  const [inputText, setInputText] = useState('');
  const activeGig = gigs.find(g => g.id === selectedConversationGigId) || gigs[0];
  const [quickOfferPrice, setQuickOfferPrice] = useState(activeGig ? activeGig.price : 300);

  if (activeModal !== 'chat') return null;
  if (!activeGig) return null;

  const otherUser = activeGig.posterId === currentUser.id ? (activeGig.assignedWorker || {
    id: 'user_ananya',
    name: 'Ananya Patel',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300',
  }) : activeGig.poster;

  const chatMessages = messages.filter(m => m.gigId === activeGig.id);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(activeGig.id, otherUser.id, inputText);
    setInputText('');
  };

  const handleSendQuickOffer = () => {
    sendMessage(activeGig.id, otherUser.id, `Proposed price offer: ₹${quickOfferPrice}`, {
      id: `off_${Date.now()}`,
      gigId: activeGig.id,
      senderId: currentUser.id,
      receiverId: otherUser.id,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      amount: Number(quickOfferPrice),
      status: 'pending',
      createdAt: 'Just now',
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#121814] border border-[#8CE600]/30 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 my-8 h-[80vh] flex flex-col">
        
        {/* Chat Top Header with Gig Context */}
        <div className="p-4 bg-[#090D0A] border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={otherUser.avatar} alt={otherUser.name} className="w-10 h-10 rounded-2xl object-cover border border-[#8CE600]" />
            <div>
              <h3 className="text-sm font-extrabold text-white flex items-center gap-1.5">
                <span>{otherUser.name}</span>
                <span className="text-[10px] text-gray-400 font-normal">· {activeGig.title}</span>
              </h3>
              <p className="text-xs text-[#8CE600] font-bold">
                Asked: {formatCurrency(activeGig.price)} {activeGig.isNegotiable && '· Negotiable'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => reportItem('user', otherUser.id, 'Inappropriate behavior')}
              className="p-2 text-gray-400 hover:text-rose-400 text-xs flex items-center gap-1 transition-colors"
              title="Report User"
            >
              <Flag className="w-4 h-4" />
            </button>
            <button
              onClick={closeModal}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Gig Context Pill */}
        <div className="p-3 bg-[#18201A] border-b border-gray-800 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-300 truncate">
            <MessageSquare className="w-4 h-4 text-[#8CE600]" />
            <span className="truncate font-semibold">Gig: {activeGig.title}</span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#8CE600]/10 text-[#8CE600] text-[10px] font-bold uppercase">
            {activeGig.status}
          </span>
        </div>

        {/* Message Log Feed */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {chatMessages.length === 0 ? (
            <div className="text-center py-12 text-gray-500 text-xs">
              Start the conversation! Discuss pickup times or price offers.
            </div>
          ) : (
            chatMessages.map(msg => {
              const isMe = msg.senderId === currentUser.id;
              return (
                <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3.5 rounded-2xl text-xs space-y-2 ${
                    isMe
                      ? 'bg-[#8CE600] text-black font-semibold rounded-br-none shadow-md'
                      : 'bg-[#1C261F] text-gray-100 rounded-bl-none border border-gray-800'
                  }`}>
                    <p>{msg.content}</p>

                    {/* Embedded Offer Card if present */}
                    {msg.offerDetails && (
                      <div className="p-3 rounded-xl bg-black/30 border border-black/20 text-white space-y-2 mt-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400">
                            Offer Attached
                          </span>
                          <span className="text-sm font-extrabold text-[#8CE600]">
                            ₹{msg.offerDetails.amount}
                          </span>
                        </div>
                        
                        {!isMe && msg.offerDetails.status === 'pending' && (
                          <button
                            onClick={() => acceptOffer(msg.offerDetails!.offerId)}
                            className="w-full bg-[#00FF66] text-black font-extrabold py-1.5 rounded-lg text-xs hover:bg-[#8CE600] transition-colors"
                          >
                            Accept Offer ₹{msg.offerDetails.amount}
                          </button>
                        )}
                      </div>
                    )}

                    <span className={`text-[9px] block text-right ${isMe ? 'text-black/60' : 'text-gray-500'}`}>
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Quick Offer Bar */}
        <div className="p-3 bg-[#090D0A] border-t border-gray-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Handshake className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-xs text-gray-300 font-bold shrink-0">Send Offer: ₹</span>
            <input
              type="number"
              value={quickOfferPrice}
              onChange={(e) => setQuickOfferPrice(Number(e.target.value))}
              className="w-20 bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded-xl border border-gray-800 focus:outline-none"
            />
          </div>
          <button
            onClick={handleSendQuickOffer}
            className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/50 px-3 py-1 rounded-xl text-xs font-bold"
          >
            Send Offer ₹{quickOfferPrice}
          </button>
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-4 bg-[#090D0A] border-t border-gray-800 flex items-center gap-3">
          <input
            type="text"
            placeholder="Type a message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 bg-[#121814] text-white text-xs rounded-2xl px-4 py-3 border border-gray-800 focus:border-[#8CE600] focus:outline-none"
          />
          <button
            type="submit"
            className="bg-[#8CE600] hover:bg-[#78C800] text-black p-3 rounded-2xl transition-all shadow-md"
          >
            <Send className="w-4 h-4 stroke-[2.5]" />
          </button>
        </form>

      </div>
    </div>
  );
};
