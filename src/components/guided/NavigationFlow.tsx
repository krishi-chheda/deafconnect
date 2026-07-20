"use client";

import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useAccessibility } from '@/context/AccessibilityContext';
import Button from '@/components/ui/Button';

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
    <div className="flex items-center justify-between gap-4 mt-10 pt-6 border-t border-primaryText/10 w-full max-w-[850px] mx-auto">
      
      {/* Back Button (Only visible on Step 2 and Step 3) */}
      {currentStep > 1 ? (
        <Button
          variant="secondary"
          size={isEasyRead ? "lg" : "md"}
          onClick={onBack}
          aria-label="Go back to previous step"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{backLabel}</span>
        </Button>
      ) : (
        <div /> // Spacing placeholder
      )}

      {/* Continue / Submit Button */}
      <Button
        variant="primary"
        size={isEasyRead ? "lg" : "md"}
        onClick={onContinue}
        disabled={isContinueDisabled}
        aria-label={currentStep === totalSteps ? "See matching support options" : "Continue to next step"}
      >
        <span>{continueLabel}</span>
        <ArrowRight className="h-4 w-4" />
      </Button>

    </div>
  );
}
