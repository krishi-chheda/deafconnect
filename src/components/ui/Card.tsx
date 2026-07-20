"use client";

import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'highlight' | 'outlined' | 'ghost';
  children: React.ReactNode;
}

export function Card({ variant = 'default', className = '', children, ...props }: CardProps) {
  const baseStyles = "rounded-[24px] transition-all duration-200 shadow-sm relative overflow-hidden";
  
  const variantStyles = {
    default: "bg-white border border-primaryText/10",
    highlight: "bg-brand-peach-light/30 border-2 border-brand-coral/40 ring-1 ring-brand-coral/10",
    outlined: "bg-brand-blue-light/10 border-2 border-brand-teal/20",
    ghost: "bg-brand-blue-light/20 border border-primaryText/5"
  };

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`p-6 sm:p-8 flex flex-col gap-2 ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className = '', children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={`text-lg sm:text-xl font-extrabold text-primaryText tracking-tight ${className}`.trim()} {...props}>
      {children}
    </h3>
  );
}

export function CardDescription({ className = '', children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={`text-xs font-semibold text-primaryText/60 leading-relaxed ${className}`.trim()} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`px-6 pb-6 sm:px-8 sm:pb-8 flex flex-col gap-4 ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`px-6 py-4 sm:px-8 border-t border-primaryText/5 flex items-center justify-between gap-4 ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}

export default Card;
