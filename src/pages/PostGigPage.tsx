import React, { useState } from 'react';
import { useGigly } from '../context/GiglyContext';
import { formatCurrency } from '../utils/helpers';
import { PlusCircle, Sparkles, MapPin, Calendar, Clock, Handshake, Check, ArrowRight, ArrowLeft } from 'lucide-react';

export const PostGigPage: React.FC = () => {
  const { categories, postGig, navigate } = useGigly();

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Errands');
  const [description, setDescription] = useState('');
  const [urgent, setUrgent] = useState(false);
  const [locationName, setLocationName] = useState('Koramangala 5th Block');
  const [date, setDate] = useState('Today · 6:00 PM');
  const [estimatedDuration, setEstimatedDuration] = useState('1 hour');
  const [price, setPrice] = useState<number>(300);
  const [isNegotiable, setIsNegotiable] = useState(true);

  const handlePublish = () => {
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

    navigate('/gigs');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Page Title */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
          Post a Gig
        </h1>
        <p className="text-xs text-gray-400">
          Create a task in 5 simple steps and find trusted local helpers.
        </p>
      </div>

      {/* Step Progress Tracker */}
      <div className="flex items-center justify-between max-w-xl mx-auto px-4">
        {[1, 2, 3, 4, 5].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
              s === step
                ? 'bg-[#8CE600] text-black ring-4 ring-[#8CE600]/20 shadow-lg'
                : s < step
                ? 'bg-emerald-500 text-black'
                : 'bg-[#121814] text-gray-500 border border-gray-800'
            }`}>
              {s < step ? <Check className="w-4 h-4 stroke-[3]" /> : s}
            </div>
            {s < 5 && <div className={`h-0.5 w-6 sm:w-12 transition-colors ${s < step ? 'bg-emerald-500' : 'bg-gray-800'}`} />}
          </div>
        ))}
      </div>

      {/* Step Container Card */}
      <div className="p-8 rounded-3xl bg-[#121814] border border-[#8CE600]/30 shadow-2xl space-y-6">
        
        {/* Step 1: What do you need? */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#8CE600] uppercase tracking-wider">Step 1 of 5</span>
              <h2 className="text-xl font-extrabold text-white">What do you need done?</h2>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                Gig Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. 'Pick up parcel from courier hub' or 'Help moving sofa'"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-[#090D0A] text-white placeholder-gray-500 text-sm rounded-2xl p-4 border border-gray-800 focus:border-[#8CE600] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                Category <span className="text-rose-500">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#090D0A] text-white text-sm rounded-2xl p-4 border border-gray-800 focus:border-[#8CE600] focus:outline-none cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.emoji} {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              disabled={!title.trim()}
              onClick={() => setStep(2)}
              className="w-full bg-[#8CE600] hover:bg-[#78C800] disabled:opacity-50 text-black font-extrabold py-4 rounded-2xl text-xs transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <span>Next: Describe Task</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        )}

        {/* Step 2: Describe the task */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#8CE600] uppercase tracking-wider">Step 2 of 5</span>
              <h2 className="text-xl font-extrabold text-white">Describe the task details</h2>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                Full Description <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={4}
                placeholder="Explain clearly what needs to be done, package dimensions, instructions..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-[#090D0A] text-white placeholder-gray-500 text-sm rounded-2xl p-4 border border-gray-800 focus:border-[#8CE600] focus:outline-none"
              />
            </div>

            <label className="flex items-center gap-3 p-4 rounded-2xl bg-[#090D0A] border border-gray-800 cursor-pointer">
              <input
                type="checkbox"
                checked={urgent}
                onChange={(e) => setUrgent(e.target.checked)}
                className="w-4 h-4 rounded accent-amber-400"
              />
              <span className="text-xs font-bold text-amber-400">⚡ Mark task as Urgent (High priority badge)</span>
            </label>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 bg-gray-800 text-white font-bold py-4 rounded-2xl text-xs"
              >
                Back
              </button>
              <button
                disabled={!description.trim()}
                onClick={() => setStep(3)}
                className="flex-1 bg-[#8CE600] hover:bg-[#78C800] disabled:opacity-50 text-black font-extrabold py-4 rounded-2xl text-xs shadow-lg flex items-center justify-center gap-2"
              >
                <span>Next: Location & Time</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Where and when? */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#8CE600] uppercase tracking-wider">Step 3 of 5</span>
              <h2 className="text-xl font-extrabold text-white">Where and when?</h2>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#8CE600]" /> Approximate Location
              </label>
              <input
                type="text"
                placeholder="e.g. 'Koramangala 5th Block'"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                className="w-full bg-[#090D0A] text-white text-sm rounded-2xl p-4 border border-gray-800 focus:border-[#8CE600] focus:outline-none"
              />
              <p className="text-[10px] text-gray-500 mt-1">Exact home addresses are protected and hidden from public feeds.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#8CE600]" /> Date & Time
                </label>
                <input
                  type="text"
                  placeholder="e.g. 'Today · 6:00 PM'"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-[#090D0A] text-white text-sm rounded-2xl p-4 border border-gray-800 focus:border-[#8CE600] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#8CE600]" /> Estimated Duration
                </label>
                <input
                  type="text"
                  placeholder="e.g. '1 hour'"
                  value={estimatedDuration}
                  onChange={(e) => setEstimatedDuration(e.target.value)}
                  className="w-full bg-[#090D0A] text-white text-sm rounded-2xl p-4 border border-gray-800 focus:border-[#8CE600] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="flex-1 bg-gray-800 text-white font-bold py-4 rounded-2xl text-xs"
              >
                Back
              </button>
              <button
                onClick={() => setStep(4)}
                className="flex-1 bg-[#8CE600] hover:bg-[#78C800] text-black font-extrabold py-4 rounded-2xl text-xs shadow-lg flex items-center justify-center gap-2"
              >
                <span>Next: Set Price</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Set your price */}
        {step === 4 && (
          <div className="space-y-6 animate-in fade-in">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#8CE600] uppercase tracking-wider">Step 4 of 5</span>
              <h2 className="text-xl font-extrabold text-white">Set your starting price</h2>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                Price (₹) <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                min="50"
                max="10000"
                step="50"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full bg-[#090D0A] text-white text-2xl font-black rounded-2xl p-4 border border-gray-800 focus:border-[#8CE600] focus:outline-none font-display"
              />
            </div>

            <div className="p-4 rounded-2xl bg-[#090D0A] border border-gray-800 space-y-3">
              <span className="text-xs font-bold text-gray-300 uppercase tracking-wider block">
                Negotiation Option
              </span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setIsNegotiable(true)}
                  className={`p-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all ${
                    isNegotiable
                      ? 'bg-amber-500/20 text-amber-400 border-amber-500/50'
                      : 'bg-gray-900 text-gray-400 border-gray-800'
                  }`}
                >
                  <Handshake className="w-4 h-4" />
                  <span>Negotiable</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsNegotiable(false)}
                  className={`p-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all ${
                    !isNegotiable
                      ? 'bg-[#8CE600]/20 text-[#8CE600] border-[#8CE600]/50'
                      : 'bg-gray-900 text-gray-400 border-gray-800'
                  }`}
                >
                  <span>Fixed Price</span>
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(3)}
                className="flex-1 bg-gray-800 text-white font-bold py-4 rounded-2xl text-xs"
              >
                Back
              </button>
              <button
                onClick={() => setStep(5)}
                className="flex-1 bg-[#8CE600] hover:bg-[#78C800] text-black font-extrabold py-4 rounded-2xl text-xs shadow-lg flex items-center justify-center gap-2"
              >
                <span>Next: Review & Publish</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Review and publish */}
        {step === 5 && (
          <div className="space-y-6 animate-in fade-in">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#8CE600] uppercase tracking-wider">Step 5 of 5</span>
              <h2 className="text-xl font-extrabold text-white">Review & Publish Task</h2>
            </div>

            <div className="p-6 rounded-2xl bg-[#090D0A] border border-[#8CE600]/40 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-gray-400">{category}</span>
                <span className="text-2xl font-black text-[#8CE600] font-display">₹{price}</span>
              </div>

              <h3 className="text-lg font-bold text-white">{title}</h3>
              <p className="text-xs text-gray-300 whitespace-pre-line">{description}</p>

              <div className="pt-3 border-t border-gray-800 text-xs text-gray-400 flex flex-wrap justify-between gap-2">
                <span>📍 {locationName}</span>
                <span>📅 {date} ({estimatedDuration})</span>
                <span>🤝 {isNegotiable ? 'Negotiable' : 'Fixed'}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(4)}
                className="flex-1 bg-gray-800 text-white font-bold py-4 rounded-2xl text-xs"
              >
                Back to Edit
              </button>
              <button
                onClick={handlePublish}
                className="flex-1 bg-[#8CE600] hover:bg-[#78C800] text-black font-extrabold py-4 rounded-2xl text-xs shadow-xl neon-glow flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Publish Gig Now</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
