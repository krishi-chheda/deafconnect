"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAccessibility } from '@/context/AccessibilityContext';
import { useSupportFlow } from '@/context/SupportFlowContext';
import { plainLanguageData } from '@/data/plainLanguage';
import { easyReadData } from '@/data/easyRead';
import { auslanData } from '@/data/auslan';

import ProgressIndicator from "@/components/guided/ProgressIndicator";
import QuestionCard from "@/components/guided/QuestionCard";
import QuestionGrid from "@/components/guided/QuestionGrid";
import InterpreterVideo from "@/components/guided/InterpreterVideo";
import NavigationFlow from "@/components/guided/NavigationFlow";
import AnimatePage from "@/components/guided/AnimatePage";

export default function Step2Page() {
  const router = useRouter();
  const { accessibilityMode } = useAccessibility();
  const { goal, setGoal } = useSupportFlow();

  // Load correct translations dataset
  const getActiveData = () => {
    if (accessibilityMode === 'auslan') return auslanData;
    if (accessibilityMode === 'easyRead') return easyReadData;
    return plainLanguageData;
  };

  const activeData = getActiveData();
  const isAuslanMode = accessibilityMode === 'auslan';
  const isEasyRead = accessibilityMode === 'easyRead';

  const handleContinue = () => {
    router.push('/support/step-3');
  };

  const handleBack = () => {
    router.push('/support/step-1');
  };

  return (
    <AnimatePage>
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 py-10">
        
        {/* Step Progress indicators */}
        <ProgressIndicator currentStep={2} totalSteps={3} />

        <div className="flex flex-col lg:flex-row gap-10 items-start justify-center max-w-[1100px] mx-auto w-full">
          
          {/* Sign language visual placeholder inside Auslan mode */}
          {isAuslanMode && (
            <InterpreterVideo stepKey="step2" questionText={activeData.step2.question} />
          )}

          <div className="flex-1 w-full">
            {/* Header titles */}
            <div className="text-center md:text-left mb-8">
              <h1 className={`font-extrabold text-brand-navy tracking-tight leading-tight ${
                isEasyRead ? 'text-3xl sm:text-4xl mb-4' : 'text-2xl sm:text-3xl mb-2'
              }`}>
                {activeData.step2.title}
              </h1>
              <p className={`font-medium text-brand-navy/60 ${isEasyRead ? 'text-lg' : 'text-sm'}`}>
                {activeData.step2.subtitle}
              </p>
            </div>

            {/* Selecting cards grid options */}
            <QuestionGrid>
              {activeData.step2.options.map((opt) => (
                <QuestionCard
                  key={opt.id}
                  id={opt.id}
                  title={opt.title}
                  description={opt.description}
                  imageSrc={opt.imageSrc}
                  imageAlt={opt.imageAlt}
                  isSelected={goal === opt.id}
                  onClick={() => setGoal(opt.id)}
                  selectionType="single"
                />
              ))}
            </QuestionGrid>

            {/* Back/Continue actions control bar */}
            <NavigationFlow
              currentStep={2}
              totalSteps={3}
              onBack={handleBack}
              onContinue={handleContinue}
              isContinueDisabled={!goal}
              continueLabel={activeData.results.continueBtn}
              backLabel={activeData.results.backBtn}
            />
          </div>

        </div>

      </div>
    </AnimatePage>
  );
}
