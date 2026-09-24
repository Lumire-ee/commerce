import { useEffect, useRef } from 'react';

/**
 * 대화상자(Modal / Drawer) 내에서 키보드 Tab 키 포커스를 가두는 웹 접근성(A11y) 훅
 * 모달이 닫히면 직전에 포커스되어 있던 요소로 자동 복원합니다.
 */
export function useFocusTrap<T extends HTMLElement>(isActive: boolean) {
  const containerRef = useRef<T>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive) return;

    // 현재 활성화된 요소 기록
    previouslyFocusedElementRef.current = document.activeElement as HTMLElement;

    const container = containerRef.current;
    if (!container) return;

    // 포커스 가능한 요소 탐색
    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(', ');

    const focusableElements = container.querySelectorAll<HTMLElement>(focusableSelectors);
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // 첫 요소로 포커스 이동
    if (firstElement) {
      firstElement.focus();
    } else {
      container.focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const currentFocusables = container.querySelectorAll<HTMLElement>(focusableSelectors);
      const first = currentFocusables[0];
      const last = currentFocusables[currentFocusables.length - 1];

      if (e.shiftKey) {
        // Shift + Tab: 뒤로 이동 시 첫 번째에서 마지막으로 순환
        if (document.activeElement === first || document.activeElement === container) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        // Tab: 앞으로 이동 시 마지막에서 첫 번째로 순환
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      // 모달이 닫힐 때 이전 포커스 위치로 복원
      if (previouslyFocusedElementRef.current && typeof previouslyFocusedElementRef.current.focus === 'function') {
        previouslyFocusedElementRef.current.focus();
      }
    };
  }, [isActive]);

  return containerRef;
}
