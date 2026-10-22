import React from 'react';
import clsx from 'clsx';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'warm';
}

export function Card({ variant = 'default', className, children, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        'rounded-[var(--radius-lg)] border p-6 transition-all duration-200',
        variant === 'default'
          ? 'bg-[var(--surface)] border-[var(--border)] hover:border-[var(--muted)]/40 hover:-translate-y-0.5'
          : 'bg-[var(--surface-warm)] border-[var(--border-soft)]',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
