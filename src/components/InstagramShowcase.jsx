import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* Real Unsplash nail-art images for the Instagram grid */
const posts = [
  {
    img: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&h=800&fit=crop&auto=format&q=85',
    likes: '2.3k', caption: 'Spring floral vibes 🌿', size: 'row-span-2', tags: '#NailArt #Floral',
  },
  {
    img: 'https://images.unsplash.com/photo-1604655855745-2437e20cd268?w=600&h=400&fit=crop&auto=format&q=85',
    likes: '3.1k', caption: 'Chrome obsession 💿', size: '', tags: '#ChromeNails',
  },
  {
    img: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=600&h=400&fit=crop&auto=format&q=85',
    likes: '1.8k', caption: 'Golden glam ✨', size: '', tags: '#GlamNails #Gold',
  },
  {
    img: 'https://images.unsplash.com/photo-1604655074621-4ffed2e25f22?w=600&h=800&fit=crop&auto=format&q=85',
    likes: '2.7k', caption: 'Ombre dreams 🌈', size: 'row-span-2', tags: '#OmbreNails',
  },
  {
    img: 'https://images.unsplash.com/photo-1604654894761-3e8a4f9b4f99?w=600&h=400&fit=crop&auto=format&q=85',
    likes: '1.9k', caption: 'Bold & beautiful 🌹', size: '', tags: '#BoldNails',
  },
  {
    img: 'https://images.unsplash.com/photo-1519143686571-bc5e0bf9b9df?w=600&h=400&fit=crop&auto=format&q=85',
    likes: '2.1k', caption: 'Crystal dreams 💎', size: '', tags: '#3DNails #Gems',
  },
];

const InstagramShowcase = () => {
  const sectionRef = useRef(null);
  const titleRef   = useRef(null);
  const postsRef   = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current.children,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 80%', once: true } }
      );

      postsRef.current.forEach((post, i) => {
        if (!post) return;
        gsap.fromTo(post,
          { opacity: 0, scale: 0.85 },
          { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out',
            delay: i * 0.07,
            scrollTrigger: { trigger: post, start: 'top 90%', once: true } }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-28 px-6 relative overflow-hidden bg-white">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FF6FAE]/30 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div ref={titleRef} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 font-poppins text-xs tracking-[0.3em] uppercase text-[#FF6FAE] mb-4 bg-[#FF6FAE]/8 px-4 py-2 rounded-full border border-[#FF6FAE]/20">
            <Instagram className="w-3.5 h-3.5" /> @nailmuse_studio
          </span>
          <h2 className="font-playfair font-bold text-gray-900 mb-4" style={{ fontSize: 'clamp(2rem,4vw,3.5rem)' }}>
            Our Instagram Feed
          </h2>
          <p className="font-poppins text-gray-400 max-w-xl mx-auto leading-relaxed">
            Follow us for daily nail inspiration, behind-the-scenes content, and exclusive offers
          </p>
        </div>

        {/* Masonry grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[180px]">
          {posts.map((post, i) => (
            <div
              key={i}
              ref={el => postsRef.current[i] = el}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer ${post.size}`}
            >
              <img
                src={post.img}
                alt={post.caption}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#FF6FAE]/90 via-[#FF6FAE]/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400 flex flex-col justify-end p-4">
                <div className="flex items-center gap-1.5 text-white mb-1">
                  <Heart className="w-4 h-4 fill-white" />
                  <span className="font-poppins text-sm font-semibold">{post.likes}</span>
                </div>
                <p className="font-poppins text-white text-sm font-medium">{post.caption}</p>
                <p className="font-poppins text-white/70 text-xs">{post.tags}</p>
              </div>

              {/* Instagram icon */}
              <div className="absolute top-3 right-3 w-7 h-7 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <Instagram className="w-3.5 h-3.5 text-white" />
              </div>
            </div>
          ))}
        </div>

        {/* Follow CTA */}
        <div className="text-center mt-12">
          <a href="#"
            className="group inline-flex items-center gap-3 px-10 py-4 rounded-full bg-gradient-to-r from-[#FF6FAE] via-[#E6A4B4] to-[#FFC0CB] text-white font-poppins font-semibold tracking-widest text-sm uppercase shadow-xl shadow-[#FF6FAE]/25 hover:shadow-[#FF6FAE]/40 hover:-translate-y-1 transition-all duration-300">
            <Instagram className="w-5 h-5" />
            Follow @NailMuse
          </a>
        </div>
      </div>
    </section>
  );
};

export default InstagramShowcase;
