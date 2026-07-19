"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useAccessibility } from '@/context/AccessibilityContext';

interface QuestionCardProps {
  id: string;
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  isSelected: boolean;
  onClick: () => void;
  selectionType?: 'single' | 'multiple';
}

export default function QuestionCard({
  id,
  title,
  description,
  imageSrc,
  imageAlt = "",
  isSelected,
  onClick,
  selectionType = 'single'
}: QuestionCardProps) {
  const { accessibilityMode } = useAccessibility();
  const isEasyRead = accessibilityMode === 'easyRead';
  const cardRef = useRef<HTMLDivElement>(null);

  // Keyboard handler for accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      ref={cardRef}
      role={selectionType === 'single' ? 'radio' : 'checkbox'}
      aria-checked={isSelected}
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={`group relative flex items-center gap-4 rounded-[20px] border-[2px] bg-white text-left cursor-pointer transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-coral/50 ${
        isEasyRead ? 'p-6 sm:p-7' : 'p-5'
      } ${
        isSelected 
          ? 'border-brand-primary bg-brand-primary/[0.03] shadow-sm' 
          : 'border-brand-navy/10 hover:border-brand-primary/40 hover:shadow-md'
      }`}
      aria-label={`${title}: ${description}`}
    >
      
      {/* Visual illustration (hidden in Auslan mode for less text/more icon layout, or kept minimal) */}
      {imageSrc && (
        <div className={`relative shrink-0 rounded-xl bg-brand-blue-light/30 border border-brand-blue-light/20 flex items-center justify-center overflow-hidden ${
          isEasyRead ? 'h-20 w-20' : 'h-16 w-16'
        }`}>
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-contain p-2"
          />
        </div>
      )}

      {/* Main card details */}
      <div className="flex-1 flex flex-col gap-1 pr-6">
        <h3 className={`font-extrabold text-brand-navy leading-snug group-hover:text-brand-primary transition-colors ${
          isEasyRead ? 'text-lg sm:text-xl' : 'text-[16px]'
        }`}>
          {title}
        </h3>
        
        {/* Render description if not empty */}
        {description && (
          <p className={`font-medium text-brand-navy/70 leading-relaxed ${
            isEasyRead ? 'text-[15px]' : 'text-xs'
          }`}>
            {description}
          </p>
        )}
      </div>

      {/* Checkbox/Radio select bubble */}
      <div className={`shrink-0 flex items-center justify-center border-2 transition-all ${
        selectionType === 'single' ? 'rounded-full' : 'rounded-md'
      } ${
        isSelected 
          ? 'border-brand-primary bg-brand-primary text-white scale-100' 
          : 'border-brand-navy/20 bg-white scale-95 group-hover:border-brand-primary/50'
      } ${
        isEasyRead ? 'h-7 w-7' : 'h-5 w-5'
      }`}
      aria-hidden="true"
      >
        {isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Check className={`${isEasyRead ? 'h-4 w-4' : 'h-3 w-3'} stroke-[3.5]`} />
          </motion.div>
        )}
      </div>

    </div>
  );
}
