import { Download, FileText, Briefcase, Code, GraduationCap, Award, User } from 'lucide-react';
import React from 'react';

export const resumeData = {
  summary: {
    title: 'Summary',
    id: 'summary',
    icon: <User className="w-5 h-5 text-blue-400" />,
    content: 'DevOps Engineer with 1+ year of experience in cloud deployment, CI/CD pipelines, automation, and scalable infrastructure. Specialized in DevOps, SRE, and Fullstack development with a strong focus on reliability and performance.'
  },
  skills: {
    title: 'Skills',
    id: 'skills',
    icon: <Code className="w-5 h-5 text-emerald-400" />,
    sections: [
      { name: 'Core Expertise', items: ['DevOps', 'SRE', 'Fullstack'] },
      { name: 'Cloud & Infrastructure', items: ['Amazon Web Services', 'Terraform'] },
      { name: 'Containers & Orchestration', items: ['Docker', 'Kubernetes'] },
      { name: 'Monitoring & Observability', items: ['Prometheus', 'Grafana', 'Datadog'] },
      { name: 'Programming & Scripting', items: ['Python', 'Java', 'JavaScript', 'Shell Scripting'] }
    ]
  },
  experience: {
    title: 'Experience',
    id: 'experience',
    icon: <Briefcase className="w-5 h-5 text-orange-400" />,
    items: [
      {
        company: 'StarAgile',
        role: 'Devops Engineer Intern',
        period: 'May 2025 - Nov 2025',
        location: 'Bengaluru, Karnataka',
        bullets: [
          'Worked on real-time DevOps and SRE projects with a focus on automation, CI/CD, cloud deployment, and monitoring.',
          'Designed and implemented end-to-end CI/CD pipelines using Jenkins, Git, Docker, and Kubernetes, reducing build and deployment time.',
          'Automated infrastructure provisioning using Terraform and Ansible, enabling faster and consistent cloud environment setup.',
          'Deployed and managed web applications on AWS, following cloud security and scalability best practices.',
          'Implemented system monitoring and alerting using Prometheus and Grafana to improve application reliability and performance.',
          'Assisted in AI-driven automation experiments for early issue detection and proactive system monitoring.',
          'Collaborated with cross-functional teams to improve deployment reliability, reduce manual effort, and support production stability.'
        ]
      },
      {
        company: 'Letsnotify Pvt Ltd',
        role: 'Full Stack Developer',
        period: 'Apr 2024 - Apr 2025',
        location: 'Bengaluru, Karnataka',
        bullets: [
          'Designed, developed, and enhanced a Push Notification Platform supporting real-time campaign delivery, templates, user segmentation, popups, and website tracking.',
          'Built scalable full-stack features using React.js, Node.js, NestJS, MySQL, and TypeORM to deliver high-volume push notifications and analytics.',
          'Implemented event-based triggers and social proof notifications to improve user engagement, click-through rates, and retention.',
          'Developed real-time website tracking and analytics modules to capture user behavior and trigger targeted push notifications.',
          'Optimized backend APIs and database queries to improve performance, reliability, and scalability of notification delivery.',
          'Performed manual testing, debugging, and validation to ensure stable deployments and a seamless user experience.',
          'Collaborated with product managers and developers in an Agile environment to deliver features on time and meet business requirements.'
        ]
      }
    ]
  },
  projects: {
    title: 'Projects',
    id: 'projects',
    icon: <FileText className="w-5 h-5 text-purple-400" />,
    items: [
      {
        name: 'Push Notification Platform',
        description: 'Designed and developed a platform supporting real-time campaign delivery, user segmentation, and website tracking for high-volume notification delivery.'
      },
      {
        name: 'DevOps Operations Dashboard',
        description: 'Built an end-to-end full-stack web application to monitor Kubernetes clusters, CI/CD pipelines, production alerts, and overall system health.'
      },
      {
        name: 'AI-Based Auto SRE System',
        description: 'Developed a full-stack self-healing SRE application that processes monitoring alerts, detects anomalies, and tracks remediation status.'
      },
      {
        name: 'AI Interview Simulator Platform',
        description: 'Built a full-stack AI-powered interview platform supporting both 1:1 and panel interview scenarios.'
      },
      {
        name: 'Developer Diary Application',
        description: 'Developed a full-stack Java web application for developers to log daily work, learning progress, issues, and solutions.'
      },
      {
        name: 'Future AI Assistant System',
        description: 'Built a full-stack Java-based AI assistant capable of responding to text and voice commands with modular architecture.'
      },
      {
        name: 'Typing Speed Test Platform',
        description: 'Developed a full-stack Java application to measure typing speed, accuracy, and error rate in real time with analytics.'
      },
      {
        name: 'Health Monitoring System',
        description: 'Built a full-stack Java-based health monitoring platform to track user health parameters and visualize trends.'
      },
      {
        name: 'Alkimi Hackathon Project (SUI)',
        description: 'Developed a full-stack Java-oriented application during the Alkimi Hackathon using the SUI ecosystem.'
      },
      {
        name: 'Theatre Food Ordering System',
        description: 'Built a full-stack Java web application enabling seat-based food ordering in theatres with real-time tracking.'
      },
      {
        name: 'StrictBuzz Cricket Platform',
        description: 'Developed a full-stack Java-based cricket analytics and engagement application with match insights and stats.'
      }
    ]
  },
  education: {
    title: 'Education',
    id: 'education',
    icon: <GraduationCap className="w-5 h-5 text-yellow-400" />,
    items: [
      {
        school: 'Rajiv Gandhi University Of Knowledge Technologies, Rk Valley',
        degree: 'Bachelor Of Technology',
        cgpa: '8.23',
        period: 'Apr 2025',
        location: 'Kadapa, Andhrapradesh'
      },
      {
        school: 'Rajiv Gandhi University Of Knowledge Technologies, Rk Valley',
        degree: 'Intermediate',
        cgpa: '8.34',
        period: 'Apr 2021',
        location: 'Kadapa, Andhrapradesh'
      },
      {
        school: 'GOVERNMENT HIGH SCHOOL Pakala',
        degree: 'Secondary School',
        cgpa: '10.0',
        period: 'Apr 2019',
        location: 'Tirupati, Andhrapradesh'
      }
    ]
  },
  certifications: {
    title: 'Certifications',
    id: 'certifications',
    icon: <Award className="w-5 h-5 text-red-400" />,
    items: [
      'AWS Certified Cloud Practitioner',
      'Docker Certified Associate',
      'Full Stack Web Development Certification',
      'DevOps Engineer Internship Certification StarAgile',
      'DevOps Essentials',
      'Full Stack Development',
      'Java Programming',
      'Advanced Java',
      'Python Programming',
      'SQL',
      'Artificial Intelligence',
      'AI Foundations',
      'Microsoft Azure Essentials'
    ]
  }
};

export const RESUME_PDF_URL = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/Usman-CV-1766733531090.pdf";
