'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCommerce } from '../context/CommerceContext';
import { useScrollLock } from '../hooks/useScrollLock';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { Button, Badge, QuantityInput } from './ui';
import { X, Star, Heart, ShoppingBag, Check, ShieldCheck, Truck } from 'lucide-react';

export default function QuickViewModal() {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsCartOpen,
  } = useCommerce();

  const isOpen = Boolean(quickViewProduct);

  useScrollLock(isOpen);
  const trapRef = useFocusTrap<HTMLDivElement>(isOpen);

  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedColor(quickViewProduct.options?.colors?.[0] || '');
      setSelectedSize(quickViewProduct.options?.sizes?.[0] || '');
      setQuantity(1);
    }
  }, [quickViewProduct]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setQuickViewProduct(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setQuickViewProduct]);

  if (!quickViewProduct) return null;

  const isFavorited = isInWishlist(quickViewProduct.id);

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity, selectedColor, selectedSize);
    setQuickViewProduct(null);
    setIsCartOpen(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1050,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
    >
      {/* Backdrop */}
      <div
        onClick={() => setQuickViewProduct(null)}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(4px)',
        }}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        ref={trapRef}
        tabIndex={-1}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '820px',
          maxHeight: '90vh',
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          zIndex: 1,
          animation: 'fadeIn 0.25s ease-out forwards',
          outline: 'none',
        }}
      >
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="touch-target-44"
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 10,
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#4b5563',
            cursor: 'pointer',
          }}
          aria-label="미리보기 모달 닫기"
        >
          <X size={18} />
        </button>

        {/* Left: Product Image */}
        <div
          style={{
            position: 'relative',
            minHeight: '340px',
            backgroundColor: '#f1f5f9',
          }}
        >
          <Image
            src={quickViewProduct.imageUrl}
            alt={quickViewProduct.name}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            style={{ objectFit: 'cover' }}
          />
          {quickViewProduct.discountRate > 0 && (
            <div style={{ position: 'absolute', top: '16px', left: '16px' }}>
              <Badge variant="red">{quickViewProduct.discountRate}% OFF</Badge>
            </div>
          )}
        </div>

        {/* Right: Info & Controls */}
        <div
          style={{
            padding: '32px 28px',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
          }}
        >
          <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#64748b' }}>
            {quickViewProduct.brand}
          </span>
          <h2
            id="modal-product-title"
            style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              color: '#111827',
              marginTop: '4px',
              lineHeight: 1.35,
            }}
          >
            {quickViewProduct.name}
          </h2>

          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', color: '#f59e0b' }}>
              <Star size={16} fill="#f59e0b" aria-hidden="true" />
              <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#111827', marginLeft: '4px' }}>
                {quickViewProduct.rating}
              </span>
            </div>
            <span style={{ fontSize: '0.8125rem', color: '#64748b' }}>
              ({quickViewProduct.reviewCount.toLocaleString()}개 리뷰)
            </span>
          </div>

          {/* Price */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginTop: '16px' }}>
            {quickViewProduct.discountRate > 0 && (
              <span style={{ fontSize: '1.375rem', fontWeight: 800, color: '#ef4444' }}>
                {quickViewProduct.discountRate}%
              </span>
            )}
            <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111827' }}>
              {quickViewProduct.price.toLocaleString()}원
            </span>
            {quickViewProduct.originalPrice > quickViewProduct.price && (
              <span style={{ fontSize: '0.9375rem', color: '#64748b', textDecoration: 'line-through' }}>
                {quickViewProduct.originalPrice.toLocaleString()}원
              </span>
            )}
          </div>

          <p style={{ fontSize: '0.875rem', color: '#4b5563', lineHeight: 1.6, marginTop: '14px' }}>
            {quickViewProduct.description}
          </p>

          <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '20px 0' }} />

          {/* Color Options */}
          {quickViewProduct.options?.colors && (
            <div style={{ marginBottom: '16px' }}>
              <label id="color-options-label" style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>
                색상 선택: <span style={{ color: '#111827' }}>{selectedColor}</span>
              </label>
              <div role="radiogroup" aria-labelledby="color-options-label" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {quickViewProduct.options.colors.map((color) => {
                  const isSelected = selectedColor === color;
                  return (
                    <button
                      key={color}
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => setSelectedColor(color)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '0.8125rem',
                        fontWeight: isSelected ? 600 : 400,
                        backgroundColor: isSelected ? '#111827' : '#f8fafc',
                        color: isSelected ? '#ffffff' : '#374151',
                        border: isSelected ? '1px solid #111827' : '1px solid #e2e8f0',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      {isSelected && <Check size={12} />}
                      <span>{color}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Size Options */}
          {quickViewProduct.options?.sizes && (
            <div style={{ marginBottom: '20px' }}>
              <label id="size-options-label" style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>
                사이즈 선택: <span style={{ color: '#111827' }}>{selectedSize}</span>
              </label>
              <div role="radiogroup" aria-labelledby="size-options-label" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {quickViewProduct.options.sizes.map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => setSelectedSize(size)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '6px',
                        fontSize: '0.8125rem',
                        fontWeight: isSelected ? 600 : 400,
                        backgroundColor: isSelected ? '#111827' : '#f8fafc',
                        color: isSelected ? '#ffffff' : '#374151',
                        border: isSelected ? '1px solid #111827' : '1px solid #e2e8f0',
                        cursor: 'pointer',
                      }}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity & Actions */}
          <div style={{ marginTop: 'auto', paddingTop: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151' }}>수량</span>
              <QuantityInput value={quantity} onChange={setQuantity} min={1} max={10} />
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <Button
                variant="outline"
                size="lg"
                onClick={() => toggleWishlist(quickViewProduct.id)}
                aria-label={`${quickViewProduct.name} 위시리스트 ${isFavorited ? '제거' : '추가'}`}
                style={{ padding: '0 16px' }}
              >
                <Heart size={20} fill={isFavorited ? '#ef4444' : 'none'} color={isFavorited ? '#ef4444' : '#6b7280'} />
              </Button>

              <Button
                variant="primary"
                size="lg"
                fullWidth
                leftIcon={<ShoppingBag size={18} />}
                onClick={handleAddToCart}
              >
                장바구니 담기 ({(quickViewProduct.price * quantity).toLocaleString()}원)
              </Button>
            </div>

            {/* Guarantees micro-copy */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '16px', fontSize: '0.75rem', color: '#64748b' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Truck size={14} color="#16a34a" /> 5만원 이상 무료배송
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <ShieldCheck size={14} color="#2563eb" /> 100% 정품 보증
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
