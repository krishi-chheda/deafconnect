"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, ChevronRight } from 'lucide-react';

export default function JourneySection() {
  const stepConnectorAnim = {
    strokeDashoffset: [0, -12],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "linear" as const
    }
  };

  return (
    <section className="mx-auto max-w-[1440px] px-6 sm:px-8 py-12">
      
      {/* Guided Pathway Card */}
      <div className="rounded-[24px] border-[2px] border-brand-coral/20 bg-brand-peach-light/40 p-8 md:p-12 shadow-sm mb-16 relative overflow-hidden">
        
        {/* Subtle coral accent background shape */}
        <div className="absolute right-0 bottom-0 w-[400px] h-[400px] rounded-full bg-brand-coral/[0.03] blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          {/* Left Block */}
          <div className="flex flex-col gap-3 max-w-[620px]">
            <h2 className="text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">
              Not Sure Where to Start?
            </h2>
            <p className="text-base sm:text-lg font-medium text-brand-navy/70 leading-relaxed">
              Answer a few simple questions and we'll guide you to services that match your communication styles and health goals.
            </p>
          </div>

          {/* Right Block (CTA + Helper text) */}
          <div className="flex flex-col gap-3 shrink-0 w-full sm:w-auto">
            
            <Link
              href="/support"
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full bg-brand-coral text-white hover:bg-brand-coral-hover px-8 py-4 text-base font-bold shadow-md cursor-pointer transition-all hover:scale-[1.02] focus:outline-none active:scale-[0.98]"
              aria-label="Help me find support quiz. Takes 1 to 2 minutes."
            >
              <span>Help me find support</span>
              <ChevronRight className="h-5 w-5" />
            </Link>

            <div className="flex items-center gap-2 text-brand-navy/60 self-center lg:self-start">
              <Clock className="h-4 w-4 shrink-0 text-brand-teal" />
              <span className="text-[13px] font-semibold text-center sm:text-left leading-normal">
                Takes 1–2 minutes. No personal information required.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Step Timeline Flow */}
      <div className="flex flex-col gap-6 text-center mb-12">
        <h3 className="text-2xl font-bold tracking-tight text-brand-navy">How it works</h3>
        <p className="text-sm font-semibold text-brand-teal uppercase tracking-widest">A simple 3-step timeline to guide you</p>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4 max-w-[1100px] mx-auto">
        
        {/* Step 1 */}
        <div className="flex-1 flex flex-col items-center gap-5 text-center">
          <div className="relative">
            {/* Step badge */}
            <span className="absolute -top-2 -left-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-brand-teal text-white text-sm font-extrabold shadow-sm">
              1
            </span>
            
            {/* Illustration */}
            <div className="relative h-44 w-44 rounded-2xl bg-white border border-brand-navy/5 flex items-center justify-center p-4 shadow-sm">
              <Image
                src="/illustrations/step1_thinking.png"
                alt="Illustration of a person thinking, hand on chin, representing telling us your support needs"
                fill
                className="object-contain p-4"
              />
            </div>
          </div>
          <h4 className="text-lg font-extrabold text-brand-navy tracking-tight">
            Tell us what you need
          </h4>
        </div>

        {/* Step 1 -> 2 Connector */}
        <div className="hidden lg:flex items-center justify-center flex-1 h-12 w-full max-w-[80px] shrink-0" aria-hidden="true">
          <svg width="60" height="8" viewBox="0 0 60 8" fill="none">
            <motion.path 
              d="M2 4h56" 
              stroke="#F46B45" 
              strokeWidth="3" 
              strokeLinecap="round" 
              strokeDasharray="6 6"
              animate={stepConnectorAnim}
            />
          </svg>
        </div>

        {/* Step 2 */}
        <div className="flex-1 flex flex-col items-center gap-5 text-center">
          <div className="relative">
            <span className="absolute -top-2 -left-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-brand-teal text-white text-sm font-extrabold shadow-sm">
              2
            </span>
            
            <div className="relative h-44 w-44 rounded-2xl bg-white border border-brand-navy/5 flex items-center justify-center p-4 shadow-sm">
              <Image
                src="/illustrations/step2_communicate.png"
                alt="Illustration of options for phone, signing, and checklist representing choosing communication channel"
                fill
                className="object-contain p-4"
              />
            </div>
          </div>
          <h4 className="text-lg font-extrabold text-brand-navy tracking-tight">
            Choose how you communicate
          </h4>
        </div>

        {/* Step 2 -> 3 Connector */}
        <div className="hidden lg:flex items-center justify-center flex-1 h-12 w-full max-w-[80px] shrink-0" aria-hidden="true">
          <svg width="60" height="8" viewBox="0 0 60 8" fill="none">
            <motion.path 
              d="M2 4h56" 
              stroke="#F46B45" 
              strokeWidth="3" 
              strokeLinecap="round" 
              strokeDasharray="6 6"
              animate={stepConnectorAnim}
            />
          </svg>
        </div>

        {/* Step 3 */}
        <div className="flex-1 flex flex-col items-center gap-5 text-center">
          <div className="relative">
            <span className="absolute -top-2 -left-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-brand-teal text-white text-sm font-extrabold shadow-sm">
              3
            </span>
            
            <div className="relative h-44 w-44 rounded-2xl bg-white border border-brand-navy/5 flex items-center justify-center p-4 shadow-sm">
              <Image
                src="/illustrations/step3_support.png"
                alt="Illustration of a laptop showing checklists and a success check mark badge representing final support match results"
                fill
                className="object-contain p-4"
              />
            </div>
          </div>
          <h4 className="text-lg font-extrabold text-brand-navy tracking-tight">
            See suitable support
          </h4>
        </div>

      </div>
    </section>
  );
}
