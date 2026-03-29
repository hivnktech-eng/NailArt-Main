import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const designs = [
  {
    id: 1, name: 'Rose Petal Bloom', style: 'Floral Art', rating: 4.9, likes: 2340,
    img: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&h=720&fit=crop&auto=format&q=85',
  },
  {
    id: 2, name: 'Chrome Mirror', style: 'Metallic', rating: 4.8, likes: 1890,
    img: 'https://images.unsplash.com/photo-1604655855745-2437e20cd268?w=600&h=720&fit=crop&auto=format&q=85',
  },
  {
    id: 3, name: 'Sakura Whisper', style: 'Japanese', rating: 5.0, likes: 3120,
    img: 'https://images.unsplash.com/photo-1519143686571-bc5e0bf9b9df?w=600&h=720&fit=crop&auto=format&q=85',
  },
  {
    id: 4, name: 'Gold Foil Abstract', style: 'Luxury', rating: 4.7, likes: 1640,
    img: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=600&h=720&fit=crop&auto=format&q=85',
  },
  {
    id: 5, name: 'Pastel Ombre', style: 'Gradient', rating: 4.9, likes: 2850,
    img: 'https://images.unsplash.com/photo-1604655074621-4ffed2e25f22?w=600&h=720&fit=crop&auto=format&q=85',
  },
  {
    id: 6, name: 'Crystal Gem', style: 'Embellished', rating: 4.8, likes: 2100,
    img: 'https://images.unsplash.com/photo-1604654894761-3e8a4f9b4f99?w=600&h=720&fit=crop&auto=format&q=85',
  },
];

const FALLBACK_GRADIENTS = [
  'from-rose-200 to-pink-300',
  'from-fuchsia-100 to-rose-200',
  'from-pink-100 to-red-100',
  'from-amber-100 to-rose-200',
  'from-purple-100 to-pink-200',
  'from-sky-100 to-fuchsia-100',
];

const TrendingDesigns = () => {
  const sectionRef = useRef(null);
  const titleRef   = useRef(null);
  const cardsRef   = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current.children,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 80%', once: true } }
      );

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(card,
          { opacity: 0, y: 80, scale: 0.93 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out',
            delay: (i % 3) * 0.12,
            scrollTrigger: { trigger: card, start: 'top 85%', once: true } }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-28 px-6 relative overflow-hidden bg-white">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FF6FAE]/30 to-transparent" />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#FADADD]/60 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#FFC0CB]/30 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="inline-block font-poppins text-xs tracking-[0.3em] uppercase text-[#FF6FAE] mb-4 bg-[#FF6FAE]/8 px-4 py-2 rounded-full border border-[#FF6FAE]/20">
            🔥 What's Hot
          </span>
          <h2 className="font-playfair font-bold text-gray-900 mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
            Trending Nail Designs
          </h2>
          <p className="font-poppins text-gray-400 max-w-xl mx-auto leading-relaxed">
            Our most-loved styles handpicked by thousands of beauty enthusiasts worldwide
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {designs.map((design, i) => (
            <div
              key={design.id}
              ref={el => cardsRef.current[i] = el}
              className="group relative rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl hover:shadow-[#FF6FAE]/15 transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-72 overflow-hidden">
                <img
                  src={design.img}
                  alt={design.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  onError={e => {
                    e.target.style.display = 'none';
                    e.target.parentNode.classList.add(`bg-gradient-to-br`, FALLBACK_GRADIENTS[i]);
                  }}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                {/* Style badge */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-poppins font-semibold rounded-full tracking-wide border border-white/30">
                  {design.style}
                </div>

                {/* Trending badge */}
                {i < 2 && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-[#FF6FAE] text-white text-xs font-poppins font-semibold rounded-full tracking-wide shadow-lg">
                    Trending 🔥
                  </div>
                )}

                {/* Like button */}
                <button className="absolute bottom-4 right-4 p-2.5 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/60 transition-all duration-300 opacity-0 group-hover:opacity-100">
                  <Heart className="w-4 h-4 text-white hover:fill-[#FF6FAE] hover:text-[#FF6FAE] transition-all duration-300" />
                </button>
              </div>

              {/* Card info */}
              <div className="p-5 bg-white border-b border-l border-r border-gray-100 rounded-b-3xl group-hover:border-[#FF6FAE]/20 transition-colors duration-300">
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="font-playfair font-bold text-gray-800 text-lg">{design.name}</h3>
                  <div className="flex items-center gap-1 text-[#FF6FAE]">
                    <Star className="w-3.5 h-3.5 fill-[#FF6FAE]" />
                    <span className="font-poppins text-sm font-semibold">{design.rating}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-poppins text-gray-400 text-xs">{design.likes.toLocaleString()} loves</span>
                  <button className="font-poppins text-xs text-[#FF6FAE] hover:text-[#E6A4B4] font-medium transition-colors">
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View all */}
        <div className="text-center mt-14">
          <button className="group relative overflow-hidden px-12 py-4 rounded-full border-2 border-[#FF6FAE] text-[#FF6FAE] font-poppins font-semibold tracking-widest text-sm uppercase hover:text-white transition-all duration-500 hover:-translate-y-1">
            <span className="relative z-10">View All Designs</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF6FAE] to-[#E6A4B4] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TrendingDesigns;
