import React from 'react';
import { ArrowUpRight, FileText, MessageCircle, Sparkles } from 'lucide-react';

export default function HeroContent({ onOpenModal }) {
  return (
    <div className="fixed bottom-8 md:bottom-12 left-6 md:left-14 z-30 max-w-xl pointer-events-none select-none">
      <div className="pointer-events-auto flex flex-col items-start space-y-4 md:space-y-6">
        
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/25 backdrop-blur-md border border-white/15 text-xs text-white/90 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          <span className="font-medium tracking-wide">Available for Select Projects</span>
        </div>

        {/* Greeting & Name */}
        <div className="space-y-1">
          <p className="text-xl md:text-2xl font-light tracking-wide text-white/80">
            Hi, I'm
          </p>
          <h1 className="font-cursive-signature text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white tracking-normal drop-shadow-[0_8px_30px_rgba(0,0,0,0.4)] leading-tight pb-1">
            Shannu
          </h1>
        </div>

        {/* Short Bio */}
        <p className="text-sm md:text-base text-white/85 max-w-md font-normal leading-relaxed drop-shadow-md">
          Full Stack Developer & Creative Technologist crafting intuitive digital experiences, 
          interactive systems, and scalable, resilient web applications.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-wrap items-center gap-3.5 pt-2">
          {/* Resume Button */}
          <button
            onClick={() => onOpenModal('resume')}
            className="group px-6 py-3 rounded-full glass-panel hover:bg-white/20 text-white font-medium text-xs md:text-sm tracking-wider uppercase flex items-center gap-2.5 transition-all duration-300 border border-white/25 hover:border-white/50 hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl"
          >
            <FileText className="w-4 h-4 text-orange-200 group-hover:rotate-6 transition-transform" />
            <span>Resume</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </button>

          {/* Let's Talk Button */}
          <button
            onClick={() => onOpenModal('contact')}
            className="group relative px-7 py-3 rounded-full bg-white text-[#9a1611] font-semibold text-xs md:text-sm tracking-wider uppercase flex items-center gap-2.5 transition-all duration-300 shadow-[0_10px_35px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_45px_rgba(255,255,255,0.4)] hover:scale-105 active:scale-95 hover:bg-neutral-100"
          >
            <MessageCircle className="w-4 h-4 text-[#9a1611] group-hover:scale-110 transition-transform" />
            <span>Let's Talk</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
          </button>
        </div>

        {/* Tech Stack pills hint */}
        <div className="hidden sm:flex items-center gap-2 pt-1 text-[11px] text-white/50 tracking-wider">
          <span className="hover:text-white/80 transition-colors">REACT</span>
          <span>•</span>
          <span className="hover:text-white/80 transition-colors">NODE.JS</span>
          <span>•</span>
          <span className="hover:text-white/80 transition-colors">TYPESCRIPT</span>
          <span>•</span>
          <span className="hover:text-white/80 transition-colors">THREE / CANVAS</span>
          <span>•</span>
          <span className="hover:text-white/80 transition-colors">PYTHON</span>
        </div>

      </div>
    </div>
  );
}
