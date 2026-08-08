import React, { useState } from 'react';
import { useGigly } from '../../context/GiglyContext';
import { PlusCircle, Bell, MessageSquare, User as UserIcon, Shield, ArrowRightLeft, Check, Sparkles, ChevronDown } from 'lucide-react';

interface NavbarProps {
  currentTab: 'home' | 'discover' | 'my_gigs' | 'messages';
  setCurrentTab: (tab: 'home' | 'discover' | 'my_gigs' | 'messages') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, setCurrentTab }) => {
  const { 
    currentUser, 
    allUsers, 
    switchUser, 
    userRoleMode, 
    setUserRoleMode, 
    notifications, 
    markNotificationRead,
    clearNotifications,
    openModal 
  } = useGigly();

  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <header className="sticky top-0 z-40 w-full glass-nav backdrop-blur-xl border-b border-[#8CE600]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setCurrentTab('home')}
            className="flex items-center gap-3 group text-left focus:outline-none"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#8CE600] to-[#00FF66] p-0.5 shadow-lg group-hover:scale-105 transition-transform duration-200">
              <div className="w-full h-full bg-[#090D0A] rounded-[14px] flex items-center justify-center">
                <span className="gigly-logo-text text-2xl tracking-tighter">G</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="gigly-logo-text text-2xl sm:text-3xl tracking-tight leading-none">GIGLY</span>
                <span className="hidden md:inline-block px-2 py-0.5 text-[10px] font-extrabold uppercase bg-[#8CE600]/10 text-[#8CE600] border border-[#8CE600]/30 rounded-full tracking-wider">
                  P2P Market
                </span>
              </div>
              <p className="text-[11px] text-gray-400 font-medium hidden sm:block">Got a task? Get it done.</p>
            </div>
          </button>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 ml-6 bg-[#121814] p-1.5 rounded-full border border-gray-800">
            <button
              onClick={() => setCurrentTab('home')}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                currentTab === 'home'
                  ? 'bg-[#8CE600] text-black shadow-md font-bold'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentTab('discover')}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                currentTab === 'discover'
                  ? 'bg-[#8CE600] text-black shadow-md font-bold'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              Discover Gigs
            </button>
            <button
              onClick={() => setCurrentTab('my_gigs')}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                currentTab === 'my_gigs'
                  ? 'bg-[#8CE600] text-black shadow-md font-bold'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              My Dashboard
            </button>
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          
          {/* Dual Role Mode Toggle Pill */}
          <div className="hidden lg:flex items-center bg-[#121814] p-1 rounded-2xl border border-gray-800">
            <span className="text-[11px] font-semibold text-gray-400 px-2 flex items-center gap-1">
              <ArrowRightLeft className="w-3 h-3 text-[#8CE600]" /> Role:
            </span>
            <button
              onClick={() => setUserRoleMode('all')}
              className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all ${
                userRoleMode === 'all' ? 'bg-[#8CE600]/20 text-[#8CE600] border border-[#8CE600]/40' : 'text-gray-400 hover:text-gray-200'
              }`}
              title="View all activities"
            >
              Both 🔄
            </button>
            <button
              onClick={() => setUserRoleMode('poster')}
              className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all ${
                userRoleMode === 'poster' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'text-gray-400 hover:text-gray-200'
              }`}
              title="Focus on posting tasks"
            >
              Poster 🙋
            </button>
            <button
              onClick={() => setUserRoleMode('worker')}
              className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all ${
                userRoleMode === 'worker' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' : 'text-gray-400 hover:text-gray-200'
              }`}
              title="Focus on earning from gigs"
            >
              Worker 💰
            </button>
          </div>

          {/* Post a Gig CTA */}
          <button
            onClick={() => openModal('create_gig')}
            className="hidden sm:flex items-center gap-2 bg-[#8CE600] hover:bg-[#78C800] text-black font-extrabold px-5 py-2.5 rounded-2xl transition-all shadow-lg neon-glow-sm hover:scale-[1.02] active:scale-95 text-sm"
          >
            <PlusCircle className="w-4 h-4 stroke-[2.5]" />
            <span>Post a Gig</span>
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifMenu(!showNotifMenu)}
              className="relative p-2.5 rounded-2xl bg-[#121814] text-gray-300 hover:text-white hover:border-[#8CE600]/50 border border-gray-800 transition-all"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#00FF66] text-black font-extrabold text-[10px] rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Drawer */}
            {showNotifMenu && (
              <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-[#121814] border border-[#8CE600]/30 rounded-3xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 backdrop-blur-2xl">
                <div className="flex items-center justify-between pb-3 border-b border-gray-800">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-[#8CE600]" />
                    <h3 className="text-sm font-bold text-white">Notifications</h3>
                    <span className="text-xs text-gray-400">({notifications.length})</span>
                  </div>
                  {notifications.length > 0 && (
                    <button
                      onClick={clearNotifications}
                      className="text-xs text-gray-400 hover:text-[#8CE600] transition-colors"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto mt-2 space-y-2 pr-1">
                  {notifications.length === 0 ? (
                    <div className="py-8 text-center text-gray-500 text-xs">
                      No new notifications right now.
                    </div>
                  ) : (
                    notifications.map(notif => (
                      <div
                        key={notif.id}
                        onClick={() => {
                          markNotificationRead(notif.id);
                          if (notif.gigId) openModal('gig_details', { gigId: notif.gigId });
                          setShowNotifMenu(false);
                        }}
                        className={`p-3 rounded-2xl cursor-pointer transition-all border ${
                          notif.isRead
                            ? 'bg-gray-900/40 border-gray-800 text-gray-400'
                            : 'bg-[#8CE600]/10 border-[#8CE600]/30 text-white font-medium'
                        } hover:border-[#8CE600]/60`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs font-bold text-[#8CE600]">{notif.title}</h4>
                          <span className="text-[10px] text-gray-500">{notif.timestamp}</span>
                        </div>
                        <p className="text-xs mt-1 text-gray-300">{notif.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Messages Link */}
          <button
            onClick={() => {
              setCurrentTab('messages');
              openModal('chat');
            }}
            className="p-2.5 rounded-2xl bg-[#121814] text-gray-300 hover:text-white hover:border-[#8CE600]/50 border border-gray-800 transition-all hidden sm:flex items-center gap-2"
            title="Messages"
          >
            <MessageSquare className="w-5 h-5 text-[#8CE600]" />
            <span className="text-xs font-bold">Chat</span>
          </button>

          {/* Safety & Guidelines Button */}
          <button
            onClick={() => openModal('safety')}
            className="p-2.5 rounded-2xl bg-[#121814] text-gray-400 hover:text-[#8CE600] hover:border-[#8CE600]/50 border border-gray-800 transition-all hidden lg:flex items-center gap-1.5"
            title="Community Safety & Rules"
          >
            <Shield className="w-4 h-4 text-[#8CE600]" />
            <span className="text-xs font-semibold">Safety</span>
          </button>

          {/* Profile & Account Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2.5 p-1.5 pl-2 rounded-2xl bg-[#121814] border border-gray-800 hover:border-[#8CE600]/50 transition-all"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-xl object-cover border border-[#8CE600]"
              />
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-white flex items-center gap-1">
                  {currentUser.name}
                  {currentUser.isVerified && <Check className="w-3 h-3 text-[#8CE600]" />}
                </p>
                <p className="text-[10px] text-[#8CE600]">⭐ {currentUser.rating} ({currentUser.reviewCount})</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
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
                      openModal('profile', { userId: currentUser.id });
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-gray-300 hover:text-white hover:bg-gray-800/60 rounded-xl flex items-center gap-2"
                  >
                    <UserIcon className="w-4 h-4 text-[#8CE600]" />
                    My Public Profile
                  </button>

                  <button
                    onClick={() => {
                      openModal('auth');
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-gray-300 hover:text-white hover:bg-gray-800/60 rounded-xl flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    Auth / Onboarding Preferences
                  </button>

                  {/* Switch Demo User Section */}
                  <div className="pt-2 border-t border-gray-800 mt-2">
                    <p className="text-[11px] font-bold text-gray-400 px-3 mb-1 uppercase tracking-wider">
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
