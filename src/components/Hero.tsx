"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Volume2, VolumeX, Eye, BookOpen, HelpCircle, X, Check } from 'lucide-react';
import { useAccessibility, AccessibilityMode } from '@/context/AccessibilityContext';
import AccessibilitySelector, { AccessOption } from './AccessibilitySelector';
import * as Dialog from '@radix-ui/react-dialog';

export default function Hero() {
  const { accessibilityMode, setAccessibilityMode } = useAccessibility();
  
  // Local mapped helper to match data keys
  const accessMode = accessibilityMode === 'auslan' ? 'auslan' : accessibilityMode === 'easyRead' ? 'easyread' : 'plain';
  
  const handleAccessModeChange = (mode: AccessOption) => {
    if (mode === 'auslan') setAccessibilityMode('auslan');
    if (mode === 'easyread') setAccessibilityMode('easyRead');
    if (mode === 'plain') setAccessibilityMode('plainLanguage');
  };

  const [captionsEnabled, setCaptionsEnabled] = useState(true);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  // Simulated video playback timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && isVideoOpen) {
      interval = setInterval(() => {
        setVideoProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0; // reset
          }
          return prev + 1.5;
        });
      }, 200);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isVideoOpen]);

  // Captions timeline mapping based on progress percent
  const getCaptionsText = (progress: number) => {
    if (progress < 2) return "";
    if (progress < 25) return "Hello and welcome to Deaf Connect Tasmania! [🤟 Auslan signing]";
    if (progress < 50) return "We support your mental health and link you with community activities.";
    if (progress < 75) return "Select 'My Preferences' above to customize your text size and styling.";
    if (progress < 98) return "We are here to help. Reach out to us through any of our channels.";
    return "";
  };

  // Dynamic text content based on selected preference card
  const content = {
    auslan: {
      headline: "How can we support you?",
      subheading: "Find accessible mental health and community support for Deaf people in Tasmania.",
    },
    easyread: {
      headline: "We are here to support you",
      subheading: "We help Deaf people in Tasmania. We help with your mental health. We help you connect with other people.",
    },
    plain: {
      headline: "Deaf Support Services Tasmania",
      subheading: "Access professional mental health counseling, individual consultation, urgent crisis support, and community groups.",
    }
  };

  return (
    <section className="mx-auto max-w-[1440px] px-6 sm:px-8 py-8 md:py-12" id="main-content">
      {/* Large rounded hero container */}
      <div className="relative overflow-hidden rounded-[24px] bg-brand-blue-light/50 border border-brand-blue-light/35 px-8 py-10 md:py-16 md:px-16">
        
        {/* Decorative background blur shapes */}
        <div className="absolute -top-24 -left-24 h-48 w-48 rounded-full bg-brand-teal/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-brand-coral/10 blur-3xl" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <AnimatePresence mode="wait">
                <motion.h1 
                  key={accessMode + "-headline"}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-brand-navy leading-[1.1]"
                >
                  {content[accessMode].headline}
                </motion.h1>
              </AnimatePresence>
              
              <AnimatePresence mode="wait">
                <motion.p 
                  key={accessMode + "-subheading"}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3, delay: 0.05 }}
                  className="text-lg sm:text-xl font-medium text-brand-navy/70 leading-relaxed max-w-[580px]"
                >
                  {content[accessMode].subheading}
                </motion.p>
              </AnimatePresence>
            </div>

            <AccessibilitySelector 
              selected={accessMode} 
              onChange={handleAccessModeChange} 
            />
          </div>

          {/* Right Column: Illustration + Buttons */}
          <div className="lg:col-span-5 flex flex-col items-center gap-6 justify-center">
            
            {/* y-axis floating illustration */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut"
              }}
              className="relative w-full max-w-[400px] aspect-[4/3] rounded-2xl bg-white/60 backdrop-blur-sm border border-white/80 p-6 shadow-sm flex items-center justify-center"
            >
              <Image
                src="/illustrations/hero_signing.png"
                alt="Illustration of four diverse Deaf people communicating happily using Auslan sign language"
                fill
                priority
                className="object-contain p-4"
              />
            </motion.div>

            {/* Media Controls Row */}
            <div className="flex flex-wrap items-center justify-center gap-3 w-full max-w-[400px]">
              
              {/* Play Auslan Welcome Dialog Trigger */}
              <Dialog.Root open={isVideoOpen} onOpenChange={(open) => {
                setIsVideoOpen(open);
                if (open) {
                  setIsPlaying(true);
                  setVideoProgress(0);
                } else {
                  setIsPlaying(false);
                }
              }}>
                <Dialog.Trigger asChild>
                  <button 
                    className="flex-1 flex items-center justify-center gap-2 rounded-full bg-brand-navy text-white hover:bg-brand-navy/90 px-6 py-3.5 text-[15px] font-bold shadow-md cursor-pointer transition-all hover:scale-[1.02] focus:outline-none active:scale-[0.98]"
                    aria-label="Play Auslan Welcome Video"
                  >
                    <Play className="h-5 w-5 fill-current" />
                    <span>Play Auslan Welcome</span>
                  </button>
                </Dialog.Trigger>

                <Dialog.Portal>
                  {/* Modal Backdrop */}
                  <Dialog.Overlay className="fixed inset-0 z-50 bg-brand-navy/60 backdrop-blur-sm animate-in fade-in" />
                  
                  {/* Modal Content */}
                  <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-[24px] border border-brand-navy/10 bg-white p-6 shadow-2xl animate-in zoom-in-95 duration-200 focus:outline-none">
                    
                    {/* Header */}
                    <div className="flex items-center justify-between pb-4 border-b border-brand-navy/10 mb-4">
                      <Dialog.Title className="text-xl font-bold text-brand-navy flex items-center gap-2">
                        <span>Auslan Welcome Video</span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-teal/10 text-brand-teal uppercase tracking-wider">Interpreter view</span>
                      </Dialog.Title>
                      
                      <Dialog.Close asChild>
                        <button 
                          className="rounded-full p-2 text-brand-navy/60 hover:text-brand-navy hover:bg-brand-blue-light/60 transition-colors cursor-pointer focus:outline-none"
                          aria-label="Close video player"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </Dialog.Close>
                    </div>

                    {/* Simulated Video Screen */}
                    <div className="relative aspect-video w-full rounded-2xl bg-slate-900 overflow-hidden flex flex-col justify-between border-2 border-brand-navy/5 shadow-inner">
                      
                      {/* Video graphic layout */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        {isPlaying ? (
                          <div className="flex flex-col items-center gap-4 text-center px-6">
                            {/* Animated signing graphics representation */}
                            <div className="flex gap-1.5 items-end h-8">
                              <span className="w-2.5 bg-brand-teal/80 rounded-full animate-bounce" style={{ animationDelay: '0.1s', height: '60%' }} />
                              <span className="w-2.5 bg-brand-coral/80 rounded-full animate-bounce" style={{ animationDelay: '0.3s', height: '90%' }} />
                              <span className="w-2.5 bg-brand-teal/80 rounded-full animate-bounce" style={{ animationDelay: '0.2s', height: '40%' }} />
                              <span className="w-2.5 bg-brand-coral/80 rounded-full animate-bounce" style={{ animationDelay: '0.5s', height: '75%' }} />
                            </div>
                            <span className="text-sm font-semibold tracking-wide text-white/70">Auslan Interpreter is signing...</span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-2">
                            <span className="text-sm font-semibold text-white/60">Video ended. Click replay to watch again.</span>
                          </div>
                        )}
                      </div>

                      {/* Top Overlay Controls (Interpreter info) */}
                      <div className="p-3 z-10 flex justify-between items-center bg-gradient-to-b from-black/60 to-transparent">
                        <span className="text-xs font-bold text-white tracking-wide">Deaf Connect Tasmania</span>
                      </div>

                      {/* Closed Captions Overlay (Synchronized with timeline) */}
                      {captionsEnabled && (
                        <div className="mx-6 mb-16 z-10 px-4 py-2 rounded-xl bg-black/75 border border-white/10 text-center">
                          <p className="text-[15px] sm:text-[17px] font-bold text-white leading-normal tracking-wide">
                            {getCaptionsText(videoProgress) || "..."}
                          </p>
                        </div>
                      )}

                      {/* Bottom Controls Bar */}
                      <div className="p-4 z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col gap-2.5">
                        
                        {/* Interactive timeline slider */}
                        <div className="relative w-full h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer" onClick={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const clickX = e.clientX - rect.left;
                          const percent = (clickX / rect.width) * 100;
                          setVideoProgress(percent);
                        }}>
                          <div 
                            className="h-full bg-brand-coral rounded-full transition-all duration-100" 
                            style={{ width: `${videoProgress}%` }}
                          />
                        </div>

                        {/* Control buttons */}
                        <div className="flex items-center justify-between text-white">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => setIsPlaying(!isPlaying)}
                              className="p-1.5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer focus:outline-none"
                              aria-label={isPlaying ? "Pause video" : "Play video"}
                            >
                              {isPlaying ? (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
                              ) : (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                              )}
                            </button>

                            <button
                              onClick={() => setIsMuted(!isMuted)}
                              className="p-1.5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer focus:outline-none"
                              aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                            >
                              {isMuted ? <VolumeX className="h-[18px] w-[18px]" /> : <Volume2 className="h-[18px] w-[18px]" />}
                            </button>

                            <span className="text-xs font-semibold tabular-nums text-white/80">
                              {Math.floor(videoProgress / 10)}s / 10s
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setCaptionsEnabled(!captionsEnabled)}
                              className={`px-2.5 py-1 text-xs font-extrabold rounded border transition-all cursor-pointer focus:outline-none ${
                                captionsEnabled 
                                  ? 'bg-brand-coral border-brand-coral text-white' 
                                  : 'border-white/30 text-white/70 hover:border-white hover:text-white'
                              }`}
                              aria-label={captionsEnabled ? "Disable Captions" : "Enable Captions"}
                            >
                              CC
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Dialog Description & Info */}
                    <div className="mt-4 bg-brand-blue-light/30 rounded-xl p-3.5 border border-brand-blue-light/50 flex gap-3">
                      <div className="h-2 w-2 rounded-full bg-brand-teal mt-1.5 shrink-0" />
                      <p className="text-xs font-semibold text-brand-navy/80 leading-relaxed">
                        This welcome video uses Tasmanian-localized Auslan signs, accompanied by clear captions and normal voiceovers. Click CC to toggle subtitles.
                      </p>
                    </div>

                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>

              {/* Toggle Captions button */}
              <button 
                onClick={() => setCaptionsEnabled(!captionsEnabled)}
                className={`flex-1 flex items-center justify-center gap-2 rounded-full border-[2px] px-6 py-3.5 text-[15px] font-bold cursor-pointer transition-all hover:scale-[1.02] focus:outline-none active:scale-[0.98] ${
                  captionsEnabled 
                    ? 'border-brand-teal bg-white text-brand-teal shadow-sm' 
                    : 'border-brand-navy/10 bg-white text-brand-navy/60 hover:border-brand-navy/30'
                }`}
                aria-label={captionsEnabled ? "Turn Captions Off" : "Turn Captions On"}
              >
                <span className={`text-[12px] font-extrabold px-1.5 py-0.5 rounded border transition-colors ${
                  captionsEnabled ? 'bg-brand-teal text-white border-brand-teal' : 'border-brand-navy/20'
                }`}>
                  CC
                </span>
                <span>{captionsEnabled ? 'Captions On' : 'Captions Off'}</span>
                {captionsEnabled && <Check className="h-4 w-4 text-brand-teal" />}
              </button>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
