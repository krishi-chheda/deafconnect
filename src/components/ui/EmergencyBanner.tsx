"use client";

import React from 'react';
import { AlertTriangle, PhoneCall, Phone } from 'lucide-react';
import { useAccessibility } from '@/context/AccessibilityContext';
import Button from '@/components/ui/Button';

export interface EmergencyBannerProps {
  className?: string;
}

export function EmergencyBanner({ className = '' }: EmergencyBannerProps) {
  const { accessibilityMode } = useAccessibility();
  const isEasyRead = accessibilityMode === 'easyRead';

  const headingText = isEasyRead 
    ? "Need urgent help right now?" 
    : "Need urgent help?";

  const descriptionText = isEasyRead
    ? "If you need help right away, call 000 for Emergency or send a text to Lifeline."
    : "If you or someone else is in immediate danger or needs urgent mental health support, contact emergency services or a crisis service immediately.";

  return (
    <div 
      className={`rounded-[24px] bg-[#1C2544] text-white dark-surface p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-md border border-brand-coral/30 relative overflow-hidden ${className}`.trim()}
      role="region"
      aria-label="Emergency Crisis Assistance Banner"
    >
      {/* Decorative side accent bar */}
      <div className="absolute top-0 left-0 bottom-0 w-2 bg-brand-coral" aria-hidden="true" />

      {/* LEFT SIDE: Warning Icon + Heading + Description */}
      <div className="flex items-start gap-4 max-w-[720px] pl-2">
        <div className="h-12 w-12 rounded-2xl bg-brand-coral/20 border border-brand-coral/40 flex items-center justify-center shrink-0 text-brand-coral mt-0.5" aria-hidden="true">
          <AlertTriangle className="h-6 w-6 stroke-[2.5]" />
        </div>

        <div className="flex flex-col gap-1.5">
          <h3 className="text-xl sm:text-2xl font-extrabold text-white !text-white dark-surface-heading tracking-tight leading-snug">
            {headingText}
          </h3>
          <p className="text-xs sm:text-sm font-medium text-white/90 !text-white/90 dark-surface-description leading-relaxed">
            {descriptionText}
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: Action Buttons (Text Lifeline + Call 000) */}
      <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full lg:w-auto">
        <Button
          variant="primary"
          size="md"
          href="sms:0477131114"
          className="w-full sm:w-auto"
        >
          <PhoneCall className="h-4 w-4" />
          <span>Text Lifeline</span>
        </Button>

        <Button
          variant="secondary"
          size="md"
          href="tel:000"
          className="w-full sm:w-auto"
        >
          <Phone className="h-4 w-4 fill-current" />
          <span>Call 000 (Emergency)</span>
        </Button>
      </div>

    </div>
  );
}

export default EmergencyBanner;
