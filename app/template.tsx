'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

/**
 * Kunci berdasarkan pathname memaksa simpul baru di setiap perpindahan rute,
 * sehingga animasi masuk selalu diputar ulang (template saja tidak cukup
 * karena React dapat memakai ulang simpul untuk rute bersaudara).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div key={pathname} className="page-transition w-full">
      {children}
    </div>
  );
}
