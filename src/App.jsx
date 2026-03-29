import React from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import TrendingDesigns from './components/TrendingDesigns'
import NailCategories from './components/NailCategories'
import AboutBrand from './components/AboutBrand'
import ServicesPreview from './components/ServicesPreview'
import WhyChooseUs from './components/WhyChooseUs'
import BeforeAfter from './components/BeforeAfter'
import Testimonials from './components/Testimonials'
import InstagramShowcase from './components/InstagramShowcase'
import BlogHighlights from './components/BlogHighlights'
import SpecialOffers from './components/SpecialOffers'
import BookingCTA from './components/BookingCTA'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navbar - DO NOT TOUCH */}
      <Navbar />

      {/* Homepage Sections */}
      <main>
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Trending Nail Designs */}
        <TrendingDesigns />

        {/* 3. Nail Style Categories */}
        <NailCategories />

        {/* 4. About the Brand */}
        <AboutBrand />

        {/* 5. Services Preview */}
        <ServicesPreview />

        {/* 6. Why Choose Us */}
        <WhyChooseUs />

        {/* 7. Before & After Transformations */}
        <BeforeAfter />

        {/* 8. Customer Testimonials */}
        <Testimonials />

        {/* 9. Instagram / Social Media Showcase */}
        <InstagramShowcase />

        {/* 10. Blog Highlights */}
        <BlogHighlights />

        {/* 11. Special Offers */}
        <SpecialOffers />

        {/* 12. Final CTA - Book Appointment */}
        <BookingCTA />
      </main>

      {/* 13. Footer */}
      <Footer />
    </div>
  )
}

export default App
