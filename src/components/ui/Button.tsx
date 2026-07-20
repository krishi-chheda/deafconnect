"use client";

import React from 'react';
import Link from 'next/link';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'teal';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      href,
      target,
      rel,
      className = '',
      children,
      disabled,
      type = 'button',
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseStyles = "inline-flex items-center justify-center gap-2 rounded-full transition-all duration-200 focus:outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none";

    // Variant styles matching strict design tokens
    const variantStyles = {
      primary: "bg-brand-coral text-white hover:bg-brand-coral-hover shadow-md active:scale-[0.98]",
      secondary: "bg-white border-2 border-primaryText text-primaryText hover:bg-brand-blue-light/20 shadow-sm active:scale-[0.98]",
      outline: "bg-transparent border-2 border-brand-teal text-brand-teal hover:bg-brand-teal/10 active:scale-[0.98]",
      ghost: "bg-transparent text-primaryText hover:bg-primaryText/5",
      teal: "bg-brand-teal text-white hover:bg-brand-teal/90 shadow-sm active:scale-[0.98]"
    };

    // Size styles
    const sizeStyles = {
      sm: "h-9 px-4 text-xs font-bold",
      md: "h-11 px-5 text-xs font-extrabold uppercase tracking-wider",
      lg: "h-13 px-8 text-sm font-bold"
    };

    const widthStyle = fullWidth ? "w-full" : "";

    const combinedClasses = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`.trim();

    if (href) {
      const isExternal = href.startsWith('http') || href.startsWith('tel:') || href.startsWith('sms:') || href.startsWith('mailto:');
      
      if (isExternal) {
        return (
          <a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            target={target}
            rel={rel || (target === '_blank' ? 'noopener noreferrer' : undefined)}
            className={combinedClasses}
            {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
          >
            {children}
          </a>
        );
      }

      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={combinedClasses}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        disabled={disabled}
        className={combinedClasses}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
