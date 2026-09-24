'use client';

import React from 'react';
import Image from 'next/image';
import { PRODUCTS, Product } from '../data/products';
import { useCommerce } from '../context/CommerceContext';
import { Button, Badge } from './ui';
import { Heart, ShoppingBag, Eye, Award, X } from 'lucide-react';

const categoryTabs = [
  { id: 'all', label: '전체 베스트' },
  { id: 'fashion', label: '패션/의류' },
  { id: 'tech', label: '디지털/테크' },
  { id: 'living', label: '가구/홈리빙' },
  { id: 'beauty', label: '뷰티/케어' },
  { id: 'outdoor', label: '스포츠/아웃도어' },
];

export default function BestsellerSection() {
  const {
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setQuickViewProduct,
  } = useCommerce();

  // 검색어 또는 카테고리에 따른 필터링
  const filteredProducts = PRODUCTS.filter((p) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  }).slice(0, 8);

  const getRankBadgeVariant = (rank?: number): 'gold' | 'silver' | 'bronze' | 'dark' => {
    if (rank === 1) return 'gold';
    if (rank === 2) return 'silver';
    if (rank === 3) return 'bronze';
    return 'dark';
  };

  const handleActionClick = (product: Product) => {
    // 옵션(색상 또는 사이즈)이 존재하는 경우, 잘못된 기본값 구매 방지를 위해 퀵뷰 모달 유도
    if (product.options && ((product.options.colors && product.options.colors.length > 1) || (product.options.sizes && product.options.sizes.length > 1))) {
      setQuickViewProduct(product);
    } else {
      addToCart(product);
    }
  };

  return (
    <section
      id="bestsellers"
      aria-label="실시간 베스트셀러"
      style={{
        padding: '72px 0',
        backgroundColor: '#ffffff',
      }}
    >
      <div className="container">
        {/* Header */}
        <div className="section-header" style={{ alignItems: 'center', textAlign: 'center', marginBottom: '24px' }}>
          <span className="section-tag">REALTIME BESTSELLERS</span>
          <h2 className="section-title">지금 가장 사랑받는 베스트 아이템</h2>
          <p className="section-subtitle">
            고객들이 직접 선택하고 검증한 실시간 판매 랭킹 TOP 셀렉션
          </p>
        </div>

        {/* 검색 필터 활성화 상태 바 */}
        {searchQuery.trim() && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              padding: '12px 20px',
              backgroundColor: '#eff6ff',
              borderRadius: '12px',
              marginBottom: '32px',
              maxWidth: '600px',
              margin: '0 auto 32px auto',
            }}
          >
            <span style={{ fontSize: '0.875rem', color: '#1e40af', fontWeight: 600 }}>
              '{searchQuery}' 검색 결과 ({filteredProducts.length}개 상품)
            </span>
            <button
              onClick={() => setSearchQuery('')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.8125rem',
                color: '#3b82f6',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              <X size={14} /> 필터 해제
            </button>
          </div>
        )}

        {/* Category Tabs (WAI-ARIA Tablist Pattern) */}
        {!searchQuery.trim() && (
          <div
            role="tablist"
            aria-label="베스트셀러 카테고리 탭"
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '8px',
              flexWrap: 'wrap',
              marginBottom: '40px',
            }}
          >
            {categoryTabs.map((tab, index) => {
              const isSelected = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={`tabpanel-${tab.id}`}
                  id={`tab-${tab.id}`}
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => setActiveCategory(tab.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowRight') {
                      e.preventDefault();
                      const nextIndex = (index + 1) % categoryTabs.length;
                      const nextTab = categoryTabs[nextIndex];
                      if (nextTab) {
                        setActiveCategory(nextTab.id);
                        document.getElementById(`tab-${nextTab.id}`)?.focus();
                      }
                    } else if (e.key === 'ArrowLeft') {
                      e.preventDefault();
                      const prevIndex = (index - 1 + categoryTabs.length) % categoryTabs.length;
                      const prevTab = categoryTabs[prevIndex];
                      if (prevTab) {
                        setActiveCategory(prevTab.id);
                        document.getElementById(`tab-${prevTab.id}`)?.focus();
                      }
                    }
                  }}
                  style={{
                    padding: '9px 20px',
                    borderRadius: '9999px',
                    fontSize: '0.875rem',
                    fontWeight: isSelected ? 700 : 500,
                    backgroundColor: isSelected ? '#111827' : '#f3f4f6',
                    color: isSelected ? '#ffffff' : '#4b5563',
                    border: '1px solid transparent',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        )}

        {/* Product Grid (Connected Tabpanel) */}
        <div
          role="tabpanel"
          id={`tabpanel-${activeCategory}`}
          aria-labelledby={`tab-${activeCategory}`}
          tabIndex={0}
          aria-live="polite"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '28px 20px',
            outline: 'none',
          }}
        >
          {filteredProducts.map((product) => {
            const isWish = isInWishlist(product.id);

            return (
              <article
                key={product.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                }}
                className="product-card"
                aria-label={product.name}
              >
                {/* Image Container */}
                <div
                  style={{
                    position: 'relative',
                    aspectRatio: '1 / 1.1',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    backgroundColor: '#f1f5f9',
                    cursor: 'pointer',
                  }}
                  onClick={() => setQuickViewProduct(product)}
                >
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    style={{
                      objectFit: 'cover',
                      transition: 'transform 0.4s ease',
                    }}
                    className="product-thumb-image"
                  />

                  {/* Rank Badge */}
                  {product.rank && (
                    <div style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 2 }}>
                      <Badge variant={getRankBadgeVariant(product.rank)} icon={<Award size={12} />}>
                        TOP {product.rank}
                      </Badge>
                    </div>
                  )}

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className="touch-target-44"
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      zIndex: 2,
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isWish ? '#ef4444' : '#6b7280',
                      transition: 'all 0.2s ease',
                    }}
                    aria-label={`${product.name} 위시리스트 ${isWish ? '제거' : '추가'}`}
                  >
                    <Heart size={18} fill={isWish ? '#ef4444' : 'none'} />
                  </button>

                  {/* Quick Action Overlay (Cart + QuickView) */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      left: '12px',
                      right: '12px',
                      display: 'flex',
                      gap: '8px',
                      zIndex: 3,
                    }}
                  >
                    <Button
                      variant="primary"
                      size="sm"
                      fullWidth
                      leftIcon={<ShoppingBag size={14} />}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleActionClick(product);
                      }}
                    >
                      {product.options ? '옵션 선택' : '담기'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuickViewProduct(product);
                      }}
                      aria-label={`${product.name} 상세 미리보기`}
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.92)' }}
                    >
                      <Eye size={14} />
                    </Button>
                  </div>
                </div>

                {/* Details */}
                <div style={{ marginTop: '14px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>
                    {product.brand}
                  </span>
                  <h3
                    style={{
                      fontSize: '0.9375rem',
                      fontWeight: 600,
                      color: '#111827',
                      lineHeight: 1.4,
                      cursor: 'pointer',
                    }}
                    onClick={() => setQuickViewProduct(product)}
                  >
                    {product.name}
                  </h3>

                  {/* Price */}
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '4px' }}>
                    <span style={{ fontSize: '1.125rem', fontWeight: 800, color: '#ef4444' }}>
                      {product.discountRate}%
                    </span>
                    <span style={{ fontSize: '1.125rem', fontWeight: 800, color: '#111827' }}>
                      {product.price.toLocaleString()}원
                    </span>
                    <span style={{ fontSize: '0.8125rem', color: '#9ca3af', textDecoration: 'line-through' }}>
                      {product.originalPrice.toLocaleString()}원
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
