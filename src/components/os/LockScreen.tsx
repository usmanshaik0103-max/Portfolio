'use client';

import { useOSStore } from '@/lib/store';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { useState, useEffect } from 'react';
import { Lock } from 'lucide-react';

export function LockScreen() {
  const { setStatus } = useOSStore();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = () => setStatus('desktop');
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setStatus]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#4a0a2c] to-[#300a24] flex flex-col items-center justify-between py-10 sm:py-20 z-[1000] text-white font-sans overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#300a24]/50 to-[#300a24]" />
      </div>

      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 flex flex-col items-center px-4"
      >
        <span className="text-6xl sm:text-7xl md:text-8xl font-thin tracking-tighter">
          {format(time, 'h:mm')}
          <span className="text-2xl sm:text-3xl ml-2 uppercase opacity-60 font-light">{format(time, 'a')}</span>
        </span>
        <span className="text-sm sm:text-xl font-light mt-2 sm:mt-4 text-white/70">
          {format(time, 'EEEE, MMMM d')}
        </span>
      </motion.div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 flex flex-col items-center gap-6 sm:gap-8 w-full max-w-[280px] sm:max-w-none px-4"
      >
        <div className="flex flex-col items-center gap-3 sm:gap-4">
          <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full border-2 border-white/20 p-1 bg-white/5 backdrop-blur-md overflow-hidden relative group">
             <img 
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_20251226_123819-resized-1766748548548.jpg?width=8000&height=8000&resize=contain"
              alt="User"
              className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="text-base sm:text-xl font-medium tracking-wide text-center">Usman Shaik&apos;s PortFolio</span>
        </div>

        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setStatus('desktop')}
          className="w-full sm:w-auto px-6 py-2.5 sm:px-8 sm:py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center gap-3 transition-colors group"
        >
          <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:rotate-12 transition-transform" />
          <span className="font-medium text-sm sm:text-base">Unlock Session</span>
        </motion.button>
      </motion.div>

      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 text-white/30 text-[10px] sm:text-xs tracking-widest font-mono whitespace-nowrap">
        PRESS ANY KEY OR CLICK TO UNLOCK
      </div>
    </div>
  );
}
