"use client";

import React, { createContext, useContext } from 'react';
import { useSupportStore } from '@/store/support-store';

interface SupportFlowContextType {
  situation: string | null;
  setSituation: (val: string | null) => void;
  goal: string | null;
  setGoal: (val: string | null) => void;
  commMethods: string[];
  setCommMethods: (val: string[]) => void;
  resetFlow: () => void;
}

const SupportFlowContext = createContext<SupportFlowContextType | undefined>(undefined);

export const SupportFlowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    situation,
    setSituation,
    goal,
    setGoal,
    commMethods,
    setCommMethods,
    resetFlow
  } = useSupportStore();

  return (
    <SupportFlowContext.Provider
      value={{
        situation,
        setSituation,
        goal,
        setGoal,
        commMethods,
        setCommMethods,
        resetFlow
      }}
    >
      {children}
    </SupportFlowContext.Provider>
  );
};

export const useSupportFlow = () => {
  const context = useContext(SupportFlowContext);
  if (context === undefined) {
    throw new Error('useSupportFlow must be used within a SupportFlowProvider');
  }
  return context;
};
