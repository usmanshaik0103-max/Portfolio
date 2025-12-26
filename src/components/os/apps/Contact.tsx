'use client';

import { useState } from 'react';
import { Mail, Linkedin, Send, MessageSquare, Phone } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Contact() {
  const [activeTab, setActiveTab] = useState('socials');

  const tabs = [
    { id: 'socials', name: 'Social Links', icon: <Linkedin className="w-4 h-4 text-blue-400" /> },
    { id: 'message', name: 'Send Message', icon: <MessageSquare className="w-4 h-4 text-orange-400" /> },
  ];

  const socialLinks = [
    {
      name: 'Phone',
      value: '+91 7075505956',
      href: 'tel:+917075505956',
      icon: <Phone className="w-4 h-4 text-emerald-500" />,
      color: 'group-hover:bg-emerald-500/20'
    },
    {
      name: 'Email',
      value: 'usmanshaiik2003@gmail.com',
      href: 'mailto:usmanshaiik2003@gmail.com',
      icon: <Mail className="w-4 h-4 text-pink-500" />,
      color: 'group-hover:bg-pink-500/20'
    },
      {
        name: 'LinkedIn',
        value: 'in/usman-shaiik',
        href: 'https://linkedin.com/in/usman-shaiik',
        icon: <Linkedin className="w-4 h-4 text-blue-500" />,
        color: 'group-hover:bg-blue-500/20'
      }
    ];

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e]">
      {/* Tab Header */}
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

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {activeTab === 'socials' && (
          <div className="p-8 space-y-6">
            <h2 className="text-xl font-bold border-b border-white/10 pb-2 text-white">Social Connections</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {socialLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => {
                    window.parent.postMessage({ 
                      type: "OPEN_EXTERNAL_URL", 
                      data: { url: link.href } 
                    }, "*");
                  }}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className={cn("p-2.5 rounded-lg bg-white/5 transition-colors", link.color)}>
                      {link.icon}
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="font-bold text-white group-hover:text-white transition-colors">{link.name}</span>
                      <span className="text-xs text-white/40 group-hover:text-white/60 transition-colors">{link.value}</span>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Send className="w-3 h-3 text-white/40 rotate-45" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'message' && (
          <div className="p-8 space-y-8">
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="flex items-center gap-3 text-white/60 mb-2">
                <MessageSquare className="w-5 h-5" />
                <h3 className="text-xl font-bold text-white">Send a message</h3>
              </div>
              
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80 ml-1">Name</label>
                    <Input 
                      placeholder="Usman Shaiik" 
                      className="bg-white/5 border-white/10 focus:border-white/20 h-12 text-white" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80 ml-1">Email</label>
                    <Input 
                      placeholder="usmanshaiik2003@gmail.com" 
                      className="bg-white/5 border-white/10 focus:border-white/20 h-12 text-white" 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80 ml-1">Message</label>
                  <Textarea 
                    placeholder="Hi Usman, I'd like to talk about..." 
                    className="bg-white/5 border-white/10 focus:border-white/20 min-h-[160px] text-white text-base resize-none" 
                  />
                </div>
                
                <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white gap-2 h-14 text-lg font-bold shadow-lg shadow-orange-900/20 transition-all hover:scale-[1.01] active:scale-[0.99]">
                  <Send className="w-5 h-5" />
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

