"use client";

import React, { useState, useEffect } from 'react';
import { Play, Pause, VolumeX, Volume2, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

interface InterpreterVideoProps {
  stepKey: string;
  questionText: string;
}

export default function InterpreterVideo({ stepKey, questionText }: InterpreterVideoProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  // Synchronized caption mapping for the interpreter video based on stepKey
  const getCaptionsText = (key: string) => {
    switch (key) {
      case 'step1':
        return "[🤟 Auslan] Let's find support that works for you. What has been happening for you lately?";
      case 'step2':
        return "[🤟 Auslan] What kind of support are you looking for? Talk to a specialist, find counselling, or join groups?";
      case 'step3':
        return "[🤟 Auslan] How would you prefer to communicate with the service? Directly in Auslan or with interpreters?";
      default:
        return "[🤟 Auslan] Support recommendations are loaded below.";
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) return 0;
          return p + 2;
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="w-full max-w-[340px] mx-auto lg:mx-0 shrink-0 flex flex-col gap-3">
      {/* Video Container Frame */}
      <div className="relative aspect-square w-full rounded-[24px] border-2 border-brand-teal/30 bg-slate-900 overflow-hidden shadow-md flex flex-col justify-between">
        
        {/* Animated interpreter visualizer representation */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {isPlaying ? (
            <div className="flex flex-col items-center gap-3.5 text-center px-4">
              <div className="flex gap-2 items-end h-10">
                <span className="w-3 bg-brand-teal rounded-full animate-bounce" style={{ animationDelay: '0.1s', height: '60%' }} />
                <span className="w-3 bg-brand-coral rounded-full animate-bounce" style={{ animationDelay: '0.3s', height: '100%' }} />
                <span className="w-3 bg-brand-teal rounded-full animate-bounce" style={{ animationDelay: '0.2s', height: '40%' }} />
                <span className="w-3 bg-brand-coral rounded-full animate-bounce" style={{ animationDelay: '0.4s', height: '80%' }} />
              </div>
              <span className="text-xs font-extrabold text-brand-teal uppercase tracking-widest animate-pulse">
                Auslan Interpreter Signing
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs font-semibold text-white/50">Interpreter Paused</span>
            </div>
          )}
        </div>

        {/* Header Indicator */}
        <div className="p-3 z-10 flex justify-between items-center bg-gradient-to-b from-black/70 to-transparent text-white">
          <span className="text-[10px] font-extrabold tracking-wider uppercase text-brand-teal">Live Sign Interpreter</span>
          <span className="text-[10px] font-bold text-white/70">TAS-A1</span>
        </div>

        {/* Video progress indicator bar */}
        <div className="w-full h-1 bg-white/15 relative mt-auto">
          <div 
            className="h-full bg-brand-teal transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Controls Overlay bar */}
        <div className="p-3.5 z-10 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-between text-white">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1 hover:bg-white/10 rounded transition-colors focus:outline-none cursor-pointer"
              aria-label={isPlaying ? "Pause Auslan translation" : "Play Auslan translation"}
            >
              {isPlaying ? <Pause className="h-4.5 w-4.5" /> : <Play className="h-4.5 w-4.5 fill-current" />}
            </button>
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-1 hover:bg-white/10 rounded transition-colors focus:outline-none cursor-pointer"
              aria-label={isMuted ? "Unmute audio track" : "Mute audio track"}
            >
              {isMuted ? <VolumeX className="h-4.5 w-4.5" /> : <Volume2 className="h-4.5 w-4.5" />}
            </button>
          </div>
          <span className="text-[10px] font-extrabold text-white/60 uppercase tracking-widest bg-white/10 px-2 py-0.5 rounded">
            Auslan Active
          </span>
        </div>

      </div>

      {/* Closed Captions Overlay below the video screen */}
      <div className="bg-brand-blue-light/40 border border-brand-teal/20 rounded-xl p-3.5 shadow-sm text-center">
        <p className="text-xs font-bold leading-normal text-brand-navy tracking-wide">
          {getCaptionsText(stepKey)}
        </p>
      </div>
    </div>
  );
}
