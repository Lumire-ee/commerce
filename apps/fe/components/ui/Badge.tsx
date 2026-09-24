import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'dark' | 'gold' | 'silver' | 'bronze' | 'red' | 'blue' | 'gray';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export function Badge({
  variant = 'gray',
  children,
  icon,
  className = '',
  ...props
}: BadgeProps) {
  const variantClass = `ui-badge-${variant}`;

  return (
    <span
      className={`ui-badge ${variantClass} ${className}`.trim()}
      {...props}
    >
      {icon && <span style={{ display: 'inline-flex' }} aria-hidden="true">{icon}</span>}
      {children}
    </span>
  );
}
