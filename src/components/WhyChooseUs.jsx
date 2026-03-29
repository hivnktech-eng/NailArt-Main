import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Leaf, Award, Clock, Heart, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  { icon: Award, title: 'Award-Winning Artists', desc: 'Our team has won 12+ industry awards for nail art excellence at international beauty competitions.', color: '#FF6FAE' },
  { icon: Shield, title: 'Hygiene Guaranteed', desc: 'Hospital-grade sterilization for every tool. We use single-use files and buffers on every client.', color: '#E6A4B4' },
  { icon: Leaf, title: 'Cruelty-Free Products', desc: 'Only vegan, cruelty-free polishes and products. Beauty without compromise.', color: '#FF6FAE' },
  { icon: Clock, title: 'Lasting Results', desc: 'Our gel formulas are tested to last 3–5 weeks without chipping. Quality that stands the test of time.', color: '#E6A4B4' },
  { icon: Heart, title: 'Personalized Experience', desc: 'Every visit is customized to you. From nail shape to art style, it\'s always a perfect match.', color: '#FF6FAE' },
  { icon: Star, title: 'Premium Materials', desc: 'Japanese gel, CND, OPI — we only use the most trusted brands that professionals recommend.', color: '#E6A4B4' },
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
          const col = i % 3;
          gsap.fromTo(card,
            { opacity: 0, y: 50, x: col === 0 ? -20 : col === 2 ? 20 : 0 },
            { opacity: 1, y: 0, x: 0, duration: 0.7, ease: 'power3.out',
              delay: col * 0.1,
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
        <div ref={titleRef} className="text-center mb-16">
          <span className="inline-block font-poppins text-xs tracking-[0.3em] uppercase text-[#FF6FAE] mb-4 bg-[#FF6FAE]/8 px-4 py-2 rounded-full border border-[#FF6FAE]/20">
            Our Promise
          </span>
          <h2 className="font-playfair font-bold text-gray-900 mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
            Why Choose NailMuse?
          </h2>
          <p className="font-poppins text-gray-400 max-w-xl mx-auto leading-relaxed">
            We don't just do nails — we craft experiences that leave you feeling beautiful, confident, and cared for
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-16">
          {reasons.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                ref={el => cardsRef.current[i] = el}
                className="group relative p-8 rounded-3xl bg-white border border-gray-100 hover:border-[#FF6FAE]/25 transition-all duration-400 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#FF6FAE]/8 cursor-default"
              >
                {/* Hover glow bg */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#FF6FAE]/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                <div className="relative z-10">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                    style={{ background: `${item.color}15`, border: `1.5px solid ${item.color}30` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: item.color }} />
                  </div>

                  <h3 className="font-playfair font-bold text-gray-800 text-xl mb-3 group-hover:text-[#FF6FAE] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="font-poppins text-gray-400 text-sm leading-relaxed">
                    {item.desc}
                  </p>

                  {/* Decorative dot */}
                  <div className="absolute bottom-8 right-8 w-3 h-3 rounded-full opacity-20 group-hover:opacity-60 transition-opacity duration-400"
                    style={{ background: item.color }} />
                </div>
              </div>
            );
          })}
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
