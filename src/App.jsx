import React, { useState } from 'react';
import CharacterCanvas from './components/CharacterCanvas.jsx';
import Navbar from './components/Navbar.jsx';
import HeroContent from './components/HeroContent.jsx';
import CustomCursor from './components/CustomCursor.jsx';
import Modals from './components/Modals.jsx';
import { Compass, Eye } from 'lucide-react';

export default function App() {
  const [activeModal, setActiveModal] = useState(null);
  const [canvasReady, setCanvasReady] = useState(false);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#9a1611] hero-gradient-bg text-white select-none">
      
      {/* Background Ambience & Fine Film Grain */}
      <div className="absolute inset-0 pointer-events-none grain-overlay z-[1]" />
      
      {/* Subtle Warm Radial Spotlight */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_35%,rgba(255,100,50,0.12),transparent_70%)] z-[1]" />

      {/* Interactive 360 Head-Tracking Canvas */}
      <CharacterCanvas onLoaded={() => setCanvasReady(true)} />

      {/* Floating Glass Navigation */}
      <Navbar 
        activeModal={activeModal} 
        onOpenModal={(modal) => setActiveModal(modal)} 
      />

      {/* Bottom-Left Hero Presentation */}
      <HeroContent 
        onOpenModal={(modal) => setActiveModal(modal)} 
      />

      {/* Bottom-Right Interactive Hint */}
      <aside className="fixed bottom-6 right-6 md:right-12 z-30 hidden sm:flex items-center gap-3 px-4 py-2 rounded-full glass-panel border border-white/10 text-white/60 text-xs backdrop-blur-md pointer-events-none">
        <Eye className="w-3.5 h-3.5 text-orange-300 animate-pulse" />
        <span className="font-light tracking-wide">
          Move cursor to guide gaze • Hover face to center
        </span>
      </aside>

      {/* Interactive Modals (Work, About, Contact, Resume) */}
      <Modals 
        activeModal={activeModal} 
        onClose={() => setActiveModal(null)} 
      />

      {/* Glowing Custom Cursor with Lagging Ring */}
      <CustomCursor />

    </main>
  );
}
