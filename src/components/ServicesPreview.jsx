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
    img: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=300&h=200&fit=crop&auto=format&q=80',
  },
  {
    name: 'Gel Extensions',
    desc: 'Long-lasting gel extensions shaped to perfection, offering strength and stunning length that lasts weeks.',
    price: 'From $85',
    duration: '90 min',
    tags: ['Extensions', 'Gel Polish', 'Shaping'],
    emoji: '✨',
    popular: true,
    gradient: 'from-indigo-50 to-purple-50',
    img: 'https://images.unsplash.com/photo-1519143686571-bc5e0bf9b9df?w=300&h=200&fit=crop&auto=format&q=80',
  },
  {
    name: 'Nail Art Studio',
    desc: 'Custom hand-painted artwork, 3D embellishments, foil accents — every nail a unique masterpiece.',
    price: 'From $65',
    duration: '60-90 min',
    tags: ['Custom Art', 'Embellishments', 'Foils'],
    emoji: '🎨',
    popular: false,
    gradient: 'from-amber-50 to-yellow-50',
    img: 'https://images.unsplash.com/photo-1604655855745-2437e20cd268?w=300&h=200&fit=crop&auto=format&q=80',
  },
  {
    name: 'Luxury Spa Mani',
    desc: 'The ultimate indulgence — hot stone massage, paraffin wax treatment, serum, and premium polish.',
    price: 'From $120',
    duration: '120 min',
    tags: ['Hot Stone', 'Paraffin', 'Premium'],
    emoji: '🌸',
    popular: false,
    gradient: 'from-emerald-50 to-teal-50',
    img: 'https://images.unsplash.com/photo-1604655074621-4ffed2e25f22?w=300&h=200&fit=crop&auto=format&q=80',
  },
  {
    name: 'French Couture',
    desc: 'Elevated French manicure with precise white tips, subtle gradients, and an ultra-glossy finish.',
    price: 'From $55',
    duration: '60 min',
    tags: ['French Style', 'Gradient', 'Glossy'],
    emoji: '🤍',
    popular: false,
    gradient: 'from-sky-50 to-cyan-50',
    img: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=300&h=200&fit=crop&auto=format&q=80',
  },
  {
    name: 'Chrome & Metallic',
    desc: 'Mirror-chrome powders and metallic finishes for a bold, futuristic nail look that commands attention.',
    price: 'From $70',
    duration: '75 min',
    tags: ['Chrome', 'Metallic', 'Mirror'],
    emoji: '💿',
    popular: false,
    gradient: 'from-orange-50 to-rose-50',
    img: 'https://images.unsplash.com/photo-1604654894761-3e8a4f9b4f99?w=300&h=200&fit=crop&auto=format&q=80',
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

      cardsRef.current.forEach((row, i) => {
        if (row) {
          gsap.fromTo(row,
            { opacity: 0, x: -30 },
            { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
              scrollTrigger: { trigger: row, start: 'top 90%', once: true } }
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

        <div className="flex flex-col mt-10 border-t border-gray-200">
          {services.map((service, i) => (
            <div
              key={i}
              ref={el => cardsRef.current[i] = el}
              className="group relative flex flex-col lg:flex-row lg:items-center py-10 border-b border-gray-200 hover:bg-[#FF6FAE]/[0.02] transition-colors duration-500 cursor-pointer"
            >
              {/* Background Highlight Animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF6FAE]/5 to-transparent opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-0 transition-all duration-1000 ease-out pointer-events-none" />

              {/* Left: Title & Emoji */}
              <div className="w-full lg:w-[35%] flex items-center gap-6 mb-6 lg:mb-0 relative z-10 px-4 lg:px-8">
                <div className="w-16 h-16 flex-shrink-0 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500">
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-20 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />
                  <span className="relative z-10">{service.emoji}</span>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-playfair font-bold text-gray-900 text-2xl md:text-3xl group-hover:text-[#FF6FAE] transition-colors duration-500">
                      {service.name}
                    </h3>
                    {service.popular && (
                      <span className="bg-[#FF6FAE]/10 text-[#FF6FAE] text-[9px] uppercase tracking-widest font-bold px-2 py-1 rounded-full">
                        Popular
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-400 text-xs font-poppins uppercase tracking-widest font-semibold group-hover:text-[#FF6FAE]/80 transition-colors">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{service.duration}</span>
                  </div>
                </div>
              </div>

              {/* Middle: Description & Tags */}
              <div className="w-full lg:w-[45%] lg:px-8 lg:border-l border-gray-200 mb-6 lg:mb-0 relative z-10 px-4">
                <p className="font-poppins text-gray-500 text-[15px] leading-relaxed mb-4 lg:max-w-md">
                  {service.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-gray-50 rounded-full text-[10px] font-poppins font-medium text-gray-500 border border-gray-100 group-hover:border-[#FF6FAE]/20 group-hover:text-[#FF6FAE] transition-colors duration-300 uppercase tracking-widest">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: Price, Image & CTA */}
              <div className="w-full lg:w-[20%] flex items-center justify-between lg:justify-end gap-4 relative z-10 px-4 lg:px-8">
                <div className="font-playfair text-gray-900 text-2xl font-bold group-hover:text-[#FF6FAE] transition-colors duration-500">
                  {service.price}
                </div>
                <div className="flex items-center gap-3">
                  {/* Service thumbnail */}
                  <div className="w-14 h-14 rounded-xl overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100 flex-shrink-0 shadow-md">
                    <img src={service.img} alt={service.name} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <button className="flex items-center justify-center w-14 h-14 rounded-full bg-white border border-gray-200 group-hover:border-[#FF6FAE] group-hover:bg-[#FF6FAE] text-gray-400 group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-xl group-hover:shadow-[#FF6FAE]/30 group-hover:scale-110">
                    <ArrowRight className="w-6 h-6 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                  </button>
                </div>
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
