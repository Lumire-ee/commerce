import React from 'react';
import { Truck, ShieldCheck, RefreshCw, Headphones } from 'lucide-react';

const valueProps = [
  {
    icon: <Truck size={28} color="#2563eb" aria-hidden="true" />,
    title: '빠른 안심 무료배송',
    description: '오후 2시 이전 주문 시 당일 출발 & 5만원 이상 무료배송',
  },
  {
    icon: <ShieldCheck size={28} color="#10b981" aria-hidden="true" />,
    title: '100% 정품 보장제',
    description: '공식 파트너십 인증 브랜드 상품만 엄선하여 공급',
  },
  {
    icon: <RefreshCw size={28} color="#f59e0b" aria-hidden="true" />,
    title: '14일 안심 무료 반품',
    description: '사이즈나 색상이 고민되셔도 부담 없이 교환/반품 가능',
  },
  {
    icon: <Headphones size={28} color="#8b5cf6" aria-hidden="true" />,
    title: '24/7 전문 고객 케어',
    description: '쇼핑 중 궁금한 점은 실시간 1:1 상담으로 바로 해결',
  },
];

export default function ValueProps() {
  return (
    <section
      aria-label="서비스 가치 및 혜택"
      style={{
        padding: '56px 0',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e5e7eb',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '32px 24px',
          }}
        >
          {valueProps.map((prop, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
                padding: '16px',
                borderRadius: '12px',
                backgroundColor: '#f8fafc',
                border: '1px solid #f1f5f9',
              }}
            >
              <div
                style={{
                  padding: '12px',
                  borderRadius: '10px',
                  backgroundColor: '#ffffff',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                  flexShrink: 0,
                }}
              >
                {prop.icon}
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#111827', marginBottom: '4px' }}>
                  {prop.title}
                </h3>
                <p style={{ fontSize: '0.8125rem', color: '#64748b', lineHeight: 1.5, wordBreak: 'keep-all' }}>
                  {prop.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
