import React, { useState } from 'react';
import { X, ExternalLink, Mail, Download, CheckCircle, Code, Layers, Sparkles, Send } from 'lucide-react';

export default function Modals({ activeModal, onClose }) {
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  if (!activeModal) return null;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      onClose();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 select-auto">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl max-h-[85vh] bg-[#88120b]/95 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col z-10 text-white animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/15 bg-black/20">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <h2 className="text-sm font-bold uppercase tracking-widest text-white/90">
              {activeModal === 'work' && 'Featured Work'}
              {activeModal === 'about' && 'About Shannu'}
              {activeModal === 'contact' && 'Get In Touch'}
              {activeModal === 'resume' && 'Curriculum Vitae'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-all"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 md:p-8 space-y-6">

          {/* WORK MODAL */}
          {activeModal === 'work' && (
            <div className="space-y-6">
              <p className="text-white/80 text-sm leading-relaxed">
                Selected featured engineering and design projects showcasing full-stack architecture, 
                high-performance UI, and interactive creative technology.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Project 1 */}
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all flex flex-col justify-between group">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono tracking-wider uppercase text-amber-300/90">E-Commerce Platform</span>
                      <ExternalLink className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-200 transition-colors">
                      FabricFinds
                    </h3>
                    <p className="text-xs text-white/70 leading-relaxed">
                      High-converting e-commerce ecosystem featuring real-time inventory synchronization, 
                      Stripe checkout, and lightning-fast product filtering.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-white/10 text-[10px] text-white/60">
                    <span className="px-2 py-0.5 rounded-md bg-white/10">React</span>
                    <span className="px-2 py-0.5 rounded-md bg-white/10">Node.js</span>
                    <span className="px-2 py-0.5 rounded-md bg-white/10">Tailwind</span>
                    <span className="px-2 py-0.5 rounded-md bg-white/10">PostgreSQL</span>
                  </div>
                </div>

                {/* Project 2 */}
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all flex flex-col justify-between group">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono tracking-wider uppercase text-amber-300/90">Interactive 3D Engine</span>
                      <ExternalLink className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-200 transition-colors">
                      Kinetic Canvas Studio
                    </h3>
                    <p className="text-xs text-white/70 leading-relaxed">
                      GPU-accelerated mouse-tracking rendering engine with dynamic physics-driven sprite animations and zero-lag frame interpolation.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-white/10 text-[10px] text-white/60">
                    <span className="px-2 py-0.5 rounded-md bg-white/10">Canvas API</span>
                    <span className="px-2 py-0.5 rounded-md bg-white/10">WebGL</span>
                    <span className="px-2 py-0.5 rounded-md bg-white/10">Vite</span>
                    <span className="px-2 py-0.5 rounded-md bg-white/10">Python/OpenCV</span>
                  </div>
                </div>

                {/* Project 3 */}
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all flex flex-col justify-between group">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono tracking-wider uppercase text-amber-300/90">AI SaaS Suite</span>
                      <ExternalLink className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-200 transition-colors">
                      NeuralFlow Designer
                    </h3>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Collaborative visual workflow platform for generative pipelines with real-time WebSocket state management.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-white/10 text-[10px] text-white/60">
                    <span className="px-2 py-0.5 rounded-md bg-white/10">TypeScript</span>
                    <span className="px-2 py-0.5 rounded-md bg-white/10">Next.js</span>
                    <span className="px-2 py-0.5 rounded-md bg-white/10">FastAPI</span>
                    <span className="px-2 py-0.5 rounded-md bg-white/10">Redis</span>
                  </div>
                </div>

                {/* Project 4 */}
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all flex flex-col justify-between group">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono tracking-wider uppercase text-amber-300/90">Cloud Microservices</span>
                      <ExternalLink className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-200 transition-colors">
                      Pulse Engine Cloud
                    </h3>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Distributed telemetry ingestion layer processing 50K events/sec with automated anomaly detection.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-white/10 text-[10px] text-white/60">
                    <span className="px-2 py-0.5 rounded-md bg-white/10">Docker</span>
                    <span className="px-2 py-0.5 rounded-md bg-white/10">Go</span>
                    <span className="px-2 py-0.5 rounded-md bg-white/10">GraphQL</span>
                    <span className="px-2 py-0.5 rounded-md bg-white/10">AWS</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ABOUT MODAL */}
          {activeModal === 'about' && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-300 flex items-center justify-center text-neutral-950 font-black text-2xl shadow-xl">
                  S
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Shannu</h3>
                  <p className="text-xs text-amber-300/90 uppercase tracking-widest font-mono">
                    Full Stack Developer • Creative Technologist
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-white/85 text-sm leading-relaxed">
                <p>
                  I bridge the intersection of artistic design and robust full-stack engineering. With a deep passion for 
                  interactive web experiences, high-throughput microservices, and kinetic motion interfaces, I build 
                  applications that are as delightful to use as they are performant.
                </p>
                <p>
                  From building custom computer vision frame interpolation engines in Python to architecting real-time 
                  cloud backends and responsive React applications, I take products from conceptual spark to production scale.
                </p>
              </div>

              {/* Core Skill Categories */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 mb-2 text-amber-300">
                    <Code className="w-4 h-4" />
                    <h4 className="text-xs font-bold uppercase tracking-wider">Frontend</h4>
                  </div>
                  <p className="text-xs text-white/70">
                    React, Next.js, TypeScript, Tailwind CSS, Canvas API, WebGL, Framer Motion
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 mb-2 text-orange-300">
                    <Layers className="w-4 h-4" />
                    <h4 className="text-xs font-bold uppercase tracking-wider">Backend</h4>
                  </div>
                  <p className="text-xs text-white/70">
                    Node.js, Express, Python (FastAPI/Flask), PostgreSQL, MongoDB, Redis, REST & GraphQL
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 mb-2 text-rose-300">
                    <Sparkles className="w-4 h-4" />
                    <h4 className="text-xs font-bold uppercase tracking-wider">DevOps & Tools</h4>
                  </div>
                  <p className="text-xs text-white/70">
                    Git, Docker, AWS, OpenCV, Vite, CI/CD, Figma, Unit & E2E Testing
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* CONTACT MODAL */}
          {activeModal === 'contact' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">Let's build something unforgettable.</h3>
                <p className="text-xs text-white/70 leading-relaxed">
                  Have an exciting project, freelance opportunity, or engineering challenge? Drop a note below or reach out directly.
                </p>
              </div>

              {formSent ? (
                <div className="p-8 rounded-2xl bg-white/10 border border-emerald-400/40 text-center space-y-3">
                  <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="text-lg font-bold text-white">Message Sent Successfully!</h4>
                  <p className="text-xs text-white/70">Thank you for reaching out. I will get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-semibold uppercase tracking-wider text-white/70">Your Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ada Lovelace"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 focus:border-amber-300 focus:outline-none text-sm text-white placeholder-white/30"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-semibold uppercase tracking-wider text-white/70">Email Address</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="ada@example.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 focus:border-amber-300 focus:outline-none text-sm text-white placeholder-white/30"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-white/70">Your Message</label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your project or idea..."
                      className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 focus:border-amber-300 focus:outline-none text-sm text-white placeholder-white/30 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-white text-[#9a1611] font-bold text-xs uppercase tracking-widest hover:bg-neutral-100 transition-all shadow-lg flex items-center justify-center gap-2 group"
                  >
                    <span>Send Message</span>
                    <Send className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              )}

              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-white/70">
                <a 
                  href="mailto:shannu@example.com" 
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-amber-300" />
                  <span>shannu@example.com</span>
                </a>
                <div className="flex items-center gap-4">
                  <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                    GitHub
                  </a>
                  <span>•</span>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                    LinkedIn
                  </a>
                  <span>•</span>
                  <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                    X (Twitter)
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* RESUME MODAL */}
          {activeModal === 'resume' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-white">Shannu</h3>
                  <p className="text-xs text-amber-300">Full Stack Developer & Creative Technologist</p>
                </div>
                <a
                  href={`${(import.meta.env.BASE_URL || '/').replace(/\/?$/, '/') }resume.pdf`}
                  download="Shannu_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </a>
              </div>

              {/* Experience */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-white/50 border-b border-white/10 pb-1">
                  Professional Experience
                </h4>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-bold text-white">Senior Full Stack Developer</span>
                    <span className="text-xs text-white/60">2023 — Present</span>
                  </div>
                  <p className="text-xs text-amber-200">Creative Tech Innovations</p>
                  <p className="text-xs text-white/70 leading-relaxed pt-1">
                    Architected interactive web apps, microservices, and WebGL/Canvas visual experiences. Decreased bundle latency by 45% and improved core web vitals.
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-bold text-white">Full Stack Software Engineer</span>
                    <span className="text-xs text-white/60">2021 — 2023</span>
                  </div>
                  <p className="text-xs text-amber-200">FabricFinds E-Commerce</p>
                  <p className="text-xs text-white/70 leading-relaxed pt-1">
                    Built end-to-end checkout pipeline, automated order orchestration, and responsive product catalog with sub-50ms search response.
                  </p>
                </div>
              </div>

              {/* Education */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-widest text-white/50 border-b border-white/10 pb-1">
                  Education
                </h4>
                <div className="flex justify-between text-sm">
                  <span className="font-bold text-white">B.Tech in Computer Science & Engineering</span>
                  <span className="text-xs text-white/60">First Class with Distinction</span>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
