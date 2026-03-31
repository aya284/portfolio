"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useReducedMotion } from "framer-motion";
import { Mail, Code, Download, ShieldCheck, ArrowRight, User, Cpu, Github, Linkedin, X, Send, Terminal, Briefcase, FileText } from "lucide-react";

export default function Home() {
   const RETURN_ANCHOR_KEY = "portfolio:return-anchor";
  const [mousePos, setMousePosition] = useState({ x: -1000, y: -1000 });
   const [hasFinePointer, setHasFinePointer] = useState(false);
   const [isDockVisible, setIsDockVisible] = useState(true);
   const [activeSection, setActiveSection] = useState("home");
   const [isMobilePhotoTouched, setIsMobilePhotoTouched] = useState(false);
   const [isPageVisible, setIsPageVisible] = useState(true);
  const [scrambledText, setScrambledText] = useState("Full-Stack Developer");
   const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactStep, setContactStep] = useState(0); // 0: form, 1: sending, 2: success, 3: error
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const formRef = useRef<HTMLFormElement>(null);
   const prefersReducedMotion = useReducedMotion();
  
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
      const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
      const syncPointerMode = () => setHasFinePointer(pointerQuery.matches);
      syncPointerMode();

      // Mouse tracking is desktop-only; touch devices use static lighting.
      const updateMousePosition = (e: MouseEvent) => {
         setMousePosition({ x: e.clientX, y: e.clientY });
      };
      if (pointerQuery.matches) {
         window.addEventListener("mousemove", updateMousePosition);
      }
      pointerQuery.addEventListener("change", syncPointerMode);

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

    return () => {
         window.removeEventListener("mousemove", updateMousePosition);
         pointerQuery.removeEventListener("change", syncPointerMode);
      clearInterval(interval);
    };
  }, []);

   useEffect(() => {
      let lastY = window.scrollY;

      const handleScroll = () => {
         const currentY = window.scrollY;
         const delta = currentY - lastY;

         if (currentY < 80) {
            setIsDockVisible(true);
         } else if (delta > 8) {
            setIsDockVisible(false);
         } else if (delta < -8) {
            setIsDockVisible(true);
         }

         lastY = currentY;
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
   }, []);

   useEffect(() => {
      if (typeof window === "undefined") return;

      const savedAnchor = window.sessionStorage.getItem(RETURN_ANCHOR_KEY);
      if (savedAnchor !== "portfolio") return;

      const portfolioSection = document.getElementById("portfolio");
      if (!portfolioSection) return;

      portfolioSection.scrollIntoView({ behavior: "smooth", block: "start" });
      if (window.location.hash !== "#portfolio") {
         window.history.replaceState(window.history.state, "", "/#portfolio");
      }

      window.sessionStorage.removeItem(RETURN_ANCHOR_KEY);
   }, []);

   useEffect(() => {
      const sections = ["home", "resume", "portfolio", "contact"]
         .map((id) => document.getElementById(id))
         .filter(Boolean) as HTMLElement[];

      if (!sections.length) return;

      const observer = new IntersectionObserver(
         (entries) => {
            const visible = entries
               .filter((entry) => entry.isIntersecting)
               .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

            if (visible?.target?.id) {
               setActiveSection(visible.target.id);
            }
         },
         {
            root: null,
            threshold: [0.25, 0.5, 0.75],
            rootMargin: "-20% 0px -45% 0px",
         }
      );

      sections.forEach((section) => observer.observe(section));
      return () => observer.disconnect();
   }, []);

   useEffect(() => {
      const handleVisibility = () => {
         setIsPageVisible(document.visibilityState === "visible");
      };

      handleVisibility();
      document.addEventListener("visibilitychange", handleVisibility);
      return () => document.removeEventListener("visibilitychange", handleVisibility);
   }, []);

   const shouldRunPreviewAmbient = hasFinePointer && !prefersReducedMotion;

   const stack = ["Symfony (PHP)", "Node.js REST APIs", "React Native", "FlutterFlow", "MongoDB", "Docker", "GNS3 OSPF & GRE/IPsec"];
   const directMailTo = "mailto:ayafdhila@gmail.com?subject=Project%20Collaboration%20with%20Aya%20Fdhila&body=Hi%20Aya%2C%0A%0AI%20saw%20your%20portfolio%20and%20I%20would%20like%20to%20discuss%20a%20project.%0A";

   const ProjectPreviewMedia = ({
      projectId,
      videoSrc,
   }: {
      projectId: string;
      videoSrc: string;
   }) => {
      const mediaRef = useRef<HTMLDivElement>(null);
      const [isInView, setIsInView] = useState(false);

      useEffect(() => {
         const node = mediaRef.current;
         if (!node) return;

         const observer = new IntersectionObserver(
            ([entry]) => {
               setIsInView(entry.isIntersecting);
            },
            {
               root: null,
               threshold: 0.55,
               rootMargin: "80px 0px 80px 0px",
            }
         );

         observer.observe(node);
         return () => observer.disconnect();
      }, []);

      const shouldPreview = isPageVisible && isInView;

      return (
         <div ref={mediaRef} className="absolute inset-0 z-0 h-full w-full overflow-hidden opacity-80 md:opacity-50 md:group-hover:opacity-100 transition-opacity duration-700">
            <video
               autoPlay={shouldPreview}
               loop
               muted
               playsInline
               preload="none"
               className={`absolute top-0 left-0 w-full h-[70%] object-cover transition-all duration-500 ${
                  shouldPreview ? "opacity-85 md:group-hover:scale-105" : "opacity-0"
               }`}
            >
               {shouldPreview && <source src={videoSrc} type="video/mp4" />}
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d10] via-[#0c0d10]/80 to-transparent"></div>
         </div>
      );
   };

  return (
   <div className="min-h-screen bg-[#111315] text-[#b0b3b8] font-sans selection:bg-[#00f0ff] selection:text-black pb-24 md:pb-28 overflow-x-hidden relative">
      <motion.div
         className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left bg-gradient-to-r from-[#00f0ff] via-[#72f6ff] to-[#b9fcff] shadow-[0_0_14px_rgba(0,240,255,0.55)]"
         style={{ scaleX: scrollYProgress }}
      />
      
      {/* 1. INTERACTIVE MOUSE FLASHLIGHT AND GRID */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-grid opacity-30"></div>
         {hasFinePointer ? (
            <div 
               className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-300"
               style={{
                  background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0,240,255,0.06), transparent 40%)`
               }}
            />
         ) : (
            <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_50%_18%,rgba(0,240,255,0.08),transparent_45%)]" />
         )}

      {/* 2. FLOATING APPLE-STYLE DOCK NAV (Instead of standard top-nav) */}
      <motion.nav 
        initial={{ y: 100, opacity: 0, x: "-50%" }}
        animate={{ y: 0, opacity: 1, x: "-50%" }}
        transition={{ duration: 1, delay: 0.5, type: "spring" }}
         className={`fixed bottom-3 md:bottom-6 lg:bottom-8 left-1/2 z-50 w-[calc(100vw-1rem)] sm:w-auto max-w-[calc(100vw-1rem)] bg-[#151719]/80 backdrop-blur-xl border border-white/10 rounded-full px-2.5 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 flex items-center justify-center gap-1.5 sm:gap-4 md:gap-8 shadow-2xl shadow-black/50 transition-transform duration-300 ${isDockVisible ? "translate-y-0" : "translate-y-[140%]"} md:translate-y-0`}
            style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
      >
        <Link href="#home" className={`transition-all hover:scale-110 flex items-center justify-center p-2 rounded-full border ${activeSection === "home" ? "text-[#00f0ff] border-[#00f0ff]/40 bg-[#00f0ff]/10" : "text-white border-transparent hover:text-[#00f0ff]"}`}><User size={20} /></Link>
            <Link
               href="#resume"
               aria-label="Jump to experience section"
               title="Experience"
               className={`transition-all hover:scale-110 flex items-center justify-center p-2 rounded-full border ${activeSection === "resume" ? "text-[#00f0ff] border-[#00f0ff]/40 bg-[#00f0ff]/10" : "text-white border-transparent hover:text-[#00f0ff]"}`}
            >
               <Briefcase size={20} />
            </Link>
            <Link
               href="#portfolio"
               aria-label="Jump to portfolio section"
               title="Projects"
               className={`transition-all hover:scale-110 flex items-center justify-center p-2 rounded-full border ${activeSection === "portfolio" ? "text-[#00f0ff] border-[#00f0ff]/40 bg-[#00f0ff]/10" : "text-white border-transparent hover:text-[#00f0ff]"}`}
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
      <button
         type="button"
         aria-label="Open resume preview"
         title="View Resume"
         onClick={() => setIsResumeModalOpen(true)}
         className="text-[#00f0ff] hover:text-white transition-all hover:scale-110 flex items-center justify-center p-2"
      >
         <Download size={20} />
      </button>
      </motion.nav>

      {/* 3. HERO SECTION - EDITORIAL LAYOUT */}
      <motion.section
         id="home"
         initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
         whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
         transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: "easeOut" }}
         viewport={{ once: true, amount: 0.15 }}
         className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-16 pt-16 sm:pt-20 md:pt-28 pb-10 sm:pb-12 md:pb-0 min-h-[68vh] sm:min-h-[74vh] md:min-h-[90vh] flex items-center border-b border-white/5"
      >
        
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center w-full z-10 pointer-events-none">
           
           <div className="lg:col-span-7 relative z-20 pointer-events-auto">
             <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <p className="text-[#00f0ff] font-mono text-[10px] sm:text-sm tracking-[0.14em] sm:tracking-[0.3em] uppercase mb-5 sm:mb-6 flex flex-wrap items-center gap-2 sm:gap-4 max-w-full leading-relaxed">
                           <span className="hidden sm:block w-8 h-px bg-[#00f0ff]"></span> Software Engineering Student | Junior Full-Stack / Mobile Developer
                </p>
                <div className="mb-7 flex items-center justify-between gap-4 sm:gap-6 lg:block">
                   <h1 className="flex-1 text-white text-4xl sm:text-6xl md:text-[8rem] font-black uppercase tracking-tighter leading-[0.88] mb-0 lg:mb-6">
                      AYA <br/>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#00f0ff]/50">FDHILA</span>
                   </h1>

                   {/* Mobile Hero Image with animated rings */}
                   <div className="lg:hidden mb-0 pointer-events-auto shrink-0">
                      <motion.div
                         animate={prefersReducedMotion ? undefined : { scale: [1, 1.028, 1] }}
                         transition={{ repeat: Infinity, duration: 5.2, ease: "easeInOut" }}
                         className="relative w-[124px] h-[124px] sm:w-[152px] sm:h-[152px]"
                      >
                         <div className="absolute inset-0 bg-[#00f0ff]/18 blur-[44px] rounded-full scale-125 transform-gpu" />
                         <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 26, ease: "linear" }}
                            className="absolute -inset-2 border border-white/10 rounded-full border-t-[#00f0ff]/60"
                         />
                         <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
                            className="absolute -inset-4 border border-white/5 rounded-full border-b-[#b829ff]/35"
                         />
                         <div
                            className="w-full h-full rounded-full overflow-hidden border-2 border-white/10 relative bg-[#0a0a0a] shadow-[0_0_28px_rgba(0,0,0,0.55)] z-10"
                            onTouchStart={() => setIsMobilePhotoTouched(true)}
                            onTouchEnd={() => setIsMobilePhotoTouched(false)}
                            onTouchCancel={() => setIsMobilePhotoTouched(false)}
                         >
                            <motion.div
                               animate={{ y: [-1.5, 1.5, -1.5] }}
                               transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut" }}
                               className="w-full h-full relative"
                            >
                               <Image
                                  src="/profile.png"
                                  alt="Aya Fdhila"
                                  fill
                                  sizes="(max-width: 640px) 124px, 152px"
                                  priority
                                  className={`object-cover filter contrast-125 brightness-90 transition-all duration-300 ${
                                     isMobilePhotoTouched ? "grayscale-0 contrast-100 brightness-100" : "grayscale"
                                  }`}
                               />
                               <div className="absolute inset-0 rounded-full shadow-[inset_0_0_48px_rgba(0,0,0,0.7)] pointer-events-none"></div>
                            </motion.div>
                         </div>
                      </motion.div>
                   </div>
                </div>
                
                {/* Hacker Scramble Text */}
                <div className="bg-white/5 border border-white/10 px-5 md:px-6 py-3 rounded-lg inline-block backdrop-blur-sm mb-8 md:mb-10">
                   <p className="text-[#00f0ff] font-mono text-md md:text-lg tracking-widest">{scrambledText}</p>
                </div>

                <div className="flex gap-6 max-w-xl text-sm text-white/70 leading-7 font-light">
                   <p>Software Engineering student at ESPRIT and Computer Engineering graduate (ISIMA&apos;25). I build full-stack web and mobile products across Symfony, Node.js, React Native, and FlutterFlow with a clean architecture mindset.</p>
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                   <Link
                      href="#portfolio"
                      className="inline-flex items-center gap-2 rounded-full border border-[#00f0ff]/40 bg-[#00f0ff]/10 px-5 py-2.5 text-xs font-bold tracking-[0.14em] uppercase text-[#00f0ff] hover:bg-[#00f0ff] hover:text-black transition-colors"
                   >
                      View Projects <ArrowRight size={14} />
                   </Link>
                   <Link
                      href="#contact"
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-xs font-bold tracking-[0.14em] uppercase text-white hover:border-white/35 hover:bg-white/[0.08] transition-colors"
                   >
                      Contact Me
                   </Link>
                   <button
                      type="button"
                      onClick={() => setIsResumeModalOpen(true)}
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-xs font-bold tracking-[0.14em] uppercase text-white hover:border-[#00f0ff]/50 hover:text-[#00f0ff] transition-colors"
                   >
                      View Resume <FileText size={14} />
                   </button>
                </div>

                <div className="mt-10 md:mt-12 flex flex-wrap items-center gap-4 md:gap-6">
                   <span className="flex items-center gap-2 text-[11px] md:text-xs font-bold text-white uppercase tracking-[0.12em] md:tracking-widest bg-white/10 px-4 py-2 rounded-full backdrop-blur-md">
                     <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div> Available for work
                   </span>
                   {/* Direct Social Links */}
                   <div className="flex gap-3 md:gap-4">
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
                         <Image
                            src="/profile.png"
                            alt="Aya Fdhila"
                            fill
                            sizes="(min-width: 1024px) 380px, 0px"
                            priority
                            className="object-cover filter grayscale contrast-125 brightness-90 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 transition-all duration-700 ease-out"
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
      </motion.section>

      {/* 4. VIBRANT CYAN DATA STREAM */}
      <div className="relative w-full my-14 md:my-20 py-4 md:py-5 bg-[#00f0ff] border-y border-[#00f0ff]/50 overflow-hidden flex items-center z-20 shadow-[0_0_50px_rgba(0,240,255,0.4)]">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-16 py-3 md:py-6">
         <div className="section-divider" />
      </div>

      {/* 5. CYBERNETIC SKILL TREE (INNOVATIVE CV) */}
      <motion.section
         id="resume"
         initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
         whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
         transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: "easeOut" }}
         viewport={{ once: true, amount: 0.12 }}
         className="max-w-7xl mx-auto px-4 sm:px-6 md:px-16 py-14 md:py-28 relative z-20"
      >
         <div className="text-center mb-10 md:mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
               <h2 className="text-[#00f0ff] font-mono text-sm tracking-[0.3em] uppercase mb-4 flex items-center justify-center gap-3">
                 <Cpu size={16} /> 01 // Neural Databanks
               </h2>
               <h3 className="text-white text-3xl md:text-6xl font-black uppercase tracking-tighter mb-4 md:mb-6">Experience Core</h3>
               <p className="text-white/50 text-sm max-w-xl mx-auto">Neural timeline established. Scrolling initializes memory banks.</p>
            </motion.div>
         </div>

         <div className="relative w-full max-w-4xl mx-auto">
            {/* Glowing Central Backbone */}
            <div className="hidden md:block absolute left-[30px] md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-1/2 rounded-full overflow-hidden">
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
            <div className="space-y-8 md:space-y-16">
               {/* Node 1: ARSII */}
               <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between w-full group">
                  <div className="hidden md:block w-5/12"></div>
                  <div className="hidden md:block absolute left-[30px] md:left-1/2 w-5 h-5 bg-[#0d0e10] border-[3px] border-[#00f0ff] rounded-full -translate-x-1/2 z-10 shadow-[0_0_20px_rgba(0,240,255,0.8)] group-hover:scale-150 group-hover:bg-[#00f0ff] transition-all duration-500"></div>
                  <motion.div 
                     initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
                     className="w-full md:w-5/12"
                  >
                     <div className="glass-card glass-card--interactive border-[#00f0ff]/20 p-5 sm:p-6 md:p-8 rounded-2xl md:rounded-3xl relative overflow-hidden group-hover:border-[#00f0ff]/80">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#00f0ff]/10 to-transparent opacity-40 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500"></div>
                        <span className="text-[#00f0ff] font-mono text-[10px] tracking-widest uppercase block mb-3 z-10 relative">2025 // ARSII (PFE) - BiteWise</span>
                        <h4 className="text-white text-xl md:text-2xl font-bold mb-2 z-10 relative">React Native Mobile App Intern</h4>
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
               <div className="relative flex flex-col md:flex-row-reverse items-start md:items-center justify-between w-full group">
                  <div className="hidden md:block w-5/12"></div>
                  <div className="hidden md:block absolute left-[30px] md:left-1/2 w-5 h-5 bg-[#0d0e10] border-[3px] border-[#b829ff] rounded-full -translate-x-1/2 z-10 shadow-[0_0_20px_rgba(184,41,255,0.8)] group-hover:scale-150 group-hover:bg-[#b829ff] transition-all duration-500"></div>
                  <motion.div 
                     initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
                     className="w-full md:w-5/12 md:text-right"
                  >
                     <div className="glass-card glass-card--interactive border-[#b829ff]/20 p-5 sm:p-6 md:p-8 rounded-2xl md:rounded-3xl relative overflow-hidden group-hover:border-[#b829ff]/80">
                        <div className="absolute inset-0 bg-gradient-to-bl from-[#b829ff]/10 to-transparent opacity-40 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500"></div>
                        <span className="text-[#b829ff] font-mono text-[10px] tracking-widest uppercase block mb-3 z-10 relative">Jun 2024 - Aug 2024 // Dundill</span>
                        <h4 className="text-white text-xl md:text-2xl font-bold mb-2 z-10 relative">Intern Developer</h4>
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
               <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between w-full group">
                  <div className="hidden md:block w-5/12"></div>
                  <div className="hidden md:block absolute left-[30px] md:left-1/2 w-5 h-5 bg-[#0d0e10] border-[3px] border-green-400 rounded-full -translate-x-1/2 z-10 shadow-[0_0_20px_rgba(74,222,128,0.8)] group-hover:scale-150 group-hover:bg-green-400 transition-all duration-500"></div>
                  <motion.div 
                     initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
                     className="w-full md:w-5/12"
                  >
                     <div className="glass-card glass-card--interactive border-green-400/20 p-5 sm:p-6 md:p-8 rounded-2xl md:rounded-3xl relative overflow-hidden group-hover:border-green-400/80">
                        <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-transparent opacity-40 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500"></div>
                        <span className="text-green-400 font-mono text-[10px] tracking-widest uppercase block mb-3 z-10 relative">2025 - Present // ESPRIT</span>
                        <h4 className="text-white text-xl md:text-2xl font-bold mb-2 z-10 relative">Software Engineering Degree</h4>
                        <p className="text-white/50 text-xs italic mb-6 z-10 relative">Currently pursuing advanced software engineering, architecture, and product development modules.</p>
                        
                        <div className="w-full h-px bg-white/5 my-6"></div>

                        <span className="text-green-400 font-mono text-[10px] tracking-widest uppercase block mb-3 z-10 relative">Graduated 2025 // ISIMA</span>
                        <h4 className="text-white text-xl font-bold mb-2 z-10 relative">Bachelor&apos;s in Computer Engineering</h4>
                     </div>
                  </motion.div>
               </div>
            </div>
         </div>
      </motion.section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-16 py-2 md:py-6">
         <div className="section-divider" />
      </div>

      {/* 6. CINEMATIC INTERACTIVE PROJECTS SECTION */}
      <motion.section
         id="portfolio"
         initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
         whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
         transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: "easeOut" }}
         viewport={{ once: true, amount: 0.12 }}
         className="max-w-7xl mx-auto px-4 sm:px-6 md:px-16 py-20 md:py-28 relative z-20"
      >
         
         <div className="mb-12 md:mb-16 text-center">
            <h2 className="text-[#00f0ff] font-mono text-xs tracking-[0.3em] uppercase mb-4">02 // Featured Works</h2>
            <h3 className="text-white text-5xl md:text-7xl font-black uppercase tracking-tighter">Projects</h3>
            <p className="text-white/50 mt-4 max-w-xl mx-auto">Select any module to initialize case study protocols.</p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Project 1: BiteWise */}
            <Link
               prefetch={false}
               href="/projects/bitewise-case-study"
               onClick={markPortfolioSectionInHistory}
               className="group block relative w-full h-[340px] sm:h-[420px] md:h-[500px] rounded-[2rem] overflow-hidden cursor-pointer transform-gpu transition-all duration-700 hover:scale-[1.02] hover:-translate-y-2 shadow-2xl shadow-black/80 border border-white/5 hover:border-[#00f0ff]/50"
            >
               <div className="absolute inset-0 bg-[#0c0d10] z-0"></div>

               <ProjectPreviewMedia projectId="bitewise" videoSrc="/bitewise.mp4" />

               {/* Simulated Animation Fallback (Shows if video fails) */}
               <div className="absolute inset-0 z-0 opacity-10 group-hover:opacity-30 transition-opacity duration-700 mix-blend-screen pointer-events-none">
                     <motion.div animate={shouldRunPreviewAmbient ? { rotate: 360 } : undefined} transition={shouldRunPreviewAmbient ? { repeat: Infinity, duration: 25, ease: "linear" } : undefined} className="absolute -inset-[50%] bg-[conic-gradient(from_0deg,transparent_0_340deg,#00f0ff_360deg)] opacity-30"></motion.div>
               </div>

               {/* Content */}
               <div className="relative z-10 w-full h-full p-8 md:p-10 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                  <div className="translate-y-0 md:translate-y-8 md:group-hover:translate-y-0 transition-transform duration-500 ease-out">
                     <span className="inline-block text-[#00f0ff] font-mono text-[10px] uppercase tracking-widest bg-[#00f0ff]/10 px-4 py-1.5 rounded-full mb-6 border border-[#00f0ff]/20 backdrop-blur-md">Web & Mobile</span>
                     <h4 className="text-white text-3xl md:text-5xl font-black mb-4">BiteWise</h4>
                     <p className="text-white/60 text-sm md:text-base leading-relaxed mb-8 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        A full-stack role-based digital nutrition coaching platform with real-time tracking, mentor discovery, and complex meal logging flows.
                     </p>
                     
                     <div className="flex items-center justify-between opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 delay-200">
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
            <Link
               prefetch={false}
               href="/projects/agrismart-case-study"
               onClick={markPortfolioSectionInHistory}
               className="group block relative w-full h-[340px] sm:h-[420px] md:h-[500px] rounded-[2rem] overflow-hidden cursor-pointer transform-gpu transition-all duration-700 hover:scale-[1.02] hover:-translate-y-2 shadow-2xl shadow-black/80 border border-white/5 hover:border-green-400/50"
            >
               <div className="absolute inset-0 bg-[#0c0d10] z-0"></div>

               <ProjectPreviewMedia projectId="agrismart" videoSrc="/agrismart.mp4" />

               {/* Simulated Video Fallback */}
               <div className="absolute inset-0 z-0 opacity-10 group-hover:opacity-30 transition-opacity duration-700 overflow-hidden mix-blend-screen pointer-events-none">
                   <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(74,222,128,0.5)_0%,transparent_70%)] group-hover:scale-150 transition-transform duration-1000 ease-out"></div>
               </div>

               <div className="relative z-10 w-full h-full p-8 md:p-10 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                  <div className="translate-y-0 md:translate-y-8 md:group-hover:translate-y-0 transition-transform duration-500 ease-out">
                     <span className="inline-block text-green-400 font-mono text-[10px] uppercase tracking-widest bg-green-400/10 px-4 py-1.5 rounded-full mb-6 border border-green-400/20 backdrop-blur-md">Full-Stack</span>
                     <h4 className="text-white text-3xl md:text-5xl font-black mb-4">AgriSmart</h4>
                     <p className="text-white/60 text-sm md:text-base leading-relaxed mb-8 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        Scalable agricultural marketplace aligning real business flows. Features real-time order management and AI-chatbot guidance.
                     </p>
                     
                     <div className="flex items-center justify-between opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 delay-200">
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
            <Link
               prefetch={false}
               href="/projects/delivery-app-case-study"
               onClick={markPortfolioSectionInHistory}
               className="group block relative w-full h-[340px] sm:h-[420px] md:h-[500px] rounded-[2rem] overflow-hidden cursor-pointer transform-gpu transition-all duration-700 hover:scale-[1.02] hover:-translate-y-2 shadow-2xl shadow-black/80 border border-white/5 hover:border-orange-400/50"
            >
               <div className="absolute inset-0 bg-[#0c0d10] z-0"></div>

               <ProjectPreviewMedia projectId="delivery" videoSrc="/delivery.mp4" />

               {/* Simulated Video Fallback */}
               <div className="absolute inset-0 z-0 opacity-10 group-hover:opacity-30 transition-opacity duration-700 overflow-hidden mix-blend-screen pointer-events-none">
                     <motion.div animate={shouldRunPreviewAmbient ? { scale: [1, 1.2, 1], rotate: [0, 5, 0] } : undefined} transition={shouldRunPreviewAmbient ? { repeat: Infinity, duration: 10, ease: "easeInOut" } : undefined} className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(251,146,60,0.6)_0%,transparent_50%)]"></motion.div>
               </div>

               <div className="relative z-10 w-full h-full p-8 md:p-10 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                  <div className="translate-y-0 md:translate-y-8 md:group-hover:translate-y-0 transition-transform duration-500 ease-out">
                     <span className="inline-block text-orange-400 font-mono text-[10px] uppercase tracking-widest bg-orange-400/10 px-4 py-1.5 rounded-full mb-6 border border-orange-400/20 backdrop-blur-md">Mobile UI/UX</span>
                     <h4 className="text-white text-3xl md:text-5xl font-black mb-4">Delivery App</h4>
                     <p className="text-white/60 text-sm md:text-base leading-relaxed mb-8 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        Comprehensive delivery lifecycle mobile app focused on intuitive user workflows, order captures, and automated assignments.
                     </p>
                     
                     <div className="flex items-center justify-between opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 delay-200">
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
            <Link
               prefetch={false}
               href="/projects/networking-gns3-case-study"
               onClick={markPortfolioSectionInHistory}
               className="group block relative w-full h-[340px] sm:h-[420px] md:h-[500px] rounded-[2rem] overflow-hidden cursor-pointer transform-gpu transition-all duration-700 hover:scale-[1.02] hover:-translate-y-2 shadow-2xl shadow-black/80 border border-white/5 hover:border-purple-400/50"
            >
               <div className="absolute inset-0 bg-[#0c0d10] z-0"></div>

               <ProjectPreviewMedia projectId="gns3" videoSrc="/gns3.mp4" />

               {/* Simulated Video Fallback */}
               <div className="absolute inset-0 z-0 opacity-10 group-hover:opacity-30 transition-opacity duration-700 overflow-hidden mix-blend-screen pointer-events-none flex items-center justify-center">
                   {[...Array(3)].map((_, i) => (
                       <motion.div key={i} animate={shouldRunPreviewAmbient ? { scale: [1, 2.5], opacity: [0.8, 0] } : undefined} transition={shouldRunPreviewAmbient ? { repeat: Infinity, duration: 4, delay: i * 1.3 } : undefined} className="absolute w-[200px] h-[200px] border-2 border-purple-500 rounded-full" />
                   ))}
               </div>

               <div className="relative z-10 w-full h-full p-8 md:p-10 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                  <div className="translate-y-0 md:translate-y-8 md:group-hover:translate-y-0 transition-transform duration-500 ease-out">
                     <span className="inline-block text-purple-400 font-mono text-[10px] uppercase tracking-widest bg-purple-400/10 px-4 py-1.5 rounded-full mb-6 border border-purple-400/20 backdrop-blur-md">Infra & Labs</span>
                     <h4 className="text-white text-3xl md:text-5xl font-black mb-4">Multi-Site VPN</h4>
                     <p className="text-white/60 text-sm md:text-base leading-relaxed mb-8 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        Designed and validated a massive multi-site topology leveraging OSPF backbone routing and robust perimeter security with GRE/IPsec.
                     </p>
                     
                     <div className="flex items-center justify-between opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 delay-200">
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
      </motion.section>

      {/* 7. CINEMATIC FOOTER & CONTACT */}
      <motion.section
         id="contact"
         initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
         whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
         transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: "easeOut" }}
         viewport={{ once: true, amount: 0.15 }}
         className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-16 pt-16 md:pt-24 pb-8 md:pb-10 z-20 flex flex-col items-center justify-center text-center"
      >
         <p className="text-[#00f0ff] font-mono text-[11px] tracking-[0.24em] uppercase mb-5">03 // Let&apos;s Collaborate</p>
         <h2 className="text-white text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-6">
            Let&apos;s Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#00f0ff]/60">Something Great</span>
         </h2>
         <p className="max-w-2xl text-white/65 text-sm sm:text-base leading-7 mb-10">
            Available for internships, freelance collaboration, and product-focused engineering roles. If your team is building something meaningful, I would love to contribute.
         </p>
         
         {/* Magnetic Glowing Button Effect */}
           <motion.a 
            href={directMailTo}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group mb-10 md:mb-12 inline-block md:cursor-none outline-none"
         >
            <div className="absolute inset-0 bg-[#00f0ff] blur-lg opacity-20 group-hover:opacity-60 transition-opacity duration-500 rounded-full"></div>
            <div className="relative bg-[#111315] border border-[#00f0ff]/50 px-10 py-5 rounded-full flex items-center gap-4 transition-all duration-300 group-hover:bg-[#00f0ff]">
               <span className="text-white font-bold uppercase tracking-[0.14em] text-xs sm:text-sm group-hover:text-black transition-colors">Start a Project</span>
               <ArrowRight size={18} className="text-[#00f0ff] group-hover:text-black transition-colors" />
            </div>
         </motion.a>

         <div className="w-full max-w-3xl glass-card rounded-2xl px-4 sm:px-6 py-4 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-white/70 text-xs sm:text-sm">
            <a href="mailto:ayafdhila@gmail.com" className="font-mono tracking-wide hover:text-[#00f0ff] transition-colors">ayafdhila@gmail.com</a>
            <div className="flex items-center gap-4">
               <a href="https://linkedin.com/in/eya-fdhila" className="px-3 py-1.5 rounded-full border border-white/15 hover:border-[#00f0ff]/50 hover:text-[#00f0ff] transition-colors">LinkedIn</a>
               <a href="https://github.com/aya284" className="px-3 py-1.5 rounded-full border border-white/15 hover:border-[#00f0ff]/50 hover:text-[#00f0ff] transition-colors">GitHub</a>
            </div>
         </div>

         <p className="text-white/35 text-xs mt-6 font-mono tracking-[0.14em] uppercase">© {new Date().getFullYear()} Aya Fdhila</p>
      </motion.section>

      {/* 8. CYBERNETIC CONTACT MODAL (IN-PORTFOLIO CONVERSATION) */}
      <AnimatePresence>
            {isResumeModalOpen && (
               <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[290] bg-[#0a0c10]/92 backdrop-blur-md p-3 sm:p-6 md:p-10"
               >
                  <motion.div
                     initial={{ scale: 0.98, y: 12 }}
                     animate={{ scale: 1, y: 0 }}
                     exit={{ scale: 0.98, y: 12 }}
                     transition={{ type: "spring", duration: 0.45 }}
                     className="w-full h-full max-w-6xl mx-auto bg-[#111315] border border-[#00f0ff]/20 rounded-2xl md:rounded-3xl shadow-[0_0_60px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col"
                  >
                     <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3 sm:py-4 border-b border-white/10 bg-white/[0.02]">
                        <div className="flex items-center gap-3 min-w-0">
                           <FileText size={18} className="text-[#00f0ff] shrink-0" />
                           <p className="text-white font-semibold tracking-wide text-sm sm:text-base truncate">Aya Fdhila - Resume</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                           <a
                              href="/aya-fdhila-cv.pdf"
                              download
                              className="inline-flex items-center gap-2 rounded-full border border-[#00f0ff]/35 bg-[#00f0ff]/10 px-3 sm:px-4 py-2 text-[#00f0ff] text-xs sm:text-sm font-semibold hover:bg-[#00f0ff] hover:text-black transition-colors"
                           >
                              <Download size={14} /> Download
                           </a>
                           <button
                              type="button"
                              onClick={() => setIsResumeModalOpen(false)}
                              className="p-2 rounded-full border border-white/15 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                              aria-label="Close resume preview"
                           >
                              <X size={18} />
                           </button>
                        </div>
                     </div>

                     <div className="flex-1 bg-[#0c0d10]">
                        <iframe
                           src="/aya-fdhila-cv.pdf#view=FitH"
                           title="Aya Fdhila Resume"
                           className="w-full h-full"
                        />
                     </div>
                  </motion.div>
               </motion.div>
            )}

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
                      import("@emailjs/browser")
                                    .then(({ default: emailjs }) => emailjs.sendForm('service_m2hxngv', 'template_9lo2vui', formRef.current!, 'xaUPIKe4Hya_FusS_'))
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

