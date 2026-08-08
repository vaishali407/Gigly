import React from 'react';
import { useGigly } from '../../context/GiglyContext';
import { Home, Compass, Plus, MessageSquare, User } from 'lucide-react';

interface MobileBottomNavProps {
  currentTab: 'home' | 'discover' | 'my_gigs' | 'messages';
  setCurrentTab: (tab: 'home' | 'discover' | 'my_gigs' | 'messages') => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ currentTab, setCurrentTab }) => {
  const { currentUser, openModal } = useGigly();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#090D0A]/95 backdrop-blur-xl border-t border-[#8CE600]/20 px-3 py-2">
      <div className="flex items-center justify-around relative">
        
        {/* Home */}
        <button
          onClick={() => setCurrentTab('home')}
          className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
            currentTab === 'home' ? 'text-[#8CE600] font-bold' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px]">Home</span>
        </button>

        {/* Discover */}
        <button
          onClick={() => setCurrentTab('discover')}
          className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
            currentTab === 'discover' ? 'text-[#8CE600] font-bold' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span className="text-[10px]">Discover</span>
        </button>

        {/* PROMINENT POST A GIG BUTTON */}
        <div className="relative -top-5">
          <button
            onClick={() => openModal('create_gig')}
            className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#8CE600] to-[#00FF66] text-black font-extrabold flex items-center justify-center shadow-xl border-4 border-[#090D0A] neon-glow active:scale-95 transition-transform"
            aria-label="Post a Gig"
          >
            <Plus className="w-7 h-7 stroke-[3]" />
          </button>
        </div>

        {/* Messages */}
        <button
          onClick={() => {
            setCurrentTab('messages');
            openModal('chat');
          }}
          className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
            currentTab === 'messages' ? 'text-[#8CE600] font-bold' : 'text-gray-400 hover:text-white'
          }`}
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-[10px]">Messages</span>
        </button>

        {/* Profile */}
        <button
          onClick={() => openModal('profile', { userId: currentUser.id })}
          className="flex flex-col items-center gap-1 p-2 rounded-xl text-gray-400 hover:text-white transition-all"
        >
          <User className="w-5 h-5" />
          <span className="text-[10px]">Profile</span>
        </button>

      </div>
    </div>
  );
};
