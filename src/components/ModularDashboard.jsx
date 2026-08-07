import {
  Activity,
  CheckCircle2,
  Cpu,
  Maximize2,
  RefreshCw,
  Server,
  ShieldCheck,
  TrendingUp,
  Wifi,
  X
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

export default function ModularDashboard() {
  const [selectedId, setSelectedId] = useState(null);
  
  // Simulated dynamic real-time state
  const [cpuLoad, setCpuLoad] = useState(28.4);
  const [ramUsage, setRamUsage] = useState(12.4);
  const [inbound, setInbound] = useState(1.2);
  const [networkBars, setNetworkBars] = useState([40, 60, 30, 85, 95, 45, 70, 55, 90, 65]);

  // Simulate dynamic metric updates every 2.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuLoad((prev) => +(prev + (Math.random() * 4 - 2)).toFixed(1));
      setRamUsage((prev) => +(prev + (Math.random() * 0.4 - 0.2)).toFixed(1));
      setInbound((prev) => +(prev + (Math.random() * 0.2 - 0.1)).toFixed(2));
      setNetworkBars((prev) => [...prev.slice(1), Math.floor(Math.random() * 60) + 35]);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const items = [
    {
      id: "system-status",
      title: "Cluster Telemetry",
      category: "Infrastructure",
      colSpan: "col-span-12 lg:col-span-8",
      accent: "from-emerald-500/20 to-teal-500/5 border-emerald-500/30",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 bg-emerald-950/60 border border-emerald-800/50 px-3 py-1.5 rounded-full">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">Nodes Operational</span>
            </div>
            <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> SSL Active
            </span>
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono text-zinc-400">
              <span>Overall Integrity</span>
              <span className="text-emerald-400 font-bold">99.98%</span>
            </div>
            <div className="h-2 w-full bg-zinc-800/80 rounded-full overflow-hidden p-0.5 border border-zinc-700/50">
              <motion.div 
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" 
                animate={{ width: "98%" }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>
      ),
      details: (
        <div className="space-y-3">
          <p className="text-xs text-zinc-400">Live health score across regional compute clusters.</p>
          {["us-east-primary", "eu-central-backup", "ap-southeast-edge"].map((node, idx) => (
            <div key={node} className="flex justify-between items-center p-2.5 rounded-xl bg-zinc-800/40 border border-zinc-700/40">
              <div className="flex items-center gap-2">
                <Server className="w-3.5 h-3.5 text-indigo-400" />
                <span className="text-xs font-mono text-zinc-200">{node}</span>
              </div>
              <span className="text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                0.{2 + idx}ms Latency
              </span>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "cpu-load",
      title: "Processor Load",
      category: "Compute",
      colSpan: "col-span-12 sm:col-span-6 lg:col-span-4",
      accent: "from-indigo-500/20 to-purple-500/5 border-indigo-500/30",
      content: (
        <div className="flex items-center justify-between">
          <div>
            <motion.div 
              key={cpuLoad} 
              initial={{ scale: 0.95, opacity: 0.8 }} 
              animate={{ scale: 1, opacity: 1 }}
              className="text-3xl font-black font-mono tracking-tight text-white"
            >
              {cpuLoad}%
            </motion.div>
            <div className="text-xs text-zinc-400 mt-0.5 flex items-center gap-1">
              <Activity className="w-3 h-3 text-indigo-400 animate-pulse" /> 16 Threads Active
            </div>
          </div>
          <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl">
            <Cpu className="w-7 h-7 text-indigo-400" />
          </div>
        </div>
      ),
      details: (
        <div className="space-y-2 text-xs text-zinc-300">
          <div className="flex justify-between py-1.5 border-b border-zinc-800">
            <span className="text-zinc-400">Core Temp</span>
            <span className="font-mono text-emerald-400">41.2°C (Optimal)</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-zinc-800">
            <span className="text-zinc-400">Instruction Throughput</span>
            <span className="font-mono text-indigo-300">4.2 GHz</span>
          </div>
        </div>
      ),
    },
    {
      id: "memory-usage",
      title: "Memory Allocation",
      category: "Resources",
      colSpan: "col-span-12 sm:col-span-6 lg:col-span-4",
      accent: "from-blue-500/20 to-indigo-500/5 border-blue-500/30",
      content: (
        <div className="space-y-3">
          <div className="flex justify-between text-xs">
            <span className="text-zinc-400">RAM Pools</span>
            <span className="font-mono text-zinc-100 font-bold">{ramUsage} / 16.0 GB</span>
          </div>
          <div className="h-2 w-full bg-zinc-800/80 rounded-full overflow-hidden p-0.5 border border-zinc-700/50">
            <motion.div 
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" 
              animate={{ width: `${(ramUsage / 16) * 100}%` }}
              transition={{ type: "spring", stiffness: 50 }}
            />
          </div>
        </div>
      ),
      details: (
        <p className="text-xs text-zinc-400 leading-relaxed">
          Dynamic memory buffer automatically optimizes application garbage collection without throughput throttling.
        </p>
      ),
    },
    {
      id: "network-traffic",
      title: "Network Throughput",
      category: "IO Traffic",
      colSpan: "col-span-12 lg:col-span-8",
      accent: "from-purple-500/20 to-pink-500/5 border-purple-500/30",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-zinc-950/60 border border-zinc-800/80 rounded-xl">
              <span className="text-[10px] uppercase font-bold text-zinc-400 block mb-0.5">Inbound</span>
              <span className="text-lg font-black font-mono text-indigo-400">{inbound} GB/s</span>
            </div>
            <div className="p-3 bg-zinc-950/60 border border-zinc-800/80 rounded-xl">
              <span className="text-[10px] uppercase font-bold text-zinc-400 block mb-0.5">Outbound</span>
              <span className="text-lg font-black font-mono text-emerald-400">640 MB/s</span>
            </div>
          </div>
          <div className="h-16 bg-zinc-950/40 border border-zinc-800/50 rounded-xl p-2 flex items-end gap-1.5 overflow-hidden">
            {networkBars.map((val, i) => (
              <motion.div 
                key={i} 
                layout
                initial={{ height: "10%" }}
                animate={{ height: `${val}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex-1 bg-gradient-to-t from-indigo-600 to-purple-400 rounded-sm" 
              />
            ))}
          </div>
        </div>
      ),
      details: (
        <div className="space-y-2 text-xs text-zinc-300">
          <div className="flex justify-between items-center text-zinc-400">
            <span>Bandwidth Peak</span>
            <span className="font-mono text-purple-300 font-semibold">2.4 GB/s</span>
          </div>
          <div className="flex justify-between items-center text-zinc-400">
            <span>Packet Loss Rate</span>
            <span className="font-mono text-emerald-400 font-semibold">0.000%</span>
          </div>
        </div>
      ),
    },
  ];

  const activeCard = items.find((item) => item.id === selectedId);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-4 sm:p-6 lg:p-10 font-sans relative overflow-hidden selection:bg-indigo-500 selection:text-white">
      {/* Glow Backdrop Lights */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/15 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-purple-600/10 rounded-full blur-[128px] pointer-events-none" />

      {/* Header */}
      <header className="max-w-6xl mx-auto mb-8 flex flex-wrap justify-between items-end gap-4 border-b border-zinc-800/60 pb-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold tracking-widest uppercase mb-1">
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-400" /> Realtime Metrics Engine
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            System Operations
          </h1>
        </div>
        <div className="flex items-center gap-2 bg-zinc-900/80 border border-zinc-800 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs text-zinc-400">
          <Wifi className="w-3.5 h-3.5 text-emerald-400" />
          <span>Syncing automatically</span>
        </div>
      </header>

      {/* Responsive Grid */}
      <main className="max-w-6xl mx-auto grid grid-cols-12 gap-4 sm:gap-5">
        {items.map((item) => (
          <motion.div
            key={item.id}
            layoutId={`card-${item.id}`}
            onClick={() => setSelectedId(item.id)}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className={`${item.colSpan} relative bg-gradient-to-b ${item.accent} backdrop-blur-xl border rounded-2xl p-5 cursor-pointer shadow-lg hover:shadow-2xl transition-all group overflow-hidden`}
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest bg-zinc-900/60 border border-zinc-800 px-2.5 py-1 rounded-md">
                {item.category}
              </span>
              <div className="p-1.5 rounded-lg bg-zinc-900/40 text-zinc-500 group-hover:text-white group-hover:bg-zinc-800 transition-colors">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </div>
            <motion.h2 layoutId={`title-${item.id}`} className="text-base font-bold text-white mb-4">
              {item.title}
            </motion.h2>
            <div>{item.content}</div>
          </motion.div>
        ))}
      </main>

      {/* Expanded Modal Overlay */}
      <AnimatePresence>
        {selectedId && activeCard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              layoutId={`card-${activeCard.id}`}
              className="relative w-full max-w-lg bg-zinc-900 border border-zinc-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 overflow-hidden"
            >
              <div className="flex justify-between items-center mb-5">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
                  {activeCard.category}
                </span>
                <button
                  onClick={() => setSelectedId(null)}
                  className="p-2 rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <motion.h2 layoutId={`title-${activeCard.id}`} className="text-2xl font-bold text-white mb-6">
                {activeCard.title}
              </motion.h2>

              <div className="mb-6 p-4 bg-zinc-950/50 border border-zinc-800/80 rounded-2xl">
                {activeCard.content}
              </div>

              <div className="border-t border-zinc-800/80 pt-5 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-indigo-400" /> Granular Metrics
                </h3>
                {activeCard.details}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}