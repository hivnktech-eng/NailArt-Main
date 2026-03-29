import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    name: 'French Elegance',
    desc: 'Timeless classic reimagined with a modern twist',
    count: '45 styles',
    tag: 'Classic',
    img: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&h=700&fit=crop&auto=format&q=85',
    accent: '#FF6FAE',
    gradient: 'linear-gradient(135deg, #FF6FAE22 0%, #FFC0CB11 100%)',
    glow: 'rgba(255,111,174,0.35)',
  },
  {
    name: 'Floral Fantasy',
    desc: 'Nature-inspired masterpieces in full bloom',
    count: '62 styles',
    tag: 'Trending 🔥',
    img: 'https://images.unsplash.com/photo-1604655855745-2437e20cd268?w=600&h=700&fit=crop&auto=format&q=85',
    accent: '#E040FB',
    gradient: 'linear-gradient(135deg, #E040FB22 0%, #CE93D811 100%)',
    glow: 'rgba(224,64,251,0.30)',
  },
  {
    name: 'Geometric Art',
    desc: 'Bold lines and striking minimal patterns',
    count: '38 styles',
    tag: 'Modern',
    img: 'https://images.unsplash.com/photo-1604654894761-3e8a4f9b4f99?w=600&h=700&fit=crop&auto=format&q=85',
    accent: '#FF5252',
    gradient: 'linear-gradient(135deg, #FF525222 0%, #FF867F11 100%)',
    glow: 'rgba(255,82,82,0.28)',
  },
  {
    name: 'Ombre Dreams',
    desc: 'Seamless gradient beauty, fade to perfection',
    count: '29 styles',
    tag: 'Popular',
    img: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=600&h=700&fit=crop&auto=format&q=85',
    accent: '#FF9800',
    gradient: 'linear-gradient(135deg, #FF980022 0%, #FFCC0211 100%)',
    glow: 'rgba(255,152,0,0.28)',
  },
  {
    name: 'Glitter & Gems',
    desc: 'Luxurious sparkle with crystal embellishments',
    count: '54 styles',
    tag: 'Luxury ✨',
    img: 'https://images.unsplash.com/photo-1604655074621-4ffed2e25f22?w=600&h=700&fit=crop&auto=format&q=85',
    accent: '#7C4DFF',
    gradient: 'linear-gradient(135deg, #7C4DFF22 0%, #B39DDB11 100%)',
    glow: 'rgba(124,77,255,0.30)',
  },
  {
    name: 'Marble & Stone',
    desc: 'Sophisticated stone textures and elegant veining',
    count: '33 styles',
    tag: 'New',
    img: 'https://images.unsplash.com/photo-1519143686571-bc5e0bf9b9df?w=600&h=700&fit=crop&auto=format&q=85',
    accent: '#009688',
    gradient: 'linear-gradient(135deg, #00968822 0%, #4DB6AC11 100%)',
    glow: 'rgba(0,150,136,0.28)',
  },
  {
    name: '3D Sculptured',
    desc: 'Dimensional nail artistry that defies imagination',
    count: '28 styles',
    tag: 'Artistic',
    img: 'https://images.unsplash.com/photo-1604655855745-2437e20cd268?w=600&h=700&fit=crop&auto=format&q=85&crop=entropy',
    accent: '#F06292',
    gradient: 'linear-gradient(135deg, #F0629222 0%, #F48FB111 100%)',
    glow: 'rgba(240,98,146,0.30)',
  },
  {
    name: 'Minimalist Chic',
    desc: 'Less is more — perfected with quiet luxury',
    count: '41 styles',
    tag: "Editor's pick",
    img: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&h=700&fit=crop&auto=format&q=85&crop=faces',
    accent: '#29B6F6',
    gradient: 'linear-gradient(135deg, #29B6F622 0%, #4FC3F711 100%)',
    glow: 'rgba(41,182,246,0.28)',
  },
];

