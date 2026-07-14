import React, { useState } from 'react';
import { Star, Folder, ExternalLink } from 'lucide-react';

// Custom inline SVG icon for GitHub
const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

function ProjectCard({ project, isActive }) {
  const [transform, setTransform] = useState('');

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((centerY - y) / centerY) * 10; // Max 10 degrees tilt
    const rotateY = ((x - centerX) / centerX) * 10;
    
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`);
  };

  const handleMouseLeave = () => {
    setTransform('');
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform, transition: transform ? 'transform 0.05s ease-out' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}
      className={`bg-white border-2 rounded-3xl p-6 md:p-8 flex flex-col justify-between h-full relative overflow-hidden transition-all duration-500 shadow-pastel-sm hover:shadow-pastel-md ${
        isActive
          ? 'border-pastel-yellow shadow-neon-yellow scale-[1.01]'
          : 'border-pastel-peach/50 hover:border-pastel-blue'
      }`}
    >
      {isActive && (
        <span className="absolute top-0 right-0 w-8 h-8 bg-pastel-yellow border-b-2 border-l-2 border-pastel-yellow-hover rounded-bl-2xl flex items-center justify-center animate-pulse">
          <Star className="w-4.5 h-4.5 text-pastel-navy fill-pastel-navy" />
        </span>
      )}

      <div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-bold font-space uppercase tracking-wider text-pastel-blue-dark bg-pastel-blue/60 py-1 px-3.5 rounded-full border border-pastel-blue/80">
            {project.role || 'Developer'}
          </span>
          {project.featured && !isActive && (
            <Star className="w-5 h-5 text-pastel-yellow fill-pastel-yellow animate-bounce-soft" />
          )}
        </div>

        <h3 className="text-xl md:text-2xl font-space text-pastel-navy mb-3 leading-snug">
          {project.title}
        </h3>

        <p className="text-sm md:text-base text-pastel-navy/70 leading-relaxed mb-6">
          {project.desc}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((t, idx) => (
            <span
              key={idx}
              className="text-[10px] md:text-xs font-bold text-pastel-navy/60 bg-pastel-peach/40 border border-pastel-peach/70 py-1 px-2.5 rounded-lg"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-3 pt-4 border-t border-pastel-peach/30">
        {project.repoLink && (
          <a
            href={project.repoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs md:text-sm font-bold text-pastel-blue-dark hover:text-pastel-navy transition-colors bg-pastel-blue/30 hover:bg-pastel-blue/70 py-2 px-4 rounded-xl border border-pastel-blue/50"
          >
            <GithubIcon className="w-4.5 h-4.5" />
            <span>GitHub Repo</span>
          </a>
        )}
        {project.liveLink && (
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs md:text-sm font-bold text-emerald-700 hover:text-pastel-navy transition-colors bg-pastel-green/40 hover:bg-pastel-green/80 py-2 px-4 rounded-xl border border-pastel-green border-emerald-600/30 ml-auto"
          >
            <ExternalLink className="w-4.5 h-4.5" />
            <span>Kunjungi</span>
          </a>
        )}
      </div>
    </div>
  );
}

export default function Projects({ activeProjectIndex }) {
  const [activeTab, setActiveTab] = useState('featured');

  const featuredProjects = [
    {
      id: 'el_gestur_v2',
      title: 'el_gestur_v2',
      role: 'Lead Developer',
      featured: true,
      desc: 'Sistem presentasi interaktif hands-free berbasis YOLOv8 + DeepSORT untuk tracking presenter utama dan MediaPipe Hands untuk 9 klasifikasi gestur serta voice typer Bahasa Indonesia.',
      tech: ['Python', 'YOLOv8', 'MediaPipe', 'Flask', 'AppleScript'],
      repoLink: 'https://github.com/aariffaqiih/el_gestur_v2'
    },
    {
      id: 'salin-gaya-web',
      title: 'salin-gaya-web',
      role: 'Lead Developer',
      featured: true,
      desc: 'Platform e-commerce premium thrifting terintegrasi kurasi gambar otomatis Gemini 2.5 Flash, Authentication 2FA WhatsApp Fonnte OTP, chat C2C real-time, dan pembayaran Midtrans.',
      tech: ['React 18', 'Firebase', 'Gemini AI', 'WhatsApp API', 'Midtrans'],
      repoLink: 'https://github.com/Fatirrr08/salin-gaya-web',
      liveLink: 'https://salin-gaya.web.app/'
    },
    {
      id: 'Perintis',
      title: 'Perintis',
      role: 'Full Stack Dev',
      desc: 'Platform kelayakan UMKM Indonesia berbasis FastAPI dan Gemini AI. Menyediakan simulator Kur Plafon, kalender risiko BI, kuis kesehatan finansial, dan peta lokasi pasar Leaflet.',
      tech: ['React 19', 'FastAPI', 'Gemini AI', 'Tailwind 4', 'Leaflet'],
      repoLink: 'https://github.com/marzhendo/Perintis'
    },
    {
      id: 'Web_HMIF',
      title: 'Web_HMIF',
      role: 'Frontend Dev',
      desc: 'Portal profil resmi Himpunan Mahasiswa Informatika (HMIF) Telkom University Purwokerto sebagai pusat informasi kegiatan kemahasiswaan dan keanggotaan.',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Responsive UI'],
      repoLink: 'https://github.com/Fatirrr08/Web_HMIF'
    },
    {
      id: 'Portofolio',
      title: 'Portofolio',
      role: 'Lead Developer',
      desc: 'Landing page portofolio pribadi kasual interaktif berbasis React + Vite + Tailwind CSS yang dilengkapi modular Testing Sandbox (Simulator gestur, logistik, & perpustakaan).',
      tech: ['React 18', 'Vite', 'Tailwind CSS', 'Firebase Hosting'],
      repoLink: 'https://github.com/Fatirrr08/Portofolio',
      liveLink: 'https://portofolio-fatir.web.app/'
    }
  ];

  const academicProjects = [
    {
      id: 'LibraryPro',
      title: 'LibraryPro',
      role: 'Backend & Arch',
      featured: true,
      desc: 'Sistem Informasi Perpustakaan berbasis arsitektur MVC Java Web. Menerapkan enkapsulasi/polimorfisme OOP, MySQL relasional, pencarian katalog fuzzy Levenshtein, dan dockerization.',
      tech: ['Java 17', 'Jakarta Servlet', 'JSP 3.1', 'MySQL', 'Docker', 'Railway'],
      repoLink: 'https://github.com/Fatirrr08/Library-Pro',
      liveLink: 'https://librarypro.up.railway.app/'
    },
    {
      id: 'ExecutiveBoard',
      title: 'Executive Board Website',
      role: 'Frontend Dev',
      desc: 'Antarmuka manajemen pengawasan digital dashboard organisasi dengan visualisasi data kepengurusan terstruktur.',
      tech: ['HTML5', 'Tailwind CSS', 'JavaScript', 'Responsive UI'],
      liveLink: 'https://website-executive-board.vercel.app/'
    },
    {
      id: 'smart-student-finance',
      title: 'smart-student-finance',
      role: 'Lead Developer',
      desc: 'Aplikasi pencatatan keuangan dan target tabungan mahasiswa berbasis JSP. Menampilkan analitik chart dinamis dan otentikasi multi-akun.',
      tech: ['Java Web', 'Servlets', 'JSP', 'MySQL', 'JavaScript'],
      repoLink: 'https://github.com/Fatirrr08/smart-student-finance'
    },
    {
      id: 'Perpus',
      title: 'Perpus',
      role: 'Developer',
      desc: 'Aplikasi sirkulasi buku perpustakaan desktop berbasis GUI Java Swing terhubung langsung dengan basis data MySQL lokal.',
      tech: ['Java', 'Java Swing GUI', 'MySQL Database', 'OOP'],
      repoLink: 'https://github.com/Fatirrr08/Perpus'
    },
    {
      id: 'JARKOM-TUBES',
      title: 'JARKOM-TUBES',
      role: 'Network Programmer',
      desc: 'Tugas besar Jaringan Komputer menerapkan socket programming TCP/IP client-server multithreaded untuk pertukaran pesan.',
      tech: ['Python Sockets', 'TCP/IP', 'Client-Server Architecture'],
      repoLink: 'https://github.com/Fatirrr08/JARKOM-TUBES'
    },
    {
      id: 'AKA',
      title: 'AKA',
      role: 'Algorithmic Developer',
      desc: 'Proyek analisis performa kompleksitas waktu (Big O Notation) antara algoritma rekursif dan iteratif pada Python.',
      tech: ['Python', 'Analisis Kompleksitas', 'Algorithms'],
      repoLink: 'https://github.com/Fatirrr08/AKA'
    },
    {
      id: 'daily-tasks',
      title: '103112430153_Fatir-Gibran',
      role: 'Student Developer',
      desc: 'Repositori sentralisasi pengerjaan kuis mingguan, tugas harian, dan praktikum kuliah Teknik Informatika.',
      tech: ['Java', 'C++', 'Python', 'Data Structures'],
      repoLink: 'https://github.com/Fatirrr08/103112430153_Fatir-Gibran'
    }
  ];

  const activeProjects = activeTab === 'featured' ? featuredProjects : academicProjects;

  return (
    <section id="proyek" className="py-20 px-6 md:px-12 max-w-6xl mx-auto scroll-mt-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b-2 border-pastel-peach/30 pb-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-space text-pastel-navy inline-block relative">
            Galeri Proyek
            <span className="absolute bottom-1 left-0 w-1/2 h-2 bg-pastel-yellow/60 -z-10 rounded-full"></span>
          </h2>
          <p className="text-sm md:text-base text-pastel-navy/60 mt-2">
            Showcase seluruh proyek personal serta tugas kuliah yang pernah saya selesaikan.
          </p>
        </div>

        {/* Playful Pastel Tab Switcher */}
        <div className="flex gap-2 p-1.5 bg-pastel-peach/30 rounded-2xl border-2 border-pastel-peach/50 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('featured')}
            className={`flex-1 sm:flex-initial py-2 px-5 rounded-xl text-xs md:text-sm font-bold font-space transition-colors ${
              activeTab === 'featured'
                ? 'bg-pastel-yellow text-pastel-navy shadow-pastel-sm'
                : 'text-pastel-navy/70 hover:text-pastel-navy hover:bg-white/50'
            }`}
          >
            Unggulan & Personal
          </button>
          <button
            onClick={() => setActiveTab('academic')}
            className={`flex-1 sm:flex-initial py-2 px-5 rounded-xl text-xs md:text-sm font-bold font-space transition-colors ${
              activeTab === 'academic'
                ? 'bg-pastel-yellow text-pastel-navy shadow-pastel-sm'
                : 'text-pastel-navy/70 hover:text-pastel-navy hover:bg-white/50'
            }`}
          >
            Tugas & Kuliah
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {activeProjects.map((project, idx) => (
          <div key={project.id} className="h-full">
            {/* If the active tab is featured, sync active state with simulator swipe */}
            <ProjectCard
              project={project}
              isActive={activeTab === 'featured' && idx === activeProjectIndex}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
