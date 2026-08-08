export type GigStatus = 
  | 'open' 
  | 'negotiating' 
  | 'accepted' 
  | 'in_progress' 
  | 'completed' 
  | 'reviewed' 
  | 'cancelled';

export interface User {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  completedGigs: number;
  postedGigs: number;
  skills: string[];
  bio: string;
  location: string;
  memberSince: string;
  responseRate: string;
  email: string;
  isVerified: boolean;
}

export interface Category {
  id: string;
  name: string;
  emoji: string;
  description: string;
  count: number;
}

export interface Gig {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  isNegotiable: boolean;
  locationName: string;
  distanceKm: number;
  date: string;
  estimatedDuration: string;
  posterId: string;
  poster: User;
  status: GigStatus;
  acceptedOfferId?: string;
  acceptedPrice?: number;
  assignedWorkerId?: string;
  assignedWorker?: User;
  createdAt: string;
  offersCount: number;
  urgent?: boolean;
}

export interface Offer {
  id: string;
  gigId: string;
  senderId: string;
  receiverId: string;
  senderName: string;
  senderAvatar: string;
  amount: number;
  note?: string;
  status: 'pending' | 'accepted' | 'countered' | 'rejected';
  createdAt: string;
}

export interface Message {
  id: string;
  gigId: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  offerDetails?: {
    offerId: string;
    amount: number;
    status: 'pending' | 'accepted' | 'countered' | 'rejected';
  };
}

export interface Conversation {
  id: string;
  gigId: string;
  gigTitle: string;
  gigPrice: number;
  gigStatus: GigStatus;
  otherUserId: string;
  otherUserName: string;
  otherUserAvatar: string;
  lastMessage: string;
  lastMessageTimestamp: string;
  unreadCount: number;
}

export interface Review {
  id: string;
  gigId: string;
  gigTitle: string;
  reviewerId: string;
  reviewerName: string;
  reviewerAvatar: string;
  revieweeId: string;
  rating: number;
  comment: string;
  role: 'poster' | 'worker';
  date: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  type: 'offer' | 'offer_accepted' | 'message' | 'gig_accepted' | 'gig_started' | 'gig_completed' | 'review';
  gigId?: string;
}

export interface FilterState {
  category: string;
  distanceMax: number;
  priceMin: number;
  priceMax: number;
  negotiableOnly: boolean;
  searchQuery: string;
  sortBy: 'newest' | 'highest_price' | 'lowest_price' | 'closest';
}
