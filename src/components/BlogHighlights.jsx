import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const blogPosts = [
  {
    category: 'Nail Trends',
    title: '10 Must-Try Nail Designs for Summer 2025',
    excerpt: 'From tropical florals to neon gradients — these are the summer nail looks stealing the spotlight this season.',
    readTime: '4 min read',
    date: 'Mar 10, 2025',
    tag: 'Trending',
    tagColor: '#FF6FAE',
    img: 'https://images.unsplash.com/photo-1604655074621-4ffed2e25f22?w=800&h=560&fit=crop&auto=format&q=85',
  },
  {
    category: 'Nail Care',
    title: 'How to Make Your Gel Nails Last 4+ Weeks',
    excerpt: 'Expert tips from our top nail artists on prepping, maintaining, and extending the life of your gel manicure.',
    readTime: '6 min read',
    date: 'Mar 5, 2025',
    tag: 'Tips & Tricks',
    tagColor: '#E6A4B4',
    img: 'https://images.unsplash.com/photo-1519143686571-bc5e0bf9b9df?w=800&h=560&fit=crop&auto=format&q=85',
  },
  {
    category: 'Inspiration',
    title: 'The Art of Minimalist Nail Designs',
    excerpt: 'Less is more in the world of luxury nail art. Discover how simple lines and negative space become breathtakingly beautiful.',
    readTime: '3 min read',
    date: 'Feb 28, 2025',
    tag: 'Inspiration',
    tagColor: '#FF6FAE',
    img: 'https://images.unsplash.com/photo-1604654894761-3e8a4f9b4f99?w=800&h=560&fit=crop&auto=format&q=85',
  },
];

const BlogHighlights = () => {
  const sectionRef = useRef(null);
  const titleRef   = useRef(null);
  const cardsRef   = useRef([]);

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
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: i * 0.13,
            scrollTrigger: { trigger: card, start: 'top 85%', once: true } }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-28 px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg,#FADADD10 0%,#fff 100%)' }}>

      <div className="max-w-7xl mx-auto">
        <div ref={titleRef} className="text-center mb-16">
          <span className="inline-block font-poppins text-xs tracking-[0.3em] uppercase text-[#FF6FAE] mb-4 bg-[#FF6FAE]/8 px-4 py-2 rounded-full border border-[#FF6FAE]/20">
            Beauty Journal
          </span>
          <h2 className="font-playfair font-bold text-gray-900 mb-4" style={{ fontSize: 'clamp(2rem,4vw,3.5rem)' }}>
            Nail Inspiration & Blog
          </h2>
          <p className="font-poppins text-gray-400 max-w-xl mx-auto leading-relaxed">
            Expert tips, trend alerts, and nail art inspiration — straight from our studio to your screen
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, i) => (
            <article key={i} ref={el => cardsRef.current[i] = el} className="group cursor-pointer">
              {/* Image */}
              <div className="relative rounded-3xl overflow-hidden h-56 mb-5 shadow-md group-hover:shadow-xl group-hover:shadow-[#FF6FAE]/12 transition-shadow duration-400">
                <img
                  src={post.img}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="font-poppins text-xs font-semibold px-3 py-1.5 rounded-full text-white"
                    style={{ background: post.tagColor }}>
                    {post.tag}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs font-poppins text-gray-400">
                  <span className="text-[#FF6FAE] font-medium">{post.category}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>
                <h3 className="font-playfair font-bold text-gray-800 text-xl leading-snug group-hover:text-[#FF6FAE] transition-colors duration-300">
                  {post.title}
                </h3>
                <p className="font-poppins text-gray-500 text-sm leading-relaxed">{post.excerpt}</p>
                <button className="flex items-center gap-2 text-[#FF6FAE] font-poppins font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                  Read More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-14">
          <button className="group relative overflow-hidden px-12 py-4 rounded-full border-2 border-[#FF6FAE] text-[#FF6FAE] font-poppins font-semibold tracking-widest text-sm uppercase hover:text-white transition-all duration-500 hover:-translate-y-1">
            <span className="relative z-10">Visit Our Blog</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF6FAE] to-[#E6A4B4] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogHighlights;
