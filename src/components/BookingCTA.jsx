import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Sparkles, Phone, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const BookingCTA = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current.children,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.14, ease: 'power3.out',
          scrollTrigger: { trigger: contentRef.current, start: 'top 75%', once: true } }
      );

      gsap.fromTo(formRef.current,
        { opacity: 0, x: 60, scale: 0.96 },
        { opacity: 1, x: 0, scale: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: formRef.current, start: 'top 75%', once: true } }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-28 px-6 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #FADADD 0%, #FFC0CB20 30%, #fff 60%, #FADADD15 100%)' }}>
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#FF6FAE]/8 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#E6A4B4]/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content left */}
          <div ref={contentRef} className="space-y-7">
            <span className="inline-flex items-center gap-2 font-poppins text-xs tracking-[0.3em] uppercase text-[#FF6FAE] bg-white px-4 py-2 rounded-full border border-[#FF6FAE]/20 shadow-sm">
              <Calendar className="w-3.5 h-3.5" /> Book Your Visit
            </span>

            <h2 className="font-playfair font-bold text-gray-900 leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
              Ready to Transform<br />
              <span className="text-[#FF6FAE] italic">Your Nails Today?</span>
            </h2>

            <p className="font-poppins text-gray-500 text-lg leading-relaxed">
              Step into our sanctuary of beauty. Book your appointment online and our team will confirm your visit within 24 hours.
            </p>

            <div className="space-y-4">
              {[
                { icon: Calendar, text: 'Flexible scheduling — mornings, evenings & weekends' },
                { icon: Sparkles, text: 'Free design consultation with every booking' },
                { icon: Phone, text: 'WhatsApp confirmation & reminders' },
                { icon: MapPin, text: 'Multiple studio locations across the city' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-center gap-3 bg-white/70 backdrop-blur-sm rounded-2xl px-5 py-3.5 border border-[#FF6FAE]/10 shadow-sm">
                    <div className="w-9 h-9 rounded-xl bg-[#FF6FAE]/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-[#FF6FAE]" />
                    </div>
                    <span className="font-poppins text-gray-600 text-sm">{item.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Booking form right */}
          <div ref={formRef} className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-[#FF6FAE]/10 to-[#E6A4B4]/5 rounded-[2.5rem] blur-2xl" />
            <div className="relative bg-white rounded-3xl p-8 shadow-2xl shadow-[#FF6FAE]/10 border border-[#FF6FAE]/10">
              <div className="text-center mb-8">
                <div className="text-4xl mb-3">📅</div>
                <h3 className="font-playfair font-bold text-gray-800 text-2xl mb-1">Book Appointment</h3>
                <p className="font-poppins text-gray-400 text-sm">Fill in your details below</p>
              </div>

              <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-poppins text-xs text-gray-500 mb-1.5 tracking-wide">First Name</label>
                    <input type="text" placeholder="Sofia"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 font-poppins text-sm focus:outline-none focus:border-[#FF6FAE] focus:ring-2 focus:ring-[#FF6FAE]/15 transition-all duration-200" />
                  </div>
                  <div>
                    <label className="block font-poppins text-xs text-gray-500 mb-1.5 tracking-wide">Last Name</label>
                    <input type="text" placeholder="Laurent"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 font-poppins text-sm focus:outline-none focus:border-[#FF6FAE] focus:ring-2 focus:ring-[#FF6FAE]/15 transition-all duration-200" />
                  </div>
                </div>

                <div>
                  <label className="block font-poppins text-xs text-gray-500 mb-1.5 tracking-wide">Phone Number</label>
                  <input type="tel" placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 font-poppins text-sm focus:outline-none focus:border-[#FF6FAE] focus:ring-2 focus:ring-[#FF6FAE]/15 transition-all duration-200" />
                </div>

                <div>
                  <label className="block font-poppins text-xs text-gray-500 mb-1.5 tracking-wide">Service</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-gray-200 font-poppins text-sm text-gray-600 focus:outline-none focus:border-[#FF6FAE] focus:ring-2 focus:ring-[#FF6FAE]/15 transition-all duration-200 bg-white">
                    <option>Classic Manicure</option>
                    <option>Gel Extensions</option>
                    <option>Nail Art Studio</option>
                    <option>Luxury Spa Mani</option>
                    <option>French Couture</option>
                    <option>Chrome & Metallic</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-poppins text-xs text-gray-500 mb-1.5 tracking-wide">Preferred Date</label>
                    <input type="date"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 font-poppins text-sm text-gray-600 focus:outline-none focus:border-[#FF6FAE] focus:ring-2 focus:ring-[#FF6FAE]/15 transition-all duration-200" />
                  </div>
                  <div>
                    <label className="block font-poppins text-xs text-gray-500 mb-1.5 tracking-wide">Preferred Time</label>
                    <select className="w-full px-4 py-3 rounded-xl border border-gray-200 font-poppins text-sm text-gray-600 focus:outline-none focus:border-[#FF6FAE] focus:ring-2 focus:ring-[#FF6FAE]/15 transition-all duration-200 bg-white">
                      <option>10:00 AM</option>
                      <option>11:00 AM</option>
                      <option>12:00 PM</option>
                      <option>2:00 PM</option>
                      <option>3:00 PM</option>
                      <option>4:00 PM</option>
                      <option>5:00 PM</option>
                    </select>
                  </div>
                </div>

                <button type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#FF6FAE] to-[#E6A4B4] text-white font-poppins font-bold tracking-widest text-sm uppercase shadow-lg shadow-[#FF6FAE]/25 hover:shadow-[#FF6FAE]/40 hover:-translate-y-0.5 transition-all duration-300 mt-2">
                  <span className="flex items-center justify-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Confirm Appointment
                  </span>
                </button>

                <p className="text-center font-poppins text-xs text-gray-400 mt-2">
                  We'll send a confirmation within 24 hours ✉️
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingCTA;
