import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Sparkles, ChevronDown } from 'lucide-react';

/* ------- Unsplash nail-art images ------- */
const NAIL_IMAGES = [
  'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&q=85&fit=crop&auto=format',  // French tip close-up
  'https://images.unsplash.com/photo-1519143686571-bc5e0bf9b9df?w=400&q=85&fit=crop&auto=format',  // gel nails
  'https://images.unsplash.com/photo-1604655855745-2437e20cd268?w=400&q=85&fit=crop&auto=format',  // chrome nails
  'https://images.unsplash.com/photo-1604655074621-4ffed2e25f22?w=400&q=85&fit=crop&auto=format',  // colourful ombre
  'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=400&q=85&fit=crop&auto=format',  // golden glam
  'https://images.unsplash.com/photo-1604654894761-3e8a4f9b4f99?w=400&q=85&fit=crop&auto=format',  // floral nail
];

/* 3-D card layout in the right panel */
const CARDS = [
  { img: 0, w: 180, h: 220, top: '2%',  left: '10%', z: 120,  rot: -8,  rotX: 6,  delay: 0.2, scale: 1 },
  { img: 1, w: 160, h: 200, top: '5%',  left: '52%', z: 60,   rot: 10,  rotX: -4, delay: 0.4, scale: 1 },
  { img: 2, w: 190, h: 240, top: '36%', left: '28%', z: 200,  rot: -4,  rotX: 8,  delay: 0.1, scale: 1 },
  { img: 3, w: 150, h: 190, top: '38%', left: '62%', z: 40,   rot: 14,  rotX: -6, delay: 0.5, scale: 1 },
  { img: 4, w: 170, h: 200, top: '68%', left: '5%',  z: 80,   rot: -12, rotX: 3,  delay: 0.3, scale: 0.95 },
  { img: 5, w: 155, h: 185, top: '65%', left: '54%', z: 160,  rot: 7,   rotX: -5, delay: 0.6, scale: 1 },
];

