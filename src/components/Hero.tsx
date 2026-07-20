"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Check } from 'lucide-react';
import { useAccessibility } from '@/context/AccessibilityContext';
import AccessibilitySelector, { AccessOption } from './AccessibilitySelector';

export default function Hero() {
  const { accessibilityMode, setAccessibilityMode } = useAccessibility();
  
  // Local mapped helper to match data keys
  const accessMode = accessibilityMode === 'auslan' ? 'auslan' : accessibilityMode === 'easyRead' ? 'easyread' : 'plain';
  
  const handleAccessModeChange = (mode: AccessOption) => {
    if (mode === 'auslan') setAccessibilityMode('auslan');
    if (mode === 'easyread') setAccessibilityMode('easyRead');
    if (mode === 'plain') setAccessibilityMode('plainLanguage');
  };

  // Video playback states
  const [isInlineVideoActive, setIsInlineVideoActive] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [captionsEnabled, setCaptionsEnabled] = useState(true);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);

  // Simulated video playback timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && isInlineVideoActive) {
      interval = setInterval(() => {
        setVideoProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            setIsInlineVideoActive(false); // Restore illustration
            setHasPlayedOnce(true);
            return 0; // reset
          }
          return prev + 1.5;
        });
      }, 200);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isInlineVideoActive]);

  // Captions timeline mapping based on progress percent
  const getCaptionsText = (progress: number) => {
    if (progress < 2) return "";
    if (progress < 25) return "Hello and welcome to Deaf Connect Tasmania! [🤟 Auslan signing]";
    if (progress < 50) return "We support your mental health and link you with community activities.";
    if (progress < 75) return "Select 'My Preferences' above to customize your text size and styling.";
    if (progress < 98) return "We are here to help. Reach out to us through any of our channels.";
    return "";
  };

  const handlePlayWelcomeClick = () => {
    if (isInlineVideoActive) {
      setIsPlaying(!isPlaying);
    } else {
      setIsInlineVideoActive(true);
      setIsPlaying(true);
      setVideoProgress(0);
    }
  };

  return (
    <section className="mx-auto max-w-[1440px] px-6 sm:px-8 py-12" id="main-content">
      {/* Large rounded hero container */}
      <div className="relative overflow-hidden rounded-[24px] bg-brand-blue-light/50 border border-brand-blue-light/35 px-8 py-12 md:py-16 md:px-16">
        
        {/* Decorative background blur shapes */}
        <div className="absolute -top-24 -left-24 h-48 w-48 rounded-full bg-brand-teal/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-brand-coral/10 blur-3xl" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-brand-navy leading-[1.1]">
                How can we support you?
              </h1>
              
              <p className="text-lg sm:text-xl font-medium text-brand-navy/70 leading-relaxed max-w-[580px]">
                Find accessible mental health and community support for Deaf people in Tasmania.
              </p>
            </div>

            <AccessibilitySelector 
              selected={accessMode} 
              onChange={handleAccessModeChange} 
            />
          </div>

          {/* Right Column: Illustration OR Inline Video Player */}
          <div className="lg:col-span-5 flex flex-col items-center gap-6 justify-center">
            
            {isInlineVideoActive ? (
              /* Inline video player container matching the illustration aspect-ratio */
              <div 
                className="relative w-full max-w-[400px] aspect-[4/3] rounded-[24px] bg-slate-950 border-2 border-brand-teal/30 overflow-hidden flex flex-col justify-between shadow-lg"
                role="region"
                aria-label="Auslan Welcome Video Player"
              >
                {/* Camera Focus Ticks [ ] */}
                <div className="absolute inset-4 border border-white/5 pointer-events-none rounded-lg" aria-hidden="true">
                  <div className="absolute top-0 left-0 h-4 w-4 border-t-2 border-l-2 border-white/20" />
                  <div className="absolute top-0 right-0 h-4 w-4 border-t-2 border-r-2 border-white/20" />
                  <div className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-white/20" />
                  <div className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-white/20" />
                </div>

                {/* Simulated webcam stream */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  {isPlaying ? (
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex gap-1.5 items-end h-8">
                        <span className="w-2 bg-brand-teal rounded-full animate-bounce" style={{ animationDelay: '0.1s', height: '60%' }} />
                        <span className="w-2 bg-brand-coral rounded-full animate-bounce" style={{ animationDelay: '0.3s', height: '95%' }} />
                        <span className="w-2 bg-brand-teal rounded-full animate-bounce" style={{ animationDelay: '0.2s', height: '40%' }} />
                        <span className="w-2 bg-brand-coral rounded-full animate-bounce" style={{ animationDelay: '0.5s', height: '70%' }} />
                      </div>
                      <span className="text-[10px] font-extrabold text-brand-teal uppercase tracking-widest animate-pulse">
                        Auslan Signer signing
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-1 text-white/50 text-xs font-semibold">
                      <span>Video Paused</span>
                    </div>
                  )}
                </div>

                {/* Top overlay panel */}
                <div className="p-3.5 z-10 flex justify-between items-center bg-gradient-to-b from-black/85 to-transparent text-white text-[9px] font-extrabold">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 absolute" />
                    <span className="text-emerald-400">● LIVE TRANSLATION</span>
                  </div>
                  <span className="text-white/60">TAS-A1 WELCOME</span>
                </div>

                {/* Caption overlay */}
                {captionsEnabled && (
                  <div className="mx-4 mb-16 z-10 px-3.5 py-2.5 rounded-xl bg-black/85 border border-white/5 text-center">
                    <p className="text-[13px] font-bold text-white leading-normal leading-snug">
                      {getCaptionsText(videoProgress) || "..."}
                    </p>
                  </div>
                )}

                {/* Bottom Timeline tracker progress bar */}
                <div className="w-full h-1 bg-white/20 relative mt-auto cursor-pointer" onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const percent = (clickX / rect.width) * 100;
                  setVideoProgress(percent);
                }}>
                  <div 
                    className="h-full bg-brand-coral transition-all duration-100" 
                    style={{ width: `${videoProgress}%` }}
                  />
                </div>

                {/* Inline controls matching designer systems */}
                <div className="p-3.5 z-10 bg-gradient-to-t from-black/90 to-transparent flex items-center justify-between text-white text-xs">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-1 hover:bg-white/10 rounded transition-colors focus:outline-none cursor-pointer"
                      aria-label={isPlaying ? "Pause video" : "Play video"}
                    >
                      {isPlaying ? (
                        <Pause className="h-4.5 w-4.5 fill-current" />
                      ) : (
                        <Play className="h-4.5 w-4.5 fill-current" />
                      )}
                    </button>
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-1 hover:bg-white/10 rounded transition-colors focus:outline-none cursor-pointer"
                      aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                    >
                      {isMuted ? <VolumeX className="h-4.5 w-4.5" /> : <Volume2 className="h-4.5 w-4.5" />}
                    </button>
                    <span className="text-[10px] font-semibold tabular-nums text-white/80">
                      {Math.floor(videoProgress / 10)}s / 10s
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-bold text-white/50 bg-white/10 px-1.5 py-0.5 rounded uppercase tracking-wider">
                      Captions Ready
                    </span>
                    <button
                      onClick={() => setCaptionsEnabled(!captionsEnabled)}
                      className={`px-2.5 py-0.5 text-[9px] font-extrabold rounded border transition-all cursor-pointer focus:outline-none ${
                        captionsEnabled ? 'bg-brand-teal border-brand-teal text-white' : 'border-white/30 text-white/70 hover:border-white hover:text-white'
                      }`}
                      aria-label={captionsEnabled ? "Disable captions" : "Enable captions"}
                    >
                      CC
                    </button>
                  </div>
                </div>

              </div>
            ) : (
              /* Floating transparent-background illustration */
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "easeInOut"
                }}
                className="relative w-full max-w-[400px] aspect-[4/3] flex items-center justify-center animate-in fade-in"
              >
                <Image
                  src="/illustrations/hero_signing.png"
                  alt="Illustration of four diverse Deaf people communicating happily using Auslan sign language"
                  fill
                  priority
                  className="object-contain"
                />
              </motion.div>
            )}

            {/* Media Controls Row */}
            <div className="flex flex-wrap items-center justify-center gap-3 w-full max-w-[400px]">
              
              {/* Play Auslan Welcome Inline Button CTA */}
              <button 
                onClick={handlePlayWelcomeClick}
                className="flex-1 h-12 flex items-center justify-center gap-2 rounded-full bg-brand-coral text-white hover:bg-brand-coral-hover px-6 text-[15px] font-bold shadow-md cursor-pointer transition-all hover:scale-[1.02] focus:outline-none active:scale-[0.98]"
                aria-label={isInlineVideoActive ? (isPlaying ? "Pause Welcome Video" : "Resume Welcome Video") : (hasPlayedOnce ? "Replay Welcome Video" : "Play Auslan Welcome")}
              >
                {isInlineVideoActive && isPlaying ? (
                  <>
                    <Pause className="h-5 w-5 fill-current" />
                    <span>Pause Welcome</span>
                  </>
                ) : (
                  <>
                    <Play className="h-5 w-5 fill-current" />
                    <span>{hasPlayedOnce ? "Replay Welcome Video" : "Play Auslan Welcome"}</span>
                  </>
                )}
              </button>

              {/* Toggle Captions button */}
              <button 
                onClick={() => setCaptionsEnabled(!captionsEnabled)}
                className={`flex-1 h-12 flex items-center justify-center gap-2 rounded-full border-[2px] px-6 text-[15px] font-bold cursor-pointer transition-all hover:scale-[1.02] focus:outline-none active:scale-[0.98] ${
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
