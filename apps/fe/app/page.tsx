import React from 'react';
import { CommerceProvider } from '../context/CommerceContext';
import Navbar from '../components/Navbar';
import HeroBanner from '../components/HeroBanner';
import CategoryNav from '../components/CategoryNav';
import TimeDealSection from '../components/TimeDealSection';
import BestsellerSection from '../components/BestsellerSection';
import RecommendedSection from '../components/RecommendedSection';
import ValueProps from '../components/ValueProps';
import ReviewSection from '../components/ReviewSection';
import NewsletterSection from '../components/NewsletterSection';
import Footer from '../components/Footer';
import Overlays from '../components/Overlays';

export default function Home() {
  return (
    <CommerceProvider>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Navigation & Header */}
        <Navbar />

        {/* Main Content */}
        <main id="main-content" tabIndex={-1} style={{ flex: 1, outline: 'none' }}>
          {/* 1. Hero Banner with Clear CTA */}
          <HeroBanner />

          {/* 2. Category Navigation */}
          <CategoryNav />

          {/* 3. Limited Time Deal */}
          <TimeDealSection />

          {/* 4. Real-time Bestseller Section */}
          <BestsellerSection />

          {/* 5. MD Recommended & Curated Stories */}
          <RecommendedSection />

          {/* 6. Brand Values & Guarantees (RSC) */}
          <ValueProps />

          {/* 7. Real Customer Reviews (RSC) */}
          <ReviewSection />

          {/* 8. Newsletter & Welcome Coupon CTA */}
          <NewsletterSection />
        </main>

        {/* 9. Comprehensive Footer (RSC) */}
        <Footer />

        {/* Overlays & Drawers (동적 코드 스플리팅 적용) */}
        <Overlays />
      </div>
    </CommerceProvider>
  );
}
