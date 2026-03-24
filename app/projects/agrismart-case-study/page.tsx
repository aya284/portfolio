"use client";

import Link from "next/link";
import { ArrowLeft, Lightbulb, Layers, Puzzle, Rocket, Code, Sprout } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const sections = [
  {
    title: "The Problem",
    icon: Puzzle,
    content: "Agricultural supply chains are often fragmented, leading to inefficiencies and lost revenue for farmers. A streamlined marketplace was needed to directly connect suppliers with buyers.",
  },
  {
    title: "The Solution",
    icon: Lightbulb,
    content: "AgriSmart is a scalable agricultural marketplace resolving these business flows. It handles real-time order management, dynamic pricing, and integrates AI chatbots to guide users.",
  },
  {
    title: "Core Features",
    icon: Rocket,
    content: "Live order tracking, intelligent price matching algorithms, conversational AI support, and comprehensive supplier dashboards.",
  },
  {
    title: "System Architecture",
    icon: Layers,
    content: "Engineered heavily with Symfony and PHP. Containerized with Docker to ensure consistency across environments and seamless production deployments.",
  },
  {
    title: "Technologies",
    icon: Code,
    content: "Symfony, PHP, SQL-backed data persistence, Dockerized environments, and AI-assisted support flows integrated into the platform journey.",
  },
];

export default function AgriSmartCaseStudyPage() {
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
               <source src="/agrismart.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-[#111315] via-[#111315]/80 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#111315] via-transparent to-[#111315]"></div>
          </motion.div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-400/10 border border-green-400/25 mb-8">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              <p className="text-green-300 text-xs font-semibold tracking-widest uppercase">
                Full-Stack Agriculture Marketplace
              </p>
            </div>

            <div className="flex items-center gap-4 md:gap-6 mb-6">
              <motion.div
                initial={{ scale: 0.5, opacity: 0, rotate: -15 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.3 }}
                className="relative w-20 h-20 md:w-24 md:h-24 shrink-0"
              >
                <div className="absolute inset-0 rounded-[1.5rem] bg-green-400/20 blur-sm"></div>
                <div className="relative w-full h-full rounded-[1.5rem] bg-[#0d1112] border border-white/15 flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
                  <Sprout className="text-green-300" size={34} />
                </div>
              </motion.div>

              <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/40">
                AgriSmart<span className="text-green-300">.</span>
              </h1>
            </div>

            <p className="max-w-2xl text-lg md:text-2xl text-white/70 leading-relaxed font-light">
               A scalable agricultural marketplace designed to align real business flows. Features real-time order management, dynamic inventory tracking, and AI-chatbot guidance.
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
            const isLastOfFive = sections.length === 5 && index === 4;

            return (
              <motion.article 
                key={section.title} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-white/[0.05] hover:border-green-300/30 hover:shadow-[0_8px_30px_rgba(74,222,128,0.07)] hover:-translate-y-1 transition-all duration-500 group overflow-hidden ${isLastOfFive ? "md:col-span-2 lg:col-span-1" : ""}`}
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 transform translate-x-4 -translate-y-4 group-hover:scale-110 group-hover:opacity-10 transition-all duration-500 pointer-events-none">
                  <Icon size={120} />
                </div>

                <h2 className="flex items-center gap-4 text-xl font-bold text-white mb-6 relative z-10">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 group-hover:border-green-300/50 group-hover:bg-green-300/10 group-hover:text-green-300 transition-all duration-500 shadow-lg">
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
          className="mt-4 bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-[3rem] p-8 md:p-16 overflow-hidden relative group"
        >
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-green-400/10 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-300/10 blur-[120px] rounded-full pointer-events-none"></div>

          <div className="flex flex-col md:flex-row items-center justify-between mb-16 relative z-10 gap-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-green-300"></div>
                <span className="text-xs font-medium text-white/80 uppercase tracking-wider">Demo</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">AgriSmart Demo</h2>
              <p className="text-xl text-white/60 font-light max-w-xl">
                Watch the platform flow from listing agricultural products to handling dynamic orders and supplier coordination.
              </p>
            </div>
          </div>

          <div className="flex justify-center relative z-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[320px] bg-gradient-to-r from-green-400/20 to-emerald-300/20 blur-[80px] rounded-full pointer-events-none"></div>

            <div className="relative w-full max-w-4xl rounded-[2rem] border border-white/10 bg-black shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden ring-1 ring-white/10 group-hover:ring-green-300/30 hover:scale-[1.01] transition-all duration-700">
              <div className="px-5 py-3 border-b border-white/10 bg-white/[0.03] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/80"></span>
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-300/80"></span>
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400/80"></span>
                </div>
                <span className="text-xs text-white/60 uppercase tracking-[0.18em]">Live Demo</span>
              </div>

              <video
                controls
                preload="metadata"
                playsInline
                className="w-full aspect-video object-cover bg-black"
                aria-label="AgriSmart app demo video"
              >
                <source src="/agrismart-demo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </motion.section>

      </div>
    </main>
  );
}
