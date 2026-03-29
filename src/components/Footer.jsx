import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Instagram, Facebook, Phone, Mail, MapPin, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cols = footerRef.current.querySelectorAll('.footer-col');
      gsap.fromTo(cols,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: footerRef.current, start: 'top 90%', once: true } }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const quickLinks = ['Home', 'About Us', 'Designs', 'Services', 'Gallery', 'Blog', 'Contact'];
  const services = ['Classic Manicure', 'Gel Extensions', 'Nail Art Studio', 'Spa Manicure', 'French Couture', 'Chrome Nails'];

  return (
    <footer ref={footerRef} className="relative overflow-hidden pt-20 pb-8 px-6 bg-gray-900 text-white">
      {/* Pink gradient top line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF6FAE] via-[#E6A4B4] to-[#FFC0CB]" />

      {/* Background accents */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#FF6FAE]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#E6A4B4]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand col */}
          <div className="footer-col lg:col-span-1 space-y-5">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-7 h-7 text-[#FF6FAE]" />
              <span className="font-playfair font-bold text-2xl tracking-wide">NailMuse</span>
            </div>
            <p className="font-poppins text-gray-400 text-sm leading-relaxed">
              Where every nail becomes a masterpiece. Premium artistry, luxury care, and an experience unlike any other.
            </p>
            <div className="flex gap-3">
              {[{ icon: Instagram, label: 'Instagram' }, { icon: Facebook, label: 'Facebook' }].map(({ icon: Icon, label }) => (
                <a key={label} href="#" aria-label={label}
                  className="w-10 h-10 rounded-xl border border-gray-700 flex items-center justify-center hover:border-[#FF6FAE] hover:text-[#FF6FAE] text-gray-400 transition-all duration-300 hover:bg-[#FF6FAE]/10">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            <div className="pt-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF6FAE]/10 border border-[#FF6FAE]/20">
                <span className="w-2 h-2 rounded-full bg-[#FF6FAE] animate-pulse" />
                <span className="font-poppins text-xs text-[#FF6FAE]">Open Today: 10am – 7pm</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="font-playfair font-bold text-white text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map(link => (
                <li key={link}>
                  <a href="#" className="font-poppins text-gray-400 text-sm hover:text-[#FF6FAE] transition-colors duration-300 flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-[#FF6FAE]/40 group-hover:bg-[#FF6FAE] transition-colors" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer-col">
            <h4 className="font-playfair font-bold text-white text-lg mb-6">Our Services</h4>
            <ul className="space-y-3">
              {services.map(s => (
                <li key={s}>
                  <a href="#" className="font-poppins text-gray-400 text-sm hover:text-[#FF6FAE] transition-colors duration-300 flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-[#FF6FAE]/40 group-hover:bg-[#FF6FAE] transition-colors" />
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4 className="font-playfair font-bold text-white text-lg mb-6">Get in Touch</h4>
            <ul className="space-y-4">
              {[
                { icon: Phone, text: '+1 (555) 246-8000', label: 'Call us' },
                { icon: Mail, text: 'hello@nailmuse.com', label: 'Email' },
                { icon: MapPin, text: '240 Rose Ave, Studio 5\nNew York, NY 10001', label: 'Location' },
              ].map(({ icon: Icon, text, label }) => (
                <li key={label} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#FF6FAE]/10 border border-[#FF6FAE]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-3.5 h-3.5 text-[#FF6FAE]" />
                  </div>
                  <div>
                    <div className="font-poppins text-xs text-gray-500 mb-0.5">{label}</div>
                    <div className="font-poppins text-gray-300 text-sm whitespace-pre-line">{text}</div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Newsletter mini */}
            <div className="mt-6">
              <p className="font-poppins text-gray-400 text-xs mb-3">Get beauty tips & offers:</p>
              <div className="flex gap-2">
                <input type="email" placeholder="your@email.com"
                  className="flex-1 px-3 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-sm text-white font-poppins placeholder-gray-500 focus:outline-none focus:border-[#FF6FAE] transition-colors" />
                <button className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FF6FAE] to-[#E6A4B4] text-white text-xs font-poppins font-semibold hover:opacity-90 transition-opacity">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-poppins text-gray-500 text-sm flex items-center gap-1.5">
            © 2025 NailMuse Studio. Made with <Heart className="w-3.5 h-3.5 text-[#FF6FAE] fill-[#FF6FAE]" /> for beautiful nails.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(link => (
              <a key={link} href="#" className="font-poppins text-gray-500 text-xs hover:text-[#FF6FAE] transition-colors duration-300">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
