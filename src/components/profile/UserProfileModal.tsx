import React from 'react';
import { useGigly } from '../../context/GiglyContext';
import { X, Star, MapPin, Calendar, CheckCircle2 } from 'lucide-react';

export const UserProfileModal: React.FC = () => {
  const { activeModal, closeModal, selectedUserId, allUsers, reviews } = useGigly();

  if (activeModal !== 'profile' || !selectedUserId) return null;

  const user = allUsers.find(u => u.id === selectedUserId) || allUsers[0];
  const userReviews = reviews.filter(r => r.revieweeId === user.id);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#121814] border border-[#8CE600]/40 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 my-8">
        
        {/* Header Cover Banner */}
        <div className="h-28 bg-gradient-to-r from-[#18241B] via-[#8CE600]/20 to-[#18241B] relative p-4 flex items-start justify-end">
          <button
            onClick={closeModal}
            className="p-2 rounded-xl bg-black/50 text-gray-300 hover:text-white backdrop-blur-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Details Container */}
        <div className="px-6 pb-6 space-y-6 -mt-12 relative">
          
          {/* Avatar & Header Info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div className="flex items-end gap-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-3xl object-cover border-4 border-[#121814] shadow-2xl"
              />
              <div className="mb-1">
                <div className="flex items-center gap-1.5">
                  <h2 className="text-2xl font-extrabold text-white font-display">{user.name}</h2>
                  {user.isVerified && <CheckCircle2 className="w-5 h-5 text-[#8CE600]" />}
                </div>
                <p className="text-xs text-amber-400 font-bold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-current" /> {user.rating} · ({user.reviewCount} reviews)
                </p>
              </div>
            </div>

            <span className="px-3.5 py-1 rounded-full bg-[#8CE600]/10 text-[#8CE600] border border-[#8CE600]/30 text-xs font-bold">
              Dual-Role Member 🔄
            </span>
          </div>

          {/* Stats Metrics Grid */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-[#090D0A] border border-gray-800 text-center">
            <div>
              <span className="text-xl font-black text-[#8CE600] font-display block">
                {user.completedGigs}
              </span>
              <span className="text-[10px] font-semibold text-gray-400 uppercase">Gigs Completed</span>
            </div>

            <div>
              <span className="text-xl font-black text-white font-display block">
                {user.postedGigs}
              </span>
              <span className="text-[10px] font-semibold text-gray-400 uppercase">Gigs Posted</span>
            </div>

            <div>
              <span className="text-xl font-black text-emerald-400 font-display block">
                {user.responseRate}
              </span>
              <span className="text-[10px] font-semibold text-gray-400 uppercase">Response Rate</span>
            </div>
          </div>

          {/* Short Bio */}
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">About</h4>
            <p className="text-xs text-gray-200 leading-relaxed bg-[#090D0A] p-3 rounded-xl border border-gray-800/80">
              {user.bio}
            </p>
          </div>

          {/* Skills Badges */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Verified Skills</h4>
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-xl bg-[#18201A] text-[#8CE600] border border-[#8CE600]/30 text-xs font-bold"
                >
                  `{skill}`
                </span>
              ))}
            </div>
          </div>

          {/* Location & Member Info */}
          <div className="flex flex-wrap gap-4 text-xs text-gray-400 pt-2 border-t border-gray-800">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#8CE600]" /> {user.location}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-gray-400" /> Joined {user.memberSince}
            </span>
          </div>

          {/* Reviews List Section */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center justify-between">
              <span>Community Reviews ({userReviews.length})</span>
              <span className="text-[#8CE600] text-[11px]">⭐ 100% Satisfaction</span>
            </h4>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {userReviews.length === 0 ? (
                <div className="text-xs text-gray-500 py-4 text-center bg-[#090D0A] rounded-xl">
                  No public written reviews yet.
                </div>
              ) : (
                userReviews.map((rev) => (
                  <div key={rev.id} className="p-3 rounded-2xl bg-[#090D0A] border border-gray-800 space-y-1 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white flex items-center gap-1">
                        <Star className="w-3 h-3 text-amber-400 fill-current" /> {rev.reviewerName}
                      </span>
                      <span className="text-[10px] text-gray-500">{rev.date}</span>
                    </div>
                    <p className="text-gray-300 italic">"{rev.comment}"</p>
                    <span className="text-[9px] text-gray-500 block">Gig: {rev.gigTitle}</span>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
