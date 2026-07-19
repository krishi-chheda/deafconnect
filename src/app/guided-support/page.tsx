"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function GuidedSupportRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/support/step-1');
  }, [router]);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-white text-brand-navy">
      <div className="flex flex-col items-center gap-2">
        <span className="text-sm font-semibold animate-pulse">Loading Support Wizard...</span>
      </div>
    </div>
  );
}
