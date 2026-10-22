import React from 'react';
import clsx from 'clsx';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'accent';
}

export function Badge({ variant = 'default', className, children, ...props }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-[var(--radius-pill)] px-3 py-1 font-mono text-sm font-semibold tracking-wider uppercase',
        variant === 'default'
          ? 'bg-[var(--surface-warm)] text-[var(--fg-2)] border border-[var(--border)]'
          : 'bg-[var(--accent)] text-[var(--accent-on)]',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
