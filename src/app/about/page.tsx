"use client";

import React from 'react';
import { useAccessibility } from "@/context/AccessibilityContext";
import AnimatePage from "@/components/guided/AnimatePage";
import { Info, HelpCircle } from 'lucide-react';
import InterpreterVideo from "@/components/guided/InterpreterVideo";

export default function AboutPage() {
  const { accessibilityMode } = useAccessibility();
  const isEasyRead = accessibilityMode === 'easyRead';

  return (
    <AnimatePage>
      <div className="mx-auto max-w-[1000px] px-6 sm:px-8 py-12 md:py-16" id="main-content">
        
        {/* Header titles */}
        <div className="text-center md:text-left mb-10 border-b border-primaryText/10 pb-6">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-teal">Project Background</span>
          <h1 className="text-3xl font-extrabold tracking-tight text-primaryText sm:text-4xl mt-1">
            About Deaf Tasmania
          </h1>
          <p className="text-sm font-semibold text-primaryText/60 leading-relaxed mt-2">
            An accessible navigation platform helping Deaf Tasmanians find suitable mental health support.
          </p>
        </div>

        {/* Auslan Interpreter Video Header in Auslan Mode */}
        {accessibilityMode === 'auslan' && (
          <div className="flex justify-center mb-10">
            <InterpreterVideo stepKey="about" questionText="About Deaf Tasmania" />
          </div>
        )}

        {/* Disclaimer Callout Box */}
        <div className="rounded-[20px] bg-brand-coral/5 border-[2px] border-brand-coral/20 p-6 flex gap-4 items-start mb-10">
          <Info className="h-6 w-6 text-brand-coral shrink-0 mt-0.5" aria-hidden="true" />
          <div className="flex flex-col gap-1.5 text-primaryText">
            <h2 className="font-extrabold text-[16px] uppercase tracking-wide text-brand-coral">Educational Prototype Disclaimer</h2>
            <p className="text-xs font-semibold leading-relaxed">
              This website is an educational prototype developed for the <strong>Monash Innovation Guarantee (MIG)</strong> in collaboration with the <strong>Mental Health Council of Tasmania (MHCT)</strong>. 
            </p>
            <p className="text-xs font-semibold leading-relaxed">
              It is <strong>NOT</strong> an official government website or a live medical service registry. All content, recommendations, and simulated interpreters are designed solely for classroom presentation, testing, and portfolio demonstration.
            </p>
          </div>
        </div>

        {/* Core Project Details */}
        <div className="flex flex-col gap-8 text-primaryText/85 font-medium leading-relaxed text-sm sm:text-base">
          
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-extrabold text-primaryText tracking-tight">Our Purpose</h3>
            <p>
              Finding the right mental health support is often challenging, but communication barriers double this difficulty for Deaf and hard-of-hearing Tasmanians. Many healthcare facilities lack sign-language options or direct interpretation guides, making primary bookings stressful.
            </p>
            <p>
              This prototype was built to showcase how modern web design rules can adapt dynamically to visual learners. By storing user choices in a central store, this site shifts layout, language complexity, and visual interpretative support to meet individual profiles.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-extrabold text-primaryText tracking-tight">The Monash Innovation Guarantee</h3>
            <p>
              The Monash Innovation Guarantee is an experiential learning program bringing students and partners together to solve real-world problems. This application was conceptualized and coded to address specific needs flagged by mental health providers across Tasmania.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-extrabold text-primaryText tracking-tight">Partners and Mentors</h3>
            <ul className="list-disc pl-5 flex flex-col gap-1 text-sm font-semibold">
              <li><strong>Monash University</strong> (Student developer & designers)</li>
              <li><strong>Mental Health Council of Tasmania</strong> (Mentorship & domain guidance)</li>
              <li><strong>Tasmanian Deaf Community Advocates</strong> (Layout feedback)</li>
            </ul>
          </div>

        </div>

      </div>
    </AnimatePage>
  );
}
