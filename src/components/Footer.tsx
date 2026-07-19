"use client";

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  
  const HandSignIcon = () => (
    <svg 
      width="28" 
      height="28" 
      viewBox="0 0 32 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="text-brand-coral shrink-0"
      aria-hidden="true"
    >
      <path 
        d="M10 24V14C10 12.8954 9.10457 12 8 12C6.89543 12 6 12.8954 6 14V24C6 26.2091 7.79086 28 10 28H15C18.3137 28 21 25.3137 21 22V17C21 15.8954 20.1046 15 19 15C17.8954 15 17 15.8954 17 17V21M17 21C17 21 16.5 18 15 18C13.5 18 13 19 13 21" 
        stroke="currentColor" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <circle 
        cx="21.5" 
        cy="9.5" 
        r="4.5" 
        stroke="currentColor" 
        strokeWidth="2.5"
      />
      <path 
        d="M26 9.5C26 7.5 28 6 28 6" 
        stroke="currentColor" 
        strokeWidth="2.5" 
        strokeLinecap="round"
      />
    </svg>
  );

  return (
    <footer className="bg-brand-navy text-white mt-16 border-t border-brand-navy/20 relative z-10" aria-label="Footer Navigation">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 py-12 md:py-16">
        
        {/* Top footer row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12 border-b border-white/10">
          
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-4 flex flex-col gap-4">
            <Link 
              href="#" 
              className="flex items-center gap-3 focus:outline-none"
              aria-label="Deaf Connect Tasmania Home"
            >
              <HandSignIcon />
              <div className="flex flex-col leading-tight">
                <span className="text-xl font-bold tracking-tight text-white">Deaf Connect</span>
                <span className="text-xs font-semibold tracking-wider text-brand-teal uppercase">Tasmania</span>
              </div>
            </Link>
            <p className="text-[14px] leading-relaxed text-white/70 font-medium max-w-[320px]">
              Providing accessible mental health support and community pathways for Deaf and hard-of-hearing Tasmanians.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 md:col-span-2 flex flex-col gap-4">
            <h4 className="text-sm font-extrabold uppercase tracking-widest text-brand-teal">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-3 text-[14px] font-semibold text-white/80" aria-label="Quick Links Navigation">
              <Link href="#" className="hover:text-brand-teal transition-colors focus:outline-none">Home</Link>
              <Link href="#support" className="hover:text-brand-teal transition-colors focus:outline-none">Find Support</Link>
              <Link href="#mental-health" className="hover:text-brand-teal transition-colors focus:outline-none">Mental Health</Link>
              <Link href="#community" className="hover:text-brand-teal transition-colors focus:outline-none">Community</Link>
            </nav>
          </div>

          {/* Contact Details */}
          <div className="col-span-1 md:col-span-3 flex flex-col gap-4">
            <h4 className="text-sm font-extrabold uppercase tracking-widest text-brand-teal">
              Contact Us
            </h4>
            <div className="flex flex-col gap-3 text-[14px] font-semibold text-white/85">
              <p className="flex flex-col gap-0.5">
                <span className="text-[11px] font-bold text-white/45 uppercase tracking-wide">SMS Text Hotline</span>
                <a href="sms:0477131114" className="hover:text-brand-teal transition-colors focus:outline-none">0477 13 11 14</a>
              </p>
              <p className="flex flex-col gap-0.5">
                <span className="text-[11px] font-bold text-white/45 uppercase tracking-wide">Email Inquiry</span>
                <a href="mailto:support@deafconnecttas.org" className="hover:text-brand-teal transition-colors focus:outline-none">support@deafconnecttas.org</a>
              </p>
              <p className="flex flex-col gap-0.5">
                <span className="text-[11px] font-bold text-white/45 uppercase tracking-wide">National Relay Service</span>
                <a href="https://www.accesshub.gov.au/about-the-nrs" target="_blank" rel="noopener noreferrer" className="hover:text-brand-teal transition-colors focus:outline-none underline">Access NRS Call portal</a>
              </p>
            </div>
          </div>

          {/* Accreditation & Badge column */}
          <div className="col-span-1 md:col-span-3 flex flex-col gap-5">
            <h4 className="text-sm font-extrabold uppercase tracking-widest text-brand-teal">
              Accreditation
            </h4>
            
            {/* Registered NDIS Provider Badge visual */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 flex items-center gap-3">
              <div className="h-6 w-6 rounded-full bg-brand-teal flex items-center justify-center text-xs font-bold text-brand-navy" aria-hidden="true">
                ✓
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-xs font-extrabold tracking-wide uppercase">Registered</span>
                <span className="text-sm font-bold text-brand-teal">NDIS Provider</span>
              </div>
            </div>

            <p className="text-[11px] font-semibold text-white/50 leading-normal">
              Deaf Connect Tasmania is fully certified to provide NDIS plan managed and self-managed mental health counseling services.
            </p>
          </div>
        </div>

        {/* Bottom footer row */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-semibold text-white/60">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6">
            <span>© {new Date().getFullYear()} Deaf Connect Tasmania. All rights reserved.</span>
            <a href="#accessibility-policy" className="hover:text-white transition-colors focus:outline-none">Accessibility Policy</a>
            <a href="#privacy" className="hover:text-white transition-colors focus:outline-none">Privacy Policy</a>
          </div>

          {/* WCAG compliant notice badge */}
          <div className="flex items-center gap-2 rounded-md border border-brand-teal/20 bg-brand-teal/5 px-2.5 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-teal" />
            <span className="text-[10px] font-extrabold tracking-widest uppercase text-brand-teal">WCAG 2.2 AA Compliant</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
