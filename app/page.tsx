"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Copy, Mail, Code, ExternalLink, Download, Layers, ShieldCheck, ArrowRight, User, Globe, Database, Network, Cloud, Server, Cpu, Github, Linkedin, X, Send, Terminal, Briefcase } from "lucide-react";
import emailjs from '@emailjs/browser';

export default function Home() {
   const RETURN_ANCHOR_KEY = "portfolio:return-anchor";
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePosition] = useState({ x: -1000, y: -1000 });
  const [scrambledText, setScrambledText] = useState("Full-Stack Developer");
  const [showPreloader, setShowPreloader] = useState(true);
  const [loadingText, setLoadingText] = useState("[SYSTEM_INIT] ...");
  const [activeCVTab, setActiveCVTab] = useState("experience");
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactStep, setContactStep] = useState(0); // 0: form, 1: sending, 2: success, 3: error
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const formRef = useRef<HTMLFormElement>(null);
  
  const { scrollYProgress } = useScroll();
  const heroImageY = useTransform(scrollYProgress, [0, 1], [0, 400]);

   const markPortfolioSectionInHistory = () => {
      if (typeof window === "undefined") return;

      // Persist the desired return anchor so browser Back can restore the projects section.
      window.sessionStorage.setItem(RETURN_ANCHOR_KEY, "portfolio");

      if (window.location.pathname === "/" && window.location.hash !== "#portfolio") {
         window.history.replaceState(window.history.state, "", "/#portfolio");
      }
   };

  useEffect(() => {
    setMounted(true);
    
    // Mouse tracking for interactive background
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);

    // Hacker text scramble effect
   const originalText = "Software Engineer";
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let iteration = 0;
    
    const interval = setInterval(() => {
      setScrambledText(originalText.split("").map((letter, index) => {
        if(index < iteration) { return originalText[index]; }
        return letters[Math.floor(Math.random() * 26)];
      }).join(""));
      if(iteration >= originalText.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 50);

      // Preloader sequence
    const t1 = setTimeout(() => {
         setLoadingText("ESTABLISHING CONNECTION...");
      }, 500);
    const t2 = setTimeout(() => {
         setLoadingText("DECRYPTING PORTFOLIO ASSETS...");
      }, 1000);
    const t3 = setTimeout(() => {
      setShowPreloader(false);
    }, 1600);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      clearInterval(interval);
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
    };
  }, []);

   useEffect(() => {
      if (!mounted || showPreloader || typeof window === "undefined") return;

      const savedAnchor = window.sessionStorage.getItem(RETURN_ANCHOR_KEY);
      if (savedAnchor !== "portfolio") return;

      const portfolioSection = document.getElementById("portfolio");
      if (!portfolioSection) return;

      portfolioSection.scrollIntoView({ behavior: "smooth", block: "start" });
      if (window.location.hash !== "#portfolio") {
         window.history.replaceState(window.history.state, "", "/#portfolio");
      }

      window.sessionStorage.removeItem(RETURN_ANCHOR_KEY);
   }, [mounted, showPreloader]);

  if (!mounted) return <div className="min-h-screen bg-[#111315]"></div>;

   const stack = ["Symfony (PHP)", "Node.js REST APIs", "React Native", "FlutterFlow", "MongoDB", "Docker", "GNS3 OSPF & GRE/IPsec"];
   const directMailTo = "mailto:ayafdhila@gmail.com?subject=Project%20Collaboration%20with%20Aya%20Fdhila&body=Hi%20Aya%2C%0A%0AI%20saw%20your%20portfolio%20and%20I%20would%20like%20to%20discuss%20a%20project.%0A";

  return (
    <div className="min-h-screen bg-[#111315] text-[#b0b3b8] font-sans selection:bg-[#00f0ff] selection:text-black pb-40 overflow-x-hidden relative">
      
      {/* 0. SYSTEM BOOT PRELOADER */}
      <AnimatePresence>
        {showPreloader && (
          <motion.div 
            key="preloader"
            initial={{ y: 0 }}
            exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
            className="fixed inset-0 z-[200] bg-[#0f1011] flex flex-col items-center justify-center pointer-events-none"
          >
             <motion.div 
               animate={{ opacity: [0.4, 1, 0.4] }} 
               transition={{ repeat: Infinity, duration: 1.5 }}
               className="text-[#00f0ff] font-mono text-xs md:text-sm tracking-[0.2em] uppercase flex flex-col items-center gap-6"
             >
                <div className="w-12 h-12 border border-[#00f0ff]/20 border-t-[#00f0ff] rounded-full animate-spin mb-2"></div>
                {loadingText}
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. INTERACTIVE MOUSE FLASHLIGHT AND GRID */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-grid opacity-30"></div>
      <div 
        className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0,240,255,0.06), transparent 40%)`
        }}
      />

      {/* 2. FLOATING APPLE-STYLE DOCK NAV (Instead of standard top-nav) */}
      <motion.nav 
        initial={{ y: 100, opacity: 0, x: "-50%" }}
        animate={{ y: 0, opacity: 1, x: "-50%" }}
        transition={{ duration: 1, delay: 0.5, type: "spring" }}
        className="fixed bottom-6 lg:bottom-8 left-1/2 z-50 bg-[#151719]/80 backdrop-blur-xl border border-white/10 rounded-full px-4 md:px-6 py-3 md:py-4 flex items-center gap-4 md:gap-8 shadow-2xl shadow-black/50"
      >
        <Link href="#home" className="text-white hover:text-[#00f0ff] transition-all hover:scale-110 flex items-center justify-center p-2"><User size={20} /></Link>
            <Link
               href="#resume"
               aria-label="Jump to experience section"
               title="Experience"
               className="text-white hover:text-[#00f0ff] transition-all hover:scale-110 flex items-center justify-center p-2"
            >
               <Briefcase size={20} />
            </Link>
            <Link
               href="#portfolio"
               aria-label="Jump to portfolio section"
               title="Projects"
               className="text-white hover:text-[#00f0ff] transition-all hover:scale-110 flex items-center justify-center p-2"
            >
               <Code size={20} />
            </Link>
        <div className="w-px h-6 bg-white/20"></div>
            <a
               href="https://github.com/aya284"
               target="_blank"
               rel="noopener noreferrer"
               aria-label="Open GitHub profile"
               title="GitHub"
               className="group relative text-white transition-all hover:scale-110 flex items-center justify-center p-2.5 rounded-full border border-white/15 bg-white/[0.03] hover:border-[#00f0ff]/70 hover:bg-[#00f0ff]/10"
            >
               <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.25),transparent_65%)]"
               />
               <Github size={18} className="relative z-10" />
            </a>
            <a
               href="https://linkedin.com/in/eya-fdhila"
               target="_blank"
               rel="noopener noreferrer"
               aria-label="Open LinkedIn profile"
               title="LinkedIn"
               className="group relative text-white transition-all hover:scale-110 flex items-center justify-center p-2.5 rounded-full border border-white/15 bg-white/[0.03] hover:border-[#00f0ff]/70 hover:bg-[#00f0ff]/10"
            >
               <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.25),transparent_65%)]"
               />
               <Linkedin size={18} className="relative z-10" />
            </a>
        <div className="w-px h-6 bg-white/20"></div>
      <a href="/aya-fdhila-cv.pdf" download className="text-[#00f0ff] hover:text-white transition-all hover:scale-110 flex items-center justify-center p-2"><Download size={20} /></a>
      </motion.nav>

      {/* 3. HERO SECTION - EDITORIAL LAYOUT */}
      <section id="home" className="relative max-w-7xl mx-auto px-8 md:px-16 pt-32 min-h-[90vh] flex items-center border-b border-white/5">
        
        <div className="grid lg:grid-cols-12 gap-12 items-center w-full z-10 pointer-events-none">
           
           <div className="lg:col-span-7 relative z-20 pointer-events-auto">
             <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <p className="text-[#00f0ff] font-mono text-sm tracking-[0.3em] uppercase mb-6 flex items-center gap-4 w-max">
                           <span className="w-8 h-px bg-[#00f0ff]"></span> Software Engineering Student | Junior Full-Stack / Mobile Developer
                </p>
                <h1 className="text-white text-6xl sm:text-8xl md:text-[8rem] font-black uppercase tracking-tighter leading-[0.85] mb-6">
                    AYA <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#00f0ff]/50">FDHILA</span>
                  </h1>
                
                {/* Hacker Scramble Text */}
                <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-lg inline-block backdrop-blur-sm mb-10">
                   <p className="text-[#00f0ff] font-mono text-md md:text-lg tracking-widest">{scrambledText}</p>
                </div>

                <div className="flex gap-6 max-w-xl text-sm text-white/60 leading-relaxed font-light">
                   <p>Software Engineering student at ESPRIT and Computer Engineering graduate (ISIMA'25), delivering end-to-end solutions across Symfony (PHP) web platforms, Node.js REST APIs, and mobile apps with React Native and FlutterFlow. PFE intern at ARSII on BiteWise (digital nutrition coach platform), with a strong focus on clean architecture, validation/testing mindset, and Agile execution.</p>
                </div>

                <div className="mt-12 flex items-center gap-6">
                   <span className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-widest bg-white/10 px-4 py-2 rounded-full backdrop-blur-md">
                     <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div> Available for work
                   </span>
                   {/* Direct Social Links */}
                   <div className="flex gap-4">
                     <a href="https://github.com/aya284" target="_blank" rel="noopener noreferrer" className="p-2.5 border border-white/10 rounded-full hover:border-[#00f0ff] hover:text-[#00f0ff] hover:bg-[#00f0ff]/10 transition-all duration-300">
                        <Github size={18} />
                     </a>
                     <a href="https://linkedin.com/in/eya-fdhila" target="_blank" rel="noopener noreferrer" className="p-2.5 border border-white/10 rounded-full hover:border-[#00f0ff] hover:text-[#00f0ff] hover:bg-[#00f0ff]/10 transition-all duration-300">
                        <Linkedin size={18} />
                     </a>
                     <a href="mailto:ayafdhila@gmail.com" className="p-2.5 border border-white/10 rounded-full hover:border-[#00f0ff] hover:text-[#00f0ff] hover:bg-[#00f0ff]/10 transition-all duration-300">
                        <Mail size={18} />
                     </a>
                   </div>
                </div>
             </motion.div>
           </div>

           {/* Parallax Image */}
           <motion.div 
             style={{ y: heroImageY }}
             className="lg:col-span-5 relative z-10 hidden lg:flex justify-center pointer-events-auto"
           >
              <div className="relative cursor-pointer">
                 {/* Decorative background glow */}
                 <div className="absolute inset-0 bg-[#00f0ff]/20 blur-[100px] rounded-full scale-150 transform-gpu" />
                 
                 {/* Central circular crop with outer orbit rings */}
                 <div className="relative w-[380px] h-[380px]">
                    {/* Ring 1 */}
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 40, ease: "linear" }} className="absolute -inset-4 border border-white/10 rounded-full border-t-[#00f0ff]/50" />
                    {/* Ring 2 */}
                    <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 25, ease: "linear" }} className="absolute -inset-8 border border-white/5 rounded-full border-b-[#b829ff]/50" />

                    <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/10 relative group bg-[#0a0a0a] shadow-[0_0_50px_rgba(0,0,0,0.8)] z-10">
                      <motion.div 
                        whileHover={{ scale: 1.05 }} 
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-full h-full relative"
                      >
                         <img 
                            src="/profile.png" 
                            alt="Aya Fdhila" 
                            className="w-full h-full object-cover filter grayscale contrast-125 brightness-90 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 transition-all duration-700 ease-out"
                         />
                         
                         {/* Vignette Overlay inner shadow */}
                         <div className="absolute inset-0 rounded-full shadow-[inset_0_0_80px_rgba(0,0,0,0.8)] pointer-events-none group-hover:shadow-[inset_0_0_40px_rgba(0,0,0,0.4)] transition-all duration-700"></div>
                      </motion.div>
                    </div>

                    {/* Floating Status Badge */}
                    <motion.div 
                       initial={{ y: 0 }}
                       animate={{ y: [-10, 10, -10] }}
                       transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                       className="absolute -bottom-6 -right-6 bg-[#111214]/80 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-2xl shadow-xl z-20"
                    >
                       <p className="text-[#00f0ff] text-[10px] font-mono tracking-widest uppercase mb-1 flex items-center gap-2">
                         <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse shadow-[0_0_10px_#00f0ff]"></span> Location
                       </p>
                       <p className="text-white font-bold text-sm">Tunisia</p>
                    </motion.div>
                 </div>
              </div>
           </motion.div>
        </div>
      </section>

      {/* 4. VIBRANT CYAN DATA STREAM */}
      <div className="relative w-full my-32 py-5 bg-[#00f0ff] border-y border-[#00f0ff]/50 overflow-hidden flex items-center z-20 shadow-[0_0_50px_rgba(0,240,255,0.4)]">
         {/* Fade Edges for smooth entry/exit */}
         <div className="absolute left-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-r from-[#111315] to-transparent z-10 pointer-events-none"></div>
         <div className="absolute right-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-l from-[#111315] to-transparent z-10 pointer-events-none"></div>

         <motion.div 
            animate={{ x: [0, -2000] }} 
            transition={{ repeat: Infinity, ease: "linear", duration: 30 }} 
            className="flex whitespace-nowrap gap-16 items-center"
          >
            {/* Repeating the stack array multiple times to ensure a seamless infinite loop */}
            {[...stack, ...stack, ...stack, ...stack, ...stack, ...stack].map((item, i) => (
               <div key={`ticker-${i}`} className="flex items-center gap-16 group cursor-default">
                 <span className="font-black text-xl md:text-2xl tracking-[0.2em] text-[#0a0a0c] hover:text-white transition-colors duration-500 uppercase">
                   {item}
                 </span>
                 <ShieldCheck size={24} className="text-[#0a0a0c]/60 group-hover:text-white group-hover:rotate-12 transition-all duration-300" />
               </div>
            ))}
          </motion.div>
      </div>

      {/* 5. CYBERNETIC SKILL TREE (INNOVATIVE CV) */}
      <section id="resume" className="max-w-7xl mx-auto px-8 md:px-16 py-32 relative z-20">
         <div className="text-center mb-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
               <h2 className="text-[#00f0ff] font-mono text-sm tracking-[0.3em] uppercase mb-4 flex items-center justify-center gap-3">
                 <Cpu size={16} /> 01 // Neural Databanks
               </h2>
               <h3 className="text-white text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">Experience Core</h3>
               <p className="text-white/50 text-sm max-w-xl mx-auto">Neural timeline established. Scrolling initializes memory banks.</p>
            </motion.div>
         </div>

         <div className="relative w-full max-w-4xl mx-auto">
            {/* Glowing Central Backbone */}
            <div className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-1/2 rounded-full overflow-hidden">
                <motion.div 
                   className="absolute top-0 w-full bg-gradient-to-b from-[#00f0ff] via-[#b829ff] to-transparent origin-top"
                   style={{ height: '100%' }}
                   initial={{ scaleY: 0 }}
                   whileInView={{ scaleY: 1 }}
                   viewport={{ once: false, amount: 0.1 }}
                   transition={{ duration: 1.5, ease: "circOut" }}
                />
            </div>

            {/* Timeline Nodes */}
            <div className="space-y-24">
               {/* Node 1: ARSII */}
               <div className="relative flex flex-col md:flex-row items-center justify-between w-full group">
                  <div className="hidden md:block w-5/12"></div>
                  <div className="absolute left-[30px] md:left-1/2 w-5 h-5 bg-[#0d0e10] border-[3px] border-[#00f0ff] rounded-full -translate-x-1/2 z-10 shadow-[0_0_20px_rgba(0,240,255,0.8)] group-hover:scale-150 group-hover:bg-[#00f0ff] transition-all duration-500"></div>
                  <motion.div 
                     initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
                     className="w-full md:w-5/12 pl-16 md:pl-0"
                  >
                     <div className="bg-[#111214]/80 backdrop-blur-xl border border-[#00f0ff]/20 p-8 rounded-3xl relative overflow-hidden group-hover:border-[#00f0ff]/80 transition-colors shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#00f0ff]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <span className="text-[#00f0ff] font-mono text-[10px] tracking-widest uppercase block mb-3 z-10 relative">2025 // ARSII (PFE) - BiteWise</span>
                        <h4 className="text-white text-2xl font-bold mb-2 z-10 relative">React Native Mobile App Intern</h4>
                        <p className="text-white/60 text-sm leading-relaxed mb-6 z-10 relative">
                           Delivered a React Native mobile app for clients and nutrition coaches, including tracking dashboards, coach discovery, connection requests, and messaging. Integrated backend/API features for authentication, profiles, meal logs, requests, and messaging endpoints, and implemented barcode, manual, and recipe meal logging with structured validation. Collaborated in Scrum/Kanban planning with a Git-based workflow.
                        </p>
                        <div className="flex gap-2 flex-wrap z-10 relative">
                           <span className="text-[10px] bg-[#00f0ff]/10 border border-[#00f0ff]/20 px-3 py-1 rounded-full text-[#00f0ff]">Node.js</span>
                           <span className="text-[10px] bg-[#00f0ff]/10 border border-[#00f0ff]/20 px-3 py-1 rounded-full text-[#00f0ff]">MongoDB</span>
                           <span className="text-[10px] bg-[#00f0ff]/10 border border-[#00f0ff]/20 px-3 py-1 rounded-full text-[#00f0ff]">React Native</span>
                           <span className="text-[10px] bg-[#00f0ff]/10 border border-[#00f0ff]/20 px-3 py-1 rounded-full text-[#00f0ff]">FlutterFlow</span>
                           <span className="text-[10px] bg-[#00f0ff]/10 border border-[#00f0ff]/20 px-3 py-1 rounded-full text-[#00f0ff]">Figma</span>
                        </div>
                     </div>
                  </motion.div>
               </div>

               {/* Node 2: Dundill */}
               <div className="relative flex flex-col md:flex-row-reverse items-center justify-between w-full group">
                  <div className="hidden md:block w-5/12"></div>
                  <div className="absolute left-[30px] md:left-1/2 w-5 h-5 bg-[#0d0e10] border-[3px] border-[#b829ff] rounded-full -translate-x-1/2 z-10 shadow-[0_0_20px_rgba(184,41,255,0.8)] group-hover:scale-150 group-hover:bg-[#b829ff] transition-all duration-500"></div>
                  <motion.div 
                     initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
                     className="w-full md:w-5/12 pl-16 md:pl-0 md:text-right"
                  >
                     <div className="bg-[#111214]/80 backdrop-blur-xl border border-[#b829ff]/20 p-8 rounded-3xl relative overflow-hidden group-hover:border-[#b829ff]/80 transition-colors shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-bl from-[#b829ff]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <span className="text-[#b829ff] font-mono text-[10px] tracking-widest uppercase block mb-3 z-10 relative">Jun 2024 - Aug 2024 // Dundill</span>
                        <h4 className="text-white text-2xl font-bold mb-2 z-10 relative">Intern Developer</h4>
                        <p className="text-white/60 text-sm leading-relaxed mb-6 z-10 relative">
                           Contributed to a web application using HTML, CSS, JavaScript, Bootstrap, and React, improving layout consistency and responsiveness. Supported debugging and feature implementation in close collaboration with the development team.
                        </p>
                        <div className="flex gap-2 flex-wrap z-10 relative md:justify-end">
                           <span className="text-[10px] bg-[#b829ff]/10 border border-[#b829ff]/20 px-3 py-1 rounded-full text-[#b829ff]">HTML/CSS/JS</span>
                           <span className="text-[10px] bg-[#b829ff]/10 border border-[#b829ff]/20 px-3 py-1 rounded-full text-[#b829ff]">Bootstrap</span>
                           <span className="text-[10px] bg-[#b829ff]/10 border border-[#b829ff]/20 px-3 py-1 rounded-full text-[#b829ff]">React</span>
                        </div>
                     </div>
                  </motion.div>
               </div>

               {/* Node 3: Education */}
               <div className="relative flex flex-col md:flex-row items-center justify-between w-full group">
                  <div className="hidden md:block w-5/12"></div>
                  <div className="absolute left-[30px] md:left-1/2 w-5 h-5 bg-[#0d0e10] border-[3px] border-green-400 rounded-full -translate-x-1/2 z-10 shadow-[0_0_20px_rgba(74,222,128,0.8)] group-hover:scale-150 group-hover:bg-green-400 transition-all duration-500"></div>
                  <motion.div 
                     initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
                     className="w-full md:w-5/12 pl-16 md:pl-0"
                  >
                     <div className="bg-[#111214]/80 backdrop-blur-xl border border-green-400/20 p-8 rounded-3xl relative overflow-hidden group-hover:border-green-400/80 transition-colors shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <span className="text-green-400 font-mono text-[10px] tracking-widest uppercase block mb-3 z-10 relative">2025 - Present // ESPRIT</span>
                        <h4 className="text-white text-2xl font-bold mb-2 z-10 relative">Software Engineering Degree</h4>
                        <p className="text-white/50 text-xs italic mb-6 z-10 relative">Currently pursuing advanced software engineering, architecture, and product development modules.</p>
                        
                        <div className="w-full h-px bg-white/5 my-6"></div>

                        <span className="text-green-400 font-mono text-[10px] tracking-widest uppercase block mb-3 z-10 relative">Graduated 2025 // ISIMA</span>
                        <h4 className="text-white text-xl font-bold mb-2 z-10 relative">Bachelor's in Computer Engineering</h4>
                     </div>
                  </motion.div>
               </div>
            </div>
         </div>
      </section>

      {/* 6. CINEMATIC INTERACTIVE PROJECTS SECTION */}
      <section id="portfolio" className="max-w-7xl mx-auto px-8 md:px-16 py-32 relative z-20">
         
         <div className="mb-20 text-center">
            <h2 className="text-[#00f0ff] font-mono text-xs tracking-[0.3em] uppercase mb-4">02 // Featured Works</h2>
            <h3 className="text-white text-5xl md:text-7xl font-black uppercase tracking-tighter">Projects</h3>
            <p className="text-white/50 mt-4 max-w-xl mx-auto">Select any module to initialize case study protocols.</p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Project 1: BiteWise */}
            <Link href="/projects/bitewise-case-study" onClick={markPortfolioSectionInHistory} className="group block relative w-full h-[450px] md:h-[500px] rounded-[2rem] overflow-hidden cursor-pointer transform-gpu transition-all duration-700 hover:scale-[1.02] hover:-translate-y-2 shadow-2xl shadow-black/80 border border-white/5 hover:border-[#00f0ff]/50">
               <div className="absolute inset-0 bg-[#0c0d10] z-0"></div>
               
               {/* BACKGROUND VIDEO LAYER - REPLACE WITH YOUR VIDEO */}
               {/* Instructions: Put 'bitewise.mp4' in your Next.js 'public' folder and update the src below! */}
               <div className="absolute inset-0 z-0 h-full w-full overflow-hidden opacity-50 group-hover:opacity-100 transition-opacity duration-700">
                  <video autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-[70%] object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000 grayscale group-hover:grayscale-0">
                     <source src="/bitewise.mp4" type="video/mp4" />
                  </video>
                  {/* This gradient fades the bottom of the video perfectly into the card */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d10] via-[#0c0d10]/80 to-transparent"></div>
               </div>

               {/* Simulated Animation Fallback (Shows if video fails) */}
               <div className="absolute inset-0 z-0 opacity-10 group-hover:opacity-30 transition-opacity duration-700 mix-blend-screen pointer-events-none">
                   <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 25, ease: "linear" }} className="absolute -inset-[50%] bg-[conic-gradient(from_0deg,transparent_0_340deg,#00f0ff_360deg)] opacity-30"></motion.div>
               </div>

               {/* Content */}
               <div className="relative z-10 w-full h-full p-8 md:p-10 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                  <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                     <span className="inline-block text-[#00f0ff] font-mono text-[10px] uppercase tracking-widest bg-[#00f0ff]/10 px-4 py-1.5 rounded-full mb-6 border border-[#00f0ff]/20 backdrop-blur-md">Web & Mobile</span>
                     <h4 className="text-white text-3xl md:text-5xl font-black mb-4">BiteWise</h4>
                     <p className="text-white/60 text-sm md:text-base leading-relaxed mb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        A full-stack role-based digital nutrition coaching platform with real-time tracking, mentor discovery, and complex meal logging flows.
                     </p>
                     
                     <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                        <div className="flex gap-3 text-[10px] font-mono text-[#00f0ff]">
                           <span className="bg-[#00f0ff]/10 border border-[#00f0ff]/20 px-3 py-1.5 rounded-full">Node.js</span>
                           <span className="bg-[#00f0ff]/10 border border-[#00f0ff]/20 px-3 py-1.5 rounded-full">MongoDB</span>
                        </div>
                        <div className="flex items-center justify-center w-12 h-12 bg-[#00f0ff] text-black rounded-full group-hover:rotate-45 transition-transform duration-500">
                           <ArrowRight size={20} />
                        </div>
                     </div>
                  </div>
               </div>
            </Link>

            {/* Project 2: AgriSmart */}
            <Link href="/projects/agrismart-case-study" onClick={markPortfolioSectionInHistory} className="group block relative w-full h-[450px] md:h-[500px] rounded-[2rem] overflow-hidden cursor-pointer transform-gpu transition-all duration-700 hover:scale-[1.02] hover:-translate-y-2 shadow-2xl shadow-black/80 border border-white/5 hover:border-green-400/50">
               <div className="absolute inset-0 bg-[#0c0d10] z-0"></div>
               
               {/* BACKGROUND VIDEO LAYER - REPLACE WITH YOUR VIDEO */}
               {/* Instructions: Put 'agrismart.mp4' in your Next.js 'public' folder and update the src below! */}
               <div className="absolute inset-0 z-0 h-full w-full overflow-hidden opacity-50 group-hover:opacity-100 transition-opacity duration-700">
                  <video autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-[70%] object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000 grayscale group-hover:grayscale-0">
                     <source src="/agrismart.mp4" type="video/mp4" />
                  </video>
                  {/* Fading Mask */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d10] via-[#0c0d10]/80 to-transparent"></div>
               </div>

               {/* Simulated Video Fallback */}
               <div className="absolute inset-0 z-0 opacity-10 group-hover:opacity-30 transition-opacity duration-700 overflow-hidden mix-blend-screen pointer-events-none">
                   <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(74,222,128,0.5)_0%,transparent_70%)] group-hover:scale-150 transition-transform duration-1000 ease-out"></div>
               </div>

               <div className="relative z-10 w-full h-full p-8 md:p-10 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                  <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                     <span className="inline-block text-green-400 font-mono text-[10px] uppercase tracking-widest bg-green-400/10 px-4 py-1.5 rounded-full mb-6 border border-green-400/20 backdrop-blur-md">Full-Stack</span>
                     <h4 className="text-white text-3xl md:text-5xl font-black mb-4">AgriSmart</h4>
                     <p className="text-white/60 text-sm md:text-base leading-relaxed mb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        Scalable agricultural marketplace aligning real business flows. Features real-time order management and AI-chatbot guidance.
                     </p>
                     
                     <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                        <div className="flex gap-3 text-[10px] font-mono text-green-400">
                           <span className="bg-green-400/10 border border-green-400/20 px-3 py-1.5 rounded-full">Symfony</span>
                           <span className="bg-green-400/10 border border-green-400/20 px-3 py-1.5 rounded-full">Docker</span>
                        </div>
                        <div className="flex items-center justify-center w-12 h-12 bg-green-400 text-black rounded-full group-hover:rotate-45 transition-transform duration-500">
                           <ArrowRight size={20} />
                        </div>
                     </div>
                  </div>
               </div>
            </Link>

            {/* Project 3: Delivery App */}
            <Link href="/projects/delivery-app-case-study" onClick={markPortfolioSectionInHistory} className="group block relative w-full h-[450px] md:h-[500px] rounded-[2rem] overflow-hidden cursor-pointer transform-gpu transition-all duration-700 hover:scale-[1.02] hover:-translate-y-2 shadow-2xl shadow-black/80 border border-white/5 hover:border-orange-400/50">
               <div className="absolute inset-0 bg-[#0c0d10] z-0"></div>
               
               {/* BACKGROUND VIDEO LAYER - REPLACE WITH YOUR VIDEO */}
               {/* Instructions: Put 'delivery.mp4' in your Next.js 'public' folder and update the src below! */}
               <div className="absolute inset-0 z-0 h-full w-full overflow-hidden opacity-50 group-hover:opacity-100 transition-opacity duration-700">
                  <video autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-[70%] object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000 grayscale group-hover:grayscale-0">
                     <source src="/delivery.mp4" type="video/mp4" />
                  </video>
                  {/* Fading Mask */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d10] via-[#0c0d10]/80 to-transparent"></div>
               </div>

               {/* Simulated Video Fallback */}
               <div className="absolute inset-0 z-0 opacity-10 group-hover:opacity-30 transition-opacity duration-700 overflow-hidden mix-blend-screen pointer-events-none">
                   <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }} className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(251,146,60,0.6)_0%,transparent_50%)]"></motion.div>
               </div>

               <div className="relative z-10 w-full h-full p-8 md:p-10 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                  <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                     <span className="inline-block text-orange-400 font-mono text-[10px] uppercase tracking-widest bg-orange-400/10 px-4 py-1.5 rounded-full mb-6 border border-orange-400/20 backdrop-blur-md">Mobile UI/UX</span>
                     <h4 className="text-white text-3xl md:text-5xl font-black mb-4">Delivery App</h4>
                     <p className="text-white/60 text-sm md:text-base leading-relaxed mb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        Comprehensive delivery lifecycle mobile app focused on intuitive user workflows, order captures, and automated assignments.
                     </p>
                     
                     <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                        <div className="flex gap-3 text-[10px] font-mono text-orange-400">
                           <span className="bg-orange-400/10 border border-orange-400/20 px-3 py-1.5 rounded-full">FlutterFlow</span>
                        </div>
                        <div className="flex items-center justify-center w-12 h-12 bg-orange-400 text-black rounded-full group-hover:rotate-45 transition-transform duration-500">
                           <ArrowRight size={20} />
                        </div>
                     </div>
                  </div>
               </div>
            </Link>

            {/* Project 4: GNS3 */}
            <Link href="/projects/networking-gns3-case-study" onClick={markPortfolioSectionInHistory} className="group block relative w-full h-[450px] md:h-[500px] rounded-[2rem] overflow-hidden cursor-pointer transform-gpu transition-all duration-700 hover:scale-[1.02] hover:-translate-y-2 shadow-2xl shadow-black/80 border border-white/5 hover:border-purple-400/50">
               <div className="absolute inset-0 bg-[#0c0d10] z-0"></div>
               
               {/* BACKGROUND VIDEO LAYER - REPLACE WITH YOUR VIDEO */}
               {/* Instructions: Put 'gns3.mp4' in your Next.js 'public' folder and update the src below! */}
               <div className="absolute inset-0 z-0 h-full w-full overflow-hidden opacity-50 group-hover:opacity-100 transition-opacity duration-700">
                  <video autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-[70%] object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000 grayscale group-hover:grayscale-0">
                     <source src="/gns3.mp4" type="video/mp4" />
                  </video>
                  {/* Fading Mask */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d10] via-[#0c0d10]/80 to-transparent"></div>
               </div>

               {/* Simulated Video Fallback */}
               <div className="absolute inset-0 z-0 opacity-10 group-hover:opacity-30 transition-opacity duration-700 overflow-hidden mix-blend-screen pointer-events-none flex items-center justify-center">
                   {[...Array(3)].map((_, i) => (
                      <motion.div key={i} animate={{ scale: [1, 2.5], opacity: [0.8, 0] }} transition={{ repeat: Infinity, duration: 4, delay: i * 1.3 }} className="absolute w-[200px] h-[200px] border-2 border-purple-500 rounded-full" />
                   ))}
               </div>

               <div className="relative z-10 w-full h-full p-8 md:p-10 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                  <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                     <span className="inline-block text-purple-400 font-mono text-[10px] uppercase tracking-widest bg-purple-400/10 px-4 py-1.5 rounded-full mb-6 border border-purple-400/20 backdrop-blur-md">Infra & Labs</span>
                     <h4 className="text-white text-3xl md:text-5xl font-black mb-4">Multi-Site VPN</h4>
                     <p className="text-white/60 text-sm md:text-base leading-relaxed mb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        Designed and validated a massive multi-site topology leveraging OSPF backbone routing and robust perimeter security with GRE/IPsec.
                     </p>
                     
                     <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                        <div className="flex gap-3 text-[10px] font-mono text-purple-400">
                           <span className="bg-purple-400/10 border border-purple-400/20 px-3 py-1.5 rounded-full">GNS3</span>
                           <span className="bg-purple-400/10 border border-purple-400/20 px-3 py-1.5 rounded-full">OSPF/IPsec</span>
                        </div>
                        <div className="flex items-center justify-center w-12 h-12 bg-purple-400 text-black rounded-full group-hover:rotate-45 transition-transform duration-500">
                           <ArrowRight size={20} />
                        </div>
                     </div>
                  </div>
               </div>
            </Link>
         </div>
      </section>

      {/* 7. CINEMATIC FOOTER & CONTACT */}
      <section id="contact" className="relative max-w-7xl mx-auto px-8 md:px-16 pt-32 md:pt-48 pb-10 z-20 flex flex-col items-center justify-center text-center">
         <p className="text-[#00f0ff] font-mono text-sm tracking-[0.3em] uppercase mb-8">03 // What's Next?</p>
         <h2 className="text-white text-5xl md:text-[8rem] font-black uppercase tracking-tighter leading-[0.85] mb-12">
            Let's Build <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#00f0ff]/50">Something.</span>
         </h2>
         
         {/* Magnetic Glowing Button Effect */}
           <motion.a 
            href={directMailTo}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group mb-32 inline-block cursor-none outline-none"
         >
            <div className="absolute inset-0 bg-[#00f0ff] blur-lg opacity-20 group-hover:opacity-60 transition-opacity duration-500 rounded-full"></div>
            <div className="relative bg-[#111315] border border-[#00f0ff]/50 px-10 py-5 rounded-full flex items-center gap-4 transition-all duration-300 group-hover:bg-[#00f0ff]">
               <span className="text-white font-bold uppercase tracking-widest text-sm group-hover:text-black transition-colors">Email Me Directly</span>
               <ArrowRight size={18} className="text-[#00f0ff] group-hover:text-black transition-colors" />
            </div>
         </motion.a>

         <div className="w-full flex flex-col md:flex-row items-center justify-between border-t border-white/10 pt-8 text-white/40 text-xs font-mono uppercase tracking-widest">
            <p>© {new Date().getFullYear()} Aya Fdhila.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
               <a href="https://linkedin.com/in/eya-fdhila" className="hover:text-[#00f0ff] transition-colors">LinkedIn</a>
               <a href="https://github.com/aya284" className="hover:text-[#00f0ff] transition-colors">GitHub</a>
            </div>
         </div>
      </section>

      {/* 8. CYBERNETIC CONTACT MODAL (IN-PORTFOLIO CONVERSATION) */}
      <AnimatePresence>
        {isContactModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-[#0c0d10]/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-2xl bg-[#111214] border border-[#00f0ff]/30 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent opacity-50"></div>
              
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b border-white/5 bg-white/[0.02]">
                <div className="flex items-center gap-3">
                  <Terminal size={20} className="text-[#00f0ff]" />
                  <span className="text-white font-mono text-sm tracking-widest uppercase">Secure Channel</span>
                </div>
                <button 
                  onClick={() => setIsContactModalOpen(false)}
                 
                  className="text-white/50 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Body */}
              <div className="p-8">
                {contactStep === 0 && (
                  <motion.form 
                    ref={formRef}
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6"
                    onSubmit={(e) => {
                      e.preventDefault();
                                 if (!contactForm.name || !contactForm.message || !contactForm.email) return;
                                 setContactStep(1);
                      // IMPORTANT: YOU MUST CREATE AN EMAILJS ACCOUNT AND REPLACE THESE 3 IDS!
                      // 1. Service ID
                      // 2. Template ID
                      // 3. Public Key
                      emailjs.sendForm('service_m2hxngv', 'template_9lo2vui', formRef.current!, 'xaUPIKe4Hya_FusS_')
                                    .then(() => {
                                       setContactStep(2);
                                    }, () => {
                                       setContactStep(3); // Error step fallback
                                       setTimeout(() => {
                                          window.location.href = `mailto:ayafdhila@gmail.com?subject=Portfolio Inquiry from ${contactForm.name}&body=${contactForm.message} (From: ${contactForm.email})`;
                                       }, 1500);
                                    });
                    }}
                  >
                    <p className="text-white/60 text-sm font-light mb-8">Initiate a direct transmission. Your message will be encrypted and routed to my personal inbox.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[#00f0ff] font-mono text-[10px] uppercase tracking-widest pl-1">Ident</label>
                        <input 
                          type="text" 
                          name="user_name"
                          placeholder="Your Name"
                          value={contactForm.name}
                          onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                          className="w-full bg-[#0c0d10] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00f0ff]/50 transition-colors placeholder:text-white/20"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[#00f0ff] font-mono text-[10px] uppercase tracking-widest pl-1">Return Address</label>
                        <input 
                          type="email" 
                          name="user_email"
                          placeholder="you@domain.com"
                          value={contactForm.email}
                          onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                          className="w-full bg-[#0c0d10] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00f0ff]/50 transition-colors placeholder:text-white/20"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-[#00f0ff] font-mono text-[10px] uppercase tracking-widest pl-1">Payload</label>
                      <textarea 
                        name="message"
                        rows={4}
                        placeholder="Type your message here..."
                        value={contactForm.message}
                        onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                        className="w-full bg-[#0c0d10] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00f0ff]/50 transition-colors placeholder:text-white/20 resize-none"
                        required
                      ></textarea>
                    </div>

                    <div className="pt-4 flex justify-end">
                      <button 
                        type="submit"
                        disabled={!contactForm.name || !contactForm.message || !contactForm.email}
                       
                        className={`flex items-center gap-3 px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs transition-all ${
                          !contactForm.name || !contactForm.message || !contactForm.email
                          ? 'bg-white/5 text-white/30 cursor-not-allowed' 
                          : 'bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30 hover:bg-[#00f0ff] hover:text-black'
                        }`}
                      >
                        Transmit <Send size={14} />
                      </button>
                    </div>
                  </motion.form>
                )}

                {contactStep === 1 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 flex flex-col items-center justify-center text-center space-y-6">
                     <div className="w-16 h-16 border-2 border-[#00f0ff]/20 border-t-[#00f0ff] rounded-full animate-spin"></div>
                     <p className="text-[#00f0ff] font-mono tracking-widest text-sm uppercase animate-pulse">Encrypting Payload...</p>
                  </motion.div>
                )}

                {contactStep === 2 && (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-16 flex flex-col items-center justify-center text-center space-y-6">
                     <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-500">
                        <ShieldCheck size={40} />
                     </div>
                     <div>
                       <h3 className="text-white text-2xl font-bold mb-2">Transmission Logged</h3>
                       <p className="text-white/60 text-sm">Your message has been successfully encrypted and routed to the secure server.</p>
                     </div>
                     <button 
                        onClick={() => setIsContactModalOpen(false)}
                        className="mt-6 text-[#00f0ff] font-mono text-xs uppercase tracking-widest hover:text-white transition-colors"
                     >
                       [ Close Terminal ]
                     </button>
                  </motion.div>
                )}

                {contactStep === 3 && (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-16 flex flex-col items-center justify-center text-center space-y-6">
                     <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500">
                        <X size={40} />
                     </div>
                     <div>
                       <h3 className="text-white text-2xl font-bold mb-2">Transmission Failed</h3>
                       <p className="text-white/60 text-sm">Main routing failed. Opening local mail client as fallback.</p>
                     </div>
                     <button 
                        onClick={() => {
                          setContactStep(0);
                          setContactForm({ name: '', email: '', message: '' });
                        }}
                        className="mt-6 text-red-400 font-mono text-xs uppercase tracking-widest hover:text-white transition-colors"
                     >
                       [ Retry Connection ]
                     </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

