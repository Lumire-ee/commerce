'use client';

import dynamic from 'next/dynamic';

// 초기 번들 크기 축소 및 메인 스레드 블로킹 방지를 위한 동적 로드
const CartDrawer = dynamic(() => import('./CartDrawer'), { ssr: false });
const QuickViewModal = dynamic(() => import('./QuickViewModal'), { ssr: false });
const Toast = dynamic(() => import('./Toast'), { ssr: false });

export default function Overlays() {
  return (
    <>
      <CartDrawer />
      <QuickViewModal />
      <Toast />
    </>
  );
}
