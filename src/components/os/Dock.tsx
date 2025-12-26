'use client';

import { useOSStore, WindowType } from '@/lib/store';
import { 
  Terminal as TerminalIcon, 
  Layout, 
  User, 
  Mail, 
  Settings, 
  Code,
  Briefcase,
  FileText,
  GraduationCap,
  Award,
  Download
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface DockItemProps {
  id: WindowType | 'download';
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  section?: string;
  color?: string;
}

function DockItem({ id, icon, label, onClick, section, color }: DockItemProps) {
  const { queueAppLaunch, focusWindow, windows, openWindow } = useOSStore();
  
  const isActive = id !== 'download' && windows[id as WindowType]?.isOpen;

  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }

    if (id === 'download') return;

    if (id === 'resume' && section) {
      openWindow('resume', section);
      return;
    }

    if (!isActive) {
      queueAppLaunch(id as WindowType);
    } else {
      focusWindow(id as WindowType);
    }
  };

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.button
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleClick}
            className={`relative p-2.5 rounded-xl transition-all duration-200 hover:bg-white/10 group flex items-center justify-center`}
          >
            <div className={`${color || 'text-white/90 group-hover:text-white'} transition-colors`}>
              {icon}
            </div>
            {isActive && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-3 bg-white rounded-r-full" />
            )}
          </motion.button>
        </TooltipTrigger>
        <TooltipContent side="right" className="bg-[#2D2D2D] text-white border-white/10 text-xs py-1 px-2">
          {label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function Dock() {
  const handleDownload = () => {
    window.parent.postMessage({ 
      type: "OPEN_EXTERNAL_URL", 
      data: { url: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/Usman-CV-1766733531090.pdf" } 
    }, "*");
  };

    return (
      <div className="fixed sm:left-2 bottom-2 sm:top-10 left-2 right-2 sm:right-auto sm:bottom-2 sm:w-16 h-14 sm:h-auto bg-[#1d1d1d]/90 backdrop-blur-md border border-white/5 rounded-2xl flex flex-row sm:flex-col items-center justify-center sm:justify-start py-2 sm:py-4 px-4 sm:px-0 gap-1 sm:gap-1.5 z-[90] shadow-2xl overflow-x-auto sm:overflow-y-auto no-scrollbar">
        {/* 1. Profile */}
        <DockItem id="about" icon={<User className="w-5 h-5 sm:w-6 sm:h-6" />} label="Profile" color="text-orange-500" />
        
        {/* 2. Summary */}
        <DockItem id="resume" section="summary" icon={<FileText className="w-5 h-5 sm:w-6 sm:h-6" />} label="Summary" color="text-orange-400" />
        
        {/* 3. Skills */}
        <DockItem id="resume" section="skills" icon={<Code className="w-5 h-5 sm:w-6 sm:h-6" />} label="Skills" color="text-emerald-400" />
        
        {/* 4. Education */}
        <DockItem id="resume" section="education" icon={<GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />} label="Education" color="text-yellow-400" />
        
        {/* 5. Experience */}
        <DockItem id="resume" section="experience" icon={<Briefcase className="w-5 h-5 sm:w-6 sm:h-6" />} label="Experience" color="text-orange-400" />
        
        {/* 6. Projects */}
        <DockItem id="projects" icon={<Layout className="w-5 h-5 sm:w-6 sm:h-6" />} label="Projects" color="text-emerald-400" />
        
        {/* 7. Certifications */}
        <DockItem id="resume" section="certifications" icon={<Award className="w-5 h-5 sm:w-6 sm:h-6" />} label="Certifications" color="text-red-400" />
        
        {/* 8. Contact */}
        <DockItem id="contact" icon={<Mail className="w-5 h-5 sm:w-6 sm:h-6" />} label="Contact" color="text-pink-400" />
        
        {/* 9. Terminal */}
        <DockItem id="terminal" icon={<TerminalIcon className="w-5 h-5 sm:w-6 sm:h-6" />} label="Terminal" color="text-gray-300" />
        
        {/* 10. Resume Download */}
        <DockItem id="download" icon={<Download className="w-5 h-5 sm:w-6 sm:h-6" />} label="Download CV" onClick={handleDownload} color="text-orange-500" />
        
          {/* 11. Settings */}
          <DockItem id="settings" icon={<Settings className="w-5 h-5 sm:w-6 sm:h-6" />} label="Settings" color="text-gray-400" />
        </div>
    );
}
