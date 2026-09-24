'use client';

import React, { useEffect } from 'react';
import { useScrollLock } from '../../hooks/useScrollLock';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { X } from 'lucide-react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = '720px',
}: ModalProps) {
  useScrollLock(isOpen);
  const trapRef = useFocusTrap<HTMLDivElement>(isOpen);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      aria-describedby={description ? 'modal-desc' : undefined}
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
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(4px)',
          animation: 'fadeIn 0.2s ease-out',
        }}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div
        ref={trapRef}
        tabIndex={-1}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth,
          maxHeight: '90vh',
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          zIndex: 1,
          animation: 'fadeIn 0.25s ease-out forwards',
          display: 'flex',
          flexDirection: 'column',
          outline: 'none',
        }}
      >
        {/* Header if title or close button */}
        <div
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 10,
          }}
        >
          <button
            onClick={onClose}
            className="touch-target-44"
            style={{
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
              transition: 'background-color 0.2s',
            }}
            aria-label="닫기"
          >
            <X size={18} />
          </button>
        </div>

        {title && (
          <div style={{ padding: '20px 24px', borderBottom: '1px solid #e5e7eb' }}>
            <h2 id="modal-title" style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827' }}>
              {title}
            </h2>
            {description && (
              <p id="modal-desc" style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '4px' }}>
                {description}
              </p>
            )}
          </div>
        )}

        {/* Content body */}
        <div style={{ overflowY: 'auto', flex: 1 }}>{children}</div>
      </div>
    </div>
  );
}
