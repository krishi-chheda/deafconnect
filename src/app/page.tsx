import React from 'react';
import Hero from "@/components/Hero";
import ServicesGrid from "@/components/ServiceCard";
import JourneySection from "@/components/JourneySection";

export default function Home() {
  return (
    <>
      {/* Hero Area */}
      <Hero />
      
      {/* Service Cards Grid Section */}
      <ServicesGrid />
      
      {/* Guided Support Journey & Wizard Navigator */}
      <JourneySection />
    </>
  );
}
