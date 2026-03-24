"use client";

import Link from "next/link";
import { ArrowLeft, Shield, BarChart3, Route, Network, LayoutTemplate, Cable, FileCog, Settings, Code } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const sections = [
  {
    title: "The Problem",
    icon: FileCog,
    content: "Modern enterprise departments require reliable interconnection, secure inter-site communication, controlled access to internal resources, and centralized services such as web hosting, databases, file sharing, and monitoring. The challenge was to design a coherent and scalable multi-site network that supports these needs.",
  },
  {
    title: "The Solution",
    icon: Network,
    content: "The project implemented a multi-site network architecture in GNS3 using a central backbone, dynamic routing with OSPF, Internet access through NAT, secure site-to-site communication with IPsec VPN, traffic filtering with ACLs, and deployment of core services including DHCP, web, database, file sharing, and supervision tools.",
  },
  {
    title: "Core Features",
    icon: Route,
    content: "Multi-site enterprise network simulation, central backbone interconnecting departments, dynamic routing with OSPF, Internet access via NAT, secure inter-site tunnels using IPsec VPN, traffic filtering with ACLs, and deployment of DHCP, web, database, file sharing, and supervision services.",
  },
  {
    title: "System Architecture",
    icon: LayoutTemplate,
    content: "The architecture is based on multiple logical departments connected through a backbone. It integrates routing, security, and service layers, with separate zones for web, IT/supervision, file sharing, and database services, all validated in a simulated enterprise environment.",
  },
  {
    title: "Technologies Used",
    icon: Cable,
    content: "Simulation environments like GNS3, networking protocols including OSPF, NAT, IPsec VPN, ACL, and DHCP. Essential services like Web servers, Database servers, NFS for file sharing, paired with comprehensive Supervision and monitoring tools.",
  },
  {
    title: "Deployment Notes",
    icon: Code,
    content: "Validated through staged test scenarios for route propagation, VPN negotiation, access filtering, and service health monitoring across all departments.",
  }
];

export default function NetworkingCaseStudyPage() {
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
               <source src="/gns3.mp4" type="video/mp4" />
            </video>
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

            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/40 mb-6">
              Network Infrastructure<span className="text-[#00f0ff]">.</span>
            </h1>

            <p className="max-w-2xl text-lg md:text-2xl text-white/70 leading-relaxed font-light">
              A complete enterprise network infrastructure simulated in GNS3, designed to connect multiple departments through a central backbone while providing secure communication, Internet access, critical internal services, and network supervision.
            </p>
            
            <div className="mt-10 flex flex-wrap gap-4">
              <span className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-6 py-3 text-sm font-bold text-white transition-all duration-300">
                <Shield size={18} /> Security
              </span>
              <span className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-6 py-3 text-sm font-bold text-white transition-all duration-300">
                <Route size={18} /> Routing
              </span>
              <span className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-6 py-3 text-sm font-bold text-white transition-all duration-300">
                <BarChart3 size={18} /> Monitoring
              </span>
            </div>
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
            const isLastOfSix = sections.length === 6 && index === 5;

            return (
              <motion.article 
                key={section.title} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-white/[0.05] hover:border-[#00f0ff]/30 hover:shadow-[0_8px_30px_rgba(0,240,255,0.06)] hover:-translate-y-1 transition-all duration-500 group overflow-hidden ${isLastOfSix ? "md:col-span-2 lg:col-span-1" : ""}`}
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
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <Settings className="text-[#00f0ff]" size={28} />
            Implementation & Results
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden group">
              <div className="h-64 overflow-hidden relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/backbone (1).png" alt="GNS3 Backbone Topology" className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-2">Backbone Topology</h3>
                <p className="text-sm text-white/50">Multi-router OSPF mesh interconnecting different organizational departments.</p>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden group">
              <div className="h-64 overflow-hidden relative border-b border-white/10 bg-white/5 p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/dyelelweb.png" alt="Local Area Network" className="w-full h-full object-contain opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-2">Department Structure</h3>
                <p className="text-sm text-white/50">Simulated PCs, switches, and VMs forming isolated subnets connected to the routers.</p>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden group">
              <div className="h-64 overflow-hidden relative bg-[#1e1e1e] flex items-center justify-center p-2 border-b border-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/route.png" alt="Routing Table Output" className="max-w-full max-h-full object-contain opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-2">Dynamic Routing (OSPF)</h3>
                <p className="text-sm text-white/50">Verified routing tables showing successfully converged OSPF and connected routes.</p>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden group">
              <div className="h-64 overflow-hidden relative bg-[#1e1e1e] flex items-center justify-center p-2 border-b border-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/crypto-ipsec.png" alt="VPN Tunnels Output" className="max-w-full max-h-full object-contain opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-2">Secure Inter-site VPN</h3>
                <p className="text-sm text-white/50">Active ISAKMP Security Associations verifying established IPsec tunnels.</p>
              </div>
            </div>

            <div className="md:col-span-2 bg-white/5 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden group">
              <div className="h-[400px] overflow-hidden relative border-b border-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/monitoring.png" alt="Grafana Dashboard" className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-2">Network Supervision</h3>
                <p className="text-sm text-white/50">Live Grafana dashboards connected to Node Exporter visualizing network and system health metrics (CPU, RAM, Swap) across internal servers.</p>
              </div>
            </div>
          </div>
        </motion.section>

      </div>
    </main>
  );
}
