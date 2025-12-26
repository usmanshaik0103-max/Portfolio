'use client';

import { useEffect, useState } from 'react';
import { useOSStore } from '@/lib/store';
import { motion, AnimatePresence } from 'framer-motion';

const bootMessages = [
  'Loading Ubuntu 24.04 LTS...',
  'Starting systemd-udevd...',
  'Loading kernel modules...',
  'Initializing hardware...',
  'Checking file systems...',
  'Mounting base filesystems...',
  'Starting network manager...',
  'Running sudo apt update...',
  'Reading package lists... Done',
  'Building dependency tree... Done',
  'Calculating upgrade... Done',
  'Extracting package lists... [42%]',
  'Extracting package lists... [89%]',
  'Installing system updates...',
  'Syncing cloud configuration...',
  'Configuring user environment...',
  'Loading user session...',
  'Finalizing startup...',
  'Ready.',
];

export function BootScreen() {
  const { bootProgress, setBootProgress, setStatus } = useOSStore();
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const totalDuration = 3000; // 3 seconds
    const interval = 50;
    const steps = totalDuration / interval;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setBootProgress((prev: number) => {
        if (prev >= 100) {
          clearInterval(timer);
          // Transition to locked state when progress finishes
          setTimeout(() => setStatus('locked'), 300);
          return 100;
        }
        return Math.min(prev + increment, 100);
      });
    }, interval);

    return () => clearInterval(timer);
  }, [setBootProgress, setStatus]);

  useEffect(() => {
    const nextMessageIndex = Math.min(
      Math.floor((bootProgress / 100) * bootMessages.length),
      bootMessages.length - 1
    );
    if (nextMessageIndex !== currentMessageIndex) {
      setCurrentMessageIndex(nextMessageIndex);
    }
  }, [bootProgress, currentMessageIndex]);

    return (
      <div className="fixed inset-0 bg-[#1e0516] flex flex-col items-center justify-center z-[1000] text-white font-sans overflow-hidden">
        {/* Ubuntu background texture/gradient */}
        <div className="absolute inset-0 opacity-10 bg-[#300a24]" />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,#e95420_0%,transparent_70%)]" />

      
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center relative z-10"
        >
            <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-white mb-2">ubuntu</h1>
              <motion.div 
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -right-6 sm:-right-8 top-0 text-[#e95420] text-sm sm:text-base font-bold"
              >
                24.04
              </motion.div>
            </div>
            
            <div className="w-48 sm:w-64 h-1 bg-white/10 rounded-full overflow-hidden mt-8 relative">
            <motion.div 
              className="h-full bg-gradient-to-r from-[#e95420] to-[#f4744b] relative z-10"
              initial={{ width: 0 }}
              animate={{ width: `${bootProgress}%` }}
            />
            {/* Pulsing glow */}
            <motion.div 
              className="absolute inset-0 bg-[#e95420]/30 blur-sm"
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentMessageIndex}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="flex flex-col items-center gap-1 mt-6"
            >
              <p className="text-[10px] text-white/50 font-mono tracking-widest uppercase">
                {bootMessages[currentMessageIndex]}
              </p>
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    className="w-1 h-1 bg-[#e95420] rounded-full"
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
      
          <div className="absolute bottom-12 text-white/20 text-[10px] tracking-[0.3em] font-medium uppercase">
            Made By Usman Shaik
          </div>
    </div>
  );
}
