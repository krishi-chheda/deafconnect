"use client";

import React from 'react';
import { Calendar, MapPin, Clock, Languages, Award } from 'lucide-react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAccessibility } from "@/context/AccessibilityContext";
import AnimatePage from "@/components/guided/AnimatePage";

export default function CommunityPage() {
  const { accessibilityMode } = useAccessibility();
  const isEasyRead = accessibilityMode === 'easyRead';

  const events = [
    {
      title: isEasyRead ? "Deaf Coffee Morning" : "Tasmanian Deaf Coffee Morning",
      desc: isEasyRead 
        ? "Meet other Deaf people, drink coffee, and chat." 
        : "A weekly catch-up for Deaf, hard-of-hearing signers, and learners to socialise and sign.",
      date: "Every Saturday",
      time: "10:00 AM - 12:00 PM",
      location: "Hobart City Centre",
      interpreter: true,
      tag: "Social Meetup"
    },
    {
      title: isEasyRead ? "Auslan Sign Language Course" : "Introductory Auslan Course",
      desc: isEasyRead 
        ? "Learn how to sign with your Deaf friends and family." 
        : "A 4-week introductory course in Auslan sign language, vocabulary, and Deaf culture syntax.",
      date: "Starts August 5, 2026",
      time: "6:00 PM - 7:30 PM",
      location: "Launceston Community Centre",
      interpreter: true,
      tag: "Workshop"
    },
    {
      title: isEasyRead ? "NDIS Plan Help Seminar" : "Deaf-Aware NDIS Planning Forum",
      desc: isEasyRead 
        ? "Get help with your NDIS plan and funding." 
        : "Get guidance on self-managing your mental health support packages and funding guides.",
      date: "August 18, 2026",
      time: "2:00 PM - 4:00 PM",
      location: "Online (Telehealth)",
      interpreter: true,
      tag: "Information Session"
    },
    {
      title: isEasyRead ? "Yoga and Wellbeing Circle" : "Visual Yoga & Mindfulness Session",
      desc: isEasyRead 
        ? "Do stretching exercises and feel relaxed with other people." 
        : "Gentle visual-first yoga and breathing class led by a certified Deaf-aware trainer.",
      date: "August 24, 2026",
      time: "11:00 AM - 12:00 PM",
      location: "Burnie Health Hub",
      interpreter: false,
      tag: "Wellbeing Class"
    }
  ];

  return (
    <>
      <Navbar />
      
      <main className="flex-1 w-full bg-white animate-in" id="main-content">
        <AnimatePage>
          <div className="mx-auto max-w-[1440px] px-6 sm:px-8 py-12 md:py-16">
            
            {/* Header titles */}
            <div className="text-center md:text-left mb-10">
              <span className="text-xs font-extrabold uppercase tracking-widest text-brand-teal">Tasmanian Connection Hub</span>
              <h1 className="text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl mt-1">
                Deaf Community Events
              </h1>
              <p className="text-sm font-semibold text-brand-navy/60 max-w-[600px] leading-relaxed mt-2">
                Join our Tasmanian social meetups, NDIS workshops, sign language classes, and wellness events.
              </p>
            </div>

            {/* Events Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {events.map((ev, index) => (
                <div 
                  key={index}
                  className="rounded-[24px] border border-brand-navy/10 bg-white p-6 sm:p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300"
                >
                  <div className="flex flex-col gap-4">
                    
                    {/* Badge header */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-teal bg-brand-teal/10 px-2.5 py-1 rounded-md">
                        {ev.tag}
                      </span>
                      {ev.interpreter && (
                        <span className="flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-brand-coral bg-brand-coral/10 px-2.5 py-1 rounded-md">
                          🤟 Auslan Signed
                        </span>
                      )}
                    </div>

                    <h2 className="text-xl font-extrabold text-brand-navy tracking-tight mt-2">
                      {ev.title}
                    </h2>
                    <p className="text-xs font-medium text-brand-navy/70 leading-relaxed">
                      {ev.desc}
                    </p>

                  </div>

                  {/* Metadata fields */}
                  <div className="mt-8 pt-4 border-t border-brand-navy/5 grid grid-cols-3 gap-2 text-[11px] font-bold text-brand-navy/70">
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] font-extrabold text-brand-navy/40 uppercase tracking-wide">Date</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-brand-teal" />
                        <span>{ev.date}</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] font-extrabold text-brand-navy/40 uppercase tracking-wide">Time</span>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-brand-teal" />
                        <span>{ev.time}</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] font-extrabold text-brand-navy/40 uppercase tracking-wide">Location</span>
                      <div className="flex items-center gap-1 truncate">
                        <MapPin className="h-3.5 w-3.5 text-brand-teal" />
                        <span className="truncate">{ev.location}</span>
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>

          </div>
        </AnimatePage>
      </main>

      <Footer />
    </>
  );
}
