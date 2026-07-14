import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  const roles = ["Web Developer", "Network Engineer", "Cyber Security Practitioner", "AI Integration Specialist"];
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [speed, setSpeed] = useState(80);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timer;

    if (isDeleting) {
      timer = setTimeout(() => {
        setTypedText(currentRole.substring(0, charIndex - 1));
        setCharIndex(prev => prev - 1);
        setSpeed(40); // erase faster
      }, speed);
    } else {
      timer = setTimeout(() => {
        setTypedText(currentRole.substring(0, charIndex + 1));
        setCharIndex(prev => prev + 1);
        setSpeed(80);
      }, speed);
    }

    if (!isDeleting && charIndex === currentRole.length) {
      setIsDeleting(true);
      setSpeed(1500); // pause at end
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setRoleIndex(prev => (prev + 1) % roles.length);
      setSpeed(500); // pause before typing next
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, roleIndex, speed]);

  return (
    <header id="hero" className="min-h-screen flex flex-col-reverse md:flex-row justify-center items-center gap-12 px-6 md:px-12 max-w-6xl mx-auto pt-28 pb-12">
      <div className="flex-1 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pastel-yellow border border-pastel-yellow-hover text-pastel-navy font-semibold text-xs uppercase tracking-wider mb-6 shadow-pastel-sm animate-bounce-soft">
          <Sparkles className="w-4 h-4 text-pastel-blue-dark" />
          <span>Available for Awesome Work</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-space text-pastel-navy leading-tight mb-4">
          Halo, Saya <br />
          <span className="relative inline-block text-pastel-blue-dark">
            Fatir Gibran
            <span className="absolute bottom-1.5 left-0 w-full h-3 bg-pastel-yellow/60 -z-10 rounded-full"></span>
          </span>
        </h1>
        
        <div className="text-lg md:text-xl font-medium text-pastel-navy/70 mb-6 min-h-[1.8rem]">
          &gt; <span className="text-pastel-blue-dark font-space font-bold">{typedText}</span>
          <span className="animate-pulse text-pastel-blue-dark">|</span>
        </div>
        
        <p className="text-pastel-navy/80 leading-relaxed mb-8 max-w-md mx-auto md:mx-0">
          Mahasiswa S1 Teknik Informatika di Telkom University Purwokerto yang antusias menyatukan logika web, rekayasa siber jaringan, dan kecerdasan buatan dalam desain antarmuka yang menyenangkan!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <a
            href="#proyek"
            className="inline-flex items-center justify-center gap-2 bg-pastel-yellow hover:bg-pastel-yellow-hover text-pastel-navy font-bold py-3.5 px-8 rounded-2xl shadow-pastel-md hover:shadow-pastel-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            Lihat Proyek <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#simulator"
            className="inline-flex items-center justify-center gap-2 bg-white border-2 border-pastel-blue text-pastel-navy font-bold py-3.5 px-8 rounded-2xl shadow-pastel-sm hover:bg-pastel-blue/30 transition-all duration-300 transform hover:-translate-y-1"
          >
            Uji Simulator
          </a>
        </div>
      </div>
      
      <div className="flex-1 flex justify-center items-center">
        <div className="relative w-64 h-64 md:w-80 md:h-80 p-3 rounded-full bg-white shadow-pastel-lg group">
          {/* Animated decorative pastel rings */}
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-pastel-blue animate-[spin_20s_linear_infinite] group-hover:scale-105 transition-transform duration-500"></div>
          <div className="absolute -inset-2 rounded-full border border-pastel-yellow/60 animate-[spin_30s_linear_infinite_reverse]"></div>
          
          <img
            src="Image/fotomuka.jpg"
            alt="Foto Profil Fatir Gibran"
            className="w-full h-full object-cover rounded-full border-4 border-pastel-bg group-hover:scale-95 transition-transform duration-500"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=800&q=80';
            }}
          />
        </div>
      </div>
    </header>
  );
}
