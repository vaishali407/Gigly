import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, Gig, Category, Offer, Message, Review, NotificationItem, FilterState, GigStatus } from '../types';
import { INITIAL_USERS, CATEGORIES, INITIAL_GIGS, INITIAL_REVIEWS, INITIAL_NOTIFICATIONS } from '../data/mockData';

interface GiglyContextType {
  currentUser: User;
  allUsers: User[];
  userRoleMode: 'all' | 'poster' | 'worker';
  setUserRoleMode: (mode: 'all' | 'poster' | 'worker') => void;
  gigs: Gig[];
  categories: Category[];
  reviews: Review[];
  notifications: NotificationItem[];
  offers: Offer[];
  messages: Message[];
  filters: FilterState;
  
  // Modal & Selection State
  activeModal: 'none' | 'auth' | 'onboarding' | 'create_gig' | 'gig_details' | 'negotiate' | 'chat' | 'safety' | 'report' | 'profile';
  selectedGigId: string | null;
  selectedUserId: string | null;
  selectedConversationGigId: string | null;
  toastMessage: string | null;

  // Actions
  setFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  resetFilters: () => void;
  postGig: (gigData: Omit<Gig, 'id' | 'posterId' | 'poster' | 'status' | 'createdAt' | 'offersCount'>) => Gig;
  makeOffer: (gigId: string, amount: number, note?: string) => void;
  acceptOffer: (offerId: string) => void;
  counterOffer: (offerId: string, newAmount: number) => void;
  sendMessage: (gigId: string, receiverId: string, content: string, offerDetails?: Offer) => void;
  updateGigStatus: (gigId: string, newStatus: GigStatus) => void;
  submitReview: (gigId: string, rating: number, comment: string) => void;
  markNotificationRead: (notifId: string) => void;
  clearNotifications: () => void;
  switchUser: (userId: string) => void;
  reportItem: (type: 'gig' | 'user', targetId: string, reason: string) => void;
  openModal: (modalType: GiglyContextType['activeModal'], payload?: { gigId?: string; userId?: string; convGigId?: string }) => void;
  closeModal: () => void;
  showToast: (msg: string) => void;
}

const DEFAULT_FILTERS: FilterState = {
  category: 'all',
  distanceMax: 20,
  priceMin: 0,
  priceMax: 5000,
  negotiableOnly: false,
  searchQuery: '',
  sortBy: 'newest',
};

const GiglyContext = createContext<GiglyContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_GIGS = 'gigly_app_gigs';
const LOCAL_STORAGE_KEY_NOTIFS = 'gigly_app_notifs';
const LOCAL_STORAGE_KEY_REVIEWS = 'gigly_app_reviews';
const LOCAL_STORAGE_KEY_OFFERS = 'gigly_app_offers';
const LOCAL_STORAGE_KEY_MSGS = 'gigly_app_msgs';

