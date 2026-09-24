import { useEffect } from 'react';

/**
 * 모달 또는 드로어가 활성화되었을 때 뒷배경의 스크롤을 방지하는 훅
 * html의 scrollbar-gutter: stable 설정을 활용하여
 * 강제 동기 리플로우(Forced Reflow / Layout Thrashing) 없이 안전하게 스크롤을 잠급니다.
 */
export function useScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (!isLocked) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isLocked]);
}
