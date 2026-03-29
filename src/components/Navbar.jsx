import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils'; // Assuming basic utility for class merging

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Designs', href: '#' },
    { name: 'Services', href: '#' },
    { name: 'Gallery', href: '#' },
    { name: 'Shop', href: '#' },
    { name: 'Contact', href: '#' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out px-6 md:px-12 py-4',
        isScrolled 
          ? 'glass-pink shadow-lg py-3' 
          : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="relative">
            <Sparkles className="w-8 h-8 text-primary-pink animate-pulse" />
            <div className="absolute -inset-1 bg-primary-pink/20 rounded-full blur group-hover:bg-primary-pink/40 transition duration-500"></div>
          </div>
          <span className="text-2xl font-playfair font-bold tracking-wide text-gray-800 group-hover:text-primary-pink transition-colors">
            NailMuse
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="nav-link font-poppins text-sm font-medium tracking-widest text-gray-700 hover:text-primary-pink uppercase"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <button className="relative group overflow-hidden px-8 py-3 rounded-full bg-gradient-to-r from-primary-pink to-rose-gold text-white font-poppins text-sm font-semibold tracking-wider shadow-md hover:shadow-xl hover:shadow-primary-pink/30 transform hover:-translate-y-1 transition-all duration-300">
            <span className="relative z-10">Book Appointment</span>
            <div className="absolute inset-0 bg-white/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-700 hover:text-primary-pink transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          'fixed inset-0 top-0 left-0 h-screen w-full glass-pink z-40 md:hidden flex flex-col items-center justify-center gap-8 transition-all duration-500 ease-in-out transform',
          isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        )}
      >
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-6 right-6 p-2 text-gray-700 hover:text-primary-pink"
        >
          <X className="w-8 h-8" />
        </button>

        <div className="flex flex-col items-center gap-6">
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "text-2xl font-playfair font-medium text-gray-800 hover:text-primary-pink transition-all duration-300 transform",
                isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {link.name}
            </a>
          ))}
          
          <button 
            className={cn(
              "mt-4 px-10 py-4 rounded-full bg-gradient-to-r from-primary-pink to-rose-gold text-white font-poppins font-bold tracking-widest shadow-xl transform transition-all duration-500",
              isMobileMenuOpen ? "scale-100 opacity-100" : "scale-50 opacity-0"
            )}
            style={{ transitionDelay: `${navLinks.length * 100}ms` }}
          >
            Book Appointment
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
