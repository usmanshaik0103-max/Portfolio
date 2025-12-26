'use client';

import { useOSStore } from '@/lib/store';
import { motion } from 'framer-motion';
import { ZoomIn, ZoomOut, Maximize, RotateCcw } from 'lucide-react';
import { useState } from 'react';

export function ImageViewer() {
  const { imageUrl } = useOSStore();
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  if (!imageUrl) {
    return (
      <div className="flex items-center justify-center h-full text-white/50">
        No image selected
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#2d2d2d]">
      <div className="flex items-center gap-4 p-2 bg-[#1a1a1a] border-b border-white/10">
        <button 
          onClick={() => setZoom(prev => Math.min(prev + 0.2, 3))}
          className="p-1 hover:bg-white/10 rounded text-white/80 transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button 
          onClick={() => setZoom(prev => Math.max(prev - 0.2, 0.5))}
          className="p-1 hover:bg-white/10 rounded text-white/80 transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button 
          onClick={() => {
            setZoom(1);
            setRotation(0);
          }}
          className="p-1 hover:bg-white/10 rounded text-white/80 transition-colors"
          title="Reset"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        <div className="h-4 w-px bg-white/10 mx-2" />
        <span className="text-xs text-white/60 font-mono">
          {Math.round(zoom * 100)}%
        </span>
      </div>
      
      <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NUUVH5z0AEYGJiYmARYGJiYmARYGJiYmARYGJiYmARYGJiYmARYGJiYmABAN39Bg6v7Y8AAAAAAElFTkSuQmCC')] bg-repeat">
        <motion.img
          src={imageUrl}
          alt="Desktop Image"
          className="max-w-none shadow-2xl"
          style={{ 
            scale: zoom,
            rotate: rotation,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      </div>
    </div>
  );
}
