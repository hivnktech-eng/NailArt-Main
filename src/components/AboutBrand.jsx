import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Users, Sparkles, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  { icon: Users,    value: '5,000+', label: 'Happy Clients',     color: '#FF6FAE' },
  { icon: Award,    value: '12+',    label: 'Industry Awards',   color: '#E6A4B4' },
  { icon: Sparkles, value: '200+',   label: 'Unique Designs',    color: '#FF6FAE' },
  { icon: Heart,    value: '8 Years', label: 'Of Excellence',    color: '#E6A4B4' },
];

const AboutBrand = () => {
  const sectionRef = useRef(null);
  const textRef    = useRef(null);
  const visualRef  = useRef(null);
  const statsRef   = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(textRef.current.children,
        { opacity: 0, x: -60 },
        { opacity: 1, x: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: textRef.current, start: 'top 75%', once: true } }
      );

      gsap.fromTo(visualRef.current,
        { opacity: 0, x: 60, scale: 0.95 },
        { opacity: 1, x: 0, scale: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: visualRef.current, start: 'top 75%', once: true } }
      );

      const stats = statsRef.current.querySelectorAll('.stat-card');
      gsap.fromTo(stats,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'back.out(1.5)',
          scrollTrigger: { trigger: statsRef.current, start: 'top 80%', once: true } }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-28 px-6 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#FADADD]/30 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">

          {/* Text */}
          <div ref={textRef} className="space-y-6">
            <span className="inline-block font-poppins text-xs tracking-[0.3em] uppercase text-[#FF6FAE] bg-[#FF6FAE]/8 px-4 py-2 rounded-full border border-[#FF6FAE]/20">
              Our Story
            </span>
            <h2 className="font-playfair font-bold text-gray-900 leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
              More Than a Salon,<br />
              <span className="text-[#FF6FAE] italic">It's a Sanctuary</span>
            </h2>
            <div className="h-px bg-gradient-to-r from-[#FF6FAE]/50 to-transparent w-24" />
            <p className="font-poppins text-gray-500 text-lg leading-relaxed">
              NailMuse was born from a deep passion for beauty and the belief that your nails are a canvas for self-expression. We combine the finest premium materials with master-level artisans trained globally.
            </p>
            <p className="font-poppins text-gray-400 leading-relaxed italic border-l-2 border-[#FF6FAE]/40 pl-4">
              "Every appointment is a ritual. Every design is a story."
              <span className="block mt-2 text-sm not-italic text-[#FF6FAE] font-medium">— Sofia M., Founder</span>
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              {['Premium Materials', 'Trained Artists', 'Hygienic Certified', 'Cruelty Free'].map(tag => (
                <span key={tag} className="px-4 py-2 rounded-full bg-[#FADADD]/60 border border-[#FF6FAE]/20 text-gray-600 font-poppins text-xs font-medium">
                  ✓ {tag}
                </span>
              ))}
            </div>
            <button className="group relative overflow-hidden px-9 py-3.5 rounded-full bg-gradient-to-r from-[#FF6FAE] to-[#E6A4B4] text-white font-poppins font-semibold tracking-wider text-sm shadow-lg shadow-[#FF6FAE]/25 hover:shadow-[#FF6FAE]/40 hover:-translate-y-1 transition-all duration-300">
              <span className="relative z-10">Discover Our Story</span>
            </button>
          </div>

          {/* Visual — real Unsplash image */}
          <div ref={visualRef} className="relative">
            {/* Glow */}
            <div className="absolute -inset-4 bg-gradient-to-br from-[#FF6FAE]/12 to-[#E6A4B4]/6 rounded-[2.5rem] blur-2xl -z-10" />

            {/* Main image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-[#FF6FAE]/15 border border-[#FF6FAE]/10">
              <img
                src="https://images.unsplash.com/photo-1604654894761-3e8a4f9b4f99?w=800&h=960&fit=crop&auto=format&q=85"
                alt="Nail studio"
                className="w-full h-[480px] object-cover"
                loading="lazy"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              {/* Brand pill at bottom */}
              <div className="absolute bottom-5 left-5 right-5 bg-white/85 backdrop-blur-md rounded-2xl px-5 py-3 flex items-center justify-between">
                <div>
                  <div className="font-playfair font-bold text-gray-800">NailMuse Studio</div>
                  <div className="font-poppins text-gray-400 text-xs tracking-widest uppercase">Luxury Nail Artistry</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF6FAE] to-[#E6A4B4] flex items-center justify-center shadow-md">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#FF6FAE] rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg rotate-12">💅</div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-[#E6A4B4] rounded-xl flex items-center justify-center text-white shadow-lg -rotate-6">✨</div>

            {/* Second accent image */}
            <div className="absolute -top-6 -left-6 w-28 h-28 rounded-2xl overflow-hidden shadow-xl border-2 border-white">
              <img
                src="https://images.unsplash.com/photo-1604654894610-df63bc536371?w=200&h=200&fit=crop&auto=format&q=85"
                alt="Nail detail"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {milestones.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="stat-card text-center p-7 rounded-2xl bg-gradient-to-br from-[#FADADD]/60 to-white border border-[#FF6FAE]/10 hover:border-[#FF6FAE]/30 hover:shadow-xl hover:shadow-[#FF6FAE]/10 transition-all duration-400 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center"
                  style={{ background: `${stat.color}15`, border: `1.5px solid ${stat.color}30` }}>
                  <Icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
                <div className="font-playfair font-bold text-3xl text-gray-800 mb-1">{stat.value}</div>
                <div className="font-poppins text-gray-400 text-sm">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutBrand;
