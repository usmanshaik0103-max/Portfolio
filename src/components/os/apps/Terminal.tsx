'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useOSStore } from '@/lib/store';

interface Command {
  cmd: string;
  output: string | React.ReactNode;
}

const helpOutput = `Available commands:
  about           - Brief biography
  skills          - Technical skills and stack
  experience      - Work history
  projects-list   - List of featured projects
  education       - Academic background
  certifications  - Professional certifications
  contact         - Contact information
  whoami          - Current user profile
  clear           - Clear terminal history
  help            - Show this help message`;

const skillsOutput = `Cloud & Infrastructure: Amazon Web Services, Terraform
DevOps & CI/CD: Jenkins, GitLab CI/CD, Ansible
Containers & Orchestration: Docker, Kubernetes, YAML
Monitoring & Observability: Prometheus, Grafana, Dynatrace, Datadog
Programming & Scripting: Python, Java, JavaScript, Shell Scripting
Frontend & Backend: React.js, Node.js, NestJS
Version Control: Git
Database: MySQL, TypeORM
Operating Systems: Linux, Windows`;

const experienceOutput = `StarAgile | Devops Engineer Intern
May 2025 - Nov 2025 | Bengaluru, Karnataka
- Worked on real-time DevOps and SRE projects with a focus on automation, CI/CD, cloud deployment, and monitoring.
- Designed and implemented end-to-end CI/CD pipelines using Jenkins, Git, Docker, and Kubernetes, reducing build and deployment time.
- Automated infrastructure provisioning using Terraform and Ansible, enabling faster and consistent cloud environment setup.
- Deployed and managed web applications on AWS, following cloud security and scalability best practices.
- Implemented system monitoring and alerting using Prometheus and Grafana to improve application reliability and performance.
- Assisted in AI-driven automation experiments for early issue detection and proactive system monitoring.
- Collaborated with cross-functional teams to improve deployment reliability, reduce manual effort, and support production stability.

Letsnotify Pvt Ltd | Full Stack Developer
Apr 2024 - Apr 2025 | Bengaluru, Karnataka
- Designed, developed, and enhanced a Push Notification Platform supporting real-time campaign delivery, templates, user segmentation, popups, and website tracking.
- Built scalable full-stack features using React.js, Node.js, NestJS, MySQL, and TypeORM to deliver high-volume push notifications and analytics.
- Implemented event-based triggers and social proof notifications to improve user engagement, click-through rates, and retention.
- Developed real-time website tracking and analytics modules to capture user behavior and trigger targeted push notifications.
- Optimized backend APIs and database queries to improve performance, reliability, and scalability of notification delivery.
- Performed manual testing, debugging, and validation to ensure stable deployments and a seamless user experience.
- Collaborated with product managers and developers in an Agile environment to deliver features on time and meet business requirements.`;

const certificationsOutput = `- AWS Certified Cloud Practitioner
- Docker Certified Associate
- Full Stack Web Development Certification
- DevOps Engineer Internship Certification (StarAgile)`;

