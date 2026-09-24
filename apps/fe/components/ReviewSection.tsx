import React from 'react';
import Image from 'next/image';
import { REVIEWS } from '../data/products';
import { Star, CheckCircle2 } from 'lucide-react';

export default function ReviewSection() {
  return (
    <section
      aria-label="고객 실시간 리뷰"
      style={{
        padding: '72px 0',
        backgroundColor: '#f8fafc',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 48px auto' }}>
          <span className="section-tag" style={{ color: '#16a34a' }}>
            VERIFIED REVIEWS
          </span>
          <h2 className="section-title" style={{ marginTop: '6px' }}>
            5,200명이 경험한 솔직한 이야기
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '12px' }}>
            <div role="img" aria-label="고객 만족도 평점 5.0 만점 중 4.9점" style={{ display: 'flex', color: '#f59e0b' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} fill="#f59e0b" aria-hidden="true" />
              ))}
            </div>
            <span style={{ fontSize: '1.125rem', fontWeight: 800, color: '#111827' }}>4.9 / 5.0</span>
            <span style={{ fontSize: '0.875rem', color: '#64748b' }}>(누적 만족도 98.4%)</span>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px',
          }}
        >
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid #e2e8f0',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
                position: 'relative',
              }}
            >
              <div>
                {/* Rating & Date */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div
                    role="img"
                    aria-label={`평점 5점 만점에 ${review.rating}점`}
                    style={{ display: 'flex', color: '#f59e0b' }}
                  >
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="#f59e0b" aria-hidden="true" />
                    ))}
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{review.date}</span>
                </div>

                {/* Review Headline & Body */}
                <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#111827', marginBottom: '8px' }}>
                  "{review.title}"
                </h3>
                <p style={{ fontSize: '0.8125rem', color: '#475569', lineHeight: 1.6, wordBreak: 'keep-all' }}>
                  {review.comment}
                </p>

                {/* Target Product Tag */}
                <div
                  style={{
                    marginTop: '14px',
                    padding: '6px 10px',
                    borderRadius: '6px',
                    backgroundColor: '#f1f5f9',
                    fontSize: '0.75rem',
                    color: '#64748b',
                    fontWeight: 500,
                  }}
                >
                  구매 상품: <strong style={{ color: '#111827' }}>{review.productName}</strong>
                </div>
              </div>

              {/* Author & Verification */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginTop: '20px',
                  paddingTop: '16px',
                  borderTop: '1px solid #f1f5f9',
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    backgroundColor: '#e2e8f0',
                  }}
                >
                  <Image
                    src={review.avatar}
                    alt={`${review.author} 프로필`}
                    fill
                    sizes="36px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#111827' }}>
                      {review.author}
                    </span>
                    {review.verified && (
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '2px',
                          fontSize: '0.6875rem',
                          color: '#16a34a',
                          fontWeight: 600,
                        }}
                      >
                        <CheckCircle2 size={12} aria-hidden="true" /> 실구매인증
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
