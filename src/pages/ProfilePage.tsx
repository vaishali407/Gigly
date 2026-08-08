import React, { useState } from 'react';
import { useGigly } from '../context/GiglyContext';
import { Star, MapPin, CheckCircle2, Edit3, Save } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { currentUser, reviews } = useGigly();

  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState(currentUser.name);
  const [bio, setBio] = useState(currentUser.bio);
  const [skills, setSkills] = useState(currentUser.skills.join(', '));
  const [userLocation, setUserLocation] = useState(currentUser.location);

  const userReviews = reviews.filter(r => r.revieweeId === currentUser.id);

  const handleSave = () => {
    currentUser.name = userName;
    currentUser.bio = bio;
    currentUser.skills = skills.split(',').map(s => s.trim()).filter(Boolean);
    currentUser.location = userLocation;
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Profile Header */}
      <div className="p-8 rounded-3xl bg-[#121814] border border-[#8CE600]/30 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-gray-800 pb-6">
          <div className="flex items-center gap-5">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-20 h-20 rounded-3xl object-cover border-2 border-[#8CE600] shadow-xl"
            />
            <div>
              <div className="flex items-center gap-2">
                {isEditing ? (
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="bg-[#090D0A] text-white text-lg font-bold px-3 py-1 rounded-xl border border-gray-800 focus:border-[#8CE600] focus:outline-none"
                  />
                ) : (
                  <h1 className="text-2xl font-extrabold text-white font-display">{currentUser.name}</h1>
                )}
                <CheckCircle2 className="w-5 h-5 text-[#8CE600]" />
              </div>
              <p className="text-xs text-amber-400 font-bold flex items-center gap-1 mt-1">
                <Star className="w-4 h-4 fill-current" /> {currentUser.rating} · ({currentUser.reviewCount} reviews)
              </p>
              <p className="text-xs text-[#8CE600] font-bold flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5" />
                {isEditing ? (
                  <input
                    type="text"
                    value={userLocation}
                    onChange={(e) => setUserLocation(e.target.value)}
                    className="bg-[#090D0A] text-white text-xs px-2 py-1 rounded border border-gray-800 focus:outline-none"
                  />
                ) : (
                  <span>{currentUser.location}</span>
                )}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              if (isEditing) handleSave();
              else setIsEditing(true);
            }}
            className="bg-[#8CE600] hover:bg-[#78C800] text-black font-extrabold px-5 py-2.5 rounded-2xl text-xs flex items-center gap-2 transition-all shadow-md"
          >
            {isEditing ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
            <span>{isEditing ? 'Save Profile' : 'Edit Profile'}</span>
          </button>
        </div>

        {/* Profile Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-2xl bg-[#090D0A] border border-gray-800">
            <span className="text-2xl font-black text-[#8CE600] font-display block">
              {currentUser.completedGigs}
            </span>
            <span className="text-[10px] font-semibold text-gray-400 uppercase">Gigs Completed</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#090D0A] border border-gray-800">
            <span className="text-2xl font-black text-white font-display block">
              {currentUser.postedGigs}
            </span>
            <span className="text-[10px] font-semibold text-gray-400 uppercase">Gigs Posted</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#090D0A] border border-gray-800">
            <span className="text-2xl font-black text-emerald-400 font-display block">
              {currentUser.responseRate}
            </span>
            <span className="text-[10px] font-semibold text-gray-400 uppercase">Response Rate</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#090D0A] border border-gray-800">
            <span className="text-2xl font-black text-amber-400 font-display block">
              ⭐ {currentUser.rating}
            </span>
            <span className="text-[10px] font-semibold text-gray-400 uppercase">Overall Rating</span>
          </div>
        </div>

        {/* Bio Section */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Bio</h3>
          {isEditing ? (
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full bg-[#090D0A] text-white text-xs rounded-2xl p-4 border border-gray-800 focus:border-[#8CE600] focus:outline-none"
            />
          ) : (
            <p className="text-xs text-gray-200 leading-relaxed bg-[#090D0A] p-4 rounded-2xl border border-gray-800">
              {currentUser.bio}
            </p>
          )}
        </div>

        {/* Skills Section */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Skills</h3>
          {isEditing ? (
            <input
              type="text"
              placeholder="Comma separated skills (e.g. Delivery, Tech Help, Moving)"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="w-full bg-[#090D0A] text-white text-xs rounded-2xl p-4 border border-gray-800 focus:border-[#8CE600] focus:outline-none"
            />
          ) : (
            <div className="flex flex-wrap gap-2">
              {currentUser.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-xl bg-[#18201A] text-[#8CE600] border border-[#8CE600]/30 text-xs font-bold"
                >
                  `{skill}`
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Reviews Section */}
        <div className="space-y-3 pt-4 border-t border-gray-800">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center justify-between">
            <span>Reviews & Reputation ({userReviews.length})</span>
            <span className="text-[#8CE600] text-xs">⭐ 100% Community Trust</span>
          </h3>

          <div className="space-y-3">
            {userReviews.length === 0 ? (
              <p className="text-xs text-gray-500 py-4 text-center">No reviews written yet.</p>
            ) : (
              userReviews.map((rev) => (
                <div key={rev.id} className="p-4 rounded-2xl bg-[#090D0A] border border-gray-800 space-y-1 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-current" /> {rev.reviewerName}
                    </span>
                    <span className="text-[10px] text-gray-500">{rev.date}</span>
                  </div>
                  <p className="text-gray-300 italic">"{rev.comment}"</p>
                  <span className="text-[10px] text-gray-500 block">Gig: {rev.gigTitle}</span>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
