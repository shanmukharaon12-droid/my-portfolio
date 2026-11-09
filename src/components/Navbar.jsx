import React from 'react';
import { Sparkles, Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar({ onOpenModal, activeModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'work', label: 'WORK' },
    { id: 'about', label: 'ABOUT' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const handleNavClick = (id) => {
    onOpenModal(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-6 left-0 right-0 z-40 flex justify-center px-4 md:px-8 pointer-events-none">
      {/* Floating Glass Pill */}
      <nav className="pointer-events-auto flex items-center justify-between md:justify-center gap-1 md:gap-2 px-5 py-2.5 rounded-full glass-pill border border-white/20 shadow-2xl transition-all duration-300">
        
        {/* Subtle Brand Mark */}
        <button 
          onClick={() => onOpenModal('about')}
          className="flex items-center gap-2 pr-3 md:pr-4 border-r border-white/15 text-white/90 hover:text-white transition-colors group"
        >
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-[10px] font-bold text-neutral-950 shadow-md group-hover:rotate-12 transition-transform">
            S
          </div>
          <span className="font-medium tracking-tight text-xs uppercase hidden sm:inline-block text-white/80 group-hover:text-white">
            Portfolio
          </span>
        </button>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 ${
                activeModal === item.id
                  ? 'bg-white text-[#9a1611] shadow-lg shadow-black/20'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Action item: Resume quick trigger */}
        <button
          onClick={() => onOpenModal('resume')}
          className="hidden md:flex items-center gap-1.5 ml-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/90 hover:text-white text-xs font-semibold tracking-wider transition-all border border-white/10 hover:border-white/30"
        >
          <span>RESUME</span>
          <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
        </button>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1.5 text-white/90 hover:text-white transition-colors"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Glass Dropdown */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto absolute top-20 inset-x-6 p-4 rounded-3xl glass-panel border border-white/20 shadow-2xl flex flex-col gap-2 md:hidden animate-in fade-in slide-in-from-top-4 duration-200">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full py-3 px-4 rounded-2xl text-left text-sm font-semibold tracking-wider transition-all ${
                activeModal === item.id
                  ? 'bg-white text-[#9a1611]'
                  : 'text-white/90 hover:bg-white/10'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick('resume')}
            className="w-full py-3 px-4 rounded-2xl text-left text-sm font-semibold tracking-wider text-amber-200 hover:bg-white/10 flex items-center justify-between border-t border-white/10 mt-1 pt-3"
          >
            <span>RESUME</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </header>
  );
}
