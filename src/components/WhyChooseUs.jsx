import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Leaf, Award, Clock, Heart, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  { icon: Award, title: 'Award-Winning Artists', desc: 'Our team has won 12+ industry awards for nail art excellence at international beauty competitions.', color: '#D4AF37' }, // Champagne Gold
  { icon: Shield, title: 'Hygiene Guaranteed', desc: 'Hospital-grade sterilization for every tool. We use single-use files and buffers on every client.', color: '#A8D8EA' }, // Ice Blue
  { icon: Leaf, title: 'Cruelty-Free Products', desc: 'Only vegan, cruelty-free polishes and products. Beauty without compromise.', color: '#C8D5B9' }, // Sage Green
  { icon: Clock, title: 'Lasting Results', desc: 'Our gel formulas are tested to last 3–5 weeks without chipping. Quality that stands the test of time.', color: '#C5CBE1' }, // Lavender
  { icon: Heart, title: 'Personalized Experience', desc: 'Every visit is customized to you. From nail shape to art style, it\'s always a perfect match.', color: '#FFBFA0' }, // Peach
  { icon: Star, title: 'Premium Materials', desc: 'Japanese gel, CND, OPI — we only use the most trusted brands that professionals recommend.', color: '#FF6FAE' }, // Pink
];

const WhyChooseUs = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  const bannerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current.children,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 80%', once: true } }
      );

      cardsRef.current.forEach((card, i) => {
        if (card) {
          gsap.fromTo(card,
            { opacity: 0, y: 60, x: 20 },
            { opacity: 1, y: 0, x: 0, duration: 0.8, ease: 'power3.out',
              scrollTrigger: { trigger: card, start: 'top 85%', once: true } }
          );
        }
      });

      if (bannerRef.current) {
        gsap.fromTo(bannerRef.current,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.9, ease: 'power2.out',
            scrollTrigger: { trigger: bannerRef.current, start: 'top 85%', once: true } }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-28 px-6 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #fff 0%, #FADADD20 50%, #fff 100%)' }}>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 mb-24 relative">
        
        {/* Left Sticky Column */}
        <div className="lg:w-1/3 lg:sticky lg:top-32 h-max">
          <div ref={titleRef}>
            <span className="inline-block font-poppins text-xs tracking-[0.3em] uppercase text-[#FF6FAE] mb-5 bg-[#FF6FAE]/8 px-4 py-2 rounded-full border border-[#FF6FAE]/20">
              Our Promise
            </span>
            <h2 className="font-playfair font-bold text-gray-900 mb-6 leading-[1.1]" style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)' }}>
              Why Choose<br/><span className="text-[#FF6FAE] italic">NailMuse?</span>
            </h2>
            <p className="font-poppins text-gray-500 max-w-md leading-relaxed text-lg mb-8">
              We don't just do nails — we craft experiences that leave you feeling beautiful, confident, and cared for from the moment you step into our studio.
            </p>
            {/* Decorative element replacing generic layout */}
            <div className="hidden lg:block w-full h-80 rounded-[2rem] overflow-hidden mt-6 relative shadow-2xl shadow-gray-200">
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent z-10" />
              <img src="https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=600&h=800&fit=crop" alt="Luxurious Nail Art" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>
        </div>

        {/* Right Scrolling Column */}
        <div className="lg:w-2/3 flex flex-col gap-12 md:gap-20">
          {reasons.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                ref={el => cardsRef.current[i] = el}
                className="group relative flex flex-col sm:flex-row gap-6 sm:gap-10 items-start cursor-default"
              >
                {/* Number & Icon */}
                <div className="flex flex-col items-center">
                  <div className="text-5xl md:text-6xl font-playfair font-bold text-gray-100 mb-3 group-hover:text-gray-200 transition-colors duration-500">
                    0{i + 1}
                  </div>
                  <div
                    className="w-16 h-16 flex-shrink-0 flex items-center justify-center rounded-full transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-12 shadow-sm"
                    style={{ background: `linear-gradient(135deg, ${item.color}20, transparent)`, border: `1px solid ${item.color}40` }}
                  >
                    <Icon className="w-7 h-7" style={{ color: item.color }} />
                  </div>
                </div>

                {/* Content aligned with a subtle border */}
                <div className="flex-1 pt-2 sm:pt-14 border-t border-gray-100 group-hover:border-[#FF6FAE]/40 transition-colors duration-500">
                  <h3 className="font-playfair font-bold text-gray-900 text-2xl md:text-3xl mb-4 group-hover:text-[#FF6FAE] transition-colors duration-500">
                    {item.title}
                  </h3>
                  <p className="font-poppins text-gray-500 text-[15px] md:text-lg leading-relaxed max-w-lg">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

        {/* Bottom banner */}
        <div ref={bannerRef} className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#FF6FAE] via-[#E6A4B4] to-[#FFC0CB] p-12 text-center text-white">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.15)_0%,_transparent_60%)]" />
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="font-playfair font-bold text-3xl md:text-4xl mb-3">
              Ready to Experience the Difference?
            </div>
            <p className="font-poppins text-white/80 text-lg mb-8 max-w-xl mx-auto">
              Join thousands of happy clients who trust NailMuse for their beauty needs.
            </p>
            <button className="px-10 py-4 bg-white text-[#FF6FAE] rounded-full font-poppins font-bold tracking-widest text-sm uppercase shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              Book My Appointment
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
