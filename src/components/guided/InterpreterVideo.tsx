"use client";

import React, { useState, useEffect } from 'react';
import { Play, Pause, VolumeX, Volume2, Video } from 'lucide-react';
import { motion } from 'framer-motion';

interface InterpreterVideoProps {
  stepKey: string;
  questionText: string;
}

export default function InterpreterVideo({ stepKey, questionText }: InterpreterVideoProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  // Dynamic captions based on stepKey
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
      
      {/* Video Webcam Frame Container */}
      <div className="relative aspect-square w-full rounded-[24px] border-2 border-brand-teal/30 bg-slate-900 overflow-hidden shadow-md flex flex-col justify-between">
        
        {/* Camera Corner Focus Frame Overlays [ ] */}
        <div className="absolute inset-4 border border-white/5 pointer-events-none rounded-lg" aria-hidden="true">
          <div className="absolute top-0 left-0 h-4 w-4 border-t-2 border-l-2 border-white/30" />
          <div className="absolute top-0 right-0 h-4 w-4 border-t-2 border-r-2 border-white/30" />
          <div className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-white/30" />
          <div className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-white/30" />
        </div>

        {/* Live-style central screen */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          {isPlaying ? (
            <div className="flex flex-col items-center gap-2">
              <Video className="h-10 w-10 text-brand-teal/50 animate-pulse" />
              <span className="text-[10px] font-extrabold text-white/55 uppercase tracking-widest">
                Camera Feed Active
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1">
              <span className="text-xs font-bold text-white/50">Video Paused</span>
            </div>
          )}
        </div>

        {/* Header Overlay Controls (LIVE Status badge) */}
        <div className="p-3.5 z-10 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent text-white">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 absolute" />
            <span className="text-[10px] font-extrabold tracking-widest uppercase text-emerald-400">
              ● LIVE RELAY
            </span>
          </div>
          <span className="text-[10px] font-extrabold text-white/60 tracking-wider">TAS-A1 REGISTRY</span>
        </div>

        {/* Dynamic Running Waveform Visualizer (subtle, thinner, less distracting) */}
        {isPlaying && (
          <div className="absolute bottom-16 left-4 right-4 z-10 flex items-end justify-center gap-1 h-7 bg-black/25 border border-white/5 rounded-lg p-2.5 backdrop-blur-[1px]">
            {Array.from({ length: 22 }).map((_, index) => {
              const delay = (index % 5) * 0.12;
              return (
                <motion.div
                  key={index}
                  animate={{ height: ["15%", "55%", "15%"] }}
                  transition={{
                    duration: 0.9,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: delay,
                    ease: "easeInOut"
                  }}
                  className="w-[2px] rounded-full bg-brand-teal/45"
                  style={{ height: '25%' }}
                />
              );
            })}
          </div>
        )}

        {/* Bottom controls overlay */}
        <div className="p-3.5 z-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-center justify-between text-white mt-auto">
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

          <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-teal">
            Auslan Interpreter
          </span>
        </div>

      </div>

      {/* Captions Text Panel */}
      <div className="rounded-[20px] bg-brand-blue-light/35 border border-brand-teal/20 p-4 shadow-sm">
        <p className="text-xs font-semibold text-brand-navy/80 leading-relaxed">
          {getCaptionsText(stepKey)}
        </p>
      </div>

    </div>
  );
}
