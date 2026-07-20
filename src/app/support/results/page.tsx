"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { AlertCircle, PhoneCall, CheckCircle2, Send, X } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';

import { useAccessibility } from '@/context/AccessibilityContext';
import { useSupportFlow } from '@/context/SupportFlowContext';
import { plainLanguageData } from '@/data/plainLanguage';
import { easyReadData } from '@/data/easyRead';
import { auslanData } from '@/data/auslan';

import RecommendationCard from "@/components/guided/RecommendationCard";
import AnimatePage from "@/components/guided/AnimatePage";
import EmergencyBanner from "@/components/ui/EmergencyBanner";

export default function ResultsPage() {
  const router = useRouter();
  const { accessibilityMode } = useAccessibility();
  const { situation, goal, commMethods, resetFlow } = useSupportFlow();

  // Booking Modal States
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [activeBookService, setActiveBookService] = useState<string>("");
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  // Form Inputs
  const [clientName, setClientName] = useState("");
  const [clientContact, setClientContact] = useState("");
  const [clientTime, setClientTime] = useState("");

  // Load correct translations dataset
  const getActiveData = () => {
    if (accessibilityMode === 'auslan') return auslanData;
    if (accessibilityMode === 'easyRead') return easyReadData;
    return plainLanguageData;
  };

  const activeData = getActiveData();
  const isEasyRead = accessibilityMode === 'easyRead';

  const handleRestart = () => {
    resetFlow();
    router.push('/support/step-1');
  };

  // Smart Sorting logic based on selections
  const getSortedRecommendations = () => {
    const defaultRecs = activeData.results.recommendations;
    
    // 1. If urgent is selected
    if (situation === 'urgent' || goal === 'urgent_support') {
      return [
        {
          id: "crisis-immediate",
          title: isEasyRead ? "Crisis Text Hotline" : "24/7 Crisis SMS Relay Support",
          description: isEasyRead 
            ? "Send text messages to get help right now from helpers." 
            : "Immediate, confidential text-based mental health support and crisis counseling.",
          imageSrc: "/illustrations/service_urgent.png",
          imageAlt: "Drawing of a phone screen showing emergency heart symbol",
          communication: ["chat", "interpreter"] as any[],
          delivery: "Online Text / NRS",
          location: "National Support",
          cost: "Free" as const,
          bestMatch: true,
          buttonText: isEasyRead ? "Text 0477 13 11 14" : "SMS 0477 13 11 14",
          detailsLink: "sms:0477131114"
        },
        ...defaultRecs.map(rec => ({ ...rec, bestMatch: false }))
      ];
    }

    // 2. Auslan signers matching rules
    if (commMethods.includes('auslan')) {
      return defaultRecs.map(rec => {
        if (rec.id === 'counselling') {
          return { ...rec, bestMatch: true }; // Counsellors are fluent Auslan signers
        }
        return { ...rec, bestMatch: false };
      });
    }

    // 3. Social connections mapping
    if (goal === 'community') {
      return defaultRecs.map(rec => {
        if (rec.id === 'groups') {
          return { ...rec, bestMatch: true }; // Peer social group is best match
        }
        return { ...rec, bestMatch: false };
      });
    }

    // Default ranking
    return defaultRecs;
  };

  const sortedRecs = getSortedRecommendations();

  // Booking Actions
  const handleOpenBooking = (serviceTitle: string) => {
    setActiveBookService(serviceTitle);
    setBookingSubmitted(false);
    setClientName("");
    setClientContact("");
    setClientTime("");
    setIsBookModalOpen(true);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSubmitted(true);
  };

  return (
    <AnimatePage>
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8 py-10 flex flex-col gap-8">
        
        {/* Results Title header */}
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end border-b border-primaryText/10 pb-6 gap-4 text-center sm:text-left">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-teal">Navigator Match Results</span>
            <h1 className={`font-extrabold text-primaryText tracking-tight leading-tight ${
              isEasyRead ? 'text-3xl sm:text-4xl' : 'text-3xl'
            }`}>
              {activeData.results.title}
            </h1>
            <p className={`font-medium text-primaryText/60 ${isEasyRead ? 'text-lg' : 'text-sm'}`}>
              {activeData.results.subtitle}
            </p>
          </div>

          <button
            onClick={handleRestart}
            className="rounded-full border-[2px] border-primaryText/10 bg-white hover:bg-brand-blue-light/35 px-6 py-2.5 text-xs font-bold text-primaryText cursor-pointer focus:outline-none transition-all"
          >
            Restart support flow
          </button>
        </div>

        {/* Recommendations Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedRecs.map((rec) => (
            <RecommendationCard
              key={rec.id}
              title={rec.title}
              description={rec.description}
              imageSrc={rec.imageSrc}
              imageAlt={rec.imageAlt}
              communication={rec.communication}
              delivery={rec.delivery}
              location={rec.location}
              cost={rec.cost}
              bestMatch={rec.bestMatch}
              buttonText={activeData.results.bookBtn}
              detailsLink={rec.detailsLink}
              onBookClick={() => handleOpenBooking(rec.title)}
            />
          ))}
        </div>

        {/* Urgent Crisis Emergency Banner */}
        <EmergencyBanner className="mt-8" />

      </div>

      {/* ACCESSIBLE BOOKING/CONTACT DIALOG MODAL */}
      <Dialog.Root open={isBookModalOpen} onOpenChange={setIsBookModalOpen}>
        <Dialog.Portal>
          {/* Modal Overlay */}
          <Dialog.Overlay className="fixed inset-0 z-50 bg-brand-navy/60 backdrop-blur-sm animate-in fade-in" />
          
          {/* Modal Content container */}
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-[24px] border border-primaryText/10 bg-white p-6 md:p-8 shadow-2xl animate-in zoom-in-95 duration-200 focus:outline-none text-primaryText">
            
            {/* Header Close */}
            <Dialog.Close asChild>
              <button 
                className="absolute top-4 right-4 rounded-full p-2 text-primaryText/60 hover:text-primaryText hover:bg-brand-blue-light/60 transition-colors cursor-pointer focus:outline-none"
                aria-label="Close booking form"
              >
                <X className="h-5 w-5" />
              </button>
            </Dialog.Close>

            <div className="mb-6">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-teal">Service Booking</span>
              <Dialog.Title className="text-xl font-bold text-primaryText mt-1">
                Contact: {activeBookService}
              </Dialog.Title>
            </div>

            {/* Check if submitted */}
            {bookingSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center gap-4 py-6"
              >
                <div className="h-16 w-16 rounded-full bg-brand-teal/15 text-brand-teal flex items-center justify-center" aria-hidden="true">
                  <CheckCircle2 className="h-10 w-10 stroke-[2.5]" />
                </div>
                <h4 className="font-extrabold text-lg">Thank you! Request Sent.</h4>
                <p className="text-xs font-semibold text-primaryText/70 leading-relaxed max-w-[340px]">
                  {commMethods.includes('auslan') 
                    ? "We will contact you via an Auslan Video call (FaceTime / Zoom) at your preferred time."
                    : "We will contact you using your preferred written method (SMS or Email) shortly."}
                </p>
                
                <button
                  onClick={() => setIsBookModalOpen(false)}
                  className="mt-4 rounded-full bg-brand-primary text-white hover:opacity-90 px-6 py-2.5 text-xs font-bold shadow-sm focus:outline-none cursor-pointer"
                >
                  Close Window
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="flex flex-col gap-4">
                
                {/* Form fields */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="results-name-input" className="text-xs font-extrabold uppercase tracking-wider text-primaryText/60">
                    Your Name
                  </label>
                  <input
                    id="results-name-input"
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Robin"
                    className="w-full rounded-xl border border-primaryText/15 px-4 py-3 text-sm focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="results-contact-input" className="text-xs font-extrabold uppercase tracking-wider text-primaryText/60">
                    {commMethods.includes('auslan') ? "Video Call Number / FaceTime ID / Zoom Link" : "Mobile Phone (for SMS) or Email Address"}
                  </label>
                  <input
                    id="results-contact-input"
                    type="text"
                    required
                    value={clientContact}
                    onChange={(e) => setClientContact(e.target.value)}
                    placeholder={commMethods.includes('auslan') ? "e.g. FaceTime id or link" : "e.g. 0400 000 000 or email"}
                    className="w-full rounded-xl border border-primaryText/15 px-4 py-3 text-sm focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="results-time-input" className="text-xs font-extrabold uppercase tracking-wider text-primaryText/60">
                    Preferred contact time
                  </label>
                  <input
                    id="results-time-input"
                    type="text"
                    required
                    value={clientTime}
                    onChange={(e) => setClientTime(e.target.value)}
                    placeholder="e.g. Tomorrow morning around 10am"
                    className="w-full rounded-xl border border-primaryText/15 px-4 py-3 text-sm focus:outline-none focus:border-brand-primary"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full mt-4 flex items-center justify-center gap-2 rounded-full bg-brand-primary text-white hover:opacity-90 py-3.5 text-sm font-bold shadow-md cursor-pointer transition-all hover:scale-[1.02] focus:outline-none active:scale-[0.98]"
                >
                  <Send className="h-4 w-4" />
                  <span>Send Request</span>
                </button>

              </form>
            )}

          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

    </AnimatePage>
  );
}
