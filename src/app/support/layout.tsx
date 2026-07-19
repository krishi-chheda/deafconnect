import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SupportFlowProvider } from "@/context/SupportFlowContext";

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SupportFlowProvider>
      <Navbar />
      <main className="flex-1 w-full bg-white">
        {children}
      </main>
      <Footer />
    </SupportFlowProvider>
  );
}
