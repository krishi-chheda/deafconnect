"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useAccessibility } from '@/context/AccessibilityContext';

interface AnimatePageProps {
  children: React.ReactNode;
}

export default function AnimatePage({ children }: AnimatePageProps) {
  const { motionPreference } = useAccessibility();
  const isReduced = motionPreference === 'reduced';

  return (
    <motion.div
      initial={isReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={isReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: -15 }}
      transition={isReduced ? { duration: 0 } : { duration: 0.35, ease: "easeOut" }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}
