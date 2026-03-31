"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Lightbulb, Layers, Puzzle, Rocket, Code, Smartphone } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

const sections = [
  {
    title: "The Problem",
    icon: Puzzle,
    content: "Nutrition coaching journeys were fragmented across disconnected tools, making meal logging, progress tracking, and communication hard to scale.",
  },
  {
    title: "The Solution",
    icon: Lightbulb,
    content: "BiteWise centralizes client and coach workflows in one mobile experience with guided logging, tracking dashboards, and secure collaboration.",
  },
  {
    title: "Technologies",
    icon: Code,
    content: "React Native, Node.js, MongoDB, Firebase/Firestore, and Figma for end-to-end product design and delivery.",
  },
];

const highlights = [
  { label: "Role", value: "Full-Stack Mobile Intern" },
  { label: "Duration", value: "PFE 2025" },
  { label: "Focus", value: "Coaching + Nutrition UX" },
];


export default function BiteWiseCaseStudyPage() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <main className="min-h-screen bg-[#0d1014] text-[#fcfcfc] font-sans selection:bg-[#00f0ff] selection:text-black relative pb-20 md:pb-28 overflow-x-hidden">
      <div className="fixed inset-0 bg-grid opacity-20 pointer-events-none z-0"></div>
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_12%_12%,rgba(0,240,255,0.12),transparent_35%),radial-gradient(circle_at_85%_18%,rgba(56,189,248,0.1),transparent_32%),radial-gradient(circle_at_55%_82%,rgba(34,211,238,0.08),transparent_36%)]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 pt-16 md:pt-24 relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 md:mb-12"
        >
          <Link
            href="/#portfolio"
            className="inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-cyan-300/10 backdrop-blur-md px-4 py-2.5 text-sm hover:border-cyan-200/40 hover:bg-cyan-300/15 hover:pr-6 transition-all duration-300 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Projects
          </Link>
        </motion.div>

        <motion.header 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative bg-white/[0.03] backdrop-blur-2xl border border-cyan-100/10 rounded-[2rem] md:rounded-[3rem] p-6 sm:p-8 md:p-14 overflow-hidden group shadow-2xl"
        >
          <motion.div 
            style={{ y, opacity }} 
            className="absolute inset-0 z-0 opacity-30 pointer-events-none mix-blend-screen"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_25%,rgba(0,240,255,0.32),transparent_45%),radial-gradient(circle_at_82%_70%,rgba(56,189,248,0.24),transparent_48%)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111315] via-[#111315]/80 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#111315] via-transparent to-[#111315]"></div>
          </motion.div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/20 mb-8">
               <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse"></span>
               <p className="text-[#00f0ff] text-xs font-semibold tracking-widest uppercase">
                 PFE Internship @ ARSII — 2025
               </p>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-6 mb-6">
              <motion.div 
                initial={{ scale: 0.5, opacity: 0, rotate: -15 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.3 }}
                className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 shrink-0 z-20 group"
              >
                <div className="absolute inset-0 bg-[#00f0ff]/10 rounded-[2rem] group-hover:bg-[#00f0ff]/30 transition-colors duration-500 scale-105 pointer-events-none"></div>
                <motion.div
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative w-full h-full bg-[#f8f9fa] rounded-[2rem] p-3 shadow-[0_4px_20px_rgba(0,0,0,0.3)] border border-white/20 transform rotate-[-5deg] group-hover:rotate-0 transition-transform duration-500 overflow-hidden flex items-center justify-center"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/bitewise-logo.png" alt="BiteWise Logo" className="w-full h-full object-contain hover:scale-110 transition-transform duration-500" decoding="async" />
                </motion.div>
              </motion.div>

              <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-cyan-100/40">
                BiteWise<span className="text-[#00f0ff]">.</span>
              </h1>
            </div>

            <p className="max-w-2xl text-base sm:text-lg md:text-2xl text-white/75 leading-relaxed font-light">
              A modern digital nutrition platform designed to bridge the gap between dietitians and clients. It features tailored UX flows, biometric tracking, and secure mentor discovery.
            </p>
          </div>
        </motion.header>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3"
        >
          {highlights.map((item) => (
            <div key={item.label} className="glass-card rounded-2xl p-4 border-[#00f0ff]/15">
              <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#00f0ff]/90 mb-2">{item.label}</p>
              <p className="text-white font-semibold text-sm">{item.value}</p>
            </div>
          ))}
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-8 grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {sections.map((section, index) => {
            const Icon = section.icon;
            // Make the 5th item wide if it's the last one in a 3-col grid
            const isLastOfFive = sections.length === 5 && index === 4;
            
            return (
              <motion.article 
                key={section.title} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative glass-card glass-card--interactive border-cyan-100/15 rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-8 hover:border-[#00f0ff]/40 group overflow-hidden ${isLastOfFive ? 'md:col-span-2 lg:col-span-1' : ''}`}
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 transform translate-x-4 -translate-y-4 group-hover:scale-110 group-hover:opacity-10 transition-all duration-500 pointer-events-none">
                  <Icon size={120} />
                </div>
                
                <h2 className="flex items-center gap-4 text-xl font-bold text-white mb-6 relative z-10">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 group-hover:border-[#00f0ff]/50 group-hover:bg-[#00f0ff]/10 group-hover:text-[#00f0ff] transition-all duration-500 shadow-lg">
                    <Icon size={22} />
                  </div>
                  {section.title}
                </h2>
                <p className="text-white/75 leading-relaxed font-light relative z-10">{section.content}</p>
              </motion.article>
            );
          })}
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-10 md:mt-12 mb-14 md:mb-20"
        >
          <div className="flex flex-col items-center mb-16 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/20 mb-4">
              <Smartphone size={16} className="text-[#00f0ff]" />
              <span className="text-[#00f0ff] text-xs font-bold tracking-widest uppercase">Feature Showcase</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-4 tracking-tight text-center">
              Key Workflows
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/60 font-light max-w-2xl text-center">
              A closer look at some of the interactive experiences within the BiteWise application.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            
            {/* Screen 1 */}
            <div className="flex flex-col items-center group">
              <div className="relative w-full max-w-[220px] sm:max-w-[250px] md:max-w-[260px] aspect-[9/19] rounded-[2.2rem] md:rounded-[2.5rem] border-[8px] border-[#151719] bg-black shadow-2xl overflow-hidden ring-1 ring-cyan-100/15 group-hover:-translate-y-2 group-hover:shadow-[0_15px_40px_rgba(0,240,255,0.15)] transition-all duration-500">
                <div className="absolute top-0 inset-x-0 h-5 bg-[#151719] rounded-b-2xl w-32 mx-auto z-20 flex justify-center items-end pb-1">
                  <div className="w-10 h-1 bg-black/60 rounded-full"></div>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/ch.gif" alt="ChatBot Interface" className="w-full h-full object-cover scale-[1.01]" loading="lazy" decoding="async" />
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-lg font-bold text-white mb-1">AI Coach Assistant</h3>
                <p className="text-sm text-white/50 px-2">Instant answers and nutrition guidance via integrated ChatBot.</p>
              </div>
            </div>

            {/* Screen 2 */}
            <div className="flex flex-col items-center group">
              <div className="relative w-full max-w-[220px] sm:max-w-[250px] md:max-w-[260px] aspect-[9/19] rounded-[2.2rem] md:rounded-[2.5rem] border-[8px] border-[#151719] bg-black shadow-2xl overflow-hidden ring-1 ring-cyan-100/15 group-hover:-translate-y-2 group-hover:shadow-[0_15px_40px_rgba(0,240,255,0.15)] transition-all duration-500 lg:translate-y-8">
                <div className="absolute top-0 inset-x-0 h-5 bg-[#151719] rounded-b-2xl w-32 mx-auto z-20 flex justify-center items-end pb-1">
                  <div className="w-10 h-1 bg-black/60 rounded-full"></div>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/coachCoachi-ezgif.com-video-to-gif-converter.gif" alt="Coach Workflow" className="w-full h-full object-cover scale-[1.01]" loading="lazy" decoding="async" />
              </div>
              <div className="mt-6 text-center lg:mt-10">
                <h3 className="text-lg font-bold text-white mb-1">Coach Connectivity</h3>
                <p className="text-sm text-white/50 px-2">Seamless interaction and monitoring between dietitians and clients.</p>
              </div>
            </div>

            {/* Screen 3 */}
            <div className="flex flex-col items-center group">
              <div className="relative w-full max-w-[220px] sm:max-w-[250px] md:max-w-[260px] aspect-[9/19] rounded-[2.2rem] md:rounded-[2.5rem] border-[8px] border-[#151719] bg-black shadow-2xl overflow-hidden ring-1 ring-cyan-100/15 group-hover:-translate-y-2 group-hover:shadow-[0_15px_40px_rgba(0,240,255,0.15)] transition-all duration-500">
                <div className="absolute top-0 inset-x-0 h-5 bg-[#151719] rounded-b-2xl w-32 mx-auto z-20 flex justify-center items-end pb-1">
                  <div className="w-10 h-1 bg-black/60 rounded-full"></div>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/receeee.gif" alt="Recipe Explorer" className="w-full h-full object-cover scale-[1.01]" loading="lazy" decoding="async" />
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-lg font-bold text-white mb-1">Recipe Explorer</h3>
                <p className="text-sm text-white/50 px-2">Discover and log meals directly with detailed macronutrient data.</p>
              </div>
            </div>

            {/* Screen 4 */}
            <div className="flex flex-col items-center group">
              <div className="relative w-full max-w-[220px] sm:max-w-[250px] md:max-w-[260px] aspect-[9/19] rounded-[2.2rem] md:rounded-[2.5rem] border-[8px] border-[#151719] bg-black shadow-2xl overflow-hidden ring-1 ring-cyan-100/15 group-hover:-translate-y-2 group-hover:shadow-[0_15px_40px_rgba(0,240,255,0.15)] transition-all duration-500 lg:translate-y-8">
                <div className="absolute top-0 inset-x-0 h-5 bg-[#151719] rounded-b-2xl w-32 mx-auto z-20 flex justify-center items-end pb-1">
                  <div className="w-10 h-1 bg-black/60 rounded-full"></div>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/WhatsAppVido2025-06-1620.15.10_585e5f26-ezgif.com-speed.gif" alt="General Workflow" className="w-full h-full object-cover scale-[1.01]" loading="lazy" decoding="async" />
              </div>
              <div className="mt-6 text-center lg:mt-10">
                <h3 className="text-lg font-bold text-white mb-1">Progress Tracking</h3>
                <p className="text-sm text-white/50 px-2">Interactive dashboards capturing weight goals and daily health metrics.</p>
              </div>
            </div>

          </div>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-4 bg-white/[0.03] backdrop-blur-3xl border border-cyan-100/10 rounded-[2rem] md:rounded-[3rem] p-6 sm:p-8 md:p-16 overflow-hidden relative group"
        >
           <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#00f0ff]/10 blur-[120px] rounded-full pointer-events-none"></div>
           <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full pointer-events-none"></div>
           
           <div className="flex flex-col md:flex-row items-center justify-between mb-16 relative z-10 gap-8">
             <div className="flex-1">
               <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4">
                 <div className="w-1.5 h-1.5 rounded-full bg-[#00f0ff]"></div>
                 <span className="text-xs font-medium text-white/80 uppercase tracking-wider">Demo</span>
               </div>
               <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                 Live in Action
               </h2>
               <p className="text-xl text-white/60 font-light max-w-xl">
                 Watch how BiteWise streamlines the workflow between dietitians and clients through our comprehensive mobile platform.
               </p>
             </div>
           </div>
           
           <div className="flex justify-center relative z-10">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[700px] bg-gradient-to-b from-[#00f0ff]/20 to-purple-500/20 blur-[80px] rounded-full pointer-events-none"></div>
             
             {/* Mobile Phone Mockup */}
             <div className="relative w-full max-w-[300px] sm:max-w-[330px] md:max-w-[340px] aspect-[9/19] rounded-[3rem] md:rounded-[3.5rem] border-[12px] border-[#151719] bg-black shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden ring-1 ring-cyan-100/20 group-hover:ring-[#00f0ff]/50 hover:scale-[1.02] transition-all duration-700">
               {/* Mobile Notch */}
               <div className="absolute top-0 inset-x-0 h-7 bg-[#151719] rounded-b-3xl w-40 mx-auto z-20 flex justify-center items-end pb-1.5">
                 <div className="w-14 h-1.5 bg-black/60 rounded-full"></div>
                 <div className="absolute right-4 top-2 w-2 h-2 rounded-full bg-[#00f0ff]/50 blur-[1px]"></div>
               </div>
               
               <div className="relative w-full h-full bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
                 <video 
                   controls 
                   playsInline 
                   muted
                  preload="none"
                   poster="/bitewise-logo.png"
                   className="w-full h-full object-contain bg-[#0b0d12] opacity-95 group-hover:opacity-100 transition-opacity duration-500"
                 >
                   <source src="/demo-bitewise.mp4" type="video/mp4" />
                   Your browser does not support the video tag.
                 </video>
               </div>
             </div>
           </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mt-8 mb-16 glass-card rounded-2xl md:rounded-3xl p-6 md:p-8 border-[#00f0ff]/20"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <p className="text-[#00f0ff] font-mono text-[10px] tracking-[0.2em] uppercase mb-2">Next Case Study</p>
              <h3 className="text-white text-2xl md:text-3xl font-black tracking-tight">Continue Exploring Projects</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="/#portfolio" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-sm text-white hover:border-white/35 transition-colors">
                Back to Portfolio
              </a>
              <a href="/projects/agrismart-case-study" className="inline-flex items-center gap-2 rounded-full border border-[#00f0ff]/35 bg-[#00f0ff]/10 px-4 py-2 text-sm text-[#00f0ff] hover:bg-[#00f0ff] hover:text-black transition-colors">
                Next Project <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </motion.section>

      </div>
    </main>
  );
}
