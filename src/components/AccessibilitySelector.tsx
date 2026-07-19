"use client";

import React from 'react';
import { motion } from 'framer-motion';

export type AccessOption = 'auslan' | 'easyread' | 'plain';

interface AccessibilitySelectorProps {
  selected: AccessOption;
  onChange: (option: AccessOption) => void;
}

export default function AccessibilitySelector({ selected, onChange }: AccessibilitySelectorProps) {
  
  const options = [
    {
      id: 'auslan' as AccessOption,
      title: 'Auslan',
      icon: (
        <svg 
          width="28" 
          height="28" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="shrink-0"
        >
          {/* Custom OK Hand Gesture Sign */}
          <path d="M2 15V9c0-1.1.9-2 2-2s2 .9 2 2v6" />
          <path d="M6 9V7c0-1.1.9-2 2-2s2 .9 2 2v7" />
          <path d="M10 11V9c0-1.1.9-2 2-2s2 .9 2 2v5" />
          <path d="M14 14c0 3.3-2.7 6-6 6H7c-2.8 0-5-2.2-5-5" />
          {/* Loop for interlocking OK finger */}
          <circle cx="18" cy="7" r="3" />
          <path d="M18 10c1.5 0 2.5 1 2.5 2.5v3.5c0 1.5-1 2.5-2.5 2.5" />
        </svg>
      ),
      description: 'Auslan video content'
    },
    {
      id: 'easyread' as AccessOption,
      title: 'Easy Read',
      icon: (
        <svg 
          width="28" 
          height="28" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="shrink-0"
        >
          {/* Custom open book with faces representing Easy Read */}
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          {/* Face 1 */}
          <circle cx="6.5" cy="8.5" r="1" />
          <path d="M5 11.5c.5.5 1.5.5 2 0" />
          {/* Face 2 */}
          <circle cx="17.5" cy="8.5" r="1" />
          <path d="M16 11.5c.5.5 1.5.5 2 0" />
        </svg>
      ),
      description: 'Simplified text with graphics'
    },
    {
      id: 'plain' as AccessOption,
      title: 'Plain Language',
      icon: (
        <svg 
          width="28" 
          height="28" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="shrink-0"
        >
          {/* Document with checklist lines representing Plain Language */}
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <line x1="10" y1="9" x2="8" y2="9" />
        </svg>
      ),
      description: 'Clear, straightforward text'
    }
  ];

  return (
    <div className="flex flex-col gap-3">
      <span className="text-[14px] font-bold text-brand-navy/60 uppercase tracking-wider">
        Choose how you access information
      </span>
      
      <div 
        className="grid grid-cols-1 sm:grid-cols-3 gap-3"
        role="radiogroup"
        aria-label="Information access preference"
      >
        {options.map((option) => {
          const isSelected = selected === option.id;
          
          return (
            <button
              key={option.id}
              onClick={() => onChange(option.id)}
              role="radio"
              aria-checked={isSelected}
              aria-label={`${option.title}: ${option.description}`}
              className="group focus:outline-none cursor-pointer"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-3.5 px-5 py-4 rounded-[16px] border-[2px] transition-all duration-300 text-left ${
                  isSelected 
                    ? 'border-brand-teal bg-brand-teal/5 text-brand-navy shadow-sm' 
                    : 'border-brand-navy/10 bg-white text-brand-navy/80 hover:border-brand-teal/40 hover:text-brand-navy'
                }`}
              >
                <div className={`transition-colors duration-300 ${
                  isSelected ? 'text-brand-teal' : 'text-brand-navy/60 group-hover:text-brand-teal'
                }`}>
                  {option.icon}
                </div>
                <span className="text-[16px] font-bold tracking-tight">
                  {option.title}
                </span>
              </motion.div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
