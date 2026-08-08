import React, { useState } from 'react';
import { useGigly } from '../context/GiglyContext';
import { formatCurrency } from '../utils/helpers';
import { Send, Handshake, MessageSquare, Flag, CheckCircle2 } from 'lucide-react';

export const ChatPage: React.FC = () => {
  const { gigs, messages, sendMessage, acceptOffer, currentUser, reportItem, navigate } = useGigly();

  const [selectedGigId, setSelectedGigId] = useState<string>(gigs[0]?.id || '');
  const [inputText, setInputText] = useState('');
  const [quickOfferPrice, setQuickOfferPrice] = useState<number>(gigs[0]?.price || 300);

  const activeGig = gigs.find(g => g.id === selectedGigId) || gigs[0];

  if (!activeGig) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center text-gray-400">
        No active conversations yet.
      </div>
    );
  }

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

  const handleSendOffer = () => {
    sendMessage(activeGig.id, otherUser.id, `Proposed offer: ₹${quickOfferPrice}`, {
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="h-[78vh] bg-[#121814] border border-[#8CE600]/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
        
        {/* Left: Conversations List */}
        <div className="w-full md:w-80 bg-[#090D0A] border-r border-gray-800 flex flex-col">
          <div className="p-4 border-b border-gray-800">
            <h2 className="text-base font-extrabold text-white font-display">Conversations</h2>
            <p className="text-[11px] text-gray-400">Select a gig to message</p>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {gigs.map(g => {
              const isSelected = g.id === activeGig.id;
              const gOther = g.posterId === currentUser.id ? (g.assignedWorker || { name: 'Ananya Patel' }) : g.poster;
              return (
                <div
                  key={g.id}
                  onClick={() => {
                    setSelectedGigId(g.id);
                    setQuickOfferPrice(g.price);
                  }}
                  className={`p-3 rounded-2xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-[#8CE600]/15 border-[#8CE600]/50 text-white'
                      : 'bg-[#121814] border-gray-800/80 text-gray-300 hover:border-gray-700'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-white truncate max-w-[140px]">{g.title}</span>
                    <span className="text-xs font-extrabold text-[#8CE600]">₹{g.price}</span>
                  </div>
                  <p className="text-[10px] text-gray-400">Chat with {gOther.name}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Active Conversation Window */}
        <div className="flex-1 flex flex-col bg-[#121814]">
          
          {/* Top Gig Summary Header Pill */}
          <div className="p-4 bg-[#090D0A] border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={otherUser.avatar} alt={otherUser.name} className="w-10 h-10 rounded-2xl object-cover border border-[#8CE600]" />
              <div>
                <h3 className="text-sm font-extrabold text-white">{otherUser.name}</h3>
                <p className="text-xs text-gray-400 truncate max-w-xs">
                  Gig: <button onClick={() => navigate(`/gigs/${activeGig.id}`)} className="text-[#8CE600] underline">{activeGig.title}</button>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-extrabold text-[#8CE600] bg-[#8CE600]/10 px-3 py-1 rounded-full border border-[#8CE600]/30">
                Asking Price: ₹{activeGig.price}
              </span>
              <button
                onClick={() => reportItem('user', otherUser.id, 'Chat issue')}
                className="text-gray-400 hover:text-rose-400 p-2"
                title="Report User"
              >
                <Flag className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {chatMessages.length === 0 ? (
              <div className="py-16 text-center text-xs text-gray-500">
                No messages yet. Send a message or propose an offer below!
              </div>
            ) : (
              chatMessages.map((msg) => {
                const isMe = msg.senderId === currentUser.id;
                return (
                  <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[75%] p-3.5 rounded-2xl text-xs space-y-2 ${
                      isMe
                        ? 'bg-[#8CE600] text-black font-semibold rounded-br-none shadow-md'
                        : 'bg-[#1C261F] text-gray-100 rounded-bl-none border border-gray-800'
                    }`}>
                      <p>{msg.content}</p>

                      {msg.offerDetails && (
                        <div className="p-3 rounded-xl bg-black/30 text-white space-y-2 mt-2">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-bold text-amber-400 uppercase">Offer Card</span>
                            <span className="text-sm font-extrabold text-[#8CE600]">₹{msg.offerDetails.amount}</span>
                          </div>

                          {!isMe && msg.offerDetails.status === 'pending' && (
                            <button
                              onClick={() => acceptOffer(msg.offerDetails!.offerId)}
                              className="w-full bg-[#00FF66] text-black font-extrabold py-1.5 rounded-lg text-xs"
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

          {/* Inline Negotiation Bar */}
          <div className="p-3 bg-[#090D0A] border-t border-gray-800 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Handshake className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="text-xs text-gray-300 font-bold">Make Offer: ₹</span>
              <input
                type="number"
                value={quickOfferPrice}
                onChange={(e) => setQuickOfferPrice(Number(e.target.value))}
                className="w-20 bg-gray-900 text-white text-xs font-bold px-2.5 py-1 rounded-xl border border-gray-800"
              />
            </div>

            <button
              onClick={handleSendOffer}
              className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/50 px-3 py-1.5 rounded-xl text-xs font-bold"
            >
              Send Offer ₹{quickOfferPrice}
            </button>
          </div>

          {/* Chat Message Input */}
          <form onSubmit={handleSend} className="p-4 bg-[#090D0A] border-t border-gray-800 flex items-center gap-3">
            <input
              type="text"
              placeholder="Type your message..."
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
    </div>
  );
};
