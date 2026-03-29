import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Clock, Tag } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const offers = [
  {
    badge: '🌸 Spring Special',
    title: 'Spring Glow Package',
    subtitle: 'Gel Manicure + Floral Art Design',
    original: '$150',
    discounted: '$99',
    save: 'Save $51',
    expires: 'Ends March 31',
    highlight: true,
    features: ['Gel Polish Application', 'Custom Floral Hand Art', 'Cuticle Treatment', 'Complimentary Hand Massage'],
    gradient: 'from-[#FADADD] via-[#FFC0CB]/30 to-white',
    badgeBg: '#FF6FAE',
  },
  {
    badge: '✨ First Timer',
    title: 'First Visit Deal',
    subtitle: 'Classic Manicure for New Clients',
    original: '$75',
    discounted: '$45',
    save: 'Save $30',
    expires: 'Always available',
    highlight: false,
    features: ['Shape & File', 'Cuticle Care', 'Polish of Choice', 'Mini Hand Massage'],
    gradient: 'from-white to-[#FFC0CB]/20',
    badgeBg: '#E6A4B4',
  },
  {
    badge: '💎 VIP Bundle',
    title: 'Luxury Duo Bundle',
    subtitle: 'Mani + Pedi Full Package',
    original: '$220',
    discounted: '$165',
    save: 'Save $55',
    expires: 'Limited spots',
    highlight: false,
    features: ['Full Mani + Pedi', 'Design of Choice', 'Paraffin Wax Spa', 'Sparkling Refreshment'],
    gradient: 'from-fuchsia-50 to-pink-50',
    badgeBg: '#FF6FAE',
  },
];

const SpecialOffers = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  const timerRef = useRef(null);

  const getTimeLeft = () => {
    const target = new Date('2025-03-31T23:59:59');
    const now = new Date();
    const diff = target - now;
    if (diff <= 0) return { d: '00', h: '00', m: '00', s: '00' };
    const d = String(Math.floor(diff / 86400000)).padStart(2, '0');
    const h = String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0');
    const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
    const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
    return { d, h, m, s };
  };

  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    timerRef.current = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timerRef.current);
  }, []);

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
            { opacity: 0, y: 60, scale: 0.94 },
            { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'back.out(1.4)', delay: i * 0.15,
              scrollTrigger: { trigger: card, start: 'top 85%', once: true } }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-28 px-6 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #fff 0%, #FADADD20 50%, #fff 100%)' }}>
      <div className="max-w-7xl mx-auto">
        <div ref={titleRef} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 font-poppins text-xs tracking-[0.3em] uppercase text-[#FF6FAE] mb-4 bg-[#FF6FAE]/8 px-4 py-2 rounded-full border border-[#FF6FAE]/20">
            <Tag className="w-3.5 h-3.5" /> Limited Time
          </span>
          <h2 className="font-playfair font-bold text-gray-900 mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
            Special Offers & Promotions
          </h2>
          <p className="font-poppins text-gray-400 max-w-xl mx-auto leading-relaxed mb-6">
            Exclusive deals that make luxury nail artistry even more accessible
          </p>

          {/* Countdown timer */}
          <div className="inline-flex items-center gap-2 bg-white border border-[#FF6FAE]/20 rounded-2xl px-8 py-4 shadow-sm">
            <Clock className="w-4 h-4 text-[#FF6FAE] flex-shrink-0" />
            <span className="font-poppins text-xs text-gray-400 mr-2">Spring deals end in:</span>
            {[{ label: 'Days', val: timeLeft.d }, { label: 'Hrs', val: timeLeft.h }, { label: 'Min', val: timeLeft.m }, { label: 'Sec', val: timeLeft.s }].map((t, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span className="text-[#FF6FAE] font-bold">:</span>}
                <div className="text-center">
                  <div className="font-playfair font-bold text-xl text-[#FF6FAE]">{t.val}</div>
                  <div className="font-poppins text-xs text-gray-400">{t.label}</div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {offers.map((offer, i) => (
            <div
              key={i}
              ref={el => cardsRef.current[i] = el}
              className={`group relative rounded-3xl bg-gradient-to-br ${offer.gradient} border overflow-hidden transition-all duration-400 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#FF6FAE]/12 ${offer.highlight ? 'border-[#FF6FAE]/30 ring-2 ring-[#FF6FAE]/20 shadow-xl shadow-[#FF6FAE]/10' : 'border-gray-100 hover:border-[#FF6FAE]/20'}`}
            >
              {offer.highlight && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF6FAE] via-[#E6A4B4] to-[#FF6FAE]" />
              )}

              <div className="p-8">
                <span className="inline-flex items-center gap-1.5 text-white font-poppins text-xs font-bold px-3 py-1.5 rounded-full mb-5"
                  style={{ background: offer.badgeBg }}>
                  {offer.badge}
                </span>

                <h3 className="font-playfair font-bold text-gray-800 text-2xl mb-1">{offer.title}</h3>
                <p className="font-poppins text-gray-500 text-sm mb-5">{offer.subtitle}</p>

                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-playfair font-bold text-4xl text-[#FF6FAE]">{offer.discounted}</span>
                  <span className="font-poppins text-gray-400 line-through text-lg">{offer.original}</span>
                </div>
                <span className="inline-block bg-[#FF6FAE]/10 text-[#FF6FAE] text-xs font-poppins font-semibold px-3 py-1 rounded-full mb-6">
                  {offer.save}
                </span>

                <ul className="space-y-2.5 mb-8">
                  {offer.features.map((f, fi) => (
                    <li key={fi} className="flex items-center gap-2.5 font-poppins text-gray-600 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FF6FAE] flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-3.5 rounded-full font-poppins font-bold tracking-wider text-sm uppercase transition-all duration-300 hover:-translate-y-0.5 ${offer.highlight ? 'bg-gradient-to-r from-[#FF6FAE] to-[#E6A4B4] text-white shadow-lg shadow-[#FF6FAE]/25 hover:shadow-[#FF6FAE]/40' : 'border-2 border-[#FF6FAE] text-[#FF6FAE] hover:bg-[#FF6FAE] hover:text-white'}`}>
                  Claim This Offer
                </button>

                <p className="text-center font-poppins text-xs text-gray-400 mt-3">
                  <Clock className="w-3 h-3 inline mr-1" />{offer.expires}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;