export function Terminal() {
  const { terminalQueue, clearTerminalQueue, openWindow } = useOSStore();
  const [history, setHistory] = useState<Command[]>([
    { cmd: '', output: <div className="text-orange-400">Welcome to Usman's Terminal. Type 'help' to see commands.</div> }
  ]);
  const [input, setInput] = useState('');
  const [isAutoTyping, setIsAutoTyping] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (terminalQueue && !isAutoTyping) {
      handleAutoType(terminalQueue.cmd, terminalQueue.id);
    }
  }, [terminalQueue]);

  const handleAutoType = async (cmd: string, appId: any) => {
    setIsAutoTyping(true);
    setInput('');
    
    // Typing animation
    for (let i = 0; i <= cmd.length; i++) {
      setInput(cmd.slice(0, i));
      await new Promise(resolve => setTimeout(resolve, 30));
    }

    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Add to history
    let output: string | React.ReactNode = '';
    
    if (appId) {
      output = (
        <div className="flex flex-col gap-1 italic text-white/50">
          <div>Loading dependency tree...</div>
          <div>Initializing {appId} component...</div>
          <div className="text-emerald-400">Process started successfully.</div>
        </div>
      );
      } else if (cmd === 'sudo apt update') {
        const updateSteps = [
          { text: '[sudo] password for usman: **********', delay: 1000 },
          { text: 'Initializing system update sequence...', delay: 1200 },
          { text: 'Loading apt-get environment variables...', delay: 800 },
          { text: 'Reading configuration files... Done', delay: 1000 },
          { text: 'Checking system architecture: x86_64 / amd64', delay: 900 },
          { text: 'Checking for internet connectivity... Connected', delay: 1500 },
          { text: 'Hit:1 http://archive.ubuntu.com/ubuntu noble InRelease', delay: 500 },
          { text: 'Get:2 http://archive.ubuntu.com/ubuntu noble-updates InRelease [126 kB]', delay: 800 },
          { text: 'Connecting to security.ubuntu.com (91.189.91.82:80)...', delay: 1800 },
          { text: 'Get:3 http://archive.ubuntu.com/ubuntu noble-backports InRelease [126 kB]', delay: 700 },
          { text: 'Get:4 http://security.ubuntu.com/ubuntu noble-security InRelease [126 kB]', delay: 1500 },
          { text: 'Identifying package mirrors...', delay: 2000 },
          { text: 'Hit:5 http://mirror.rackspace.com/ubuntu noble InRelease', delay: 600 },
          { text: 'Hit:6 http://mirror.rackspace.com/ubuntu noble-updates InRelease', delay: 600 },
          { text: 'Preparing to download package metadata...', delay: 1500 },
          { text: 'Get:7 http://archive.ubuntu.com/ubuntu noble/main amd64 Packages [1,842 kB]', delay: 2500 },
          { text: 'Get:8 http://archive.ubuntu.com/ubuntu noble/universe amd64 Packages [15.2 MB]', delay: 4000 },
          { text: 'Get:9 http://archive.ubuntu.com/ubuntu noble/restricted amd64 Packages [125 kB]', delay: 1200 },
          { text: 'Extracting package lists... [4%]', delay: 1200 },
          { text: 'Extracting package lists... [12%]', delay: 1500 },
          { text: 'Extracting package lists... [28%]', delay: 1800 },
          { text: 'Extracting package lists... [45%]', delay: 1600 },
          { text: 'Extracting package lists... [62%]', delay: 1500 },
          { text: 'Extracting package lists... [79%]', delay: 1700 },
          { text: 'Extracting package lists... [94%]', delay: 1300 },
          { text: 'Extracting package lists... [100%]', delay: 1000 },
          { text: 'Updating local cache database...', delay: 2500 },
          { text: 'Analyzing repository signatures...', delay: 2000 },
          { text: 'Checking GPG keys for authenticity...', delay: 2200 },
          { text: 'Fetched 17.3 MB in 35s (494 kB/s)', delay: 1500 },
          { text: 'Reading package lists... Done', delay: 3000 },
          { text: 'Building dependency tree... Done', delay: 2200 },
          { text: 'Reading state information... Done', delay: 1500 },
          { text: 'Analyzing upgrade paths...', delay: 3500 },
          { text: 'Calculating dependencies... Done', delay: 1800 },
          { text: 'The following NEW packages will be installed:', delay: 1200 },
          { text: '  libappindicator3-1 libdbusmenu-glib4 libdbusmenu-gtk3-4', delay: 1000 },
          { text: 'The following packages will be upgraded:', delay: 1000 },
          { text: '  linux-headers-generic linux-image-generic libc6 libssl3 python3-minimal coreutils', delay: 1500 },
          { text: '  systemd systemd-sysv libsystemd0 libudev1 udev kmod initramfs-tools', delay: 1300 },
          { text: '  gnome-terminal bash zsh curl wget git openssl ca-certificates', delay: 1400 },
          { text: '42 packages can be upgraded. Run \'apt list --upgradable\' to see them.', delay: 3000 },
          { text: 'Starting package upgrade process...', delay: 2500 },
          { text: 'Unpacking libc6 (2.39-0ubuntu8.3) over (2.39-0ubuntu8.2) ...', delay: 3500 },
          { text: 'Preparing to replace libssl3 (3.0.13-0ubuntu3.2) ...', delay: 1800 },
          { text: 'Unpacking libssl3 (3.0.13-0ubuntu3.3) over (3.0.13-0ubuntu3.2) ...', delay: 2800 },
          { text: 'Setting up libc6 (2.39-0ubuntu8.3) ...', delay: 3000 },
          { text: 'Setting up libssl3 (3.0.13-0ubuntu3.3) ...', delay: 2500 },
          { text: 'Configuring systemd core services...', delay: 3500 },
          { text: 'Running kernel post-installation scripts...', delay: 4000 },
          { text: 'Generating grub configuration file...', delay: 4500 },
          { text: 'Found linux image: /boot/vmlinuz-6.8.0-45-generic', delay: 1000 },
          { text: 'Found initrd image: /boot/initrd.img-6.8.0-45-generic', delay: 1000 },
          { text: 'done', delay: 1200 },
          { text: 'Processing triggers for libc-bin (2.39-0ubuntu8.3) ...', delay: 1800 },
          { text: 'Refreshing software sources... Done', delay: 3000 },
          { text: 'Cleaning up obsolete packages... Done', delay: 2500 },
          { text: 'Verifying system integrity... [OK]', delay: 2000 },
          { text: 'Scanning for broken dependencies... None found', delay: 1800 },
          { text: 'Optimizing local repositories...', delay: 2200 },
          { text: 'Finalizing installation hooks...', delay: 1500 },
          { text: 'System check: OK', delay: 1500 },
          { text: 'Update complete! All systems operational.', delay: 1200, color: 'text-emerald-400 font-bold' }
        ];

      setHistory(prev => [...prev, { cmd, output: <div className="animate-pulse italic opacity-50">Initializing update...</div> }]);
      
      let currentOutput: React.ReactNode[] = [];
      for (const step of updateSteps) {
        await new Promise(resolve => setTimeout(resolve, step.delay));
        currentOutput.push(
          <div key={currentOutput.length} className={step.color || ''}>
            {step.text}
          </div>
        );
        setHistory(prev => {
          const newHistory = [...prev];
          newHistory[newHistory.length - 1] = { cmd, output: <div className="flex flex-col gap-1 text-white/70">{[...currentOutput]}</div> };
          return newHistory;
        });
      }
      
      // We've already updated the history in the loop, so we set output to the final result 
      // and skip adding a new history entry at the end of the function for this command.
      output = <div className="flex flex-col gap-1 text-white/70">{[...currentOutput]}</div>;
    } else {
      output = (
        <div className="text-emerald-400">Command executed successfully.</div>
      );
    }
    
    // Only add a new history entry if we haven't already managed it (for non-update commands)
    if (cmd !== 'sudo apt update') {
      setHistory(prev => [...prev, { cmd, output }]);
    }
    setInput('');
    setIsAutoTyping(false);
    clearTerminalQueue();
    
    // Open the actual app if appId exists
    if (appId) {
      setTimeout(() => {
        openWindow(appId);
      }, 300);
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    let output: string | React.ReactNode = '';

    switch (cmd) {
      case 'help':
        output = helpOutput;
        break;
      case 'about':
        output = "I'm Usman Shaik, a DevOps Engineer with experience in cloud deployment, CI/CD pipelines, automation, and scalable infrastructure. I specialize in building reliable and high-performance systems.";
        break;
      case 'skills':
        output = skillsOutput;
        break;
      case 'experience':
        output = experienceOutput;
        break;
      case 'certifications':
        output = certificationsOutput;
        break;
      case 'projects':
        output = "Check out my projects in the 'Projects' app for a better visual experience, or type 'projects-list' here.";
        break;
      case 'projects-list':
        output = "1. Push Notification Platform\n2. DevOps Operations Dashboard\n3. AI-Based Auto SRE System\n4. AI Interview Simulator";
        break;
      case 'education':
        output = "B.Tech - Rajiv Gandhi University of Knowledge Technologies, Rk Valley (2025)\nCGPA: 8.23";
        break;
    case 'contact':
      output = "Email: usmanshaiik2003@gmail.com\nLinkedIn: linkedin.com/in/usman-shaiik";
      break;
      case 'resume':
        output = "Downloading resume.pdf...";
        break;
      case 'whoami':
        output = "usman_shaik (DevOps Engineer)";
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case '':
        break;
      default:
        output = `Command not found: ${cmd}. Type 'help' for available commands.`;
    }

    setHistory([...history, { cmd: input, output }]);
    setInput('');
  };

  return (
    <div 
      className="flex-1 flex flex-col p-4 font-mono text-sm h-full overflow-hidden"
      onClick={() => inputRef.current?.focus()}
    >
      <div ref={terminalRef} className="flex-1 overflow-y-auto mb-2 space-y-2">
        {history.map((item, i) => (
          <div key={i}>
            {item.cmd && (
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">usman@ubuntu:~$</span>
                <span>{item.cmd}</span>
              </div>
            )}
            <div className="text-white/80 whitespace-pre-wrap leading-relaxed">
              {item.output}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleCommand} className="flex items-center gap-2">
        <span className="text-emerald-400 shrink-0">usman@ubuntu:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isAutoTyping}
            className="bg-transparent border-none outline-none text-white flex-1 p-0 disabled:opacity-50"
            autoFocus
          />
      </form>
    </div>
  );
}
