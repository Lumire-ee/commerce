'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { HERO_SLIDES } from '../data/products';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5500);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused, prefersReducedMotion]);

  return (
    <section
      role="region"
      aria-roledescription="carousel"
      aria-label="메인 프로모션 및 신상품 배너"
      aria-live="polite"
      style={{
        position: 'relative',
        width: '100%',
        height: 'clamp(520px, 75vh, 720px)',
        backgroundColor: '#0f1115',
        overflow: 'hidden',
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      {/* Slides */}
      {HERO_SLIDES.map((slide, idx) => {
        const isActive = idx === current;
        return (
          <div
            key={slide.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${HERO_SLIDES.length}개 중 ${idx + 1}번째 슬라이드: ${slide.tag} - ${slide.title.replace(/\n/g, ' ')}`}
            aria-hidden={!isActive}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: isActive ? 1 : 0,
              visibility: isActive ? 'visible' : 'hidden',
              transition: prefersReducedMotion ? 'none' : 'opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.7s',
              zIndex: isActive ? 2 : 1,
            }}
          >
            {/* Background Image with LCP priority on first slide */}
            <Image
              src={slide.imageUrl}
              alt={slide.title}
              fill
              priority={idx === 0}
              loading={idx === 0 ? 'eager' : 'lazy'}
              fetchPriority={idx === 0 ? 'high' : 'auto'}
              quality={idx === 0 ? 80 : 70}
              sizes="100vw"
              style={{
                objectFit: 'cover',
                objectPosition: 'center 35%',
                transform: isActive ? 'scale(1)' : 'scale(1.04)',
                transition: 'transform 6s ease-out',
              }}
            />

            {/* Gradient Overlays for High Contrast Readability */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to right, rgba(15, 17, 21, 0.88) 0%, rgba(15, 17, 21, 0.65) 45%, rgba(15, 17, 21, 0.2) 100%)',
              }}
              aria-hidden="true"
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(15, 17, 21, 0.7) 0%, transparent 40%)',
              }}
              aria-hidden="true"
            />

            {/* Slide Content */}
            <div className="container" style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center', zIndex: 10 }}>
              <div
                style={{
                  maxWidth: '680px',
                  color: '#ffffff',
                  padding: '24px 0',
                }}
              >
                {/* Badge Tag */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 14px',
                    borderRadius: '9999px',
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: '#f3f4f6',
                    marginBottom: '20px',
                  }}
                >
                  <Sparkles size={14} color="#f59e0b" aria-hidden="true" />
                  <span>{slide.tag}</span>
                </div>

                {/* Main Headline: Single H1 for primary slide for proper SEO hierarchy */}
                {idx === 0 ? (
                  <h1
                    style={{
                      fontSize: 'clamp(2.1rem, 5vw, 3.75rem)',
                      fontWeight: 800,
                      lineHeight: 1.18,
                      letterSpacing: '-0.03em',
                      whiteSpace: 'pre-line',
                      marginBottom: '18px',
                      textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                    }}
                  >
                    {slide.title}
                  </h1>
                ) : (
                  <h2
                    style={{
                      fontSize: 'clamp(2.1rem, 5vw, 3.75rem)',
                      fontWeight: 800,
                      lineHeight: 1.18,
                      letterSpacing: '-0.03em',
                      whiteSpace: 'pre-line',
                      marginBottom: '18px',
                      textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                    }}
                  >
                    {slide.title}
                  </h2>
                )}

                {/* Subtitle */}
                <p
                  style={{
                    fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
                    lineHeight: 1.6,
                    color: '#e2e8f0',
                    maxWidth: '560px',
                    marginBottom: '36px',
                    wordBreak: 'keep-all',
                  }}
                >
                  {slide.subtitle}
                </p>

                {/* Clear CTAs */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
                  {/* Primary CTA */}
                  <a
                    href={slide.ctaLink}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '16px 32px',
                      backgroundColor: '#ffffff',
                      color: '#111827',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      fontWeight: 700,
                      boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
                      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f3f4f6';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#ffffff';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <span>{slide.ctaPrimary}</span>
                    <ArrowRight size={18} aria-hidden="true" />
                  </a>

                  {/* Secondary CTA */}
                  <a
                    href="#recommended"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '15px 28px',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      color: '#ffffff',
                      border: '1px solid rgba(255, 255, 255, 0.35)',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      fontWeight: 600,
                      backdropFilter: 'blur(8px)',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.18)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.6)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.35)';
                    }}
                  >
                    <span>{slide.ctaSecondary}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Navigation Controls */}
      <div
        className="container"
        style={{
          position: 'absolute',
          bottom: '32px',
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 20,
        }}
      >
        {/* Indicators */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className="touch-target-44"
              style={{
                width: current === idx ? '32px' : '8px',
                height: '8px',
                borderRadius: '4px',
                backgroundColor: current === idx ? '#ffffff' : 'rgba(255, 255, 255, 0.35)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
              aria-label={`프로모션 ${idx + 1}번 슬라이드로 이동`}
              aria-current={current === idx}
            />
          ))}
        </div>

        {/* Prev / Next Buttons */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={prevSlide}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(6px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
            aria-label="이전 프로모션 슬라이드"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(6px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
            aria-label="다음 프로모션 슬라이드"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
