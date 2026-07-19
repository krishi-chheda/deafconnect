"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
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
      className={`group relative flex items-center gap-6 rounded-[24px] border-[2px] cursor-pointer transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-coral/40 ${
        isEasyRead ? 'p-6 sm:p-8' : 'p-5'
      } ${
        isSelected 
          ? 'border-brand-coral bg-brand-coral/[0.06] ring-1 ring-brand-coral shadow-md scale-[1.01]' 
          : 'border-brand-navy/10 bg-white hover:border-brand-teal/30 hover:shadow-md'
      }`}
      aria-label={`${title}${isEasyRead && description ? `: ${description}` : ''}`}
    >
      
      {/* Visual illustration (larger containers) */}
      {imageSrc && (
        <div className={`relative shrink-0 rounded-xl bg-brand-blue-light/40 border border-brand-blue-light/30 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-102 ${
          isEasyRead ? 'h-24 w-24' : 'h-20 w-20'
        }`}>
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-contain p-2"
          />
        </div>
      )}

      {/* Card Details: title and description */}
      <div className="flex-1 flex flex-col gap-1.5 pr-2">
        <h3 className={`font-extrabold text-brand-navy leading-snug transition-colors ${
          isSelected ? 'text-brand-coral' : 'group-hover:text-brand-teal'
        } ${
          isEasyRead ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg'
        }`}>
          {title}
        </h3>
        
        {/* Render description ONLY when Easy Read mode is active (for less text cards) */}
        {isEasyRead && description && (
          <p className="font-semibold text-brand-navy/70 leading-relaxed text-sm sm:text-base">
            {description}
          </p>
        )}
      </div>

    </div>
  );
}
