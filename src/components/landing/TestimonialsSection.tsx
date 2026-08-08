import React from 'react';
import { Star, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      quote: "Gigly helped me find someone to help move my heavy study desk in Indiranagar within 20 minutes! The counter-offer feature made negotiating fair prices super easy.",
      author: "Ananya Patel",
      role: "College Student & Freelancer",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
      tag: "Posted 8 tasks"
    },
    {
      quote: "I earn around ₹4,000 every week by completing parcel drop-offs and Wi-Fi setup tasks in Koramangala during my free evening hours. Best peer app ever!",
      author: "Rahul Sharma",
      role: "Tech Enthusiast & Gig Helper",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
      tag: "Completed 42 gigs"
    },
    {
      quote: "Needed someone to walk my dog while I was working extra hours. Found Priya on Gigly who was super friendly and punctual. Love the community trust ratings!",
      author: "Rohan Verma",
      role: "Software Engineer",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
      tag: "Posted 18 tasks"
    }
  ];

  return (
    <section className="py-20 bg-[#090D0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="px-3 py-1 rounded-full bg-[#8CE600]/10 text-[#8CE600] border border-[#8CE600]/30 text-xs font-extrabold uppercase tracking-widest">
            Community Love
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            Loved by Tasks Posters & Earners
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-[#121814] border border-gray-800 hover:border-[#8CE600]/40 transition-all flex flex-col justify-between relative"
            >
              <Quote className="w-8 h-8 text-[#8CE600]/20 absolute top-6 right-6" />
              
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-gray-300 leading-relaxed italic mb-6">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-800/80">
                <img
                  src={t.avatar}
                  alt={t.author}
                  className="w-11 h-11 rounded-2xl object-cover border border-[#8CE600]"
                />
                <div>
                  <h4 className="text-sm font-bold text-white">{t.author}</h4>
                  <p className="text-xs text-gray-400">{t.role}</p>
                  <span className="text-[10px] text-[#8CE600] font-semibold">{t.tag}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
