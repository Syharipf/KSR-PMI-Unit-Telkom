'use client';

import React, { useEffect, useState } from 'react';

interface CountUpProps {
  value: number;
  duration?: number;
  suffix?: string;
}

export function CountUp({ value, duration = 1200, suffix = '' }: CountUpProps) {
  const [count, setCount] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return value;
    }
    return 0;
  });

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let start = 0;
    const stepTime = 20;
    const totalSteps = duration / stepTime;
    const increment = value / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return (
    <span>
      {new Intl.NumberFormat('id-ID').format(count)}
      {suffix}
    </span>
  );
}
