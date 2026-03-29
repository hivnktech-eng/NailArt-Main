import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* Real before/after Unsplash pairs */
const transformations = [
  {
    before: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=600&h=640&fit=crop&auto=format&q=85&grayscale',
    after:  'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&h=640&fit=crop&auto=format&q=85',
    service:     'Gel Extension + Floral Art',
    description: 'Classic Manicure → Hand-Painted Rose Extension',
    tag: '3hr transformation',
  },
  {
    before: 'https://images.unsplash.com/photo-1604654894761-3e8a4f9b4f99?w=600&h=640&fit=crop&auto=format&q=85&grayscale',
    after:  'https://images.unsplash.com/photo-1604655855745-2437e20cd268?w=600&h=640&fit=crop&auto=format&q=85',
    service:     'Chrome Mirror Effect',
    description: 'Plain Polish → Mirror Chrome with Metallic Accents',
    tag: '1.5hr transformation',
  },
  {
    before: 'https://images.unsplash.com/photo-1519143686571-bc5e0bf9b9df?w=600&h=640&fit=crop&auto=format&q=85&grayscale',
    after:  'https://images.unsplash.com/photo-1604655074621-4ffed2e25f22?w=600&h=640&fit=crop&auto=format&q=85',
    service:     '3D Sculpted Nails',
    description: 'Short Natural Nails → Crystal 3D Embellished Extensions',
    tag: '2.5hr transformation',
  },
];

const BeforeAfter = () => {
  const sectionRef = useRef(null);
  const titleRef   = useRef(null);
  const cardsRef   = useRef([]);
  const [sliders, setSliders] = useState([50, 50, 50]);
  const dragging  = useRef(-1);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current.children,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 80%', once: true } }
      );
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(card,
          { opacity: 0, scale: 0.92, y: 60 },
          { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'power3.out',
            delay: i * 0.15,
            scrollTrigger: { trigger: card, start: 'top 85%', once: true } }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const onMouseDown  = (idx) => (e) => { dragging.current = idx; e.preventDefault(); };
  const onMouseUp    = () => { dragging.current = -1; };
  const onMouseMove  = (e) => {
    if (dragging.current === -1) return;
    const idx  = dragging.current;
    const card = cardsRef.current[idx];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x    = e.touches ? e.touches[0].clientX : e.clientX;
    const pct  = Math.max(4, Math.min(96, ((x - rect.left) / rect.width) * 100));
    setSliders(prev => { const s = [...prev]; s[idx] = pct; return s; });
  };

  useEffect(() => {
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchend', onMouseUp);
    window.addEventListener('touchmove', onMouseMove);
    return () => {
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchend', onMouseUp);
      window.removeEventListener('touchmove', onMouseMove);
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-28 px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg,#fff8fa 0%,#fff 50%,#FADADD15 100%)' }}>

      <div className="max-w-7xl mx-auto">
        <div ref={titleRef} className="text-center mb-16">
          <span className="inline-block font-poppins text-xs tracking-[0.3em] uppercase text-[#FF6FAE] mb-4 bg-[#FF6FAE]/8 px-4 py-2 rounded-full border border-[#FF6FAE]/20">
            Real Results
          </span>
          <h2 className="font-playfair font-bold text-gray-900 mb-4" style={{ fontSize: 'clamp(2rem,4vw,3.5rem)' }}>
            Before & After<br /><span className="text-[#FF6FAE] italic">Transformations</span>
          </h2>
          <p className="font-poppins text-gray-400 max-w-xl mx-auto leading-relaxed">
            Drag the slider to reveal stunning real transformations our artists achieve every day
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {transformations.map((item, i) => (
            <div key={i} className="group" ref={el => cardsRef.current[i] = el}>
              {/* Drag-to-reveal slider */}
              <div
                className="relative rounded-3xl overflow-hidden cursor-col-resize h-80 shadow-xl select-none"
                onMouseDown={onMouseDown(i)}
                onTouchStart={onMouseDown(i)}
              >
                {/* AFTER image (full) */}
                <img
                  src={item.after}
                  alt="After"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                {/* BEFORE image clipped */}
                <div
                  className="absolute inset-0"
                  style={{ clipPath: `inset(0 ${100 - sliders[i]}% 0 0)` }}
                >
                  <img
                    src={item.before}
                    alt="Before"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ filter: 'grayscale(80%) brightness(0.85)' }}
                    loading="lazy"
                  />
                </div>

                {/* Labels */}
                <div className="absolute top-3 left-3 px-3 py-1 bg-black/40 backdrop-blur-sm rounded-full text-white text-xs font-poppins font-semibold">
                  Before
                </div>
                <div className="absolute top-3 right-3 px-3 py-1 bg-[#FF6FAE]/80 backdrop-blur-sm rounded-full text-white text-xs font-poppins font-semibold">
                  After ✨
                </div>

                {/* Handle line */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_12px_3px_rgba(255,255,255,0.7)] z-20 pointer-events-none"
                  style={{ left: `${sliders[i]}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-2xl border-2 border-[#FF6FAE]/30 cursor-col-resize">
                    <div className="flex gap-0.5">
                      <div className="w-0.5 h-4 bg-[#FF6FAE] rounded-full" />
                      <div className="w-0.5 h-4 bg-[#FF6FAE] rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card info */}
              <div className="mt-4 bg-white rounded-2xl p-5 border border-gray-100 group-hover:border-[#FF6FAE]/20 transition-colors shadow-sm">
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="font-playfair font-bold text-gray-800 text-lg">{item.service}</h3>
                  <span className="text-xs text-[#FF6FAE] font-poppins bg-[#FF6FAE]/10 px-3 py-1 rounded-full">{item.tag}</span>
                </div>
                <p className="font-poppins text-gray-400 text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;
