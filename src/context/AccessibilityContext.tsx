"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { usePreferenceStore, TextSize, ContrastMode, MotionPreference, AccessibilityMode } from '@/store/preference-store';

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

  useEffect(() => {
    setMounted(true);
  }, []);

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