export const GiglyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [allUsers, setAllUsers] = useState<User[]>(INITIAL_USERS);
  const [currentUser, setCurrentUser] = useState<User>(INITIAL_USERS[0]);
  const [userRoleMode, setUserRoleMode] = useState<'all' | 'poster' | 'worker'>('all');
  
  const [categories] = useState<Category[]>(CATEGORIES);
  const [gigs, setGigs] = useState<Gig[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_GIGS);
    return saved ? JSON.parse(saved) : INITIAL_GIGS;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_REVIEWS);
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_NOTIFS);
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [offers, setOffers] = useState<Offer[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_OFFERS);
    return saved ? JSON.parse(saved) : [
      {
        id: 'off_1',
        gigId: 'gig_1',
        senderId: 'user_ananya',
        receiverId: 'user_rahul',
        senderName: 'Ananya Patel',
        senderAvatar: INITIAL_USERS[1].avatar,
        amount: 280,
        note: 'Can drop it off by 6:15 PM sharp!',
        status: 'pending',
        createdAt: '10 mins ago',
      }
    ];
  });

  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_MSGS);
    return saved ? JSON.parse(saved) : [
      {
        id: 'msg_1',
        gigId: 'gig_1',
        senderId: 'user_ananya',
        receiverId: 'user_rahul',
        content: 'Hi Rahul! I am near Koramangala 5th Block right now.',
        timestamp: '15 mins ago',
      },
      {
        id: 'msg_2',
        gigId: 'gig_1',
        senderId: 'user_ananya',
        receiverId: 'user_rahul',
        content: 'I can pick up the parcel for ₹280. Sent you an offer!',
        timestamp: '10 mins ago',
      }
    ];
  });

  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  // Modal controls
  const [activeModal, setActiveModal] = useState<GiglyContextType['activeModal']>('none');
  const [selectedGigId, setSelectedGigId] = useState<string | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedConversationGigId, setSelectedConversationGigId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_GIGS, JSON.stringify(gigs));
  }, [gigs]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_NOTIFS, JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_REVIEWS, JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_OFFERS, JSON.stringify(offers));
  }, [offers]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_MSGS, JSON.stringify(messages));
  }, [messages]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const setFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const openModal: GiglyContextType['openModal'] = (modalType, payload) => {
    setActiveModal(modalType);
    if (payload?.gigId !== undefined) setSelectedGigId(payload.gigId);
    if (payload?.userId !== undefined) setSelectedUserId(payload.userId);
    if (payload?.convGigId !== undefined) setSelectedConversationGigId(payload.convGigId);
  };

  const closeModal = () => {
    setActiveModal('none');
  };

  const switchUser = (userId: string) => {
    const found = allUsers.find(u => u.id === userId);
    if (found) {
      setCurrentUser(found);
      showToast(`Switched user mode to ${found.name}`);
    }
  };

  const postGig = (gigData: Omit<Gig, 'id' | 'posterId' | 'poster' | 'status' | 'createdAt' | 'offersCount'>) => {
    const newGig: Gig = {
      ...gigData,
      id: `gig_${Date.now()}`,
      posterId: currentUser.id,
      poster: currentUser,
      status: 'open',
      createdAt: 'Just now',
      offersCount: 0,
    };

    setGigs(prev => [newGig, ...prev]);

    // Update currentUser posted count
    const updatedUser = { ...currentUser, postedGigs: currentUser.postedGigs + 1 };
    setCurrentUser(updatedUser);
    setAllUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));

    showToast('🎉 Your Gig has been published successfully!');
    return newGig;
  };

  const makeOffer = (gigId: string, amount: number, note?: string) => {
    const gig = gigs.find(g => g.id === gigId);
    if (!gig) return;

    const newOffer: Offer = {
      id: `off_${Date.now()}`,
      gigId,
      senderId: currentUser.id,
      receiverId: gig.posterId,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      amount,
      note,
      status: 'pending',
      createdAt: 'Just now',
    };

    setOffers(prev => [newOffer, ...prev]);

    // Update Gig status to negotiating & count
    setGigs(prev => prev.map(g => {
      if (g.id === gigId) {
        return {
          ...g,
          offersCount: g.offersCount + 1,
          status: g.status === 'open' ? 'negotiating' : g.status,
        };
      }
      return g;
    }));

    // System Notification to poster
    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      userId: gig.posterId,
      title: 'New Offer Received! 💰',
      message: `${currentUser.name} made an offer of ₹${amount} on "${gig.title}"`,
      timestamp: 'Just now',
      isRead: false,
      type: 'offer',
      gigId,
    };
    setNotifications(prev => [newNotif, ...prev]);

    // Add a message in chat
    sendMessage(gigId, gig.posterId, note || `Offered ₹${amount}`, newOffer);

    showToast(`Offer of ₹${amount} sent to ${gig.poster.name}!`);
  };

  const acceptOffer = (offerId: string) => {
    const offer = offers.find(o => o.id === offerId);
    if (!offer) return;

    // Update offer status
    setOffers(prev => prev.map(o => o.id === offerId ? { ...o, status: 'accepted' } : o));

    // Update gig status to accepted and set worker
    const worker = allUsers.find(u => u.id === offer.senderId) || currentUser;
    setGigs(prev => prev.map(g => {
      if (g.id === offer.gigId) {
        return {
          ...g,
          status: 'accepted',
          acceptedOfferId: offerId,
          acceptedPrice: offer.amount,
          assignedWorkerId: offer.senderId,
          assignedWorker: worker,
        };
      }
      return g;
    }));

    // Send Notification to offer sender
    const targetGig = gigs.find(g => g.id === offer.gigId);
    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      userId: offer.senderId,
      title: 'Offer Accepted! 🎉',
      message: `${currentUser.name} accepted your offer of ₹${offer.amount} for "${targetGig?.title || 'Gig'}"`,
      timestamp: 'Just now',
      isRead: false,
      type: 'offer_accepted',
      gigId: offer.gigId,
    };
    setNotifications(prev => [newNotif, ...prev]);

    showToast(`Accepted offer of ₹${offer.amount}! Gig is now ready to begin.`);
  };

  const counterOffer = (offerId: string, newAmount: number) => {
    const offer = offers.find(o => o.id === offerId);
    if (!offer) return;

    // Update existing offer status to countered
    setOffers(prev => prev.map(o => o.id === offerId ? { ...o, status: 'countered' } : o));

    // Make new counter offer in opposite direction
    const gig = gigs.find(g => g.id === offer.gigId);
    if (!gig) return;

    const counterSenderId = currentUser.id;
    const counterReceiverId = offer.senderId === currentUser.id ? offer.receiverId : offer.senderId;

    const newOffer: Offer = {
      id: `off_${Date.now()}`,
      gigId: offer.gigId,
      senderId: counterSenderId,
      receiverId: counterReceiverId,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      amount: newAmount,
      note: `Counter-offer: ₹${newAmount}`,
      status: 'pending',
      createdAt: 'Just now',
    };

    setOffers(prev => [newOffer, ...prev]);

    // Send Notification
    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      userId: counterReceiverId,
      title: 'Counter Offer! 💬',
      message: `${currentUser.name} proposed a counter-offer of ₹${newAmount}`,
      timestamp: 'Just now',
      isRead: false,
      type: 'offer',
      gigId: offer.gigId,
    };
    setNotifications(prev => [newNotif, ...prev]);

    sendMessage(offer.gigId, counterReceiverId, `Counter-offer proposed: ₹${newAmount}`, newOffer);

    showToast(`Counter offer of ₹${newAmount} sent!`);
  };

  const sendMessage = (gigId: string, receiverId: string, content: string, offerDetails?: Offer) => {
    const newMsg: Message = {
      id: `msg_${Date.now()}`,
      gigId,
      senderId: currentUser.id,
      receiverId,
      content,
      timestamp: 'Just now',
      offerDetails: offerDetails ? {
        offerId: offerDetails.id,
        amount: offerDetails.amount,
        status: offerDetails.status,
      } : undefined,
    };

    setMessages(prev => [...prev, newMsg]);
  };

  const updateGigStatus = (gigId: string, newStatus: GigStatus) => {
    setGigs(prev => prev.map(g => g.id === gigId ? { ...g, status: newStatus } : g));

    const gig = gigs.find(g => g.id === gigId);
    if (gig) {
      // Notify other participant
      const otherUserId = gig.posterId === currentUser.id ? gig.assignedWorkerId : gig.posterId;
      if (otherUserId) {
        const notifMsg = newStatus === 'in_progress' ? 'has started the task!' : newStatus === 'completed' ? 'marked the task as COMPLETED! Please leave a review.' : `updated status to ${newStatus}`;
        setNotifications(prev => [{
          id: `notif_${Date.now()}`,
          userId: otherUserId,
          title: `Gig Status Update: ${newStatus.toUpperCase()}`,
          message: `${currentUser.name} ${notifMsg}`,
          timestamp: 'Just now',
          isRead: false,
          type: newStatus === 'completed' ? 'gig_completed' : 'gig_started',
          gigId,
        }, ...prev]);
      }
    }

    showToast(`Gig status updated to: ${newStatus.replace('_', ' ').toUpperCase()}`);
  };

  const submitReview = (gigId: string, rating: number, comment: string) => {
    const gig = gigs.find(g => g.id === gigId);
    if (!gig) return;

    const revieweeId = gig.posterId === currentUser.id ? gig.assignedWorkerId! : gig.posterId;
    const role: Review['role'] = gig.posterId === currentUser.id ? 'poster' : 'worker';

    const newReview: Review = {
      id: `rev_${Date.now()}`,
      gigId,
      gigTitle: gig.title,
      reviewerId: currentUser.id,
      reviewerName: currentUser.name,
      reviewerAvatar: currentUser.avatar,
      revieweeId,
      rating,
      comment,
      role,
      date: 'Just now',
    };

    setReviews(prev => [newReview, ...prev]);

    // Set Gig status to reviewed
    updateGigStatus(gigId, 'reviewed');

    // Update completed count for reviewee user
    if (role === 'poster' && gig.assignedWorkerId) {
      setAllUsers(prev => prev.map(u => {
        if (u.id === gig.assignedWorkerId) {
          const newCompleted = u.completedGigs + 1;
          const newRating = Number(((u.rating * u.reviewCount + rating) / (u.reviewCount + 1)).toFixed(1));
          return { ...u, completedGigs: newCompleted, rating: newRating, reviewCount: u.reviewCount + 1 };
        }
        return u;
      }));
    }

    showToast('⭐ Thank you! Your review has been published.');
  };

  const markNotificationRead = (notifId: string) => {
    setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, isRead: true } : n));
  };

  const clearNotifications = () => {
    setNotifications([]);
    showToast('Notifications cleared');
  };

  const reportItem = (type: 'gig' | 'user', targetId: string, reason: string) => {
    console.log(`[Safety Report] Type: ${type}, Target: ${targetId}, Reason: ${reason}`);
    showToast(`🛡️ Thank you for keeping Gigly safe. Report submitted for review.`);
    closeModal();
  };

  return (
    <GiglyContext.Provider
      value={{
        currentUser,
        allUsers,
        userRoleMode,
        setUserRoleMode,
        gigs,
        categories,
        reviews,
        notifications,
        offers,
        messages,
        filters,
        activeModal,
        selectedGigId,
        selectedUserId,
        selectedConversationGigId,
        toastMessage,

        setFilter,
        resetFilters,
        postGig,
        makeOffer,
        acceptOffer,
        counterOffer,
        sendMessage,
        updateGigStatus,
        submitReview,
        markNotificationRead,
        clearNotifications,
        switchUser,
        reportItem,
        openModal,
        closeModal,
        showToast,
      }}
    >
      {children}
    </GiglyContext.Provider>
  );
};

export const useGigly = () => {
  const context = useContext(GiglyContext);
  if (!context) {
    throw new Error('useGigly must be used within a GiglyProvider');
  }
  return context;
};
