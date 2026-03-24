"use client";

import Link from "next/link";
import { ArrowLeft, Figma, Lightbulb, Layers, Puzzle, Rocket, Code, Database, Globe, ArrowRight, Activity, Cpu, Smartphone } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const sections = [
  {
    title: "The Problem",
    icon: Puzzle,
    content: "People seeking nutrition support and dietitians often work through disconnected tools, making progress tracking, meal analysis, and communication inefficient and difficult to scale. A unified platform was needed to centralize health data, coaching workflows, and personalized nutrition guidance.",
  },
  {
    title: "The Solution",
    icon: Lightbulb,
    content: "BiteWise is a centralized mobile nutrition platform that brings together intelligent meal logging, health tracking, personalized recommendations, and coach-client collaboration. It streamlines the full nutrition journey for end users while giving professionals the tools to monitor clients and provide tailored support.",
  },
  {
    title: "Core Features",
    icon: Rocket,
    content: "Key features include calorie and macronutrient tracking, barcode scanning, AI-based food recognition, manual and recipe-based food logging, BMI and weight progress dashboards, personalized nutrition targets, expert coach discovery, invitation management, secure messaging, and coach-side client management tools.",
  },
  {
    title: "System Architecture",
    icon: Layers,
    content: "BiteWise was architected as a role-based mobile application with separate user flows for clients and nutrition professionals. The system combines mobile UI prototyping in Figma with a cloud-backed data layer supporting authentication, progress data storage, coach-client relationships, and real-time communication features.",
  },
  {
    title: "Technologies",
    icon: Code,
    content: "Figma for UI/UX design and prototyping, mobile application development for client and coach workflows, cloud database integration for health and user data, and real-time messaging infrastructure for coach-client communication. Some project documents also reference Node.js, MongoDB, Firebase/Firestore, and AI-assisted food analysis components.",
  }
];

