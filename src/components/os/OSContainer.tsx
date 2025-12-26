'use client';

import { useOSStore, WindowType } from '@/lib/store';
import { BootScreen } from './BootScreen';
import { Desktop } from './Desktop';
import { LockScreen } from './LockScreen';
import { MobilePortfolio } from './MobilePortfolio';
import { useIsMobile } from '@/hooks/use-mobile';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';

export function OSContainer() {
  const { status, openWindow, windows, focusWindow, activeWindowId } = useOSStore();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (status !== 'desktop') return;

      // Ctrl + T: Open Terminal
      if (e.ctrlKey && e.key === 't') {
        e.preventDefault();
        openWindow('terminal');
      }

      // Alt + Tab: Switch Windows
      if (e.altKey && e.key === 'Tab') {
        e.preventDefault();
        const windowIds = Object.keys(windows) as WindowType[];
        const openWindows = windowIds.filter(id => windows[id].isOpen);
        if (openWindows.length > 1) {
          const currentIndex = openWindows.indexOf(activeWindowId as WindowType);
          const nextIndex = (currentIndex + 1) % openWindows.length;
          focusWindow(openWindows[nextIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [status, openWindow, windows, activeWindowId, focusWindow]);

  return (
    <main className="h-screen w-full overflow-hidden bg-black select-none">
      <AnimatePresence mode="wait">
        {status === 'booting' && (
          <motion.div
            key="boot"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <BootScreen />
          </motion.div>
        )}

        {status === 'locked' && (
          <motion.div
            key="lock"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LockScreen />
          </motion.div>
        )}

        {status === 'desktop' && (
          <motion.div
            key="desktop"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full w-full"
          >
            <Desktop />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
