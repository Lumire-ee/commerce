import React from 'react';
import {
  PhoneCall,
  Mail,
  ShieldCheck,
  Globe,
  HelpCircle,
  Clock,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer
      aria-label="사이트 푸터"
      style={{
        backgroundColor: '#0a0c10',
        color: '#9ca3af',
        borderTop: '1px solid #1f2937',
        fontSize: '0.8125rem',
        paddingTop: '64px',
        paddingBottom: '48px',
      }}
    >
      <div className="container">
        {/* Top Info Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '40px 24px',
            paddingBottom: '48px',
            borderBottom: '1px solid #1f2937',
          }}
        >
          {/* Brand & About */}
          <div>
            <h3
              style={{
                fontSize: '1.25rem',
                fontWeight: 900,
                color: '#ffffff',
                letterSpacing: '-0.02em',
                marginBottom: '14px',
              }}
            >
              ATELIER
            </h3>
            <p style={{ lineHeight: 1.6, color: '#9ca3af', wordBreak: 'keep-all', marginBottom: '20px' }}>
              일상의 미학과 삶의 질을 높이는 프리미엄 라이프스타일 큐레이션 커머스 플랫폼입니다.
            </p>
            {/* Social Links */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <a
                href="#"
                aria-label="ATELIER 인스타그램 바로가기"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: '#1f2937',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background-color 0.2s',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a
                href="#"
                aria-label="ATELIER 유튜브 바로가기"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: '#1f2937',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background-color 0.2s',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
                  <polygon points="10 15 15 12 10 9 10 15" fill="currentColor"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.9375rem', fontWeight: 700, marginBottom: '16px' }}>
              카테고리 탐색
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><a href="#bestsellers" style={{ transition: 'color 0.2s' }}>실시간 베스트</a></li>
              <li><a href="#timedeal" style={{ transition: 'color 0.2s' }}>오늘의 타임특가</a></li>
              <li><a href="#recommended" style={{ transition: 'color 0.2s' }}>MD 추천 기획전</a></li>
              <li><a href="#bestsellers" style={{ transition: 'color 0.2s' }}>신규 입점 브랜드</a></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.9375rem', fontWeight: 700, marginBottom: '16px' }}>
              고객센터
            </h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ffffff', fontSize: '1.25rem', fontWeight: 800, marginBottom: '8px' }}>
              <PhoneCall size={20} color="#60a5fa" aria-hidden="true" />
              <span>1588-0000</span>
            </div>
            <p style={{ color: '#6b7280', fontSize: '0.75rem', lineHeight: 1.5, marginBottom: '12px' }}>
              평일 09:30 - 18:00 (점심 12:30 - 13:30)<br />
              주말 및 공휴일 휴무
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#9ca3af', fontSize: '0.8125rem' }}>
              <Mail size={14} aria-hidden="true" />
              <span>support@atelier.com</span>
            </div>
          </div>

          {/* Trust Guarantees */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.9375rem', fontWeight: 700, marginBottom: '16px' }}>
              안심 쇼핑 케어
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.75rem', color: '#6b7280' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={14} color="#10b981" aria-hidden="true" />
                <span>에스크로 구매안전 서비스 가입</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <HelpCircle size={14} color="#3b82f6" aria-hidden="true" />
                <span>100% 정품 보상 책임제</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={14} color="#f59e0b" aria-hidden="true" />
                <span>14일 안심 무료 환불 보장</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div
          style={{
            paddingTop: '32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            fontSize: '0.75rem',
            color: '#6b7280',
            lineHeight: 1.6,
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', color: '#9ca3af', fontWeight: 500 }}>
            <a href="#" style={{ textDecoration: 'underline' }}>이용약관</a>
            <a href="#" style={{ textDecoration: 'underline', color: '#ffffff' }}>개인정보처리방침</a>
            <a href="#" style={{ textDecoration: 'underline' }}>청소년보호정책</a>
            <a href="#" style={{ textDecoration: 'underline' }}>입점/제휴문의</a>
          </div>
          <p>
            (주)아뜰리에 | 대표이사: 홍길동 | 사업자등록번호: 000-00-00000 | 통신판매업신고: 2026-서울강남-0000<br />
            주소: 서울특별시 강남구 테헤란로 000 아뜰리에 빌딩 12층 | 개인정보보호책임자: 홍길동 (privacy@atelier.com)
          </p>
          <p>© 2026 ATELIER Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
