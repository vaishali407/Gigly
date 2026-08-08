import React, { useState } from 'react';
import { GiglyProvider, useGigly } from './context/GiglyContext';
import { Navbar } from './components/navbar/Navbar';
import { MobileBottomNav } from './components/navbar/MobileBottomNav';
import { Hero } from './components/landing/Hero';
import { HowItWorks } from './components/landing/HowItWorks';
import { CategoriesSection } from './components/landing/CategoriesSection';
import { EarnSection } from './components/landing/EarnSection';
import { SafetySection } from './components/landing/SafetySection';
import { TestimonialsSection } from './components/landing/TestimonialsSection';
import { Footer } from './components/landing/Footer';
import { SearchFilters } from './components/marketplace/SearchFilters';
import { GigGrid } from './components/marketplace/GigGrid';
import { DashboardView } from './components/dashboard/DashboardView';
import { CreateGigModal } from './components/gig/CreateGigModal';
import { GigDetailsModal } from './components/gig/GigDetailsModal';
import { NegotiateModal } from './components/gig/NegotiateModal';
import { ChatDrawer } from './components/chat/ChatDrawer';
import { UserProfileModal } from './components/profile/UserProfileModal';
import { AuthModal } from './components/auth/AuthModal';
import { SafetyModal } from './components/safety/SafetyModal';
import { ReportModal } from './components/safety/ReportModal';
import { Toast } from './components/common/Toast';

const MainAppContent: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<'home' | 'discover' | 'my_gigs' | 'messages'>('home');
  const { setFilter } = useGigly();

  const handleSelectCategory = (catName: string) => {
    setFilter('category', catName);
    setCurrentTab('discover');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#090D0A] text-gray-100 flex flex-col font-sans selection:bg-[#8CE600] selection:text-black">
      
      {/* Desktop & Tablet Top Navbar */}
      <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {/* Main View Area */}
      <main className="flex-1 pb-20 md:pb-12">
        {currentTab === 'home' && (
          <div>
            <Hero onDiscoverClick={() => setCurrentTab('discover')} />
            
            {/* Direct Marketplace Quick Discovery */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="px-3 py-1 rounded-full bg-[#8CE600]/10 text-[#8CE600] border border-[#8CE600]/30 text-xs font-bold uppercase tracking-wider">
                  Live Feed
                </span>
                <h2 className="text-3xl font-extrabold text-white font-display">
                  Discover Tasks Nearby
                </h2>
                <p className="text-xs text-gray-400">
                  Filter by category, negotiable price, or distance around you.
                </p>
              </div>

              <SearchFilters />
              <GigGrid />
            </div>

            <HowItWorks />
            <CategoriesSection onSelectCategory={handleSelectCategory} />
            <EarnSection onDiscoverClick={() => setCurrentTab('discover')} />
            <SafetySection />
            <TestimonialsSection />
          </div>
        )}

        {currentTab === 'discover' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
                Micro-Gig Marketplace
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                Got time? Earn cash. Got a task? Post it and connect with local helpers.
              </p>
            </div>

            <SearchFilters />
            <GigGrid />
          </div>
        )}

        {currentTab === 'my_gigs' && (
          <DashboardView />
        )}

        {currentTab === 'messages' && (
          <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center space-y-4 bg-[#121814] p-8 rounded-3xl border border-gray-800">
              <h2 className="text-2xl font-extrabold text-white">In-App Chat & Messages</h2>
              <p className="text-xs text-gray-400">
                Click on any gig card or active offer to initiate real-time negotiation and direct messaging.
              </p>
              <button
                onClick={() => setCurrentTab('discover')}
                className="bg-[#8CE600] text-black font-extrabold px-6 py-3 rounded-2xl text-xs"
              >
                Browse Marketplace Gigs
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Global Footer */}
      <Footer onDiscoverClick={() => setCurrentTab('discover')} />

      {/* Mobile Sticky Bottom Nav Bar */}
      <MobileBottomNav currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {/* Global Modals & Overlay Drawers */}
      <CreateGigModal />
      <GigDetailsModal />
      <NegotiateModal />
      <ChatDrawer />
      <UserProfileModal />
      <AuthModal />
      <SafetyModal />
      <ReportModal />
      <Toast />

    </div>
  );
};

export const App: React.FC = () => {
  return (
    <GiglyProvider>
      <MainAppContent />
    </GiglyProvider>
  );
};

export default App;
