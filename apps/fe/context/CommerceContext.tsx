'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { Product, PRODUCTS } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type?: 'success' | 'info' | 'warning';
}

interface CommerceContextType {
  cart: CartItem[];
  wishlist: string[];
  isCartOpen: boolean;
  quickViewProduct: Product | null;
  activeCategory: string;
  searchQuery: string;
  toasts: ToastMessage[];
  addToCart: (product: Product, quantity?: number, color?: string, size?: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  setIsCartOpen: (open: boolean) => void;
  setQuickViewProduct: (product: Product | null) => void;
  setActiveCategory: (cat: string) => void;
  setSearchQuery: (query: string) => void;
  addToast: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
  totalCartCount: number;
  totalCartPrice: number;
}

const CommerceContext = createContext<CommerceContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'atelier_cart_v1';
const WISHLIST_STORAGE_KEY = 'atelier_wishlist_v1';

export function CommerceProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // 로컬 스토리지 초기 복원 (Hydration Safe)
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      } else {
        const first = PRODUCTS[0];
        if (first) {
          setCart([{ product: first, quantity: 1, selectedColor: '미드나잇 블랙' }]);
        }
      }

      const savedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      } else {
        setWishlist(['prod-1', 'prod-3']);
      }
    } catch (e) {
      console.error('Failed to load commerce state from storage', e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // 장바구니 변경 시 로컬 스토리지 자동 저장
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to storage', e);
    }
  }, [cart, isHydrated]);

  // 위시리스트 변경 시 로컬 스토리지 자동 저장
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist to storage', e);
    }
  }, [wishlist, isHydrated]);

  const addToast = useCallback((title: string, message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).slice(2, 6);
    setToasts((prev) => [...prev, { id, title, message, type }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToCart = useCallback((product: Product, quantity = 1, color?: string, size?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedColor === color && item.selectedSize === size
      );
      if (existingIndex > -1) {
        const next = [...prev];
        const existingItem = next[existingIndex];
        if (existingItem) {
          next[existingIndex] = { ...existingItem, quantity: existingItem.quantity + quantity };
        }
        return next;
      }
      return [
        ...prev,
        {
          product,
          quantity,
          selectedColor: color || product.options?.colors?.[0],
          selectedSize: size || product.options?.sizes?.[0],
        },
      ];
    });

    addToast('장바구니 담기 완료', `${product.name}이(가) 장바구니에 추가되었습니다.`, 'success');
  }, [addToast]);

  const updateCartQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => item.product.id !== productId));
      addToast('상품 삭제', '장바구니에서 상품이 삭제되었습니다.', 'info');
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  }, [addToast]);

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    addToast('상품 삭제', '장바구니에서 상품이 삭제되었습니다.', 'info');
  }, [addToast]);

  const toggleWishlist = useCallback((productId: string) => {
    const targetProduct = PRODUCTS.find((p) => p.id === productId);
    const exists = wishlist.includes(productId);

    setWishlist((prev) =>
      exists ? prev.filter((id) => id !== productId) : [...prev, productId]
    );

    if (exists) {
      addToast('위시리스트 해제', `${targetProduct?.name || '상품'}을(를) 관심상품에서 제외했습니다.`, 'info');
    } else {
      addToast('위시리스트 저장', `${targetProduct?.name || '상품'}을(를) 관심상품에 추가했습니다.`, 'success');
    }
  }, [wishlist, addToast]);

  const isInWishlist = useCallback((productId: string) => {
    return wishlist.includes(productId);
  }, [wishlist]);

  const totalCartCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  const totalCartPrice = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }, [cart]);

  // Context value 객체 메모이제이션 (불필요한 리렌더링 완벽 차단)
  const contextValue = useMemo<CommerceContextType>(
    () => ({
      cart,
      wishlist,
      isCartOpen,
      quickViewProduct,
      activeCategory,
      searchQuery,
      toasts,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      toggleWishlist,
      isInWishlist,
      setIsCartOpen,
      setQuickViewProduct,
      setActiveCategory,
      setSearchQuery,
      addToast,
      removeToast,
      totalCartCount,
      totalCartPrice,
    }),
    [
      cart,
      wishlist,
      isCartOpen,
      quickViewProduct,
      activeCategory,
      searchQuery,
      toasts,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      toggleWishlist,
      isInWishlist,
      setIsCartOpen,
      setQuickViewProduct,
      setActiveCategory,
      setSearchQuery,
      addToast,
      removeToast,
      totalCartCount,
      totalCartPrice,
    ]
  );

  return (
    <CommerceContext.Provider value={contextValue}>
      {children}
    </CommerceContext.Provider>
  );
}

export function useCommerce() {
  const context = useContext(CommerceContext);
  if (!context) {
    throw new Error('useCommerce must be used within a CommerceProvider');
  }
  return context;
}
