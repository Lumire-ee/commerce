'use client';

import React from 'react';
import Image from 'next/image';
import { PRODUCTS, Product } from '../data/products';
import { useCommerce } from '../context/CommerceContext';
import { Button } from './ui';
import { Sparkles, ArrowRight, Heart, ShoppingBag } from 'lucide-react';

export default function RecommendedSection() {
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct } = useCommerce();

  const recommendedItems = PRODUCTS.filter((p) => p.isRecommended).slice(0, 4);

  const handleActionClick = (product: Product) => {
    if (product.options && ((product.options.colors && product.options.colors.length > 1) || (product.options.sizes && product.options.sizes.length > 1))) {
      setQuickViewProduct(product);
    } else {
      addToCart(product);
    }
  };

  return (
    <section
      id="recommended"
      aria-label="MD 추천 기획전"
      style={{
        padding: '72px 0',
        backgroundColor: '#fafafa',
        borderTop: '1px solid #e5e7eb',
        borderBottom: '1px solid #e5e7eb',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
          <div>
            <span className="section-tag" style={{ color: '#b45309' }}>
              CURATED SELECTION
            </span>
            <h2 className="section-title" style={{ marginTop: '4px' }}>
              MD 추천: 감각적인 일상을 위한 셀렉션
            </h2>
            <p className="section-subtitle">
              디자인과 실용성을 모두 갖춘 에센셜 아이템을 제안합니다.
            </p>
          </div>
          <a
            href="#bestsellers"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.875rem',
              fontWeight: 700,
              color: '#111827',
              borderBottom: '2px solid #111827',
              paddingBottom: '2px',
            }}
          >
            <span>전체 기획전 보기</span>
            <ArrowRight size={15} aria-hidden="true" />
          </a>
        </div>

        {/* Editorial Layout: Large Feature Banner + 4 Products Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
          }}
        >
          {/* Editorial Story Card */}
          <div
            style={{
              position: 'relative',
              minHeight: '420px',
              borderRadius: '16px',
              overflow: 'hidden',
              backgroundColor: '#1f2937',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '36px',
              color: '#ffffff',
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80"
              alt="Spring Essentials Editorial 대표 화보"
              fill
              sizes="(max-width: 768px) 100vw, 500px"
              style={{ objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(17, 24, 39, 0.9) 0%, rgba(17, 24, 39, 0.4) 60%, transparent 100%)',
              }}
              aria-hidden="true"
            />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(6px)',
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  marginBottom: '12px',
                }}
              >
                <Sparkles size={12} color="#f59e0b" aria-hidden="true" />
                <span>WEEKLY LOOKBOOK</span>
              </div>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 800, lineHeight: 1.25, letterSpacing: '-0.02em', marginBottom: '10px' }}>
                공간과 스타일에 품격을 더하는 에센셜
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '20px' }}>
                당신의 일상에 특별함을 전하는 모던 클래식 패션과 감성 리빙 오브제를 최대 30% 특별 혜택으로 만나보세요.
              </p>
              <a
                href="#bestsellers"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  backgroundColor: '#ffffff',
                  color: '#111827',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                }}
              >
                <span>에디토리얼 바로가기</span>
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* 4 Recommended Products Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px',
            }}
          >
            {recommendedItems.map((product) => {
              const isWish = isInWishlist(product.id);

              return (
                <article
                  key={product.id}
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '1px solid #e5e7eb',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'box-shadow 0.2s',
                  }}
                  aria-label={product.name}
                >
                  {/* Image */}
                  <div
                    style={{
                      position: 'relative',
                      aspectRatio: '1 / 1',
                      backgroundColor: '#f1f5f9',
                      cursor: 'pointer',
                    }}
                    onClick={() => setQuickViewProduct(product)}
                  >
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      sizes="250px"
                      style={{ objectFit: 'cover' }}
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product.id);
                      }}
                      className="touch-target-44"
                      style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#ffffff',
                        borderRadius: '50%',
                        color: isWish ? '#ef4444' : '#6b7280',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        cursor: 'pointer',
                      }}
                      aria-label={`${product.name} 위시리스트 ${isWish ? '해제' : '추가'}`}
                    >
                      <Heart size={15} fill={isWish ? '#ef4444' : 'none'} />
                    </button>
                  </div>

                  {/* Info */}
                  <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                    <div>
                      <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: '#64748b' }}>
                        {product.brand}
                      </span>
                      <h4
                        onClick={() => setQuickViewProduct(product)}
                        style={{
                          fontSize: '0.875rem',
                          fontWeight: 700,
                          color: '#111827',
                          marginTop: '2px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          cursor: 'pointer',
                        }}
                      >
                        {product.name}
                      </h4>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '6px' }}>
                        {product.discountRate > 0 && (
                          <span style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#ef4444' }}>
                            {product.discountRate}%
                          </span>
                        )}
                        <span style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#111827' }}>
                          {product.price.toLocaleString()}원
                        </span>
                      </div>
                    </div>

                    <div style={{ marginTop: '12px' }}>
                      <Button
                        variant="secondary"
                        size="sm"
                        fullWidth
                        leftIcon={<ShoppingBag size={14} />}
                        onClick={() => handleActionClick(product)}
                      >
                        {product.options ? '옵션 선택' : '담기'}
                      </Button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
