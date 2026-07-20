"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  // Map step numbers to progress line percentages
  // Step 1: 0% between dot 1 and dot 2
  // Step 2: 50% between dot 2 and dot 3
  // Step 3: 100% full line
  const progressPercent = currentStep === 1 ? 0 : currentStep === 2 ? 50 : 100;

  const steps = [
    { num: 1, label: "Situation" },
    { num: 2, label: "Goals" },
    { num: 3, label: "Communication" }
  ];

  return (
    <div className="w-full max-w-[600px] mx-auto mb-12 flex flex-col items-center gap-4" aria-label={`Progress: Step ${currentStep} of ${totalSteps}`}>
      
      {/* Node and Line Container */}
      <div className="relative w-full flex items-center justify-between px-2">
        
        {/* Progress Background Track */}
        <div className="absolute left-6 right-6 top-5 h-1 bg-brand-blue-light border-b border-brand-blue-light/50 rounded-full -translate-y-1/2 z-0" />
        
        {/* Progress Filled Track */}
        <motion.div 
          className="absolute left-6 top-5 h-1 bg-brand-coral rounded-full -translate-y-1/2 z-0"
          initial={{ width: "0%" }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ type: "spring", stiffness: 70, damping: 14 }}
        />

        {/* Stepper Dots */}
        {steps.map((st) => {
          const isCompleted = currentStep > st.num;
          const isActive = currentStep === st.num;
          const isVisited = currentStep >= st.num;

          return (
            <div key={st.num} className="flex flex-col items-center gap-2 relative z-10">
              
              {/* Dot Circle */}
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ 
                  scale: isActive ? 1.15 : 1,
                  borderColor: isVisited ? "#FF6641" : "#EAF6FC",
                  backgroundColor: isCompleted ? "#FF6641" : isActive ? "#ffffff" : "#ffffff",
                  color: isCompleted ? "#ffffff" : isActive ? "#FF6641" : "#1C2544"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`h-10 w-10 rounded-full border-2 flex items-center justify-center font-bold text-sm shadow-sm ${
                  isActive ? 'ring-4 ring-brand-coral/20' : ''
                }`}
              >
                {isCompleted ? (
                  <Check className="h-5 w-5 stroke-[3]" />
                ) : (
                  <span>{st.num}</span>
                )}
              </motion.div>

              {/* Text Label */}
              <span className={`text-[11px] uppercase tracking-widest font-extrabold transition-colors duration-300 ${
                isActive ? 'text-brand-coral' : isCompleted ? 'text-primaryText' : 'text-primaryText/35'
              }`}>
                {st.label}
              </span>

            </div>
          );
        })}

      </div>

    </div>
  );
}
