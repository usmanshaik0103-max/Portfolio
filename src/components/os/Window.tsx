'use client';

import { useOSStore, WindowType } from '@/lib/store';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Square, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface WindowProps {
  id: WindowType;
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export function Window({ id, title, children, icon }: WindowProps) {
  const { windows, closeWindow, minimizeWindow, maximizeWindow, focusWindow, activeWindowId } = useOSStore();
  const windowState = windows[id];
  const constraintsRef = useRef(null);
  const isMobile = useIsMobile();

  if (!windowState.isOpen) return null;

  const isActive = activeWindowId === id;
  const isMaximized = windowState.isMaximized || isMobile;

  return (
    <AnimatePresence>
      {!windowState.isMinimized && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          drag={!isMaximized && !isMobile}
          dragMomentum={false}
          onMouseDown={() => focusWindow(id)}
          style={{ zIndex: windowState.zIndex }}
            className={cn(
              "fixed bg-[#1e1e1e] sm:rounded-lg shadow-2xl flex flex-col overflow-hidden border border-white/10 transition-all duration-300",
                isMaximized 
                  ? "inset-0 top-8 sm:left-0 sm:top-7 bottom-14 sm:bottom-0" 
                  : "w-[95vw] sm:w-[800px] h-[calc(80vh-60px)] sm:h-[500px] top-12 sm:top-20 left-1/2 -translate-x-1/2 sm:left-[20%] sm:translate-x-0"

            )}
        >
          {/* Title Bar */}
          <div 
            className={cn(
              "h-9 flex items-center justify-between px-3 select-none cursor-default",
              isActive ? "bg-[#333333]" : "bg-[#252525]"
            )}
            onDoubleClick={() => maximizeWindow(id)}
          >
            <div className="flex items-center gap-2">
              {icon}
              <span className="text-xs text-white/80 font-medium">{title}</span>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }}
                className="w-6 h-6 rounded-full hover:bg-white/10 flex items-center justify-center text-white/60"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); maximizeWindow(id); }}
                className="w-6 h-6 rounded-full hover:bg-white/10 flex items-center justify-center text-white/60"
              >
                {windowState.isMaximized ? <Copy className="w-3 h-3" /> : <Square className="w-3 h-3" />}
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); closeWindow(id); }}
                className="w-6 h-6 rounded-full bg-orange-600/20 hover:bg-orange-600 flex items-center justify-center text-orange-600 hover:text-white transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto bg-[#1e1e1e] text-white">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
