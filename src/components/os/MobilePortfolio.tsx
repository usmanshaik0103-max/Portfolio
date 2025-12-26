'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Award, Menu, X } from 'lucide-react';
import { resumeData, RESUME_PDF_URL } from '@/lib/resume-data';

export function MobilePortfolio() {
  const [activeSection, setActiveSection] = useState<keyof typeof resumeData>('summary');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleDownload = () => {
    window.parent.postMessage({ 
      type: "OPEN_EXTERNAL_URL", 
      data: { url: RESUME_PDF_URL } 
    }, "*");
  };

  const currentSection = resumeData[activeSection];

  return (
    <div className="h-screen w-full bg-[#0a0a0a] text-gray-300 flex flex-col overflow-hidden">
      {/* Mobile Header */}
      <header className="h-16 border-b border-white/10 flex items-center justify-between px-4 bg-[#111] shrink-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
            <span className="text-blue-400 font-bold text-xs">US</span>
          </div>
          <h1 className="text-white font-bold text-sm tracking-tight">Usman Shaik</h1>
        </div>
        
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 hover:bg-white/5 rounded-md transition-colors"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="p-6 pb-24"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-white/5">
                {currentSection.icon}
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                {currentSection.title}
              </h2>
            </div>

            {activeSection === 'summary' && (
              <div className="space-y-6">
                <p className="text-lg leading-relaxed text-gray-400">
                  {resumeData.summary.content}
                </p>
                <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/10">
                  <h3 className="text-white font-bold mb-2">Available for Work</h3>
                  <p className="text-sm text-gray-400">Looking for DevOps and SRE roles.</p>
                </div>
              </div>
            )}

            {activeSection === 'skills' && (
              <div className="space-y-6">
                {resumeData.skills.sections.map((section, idx) => (
                  <div key={idx} className="bg-white/5 p-5 rounded-2xl border border-white/5">
                    <h3 className="text-blue-400 font-bold mb-4 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      {section.name}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {section.items.map((item, i) => (
                        <span key={i} className="px-3 py-1.5 bg-white/5 rounded-full text-xs text-gray-300 border border-white/5">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeSection === 'experience' && (
              <div className="space-y-8">
                {resumeData.experience.items.map((item, idx) => (
                  <div key={idx} className="relative pl-6 border-l border-white/10">
                    <div className="absolute left-[-5px] top-2 w-[9px] h-[9px] rounded-full bg-orange-400 shadow-[0_0_10px_rgba(251,146,60,0.5)]" />
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-white mb-1">{item.role}</h3>
                      <p className="text-orange-400 font-medium text-sm">{item.company}</p>
                      <div className="flex gap-3 mt-1">
                        <span className="text-xs text-gray-500">{item.period}</span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500">{item.location}</span>
                      </div>
                    </div>
                    <ul className="space-y-3">
                      {item.bullets.map((bullet, i) => (
                        <li key={i} className="text-sm text-gray-400 leading-relaxed flex gap-3">
                          <span className="text-orange-400/50 mt-1.5 flex-shrink-0">•</span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {activeSection === 'projects' && (
              <div className="grid grid-cols-1 gap-4">
                {resumeData.projects.items.map((project, idx) => (
                  <div key={idx} className="bg-white/5 p-6 rounded-2xl border border-white/5 active:bg-white/10 transition-colors">
                    <h3 className="text-lg font-bold text-white mb-2">
                      {project.name}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {activeSection === 'education' && (
              <div className="space-y-6">
                {resumeData.education.items.map((edu, idx) => (
                  <div key={idx} className="bg-white/5 p-6 rounded-2xl border border-white/5">
                    <h3 className="text-lg font-bold text-white mb-1">{edu.school}</h3>
                    <p className="text-yellow-400 font-medium text-sm mb-3">{edu.degree}</p>
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>{edu.period}</span>
                        <span>{edu.location}</span>
                      </div>
                      <div className="pt-3 border-t border-white/5">
                        <span className="text-xs text-gray-400">CGPA: <span className="text-white font-bold">{edu.cgpa}</span></span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeSection === 'certifications' && (
              <div className="grid grid-cols-1 gap-3">
                {resumeData.certifications.items.map((cert, idx) => (
                  <div key={idx} className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                    <div className="p-2 rounded-lg bg-red-400/10">
                      <Award className="w-5 h-5 text-red-400" />
                    </div>
                    <span className="text-sm text-gray-300 font-medium">{cert}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating Menu Toggle (Optional, using header for now) */}
      
      {/* Mobile Sidebar/Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 left-0 bottom-0 w-4/5 max-w-[300px] bg-[#111] border-r border-white/10 z-[70] flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-white/10">
                <button 
                  onClick={handleDownload}
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.98] transition-all text-white font-bold text-sm"
                >
                  <Download className="w-4 h-4" />
                  Download CV
                </button>
              </div>
              
              <div className="flex-1 py-4 overflow-y-auto">
                <p className="px-6 text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-4">Navigation</p>
                {Object.entries(resumeData).map(([key, section]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setActiveSection(key as keyof typeof resumeData);
                      setIsMenuOpen(false);
                    }}
                    className={`flex items-center gap-4 w-full px-6 py-4 text-sm font-medium transition-all ${
                      activeSection === key 
                        ? 'bg-blue-600/10 text-blue-400 border-r-4 border-blue-600' 
                        : 'text-gray-400 hover:bg-white/5'
                    }`}
                  >
                    <div className={`${activeSection === key ? 'text-blue-400' : 'text-gray-500'}`}>
                      {section.icon}
                    </div>
                    {section.title}
                  </button>
                ))}
              </div>

              <div className="p-6 border-t border-white/10 bg-black/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/20">
                    <span className="text-blue-400 font-bold">US</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Usman Shaik</p>
                    <p className="text-[10px] text-gray-500">DevOps Engineer</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
