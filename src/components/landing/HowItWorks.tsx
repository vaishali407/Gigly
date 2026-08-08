import React from 'react';
import { Send, MessageSquare, CheckCircle, Search, DollarSign, Award } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  return (
    <section className="py-20 bg-[#0C120E] border-y border-gray-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="px-3 py-1 rounded-full bg-[#8CE600]/10 text-[#8CE600] border border-[#8CE600]/30 text-xs font-extrabold uppercase tracking-widest">
            Simple 3-Step Process
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
            How Gigly Works
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Whether you need help or have time to earn, Gigly makes connecting effortless.
          </p>
        </div>

        {/* Poster 3-Step Grid */}
        <div className="mb-20">
          <h3 className="text-center text-sm font-bold text-gray-300 uppercase tracking-wider mb-8 flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            For Task Posters (Need something done?)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Step 01 */}
            <div className="p-8 rounded-3xl bg-[#121814] border border-gray-800 hover:border-[#8CE600]/50 transition-all group relative overflow-hidden">
              <div className="text-5xl font-black text-[#8CE600]/20 font-display mb-4 group-hover:text-[#8CE600]/40 transition-colors">
                01
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#8CE600]/10 text-[#8CE600] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Send className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Post</h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                Describe what you need and set your starting price (Fixed or Negotiable).
              </p>
            </div>

            {/* Step 02 */}
            <div className="p-8 rounded-3xl bg-[#121814] border border-gray-800 hover:border-[#8CE600]/50 transition-all group relative overflow-hidden">
              <div className="text-5xl font-black text-[#8CE600]/20 font-display mb-4 group-hover:text-[#8CE600]/40 transition-colors">
                02
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#8CE600]/10 text-[#8CE600] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Connect</h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                People interested can contact you, negotiate prices transparently, and make offers.
              </p>
            </div>

            {/* Step 03 */}
            <div className="p-8 rounded-3xl bg-[#121814] border border-gray-800 hover:border-[#8CE600]/50 transition-all group relative overflow-hidden">
              <div className="text-5xl font-black text-[#8CE600]/20 font-display mb-4 group-hover:text-[#8CE600]/40 transition-colors">
                03
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#8CE600]/10 text-[#8CE600] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Get It Done</h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                Choose someone, mark the gig complete, and leave a review to build community trust.
              </p>
            </div>

          </div>
        </div>

        {/* Worker Journey Flow Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-[#121814] via-[#1A241C] to-[#121814] border border-[#8CE600]/30 shadow-2xl">
          <div className="text-center mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              Worker Journey
            </span>
            <h4 className="text-xl font-extrabold text-white mt-1">Want to earn on your terms?</h4>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            
            <div className="p-4 rounded-2xl bg-[#090D0A] border border-gray-800">
              <Search className="w-6 h-6 text-[#8CE600] mx-auto mb-2" />
              <span className="text-xs font-extrabold text-gray-400 block mb-1">01. FIND</span>
              <p className="text-xs text-white font-semibold">Discover nearby micro-tasks</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#090D0A] border border-gray-800">
              <DollarSign className="w-6 h-6 text-[#8CE600] mx-auto mb-2" />
              <span className="text-xs font-extrabold text-gray-400 block mb-1">02. OFFER</span>
              <p className="text-xs text-white font-semibold">Submit fair price offer</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#090D0A] border border-gray-800">
              <CheckCircle className="w-6 h-6 text-[#8CE600] mx-auto mb-2" />
              <span className="text-xs font-extrabold text-gray-400 block mb-1">03. COMPLETE</span>
              <p className="text-xs text-white font-semibold">Perform the task cleanly</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#090D0A] border border-gray-800">
              <Award className="w-6 h-6 text-[#8CE600] mx-auto mb-2" />
              <span className="text-xs font-extrabold text-gray-400 block mb-1">04. EARN</span>
              <p className="text-xs text-white font-semibold">Get paid & get 5⭐ rating</p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
