"use client";

import React from 'react';
import { Award, Lock, BookOpen, PenTool, BarChart3, Database } from 'lucide-react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAccessibility } from "@/context/AccessibilityContext";
import AnimatePage from "@/components/guided/AnimatePage";

export default function ToolkitPage() {
  const { accessibilityMode } = useAccessibility();
  const isEasyRead = accessibilityMode === 'easyRead';

  const tools = [
    {
      id: "learn",
      title: isEasyRead ? "Learn Auslan Basics" : "Auslan Learning Academy",
      desc: isEasyRead 
        ? "Learn simple sign words and test yourself with short games." 
        : "Interactive flashcards, visual NDIS guides, and vocabulary games to improve communication skills.",
      icon: <BookOpen className="h-6 w-6" />,
      progress: "0/10 Lessons"
    },
    {
      id: "journal",
      title: isEasyRead ? "Mood Tracker Journal" : "Daily Wellness Journal",
      desc: isEasyRead 
        ? "Write about your daily feelings and look at your mood charts." 
        : "A visual mood tracker and emotional logs helper allowing users to record wellness targets.",
      icon: <PenTool className="h-6 w-6" />,
      progress: "0 Days Logged"
    },
    {
      id: "discover",
      title: isEasyRead ? "Read Stories" : "Discover Wellness Insights",
      desc: isEasyRead 
        ? "Read booklets and healthy advice for Deaf Tasmanians." 
        : "Curation of Deaf wellness articles, research newsletters, and community stories.",
      icon: <BarChart3 className="h-6 w-6" />,
      progress: "0 Articles Read"
    },
    {
      id: "research",
      title: isEasyRead ? "Health Research" : "Mental Health Database",
      desc: isEasyRead 
        ? "Check out research articles from Monash University." 
        : "Contribute anonymous data to joint research programs supporting deaf clinical counseling.",
      icon: <Database className="h-6 w-6" />,
      progress: "0 Surveys Completed"
    }
  ];

  return (
    <>
      <Navbar />
      
      <main className="flex-1 w-full bg-white" id="main-content">
        <AnimatePage>
          <div className="mx-auto max-w-[1440px] px-6 sm:px-8 py-12 md:py-16">
            
            {/* Header titles */}
            <div className="text-center md:text-left mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-brand-navy/10 pb-8">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-extrabold uppercase tracking-widest text-brand-teal">Wellness Dashboard</span>
                <h1 className="text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl mt-1">
                  My Toolkit
                </h1>
                <p className="text-sm font-semibold text-brand-navy/60 max-w-[600px] leading-relaxed">
                  Interactive self-management resources, visual exercises, and study tools to monitor your mental health progress.
                </p>
              </div>

              {/* Progress visualizer */}
              <div className="rounded-2xl border border-brand-navy/10 bg-brand-blue-light/20 p-4 shrink-0 flex items-center gap-3 self-center md:self-auto">
                <div className="relative h-12 w-12 flex items-center justify-center">
                  <svg width="48" height="48" viewBox="0 0 48 48" className="rotate-[-90deg]">
                    <circle cx="24" cy="24" r="20" stroke="#EAF6FC" strokeWidth="4" fill="transparent" />
                    <circle cx="24" cy="24" r="20" stroke="#4FB6C2" strokeWidth="4" fill="transparent" strokeDasharray="125.6" strokeDashoffset="125.6" />
                  </svg>
                  <span className="absolute text-[10px] font-extrabold">0%</span>
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-[10px] font-extrabold text-brand-navy/40 uppercase">Overall Progress</span>
                  <span className="text-sm font-extrabold text-brand-navy">0/4 Modules Locked</span>
                </div>
              </div>
            </div>

            {/* Grid of locked gamified cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {tools.map((tool) => (
                <div 
                  key={tool.id}
                  className="group relative rounded-[24px] border border-brand-navy/10 bg-white p-6 sm:p-8 shadow-sm flex flex-col justify-between hover:border-brand-teal/20 transition-all duration-300 overflow-hidden"
                >
                  {/* Lock overlay banner */}
                  <div className="absolute inset-0 bg-brand-navy/[0.01] backdrop-blur-[0.5px] pointer-events-none" />
                  
                  <div className="flex flex-col gap-5 relative z-10">
                    
                    {/* Header icon row */}
                    <div className="flex items-center justify-between">
                      <div className="h-12 w-12 rounded-xl bg-brand-blue-light text-brand-primary flex items-center justify-center border border-brand-blue-light/50">
                        {tool.icon}
                      </div>
                      
                      <span className="flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-brand-navy/40 bg-brand-blue-light/50 px-2.5 py-1 rounded-md">
                        <Lock className="h-3 w-3" />
                        <span>Coming Soon</span>
                      </span>
                    </div>

                    <h2 className="text-xl font-extrabold text-brand-navy tracking-tight mt-1">
                      {tool.title}
                    </h2>
                    
                    <p className="text-xs font-medium text-brand-navy/70 leading-relaxed">
                      {tool.desc}
                    </p>

                  </div>

                  {/* Locked status text */}
                  <div className="mt-8 pt-4 border-t border-brand-navy/5 flex justify-between items-center text-[10px] font-extrabold uppercase tracking-widest text-brand-navy/40 relative z-10">
                    <span>Current Status</span>
                    <span>{tool.progress}</span>
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
