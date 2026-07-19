"use client";

import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useAccessibility } from '@/context/AccessibilityContext';

interface NavigationFlowProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onContinue: () => void;
  isContinueDisabled: boolean;
  continueLabel?: string;
  backLabel?: string;
}

export default function NavigationFlow({
  currentStep,
  totalSteps,
  onBack,
  onContinue,
  isContinueDisabled,
  continueLabel = "Continue",
  backLabel = "Back"
}: NavigationFlowProps) {
  const { accessibilityMode } = useAccessibility();
  const isEasyRead = accessibilityMode === 'easyRead';

  return (
    <div className="flex items-center justify-between gap-4 mt-10 pt-6 border-t border-brand-navy/10 w-full max-w-[850px] mx-auto">
      
      {/* Back Button (Only visible on Step 2 and Step 3) */}
      {currentStep > 1 ? (
        <button
          onClick={onBack}
          className={`flex items-center gap-2 rounded-full border-[2px] border-brand-navy/15 bg-white text-brand-navy hover:bg-brand-blue-light/30 transition-all font-extrabold cursor-pointer focus:outline-none ${
            isEasyRead ? 'px-7 py-3.5 text-[16px]' : 'px-5 py-2.5 text-sm'
          }`}
          aria-label="Go back to previous step"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{backLabel}</span>
        </button>
      ) : (
        <div /> // Spacing placeholder
      )}

      {/* Continue / Submit Button */}
      <button
        onClick={onContinue}
        disabled={isContinueDisabled}
        className={`flex items-center gap-2 rounded-full bg-brand-primary text-white font-extrabold transition-all shadow-md focus:outline-none cursor-pointer ${
          isContinueDisabled 
            ? 'opacity-40 cursor-not-allowed bg-brand-navy/30 text-brand-navy/40 shadow-none' 
            : 'hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]'
        } ${
          isEasyRead ? 'px-8 py-4 text-[17px]' : 'px-6 py-3 text-sm'
        }`}
        aria-label={currentStep === totalSteps ? "See matching support options" : "Continue to next step"}
      >
        <span>{continueLabel}</span>
        <ArrowRight className="h-4 w-4" />
      </button>

    </div>
  );
}
