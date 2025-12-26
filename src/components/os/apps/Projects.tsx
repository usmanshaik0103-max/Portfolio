'use client';

import { ExternalLink, Code2, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const projects = [
  {
    title: "Push Notification Platform",
    description: "Designed and developed a platform supporting real-time campaign delivery, user segmentation, and website tracking for high-volume notification delivery.",
    tech: ["React.js", "Node.js", "NestJS", "MySQL", "TypeORM"],
    image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=2070&auto=format&fit=crop",
    live: "#"
  },
  {
    title: "DevOps Operations Dashboard",
    description: "Built an end-to-end full-stack web application to monitor Kubernetes clusters, CI/CD pipelines, production alerts, and overall system health using SRE reliability metrics.",
    tech: ["React.js", "Node.js", "Kubernetes", "Jenkins", "Docker"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    live: "#"
  },
  {
    title: "AI-Based Auto SRE System",
    description: "Developed a self-healing SRE platform that processes monitoring alerts, detects anomalies, and tracks remediation status in real time with AI-driven workflows.",
    tech: ["NestJS", "Python", "Prometheus", "Grafana", "AI"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop",
    live: "#"
  },
    {
      title: "AI Interview Simulator",
      description: "Built a full-stack AI-powered interview platform supporting 1:1 and panel scenarios with face/voice interaction and automated performance reports.",
      tech: ["React.js", "Node.js", "Generative AI", "WebRTC"],
      image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=1974&auto=format&fit=crop",
      live: "#"
    },
    {
      title: "Developer Diary Application",
      description: "Developed a full-stack Java web application for developers to log daily work, learning progress, issues, and solutions. Implemented secure authentication, structured entries, and searchable records.",
      tech: ["Java", "Spring Boot", "MySQL", "Thymeleaf"],
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop",
      live: "#"
    },
    {
      title: "Future AI Assistant System",
      description: "Built a full-stack Java-based AI assistant capable of responding to text and voice commands. Integrated intelligent request handling for technical and general-purpose assistance.",
      tech: ["Java", "NLP", "Spring Boot", "Voice Processing"],
      image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=2070&auto=format&fit=crop",
      live: "#"
    },
    {
      title: "Typing Speed Test Platform",
      description: "Developed a full-stack Java application to measure typing speed, accuracy, and error rate in real time. Implemented performance analytics, user history tracking, and result visualization.",
      tech: ["Java", "Spring Boot", "MySQL", "JavaScript"],
      image: "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?q=80&w=2070&auto=format&fit=crop",
      live: "#"
    },
    {
      title: "Health Monitoring System",
      description: "Built a full-stack Java-based health monitoring platform to track user health parameters and visualize trends. Implemented secure data handling and real-time dashboards.",
      tech: ["Java", "Spring Boot", "IoT", "Data Visualization"],
      image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=2070&auto=format&fit=crop",
      live: "#"
    },
    {
      title: "Alkimi Hackathon Project (SUI)",
      description: "Developed a full-stack Java-oriented application during the Alkimi Hackathon using the SUI ecosystem. Focused on rapid prototyping, scalability, and real-world problem solving.",
      tech: ["Java", "SUI Ecosystem", "Cloud Architecture"],
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop",
      live: "#"
    },
    {
      title: "Theatre Food Ordering System",
      description: "Built a full-stack Java web application enabling seat-based food ordering in theatres. Implemented real-time order tracking along with admin and vendor dashboards.",
      tech: ["Java", "Spring Boot", "MySQL", "Real-time"],
      image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2070&auto=format&fit=crop",
      live: "#"
    },
    {
      title: "StrictBuzz Cricket Platform",
      description: "Developed a full-stack Java-based cricket analytics and engagement application. Implemented match insights, player statistics, and interactive user features.",
      tech: ["Java", "Spring Boot", "MySQL", "Analytics"],
      image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=2070&auto=format&fit=crop",
      live: "#"
    }

];

export function Projects() {
  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
        <Layers className="w-6 h-6 text-emerald-400" />
        <h2 className="text-xl font-bold">Featured Projects</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((p, i) => (
          <div key={i} className="bg-[#252525] rounded-xl overflow-hidden border border-white/5 hover:border-white/10 transition-colors group">
            <div className="aspect-video relative overflow-hidden">
              <img src={p.image} alt={p.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <h3 className="text-lg font-bold">{p.title}</h3>
                <div className="flex gap-2">
                    <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            <div className="p-4 space-y-4">
              <p className="text-sm text-white/60 leading-relaxed">
                {p.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {p.tech.map(t => (
                  <Badge key={t} variant="outline" className="bg-white/5 border-white/10 text-[10px] font-mono text-emerald-400/80">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
