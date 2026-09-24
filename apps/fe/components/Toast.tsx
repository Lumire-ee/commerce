'use client';

import React, { useEffect } from 'react';
import { useCommerce, ToastMessage } from '../context/CommerceContext';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';

function ToastItem({ toast }: { toast: ToastMessage }) {
  const { removeToast } = useCommerce();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(toast.id);
    }, 3500);
    return () => clearTimeout(timer);
  }, [toast.id, removeToast]);

  const icons = {
    success: <CheckCircle2 size={18} color="#10b981" aria-hidden="true" />,
    info: <Info size={18} color="#3b82f6" aria-hidden="true" />,
    warning: <AlertTriangle size={18} color="#f59e0b" aria-hidden="true" />,
  };

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 16px',
        backgroundColor: '#181b20',
        color: '#ffffff',
        borderRadius: '10px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.25)',
        minWidth: '280px',
        maxWidth: '380px',
        animation: 'fadeIn 0.25s ease-out',
        border: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      <div style={{ flexShrink: 0 }}>{icons[toast.type || 'success']}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#f3f4f6' }}>{toast.title}</p>
        <p style={{ fontSize: '0.8125rem', color: '#9ca3af', marginTop: '2px', wordBreak: 'keep-all' }}>
          {toast.message}
        </p>
      </div>
      <button
        onClick={() => removeToast(toast.id)}
        style={{ color: '#9ca3af', padding: '4px', cursor: 'pointer' }}
        aria-label="알림 닫기"
      >
        <X size={15} />
      </button>
    </div>
  );
}

export default function Toast() {
  const { toasts } = useCommerce();

  if (toasts.length === 0) return null;

  return (
    <aside
      aria-label="알림 메시지 목록"
      style={{
        position: 'fixed',
        top: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </aside>
  );
}
