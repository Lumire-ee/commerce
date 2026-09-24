'use client';

import React from 'react';
import { Minus, Plus } from 'lucide-react';

export interface QuantityInputProps {
  value: number;
  onChange: (val: number) => void;
  min?: number;
  max?: number;
  label?: string;
}

export function QuantityInput({
  value,
  onChange,
  min = 1,
  max = 99,
  label = '수량',
}: QuantityInputProps) {
  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  return (
    <div
      role="group"
      aria-label={label}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        border: '1px solid #d1d5db',
        borderRadius: '8px',
        backgroundColor: '#ffffff',
        overflow: 'hidden',
      }}
    >
      <button
        type="button"
        onClick={handleDecrement}
        disabled={value <= min}
        style={{
          padding: '8px 12px',
          color: value <= min ? '#cbd5e1' : '#374151',
          cursor: value <= min ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background-color 0.2s',
        }}
        aria-label="수량 감소"
      >
        <Minus size={14} />
      </button>

      <span
        aria-live="polite"
        style={{
          minWidth: '36px',
          textAlign: 'center',
          fontSize: '0.875rem',
          fontWeight: 700,
          color: '#111827',
          userSelect: 'none',
        }}
      >
        {value}
      </span>

      <button
        type="button"
        onClick={handleIncrement}
        disabled={value >= max}
        style={{
          padding: '8px 12px',
          color: value >= max ? '#cbd5e1' : '#374151',
          cursor: value >= max ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background-color 0.2s',
        }}
        aria-label="수량 증가"
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
