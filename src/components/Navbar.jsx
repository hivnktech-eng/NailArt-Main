import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home',     href: '#' },
    { name: 'Designs',  href: '#' },
    { name: 'Services', href: '#' },
    { name: 'Gallery',  href: '#' },
    { name: 'Shop',     href: '#' },
    { name: 'Contact',  href: '#' },
  ];

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#1A1219]/96 backdrop-blur-xl shadow-2xl shadow-black/40 border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 py-4">

        {/* Logo */}
        <div className="flex items-center gap-2.5 group cursor-pointer">
          <div className="relative">
            <Sparkles className="w-7 h-7 text-[#E8175D]" />
            <div className="absolute -inset-1 bg-[#E8175D]/20 rounded-full blur group-hover:bg-[#E8175D]/40 transition duration-500" />
          </div>
          <span className="text-2xl font-playfair font-bold tracking-wide text-white group-hover:text-[#FF6F9C] transition-colors">
            NailMuse
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="nav-link font-poppins text-xs font-semibold tracking-[0.2em] text-white/70 hover:text-white uppercase transition-colors duration-300"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <button className="relative group overflow-hidden px-7 py-2.5 rounded-sm bg-[#E8175D] text-white font-poppins text-xs font-bold tracking-[0.2em] uppercase shadow-lg shadow-[#E8175D]/30 hover:shadow-[#E8175D]/50 hover:-translate-y-0.5 transition-all duration-300">
            <span className="relative z-10">Book Appointment</span>
            <div className="absolute inset-0 bg-[#B5104A] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-400" />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-white hover:text-[#E8175D] transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-[#1A1219] z-40 md:hidden flex flex-col items-center justify-center gap-8 transition-all duration-500 ease-in-out transform ${
          isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'
        }`}
      >
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-6 right-6 p-2 text-white/60 hover:text-white"
        >
          <X className="w-8 h-8" />
        </button>

        <div className="flex flex-col items-center gap-8">
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-3xl font-playfair font-bold text-white hover:text-[#E8175D] transition-all duration-300 transform ${
                isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              {link.name}
            </a>
          ))}

          <button
            className={`mt-4 px-10 py-4 bg-[#E8175D] text-white font-poppins font-bold tracking-[0.2em] text-sm uppercase shadow-xl shadow-[#E8175D]/30 transition-all duration-500 ${
              isMobileMenuOpen ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
            }`}
            style={{ transitionDelay: `${navLinks.length * 80}ms` }}
          >
            Book Appointment
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