export default function BiteWiseCaseStudyPage() {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => setMounted(true), []);
  
  if (!mounted) return <div className="min-h-screen bg-[#0c0d10]"></div>;
  return (
    <main className="min-h-screen bg-[#111315] text-[#fcfcfc] font-sans selection:bg-[#00f0ff] selection:text-black relative pb-32">
      <div className="fixed inset-0 bg-grid opacity-20 pointer-events-none z-0"></div>

      <div className="max-w-5xl mx-auto px-6 pt-20 md:pt-32 relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <Link
            href="/#portfolio"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-5 py-2.5 text-sm hover:border-white/30 hover:bg-white/10 hover:pr-6 transition-all duration-300 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Projects
          </Link>
        </motion.div>

        <motion.header 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative bg-white/[0.02] backdrop-blur-2xl border border-white/5 rounded-[3rem] p-8 md:p-16 overflow-hidden group shadow-2xl"
        >
          <motion.div 
            style={{ y, opacity }} 
            className="absolute inset-0 z-0 opacity-30 pointer-events-none mix-blend-screen"
          >
            <video 
               autoPlay 
               loop 
               muted 
               playsInline 
               className="w-full h-full object-cover filter grayscale opacity-40 blur-[2px]"
            >
               <source src="/bitewise.mp4" type="video/mp4" />
            </video>
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
            
            <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
              <motion.div 
                initial={{ scale: 0.5, opacity: 0, rotate: -15 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.3 }}
                className="relative w-24 h-24 md:w-32 md:h-32 shrink-0 z-20 group"
              >
                <div className="absolute inset-0 bg-[#00f0ff]/10 rounded-[2rem] group-hover:bg-[#00f0ff]/30 transition-colors duration-500 scale-105 pointer-events-none"></div>
                <motion.div
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative w-full h-full bg-[#f8f9fa] rounded-[2rem] p-3 shadow-[0_4px_20px_rgba(0,0,0,0.3)] border border-white/20 transform rotate-[-5deg] group-hover:rotate-0 transition-transform duration-500 overflow-hidden flex items-center justify-center"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/bitewise-logo.png" alt="BiteWise Logo" className="w-full h-full object-contain hover:scale-110 transition-transform duration-500" />
                </motion.div>
              </motion.div>

              <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/40">
                BiteWise<span className="text-[#00f0ff]">.</span>
              </h1>
            </div>

            <p className="max-w-2xl text-lg md:text-2xl text-white/70 leading-relaxed font-light">
              A modern digital nutrition platform designed to bridge the gap between dietitians and clients. It features tailored UX flows, biometric tracking, and secure mentor discovery.
            </p>
          </div>
        </motion.header>

        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3"
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
                className={`relative bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-white/[0.05] hover:border-[#00f0ff]/30 hover:shadow-[0_8px_30px_rgb(0,240,255,0.05)] hover:-translate-y-1 transition-all duration-500 group overflow-hidden ${isLastOfFive ? 'md:col-span-2 lg:col-span-1' : ''}`}
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
                <p className="text-white/70 leading-relaxed font-light relative z-10">{section.content}</p>
              </motion.article>
            );
          })}
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-12 mb-20"
        >
          <div className="flex flex-col items-center mb-16 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/20 mb-4">
              <Smartphone size={16} className="text-[#00f0ff]" />
              <span className="text-[#00f0ff] text-xs font-bold tracking-widest uppercase">Feature Showcase</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight text-center">
              Key Workflows
            </h2>
            <p className="text-xl text-white/60 font-light max-w-2xl text-center">
              A closer look at some of the interactive experiences within the BiteWise application.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Screen 1 */}
            <div className="flex flex-col items-center group">
              <div className="relative w-full max-w-[260px] aspect-[9/19] rounded-[2.5rem] border-[8px] border-[#151719] bg-black shadow-2xl overflow-hidden ring-1 ring-white/10 group-hover:-translate-y-2 group-hover:shadow-[0_15px_40px_rgba(0,240,255,0.15)] transition-all duration-500">
                <div className="absolute top-0 inset-x-0 h-5 bg-[#151719] rounded-b-2xl w-32 mx-auto z-20 flex justify-center items-end pb-1">
                  <div className="w-10 h-1 bg-black/60 rounded-full"></div>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/ch.gif" alt="ChatBot Interface" className="w-full h-full object-cover scale-[1.01]" />
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-lg font-bold text-white mb-1">AI Coach Assistant</h3>
                <p className="text-sm text-white/50 px-2">Instant answers and nutrition guidance via integrated ChatBot.</p>
              </div>
            </div>

            {/* Screen 2 */}
            <div className="flex flex-col items-center group">
              <div className="relative w-full max-w-[260px] aspect-[9/19] rounded-[2.5rem] border-[8px] border-[#151719] bg-black shadow-2xl overflow-hidden ring-1 ring-white/10 group-hover:-translate-y-2 group-hover:shadow-[0_15px_40px_rgba(0,240,255,0.15)] transition-all duration-500 lg:translate-y-8">
                <div className="absolute top-0 inset-x-0 h-5 bg-[#151719] rounded-b-2xl w-32 mx-auto z-20 flex justify-center items-end pb-1">
                  <div className="w-10 h-1 bg-black/60 rounded-full"></div>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/coachCoachi-ezgif.com-video-to-gif-converter.gif" alt="Coach Workflow" className="w-full h-full object-cover scale-[1.01]" />
              </div>
              <div className="mt-6 text-center lg:mt-10">
                <h3 className="text-lg font-bold text-white mb-1">Coach Connectivity</h3>
                <p className="text-sm text-white/50 px-2">Seamless interaction and monitoring between dietitians and clients.</p>
              </div>
            </div>

            {/* Screen 3 */}
            <div className="flex flex-col items-center group">
              <div className="relative w-full max-w-[260px] aspect-[9/19] rounded-[2.5rem] border-[8px] border-[#151719] bg-black shadow-2xl overflow-hidden ring-1 ring-white/10 group-hover:-translate-y-2 group-hover:shadow-[0_15px_40px_rgba(0,240,255,0.15)] transition-all duration-500">
                <div className="absolute top-0 inset-x-0 h-5 bg-[#151719] rounded-b-2xl w-32 mx-auto z-20 flex justify-center items-end pb-1">
                  <div className="w-10 h-1 bg-black/60 rounded-full"></div>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/receeee.gif" alt="Recipe Explorer" className="w-full h-full object-cover scale-[1.01]" />
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-lg font-bold text-white mb-1">Recipe Explorer</h3>
                <p className="text-sm text-white/50 px-2">Discover and log meals directly with detailed macronutrient data.</p>
              </div>
            </div>

            {/* Screen 4 */}
            <div className="flex flex-col items-center group">
              <div className="relative w-full max-w-[260px] aspect-[9/19] rounded-[2.5rem] border-[8px] border-[#151719] bg-black shadow-2xl overflow-hidden ring-1 ring-white/10 group-hover:-translate-y-2 group-hover:shadow-[0_15px_40px_rgba(0,240,255,0.15)] transition-all duration-500 lg:translate-y-8">
                <div className="absolute top-0 inset-x-0 h-5 bg-[#151719] rounded-b-2xl w-32 mx-auto z-20 flex justify-center items-end pb-1">
                  <div className="w-10 h-1 bg-black/60 rounded-full"></div>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/WhatsAppVido2025-06-1620.15.10_585e5f26-ezgif.com-speed.gif" alt="General Workflow" className="w-full h-full object-cover scale-[1.01]" />
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
          className="mt-4 bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-[3rem] p-8 md:p-16 overflow-hidden relative group"
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
             <div className="relative w-full max-w-[340px] aspect-[9/19] rounded-[3.5rem] border-[12px] border-[#151719] bg-black shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden ring-1 ring-white/10 group-hover:ring-[#00f0ff]/30 hover:scale-[1.02] transition-all duration-700">
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
                   poster="/bitewise.jpg"
                   className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500 scale-[1.01]"
                 >
                   <source src="/demo-bitewise.mp4" type="video/mp4" />
                   Your browser does not support the video tag.
                 </video>
               </div>
             </div>
           </div>
        </motion.section>

      </div>
    </main>
  );
}
