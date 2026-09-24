'use client';

import React from 'react';
import Image from 'next/image';
import { CATEGORIES, CategoryItem } from '../data/products';
import { useCommerce } from '../context/CommerceContext';
import {
  Shirt,
  Headphones,
  Armchair,
  Sparkles,
  Compass,
  Flame,
  Clock,
  ArrowRight,
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Shirt: <Shirt size={22} />,
  Headphones: <Headphones size={22} />,
  Armchair: <Armchair size={22} />,
  Sparkles: <Sparkles size={22} />,
  Compass: <Compass size={22} />,
  Flame: <Flame size={22} color="#ef4444" />,
  Clock: <Clock size={22} color="#2563eb" />,
};

export default function CategoryNav() {
  const { setActiveCategory } = useCommerce();

  const handleCategoryClick = (id: string) => {
    if (id === 'deal') {
      const el = document.getElementById('timedeal');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else {
      setActiveCategory(id === 'best' ? 'all' : id);
      const el = document.getElementById('bestsellers');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      aria-label="카테고리 네비게이션"
      style={{
        padding: '56px 0 36px 0',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #f1f3f5',
      }}
    >
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '28px' }}>
          <div>
            <span className="section-tag">EXPLORE CATEGORIES</span>
            <h2 className="section-title" style={{ marginTop: '4px' }}>
              카테고리별 둘러보기
            </h2>
          </div>
          <a
            href="#bestsellers"
            onClick={() => setActiveCategory('all')}
            style={{
              fontSize: '0.875rem',
              fontWeight: 600,
              color: '#2563eb',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            전체 상품 보기 <ArrowRight size={14} />
          </a>
        </div>

        {/* Categories Grid / Horizontal Scroll */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
            gap: '16px',
          }}
          className="category-grid"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '18px 12px',
                borderRadius: '16px',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                cursor: 'pointer',
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                textAlign: 'center',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.boxShadow = '0 10px 20px -5px rgba(0, 0, 0, 0.08)';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = '#111827';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#f8fafc';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = '#e2e8f0';
              }}
            >
              {/* Thumbnail Circle */}
              <div
                style={{
                  position: 'relative',
                  width: '68px',
                  height: '68px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  marginBottom: '12px',
                  backgroundColor: '#e5e7eb',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.06)',
                }}
              >
                <Image
                  src={cat.imageUrl}
                  alt={cat.name}
                  fill
                  sizes="68px"
                  style={{ objectFit: 'cover' }}
                />
              </div>

              {/* Title & Info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#111827' }}>
                  {cat.name}
                </span>
              </div>
              <span style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '3px' }}>
                {cat.itemCount}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
