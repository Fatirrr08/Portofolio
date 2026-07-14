import React, { useEffect, useState } from 'react';
import { Brain, Globe, Shield, Users } from 'lucide-react';

export default function Keterampilan() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger progress animation on mount
    const timer = setTimeout(() => setAnimate(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const skillGroups = [
    {
      title: 'AI & Computer Vision',
      icon: <Brain className="w-5 h-5 text-pastel-blue-dark" />,
      bg: 'bg-pastel-blue/40 border-pastel-blue',
      skills: [
        { name: 'YOLOv8 & Object Tracking (DeepSORT)', val: 85 },
        { name: 'MediaPipe Hands & Pose Classification', val: 90 },
        { name: 'OpenCV & Frame Processing', val: 80 },
        { name: 'Fuzzy Logic Inference System', val: 85 },
      ]
    },
    {
      title: 'Web Engineering',
      icon: <Globe className="w-5 h-5 text-amber-700" />,
      bg: 'bg-pastel-yellow/40 border-pastel-yellow-hover',
      skills: [
        { name: 'React & Vite (JS / TS)', val: 90 },
        { name: 'Backend (FastAPI, Flask, Java Servlets)', val: 85 },
        { name: 'Database (MySQL, Firebase Firestore/RTDB)', val: 85 },
        { name: 'Tailwind CSS & UI Integration', val: 90 },
      ]
    },
    {
      title: 'Networks & CyberSec',
      icon: <Shield className="w-5 h-5 text-emerald-700" />,
      bg: 'bg-pastel-green/40 border-pastel-green',
      skills: [
        { name: 'Infrastruktur Jaringan (MikroTik, Cisco)', val: 85 },
        { name: 'Cyber Security & Penetration Testing', val: 80 },
        { name: 'Analisis Protokol (Wireshark)', val: 80 },
        { name: 'Linux Server System Administration', val: 75 },
      ]
    },
    {
      title: 'Soft Skills & Management',
      icon: <Users className="w-5 h-5 text-indigo-700" />,
      bg: 'bg-pastel-purple/40 border-pastel-purple',
      skills: [
        { name: 'Manajemen Tim & Metodologi Agile', val: 90 },
        { name: 'Public Speaking & Presentasi Teknis', val: 85 },
        { name: 'Pemecahan Masalah Komprehensif', val: 90 },
        { name: 'Kolaborasi Lintas Organisasi', val: 85 },
      ]
    }
  ];

  return (
    <section id="keterampilan" className="py-20 px-6 md:px-12 max-w-6xl mx-auto scroll-mt-12">
      <div className="text-center md:text-left mb-12">
        <h2 className="text-3xl md:text-4xl font-space text-pastel-navy inline-block relative">
          Keterampilan
          <span className="absolute bottom-1 left-0 w-1/2 h-2 bg-pastel-green/60 -z-10 rounded-full"></span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skillGroups.map((group, gIdx) => (
          <div
            key={gIdx}
            className={`border-2 rounded-3xl p-6 bg-white shadow-pastel-sm hover:shadow-pastel-md transition-all duration-300 transform hover:-translate-y-1 ${group.bg}`}
          >
            <h3 className="text-lg font-bold font-space text-pastel-navy flex items-center gap-2.5 pb-3 mb-6 border-b border-pastel-navy/10">
              {group.icon}
              {group.title}
            </h3>

            <div className="flex flex-col gap-4">
              {group.skills.map((skill, sIdx) => (
                <div key={sIdx} className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-xs md:text-sm font-bold text-pastel-navy/80">
                    <span>{skill.name}</span>
                    <span>{skill.val}%</span>
                  </div>

                  <div className="h-3 w-full bg-pastel-bg rounded-full border border-pastel-navy/5 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-pastel-blue-dark to-pastel-yellow-hover shadow-pastel-sm transition-all duration-1000 ease-out"
                      style={{ width: animate ? `${skill.val}%` : '0%' }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
