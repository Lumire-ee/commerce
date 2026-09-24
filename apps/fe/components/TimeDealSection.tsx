'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { PRODUCTS, Product } from '../data/products';
import { useCommerce } from '../context/CommerceContext';
import { Button, Badge } from './ui';
import { Clock, Flame, ShoppingBag, Eye, Heart } from 'lucide-react';

/**
 * 1초마다 리렌더링되는 범위를 격리한 독립 타이머 컴포넌트
 * TimeDealSection 전체 리렌더링을 방지하여 성능을 대폭 개선합니다.
 */
function CountdownDisplay() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 19,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDigit = (num: number) => String(num).padStart(2, '0');

  return (
    <div
      role="timer"
      aria-live="polite"
      aria-atomic="true"
      style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
    >
      <Clock size={20} color="#60a5fa" aria-hidden="true" />
      <span className="sr-only">
        타임특가 마감까지 남은 시간: {timeLeft.hours}시간 {timeLeft.minutes}분 {timeLeft.seconds}초
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }} aria-hidden="true">
        <div
          style={{
            backgroundColor: '#1f2937',
            padding: '8px 12px',
            borderRadius: '8px',
            fontSize: '1.25rem',
            fontWeight: 800,
            fontFamily: 'monospace',
            border: '1px solid #374151',
          }}
        >
          {formatDigit(timeLeft.hours)}
        </div>
        <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#60a5fa' }}>:</span>
        <div
          style={{
            backgroundColor: '#1f2937',
            padding: '8px 12px',
            borderRadius: '8px',
            fontSize: '1.25rem',
            fontWeight: 800,
            fontFamily: 'monospace',
            border: '1px solid #374151',
          }}
        >
          {formatDigit(timeLeft.minutes)}
        </div>
        <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#60a5fa' }}>:</span>
        <div
          style={{
            backgroundColor: '#1f2937',
            padding: '8px 12px',
            borderRadius: '8px',
            fontSize: '1.25rem',
            fontWeight: 800,
            fontFamily: 'monospace',
            border: '1px solid #374151',
            color: '#f87171',
          }}
        >
          {formatDigit(timeLeft.seconds)}
        </div>
      </div>
    </div>
  );
}

export default function TimeDealSection() {
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct } = useCommerce();

  const timeDealProducts = PRODUCTS.filter((p) => p.isTimeDeal);

  const handleActionClick = (product: Product) => {
    // 옵션이 있는 경우 옵션 선택 유도를 위해 퀵뷰 모달 열기
    if (product.options && ((product.options.colors && product.options.colors.length > 1) || (product.options.sizes && product.options.sizes.length > 1))) {
      setQuickViewProduct(product);
    } else {
      addToCart(product);
    }
  };

  return (
    <section
      id="timedeal"
      aria-label="오늘의 타임 특가"
      style={{
        padding: '64px 0',
        backgroundColor: '#f8fafc',
        borderBottom: '1px solid #e2e8f0',
      }}
    >
      <div className="container">
        {/* Header with Live Countdown Banner */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '36px',
            padding: '24px 28px',
            backgroundColor: '#111827',
            borderRadius: '16px',
            color: '#ffffff',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <Flame size={20} color="#ef4444" aria-hidden="true" />
              <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#f87171', letterSpacing: '0.05em' }}>
                DAILY FLASH SALE
              </span>
            </div>
            <h2 style={{ fontSize: '1.625rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
              오늘만 이 가격, 마감 임박 타임딜!
            </h2>
            <p style={{ fontSize: '0.875rem', color: '#cbd5e1', marginTop: '4px' }}>
              자정에 종료되는 한정 수량 단독 특별 할인 혜택
            </p>
          </div>

          {/* 격리된 카운트다운 타이머 */}
          <CountdownDisplay />
        </div>

        {/* Time Deal Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
          }}
        >
          {timeDealProducts.map((product) => {
            const isWish = isInWishlist(product.id);
            const stockPercent = product.timeDealStock
              ? Math.round((product.timeDealStock.current / product.timeDealStock.total) * 100)
              : 25;

            return (
              <div
                key={product.id}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  border: '1px solid #e2e8f0',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'box-shadow 0.25s, transform 0.25s',
                }}
              >
                {/* Image Wrap */}
                <div
                  style={{
                    position: 'relative',
                    aspectRatio: '16 / 10',
                    backgroundColor: '#f1f5f9',
                    overflow: 'hidden',
                    cursor: 'pointer',
                  }}
                  onClick={() => setQuickViewProduct(product)}
                >
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />

                  {/* Discount Badge */}
                  <div style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 2 }}>
                    <Badge variant="red" icon={<Flame size={12} />}>
                      {product.discountRate}% OFF
                    </Badge>
                  </div>

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
                    aria-label={`${product.name} 관심상품 ${isWish ? '해제' : '추가'}`}
                  >
                    <Heart size={18} fill={isWish ? '#ef4444' : 'none'} />
                  </button>
                </div>

                {/* Content */}
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>
                      {product.brand}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#ef4444', fontWeight: 700 }}>
                      한정수량 마감임박
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: '1rem',
                      fontWeight: 700,
                      color: '#111827',
                      lineHeight: 1.4,
                      marginBottom: '10px',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      cursor: 'pointer',
                    }}
                    onClick={() => setQuickViewProduct(product)}
                  >
                    {product.name}
                  </h3>

                  {/* Price */}
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '14px' }}>
                    <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ef4444' }}>
                      {product.discountRate}%
                    </span>
                    <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827' }}>
                      {product.price.toLocaleString()}원
                    </span>
                    <span style={{ fontSize: '0.875rem', color: '#9ca3af', textDecoration: 'line-through' }}>
                      {product.originalPrice.toLocaleString()}원
                    </span>
                  </div>

                  {/* Stock Progress Bar */}
                  <div style={{ marginTop: 'auto', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '6px' }}>
                      <span style={{ color: '#64748b' }}>잔여 수량 {product.timeDealStock?.current || 12}개</span>
                      <span style={{ fontWeight: 700, color: '#ef4444' }}>{100 - stockPercent}% 판매 완료</span>
                    </div>
                    <div
                      style={{
                        height: '6px',
                        backgroundColor: '#f1f5f9',
                        borderRadius: '9999px',
                        overflow: 'hidden',
                      }}
                      role="progressbar"
                      aria-label="한정 수량 판매 진행률"
                      aria-valuenow={100 - stockPercent}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuetext={`총 ${product.timeDealStock?.total || 50}개 중 ${100 - stockPercent}% 판매 완료, 잔여 수량 ${product.timeDealStock?.current || 12}개`}
                    >
                      <div
                        style={{
                          height: '100%',
                          width: `${100 - stockPercent}%`,
                          backgroundColor: '#ef4444',
                          borderRadius: '9999px',
                        }}
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Button
                      variant="primary"
                      size="md"
                      fullWidth
                      leftIcon={<ShoppingBag size={16} />}
                      onClick={() => handleActionClick(product)}
                    >
                      {product.options ? '옵션 선택/담기' : '바로 담기'}
                    </Button>
                    <Button
                      variant="outline"
                      size="md"
                      onClick={() => setQuickViewProduct(product)}
                      aria-label={`${product.name} 퀵뷰 미리보기`}
                    >
                      <Eye size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
