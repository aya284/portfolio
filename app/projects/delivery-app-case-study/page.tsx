"use client";

import Link from "next/link";
import { ArrowLeft, Lightbulb, Layers, Puzzle, Rocket, Code, Smartphone } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const sections = [
  {
    title: "The Problem",
    icon: Puzzle,
    content: "Logistics and delivery services often struggle with tracking delays and poor mobile UX for delivery drivers, causing degraded customer satisfaction.",
  },
  {
    title: "The Solution",
    icon: Lightbulb,
    content: "Designed and developed a cohesive, end-to-end mobile delivery application focused heavily on robust UX and immediate real-time workflow logic.",
  },
  {
    title: "Core Features",
    icon: Rocket,
    content: "Automated route matching, live geolocation tracking, instant push notifications, and adaptive interfaces that respond to both dark and light modes.",
  },
  {
    title: "System Architecture",
    icon: Layers,
    content: "Built natively utilizing FlutterFlow to ensure cross-platform compatibility alongside native-like performance and rapid iteration cycles.",
  },
  {
    title: "Technologies",
    icon: Code,
    content: "FlutterFlow for rapid cross-platform development, real-time location features, push notification pipelines, and UX-first interface systems.",
  },
];

export default function DeliveryAppCaseStudyPage() {
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
               <source src="/delivery.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-[#111315] via-[#111315]/80 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#111315] via-transparent to-[#111315]"></div>
          </motion.div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-400/10 border border-orange-400/25 mb-8">
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></span>
              <p className="text-orange-300 text-xs font-semibold tracking-widest uppercase">
                Mobile UX and Cross-Platform Delivery
              </p>
            </div>

            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/40 mb-6">
              Delivery App<span className="text-orange-300">.</span>
            </h1>

            <p className="max-w-2xl text-lg md:text-2xl text-white/70 leading-relaxed font-light">
              Comprehensive delivery lifecycle mobile application focused on intuitive user workflows, rapid order captures, and automated courier assignments.
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
                className={`relative bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-white/[0.05] hover:border-orange-300/30 hover:shadow-[0_8px_30px_rgba(251,146,60,0.08)] hover:-translate-y-1 transition-all duration-500 group overflow-hidden ${isLastOfFive ? "md:col-span-2 lg:col-span-1" : ""}`}
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 transform translate-x-4 -translate-y-4 group-hover:scale-110 group-hover:opacity-10 transition-all duration-500 pointer-events-none">
                  <Icon size={120} />
                </div>

                <h2 className="flex items-center gap-4 text-xl font-bold text-white mb-6 relative z-10">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 group-hover:border-orange-300/50 group-hover:bg-orange-300/10 group-hover:text-orange-300 transition-all duration-500 shadow-lg">
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
          <div className="flex flex-col items-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-4">
              <Smartphone size={16} className="text-orange-400" />
              <span className="text-orange-400 text-xs font-bold tracking-widest uppercase">UI Gallery</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white text-center">App Interface</h2>
            <p className="text-white/60 mt-4 max-w-2xl text-center">
              A clean, vibrant, and highly performant mobile interface designed to make the food ordering experience seamless and enjoyable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
            
            {/* Screen 1: Home */}
            <div className="flex flex-col items-center group">
              <div className="relative w-full max-w-[300px] aspect-[9/19] rounded-[3rem] border-[10px] border-zinc-900 bg-white shadow-2xl overflow-hidden ring-1 ring-white/10 group-hover:-translate-y-4 group-hover:shadow-[0_20px_50px_rgba(251,146,60,0.2)] transition-all duration-500">
                {/* Mobile Notch */}
                <div className="absolute top-0 inset-x-0 h-6 bg-zinc-900 rounded-b-3xl w-40 mx-auto z-20 flex justify-center items-end pb-1">
                  <div className="w-12 h-1.5 bg-zinc-700 rounded-full"></div>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/delivery-home.png" alt="Delivery App Home Screen" className="w-full h-full object-cover" />
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-lg font-bold text-white mb-1">Home Feed</h3>
                <p className="text-sm text-white/50 px-4">Hero delivery illustration and quick-access categories with interactive tab states.</p>
              </div>
            </div>

            {/* Screen 2: Product */}
            <div className="flex flex-col items-center group">
              <div className="relative w-full max-w-[300px] aspect-[9/19] rounded-[3rem] border-[10px] border-zinc-900 bg-white shadow-2xl overflow-hidden ring-1 ring-white/10 group-hover:-translate-y-4 group-hover:shadow-[0_20px_50px_rgba(251,146,60,0.2)] transition-all duration-500 md:mt-12">
                {/* Mobile Notch */}
                <div className="absolute top-0 inset-x-0 h-6 bg-zinc-900 rounded-b-3xl w-40 mx-auto z-20 flex justify-center items-end pb-1">
                  <div className="w-12 h-1.5 bg-zinc-700 rounded-full"></div>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/delivery-product.png" alt="Delivery Product Screen" className="w-full h-full object-cover" />
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-lg font-bold text-white mb-1">Item Details</h3>
                <p className="text-sm text-white/50 px-4">Exploded 3D ingredient view with seamless quantity adjustment and bag controls.</p>
              </div>
            </div>

            {/* Screen 3: Cart */}
            <div className="flex flex-col items-center group">
              <div className="relative w-full max-w-[300px] aspect-[9/19] rounded-[3rem] border-[10px] border-zinc-900 bg-white shadow-2xl overflow-hidden ring-1 ring-white/10 group-hover:-translate-y-4 group-hover:shadow-[0_20px_50px_rgba(251,146,60,0.2)] transition-all duration-500">
                {/* Mobile Notch */}
                <div className="absolute top-0 inset-x-0 h-6 bg-zinc-900 rounded-b-3xl w-40 mx-auto z-20 flex justify-center items-end pb-1">
                  <div className="w-12 h-1.5 bg-zinc-700 rounded-full"></div>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/delivery-cart.png" alt="Delivery Order Cart" className="w-full h-full object-cover" />
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-lg font-bold text-white mb-1">Active Order</h3>
                <p className="text-sm text-white/50 px-4">Clean summary cards indicating selection pricing and simple checkout flow.</p>
              </div>
            </div>

          </div>
        </motion.section>

      </div>
    </main>
  );
}