const HeroSection = () => {
  const heroRef    = useRef(null);
  const headRef    = useRef(null);
  const subRef     = useRef(null);
  const btnRef     = useRef(null);
  const sceneRef   = useRef(null);       // 3-D scene container
  const cardRefs   = useRef([]);
  const scrollRef  = useRef(null);
  const mouseX     = useRef(0);
  const mouseY     = useRef(0);

  /* ---- On-load entrance animations ---- */
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* letters */
      const letters = headRef.current.querySelectorAll('.ltr');
      gsap.fromTo(letters,
        { opacity: 0, y: 70, rotateX: -80, filter: 'blur(6px)' },
        { opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)',
          duration: 0.75, stagger: 0.035, ease: 'power3.out', delay: 0.3 }
      );

      gsap.fromTo(subRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 1.3 }
      );

      gsap.fromTo(Array.from(btnRef.current.children),
        { opacity: 0, scale: 0.85, y: 24 },
        { opacity: 1, scale: 1, y: 0, duration: 0.7, stagger: 0.14,
          ease: 'back.out(1.6)', delay: 1.7 }
      );

      /* 3-D cards fly in */
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const c = CARDS[i];
        gsap.fromTo(el,
          { opacity: 0, scale: 0.6, z: -200, rotateZ: c.rot * 2 },
          { opacity: 1, scale: c.scale, z: c.z, rotateZ: c.rot, rotateX: c.rotX,
            duration: 1.1, ease: 'power3.out', delay: 0.6 + c.delay }
        );
      });

      /* scroll bounce */
      if (scrollRef.current) {
        gsap.fromTo(scrollRef.current,
          { opacity: 0 }, { opacity: 1, duration: 1, delay: 2.5 });
        gsap.to(scrollRef.current,
          { y: 10, repeat: -1, yoyo: true, duration: 1.3, ease: 'sine.inOut', delay: 3 });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  /* ---- Mouse-tracking 3-D tilt ---- */
  useEffect(() => {
    const onMove = (e) => {
      const { innerWidth: W, innerHeight: H } = window;
      mouseX.current = (e.clientX / W - 0.5) * 2;   // -1 → +1
      mouseY.current = (e.clientY / H - 0.5) * 2;

      if (sceneRef.current) {
        gsap.to(sceneRef.current, {
          rotateY:  mouseX.current * 12,
          rotateX: -mouseY.current * 8,
          duration: 0.9, ease: 'power2.out'
        });
      }

      /* parallax per card at its Z depth */
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const depth = CARDS[i].z / 200;
        gsap.to(el, {
          x: mouseX.current * depth * 18,
          y: mouseY.current * depth * 12,
          duration: 0.9, ease: 'power2.out'
        });
      });
    };

    const onLeave = () => {
      if (sceneRef.current)
        gsap.to(sceneRef.current, { rotateY: 0, rotateX: 0, duration: 1.2, ease: 'power2.out' });
      cardRefs.current.forEach(el => {
        if (el) gsap.to(el, { x: 0, y: 0, duration: 1.2, ease: 'power2.out' });
      });
    };

    const hero = heroRef.current;
    hero.addEventListener('mousemove', onMove);
    hero.addEventListener('mouseleave', onLeave);
    return () => {
      hero.removeEventListener('mousemove', onMove);
      hero.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  const words = 'Where Your Nails Become Art'.split(' ');

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-white"
      style={{ cursor: 'default' }}
    >
      {/* ── Soft background ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FADADD] via-white to-[#FFC0CB]/15 z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_50%,_#FF6FAE12_0%,_transparent_100%)] z-0" />
      {/* subtle grid */}
      <div className="absolute inset-0 z-0 opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(#FF6FAE 1px,transparent 1px),linear-gradient(90deg,#FF6FAE 1px,transparent 1px)', backgroundSize: '55px 55px' }} />

      {/* ── Layout ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 xl:px-12 pt-24 pb-12 flex flex-col lg:flex-row items-center gap-12 min-h-screen">

        {/* ======= LEFT TEXT ======= */}
        <div className="flex-1 flex flex-col items-start justify-center py-12 lg:py-0 max-w-xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#FF6FAE]/30 bg-white/70 backdrop-blur-sm text-[#FF6FAE] text-xs font-poppins tracking-[0.2em] uppercase mb-8 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            Luxury Nail Studio
            <Sparkles className="w-3.5 h-3.5" />
          </div>

          {/* Headline */}
          <h1 ref={headRef}
            className="font-playfair font-bold text-gray-900 mb-6 leading-[1.08]"
            style={{ fontSize: 'clamp(2.6rem, 5.5vw, 5rem)', perspective: '800px' }}
          >
            {words.map((word, wi) => (
              <span key={wi} className="block">
                {word.split('').map((ch, ci) => (
                  <span key={ci} className="ltr inline-block" style={{ transformOrigin: 'center bottom' }}>
                    {ch}
                  </span>
                ))}
                {wi === 2 && (
                  <span className="ltr inline-block font-playfair italic text-[#FF6FAE]">&nbsp;</span>
                )}
              </span>
            ))}
          </h1>

          {/* Accent line */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-14 bg-gradient-to-r from-[#FF6FAE] to-transparent" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF6FAE]" />
            <div className="h-px w-14 bg-gradient-to-l from-[#FF6FAE] to-transparent" />
          </div>

          {/* Subtitle */}
          <p ref={subRef} className="font-poppins text-gray-500 text-base md:text-lg mb-10 leading-relaxed max-w-md">
            Handcrafted nail artistry that transforms your fingertips into masterpieces.
            <span className="text-[#FF6FAE] italic font-light"> Where elegance meets creativity.</span>
          </p>

          {/* CTAs */}
          <div ref={btnRef} className="flex flex-col sm:flex-row gap-4 mb-14">
            <button className="group relative overflow-hidden px-9 py-4 rounded-full bg-gradient-to-r from-[#FF6FAE] to-[#E6A4B4] text-white font-poppins font-semibold tracking-widest text-sm uppercase shadow-xl shadow-[#FF6FAE]/30 hover:shadow-[#FF6FAE]/50 hover:-translate-y-1 hover:scale-105 transition-all duration-300">
              <span className="relative z-10 flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Explore Designs
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#E6A4B4] to-[#FF6FAE] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            <button className="px-9 py-4 rounded-full border-2 border-[#FF6FAE] text-[#FF6FAE] font-poppins font-semibold tracking-widest text-sm uppercase bg-white/50 backdrop-blur-sm hover:bg-[#FF6FAE] hover:text-white hover:-translate-y-1 hover:shadow-xl hover:shadow-[#FF6FAE]/30 transition-all duration-300">
              Book Appointment
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-10 flex-wrap">
            {[['5,000+', 'Happy Clients'], ['200+', 'Nail Designs'], ['8+', 'Years Excellence']].map(([v, l]) => (
              <div key={l} className="text-left">
                <div className="font-playfair font-bold text-2xl text-[#FF6FAE]">{v}</div>
                <div className="font-poppins text-gray-400 text-xs tracking-widest uppercase">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ======= RIGHT — 3-D IMAGE COLLAGE ======= */}
        <div
          className="flex-1 relative hidden lg:block"
          style={{ height: '82vh', minHeight: 560, maxHeight: 800 }}
        >
          {/* Perspective wrapper */}
          <div
            ref={sceneRef}
            className="absolute inset-0"
            style={{ perspective: '1100px', perspectiveOrigin: '50% 50%', transformStyle: 'preserve-3d' }}
          >
            {CARDS.map((c, i) => (
              <div
                key={i}
                ref={el => cardRefs.current[i] = el}
                className="absolute rounded-[22px] overflow-hidden shadow-2xl will-change-transform"
                style={{
                  width:  c.w,
                  height: c.h,
                  top:    c.top,
                  left:   c.left,
                  transform: `translateZ(${c.z}px) rotateZ(${c.rot}deg) rotateX(${c.rotX}deg) scale(${c.scale})`,
                  transformStyle: 'preserve-3d',
                  boxShadow: `0 ${10 + c.z / 10}px ${30 + c.z / 5}px rgba(255,111,174,${0.12 + c.z / 1000})`,
                  border: '2.5px solid rgba(255,255,255,0.7)',
                  opacity: 0,          // GSAP will animate this in
                }}
              >
                <img
                  src={`${NAIL_IMAGES[c.img]}&w=${c.w * 2}&h=${c.h * 2}`}
                  alt={`Nail art ${i + 1}`}
                  className="w-full h-full object-cover"
                  loading="eager"
                  onError={e => {
                    e.target.style.display = 'none';
                    e.target.parentNode.style.background = `linear-gradient(135deg,#FADADD,#FFC0CB)`;
                  }}
                />
                {/* Glass sheen */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none" />
                {/* Glow rim */}
                <div className="absolute inset-0 rounded-[22px] ring-1 ring-white/40 pointer-events-none" />
              </div>
            ))}

            {/* Central glow orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-[#FF6FAE]/15 rounded-full blur-3xl pointer-events-none" />
          </div>

          {/* Floating badge on the 3D panel */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 bg-white/80 backdrop-blur-md rounded-2xl px-5 py-3 shadow-xl border border-[#FF6FAE]/15 text-center whitespace-nowrap">
            <div className="font-playfair font-bold text-[#FF6FAE] text-base">✦ Move mouse to explore ✦</div>
            <div className="font-poppins text-gray-400 text-xs mt-0.5">Interactive 3D nail gallery</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-[#FF6FAE]/60 z-10">
        <span className="font-poppins text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-5 h-5" />
      </div>
    </section>
  );
};

export default HeroSection;
