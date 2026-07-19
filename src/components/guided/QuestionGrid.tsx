"use client";

import React from 'react';
import { useAccessibility } from '@/context/AccessibilityContext';

interface QuestionGridProps {
  children: React.ReactNode;
}

export default function QuestionGrid({ children }: QuestionGridProps) {
  const { accessibilityMode } = useAccessibility();
  
  const getGridClasses = () => {
    // Generous grid spacing for Easy Read and Auslan modes
    if (accessibilityMode === 'easyRead') {
      return 'grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[900px] mx-auto';
    }
    if (accessibilityMode === 'auslan') {
      return 'grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[900px] mx-auto';
    }
    return 'grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[850px] mx-auto';
  };

  return (
    <div 
      className={getGridClasses()}
      role="group"
    >
      {children}
    </div>
  );
}
