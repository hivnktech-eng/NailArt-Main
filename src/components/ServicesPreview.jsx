import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, Sparkles, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    name: 'Classic Manicure',
    desc: 'Timeless nail care with shaping, cuticle treatment, and polish application for perfectly polished nails.',
    price: 'From $45',
    duration: '45 min',
    tags: ['Polish', 'Shaping', 'Cuticle Care'],
    emoji: '💅',
    popular: false,
    gradient: 'from-rose-50 to-pink-50',
  },
  {
    name: 'Gel Extensions',
    desc: 'Long-lasting gel extensions shaped to perfection, offering strength and stunning length that lasts weeks.',
    price: 'From $85',
    duration: '90 min',
    tags: ['Extensions', 'Gel Polish', 'Shaping'],
    emoji: '✨',
    popular: true,
    gradient: 'from-[#FADADD] to-rose-50',
  },
  {
    name: 'Nail Art Studio',
    desc: 'Custom hand-painted artwork, 3D embellishments, foil accents — every nail a unique masterpiece.',
    price: 'From $65',
    duration: '60-90 min',
    tags: ['Custom Art', 'Embellishments', 'Foils'],
    emoji: '🎨',
    popular: false,
    gradient: 'from-fuchsia-50 to-pink-50',
  },
  {
    name: 'Luxury Spa Mani',
    desc: 'The ultimate indulgence — hot stone massage, paraffin wax treatment, serum, and premium polish.',
    price: 'From $120',
    duration: '120 min',
    tags: ['Hot Stone', 'Paraffin', 'Premium'],
    emoji: '🌸',
    popular: false,
    gradient: 'from-pink-50 to-[#FFC0CB]/20',
  },
  {
    name: 'French Couture',
    desc: 'Elevated French manicure with precise white tips, subtle gradients, and an ultra-glossy finish.',
    price: 'From $55',
    duration: '60 min',
    tags: ['French Style', 'Gradient', 'Glossy'],
    emoji: '🤍',
    popular: false,
    gradient: 'from-slate-50 to-[#FADADD]/40',
  },
  {
    name: 'Chrome & Metallic',
    desc: 'Mirror-chrome powders and metallic finishes for a bold, futuristic nail look that commands attention.',
    price: 'From $70',
    duration: '75 min',
    tags: ['Chrome', 'Metallic', 'Mirror'],
    emoji: '💿',
    popular: false,
    gradient: 'from-purple-50 to-fuchsia-50',
  },
];

const ServicesPreview = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

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
            { opacity: 0, y: 60 },
            { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
              delay: (i % 3) * 0.1,
              scrollTrigger: { trigger: card, start: 'top 85%', once: true } }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-28 px-6 relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#FADADD30_0%,_transparent_60%)]" />

      <div className="max-w-7xl mx-auto">
        <div ref={titleRef} className="text-center mb-16">
          <span className="inline-block font-poppins text-xs tracking-[0.3em] uppercase text-[#FF6FAE] mb-4 bg-[#FF6FAE]/8 px-4 py-2 rounded-full border border-[#FF6FAE]/20">
            What We Offer
          </span>
          <h2 className="font-playfair font-bold text-gray-900 mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
            Services Preview
          </h2>
          <p className="font-poppins text-gray-400 max-w-xl mx-auto leading-relaxed">
            From classic elegance to avant-garde artistry — every service is crafted with precision and luxury
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {services.map((service, i) => (
            <div
              key={i}
              ref={el => cardsRef.current[i] = el}
              className={`group relative rounded-3xl bg-gradient-to-br ${service.gradient} p-7 border border-[#FF6FAE]/10 hover:border-[#FF6FAE]/25 transition-all duration-400 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#FF6FAE]/10 cursor-pointer`}
            >
              {service.popular && (
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-[#FF6FAE] to-[#E6A4B4] text-white text-xs font-poppins font-bold px-4 py-1.5 rounded-full shadow-lg">
                  ⭐ Most Popular
                </div>
              )}

              <div className="text-5xl mb-5 group-hover:scale-110 transition-transform duration-300">{service.emoji}</div>

              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-playfair font-bold text-gray-800 text-xl">{service.name}</h3>
              </div>

              <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-4">
                <Clock className="w-3.5 h-3.5" />
                <span className="font-poppins">{service.duration}</span>
              </div>

              <p className="font-poppins text-gray-500 text-sm leading-relaxed mb-5">{service.desc}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {service.tags.map(tag => (
                  <span key={tag} className="px-2.5 py-1 bg-white/60 rounded-full text-xs font-poppins text-gray-500 border border-[#FF6FAE]/15">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between mt-auto">
                <div className="font-playfair font-bold text-[#FF6FAE] text-xl">{service.price}</div>
                <button className="flex items-center gap-1.5 text-[#FF6FAE] font-poppins text-sm font-semibold group-hover:gap-2.5 transition-all duration-300">
                  Book Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <button className="group relative overflow-hidden px-12 py-4 rounded-full border-2 border-[#FF6FAE] text-[#FF6FAE] font-poppins font-semibold tracking-widest text-sm uppercase hover:text-white transition-all duration-500 hover:-translate-y-1">
            <span className="relative z-10">See Full Menu</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF6FAE] to-[#E6A4B4] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