const NailCategories = () => {
  const sectionRef  = useRef(null);
  const titleRef    = useRef(null);
  const gridRef     = useRef(null);
  const [hovered, setHovered]   = useState(null);
  const [active, setActive]     = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title entrance
      gsap.fromTo(titleRef.current.children,
        { opacity: 0, y: 50, filter: 'blur(6px)' },
        {
          opacity: 1, y: 0, filter: 'blur(0px)',
          duration: 0.9, stagger: 0.13, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 80%', once: true }
        }
      );

      // Card stagger entrance
      const cards = gridRef.current.querySelectorAll('.nc-card');
      gsap.fromTo(cards,
        { opacity: 0, y: 70, scale: 0.88, rotateX: 12 },
        {
          opacity: 1, y: 0, scale: 1, rotateX: 0,
          duration: 0.75, stagger: 0.07, ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 78%', once: true }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0f0f14 0%, #13101a 50%, #0d0d14 100%)' }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,111,174,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,111,174,1) 1px,transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />

      {/* Ambient glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#FF6FAE]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#E040FB]/8 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#7C4DFF]/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Decorative outline rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/[0.03] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] border border-white/[0.02] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ─── Title ─── */}
        <div ref={titleRef} className="text-center mb-20">
          <span className="inline-flex items-center gap-2 font-poppins text-[10px] tracking-[0.35em] uppercase text-[#FF6FAE] mb-5 bg-[#FF6FAE]/10 border border-[#FF6FAE]/25 px-5 py-2.5 rounded-full backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" />
            Browse by Style
            <Sparkles className="w-3.5 h-3.5" />
          </span>
          <h2
            className="font-playfair font-bold mb-5 leading-tight"
            style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 4rem)',
              background: 'linear-gradient(135deg, #ffffff 30%, #FF6FAE 70%, #E040FB 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Nail Style Categories
          </h2>
          <p className="font-poppins text-white/40 max-w-lg mx-auto leading-relaxed text-base">
            Explore our curated collection — find a design that speaks to your personality
          </p>
        </div>

        {/* ─── Grid ─── */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
        >
          {categories.map((cat, i) => (
            <div
              key={i}
              className="nc-card group relative cursor-pointer"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setActive(active === i ? null : i)}
              style={{ perspective: '1000px' }}
            >
              {/* Card shell */}
              <div
                className="relative rounded-[24px] overflow-hidden transition-all duration-500"
                style={{
                  height: '320px',
                  transform: hovered === i
                    ? 'translateY(-10px) scale(1.02) rotateX(2deg)'
                    : 'translateY(0) scale(1) rotateX(0deg)',
                  boxShadow: hovered === i
                    ? `0 30px 80px ${cat.glow}, 0 0 0 1px ${cat.accent}40`
                    : '0 4px 24px rgba(0,0,0,0.4)',
                  transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease',
                  border: hovered === i ? `1px solid ${cat.accent}50` : '1px solid rgba(255,255,255,0.06)',
                  background: '#1a1625',
                }}
              >
                {/* Image */}
                <div className="absolute inset-0">
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-700"
                    style={{
                      transform: hovered === i ? 'scale(1.12)' : 'scale(1.04)',
                    }}
                    loading="lazy"
                    onError={e => {
                      e.target.style.display = 'none';
                      e.target.parentNode.style.background = cat.gradient;
                    }}
                  />
                </div>

                {/* Bottom-to-top dark gradient overlay always */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.50) 45%, rgba(0,0,0,0.10) 100%)',
                  }}
                />

                {/* Hover color overlay */}
                <div
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(to top, ${cat.accent}55 0%, transparent 60%)`,
                    opacity: hovered === i ? 1 : 0,
                  }}
                />

                {/* Tag badge — top right */}
                <div className="absolute top-3 right-3 z-20">
                  <span
                    className="font-poppins text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full backdrop-blur-md"
                    style={{
                      background: `${cat.accent}30`,
                      border: `1px solid ${cat.accent}60`,
                      color: cat.accent,
                    }}
                  >
                    {cat.tag}
                  </span>
                </div>

                {/* Number badge — top left */}
                <div className="absolute top-3 left-3 z-20 w-7 h-7 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                  <span className="font-poppins text-[10px] font-bold text-white/70">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Glowing bottom highlight line */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[2px] transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${cat.accent}, transparent)`,
                    opacity: hovered === i ? 1 : 0,
                  }}
                />

                {/* Content at bottom */}
                <div className="absolute bottom-0 left-0 right-0 z-10 p-5">
                  {/* Count pill */}
                  <div
                    className="inline-flex items-center gap-1.5 mb-2.5 px-2.5 py-1 rounded-full text-[10px] font-poppins font-semibold transition-all duration-300"
                    style={{
                      background: `${cat.accent}20`,
                      border: `1px solid ${cat.accent}40`,
                      color: cat.accent,
                      transform: hovered === i ? 'translateY(0)' : 'translateY(4px)',
                      opacity: hovered === i ? 1 : 0.7,
                    }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: cat.accent }} />
                    {cat.count}
                  </div>

                  <h3
                    className="font-playfair font-bold text-white text-lg mb-1 leading-tight transition-all duration-300"
                    style={{
                      textShadow: hovered === i ? `0 0 20px ${cat.accent}80` : 'none',
                    }}
                  >
                    {cat.name}
                  </h3>
                  <p
                    className="font-poppins text-white/60 text-xs leading-snug transition-all duration-400"
                    style={{
                      maxHeight: hovered === i ? '40px' : '0',
                      opacity: hovered === i ? 1 : 0,
                      overflow: 'hidden',
                    }}
                  >
                    {cat.desc}
                  </p>

                  {/* Explore row */}
                  <div
                    className="flex items-center gap-2 mt-3 transition-all duration-400"
                    style={{
                      opacity: hovered === i ? 1 : 0,
                      transform: hovered === i ? 'translateY(0)' : 'translateY(8px)',
                    }}
                  >
                    <span className="font-poppins text-xs font-semibold" style={{ color: cat.accent }}>
                      Explore collection
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" style={{ color: cat.accent }} />
                  </div>
                </div>

                {/* Corner sparkle effect */}
                <div
                  className="absolute top-0 right-0 w-24 h-24 pointer-events-none transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at top right, ${cat.accent}25 0%, transparent 70%)`,
                    opacity: hovered === i ? 1 : 0,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* ─── Bottom CTA ─── */}
        <div className="text-center mt-20">
          <div className="inline-flex flex-col items-center gap-5">
            <p className="font-poppins text-white/30 text-sm tracking-widest uppercase">
              Can't find your style?
            </p>
            <button className="group relative overflow-hidden px-14 py-5 rounded-full font-poppins font-semibold tracking-[0.2em] text-sm uppercase transition-all duration-500 hover:-translate-y-1"
              style={{
                background: 'linear-gradient(135deg, #FF6FAE, #E040FB)',
                color: '#fff',
                boxShadow: '0 20px 60px rgba(255,111,174,0.35)',
              }}
            >
              <span className="relative z-10 flex items-center gap-3">
                <Sparkles className="w-4 h-4" />
                Browse All 200+ Styles
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              {/* Shine sweep */}
              <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)' }}
              />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default NailCategories;
