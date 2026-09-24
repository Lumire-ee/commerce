'use client';

import React, { useState } from 'react';
import { useCommerce } from '../context/CommerceContext';
import { Button } from './ui';
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function NewsletterSection() {
  const { addToast } = useCommerce();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setError('올바른 이메일 주소를 입력해주세요.');
      addToast('이메일 확인', '올바른 이메일 주소 형식을 입력해주세요.', 'warning');
      return;
    }
    setError('');
    setIsSubscribed(true);
    addToast('웰컴 쿠폰 발급 완료', `${email} 주소로 10,000원 쿠폰 코드가 전송되었습니다!`, 'success');
  };

  return (
    <section
      aria-label="뉴스레터 구독 및 쿠폰"
      style={{
        padding: '80px 0',
        backgroundColor: '#111827',
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Subtle Accent */}
      <div
        style={{
          position: 'absolute',
          top: '-50%',
          right: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            maxWidth: '680px',
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: '#60a5fa',
              marginBottom: '16px',
            }}
          >
            <Mail size={14} aria-hidden="true" />
            <span>EXCLUSIVE OFFER</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              lineHeight: 1.25,
              marginBottom: '14px',
            }}
          >
            뉴스레터 구독하고<br />
            첫 구매 10,000원 쿠폰을 받으세요
          </h2>

          <p
            style={{
              fontSize: '0.95rem',
              color: '#9ca3af',
              lineHeight: 1.6,
              marginBottom: '32px',
              wordBreak: 'keep-all',
            }}
          >
            매주 엄선된 신규 컬렉션 소식과 회원 전용 시크릿 할인 기획전 정보를 가장 먼저 이메일로 받아보실 수 있습니다.
          </p>

          {isSubscribed ? (
            <div
              role="status"
              aria-live="polite"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '16px 28px',
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                borderRadius: '12px',
                color: '#34d399',
                fontSize: '0.95rem',
                fontWeight: 600,
              }}
            >
              <CheckCircle2 size={20} aria-hidden="true" />
              <span>구독 신청이 완료되었습니다! 웰컴 쿠폰이 이메일로 발송되었습니다.</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '10px',
                maxWidth: '480px',
                margin: '0 auto',
                alignItems: 'flex-start',
              }}
            >
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <input
                  type="email"
                  placeholder="이메일 주소를 입력하세요 (example@domain.com)"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  required
                  aria-label="뉴스레터 수신 이메일 주소"
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? 'newsletter-error' : undefined}
                  style={{
                    width: '100%',
                    padding: '14px 18px',
                    borderRadius: '8px',
                    border: error ? '1px solid #ef4444' : '1px solid #374151',
                    backgroundColor: '#1f2937',
                    color: '#ffffff',
                    fontSize: '0.9375rem',
                    outline: 'none',
                  }}
                />
                {error && (
                  <span id="newsletter-error" style={{ color: '#f87171', fontSize: '0.75rem', marginTop: '6px', textAlign: 'left' }} role="alert">
                    {error}
                  </span>
                )}
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight size={16} />}
                style={{
                  backgroundColor: '#ffffff',
                  color: '#111827',
                  padding: '14px 24px',
                  whiteSpace: 'nowrap',
                }}
              >
                쿠폰 받기
              </Button>
            </form>
          )}

          <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '14px' }}>
            구독 신청 시 개인정보 수집 및 마케팅 정보 수신에 동의한 것으로 간주됩니다. (언제든 수신 거부 가능)
          </p>
        </div>
      </div>
    </section>
  );
}
