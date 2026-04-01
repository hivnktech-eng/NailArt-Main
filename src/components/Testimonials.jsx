import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  { name: 'Sophia L.', role: 'Fashion Blogger', rating: 5, text: "NailMuse completely transformed my perspective on nail art. The floral design they created for my wedding was absolutely breathtaking — every guest couldn't stop staring at my hands. Pure artistry!", avatar: 'S', color: '#C8D5B9', img: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=100&h=100&fit=crop&auto=format&q=80' },
  { name: 'Emma R.', role: 'Interior Designer', rating: 5, text: "I've been to many nail studios but nothing compares to NailMuse. The attention to detail is extraordinary, the ambiance is luxurious, and my chrome nails lasted 4 weeks without a single chip.", avatar: 'E', color: '#D4AF37', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&auto=format&q=80' },
  { name: 'Priya M.', role: 'Marketing Director', rating: 5, text: "Their gel extensions changed my life! I always had weak, short nails and now I walk into every meeting with confidence. The artists here truly understand what you want before you even finish explaining.", avatar: 'P', color: '#FF6FAE', img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop&auto=format&q=80' },
  { name: 'Chloe T.', role: 'Photographer', rating: 5, text: "As a photographer, I see beauty in everything — and what NailMuse creates is genuinely beautiful. My 3D floral nails were so stunning they actually appeared in my client's photoshoot!", avatar: 'C', color: '#C5CBE1', img: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=100&h=100&fit=crop&auto=format&q=80' },
  { name: 'Aisha K.', role: 'Entrepreneur', rating: 5, text: "The Luxury Spa Mani at NailMuse is an experience unlike any other. Hot stone massage, paraffin treatment, and then the most stunning nail art — I left feeling like royalty.", avatar: 'A', color: '#FFBFA0', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop&auto=format&q=80' },
  { name: 'Lily W.', role: 'Doctor', rating: 5, text: "I was skeptical about gel extensions but the team put all my concerns to rest. They explained every step, used the safest products, and the result was more beautiful than I imagined.", avatar: 'L', color: '#A8D8EA', img: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&h=100&fit=crop&auto=format&q=80' },
];

const Testimonials = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const sliderRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current.children,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 80%', once: true } }
      );

      gsap.fromTo(sliderRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sliderRef.current, start: 'top 80%', once: true } }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const goTo = (dir) => {
    if (isAnimating) return;
    setIsAnimating(true);
    const cards = sliderRef.current.querySelectorAll('.testi-card');
    gsap.to(cards, { opacity: 0, x: dir === 'next' ? -30 : 30, duration: 0.3, onComplete: () => {
      setCurrent(prev => dir === 'next' ? (prev + 3 >= testimonials.length ? 0 : prev + 3) : (prev - 3 < 0 ? testimonials.length - 3 : prev - 3));
      gsap.fromTo(cards, { opacity: 0, x: dir === 'next' ? 30 : -30 }, { opacity: 1, x: 0, duration: 0.4, stagger: 0.08, onComplete: () => setIsAnimating(false) });
    }});
  };

  const displayedTestimonials = testimonials.slice(current, current + 3).length < 3 
    ? [...testimonials.slice(current), ...testimonials.slice(0, 3 - testimonials.slice(current).length)]
    : testimonials.slice(current, current + 3);

  return (
    <section ref={sectionRef} className="py-28 px-6 relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#FADADD25_0%,_transparent_70%)]" />

      <div className="max-w-7xl mx-auto">
        <div ref={titleRef} className="text-center mb-16">
          <span className="inline-block font-poppins text-xs tracking-[0.3em] uppercase text-[#FF6FAE] mb-4 bg-[#FF6FAE]/8 px-4 py-2 rounded-full border border-[#FF6FAE]/20">
            Client Love
          </span>
          <h2 className="font-playfair font-bold text-gray-900 mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
            What Our Clients Say
          </h2>
          <p className="font-poppins text-gray-400 max-w-xl mx-auto leading-relaxed">
            Don't just take our word for it — hear from thousands of delighted clients who found their perfect nails at NailMuse
          </p>
        </div>

        <div ref={sliderRef}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mb-10">
            {displayedTestimonials.map((t, i) => (
              <div key={`${current}-${i}`} className="testi-card relative bg-white rounded-3xl p-8 border border-gray-100 hover:border-[#FF6FAE]/20 transition-all duration-400 hover:shadow-xl hover:shadow-[#FF6FAE]/8 hover:-translate-y-1">
                {/* Quote icon */}
                <div className="absolute top-6 right-6 text-[#FF6FAE]/15">
                  <Quote className="w-10 h-10 fill-[#FF6FAE]/20" />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, s) => (
                    <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="font-poppins text-gray-600 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 flex-shrink-0 shadow-md"
                    style={{ borderColor: t.color }}>
                    <img
                      src={t.img}
                      alt={t.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={e => {
                        e.target.style.display = 'none';
                        e.target.parentNode.style.background = `linear-gradient(135deg, ${t.color}, ${t.color}99)`;
                        e.target.parentNode.innerHTML = `<span class="w-full h-full flex items-center justify-center text-white font-bold text-lg">${t.avatar}</span>`;
                      }}
                    />
                  </div>
                  <div>
                    <div className="font-playfair font-bold text-gray-800 text-base">{t.name}</div>
                    <div className="font-poppins text-gray-400 text-xs">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-5">
            <button onClick={() => goTo('prev')} className="w-12 h-12 rounded-full border-2 border-[#FF6FAE]/30 hover:border-[#FF6FAE] hover:bg-[#FF6FAE] hover:text-white text-[#FF6FAE] flex items-center justify-center transition-all duration-300">
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, i) => (
                <button key={i} onClick={() => setCurrent(i * 3)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${current === i * 3 ? 'bg-[#FF6FAE] w-6' : 'bg-[#FF6FAE]/30'}`} />
              ))}
            </div>

            <button onClick={() => goTo('next')} className="w-12 h-12 rounded-full border-2 border-[#FF6FAE]/30 hover:border-[#FF6FAE] hover:bg-[#FF6FAE] hover:text-white text-[#FF6FAE] flex items-center justify-center transition-all duration-300">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
