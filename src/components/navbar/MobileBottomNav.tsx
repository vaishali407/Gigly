import React from 'react';
import { useGigly } from '../../context/GiglyContext';
import { Home, Compass, Plus, MessageSquare, User } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { currentPath, navigate } = useGigly();

  const isActive = (path: string) => {
    if (path === '/home' && (currentPath === '/home' || currentPath === '/' || currentPath === '')) return true;
    return currentPath.startsWith(path);
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#090D0A]/95 backdrop-blur-xl border-t border-[#8CE600]/20 px-2 py-1.5">
      <div className="flex items-center justify-around relative">
        
        {/* Home */}
        <button
          onClick={() => navigate('/home')}
          className={`flex flex-col items-center gap-0.5 p-2 rounded-xl transition-all ${
            isActive('/home') ? 'text-[#8CE600] font-bold' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px]">Home</span>
        </button>

        {/* Discover */}
        <button
          onClick={() => navigate('/gigs')}
          className={`flex flex-col items-center gap-0.5 p-2 rounded-xl transition-all ${
            isActive('/gigs') ? 'text-[#8CE600] font-bold' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span className="text-[10px]">Discover</span>
        </button>

        {/* PROMINENT POST A GIG BUTTON */}
        <div className="relative -top-5">
          <button
            onClick={() => navigate('/post')}
            className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#8CE600] to-[#00FF66] text-black font-extrabold flex items-center justify-center shadow-xl border-4 border-[#090D0A] neon-glow active:scale-95 transition-transform"
            aria-label="Post a Gig"
          >
            <Plus className="w-7 h-7 stroke-[3]" />
          </button>
        </div>

        {/* Chat */}
        <button
          onClick={() => navigate('/chat')}
          className={`flex flex-col items-center gap-0.5 p-2 rounded-xl transition-all ${
            isActive('/chat') ? 'text-[#8CE600] font-bold' : 'text-gray-400 hover:text-white'
          }`}
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-[10px]">Chat</span>
        </button>

        {/* Profile */}
        <button
          onClick={() => navigate('/profile')}
          className={`flex flex-col items-center gap-0.5 p-2 rounded-xl transition-all ${
            isActive('/profile') ? 'text-[#8CE600] font-bold' : 'text-gray-400 hover:text-white'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px]">Profile</span>
        </button>

      </div>
    </div>
  );
};
