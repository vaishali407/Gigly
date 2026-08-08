import React from 'react';
import { GiglyProvider, useGigly } from './context/GiglyContext';
import { Navbar } from './components/navbar/Navbar';
import { MobileBottomNav } from './components/navbar/MobileBottomNav';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { DiscoverPage } from './pages/DiscoverPage';
import { GigDetailsPage } from './pages/GigDetailsPage';
import { PostGigPage } from './pages/PostGigPage';
import { DashboardPage } from './pages/DashboardPage';
import { ChatPage } from './pages/ChatPage';
import { ProfilePage } from './pages/ProfilePage';
import { NotificationsPage } from './pages/NotificationsPage';
import { SafetyPage } from './pages/SafetyPage';
import { Footer } from './components/landing/Footer';
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
  const { currentPath, isAuthenticated, navigate } = useGigly();

  // Route Guard
  if (!isAuthenticated || currentPath === '/login') {
    return (
      <div className="min-h-screen bg-[#090D0A] text-gray-100 flex flex-col font-sans selection:bg-[#8CE600] selection:text-black">
        <main className="flex-1">
          <LoginPage />
        </main>
        <Toast />
      </div>
    );
  }

  // Helper to match authenticated routes
  const renderPage = () => {
    if (currentPath.startsWith('/gigs/')) {
      const gigId = currentPath.replace('/gigs/', '');
      return <GigDetailsPage gigId={gigId} />;
    }

    switch (currentPath) {
      case '/gigs':
        return <DiscoverPage />;
      case '/post':
        return <PostGigPage />;
      case '/dashboard':
        return <DashboardPage />;
      case '/chat':
        return <ChatPage />;
      case '/profile':
        return <ProfilePage />;
      case '/notifications':
        return <NotificationsPage />;
      case '/safety':
        return <SafetyPage />;
      case '/home':
      case '/':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#090D0A] text-gray-100 flex flex-col font-sans selection:bg-[#8CE600] selection:text-black">
      
      {/* Top Navbar */}
      <Navbar />

      {/* Dedicated Page View Content */}
      <main className="flex-1 pb-20 lg:pb-12">
        {renderPage()}
      </main>

      {/* Global Footer */}
      <Footer onDiscoverClick={() => navigate('/gigs')} />

      {/* Mobile Sticky Bottom Bar */}
      <MobileBottomNav />

      {/* Global Modals & Notifications */}
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
