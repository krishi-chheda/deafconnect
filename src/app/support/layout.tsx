import React from 'react';
import { SupportFlowProvider } from "@/context/SupportFlowContext";

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SupportFlowProvider>
      {children}
    </SupportFlowProvider>
  );
}
