"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Shield, BarChart3, Route, Network, LayoutTemplate, Cable, FileCog, Settings, Code } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

const sections = [
  {
    title: "The Problem",
    icon: FileCog,
    content: "The challenge was to design a secure, scalable multi-site enterprise network with controlled access and reliable services.",
  },
  {
    title: "The Solution",
    icon: Network,
    content: "Built a GNS3 architecture with OSPF routing, NAT internet access, IPsec site-to-site VPN, ACL filtering, and core internal services.",
  },
  {
    title: "Technologies Used",
    icon: Cable,
    content: "GNS3, OSPF, NAT, IPsec VPN, ACL, DHCP, plus web, database, file sharing, and monitoring services.",
  },
];

const highlights = [
  { label: "Scope", value: "Multi-Site Enterprise Lab" },
  { label: "Core", value: "OSPF + IPsec + ACL" },
  { label: "Focus", value: "Security + Reliability" },
];


export default function NetworkingCaseStudyPage() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <main className="min-h-screen bg-[#0d1116] text-[#fcfcfc] font-sans selection:bg-cyan-300 selection:text-black relative pb-20 md:pb-28 overflow-x-hidden">
      <div className="fixed inset-0 bg-grid opacity-20 pointer-events-none z-0"></div>
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_12%_12%,rgba(6,182,212,0.13),transparent_34%),radial-gradient(circle_at_85%_18%,rgba(59,130,246,0.1),transparent_32%),radial-gradient(circle_at_55%_82%,rgba(14,165,233,0.09),transparent_36%)]" />

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
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(6,182,212,0.28),transparent_45%),radial-gradient(circle_at_78%_78%,rgba(59,130,246,0.24),transparent_48%)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111315] via-[#111315]/80 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#111315] via-transparent to-[#111315]"></div>
          </motion.div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/20 mb-8">
              <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse"></span>
              <p className="text-[#00f0ff] text-xs font-semibold tracking-widest uppercase">
                Integrated Networking Project (ESPRIT)
              </p>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-cyan-100/45 mb-6">
              Network Infrastructure<span className="text-[#00f0ff]">.</span>
            </h1>

            <p className="max-w-2xl text-base sm:text-lg md:text-2xl text-white/75 leading-relaxed font-light">
              A complete enterprise network infrastructure simulated in GNS3, designed to connect multiple departments through a central backbone while providing secure communication, Internet access, critical internal services, and network supervision.
            </p>
            
            <div className="mt-8 md:mt-10 flex flex-wrap gap-3 md:gap-4">
              <span className="inline-flex items-center gap-3 rounded-full border border-cyan-100/20 bg-cyan-300/10 backdrop-blur-md px-4 md:px-6 py-2.5 md:py-3 text-xs md:text-sm font-bold text-white transition-all duration-300">
                <Shield size={18} /> Security
              </span>
              <span className="inline-flex items-center gap-3 rounded-full border border-cyan-100/20 bg-cyan-300/10 backdrop-blur-md px-4 md:px-6 py-2.5 md:py-3 text-xs md:text-sm font-bold text-white transition-all duration-300">
                <Route size={18} /> Routing
              </span>
              <span className="inline-flex items-center gap-3 rounded-full border border-cyan-100/20 bg-cyan-300/10 backdrop-blur-md px-4 md:px-6 py-2.5 md:py-3 text-xs md:text-sm font-bold text-white transition-all duration-300">
                <BarChart3 size={18} /> Monitoring
              </span>
            </div>
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
            <div key={item.label} className="glass-card rounded-2xl p-4 border-cyan-300/15">
              <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-cyan-300 mb-2">{item.label}</p>
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
            const isLastOfSix = sections.length === 6 && index === 5;

            return (
              <motion.article 
                key={section.title} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative glass-card glass-card--interactive border-cyan-100/15 rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-8 hover:border-[#00f0ff]/40 group overflow-hidden ${isLastOfSix ? "md:col-span-2 lg:col-span-1" : ""}`}
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
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 md:mb-8 flex items-center gap-3">
            <Settings className="text-[#00f0ff]" size={28} />
            Implementation & Results
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            <div className="bg-white/5 backdrop-blur-xl border border-cyan-100/10 rounded-2xl overflow-hidden group">
              <div className="h-64 overflow-hidden relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/backbone (1).png" alt="GNS3 Backbone Topology" className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500" loading="lazy" decoding="async" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-2">Backbone Topology</h3>
                <p className="text-sm text-white/50">Multi-router OSPF mesh interconnecting different organizational departments.</p>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-cyan-100/10 rounded-2xl overflow-hidden group">
              <div className="h-64 overflow-hidden relative border-b border-white/10 bg-white/5 p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/dyelelweb.png" alt="Local Area Network" className="w-full h-full object-contain opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500" loading="lazy" decoding="async" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-2">Department Structure</h3>
                <p className="text-sm text-white/50">Simulated PCs, switches, and VMs forming isolated subnets connected to the routers.</p>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-cyan-100/10 rounded-2xl overflow-hidden group">
              <div className="h-64 overflow-hidden relative bg-[#1e1e1e] flex items-center justify-center p-2 border-b border-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/route.png" alt="Routing Table Output" className="max-w-full max-h-full object-contain opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500" loading="lazy" decoding="async" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-2">Dynamic Routing (OSPF)</h3>
                <p className="text-sm text-white/50">Verified routing tables showing successfully converged OSPF and connected routes.</p>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-cyan-100/10 rounded-2xl overflow-hidden group">
              <div className="h-64 overflow-hidden relative bg-[#1e1e1e] flex items-center justify-center p-2 border-b border-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/crypto-ipsec.png" alt="VPN Tunnels Output" className="max-w-full max-h-full object-contain opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500" loading="lazy" decoding="async" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-2">Secure Inter-site VPN</h3>
                <p className="text-sm text-white/50">Active ISAKMP Security Associations verifying established IPsec tunnels.</p>
              </div>
            </div>

            <div className="md:col-span-2 bg-white/5 backdrop-blur-xl border border-cyan-100/10 rounded-2xl overflow-hidden group">
              <div className="h-[400px] overflow-hidden relative border-b border-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/monitoring.png" alt="Grafana Dashboard" className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500" loading="lazy" decoding="async" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-2">Network Supervision</h3>
                <p className="text-sm text-white/50">Live Grafana dashboards connected to Node Exporter visualizing network and system health metrics (CPU, RAM, Swap) across internal servers.</p>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mt-8 mb-16 glass-card rounded-2xl md:rounded-3xl p-6 md:p-8 border-cyan-300/20"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <p className="text-cyan-300 font-mono text-[10px] tracking-[0.2em] uppercase mb-2">Loop Back</p>
              <h3 className="text-white text-2xl md:text-3xl font-black tracking-tight">Explore More Case Studies</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/#portfolio" className="inline-flex items-center gap-2 rounded-full border border-cyan-300/35 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-300 hover:bg-cyan-300 hover:text-black transition-colors">
                Back to Portfolio <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </motion.section>

      </div>
    </main>
  );
}
