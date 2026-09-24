'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { useCommerce } from '../context/CommerceContext';
import { useScrollLock } from '../hooks/useScrollLock';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { Button, QuantityInput } from './ui';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    totalCartPrice,
    addToast,
  } = useCommerce();

  // 배경 스크롤 락 및 키보드 포커스 트랩
  useScrollLock(isCartOpen);
  const trapRef = useFocusTrap<HTMLElement>(isCartOpen);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        setIsCartOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, setIsCartOpen]);

  if (!isCartOpen) return null;

  const freeShippingThreshold = 50000;
  const isFreeShipping = totalCartPrice >= freeShippingThreshold;
  const shippingFee = totalCartPrice === 0 || isFreeShipping ? 0 : 3000;
  const finalPrice = totalCartPrice + shippingFee;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - totalCartPrice);

  const handleCheckout = () => {
    addToast('주문서 생성 완료', `총 결제금액 ${finalPrice.toLocaleString()}원 주문이 정상 접수되었습니다.`, 'success');
    setIsCartOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.55)',
          backdropFilter: 'blur(3px)',
          transition: 'opacity 0.25s ease',
        }}
        aria-hidden="true"
      />

      {/* Drawer content */}
      <aside
        ref={trapRef}
        tabIndex={-1}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '440px',
          height: '100%',
          backgroundColor: '#ffffff',
          boxShadow: '-8px 0 24px rgba(0, 0, 0, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1,
          animation: 'slideInRight 0.3s ease-out forwards',
          outline: 'none',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid #e5e7eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingBag size={20} color="#111827" aria-hidden="true" />
            <h2 id="cart-drawer-title" style={{ fontSize: '1.125rem', fontWeight: 700, color: '#111827' }}>
              장바구니 ({cart.length})
            </h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="touch-target-44"
            style={{
              padding: '6px',
              borderRadius: '6px',
              color: '#6b7280',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="장바구니 닫기"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Gauge */}
        <div
          style={{
            padding: '14px 24px',
            backgroundColor: '#f8fafc',
            borderBottom: '1px solid #e2e8f0',
            fontSize: '0.8125rem',
          }}
        >
          {isFreeShipping ? (
            <p style={{ color: '#16a34a', fontWeight: 600 }}>
              🎉 축하합니다! 전 상품 무료배송 혜택이 적용되었습니다.
            </p>
          ) : (
            <p style={{ color: '#475569' }}>
              <strong style={{ color: '#2563eb' }}>{remainingForFreeShipping.toLocaleString()}원</strong> 추가 시{' '}
              <strong style={{ color: '#111827' }}>무료배송</strong> 혜택!
            </p>
          )}
          <div
            style={{
              height: '4px',
              backgroundColor: '#e2e8f0',
              borderRadius: '9999px',
              marginTop: '8px',
              overflow: 'hidden',
            }}
            role="progressbar"
            aria-label="무료배송 달성률"
            aria-valuenow={Math.min(100, Math.round((totalCartPrice / freeShippingThreshold) * 100))}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuetext={
              isFreeShipping
                ? '무료배송 혜택 적용 완료'
                : `${remainingForFreeShipping.toLocaleString()}원 추가 시 무료배송`
            }
          >
            <div
              style={{
                height: '100%',
                width: `${Math.min(100, (totalCartPrice / freeShippingThreshold) * 100)}%`,
                backgroundColor: isFreeShipping ? '#16a34a' : '#2563eb',
                transition: 'width 0.3s ease',
              }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {cart.length === 0 ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                color: '#9ca3af',
                gap: '12px',
              }}
            >
              <ShoppingBag size={48} strokeWidth={1.5} />
              <p style={{ fontSize: '1rem', fontWeight: 600, color: '#4b5563' }}>
                장바구니가 비어 있습니다.
              </p>
              <p style={{ fontSize: '0.8125rem', textAlign: 'center' }}>
                마음에 드는 감각적인 아이템을 담아보세요!
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsCartOpen(false)}
                style={{ marginTop: '8px' }}
              >
                쇼핑 계속하기
              </Button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedColor || ''}-${item.selectedSize || ''}`}
                style={{
                  display: 'flex',
                  gap: '14px',
                  paddingBottom: '16px',
                  borderBottom: '1px solid #f1f5f9',
                }}
              >
                {/* Product Thumbnail */}
                <div
                  style={{
                    position: 'relative',
                    width: '80px',
                    height: '80px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    backgroundColor: '#f1f5f9',
                    flexShrink: 0,
                  }}
                >
                  <Image
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    fill
                    sizes="80px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>

                {/* Details */}
                <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>
                        {item.product.brand}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="touch-target-44"
                        style={{ color: '#64748b', padding: '4px' }}
                        aria-label={`${item.product.name} 장바구니에서 삭제`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <p
                      style={{
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: '#111827',
                        marginTop: '2px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {item.product.name}
                    </p>
                    {item.selectedColor && (
                      <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>
                        옵션: {item.selectedColor}
                      </p>
                    )}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                    <QuantityInput
                      value={item.quantity}
                      onChange={(newQty) => updateCartQuantity(item.product.id, newQty)}
                      label={`${item.product.name} 수량 변경`}
                    />
                    <span style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#111827' }}>
                      {(item.product.price * item.quantity).toLocaleString()}원
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout Button */}
        {cart.length > 0 && (
          <div
            style={{
              padding: '20px 24px',
              borderTop: '1px solid #e5e7eb',
              backgroundColor: '#fafafa',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px', fontSize: '0.875rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6b7280' }}>
                <span>상품 금액</span>
                <span style={{ color: '#111827', fontWeight: 500 }}>{totalCartPrice.toLocaleString()}원</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6b7280' }}>
                <span>배송비</span>
                <span style={{ color: shippingFee === 0 ? '#16a34a' : '#111827', fontWeight: 500 }}>
                  {shippingFee === 0 ? '무료 (5만원 이상)' : `${shippingFee.toLocaleString()}원`}
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingTop: '10px',
                  borderTop: '1px solid #e2e8f0',
                  fontSize: '1.0625rem',
                  fontWeight: 700,
                  color: '#111827',
                }}
              >
                <span>총 결제금액</span>
                <span style={{ color: '#2563eb' }}>{finalPrice.toLocaleString()}원</span>
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              fullWidth
              rightIcon={<ArrowRight size={18} />}
              onClick={handleCheckout}
            >
              주문하기 ({finalPrice.toLocaleString()}원)
            </Button>
          </div>
        )}
      </aside>
    </div>
  );
}
