import React from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-4 cursor-pointer disabled:opacity-50 disabled:pointer-events-none';

  const variants = {
    primary:
      'bg-[var(--accent)] text-[var(--accent-on)] hover:brightness-95 active:brightness-90 ring-[var(--focus-ring)] shadow-sm',
    secondary:
      'bg-[var(--surface)] text-[var(--fg)] border border-[var(--border)] hover:bg-[var(--surface-warm)] ring-[var(--focus-ring)]',
    ghost:
      'bg-transparent text-[var(--fg)] hover:bg-[var(--surface-warm)] ring-[var(--focus-ring)]',
  };

  const sizes = {
    sm: 'h-9 px-3.5 text-xs rounded-[var(--radius-sm)]',
    md: 'h-11 px-5 text-sm rounded-[var(--radius-md)] min-w-[44px] min-h-[44px]',
    lg: 'h-13 px-7 text-base rounded-[var(--radius-lg)] min-w-[44px] min-h-[44px]',
  };

  return (
    <button className={clsx(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}
