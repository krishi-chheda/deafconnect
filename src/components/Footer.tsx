"use client";

import React from 'react';
import Link from 'next/link';

import { useAccessibility } from '@/context/AccessibilityContext';
import AuslanLogoIcon from '@/components/ui/AuslanLogoIcon';

export default function Footer() {
  const { accessibilityMode } = useAccessibility();
  const isPlainLanguage = accessibilityMode === 'plainLanguage';
  


  return (
    <footer className="bg-brand-footer-bg text-primaryText mt-10 border-t border-primaryText/10 relative z-10 animate-in" aria-label="Footer Navigation">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 py-10">
        
        {/* Top 5-Column Balanced Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 pb-8 border-b border-primaryText/10">
          
          {/* Column 1: About */}
          <div className="flex flex-col gap-3">
            <Link 
              href="/" 
              className="flex items-center gap-2 focus:outline-none"
              aria-label="Deaf Tasmania Home"
            >
              {!isPlainLanguage && <AuslanLogoIcon size={24} className="text-brand-coral shrink-0 hide-in-plain-language" />}
              <span className="text-lg font-bold tracking-tight text-primaryText whitespace-nowrap">
                Deaf <span className="text-brand-teal">Tasmania</span>
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-primaryText/70 font-semibold pr-2">
              Accessible mental health and wellbeing support navigation for Tasmanian Deaf and hard-of-hearing communities.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-brand-teal">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-2 text-xs font-semibold text-primaryText/80" aria-label="Footer Quick Links">
              <Link href="/" className="hover:text-brand-coral transition-colors focus:outline-none">Home</Link>
              <Link href="/support" className="hover:text-brand-coral transition-colors focus:outline-none">Find Support</Link>
              <Link href="/services" className="hover:text-brand-coral transition-colors focus:outline-none">Services</Link>
              <Link href="/community" className="hover:text-brand-coral transition-colors focus:outline-none">Community</Link>
              <Link href="/about" className="hover:text-brand-coral transition-colors focus:outline-none">About</Link>
              <Link href="/contact" className="hover:text-brand-coral transition-colors focus:outline-none">Contact</Link>
            </nav>
          </div>

          {/* Column 3: Contact */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-brand-teal">
              Contact
            </h4>
            <div className="flex flex-col gap-2.5 text-xs font-semibold text-primaryText/80">
              <p className="flex flex-col">
                <span className="text-[9px] font-extrabold text-primaryText/40 uppercase tracking-wider">SMS Text Hotline</span>
                <a href="sms:0477131114" className="hover:text-brand-coral font-bold text-primaryText mt-0.5">0477 13 11 14</a>
              </p>
              <p className="flex flex-col">
                <span className="text-[9px] font-extrabold text-primaryText/40 uppercase tracking-wider">Email Inquiry</span>
                <a href="mailto:support@deaftasmania.org" className="hover:text-brand-coral font-bold text-primaryText mt-0.5">support@deaftasmania.org</a>
              </p>
              <p className="flex flex-col">
                <span className="text-[9px] font-extrabold text-primaryText/40 uppercase tracking-wider">Relay Service</span>
                <a href="https://www.accesshub.gov.au/about-the-nrs" target="_blank" rel="noopener noreferrer" className="hover:text-brand-coral underline mt-0.5">NRS Calling Portal</a>
              </p>
            </div>
          </div>

          {/* Column 4: Accessibility */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-brand-teal">
              Accessibility
            </h4>
            <div className="flex flex-col gap-2 text-xs font-semibold text-primaryText/85" role="list">
              <div className="flex items-center gap-2" role="listitem">
                {!isPlainLanguage && <span className="text-sm shrink-0 hide-in-plain-language" aria-hidden="true">🤟</span>} 
                <span className="font-extrabold">Auslan Mode</span>
              </div>
              <div className="flex items-center gap-2" role="listitem">
                {!isPlainLanguage && <span className="text-sm shrink-0 hide-in-plain-language" aria-hidden="true">📖</span>} 
                <span className="font-extrabold">Easy Read Support</span>
              </div>
              <div className="flex items-center gap-2" role="listitem">
                {!isPlainLanguage && <span className="text-sm shrink-0 hide-in-plain-language" aria-hidden="true">📝</span>} 
                <span className="font-extrabold">Plain Language</span>
              </div>
              <div className="flex items-center gap-2" role="listitem">
                {!isPlainLanguage && <span className="text-sm shrink-0 hide-in-plain-language" aria-hidden="true">⚙</span>} 
                <span className="font-extrabold">Preferences Panel</span>
              </div>
            </div>
          </div>

          {/* Column 5: Project Information */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-brand-teal">
              Project Info
            </h4>
            
            {/* visually distinct specs & disclaimers info card */}
            <div className="rounded-xl border border-brand-teal/20 bg-white p-3.5 flex flex-col gap-2.5 shadow-sm">
              <ul className="flex flex-col gap-1 text-[11px] font-bold text-primaryText/80" role="list">
                <li className="flex items-center gap-1.5" role="listitem">
                  {!isPlainLanguage && <span className="text-brand-teal text-xs hide-in-plain-language" aria-hidden="true">✓</span>} WCAG AA Accessibility
                </li>
                <li className="flex items-center gap-1.5" role="listitem">
                  {!isPlainLanguage && <span className="text-brand-teal text-xs hide-in-plain-language" aria-hidden="true">✓</span>} Auslan-first design
                </li>
                <li className="flex items-center gap-1.5" role="listitem">
                  {!isPlainLanguage && <span className="text-brand-teal text-xs hide-in-plain-language" aria-hidden="true">✓</span>} Easy Read support
                </li>
                <li className="flex items-center gap-1.5" role="listitem">
                  {!isPlainLanguage && <span className="text-brand-teal text-xs hide-in-plain-language" aria-hidden="true">✓</span>} Plain Language support
                </li>
              </ul>
              
              {/* Visually distinct Educational Prototype Badge */}
              <div 
                className="text-center rounded-lg bg-brand-coral/10 border border-brand-coral/25 px-2 py-1.5 text-[9px] font-extrabold uppercase tracking-widest text-brand-coral shadow-sm leading-tight"
                role="note"
              >
                Educational Prototype
              </div>
            </div>
            
            <p className="text-[10px] font-semibold text-primaryText/50 leading-tight">
              Developed for the Mental Health Council of Tasmania through the Monash Innovation Guarantee.
            </p>
          </div>

        </div>

        {/* Bottom footer row */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-semibold text-primaryText/55">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6">
            <span>© {new Date().getFullYear()} Deaf Tasmania. Portfolio Prototype.</span>
            <Link href="/about" className="hover:text-brand-coral transition-colors focus:outline-none">Accessibility Policy</Link>
            <Link href="/about" className="hover:text-brand-coral transition-colors focus:outline-none">Privacy Policy</Link>
          </div>

          <div className="flex items-center gap-2 rounded-md border border-brand-teal/20 bg-brand-teal/5 px-2.5 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-teal" />
            <span className="text-[10px] font-extrabold tracking-widest uppercase text-brand-teal">WCAG 2.2 AA Compliant</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
