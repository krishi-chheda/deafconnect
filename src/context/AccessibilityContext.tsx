"use client";

import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { usePreferenceStore, TextSize, ContrastMode, MotionPreference, AccessibilityMode } from '@/store/preference-store';
import { motion, AnimatePresence } from 'framer-motion';

export type { TextSize, ContrastMode, MotionPreference, AccessibilityMode };

interface AccessibilityContextType {
  textSize: TextSize;
  setTextSize: (size: TextSize) => void;
  contrastMode: ContrastMode;
  setContrastMode: (mode: ContrastMode) => void;
  motionPreference: MotionPreference;
  setMotionPreference: (preference: MotionPreference) => void;
  accessibilityMode: AccessibilityMode;
  setAccessibilityMode: (mode: AccessibilityMode) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { 
    accessibilityMode, 
    textSize, 
    contrastMode, 
    motionPreference,
    setAccessibilityMode,
    setTextSize,
    setContrastMode,
    setMotionPreference
  } = usePreferenceStore();

  const [mounted, setMounted] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const prevModeRef = useRef<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    if (prevModeRef.current && prevModeRef.current !== accessibilityMode) {
      let modeText = "Plain Language";
      if (accessibilityMode === 'auslan') modeText = "Auslan Mode";
      if (accessibilityMode === 'easyRead') modeText = "Easy Read Mode";
      
      setToastMessage(`${modeText} is now active`);
      const timer = setTimeout(() => setToastMessage(null), 3000);
      return () => clearTimeout(timer);
    }
    
    prevModeRef.current = accessibilityMode;
  }, [accessibilityMode, mounted]);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    
    // Apply text size scale variable
    let scale = '1';
    if (textSize === 'large') scale = '1.15';
    if (textSize === 'extra-large') scale = '1.3';

    // If easyRead is active, enforce a larger font scale baseline
    if (accessibilityMode === 'easyRead') {
      scale = textSize === 'normal' ? '1.2' : textSize === 'large' ? '1.35' : '1.5';
    }
    
    root.style.setProperty('--text-scale', scale);

    // Apply contrast mode class
    if (contrastMode === 'high') {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Apply motion preference class
    if (motionPreference === 'reduced') {
      root.classList.add('reduced-motion');
      root.setAttribute('data-reduced-motion', 'true');
    } else {
      root.classList.remove('reduced-motion');
      root.removeAttribute('data-reduced-motion');
    }

    // Apply accessibility mode class
    root.classList.remove('auslan-mode', 'easy-read-mode', 'plain-language-mode');
    if (accessibilityMode === 'auslan') {
      root.classList.add('auslan-mode');
    } else if (accessibilityMode === 'easyRead') {
      root.classList.add('easy-read-mode');
    } else if (accessibilityMode === 'plainLanguage') {
      root.classList.add('plain-language-mode');
    }
  }, [textSize, contrastMode, motionPreference, accessibilityMode, mounted]);

  return (
    <AccessibilityContext.Provider
      value={{
        textSize,
        setTextSize,
        contrastMode,
        setContrastMode,
        motionPreference,
        setMotionPreference,
        accessibilityMode,
        setAccessibilityMode,
      }}
    >
      {children}

      {/* Dynamic format selection toast notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-brand-teal/20 bg-white/95 p-4 shadow-xl backdrop-blur-md text-brand-navy max-w-[340px]"
            role="alert"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-teal/15 text-brand-teal">
              {accessibilityMode === 'auslan' && <span className="text-lg">🤟</span>}
              {accessibilityMode === 'easyRead' && <span className="text-lg">📖</span>}
              {accessibilityMode === 'plainLanguage' && <span className="text-lg">📝</span>}
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-xs font-extrabold tracking-tight">{toastMessage}</span>
              <span className="text-[10px] font-semibold text-brand-navy/55 mt-0.5">Interface updated successfully.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
