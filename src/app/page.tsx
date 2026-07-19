import React from 'react';
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServicesGrid from "@/components/ServiceCard";
import JourneySection from "@/components/JourneySection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* Navbar with accessibility settings dropdown */}
      <Navbar />
      
      {/* Main page content wrapper */}
      <main className="flex-1 w-full bg-white">
        {/* Hero Area */}
        <Hero />
        
        {/* Service Cards Grid Section */}
        <ServicesGrid />
        
        {/* Guided Support Journey & Wizard Navigator */}
        <JourneySection />
      </main>

      {/* Trustworthy, NDIS registered footer */}
      <Footer />
    </>
  );
}
