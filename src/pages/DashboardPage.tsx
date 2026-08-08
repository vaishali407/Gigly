import React, { useState } from 'react';
import { useGigly } from '../context/GiglyContext';
import { formatCurrency } from '../utils/helpers';
import { Wallet, CheckCircle, Star, Clock, Layers, Play, Award, MessageSquare, ArrowRight } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { currentUser, gigs, offers, updateGigStatus, submitReview, navigate } = useGigly();

  const [activeTab, setActiveTab] = useState<'posted' | 'applied' | 'accepted' | 'in_progress' | 'completed'>('posted');
  const [reviewModalGigId, setReviewModalGigId] = useState<string | null>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  // Filtering user's activity
  const postedGigs = gigs.filter(g => g.posterId === currentUser.id);
  const appliedGigIds = offers.filter(o => o.senderId === currentUser.id).map(o => o.gigId);
  const appliedGigs = gigs.filter(g => appliedGigIds.includes(g.id));

  const acceptedGigs = gigs.filter(g => (g.posterId === currentUser.id || g.assignedWorkerId === currentUser.id) && g.status === 'accepted');
  const inProgressGigs = gigs.filter(g => (g.posterId === currentUser.id || g.assignedWorkerId === currentUser.id) && g.status === 'in_progress');
  const completedGigs = gigs.filter(g => (g.posterId === currentUser.id || g.assignedWorkerId === currentUser.id) && (g.status === 'completed' || g.status === 'reviewed'));

  // Simple statistics
  const activeCount = acceptedGigs.length + inProgressGigs.length;
  const totalEarned = completedGigs.reduce((acc, g) => acc + (g.acceptedPrice || g.price), 4500);

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
          My Dashboard
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Track active tasks, posted gigs, and earnings in one focused view.
        </p>
      </div>

      {/* Top Simple Statistics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-3xl bg-[#121814] border border-[#8CE600]/30 shadow-xl">
          <span className="text-xs font-semibold text-gray-400 block mb-1">Total Earnings</span>
          <span className="text-2xl font-black text-[#8CE600] font-display">
            {formatCurrency(totalEarned)}
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-[#121814] border border-gray-800 shadow-xl">
          <span className="text-xs font-semibold text-gray-400 block mb-1">Completed Gigs</span>
          <span className="text-2xl font-black text-white font-display">
            {currentUser.completedGigs}
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-[#121814] border border-gray-800 shadow-xl">
          <span className="text-xs font-semibold text-gray-400 block mb-1">Active Gigs</span>
          <span className="text-2xl font-black text-emerald-400 font-display">
            {activeCount}
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-[#121814] border border-amber-500/20 shadow-xl">
          <span className="text-xs font-semibold text-gray-400 block mb-1">User Rating</span>
          <span className="text-2xl font-black text-amber-400 font-display">
            ⭐ {currentUser.rating}
          </span>
        </div>

      </div>

      {/* Activity Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-800 overflow-x-auto pb-3">
        <button
          onClick={() => setActiveTab('posted')}
          className={`px-5 py-2.5 rounded-2xl text-xs font-extrabold transition-all whitespace-nowrap ${
            activeTab === 'posted'
              ? 'bg-[#8CE600] text-black shadow-md'
              : 'bg-[#121814] text-gray-300 hover:bg-gray-800 border border-gray-800'
          }`}
        >
          🙋 Posted ({postedGigs.length})
        </button>

        <button
          onClick={() => setActiveTab('applied')}
          className={`px-5 py-2.5 rounded-2xl text-xs font-extrabold transition-all whitespace-nowrap ${
            activeTab === 'applied'
              ? 'bg-[#8CE600] text-black shadow-md'
              : 'bg-[#121814] text-gray-300 hover:bg-gray-800 border border-gray-800'
          }`}
        >
          💰 Applied ({appliedGigs.length})
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

      {/* Tab Contents */}
      {displayList.length === 0 ? (
        <div className="py-16 text-center bg-[#121814] border border-gray-800 rounded-3xl p-8 space-y-3">
          <Layers className="w-12 h-12 text-gray-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No gigs in this tab</h3>
          <p className="text-xs text-gray-400">Activity will appear here as your gigs progress.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayList.map(gig => (
            <div key={gig.id} className="p-6 rounded-3xl bg-[#121814] border border-gray-800 space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-gray-400">{gig.category}</span>
                  <span className="text-xs font-extrabold text-[#8CE600]">
                    {formatCurrency(gig.acceptedPrice || gig.price)}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white leading-snug mb-1">{gig.title}</h3>
                <p className="text-xs text-gray-400">{gig.locationName} · {gig.date}</p>
              </div>

              <div className="pt-3 border-t border-gray-800 flex items-center justify-between gap-2">
                <button
                  onClick={() => navigate(`/gigs/${gig.id}`)}
                  className="text-xs font-bold text-gray-300 hover:text-white"
                >
                  View Details
                </button>

                {gig.status === 'accepted' && (
                  <button
                    onClick={() => updateGigStatus(gig.id, 'in_progress')}
                    className="bg-purple-500 text-white font-bold px-3 py-1.5 rounded-xl text-xs"
                  >
                    Start Task
                  </button>
                )}

                {gig.status === 'in_progress' && (
                  <button
                    onClick={() => updateGigStatus(gig.id, 'completed')}
                    className="bg-[#8CE600] text-black font-extrabold px-3 py-1.5 rounded-xl text-xs"
                  >
                    Mark Completed
                  </button>
                )}

                {gig.status === 'completed' && (
                  <button
                    onClick={() => setReviewModalGigId(gig.id)}
                    className="bg-amber-500 text-black font-extrabold px-3 py-1.5 rounded-xl text-xs"
                  >
                    Leave Review
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
            <h3 className="text-xl font-extrabold text-white font-display">Rate Experience</h3>
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button key={s} type="button" onClick={() => setRating(s)}>
                    <Star className={`w-7 h-7 ${s <= rating ? 'text-amber-400 fill-current' : 'text-gray-600'}`} />
                  </button>
                ))}
              </div>
              <textarea
                required
                rows={3}
                placeholder="Write your review..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full bg-[#090D0A] text-white text-xs rounded-2xl p-3 border border-gray-800"
              />
              <div className="flex gap-2">
                <button type="button" onClick={() => setReviewModalGigId(null)} className="flex-1 bg-gray-800 text-white font-bold py-2 rounded-xl text-xs">
                  Cancel
                </button>
                <button type="submit" className="flex-1 bg-[#8CE600] text-black font-extrabold py-2 rounded-xl text-xs">
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
