"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div className="flex flex-col gap-2 w-full max-w-[680px] mx-auto mb-8" aria-label={`Progress: Step ${currentStep} of ${totalSteps}`}>
      <div className="flex justify-between items-center text-xs font-extrabold uppercase tracking-widest text-brand-teal">
        <span>Step {currentStep} of {totalSteps}</span>
        <span className="tabular-nums">{Math.round(percentage)}% Complete</span>
      </div>
      
      {/* Progress Bar Track */}
      <div className="h-2.5 w-full bg-brand-blue-light/50 rounded-full overflow-hidden border border-brand-blue-light/30">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ type: "spring", stiffness: 80, damping: 15 }}
          className="h-full bg-brand-coral rounded-full"
        />
      </div>
    </div>
  );
}
