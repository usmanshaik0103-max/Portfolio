'use client';

import { User, Code2, GraduationCap, MapPin, Award } from 'lucide-react';

export function About() {
  return (
    <div className="relative h-full overflow-y-auto custom-scrollbar bg-[#1e1e1e]">
      {/* Colorful gradient header background */}
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-br from-[#e95420] via-[#772953] to-[#4a0a2c] opacity-20 blur-3xl -z-10" />
      
      <div className="p-8 max-w-2xl mx-auto space-y-12">
        <section className="flex flex-col md:flex-row gap-8 items-start md:items-center relative">
          <div className="relative group">
              <div className="w-40 h-40 rounded-3xl overflow-hidden border-4 border-[#e95420] shadow-[0_0_30px_rgba(233,84,32,0.4)] relative z-10 transition-all duration-500 group-hover:scale-105 group-hover:shadow-[0_0_50px_rgba(233,84,32,0.6)]">
                      <img 
                        src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_20251226_123819-resized-1766748548548.jpg?width=8000&height=8000&resize=contain" 
                        alt="Profile" 
                        className="w-full h-full object-cover transition-all duration-500 group-hover:brightness-110"
                      />
                </div>
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#e95420] via-[#f4744b] to-[#772953] blur-2xl opacity-30 group-hover:opacity-60 transition-opacity duration-500 rounded-full" />
          </div>
          
          <div className="space-y-3">
              <h1 className="text-5xl font-extrabold text-white tracking-tight drop-shadow-sm">Usman Shaik</h1>
                <div className="flex flex-wrap gap-2">
                    <p className="px-3 py-1 bg-[#e95420]/20 text-[#e95420] font-bold tracking-wide flex items-center gap-2 uppercase text-[10px] rounded-full border border-[#e95420]/30">
                      <span className="w-1.5 h-1.5 bg-[#e95420] rounded-full animate-pulse" />
                      DevOps Engineer
                    </p>
                </div>
            <div className="flex gap-4 pt-2">
               <div className="flex items-center gap-2 text-white/60 text-xs bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                  <MapPin className="w-3.5 h-3.5 text-orange-400" />
                  <span>Bengaluru, KA</span>
                </div>
                <div className="flex items-center gap-2 text-white/60 text-xs bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                  <GraduationCap className="w-3.5 h-3.5 text-blue-400" />
                  <span>B.Tech Graduate</span>
                </div>
            </div>
          </div>
        </section>

        <section className="space-y-4 bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors group">
          <div className="flex items-center gap-3 text-blue-400">
            <User className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <h2 className="text-xl font-bold text-white">Biography</h2>
          </div>
          <p className="text-orange-400 leading-relaxed font-medium italic text-lg">
            "Infrastructure as Code is not just a practice, it's a philosophy of reliability."
          </p>
          <p className="text-white/70 leading-relaxed text-base">
            I'm Usman Shaik, a DevOps Engineer dedicated to building robust, automated systems. My expertise spans cloud infrastructure, CI/CD optimization, and full-stack development. I thrive at the intersection of development and operations, ensuring that software is not just built well, but runs flawlessly.
          </p>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-3 text-emerald-400">
            <Code2 className="w-6 h-6" />
            <h2 className="text-xl font-bold text-white">Tech Stack & Expertise</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {[
              { title: 'Cloud & Infrastructure', skills: 'AWS, Terraform, Docker, Kubernetes', color: 'blue' },
                { title: 'DevOps & CI/CD', skills: 'Jenkins, Ansible, CI/CD Pipelines', color: 'emerald' },
              { title: 'Monitoring & Ops', skills: 'Prometheus, Grafana, Datadog', color: 'orange' },
              { title: 'Programming', skills: 'Python, Java, Node.js, Shell Scripting', color: 'purple' },
            ].map((item, idx) => (
               <div key={idx} className="bg-white/5 p-4 rounded-xl border border-white/10 hover:border-white/20 transition-all hover:-translate-y-1">
                  <div className="font-bold mb-2 text-white flex items-center gap-2">
                    <div className={`w-1 h-4 bg-${item.color}-500 rounded-full`} />
                    {item.title}
                  </div>
                  <div className="text-white/50">{item.skills}</div>
               </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3 text-yellow-400">
            <Award className="w-6 h-6" />
            <h2 className="text-xl font-bold text-white">Key Certifications</h2>
          </div>
          <div className="grid grid-cols-1 gap-3 text-sm">
            {[
              { name: 'AWS Certified Cloud Practitioner', type: 'Cloud' },
              { name: 'Docker Certified Associate', type: 'DevOps' },
              { name: 'Full Stack Web Development', type: 'Dev' }
            ].map((cert, i) => (
              <div key={i} className="bg-gradient-to-r from-white/5 to-transparent p-4 rounded-xl border border-white/10 flex items-center justify-between hover:from-white/10 transition-all">
                <span className="text-white font-medium">{cert.name}</span>
                <Badge variant="outline" className="bg-orange-600/20 text-orange-400 border-orange-600/30">
                  {cert.type}
                </Badge>
              </div>
            ))}
          </div>
        </section>

        <div className="flex flex-wrap gap-8 text-sm text-white/40 pt-8 border-t border-white/10 pb-12">
          <div className="flex items-center gap-2 hover:text-white transition-colors cursor-default">
            <MapPin className="w-4 h-4 text-[#e95420]" />
            <span>Bengaluru, Karnataka, India</span>
          </div>
          <div className="flex items-center gap-2 hover:text-white transition-colors cursor-default">
            <GraduationCap className="w-4 h-4 text-blue-400" />
            <span>B.Tech | CGPA: 8.23</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Badge({ children, variant, className }: { children: React.ReactNode, variant: string, className?: string }) {
  return (
    <span className={`px-2 py-0.5 rounded-full border border-white/10 text-white/60 ${className}`}>
      {children}
    </span>
  );
}
