'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCommerce } from '../context/CommerceContext';
import { PRODUCTS, Product } from '../data/products';
import { Badge, Button } from './ui';
import {
  ShoppingBag,
  Heart,
  Search,
  Menu,
  X,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export default function Navbar() {
  const {
    wishlist,
    totalCartCount,
    setIsCartOpen,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    setQuickViewProduct,
  } = useCommerce();

  const [showTopBanner, setShowTopBanner] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const popularKeywords = ['무선 헤드폰', '울 블레이저', '아로마 디퓨저', '세럼', '원목 체어', '티타늄'];

  // 검색어에 따른 실시간 매칭 상품
  const searchResults: Product[] = searchQuery.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 4)
    : [];

  // 외부 클릭 시 검색창 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { label: '전체', href: '#bestsellers', category: 'all' },
    { label: '패션', href: '#bestsellers', category: 'fashion' },
    { label: '디지털/테크', href: '#bestsellers', category: 'tech' },
    { label: '홈/리빙', href: '#bestsellers', category: 'living' },
    { label: '뷰티', href: '#bestsellers', category: 'beauty' },
    { label: '아웃도어', href: '#bestsellers', category: 'outdoor' },
    { label: '베스트 랭킹', href: '#bestsellers', badge: 'HOT', isHot: true },
    { label: '타임특가', href: '#timedeal', badge: 'SALE', isSale: true },
  ];

  const handleNavClick = (category?: string) => {
    if (category) {
      setActiveCategory(category);
    }
    setIsMobileMenuOpen(false);
  };

  const handleSelectSearchResult = (product: Product) => {
    setQuickViewProduct(product);
    setIsSearchFocused(false);
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #e5e7eb',
        transition: 'all 0.2s ease',
      }}
    >
      {/* Top Notice Banner */}
      {showTopBanner && (
        <div
          role="region"
          aria-label="프로모션 공지"
          style={{
            backgroundColor: '#111827',
            color: '#ffffff',
            padding: '8px 16px',
            fontSize: '0.8125rem',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <a
            href="#timedeal"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
            }}
          >
            <Sparkles size={14} color="#f59e0b" aria-hidden="true" />
            <span>신규 회원 15% 웰컴 쿠폰팩 + 전 상품 무료배송 혜택 받기</span>
            <ArrowRight size={13} aria-hidden="true" />
          </a>
          <button
            onClick={() => setShowTopBanner(false)}
            style={{
              position: 'absolute',
              right: '16px',
              color: '#9ca3af',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              padding: '4px',
            }}
            aria-label="공지 배너 닫기"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Main Header Bar */}
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px', gap: '20px' }}>
        {/* Left: Mobile hamburger & Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            style={{
              display: 'none',
              padding: '6px',
              color: '#111827',
            }}
            className="mobile-menu-btn"
            aria-label="메뉴 열기"
            aria-expanded={isMobileMenuOpen}
          >
            <Menu size={22} />
          </button>
          <Link
            href="/"
            style={{
              fontSize: '1.5rem',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              color: '#111827',
              textTransform: 'uppercase',
            }}
            aria-label="ATELIER 홈으로 이동"
          >
            ATELIER
          </Link>
        </div>

        {/* Center: Live Search Bar & Auto-complete */}
        <div
          ref={searchContainerRef}
          role="search"
          aria-label="상품 통합 검색"
          style={{
            position: 'relative',
            flex: 1,
            maxWidth: '480px',
          }}
          className="desktop-search"
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#f3f4f6',
              borderRadius: '9999px',
              padding: '8px 16px',
              border: isSearchFocused ? '1px solid #111827' : '1px solid transparent',
              transition: 'all 0.2s ease',
            }}
          >
            <Search size={18} color="#6b7280" style={{ marginRight: '8px', flexShrink: 0 }} aria-hidden="true" />
            <input
              type="search"
              placeholder="취향을 담은 감성 라이프스타일 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              aria-label="상품 검색어 입력"
              aria-autocomplete="list"
              aria-expanded={isSearchFocused}
              style={{
                border: 'none',
                background: 'none',
                outline: 'none',
                width: '100%',
                fontSize: '0.875rem',
                color: '#111827',
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{ color: '#9ca3af', padding: '2px' }}
                aria-label="검색어 지우기"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Quick Keyword & Live Search Dropdown */}
          {isSearchFocused && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                left: 0,
                right: 0,
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                padding: '16px',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.15)',
                border: '1px solid #e5e7eb',
                zIndex: 100,
              }}
            >
              {/* 실시간 매칭 상품 목록 */}
              {searchQuery.trim() ? (
                <div>
                  <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', marginBottom: '10px' }}>
                    '{searchQuery}' 검색 결과 ({searchResults.length}건)
                  </p>
                  {searchResults.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {searchResults.map((product) => (
                        <div
                          key={product.id}
                          onClick={() => handleSelectSearchResult(product)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '8px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            transition: 'background-color 0.15s',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f8fafc')}
                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                        >
                          <div style={{ position: 'relative', width: '40px', height: '40px', borderRadius: '6px', overflow: 'hidden', backgroundColor: '#e2e8f0', flexShrink: 0 }}>
                            <Image src={product.imageUrl} alt={product.name} fill sizes="40px" style={{ objectFit: 'cover' }} />
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#111827', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {product.name}
                            </p>
                            <p style={{ fontSize: '0.75rem', color: '#64748b' }}>
                              {product.price.toLocaleString()}원
                            </p>
                          </div>
                          <span style={{ fontSize: '0.75rem', color: '#2563eb', fontWeight: 600 }}>미리보기</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p style={{ fontSize: '0.8125rem', color: '#9ca3af', padding: '12px 0', textAlign: 'center' }}>
                      일치하는 상품이 없습니다.
                    </p>
                  )}
                </div>
              ) : (
                /* 검색어 입력 전 인기 키워드 */
                <div>
                  <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', marginBottom: '8px' }}>
                    인기 급상승 키워드
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {popularKeywords.map((kw) => (
                      <button
                        key={kw}
                        onClick={() => {
                          setSearchQuery(kw);
                          const el = document.getElementById('bestsellers');
                          el?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        style={{
                          padding: '4px 10px',
                          backgroundColor: '#f3f4f6',
                          borderRadius: '9999px',
                          fontSize: '0.8125rem',
                          color: '#374151',
                          cursor: 'pointer',
                        }}
                      >
                        #{kw}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <a
            href="#bestsellers"
            style={{
              position: 'relative',
              padding: '8px',
              borderRadius: '8px',
              color: '#374151',
              display: 'flex',
              alignItems: 'center',
            }}
            aria-label={`관심상품 목록, 저장된 상품 ${wishlist.length}개`}
          >
            <Heart size={22} aria-hidden="true" />
            {wishlist.length > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '4px',
                  right: '4px',
                  backgroundColor: '#ef4444',
                  color: '#ffffff',
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                aria-hidden="true"
              >
                {wishlist.length}
              </span>
            )}
          </a>

          <button
            onClick={() => setIsCartOpen(true)}
            style={{
              position: 'relative',
              padding: '8px',
              borderRadius: '8px',
              color: '#374151',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
            }}
            aria-label={`장바구니 열기, 담긴 상품 ${totalCartCount}개`}
          >
            <ShoppingBag size={22} aria-hidden="true" />
            {totalCartCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '4px',
                  right: '4px',
                  backgroundColor: '#111827',
                  color: '#ffffff',
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                aria-hidden="true"
              >
                {totalCartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Categories Navigation Bar */}
      <nav
        aria-label="메인 카테고리 네비게이션"
        style={{
          borderTop: '1px solid #f3f4f6',
          backgroundColor: '#ffffff',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '24px', overflowX: 'auto', paddingBottom: '2px' }}>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => handleNavClick(link.category)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '12px 0',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#374151',
                whiteSpace: 'nowrap',
                transition: 'color 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#111827')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#374151')}
            >
              <span>{link.label}</span>
              {link.badge && (
                <Badge variant={link.isHot ? 'red' : 'blue'}>
                  {link.badge}
                </Badge>
              )}
            </a>
          ))}
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="모바일 메뉴"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
          }}
        >
          <div
            style={{
              width: '80%',
              maxWidth: '320px',
              backgroundColor: '#ffffff',
              height: '100%',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '4px 0 12px rgba(0,0,0,0.1)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 900 }}>ATELIER</span>
              <button onClick={() => setIsMobileMenuOpen(false)} aria-label="메뉴 닫기">
                <X size={20} />
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => handleNavClick(link.category)}
                  style={{ fontSize: '1rem', fontWeight: 600, color: '#111827', padding: '8px 0' }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
