"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Lightbulb, Layers, Puzzle, Rocket, Code, Smartphone } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

const sections = [
  {
    title: "The Problem",
    icon: Puzzle,
    content: "Delivery workflows suffered from weak tracking visibility and inconsistent mobile UX.",
  },
  {
    title: "The Solution",
    icon: Lightbulb,
    content: "A focused end-to-end delivery mobile app with faster ordering, clear status updates, and courier-first flows.",
  },
  {
    title: "Technologies",
    icon: Code,
    content: "FlutterFlow, real-time location tracking, push notifications, and UX-first mobile interface systems.",
  },
];

const highlights = [
  { label: "Role", value: "Mobile UX Developer" },
  { label: "Platform", value: "FlutterFlow" },
  { label: "Focus", value: "Order Journey UX" },
];


export default function DeliveryAppCaseStudyPage() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <main className="min-h-screen bg-[#13100d] text-[#fcfcfc] font-sans selection:bg-orange-300 selection:text-black relative pb-20 md:pb-28 overflow-x-hidden">
      <div className="fixed inset-0 bg-grid opacity-20 pointer-events-none z-0"></div>
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_12%_12%,rgba(251,146,60,0.14),transparent_34%),radial-gradient(circle_at_85%_18%,rgba(249,115,22,0.11),transparent_32%),radial-gradient(circle_at_52%_82%,rgba(245,158,11,0.08),transparent_36%)]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 pt-16 md:pt-24 relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 md:mb-12"
        >
          <Link
            href="/#portfolio"
            className="inline-flex items-center gap-2 rounded-full border border-orange-200/25 bg-orange-300/10 backdrop-blur-md px-4 py-2.5 text-sm hover:border-orange-200/45 hover:bg-orange-300/15 hover:pr-6 transition-all duration-300 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Projects
          </Link>
        </motion.div>

        <motion.header 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative bg-white/[0.03] backdrop-blur-2xl border border-orange-100/10 rounded-[2rem] md:rounded-[3rem] p-6 sm:p-8 md:p-14 overflow-hidden group shadow-2xl"
        >
          <motion.div 
            style={{ y, opacity }} 
            className="absolute inset-0 z-0 opacity-30 pointer-events-none mix-blend-screen"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_22%,rgba(251,146,60,0.32),transparent_45%),radial-gradient(circle_at_78%_75%,rgba(249,115,22,0.25),transparent_48%)]" />
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

            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-orange-100/45 mb-6">
              Delivery App<span className="text-orange-300">.</span>
            </h1>

            <p className="max-w-2xl text-base sm:text-lg md:text-2xl text-white/75 leading-relaxed font-light">
              Comprehensive delivery lifecycle mobile application focused on intuitive user workflows, rapid order captures, and automated courier assignments.
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
            <div key={item.label} className="glass-card rounded-2xl p-4 border-orange-300/15">
              <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-orange-300 mb-2">{item.label}</p>
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
            const isLastOfFive = sections.length === 5 && index === 4;

            return (
              <motion.article 
                key={section.title} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative glass-card glass-card--interactive border-orange-100/15 rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-8 hover:border-orange-300/40 group overflow-hidden ${isLastOfFive ? "md:col-span-2 lg:col-span-1" : ""}`}
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
          <div className="flex flex-col items-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-4">
              <Smartphone size={16} className="text-orange-400" />
              <span className="text-orange-400 text-xs font-bold tracking-widest uppercase">UI Gallery</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white text-center">App Interface</h2>
            <p className="text-white/60 mt-4 max-w-2xl text-center">
              A clean, vibrant, and highly performant mobile interface designed to make the food ordering experience seamless and enjoyable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto px-1 sm:px-4">
            
            {/* Screen 1: Home */}
            <div className="flex flex-col items-center group">
              <div className="relative w-full max-w-[240px] sm:max-w-[280px] md:max-w-[300px] aspect-[9/19] rounded-[2.5rem] md:rounded-[3rem] border-[10px] border-zinc-900 bg-white shadow-2xl overflow-hidden ring-1 ring-orange-100/25 group-hover:-translate-y-4 group-hover:shadow-[0_20px_50px_rgba(251,146,60,0.2)] transition-all duration-500">
                {/* Mobile Notch */}
                <div className="absolute top-0 inset-x-0 h-6 bg-zinc-900 rounded-b-3xl w-40 mx-auto z-20 flex justify-center items-end pb-1">
                  <div className="w-12 h-1.5 bg-zinc-700 rounded-full"></div>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/delivery-home.png" alt="Delivery App Home Screen" className="w-full h-full object-cover" loading="lazy" decoding="async" />
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-lg font-bold text-white mb-1">Home Feed</h3>
                <p className="text-sm text-white/50 px-4">Hero delivery illustration and quick-access categories with interactive tab states.</p>
              </div>
            </div>

            {/* Screen 2: Product */}
            <div className="flex flex-col items-center group">
              <div className="relative w-full max-w-[240px] sm:max-w-[280px] md:max-w-[300px] aspect-[9/19] rounded-[2.5rem] md:rounded-[3rem] border-[10px] border-zinc-900 bg-white shadow-2xl overflow-hidden ring-1 ring-orange-100/25 group-hover:-translate-y-4 group-hover:shadow-[0_20px_50px_rgba(251,146,60,0.2)] transition-all duration-500 md:mt-12">
                {/* Mobile Notch */}
                <div className="absolute top-0 inset-x-0 h-6 bg-zinc-900 rounded-b-3xl w-40 mx-auto z-20 flex justify-center items-end pb-1">
                  <div className="w-12 h-1.5 bg-zinc-700 rounded-full"></div>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/delivery-product.png" alt="Delivery Product Screen" className="w-full h-full object-cover" loading="lazy" decoding="async" />
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-lg font-bold text-white mb-1">Item Details</h3>
                <p className="text-sm text-white/50 px-4">Exploded 3D ingredient view with seamless quantity adjustment and bag controls.</p>
              </div>
            </div>

            {/* Screen 3: Cart */}
            <div className="flex flex-col items-center group">
              <div className="relative w-full max-w-[240px] sm:max-w-[280px] md:max-w-[300px] aspect-[9/19] rounded-[2.5rem] md:rounded-[3rem] border-[10px] border-zinc-900 bg-white shadow-2xl overflow-hidden ring-1 ring-orange-100/25 group-hover:-translate-y-4 group-hover:shadow-[0_20px_50px_rgba(251,146,60,0.2)] transition-all duration-500">
                {/* Mobile Notch */}
                <div className="absolute top-0 inset-x-0 h-6 bg-zinc-900 rounded-b-3xl w-40 mx-auto z-20 flex justify-center items-end pb-1">
                  <div className="w-12 h-1.5 bg-zinc-700 rounded-full"></div>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/delivery-cart.png" alt="Delivery Order Cart" className="w-full h-full object-cover" loading="lazy" decoding="async" />
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-lg font-bold text-white mb-1">Active Order</h3>
                <p className="text-sm text-white/50 px-4">Clean summary cards indicating selection pricing and simple checkout flow.</p>
              </div>
            </div>

          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mt-8 mb-16 glass-card rounded-2xl md:rounded-3xl p-6 md:p-8 border-orange-300/20"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <p className="text-orange-300 font-mono text-[10px] tracking-[0.2em] uppercase mb-2">Next Case Study</p>
              <h3 className="text-white text-2xl md:text-3xl font-black tracking-tight">Continue Exploring Projects</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="/#portfolio" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-sm text-white hover:border-white/35 transition-colors">
                Back to Portfolio
              </a>
              <a href="/projects/networking-gns3-case-study" className="inline-flex items-center gap-2 rounded-full border border-orange-300/35 bg-orange-300/10 px-4 py-2 text-sm text-orange-300 hover:bg-orange-300 hover:text-black transition-colors">
                Next Project <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </motion.section>

      </div>
    </main>
  );
}
