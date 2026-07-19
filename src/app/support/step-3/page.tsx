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

export default function Step3Page() {
  const router = useRouter();
  const { accessibilityMode } = useAccessibility();
  const { commMethods, setCommMethods } = useSupportFlow();

  // Load correct translations dataset
  const getActiveData = () => {
    if (accessibilityMode === 'auslan') return auslanData;
    if (accessibilityMode === 'easyRead') return easyReadData;
    return plainLanguageData;
  };

  const activeData = getActiveData();
  const isAuslanMode = accessibilityMode === 'auslan';
  const isEasyRead = accessibilityMode === 'easyRead';

  // Toggle selection with exclusion rules for "No preference"
  const handleCommToggle = (optionId: string) => {
    if (optionId === 'no_preference') {
      setCommMethods(['no_preference']);
    } else {
      const filtered = commMethods.filter(id => id !== 'no_preference');
      if (filtered.includes(optionId)) {
        setCommMethods(filtered.filter(id => id !== optionId));
      } else {
        setCommMethods([...filtered, optionId]);
      }
    }
  };

  const handleContinue = () => {
    router.push('/support/results');
  };

  const handleBack = () => {
    router.push('/support/step-2');
  };

  return (
    <AnimatePage>
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 py-10">
        
        {/* Step Progress indicators */}
        <ProgressIndicator currentStep={3} totalSteps={3} />

        <div className="flex flex-col lg:flex-row gap-10 items-start justify-center max-w-[1100px] mx-auto w-full">
          
          {/* Sign language visual placeholder inside Auslan mode */}
          {isAuslanMode && (
            <InterpreterVideo stepKey="step3" questionText={activeData.step3.question} />
          )}

          <div className="flex-1 w-full">
            {/* Header titles */}
            <div className="text-center md:text-left mb-8">
              <h1 className={`font-extrabold text-brand-navy tracking-tight leading-tight ${
                isEasyRead ? 'text-3xl sm:text-4xl mb-4' : 'text-2xl sm:text-3xl mb-2'
              }`}>
                {activeData.step3.title}
              </h1>
              <p className={`font-medium text-brand-navy/60 ${isEasyRead ? 'text-lg' : 'text-sm'}`}>
                {activeData.step3.subtitle}
              </p>
            </div>

            {/* Selecting cards grid options */}
            <QuestionGrid>
              {activeData.step3.options.map((opt) => (
                <QuestionCard
                  key={opt.id}
                  id={opt.id}
                  title={opt.title}
                  description={opt.description}
                  imageSrc={opt.imageSrc}
                  imageAlt={opt.imageAlt}
                  isSelected={commMethods.includes(opt.id)}
                  onClick={() => handleCommToggle(opt.id)}
                  selectionType="multiple"
                />
              ))}
            </QuestionGrid>

            {/* Back/Continue actions control bar */}
            <NavigationFlow
              currentStep={3}
              totalSteps={3}
              onBack={handleBack}
              onContinue={handleContinue}
              isContinueDisabled={commMethods.length === 0}
              continueLabel={activeData.results.submitBtn}
              backLabel={activeData.results.backBtn}
            />
          </div>

        </div>

      </div>
    </AnimatePage>
  );
}
