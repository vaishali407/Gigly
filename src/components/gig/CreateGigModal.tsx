import React, { useState } from 'react';
import { useGigly } from '../../context/GiglyContext';
import { X, PlusCircle, Eye, Sparkles, MapPin, Calendar, Clock, Handshake, AlertCircle } from 'lucide-react';

export const CreateGigModal: React.FC = () => {
  const { activeModal, closeModal, postGig, categories, currentUser } = useGigly();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Errands');
  const [description, setDescription] = useState('');
  const [locationName, setLocationName] = useState('Koramangala 5th Block');
  const [date, setDate] = useState('Today · 6:00 PM');
  const [estimatedDuration, setEstimatedDuration] = useState('1 hour');
  const [price, setPrice] = useState(300);
  const [isNegotiable, setIsNegotiable] = useState(true);
  const [urgent, setUrgent] = useState(false);
  const [step, setStep] = useState<'form' | 'preview'>('form');

  if (activeModal !== 'create_gig') return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    postGig({
      title,
      category,
      description,
      locationName,
      distanceKm: 1.5,
      date,
      estimatedDuration,
      price: Number(price),
      isNegotiable,
      urgent,
    });

    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#121814] border border-[#8CE600]/30 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 my-8">
        
        {/* Header */}
        <div className="p-6 bg-[#090D0A] border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#8CE600]/10 text-[#8CE600] flex items-center justify-center">
              <PlusCircle className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-white font-display">Post a Micro-Gig</h2>
              <p className="text-xs text-gray-400">Reach nearby trusted helpers in minutes</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setStep(step === 'form' ? 'preview' : 'form')}
              className="px-3.5 py-1.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-xs font-bold text-gray-200 flex items-center gap-1.5 transition-colors"
            >
              <Eye className="w-4 h-4 text-[#8CE600]" />
              <span>{step === 'form' ? 'Preview Card' : 'Edit Form'}</span>
            </button>

            <button
              onClick={closeModal}
              className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
            
            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                Gig Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 'Need someone to pick up my parcel' or 'Help moving desk'"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-[#090D0A] text-white placeholder-gray-500 text-sm rounded-2xl p-3.5 border border-gray-800 focus:border-[#8CE600] focus:outline-none"
              />
            </div>

            {/* Category & Starting Price */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                  Category <span className="text-rose-500">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#090D0A] text-white text-sm rounded-2xl p-3.5 border border-gray-800 focus:border-[#8CE600] focus:outline-none cursor-pointer"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.emoji} {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                  Starting Price (₹) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  min="50"
                  max="10000"
                  step="50"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full bg-[#090D0A] text-white text-sm font-bold rounded-2xl p-3.5 border border-gray-800 focus:border-[#8CE600] focus:outline-none"
                />
              </div>
            </div>

            {/* Pricing Strategy: Fixed vs Negotiable */}
            <div className="p-4 rounded-2xl bg-[#090D0A] border border-gray-800 space-y-2">
              <span className="text-xs font-bold text-gray-300 uppercase tracking-wider block">
                Pricing Flexibility
              </span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setIsNegotiable(true)}
                  className={`p-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all ${
                    isNegotiable
                      ? 'bg-amber-500/20 text-amber-400 border-amber-500/50'
                      : 'bg-gray-900 text-gray-400 border-gray-800'
                  }`}
                >
                  <Handshake className="w-4 h-4" />
                  <span>Negotiable (Open for offers)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsNegotiable(false)}
                  className={`p-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all ${
                    !isNegotiable
                      ? 'bg-[#8CE600]/20 text-[#8CE600] border-[#8CE600]/50'
                      : 'bg-gray-900 text-gray-400 border-gray-800'
                  }`}
                >
                  <span>Fixed Price (₹{price})</span>
                </button>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                Task Description <span className="text-rose-500">*</span>
              </label>
              <textarea
                required
                rows={3}
                placeholder="Explain clearly what needs to be done, location requirements, or special instructions..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-[#090D0A] text-white placeholder-gray-500 text-sm rounded-2xl p-3.5 border border-gray-800 focus:border-[#8CE600] focus:outline-none"
              />
            </div>

            {/* Location & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#8CE600]" /> Approximate Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. 'Koramangala 5th Block'"
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  className="w-full bg-[#090D0A] text-white text-sm rounded-2xl p-3.5 border border-gray-800 focus:border-[#8CE600] focus:outline-none"
                />
                <p className="text-[10px] text-gray-500 mt-1">Exact home address is never shown publicly for safety.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#8CE600]" /> Date & Time
                </label>
                <input
                  type="text"
                  placeholder="e.g. 'Today · 6:00 PM'"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-[#090D0A] text-white text-sm rounded-2xl p-3.5 border border-gray-800 focus:border-[#8CE600] focus:outline-none"
                />
              </div>
            </div>

            {/* Estimated Duration & Urgent Toggle */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-[#090D0A] border border-gray-800">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-xs font-bold text-gray-300">Estimated Duration:</span>
                <input
                  type="text"
                  value={estimatedDuration}
                  onChange={(e) => setEstimatedDuration(e.target.value)}
                  className="bg-gray-900 text-white text-xs rounded-xl px-3 py-1.5 border border-gray-800 w-28 focus:outline-none"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-amber-400">
                <input
                  type="checkbox"
                  checked={urgent}
                  onChange={(e) => setUrgent(e.target.checked)}
                  className="w-4 h-4 rounded accent-amber-400"
                />
                <span className="flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> Mark Urgent
                </span>
              </label>
            </div>

            {/* Submit Action */}
            <div className="pt-3 flex gap-3">
              <button
                type="button"
                onClick={() => setStep('preview')}
                className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-bold py-3.5 rounded-2xl transition-colors text-sm"
              >
                Preview First
              </button>

              <button
                type="submit"
                className="flex-1 bg-[#8CE600] hover:bg-[#78C800] text-black font-extrabold py-3.5 rounded-2xl transition-all shadow-xl neon-glow text-sm flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Publish Gig Now</span>
              </button>
            </div>

          </form>
        ) : (
          /* Live Card Preview */
          <div className="p-8 space-y-6">
            <div className="text-center space-y-1">
              <span className="text-xs font-extrabold text-[#8CE600] uppercase tracking-wider">
                Live Gig Preview
              </span>
              <p className="text-xs text-gray-400">This is how your task card will appear in the marketplace feed.</p>
            </div>

            <div className="p-6 rounded-3xl bg-[#121814] border border-[#8CE600]/50 shadow-2xl max-w-md mx-auto space-y-4">
              <div className="flex justify-between items-center">
                <span className="px-3 py-1 rounded-full bg-[#090D0A] border border-gray-800 text-xs font-bold text-gray-300">
                  {category}
                </span>
                <span className="text-xs text-[#8CE600] font-bold">Just now</span>
              </div>

              <h3 className="text-lg font-bold text-white">{title || 'Your Gig Title Here'}</h3>
              <p className="text-xs text-gray-400">{description || 'Task description preview...'}</p>

              <div className="p-3.5 rounded-2xl bg-[#090D0A] border border-gray-800 flex justify-between items-center">
                <div>
                  <span className="text-xl font-extrabold text-[#8CE600]">₹{price}</span>
                  <p className="text-[10px] text-amber-400">{isNegotiable ? 'Negotiable' : 'Fixed Price'}</p>
                </div>
                <span className="text-xs text-gray-400">Posted by {currentUser.name}</span>
              </div>

              <div className="text-xs text-gray-300 space-y-1">
                <p>📍 {locationName}</p>
                <p>📅 {date} · {estimatedDuration}</p>
              </div>
            </div>

            <div className="flex gap-4 max-w-md mx-auto">
              <button
                type="button"
                onClick={() => setStep('form')}
                className="flex-1 bg-gray-800 text-white font-bold py-3.5 rounded-2xl text-xs hover:bg-gray-700 transition-colors"
              >
                Back to Edit
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="flex-1 bg-[#8CE600] text-black font-extrabold py-3.5 rounded-2xl text-xs hover:bg-[#78C800] transition-colors shadow-lg neon-glow"
              >
                Publish Gig
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
