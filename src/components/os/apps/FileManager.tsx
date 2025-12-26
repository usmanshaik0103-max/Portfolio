'use client';

import { useState } from 'react';
import { Folder, File, ChevronRight, Download, Clock, HardDrive, User, Star, Award, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useOSStore } from '@/lib/store';

const folders = [
  { id: 'about', name: 'About', icon: <User className="w-4 h-4 text-blue-400" /> },
  { id: 'skills', name: 'Skills', icon: <Star className="w-4 h-4 text-yellow-400" /> },
  { id: 'experience', name: 'Experience', icon: <Clock className="w-4 h-4 text-emerald-400" /> },
  { id: 'projects', name: 'Projects', icon: <HardDrive className="w-4 h-4 text-purple-400" /> },
  { id: 'certifications', name: 'Certifications', icon: <Award className="w-4 h-4 text-orange-400" /> },
];

const folderContents: Record<string, { name: string, size: string, type: string, url?: string }[]> = {
  about: [
    { name: 'Biography.txt', size: '2 KB', type: 'Text Document' },
    { name: 'Education.pdf', size: '450 KB', type: 'PDF Document', url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/Usman-CV-1766733531090.pdf' },
    { name: 'Profile_Pic.png', size: '1.2 MB', type: 'PNG Image', url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_20251226_123819-resized-1766748548548.jpg' },
  ],
  skills: [
    { name: 'Tech_Stack.json', size: '1 KB', type: 'JSON File' },
    { name: 'Cloud_Skills.docx', size: '15 KB', type: 'Word Document' },
  ],
  experience: [
    { name: 'StarAgile_Internship.md', size: '3 KB', type: 'Markdown' },
    { name: 'Letsnotify_FullStack.md', size: '4 KB', type: 'Markdown' },
  ],
  projects: [
    { name: 'DevOps_Dashboard.zip', size: '12 MB', type: 'ZIP Archive' },
    { name: 'AI_Auto_SRE.zip', size: '8 MB', type: 'ZIP Archive' },
    { name: 'AI_Interview_Simulator.zip', size: '15 MB', type: 'ZIP Archive' },
    { name: 'Push_Notification_Platform.zip', size: '10 MB', type: 'ZIP Archive' },
  ],
  certifications: [
    { name: 'AWS_Cloud_Practitioner.pdf', size: '800 KB', type: 'PDF Document' },
    { name: 'Docker_Associate.pdf', size: '750 KB', type: 'PDF Document' },
    { name: 'FullStack_Cert.pdf', size: '900 KB', type: 'PDF Document' },
  ]
};

export function FileManager() {
  const [activeFolder, setActiveFolder] = useState('about');
  const { openWindow } = useOSStore();

  const handleFileClick = (file: any) => {
    if (file.type === 'PNG Image' || file.type === 'JPG Image') {
      openWindow('imageViewer', undefined, file.url);
    } else if (file.type === 'PDF Document' && file.url) {
      window.parent.postMessage({ type: "OPEN_EXTERNAL_URL", data: { url: file.url } }, "*");
    } else {
      // For other files, just show a "simulated" open
      console.log(`Opening ${file.name}...`);
    }
  };

  return (
    <div className="flex h-full bg-[#1e1e1e] text-sm">
      {/* Sidebar */}
      <div className="w-48 bg-[#252525] border-r border-white/5 p-2 space-y-1">
        <div className="px-3 py-2 text-xs font-bold text-white/40 uppercase tracking-wider">Places</div>
        {folders.map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFolder(f.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-1.5 rounded-md transition-colors",
              activeFolder === f.id ? "bg-white/10 text-white shadow-sm" : "text-white/60 hover:bg-white/5 hover:text-white"
            )}
          >
            {f.icon}
            <span>{f.name}</span>
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="h-12 border-b border-white/5 flex items-center px-4 gap-4 bg-[#252525]/80 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-white/40 overflow-hidden">
            <span className="hover:text-white cursor-pointer transition-colors">Home</span>
            <ChevronRight className="w-3 h-3 flex-shrink-0" />
            <span className="text-white font-medium truncate">{activeFolder.charAt(0).toUpperCase() + activeFolder.slice(1)}</span>
          </div>
        </div>

        <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {folderContents[activeFolder]?.map((file) => (
              <div
                key={file.name}
                onClick={() => handleFileClick(file)}
                className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-white/5 cursor-pointer group transition-all hover:scale-105 active:scale-95"
              >
                <div className="relative">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-white/10 transition-colors border border-white/5 group-hover:border-white/20">
                    {file.type.includes('Image') ? (
                      <Eye className="w-8 h-8 text-blue-400/60 group-hover:text-blue-400 transition-colors" />
                    ) : (
                      <File className="w-8 h-8 text-white/20 group-hover:text-white/40 transition-colors" />
                    )}
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-[#e95420] rounded-full p-1.5 shadow-lg opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
                    <Download className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div className="space-y-1 text-center">
                  <div className="text-white/80 group-hover:text-white font-medium truncate max-w-[120px]">{file.name}</div>
                  <div className="text-[10px] text-white/30 font-mono">{file.size} • {file.type.split(' ')[0]}</div>
                </div>
              </div>
            ))}
          </div>
          
          {(!folderContents[activeFolder] || folderContents[activeFolder].length === 0) && (
            <div className="h-full flex flex-col items-center justify-center text-white/20 gap-4">
               <Folder className="w-16 h-16 opacity-10" />
               <p className="italic">This folder is empty</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
