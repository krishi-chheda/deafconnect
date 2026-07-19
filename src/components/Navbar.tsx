"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SlidersHorizontal, 
  ChevronDown, 
  Check, 
  Accessibility, 
  Menu, 
  X,
  Eye,
  Type,
  Activity
} from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useAccessibility, TextSize, ContrastMode, MotionPreference, AccessibilityMode } from '@/context/AccessibilityContext';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { 
    textSize, 
    setTextSize, 
    contrastMode, 
    setContrastMode, 
    motionPreference, 
    setMotionPreference,
    accessibilityMode,
    setAccessibilityMode
  } = useAccessibility();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Find Support', href: '/support' },
    { name: 'Services', href: '/services' },
    { name: 'Community', href: '/community' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  // Helper for active styling
  const isActive = (href: string) => {
    if (pathname === '/' && href === '/') return true;
    if (pathname && pathname.startsWith(href) && href !== '/') return true;
    return false;
  };

  // Custom hand sign SVG icon for the logo
  const HandSignIcon = () => (
    <svg 
      width="32" 
      height="32" 
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
      {/* OK Loop */}
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
      <path 
        d="M19 6C18 4.5 16 3 16 3" 
        stroke="currentColor" 
        strokeWidth="2.5" 
        strokeLinecap="round"
      />
      <path 
        d="M22 4V2" 
        stroke="currentColor" 
        strokeWidth="2.5" 
        strokeLinecap="round"
      />
    </svg>
  );

  return (
    <>
      {/* Skip to Content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-coral focus:text-white focus:rounded-md focus:shadow-md focus:outline-none"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-40 w-full border-b border-brand-blue-light/30 bg-white/80 backdrop-blur-md transition-colors duration-300">
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 sm:px-8">
          
          {/* Logo Section */}
          <Link 
            href="/" 
            className="flex items-center gap-3 focus:outline-none"
            aria-label="Deaf Connect Tasmania Home"
          >
            <HandSignIcon />
            <div className="flex flex-col leading-tight">
              <span className="text-xl font-bold tracking-tight text-brand-navy">Deaf Connect</span>
              <span className="text-xs font-semibold tracking-wider text-brand-teal uppercase">Tasmania</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative py-2 text-[15px] font-semibold text-brand-navy/80 hover:text-brand-navy transition-colors focus:outline-none"
                >
                  {link.name}
                  {active && (
                    <motion.div
                      layoutId="activeNavBorder"
                      className="absolute bottom-0 left-0 right-0 h-[3px] rounded-full bg-brand-coral"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Controls: Preferences Menu + Mobile Toggle */}
          <div className="flex items-center gap-3">
            
            {/* Dynamic Mode Chip (Visible on Desktop) */}
            <div className="hidden lg:flex items-center gap-1.5 rounded-full bg-brand-blue-light/50 border border-brand-teal/20 px-3.5 py-2 text-xs font-bold text-brand-navy select-none shrink-0" aria-label={`Current website display mode: ${accessibilityMode}`}>
              {accessibilityMode === 'auslan' && (
                <>
                  <span className="text-[14px]">🤟</span>
                  <span>Auslan Mode</span>
                </>
              )}
              {accessibilityMode === 'easyRead' && (
                <>
                  <span className="text-[14px]">📖</span>
                  <span>Easy Read</span>
                </>
              )}
              {accessibilityMode === 'plainLanguage' && (
                <>
                  <span className="text-[14px]">📝</span>
                  <span>Plain Language</span>
                </>
              )}
            </div>

            {/* Preferences Dropdown */}
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button 
                  className="flex items-center gap-2 rounded-full border border-brand-navy/10 bg-brand-blue-light/40 hover:bg-brand-blue-light/70 px-4 py-2.5 text-[14px] font-bold text-brand-navy transition-all hover:border-brand-navy/20 cursor-pointer focus:outline-none"
                  aria-label="Open accessibility preferences"
                >
                  <Accessibility className="h-[18px] w-[18px] text-brand-teal" />
                  <span className="hidden sm:inline">My preferences</span>
                  <ChevronDown className="h-4 w-4 opacity-70" />
                </button>
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>
                <DropdownMenu.Content 
                  className="z-50 min-w-[300px] overflow-hidden rounded-[20px] border border-brand-navy/10 bg-white p-4 shadow-xl animate-in fade-in-50 slide-in-from-top-1"
                  align="end"
                  sideOffset={8}
                >
                  <div className="mb-3 px-2 pb-2 border-b border-brand-navy/5">
                    <p className="text-xs font-bold text-brand-navy/50 uppercase tracking-wider">Accessibility Settings</p>
                  </div>

                  {/* Accessibility Display Mode */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 px-2 mb-2 text-sm font-bold text-brand-navy">
                      <Accessibility className="h-4 w-4 text-brand-teal" />
                      <span>Display Mode</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1 bg-brand-blue-light/30 p-1 rounded-xl">
                      {(['auslan', 'easyRead', 'plainLanguage'] as AccessibilityMode[]).map((mode) => (
                        <button
                          key={mode}
                          onClick={() => setAccessibilityMode(mode)}
                          className={`rounded-lg py-1.5 text-xs font-bold transition-all capitalize cursor-pointer ${
                            accessibilityMode === mode 
                              ? 'bg-white text-brand-navy shadow-sm' 
                              : 'text-brand-navy/60 hover:text-brand-navy hover:bg-white/40'
                          }`}
                        >
                          {mode === 'auslan' ? 'Auslan' : mode === 'easyRead' ? 'Easy' : 'Plain'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Text Size Controls */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 px-2 mb-2 text-sm font-bold text-brand-navy">
                      <Type className="h-4 w-4 text-brand-teal" />
                      <span>Text Size</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1 bg-brand-blue-light/30 p-1 rounded-xl">
                      {(['normal', 'large', 'extra-large'] as TextSize[]).map((size) => (
                        <button
                          key={size}
                          onClick={() => setTextSize(size)}
                          className={`rounded-lg py-1.5 text-xs font-bold transition-all capitalize cursor-pointer ${
                            textSize === size 
                              ? 'bg-white text-brand-navy shadow-sm' 
                              : 'text-brand-navy/60 hover:text-brand-navy hover:bg-white/40'
                          }`}
                        >
                          {size === 'normal' ? 'Normal' : size === 'large' ? 'Large' : 'X-Large'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Contrast Preference */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 px-2 mb-2 text-sm font-bold text-brand-navy">
                      <Eye className="h-4 w-4 text-brand-teal" />
                      <span>Color Contrast</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1 bg-brand-blue-light/30 p-1 rounded-xl">
                      {(['normal', 'high'] as ContrastMode[]).map((mode) => (
                        <button
                          key={mode}
                          onClick={() => setContrastMode(mode)}
                          className={`rounded-lg py-1.5 text-xs font-bold transition-all capitalize cursor-pointer ${
                            contrastMode === mode 
                              ? 'bg-white text-brand-navy shadow-sm' 
                              : 'text-brand-navy/60 hover:text-brand-navy hover:bg-white/40'
                          }`}
                        >
                          {mode === 'normal' ? 'Default' : 'High Contrast'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Reduced Motion Toggle */}
                  <div>
                    <div className="flex items-center gap-2 px-2 mb-2 text-sm font-bold text-brand-navy">
                      <Activity className="h-4 w-4 text-brand-teal" />
                      <span>Animations</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1 bg-brand-blue-light/30 p-1 rounded-xl">
                      {(['normal', 'reduced'] as MotionPreference[]).map((pref) => (
                        <button
                          key={pref}
                          onClick={() => setMotionPreference(pref)}
                          className={`rounded-lg py-1.5 text-xs font-bold transition-all capitalize cursor-pointer ${
                            motionPreference === pref 
                              ? 'bg-white text-brand-navy shadow-sm' 
                              : 'text-brand-navy/60 hover:text-brand-navy hover:bg-white/40'
                          }`}
                        >
                          {pref === 'normal' ? 'Enabled' : 'Reduced'}
                        </button>
                      ))}
                    </div>
                  </div>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex md:hidden items-center justify-center rounded-full p-2 text-brand-navy hover:bg-brand-blue-light/40 transition-colors focus:outline-none"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-30 bg-black md:hidden"
            />

            {/* Menu Container */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed right-0 top-20 bottom-0 z-30 w-full max-w-[300px] border-l border-brand-blue-light/30 bg-white p-6 shadow-2xl md:hidden"
            >
              <nav className="flex flex-col gap-5" aria-label="Mobile Navigation">
                {navLinks.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-[17px] font-bold py-2 border-b border-brand-navy/5 flex justify-between items-center transition-colors ${
                        active ? 'text-brand-coral' : 'text-brand-navy hover:text-brand-coral'
                      }`}
                    >
                      <span>{link.name}</span>
                      {active && <span className="h-2 w-2 rounded-full bg-brand-coral" />}
                    </Link>
                  );
                })}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
