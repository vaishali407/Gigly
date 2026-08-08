import React, { useState } from 'react';
import { useGigly } from '../../context/GiglyContext';
import { formatCurrency } from '../../utils/helpers';
import { GigCard } from '../marketplace/GigCard';
import { Wallet, CheckCircle, Star, Clock, Layers, Play, Award, MessageSquare } from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { currentUser, gigs, offers, updateGigStatus, openModal, submitReview } = useGigly();

  const [activeTab, setActiveTab] = useState<'posted' | 'applied' | 'accepted' | 'in_progress' | 'completed'>('posted');
  const [reviewModalGigId, setReviewModalGigId] = useState<string | null>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  // Filtering user's gigs based on tabs
  const postedGigs = gigs.filter(g => g.posterId === currentUser.id);
  const appliedGigIds = offers.filter(o => o.senderId === currentUser.id).map(o => o.gigId);
  const appliedGigs = gigs.filter(g => appliedGigIds.includes(g.id));

  const acceptedGigs = gigs.filter(g => (g.posterId === currentUser.id || g.assignedWorkerId === currentUser.id) && g.status === 'accepted');
  const inProgressGigs = gigs.filter(g => (g.posterId === currentUser.id || g.assignedWorkerId === currentUser.id) && g.status === 'in_progress');
  const completedGigs = gigs.filter(g => (g.posterId === currentUser.id || g.assignedWorkerId === currentUser.id) && (g.status === 'completed' || g.status === 'reviewed'));

  // Calculate mock earnings summary
  const totalEarned = completedGigs.reduce((acc, g) => acc + (g.acceptedPrice || g.price), 4500);
  const thisMonthEarned = Math.floor(totalEarned * 0.7);

  const displayList = 
    activeTab === 'posted' ? postedGigs :
    activeTab === 'applied' ? appliedGigs :
    activeTab === 'accepted' ? acceptedGigs :
    activeTab === 'in_progress' ? inProgressGigs : completedGigs;

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewModalGigId) return;
    submitReview(reviewModalGigId, rating, comment);
    setReviewModalGigId(null);
    setComment('');
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Top Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
          My Dashboard & Activity
        </h1>
        <p className="text-sm text-gray-400">
          Manage your posted tasks, active jobs, and track earnings in one unified view.
        </p>
      </div>

      {/* Financial Earnings & Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Earned */}
        <div className="p-5 rounded-3xl bg-[#121814] border border-[#8CE600]/30 shadow-xl space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span className="flex items-center gap-1 font-semibold">
              <Wallet className="w-4 h-4 text-[#8CE600]" /> Total Earned
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#8CE600]/10 text-[#8CE600] text-[10px] font-bold">
              Lifetime
            </span>
          </div>
          <p className="text-3xl font-black text-[#8CE600] font-display">
            {formatCurrency(totalEarned)}
          </p>
          <p className="text-[10px] text-gray-500">From completed micro-tasks</p>
        </div>

        {/* This Month */}
        <div className="p-5 rounded-3xl bg-[#121814] border border-gray-800 shadow-xl space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span className="flex items-center gap-1 font-semibold">
              <Clock className="w-4 h-4 text-emerald-400" /> This Month
            </span>
            <span className="text-[10px] text-emerald-400 font-bold">+18% vs last month</span>
          </div>
          <p className="text-3xl font-black text-white font-display">
            {formatCurrency(thisMonthEarned)}
          </p>
          <p className="text-[10px] text-gray-500">Active period payout</p>
        </div>

        {/* Completed Gigs */}
        <div className="p-5 rounded-3xl bg-[#121814] border border-gray-800 shadow-xl space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span className="flex items-center gap-1 font-semibold">
              <CheckCircle className="w-4 h-4 text-blue-400" /> Completed Tasks
            </span>
            <span className="text-[10px] text-gray-500">Verified</span>
          </div>
          <p className="text-3xl font-black text-white font-display">
            {currentUser.completedGigs}
          </p>
          <p className="text-[10px] text-gray-500">{currentUser.postedGigs} posted by you</p>
        </div>

        {/* Average Rating */}
        <div className="p-5 rounded-3xl bg-[#121814] border border-amber-500/20 shadow-xl space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span className="flex items-center gap-1 font-semibold">
              <Star className="w-4 h-4 text-amber-400 fill-current" /> Rating
            </span>
            <span className="text-[10px] text-amber-400 font-bold">5⭐ Tier</span>
          </div>
          <p className="text-3xl font-black text-amber-400 font-display">
            {currentUser.rating} <span className="text-sm font-normal text-gray-400">/ 5.0</span>
          </p>
          <p className="text-[10px] text-gray-500">{currentUser.reviewCount} total reviews</p>
        </div>

      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-gray-800 overflow-x-auto pb-3">
        <button
          onClick={() => setActiveTab('posted')}
          className={`px-5 py-2.5 rounded-2xl text-xs font-extrabold transition-all whitespace-nowrap ${
            activeTab === 'posted'
              ? 'bg-[#8CE600] text-black shadow-md'
              : 'bg-[#121814] text-gray-300 hover:bg-gray-800 border border-gray-800'
          }`}
        >
          🙋 Posted Gigs ({postedGigs.length})
        </button>

        <button
          onClick={() => setActiveTab('applied')}
          className={`px-5 py-2.5 rounded-2xl text-xs font-extrabold transition-all whitespace-nowrap ${
            activeTab === 'applied'
              ? 'bg-[#8CE600] text-black shadow-md'
              : 'bg-[#121814] text-gray-300 hover:bg-gray-800 border border-gray-800'
          }`}
        >
          💰 Applied & Offered ({appliedGigs.length})
        </button>

        <button
          onClick={() => setActiveTab('accepted')}
          className={`px-5 py-2.5 rounded-2xl text-xs font-extrabold transition-all whitespace-nowrap ${
            activeTab === 'accepted'
              ? 'bg-[#8CE600] text-black shadow-md'
              : 'bg-[#121814] text-gray-300 hover:bg-gray-800 border border-gray-800'
          }`}
        >
          🤝 Accepted ({acceptedGigs.length})
        </button>

        <button
          onClick={() => setActiveTab('in_progress')}
          className={`px-5 py-2.5 rounded-2xl text-xs font-extrabold transition-all whitespace-nowrap ${
            activeTab === 'in_progress'
              ? 'bg-[#8CE600] text-black shadow-md'
              : 'bg-[#121814] text-gray-300 hover:bg-gray-800 border border-gray-800'
          }`}
        >
          ⏳ In Progress ({inProgressGigs.length})
        </button>

        <button
          onClick={() => setActiveTab('completed')}
          className={`px-5 py-2.5 rounded-2xl text-xs font-extrabold transition-all whitespace-nowrap ${
            activeTab === 'completed'
              ? 'bg-[#8CE600] text-black shadow-md'
              : 'bg-[#121814] text-gray-300 hover:bg-gray-800 border border-gray-800'
          }`}
        >
          ✅ Completed ({completedGigs.length})
        </button>
      </div>

      {/* Gig Cards Grid */}
      {displayList.length === 0 ? (
        <div className="py-16 text-center bg-[#121814] border border-gray-800 rounded-3xl p-8 space-y-3">
          <Layers className="w-12 h-12 text-gray-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No gigs in this tab</h3>
          <p className="text-xs text-gray-400">Gigs will appear here as status updates occur.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayList.map(gig => (
            <div key={gig.id} className="relative">
              <GigCard gig={gig} />
              
              {/* Contextual Action Overlay Controls */}
              <div className="mt-2 p-3 bg-[#090D0A] rounded-2xl border border-gray-800 flex items-center justify-between text-xs">
                <span className="text-gray-400 font-semibold">Quick Action:</span>

                {gig.status === 'accepted' && (
                  <button
                    onClick={() => updateGigStatus(gig.id, 'in_progress')}
                    className="bg-purple-500 hover:bg-purple-400 text-white font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1"
                  >
                    <Play className="w-3.5 h-3.5" /> Start Task
                  </button>
                )}

                {gig.status === 'in_progress' && (
                  <button
                    onClick={() => updateGigStatus(gig.id, 'completed')}
                    className="bg-[#8CE600] text-black font-extrabold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1"
                  >
                    <CheckCircle className="w-3.5 h-3.5" /> Mark Completed
                  </button>
                )}

                {gig.status === 'completed' && (
                  <button
                    onClick={() => setReviewModalGigId(gig.id)}
                    className="bg-amber-500 text-black font-extrabold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1"
                  >
                    <Award className="w-3.5 h-3.5" /> Leave Review
                  </button>
                )}

                {(gig.status === 'open' || gig.status === 'negotiating') && (
                  <button
                    onClick={() => openModal('chat', { convGigId: gig.id })}
                    className="bg-gray-800 text-gray-200 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#8CE600]" /> Open Chat
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Review Modal popup */}
      {reviewModalGigId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121814] border border-[#8CE600]/40 rounded-3xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <h3 className="text-xl font-extrabold text-white font-display">Rate & Review Experience</h3>
            <p className="text-xs text-gray-400">Your review builds community trust on Gigly.</p>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div className="flex items-center justify-center gap-2 py-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 focus:outline-none"
                  >
                    <Star className={`w-8 h-8 ${star <= rating ? 'text-amber-400 fill-current' : 'text-gray-600'}`} />
                  </button>
                ))}
              </div>

              <textarea
                required
                rows={3}
                placeholder="Write your honest review (e.g., 'Super reliable and fast delivery!')..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full bg-[#090D0A] text-white text-xs rounded-2xl p-3 border border-gray-800 focus:border-[#8CE600] focus:outline-none"
              />

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setReviewModalGigId(null)}
                  className="flex-1 bg-gray-800 text-white font-bold py-2.5 rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#8CE600] text-black font-extrabold py-2.5 rounded-xl text-xs hover:bg-[#78C800]"
                >
                  Submit 5⭐ Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
