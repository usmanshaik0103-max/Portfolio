'use client';

import { useOSStore } from '@/lib/store';
import { TopBar } from './TopBar';
import { Dock } from './Dock';
import { Window } from './Window';
import { motion } from 'framer-motion';
import { 
  User, 
  Code, 
  Briefcase, 
FileText, 
GraduationCap, 
Award, 
Download, 
Layout, 
  Terminal as TerminalIcon, 
  Settings as SettingsIcon, 
  Mail, 
  Image as ImageIcon,
  RefreshCw
} from 'lucide-react';
import { Terminal } from './apps/Terminal';
import { Projects } from './apps/Projects';
import { About } from './apps/About';
import { Contact } from './apps/Contact';
import { Settings } from './apps/Settings';
import { Resume } from './apps/Resume';
import { ImageViewer } from './apps/ImageViewer';
import img from "../../../public/Sad DeveloperDesigner.gif";
import Image from 'next/image';

function DesktopIcon({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="flex flex-col items-center gap-2 group w-24"
    >
      <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-white/20 transition-all shadow-lg">
        {icon}
      </div>
      <span className="text-white text-xs font-medium drop-shadow-lg text-center bg-black/20 px-2 py-0.5 rounded-full whitespace-nowrap">
        {label}
      </span>
    </motion.button>
  );
}

    export function Desktop() {
      const { windows, openWindow, queueAppLaunch, queueTerminalCommand, setImageUrl } = useOSStore();
  
    const handleDownload = () => {
      window.parent.postMessage({ 
        type: "OPEN_EXTERNAL_URL", 
        data: { url: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/Usman-CV-1766733531090.pdf" } 
      }, "*");
    };
  
    return (
      <div 
        className="fixed inset-0 overflow-hidden flex flex-col font-sans bg-gradient-to-br from-[#772953] via-[#772953] to-[#e95420]"
      >
        <TopBar />
        
        <div className="flex-1 relative flex">
          <Dock />
          <div className="flex-1 relative">
            
      {/* Desktop Icons */}
                    <div className="absolute top-4 sm:top-16 left-4 sm:left-24 right-4 sm:right-4 grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 sm:gap-8 items-start z-10 overflow-y-auto max-h-[calc(100vh-120px)] p-2 no-scrollbar">
                      <DesktopIcon 
                        icon={<RefreshCw className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />} 
                        label="System Update" 
                        onClick={() => queueTerminalCommand('sudo apt update')} 
                      />
                      <DesktopIcon 
                        icon={<User className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" />} 
                        label="Profile" 
                        onClick={() => openWindow('about')} 
                      />
                <DesktopIcon 
                  icon={<FileText className="w-8 h-8 text-orange-400" />} 
                  label="Summary" 
                  onClick={() => openWindow('resume', 'summary')} 
                />
                <DesktopIcon 
                  icon={<Code className="w-8 h-8 text-emerald-400" />} 
                  label="Skills" 
                  onClick={() => openWindow('resume', 'skills')} 
                />
                <DesktopIcon 
                  icon={<GraduationCap className="w-8 h-8 text-yellow-400" />} 
                  label="Education" 
                  onClick={() => openWindow('resume', 'education')} 
                />
                <DesktopIcon 
                  icon={<Briefcase className="w-8 h-8 text-orange-400" />} 
                  label="Experience" 
                  onClick={() => openWindow('resume', 'experience')} 
                />
                <DesktopIcon 
                  icon={<Layout className="w-8 h-8 text-emerald-400" />} 
                  label="Projects" 
                  onClick={() => openWindow('projects')} 
                />
                <DesktopIcon 
                  icon={<Award className="w-8 h-8 text-red-400" />} 
                  label="Certifications" 
                  onClick={() => openWindow('resume', 'certifications')} 
                />
                <DesktopIcon 
                  icon={<Mail className="w-8 h-8 text-pink-400" />} 
                  label="Contact" 
                  onClick={() => openWindow('contact')} 
                />
                <DesktopIcon 
                  icon={<TerminalIcon className="w-8 h-8 text-gray-300" />} 
                  label="Terminal" 
                  onClick={() => queueAppLaunch('terminal')} 
                />
                  <DesktopIcon 
                    icon={<Download className="w-8 h-8 text-orange-500" />} 
                    label="Download CV" 
                    onClick={handleDownload} 
                  />
                  <DesktopIcon 
                    icon={<SettingsIcon className="w-8 h-8 text-gray-400" />} 
                    label="Settings" 
                    onClick={() => openWindow('settings')} 
                  />
              </div>


            {/* Windows */}
            <Window id="terminal" title="Terminal" icon={<TerminalIcon className="w-4 h-4" />}>
              <Terminal />
            </Window>
            
            <Window id="projects" title="Projects" icon={<Layout className="w-4 h-4 text-emerald-400" />}>
              <Projects />
            </Window>

            <Window id="about" title="Profile" icon={<User className="w-4 h-4 text-orange-500" />}>
              <About />
            </Window>

            <Window id="contact" title="Contact" icon={<Mail className="w-4 h-4 text-pink-400" />}>
              <Contact />
            </Window>

            <Window id="resume" title="Resume Viewer" icon={<FileText className="w-4 h-4 text-orange-400" />}>
              <Resume />
            </Window>

            <Window id="settings" title="Settings" icon={<SettingsIcon className="w-4 h-4 text-gray-400" />}>
              <Settings />
            </Window>

              <Window id="imageViewer" title="Image Viewer" icon={<ImageIcon className="w-4 h-4 text-blue-400" />}>
                <ImageViewer />
              </Window>


<Image
  src={img}
  
  alt="Desktop animation"
  width={260}
  height={260}
  unoptimized
  priority
  className="absolute bottom-25 right-4 opacity-80 pointer-events-none"
/>


        </div>
      </div>
    </div>
  );
}
