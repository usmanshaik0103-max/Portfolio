'use client';

import { Download, Award, ArrowLeft, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { resumeData, RESUME_PDF_URL } from '@/lib/resume-data';
import { useOSStore } from '@/lib/store';
import { cn } from '@/lib/utils';

export function Resume() {
  const { resumeSection, setResumeSection } = useOSStore();

  const handleDownload = () => {
    window.parent.postMessage({ 
      type: "OPEN_EXTERNAL_URL", 
      data: { url: RESUME_PDF_URL } 
    }, "*");
  };

  const sections = [
    { id: 'summary', title: 'Summary', icon: resumeData.summary.icon, content: (
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          {resumeData.summary.icon}
          {resumeData.summary.title}
        </h2>
        <p className="text-lg leading-relaxed text-gray-400">
          {resumeData.summary.content}
        </p>
      </motion.section>
    )},
    { id: 'skills', title: 'Skills', icon: resumeData.skills.icon, content: (
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          {resumeData.skills.icon}
          {resumeData.skills.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resumeData.skills.sections.map((section, idx) => (
            <div key={idx} className="bg-white/5 p-4 rounded-lg border border-white/5">
              <h3 className="text-blue-400 font-semibold mb-3">{section.name}</h3>
              <div className="flex flex-wrap gap-2">
                {section.items.map((item, i) => (
                  <span key={i} className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    )},
    { id: 'experience', title: 'Experience', icon: resumeData.experience.icon, content: (
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          {resumeData.experience.icon}
          {resumeData.experience.title}
        </h2>
        <div className="space-y-8">
          {resumeData.experience.items.map((item, idx) => (
            <div key={idx} className="relative pl-6 border-l border-white/10">
              <div className="absolute left-[-5px] top-2 w-[9px] h-[9px] rounded-full bg-orange-400 shadow-[0_0_10px_rgba(251,146,60,0.5)]" />
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 gap-1">
                <div>
                  <h3 className="text-xl font-bold text-white">{item.role}</h3>
                  <p className="text-orange-400 font-medium">{item.company}</p>
                </div>
                <div className="md:text-right">
                  <p className="text-sm text-gray-400">{item.period}</p>
                  <p className="text-xs text-gray-500">{item.location}</p>
                </div>
              </div>
              <ul className="list-disc list-inside space-y-2 text-gray-400">
                {item.bullets.map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.section>
    )},
    { id: 'projects', title: 'Projects', icon: resumeData.projects.icon, content: (
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          {resumeData.projects.icon}
          {resumeData.projects.title}
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {resumeData.projects.items.map((project, idx) => (
            <div key={idx} className="bg-white/5 p-5 rounded-lg border border-white/5 hover:border-purple-400/50 transition-colors group">
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                {project.name}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {project.description}
              </p>
            </div>
          ))}
        </div>
      </motion.section>
    )},
    { id: 'education', title: 'Education', icon: resumeData.education.icon, content: (
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          {resumeData.education.icon}
          {resumeData.education.title}
        </h2>
        <div className="space-y-6">
          {resumeData.education.items.map((edu, idx) => (
            <div key={idx} className="bg-white/5 p-6 rounded-lg border border-white/5">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{edu.school}</h3>
                  <p className="text-yellow-400 font-medium">{edu.degree}</p>
                  <p className="text-gray-400 mt-2">CGPA: <span className="text-white">{edu.cgpa}</span></p>
                </div>
                <div className="md:text-right text-sm text-gray-400">
                  <p>{edu.period}</p>
                  <p>{edu.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    )},
    { id: 'certifications', title: 'Certifications', icon: resumeData.certifications.icon, content: (
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pb-12"
      >
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          {resumeData.certifications.icon}
          {resumeData.certifications.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resumeData.certifications.items.map((cert, idx) => (
            <div key={idx} className="flex items-center gap-4 bg-white/5 p-4 rounded-lg border border-white/5 hover:bg-white/10 transition-colors">
              <div className="p-2 rounded-full bg-red-400/10">
                <Award className="w-5 h-5 text-red-400" />
              </div>
              <span className="text-gray-300 font-medium text-sm">{cert}</span>
            </div>
          ))}
        </div>
      </motion.section>
    )},
  ];

  const activeSection = sections.find(s => s.id === resumeSection);

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e]">
      {/* Horizontal Menu Header */}
      <div className="bg-[#252525] border-b border-white/5 p-2 overflow-x-auto custom-scrollbar">
        <div className="flex items-center gap-2 min-w-max px-2">
          <button
            onClick={() => setResumeSection(null)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-md transition-colors text-sm whitespace-nowrap",
              resumeSection === null ? "bg-white/10 text-white shadow-sm shadow-black/20" : "text-white/60 hover:bg-white/5"
            )}
          >
            <FileText className="w-4 h-4 text-orange-400" />
            <span>Full Resume</span>
          </button>
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setResumeSection(section.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-md transition-colors text-sm whitespace-nowrap",
                resumeSection === section.id ? "bg-white/10 text-white shadow-sm shadow-black/20" : "text-white/60 hover:bg-white/5"
              )}
            >
              <span className="w-4 h-4 flex items-center justify-center">{section.icon}</span>
              <span>{section.title}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="max-w-4xl mx-auto p-8 space-y-12">
          {/* Header Action Bar */}
          <div className="flex justify-between items-center border-b border-white/10 pb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {activeSection ? activeSection.title : 'Resume'}
              </h1>
              <p className="text-gray-400">Usman Shaik • DevOps Engineer</p>
            </div>
            <button 
              onClick={handleDownload}
              className="flex items-center gap-2 py-2.5 px-5 rounded-md bg-[#e95420] hover:bg-[#e95420]/80 transition-colors text-white font-medium shadow-lg"
            >
              <Download className="w-5 h-5" />
              Download CV
            </button>
          </div>

          {/* Content */}
          <div className="space-y-16">
            {activeSection ? (
              activeSection.content
            ) : (
              sections.map((s, i) => (
                <div key={s.id}>
                  {s.content}
                  {i < sections.length - 1 && <div className="h-px bg-white/5 mt-16" />}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
