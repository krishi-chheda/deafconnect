"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  name: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex flex-wrap items-center gap-1.5 text-[11px] font-bold text-primaryText/60 uppercase tracking-wider mb-8" aria-label="Breadcrumb">
      <Link href="/" className="hover:text-brand-coral flex items-center gap-1.5 focus:outline-none transition-colors">
        <Home className="h-3.5 w-3.5" />
        <span>Home</span>
      </Link>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="h-3 w-3 text-primaryText/30 shrink-0" aria-hidden="true" />
            {isLast || !item.href ? (
              <span className="text-brand-teal truncate font-extrabold" aria-current="page">
                {item.name}
              </span>
            ) : (
              <Link href={item.href} className="hover:text-brand-coral truncate focus:outline-none transition-colors">
                {item.name}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
