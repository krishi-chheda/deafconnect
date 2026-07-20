import React from 'react';
import Hero from "@/components/Hero";
import ServicesGrid from "@/components/ServiceCard";
import JourneySection from "@/components/JourneySection";

export default function Home() {
  return (
    <>
      {/* Hero Area */}
      <Hero />
      
      {/* Guided Support Journey & Wizard Navigator (How it works) */}
      <JourneySection />
      
      {/* Service Cards Grid Section (Support tailored for your lifestyle) */}
      <ServicesGrid />
    </>
  );
}
