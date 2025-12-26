'use client';

import { Settings as SettingsIcon, Eye, Monitor, Shield, Info, Download } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function Settings() {
  const [activeTab, setActiveTab] = useState('appearance');
  const [recruiterMode, setRecruiterMode] = useState(false);

  const handleDownloadResume = () => {
    window.parent.postMessage({ 
      type: "OPEN_EXTERNAL_URL", 
      data: { url: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/Usman-CV-1766733531090.pdf" } 
    }, "*");
  };

  const tabs = [
    { id: 'appearance', name: 'Appearance', icon: <Eye className="w-4 h-4 text-blue-400" /> },
    { id: 'display', name: 'Display', icon: <Monitor className="w-4 h-4 text-emerald-400" /> },
    { id: 'privacy', name: 'Privacy', icon: <Shield className="w-4 h-4 text-orange-400" /> },
    { id: 'about', name: 'About', icon: <Info className="w-4 h-4 text-purple-400" /> },
  ];

    return (
      <div className="flex flex-col h-full bg-[#1e1e1e]">
        <div className="bg-[#252525] border-b border-white/5 p-2 overflow-x-auto custom-scrollbar">
          <div className="flex items-center gap-2 min-w-max px-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-md transition-colors text-sm whitespace-nowrap",
                  activeTab === tab.id ? "bg-white/10 text-white shadow-sm shadow-black/20" : "text-white/60 hover:bg-white/5"
                )}
              >
                {tab.icon}
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 p-8 space-y-8 overflow-y-auto custom-scrollbar">

        {activeTab === 'appearance' && (
          <>
            <section className="space-y-4">
              <h2 className="text-xl font-bold border-b border-white/10 pb-2 text-white">Experience Settings</h2>
              
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                <div className="space-y-1">
                  <div className="font-medium text-white">Recruiter Quick View</div>
                  <div className="text-xs text-white/40 text-pretty max-w-md">
                    Enable a consolidated dashboard showing all key professional information in one window for fast scanning.
                  </div>
                </div>
                <Switch 
                  checked={recruiterMode} 
                  onCheckedChange={setRecruiterMode}
                  className="data-[state=checked]:bg-orange-600"
                />
              </div>
            </section>

            {recruiterMode && (
              <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                 <div className="p-6 bg-gradient-to-br from-orange-600/20 to-orange-900/10 border border-orange-600/30 rounded-xl space-y-4 shadow-lg shadow-orange-900/20">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-orange-400 flex items-center gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                        Recruiter Dashboard Active
                      </h3>
                        <Button 
                          size="sm" 
                          onClick={handleDownloadResume}
                          className="bg-orange-600 hover:bg-orange-700 text-white gap-2 border-none"
                        >
                          <Download className="w-3 h-3" />
                          Download Resume
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                         <div className="space-y-1">
                            <div className="text-white/40">Role</div>
                              <div className="text-white">DevOps Engineer</div>
                           </div>
                             <div className="space-y-1">
                                <div className="text-white/40">Experience</div>
                                <div className="text-white">1+ Year Experience</div>
                             </div>
                             <div className="space-y-1">
                                <div className="text-white/40">Top Skills</div>
                                <div className="text-white">DevOps, SRE, Fullstack</div>
                             </div>
                         <div className="space-y-1">
                            <div className="text-white/40">Location</div>
                            <div className="text-white">Bengaluru, India</div>
                         </div>
                      </div>
                   </div>
                </div>
              )}
            </>
          )}

            {activeTab === 'display' && (
              <section className="space-y-4">
                <h2 className="text-xl font-bold border-b border-white/10 pb-2 text-white">Display Settings</h2>
                <div className="grid grid-cols-1 gap-4">
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="font-medium text-white mb-2">Desktop Background</div>
                    <div className="flex gap-4 items-center">
                        <div 
                          className="w-24 h-16 rounded-lg bg-gradient-to-br from-[#772953] via-[#772953] to-[#e95420] border-2 border-orange-500 shadow-lg shadow-orange-500/20"
                        />
                        <div className="text-xs text-white/40 italic">
                          Ubuntu Default Gradient Active
                        </div>
                    </div>
                  </div>
                </div>
              </section>
            )}


          {activeTab === 'privacy' && (
            <section className="space-y-4">
              <h2 className="text-xl font-bold border-b border-white/10 pb-2 text-white">Privacy & Security</h2>
              <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-sm text-white/60 italic mb-4">
                "Infrastructure as Code ensures consistent and secure environments."
              </div>

              <div className="space-y-4 p-4 bg-white/5 rounded-xl border border-white/10 max-w-sm">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white/80">System Password</Label>
                  <Input 
                    id="password"
                    type="password" 
                    defaultValue="••••••••••••" 
                    readOnly 
                    className="bg-black/20 border-white/10 text-white"
                  />
                </div>
                <div className="text-[10px] text-white/40 italic">
                  Static system password for administrative operations.
                </div>
              </div>
            </section>
          )}

          {activeTab === 'about' && (
            <section className="space-y-4">
              <h2 className="text-xl font-bold border-b border-white/10 pb-2 text-white">System Information</h2>
              <div className="grid grid-cols-2 gap-4">
                 <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-sm hover:bg-white/10 transition-colors">
                    <div className="text-white/40 mb-1">OS Name</div>
                    <div className="text-white font-medium">Ubuntu 24.04 LTS</div>
                 </div>
                 <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-sm hover:bg-white/10 transition-colors">
                    <div className="text-white/40 mb-1">OS Type</div>
                    <div className="text-white font-medium">64-bit</div>
                 </div>
                 <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-sm hover:bg-white/10 transition-colors">
                    <div className="text-white/40 mb-1">GNOME Version</div>
                    <div className="text-white font-medium">46.0</div>
                 </div>
                 <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-sm hover:bg-white/10 transition-colors">
                    <div className="text-white/40 mb-1">Windowing System</div>
                    <div className="text-white font-medium">Wayland</div>
                 </div>
              </div>
            </section>
          )}
      </div>
    </div>
  );
}
