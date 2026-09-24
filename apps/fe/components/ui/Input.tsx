'use client';

import React, { forwardRef, useId } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      id,
      className = '',
      required,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    return (
      <div className="ui-input-container">
        {label && (
          <label htmlFor={inputId} className="ui-input-label">
            {label} {required && <span style={{ color: '#ef4444' }} aria-hidden="true">*</span>}
          </label>
        )}
        <div className="ui-input-wrapper">
          {leftIcon && (
            <span
              style={{
                position: 'absolute',
                left: '14px',
                display: 'flex',
                alignItems: 'center',
                color: '#9ca3af',
                pointerEvents: 'none',
              }}
              aria-hidden="true"
            >
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            required={required}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
            className={`ui-input ${className}`.trim()}
            style={{
              paddingLeft: leftIcon ? '42px' : '16px',
              paddingRight: rightIcon ? '42px' : '16px',
            }}
            {...props}
          />
          {rightIcon && (
            <span
              style={{
                position: 'absolute',
                right: '14px',
                display: 'flex',
                alignItems: 'center',
                color: '#64748b',
                pointerEvents: 'none',
              }}
              aria-hidden="true"
            >
              {rightIcon}
            </span>
          )}
        </div>
        {error && (
          <p id={errorId} className="ui-input-error" role="alert">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p id={helperId} style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '4px' }}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
