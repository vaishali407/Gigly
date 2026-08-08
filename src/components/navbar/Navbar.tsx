import React, { useState } from 'react';
import { useGigly } from '../../context/GiglyContext';
import { PlusCircle, Bell, MessageSquare, User as UserIcon, Shield, Check, Sparkles, ChevronDown } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    currentUser, 
    allUsers, 
    switchUser, 
    notifications, 
    currentPath,
    navigate,
    openModal 
  } = useGigly();

  const [showUserMenu, setShowUserMenu] = useState(false);
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const isActive = (path: string) => {
    if (path === '/home' && (currentPath === '/home' || currentPath === '/' || currentPath === '')) return true;
    return currentPath.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-nav backdrop-blur-xl border-b border-[#8CE600]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Main Nav Links */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate('/home')}
            className="flex items-center gap-3 group text-left focus:outline-none"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#8CE600] to-[#00FF66] p-0.5 shadow-lg group-hover:scale-105 transition-transform duration-200">
              <div className="w-full h-full bg-[#090D0A] rounded-[14px] flex items-center justify-center">
                <span className="gigly-logo-text text-2xl tracking-tighter">G</span>
              </div>
            </div>
            <div>
              <span className="gigly-logo-text text-2xl sm:text-3xl tracking-tight leading-none">GIGLY</span>
              <p className="text-[10px] text-gray-400 font-medium hidden sm:block">Got a task? Get it done.</p>
            </div>
          </button>

          {/* Core Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#121814] p-1.5 rounded-full border border-gray-800">
            <button
              onClick={() => navigate('/home')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                isActive('/home')
                  ? 'bg-[#8CE600] text-black shadow-md'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => navigate('/gigs')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                isActive('/gigs')
                  ? 'bg-[#8CE600] text-black shadow-md'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              Discover
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                isActive('/dashboard')
                  ? 'bg-[#8CE600] text-black shadow-md'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              Dashboard
            </button>
          </nav>
        </div>

        {/* Right Nav Actions */}
        <div className="flex items-center gap-3">
          
          {/* Post a Gig Primary CTA */}
          <button
            onClick={() => navigate('/post')}
            className={`flex items-center gap-2 font-extrabold px-4 sm:px-5 py-2.5 rounded-2xl transition-all shadow-lg text-xs sm:text-sm hover:scale-105 active:scale-95 ${
              isActive('/post')
                ? 'bg-[#00FF66] text-black ring-2 ring-[#8CE600]'
                : 'bg-[#8CE600] hover:bg-[#78C800] text-black neon-glow-sm'
            }`}
          >
            <PlusCircle className="w-4 h-4 stroke-[2.5]" />
            <span>Post a Gig</span>
          </button>

          {/* Chat Link */}
          <button
            onClick={() => navigate('/chat')}
            className={`p-2.5 rounded-2xl border transition-all hidden sm:flex items-center gap-1.5 ${
              isActive('/chat')
                ? 'bg-[#8CE600]/20 text-[#8CE600] border-[#8CE600]/50'
                : 'bg-[#121814] text-gray-300 hover:text-white border-gray-800'
            }`}
            title="Messaging & Chat"
          >
            <MessageSquare className="w-4.5 h-4.5 text-[#8CE600]" />
            <span className="text-xs font-bold hidden xl:inline">Chat</span>
          </button>

          {/* Notifications Link */}
          <button
            onClick={() => navigate('/notifications')}
            className={`relative p-2.5 rounded-2xl border transition-all ${
              isActive('/notifications')
                ? 'bg-[#8CE600]/20 text-[#8CE600] border-[#8CE600]/50'
                : 'bg-[#121814] text-gray-300 hover:text-white border-gray-800'
            }`}
            title="Notifications"
          >
            <Bell className="w-4.5 h-4.5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#00FF66] text-black font-extrabold text-[9px] rounded-full flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Profile Link */}
          <button
            onClick={() => navigate('/profile')}
            className={`p-2.5 rounded-2xl border transition-all hidden sm:flex items-center gap-1.5 ${
              isActive('/profile')
                ? 'bg-[#8CE600]/20 text-[#8CE600] border-[#8CE600]/50'
                : 'bg-[#121814] text-gray-300 hover:text-white border-gray-800'
            }`}
            title="My Profile"
          >
            <UserIcon className="w-4.5 h-4.5 text-[#8CE600]" />
            <span className="text-xs font-bold hidden xl:inline">Profile</span>
          </button>

          {/* Safety Link */}
          <button
            onClick={() => navigate('/safety')}
            className={`p-2.5 rounded-2xl border transition-all hidden lg:flex items-center gap-1.5 ${
              isActive('/safety')
                ? 'bg-[#8CE600]/20 text-[#8CE600] border-[#8CE600]/50'
                : 'bg-[#121814] text-gray-400 hover:text-white border-gray-800'
            }`}
            title="Safety Rules"
          >
            <Shield className="w-4 h-4 text-[#8CE600]" />
            <span className="text-xs font-bold hidden xl:inline">Safety</span>
          </button>

          {/* User Avatar Menu Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-1.5 pl-2 rounded-2xl bg-[#121814] border border-gray-800 hover:border-[#8CE600]/50 transition-all"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-xl object-cover border border-[#8CE600]"
              />
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-3 w-64 bg-[#121814] border border-[#8CE600]/30 rounded-3xl shadow-2xl p-3 z-50 backdrop-blur-2xl">
                <div className="p-3 border-b border-gray-800 mb-2">
                  <p className="text-xs font-semibold text-gray-400">Signed in as</p>
                  <p className="text-sm font-extrabold text-white">{currentUser.name}</p>
                  <p className="text-xs text-[#8CE600] font-medium mt-0.5">{currentUser.email}</p>
                </div>

                <div className="space-y-1">
                  <button
                    onClick={() => {
                      navigate('/profile');
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-gray-300 hover:text-white hover:bg-gray-800/60 rounded-xl flex items-center gap-2"
                  >
                    <UserIcon className="w-4 h-4 text-[#8CE600]" />
                    My Profile
                  </button>

                  <button
                    onClick={() => {
                      openModal('auth');
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-gray-300 hover:text-white hover:bg-gray-800/60 rounded-xl flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    Account Onboarding Intent
                  </button>

                  {/* Switch Demo User Section */}
                  <div className="pt-2 border-t border-gray-800 mt-2">
                    <p className="text-[10px] font-bold text-gray-400 px-3 mb-1 uppercase tracking-wider">
                      Switch Demo User
                    </p>
                    {allUsers.map(u => (
                      <button
                        key={u.id}
                        onClick={() => {
                          switchUser(u.id);
                          setShowUserMenu(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 rounded-xl text-xs flex items-center justify-between transition-colors ${
                          u.id === currentUser.id
                            ? 'bg-[#8CE600]/20 text-[#8CE600] font-bold'
                            : 'text-gray-300 hover:bg-gray-800/50'
                        }`}
                      >
                        <span>{u.name}</span>
                        {u.id === currentUser.id && <Check className="w-3.5 h-3.5 text-[#8CE600]" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};
