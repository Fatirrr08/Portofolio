import React from 'react';
import { Star, Folder, ExternalLink } from 'lucide-react';

function ProjectCard({ project, isActive, index }) {
  const [transform, setTransform] = React.useState('');

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((centerY - y) / centerY) * 12; // Max 12 degrees
    const rotateY = ((x - centerX) / centerX) * 12;
    
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`);
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
          : 'border-pastel-peach/60 hover:border-pastel-blue'
      }`}
    >
      {/* Active Dot Corner Indicator */}
      {isActive && (
        <span className="absolute top-0 right-0 w-8 h-8 bg-pastel-yellow border-b-2 border-l-2 border-pastel-yellow-hover rounded-bl-2xl flex items-center justify-center animate-pulse">
          <Star className="w-4.5 h-4.5 text-pastel-navy fill-pastel-navy" />
        </span>
      )}

      <div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-bold font-space uppercase tracking-wider text-pastel-blue-dark bg-pastel-blue/60 py-1 px-3.5 rounded-full border border-pastel-blue/80">
            {project.role}
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

      <div className="flex gap-4 pt-4 border-t border-pastel-peach/30">
        {project.dirLink && (
          <a
            href={project.dirLink}
            className="inline-flex items-center gap-1.5 text-xs md:text-sm font-bold text-pastel-blue-dark hover:text-pastel-navy transition-colors"
          >
            <Folder className="w-4.5 h-4.5" />
            <span>Direktori</span>
          </a>
        )}
        {project.liveLink && (
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs md:text-sm font-bold text-pastel-blue-dark hover:text-pastel-navy transition-colors ml-auto"
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
  const projectsData = [
    {
      title: 'El Presentasi (el_gestur_v2)',
      role: 'Lead Developer',
      featured: true,
      desc: 'Asisten presentasi siber nirkabel berbasis computer vision (YOLOv8 & DeepSORT) untuk melacak pembawa acara, menerjemahkan 9 gestur MediaPipe Hands, serta voice commands untuk pengetikan/navigasi slide presentasi.',
      tech: ['Python', 'Flask', 'YOLOv8', 'MediaPipe', 'AppleScript', 'OpenCV'],
      dirLink: 'file:///Users/fatirgibran/Kuliah/el_gestur_v2'
    },
    {
      title: 'Perintis - AI Business Validator',
      role: 'Full Stack Dev',
      desc: 'Platform validasi kelayakan ide bisnis & analisis kalkulator finansial bagi UMKM Indonesia. Menyediakan simulasi subsidi KUR, kalender risiko harga BI, dan integrasi model Gemini AI.',
      tech: ['React 19', 'Vite 8', 'FastAPI', 'Gemini AI', 'Tailwind 4', 'Leaflet'],
      dirLink: 'file:///Users/fatirgibran/Kuliah/Perintis'
    },
    {
      title: 'Salin Gaya - Thrifting E-Commerce',
      role: 'Lead Developer',
      desc: 'Platform jual-beli pakaian bekas layak pakai dengan kurasi kualitas otomatis menggunakan Gemini 2.5 Flash, Two-Factor Authentication WhatsApp Gateway (Fonnte API), dan snap payment Midtrans.',
      tech: ['React 18', 'Firebase RTDB', 'Gemini Flash', 'WhatsApp API', 'Midtrans'],
      dirLink: 'file:///Users/fatirgibran/Kuliah/salin-gaya-e-commerce'
    },
    {
      title: 'LibraryPro - Library System',
      role: 'Backend & Arch',
      desc: 'Sistem Informasi Manajemen Perpustakaan berbasis arsitektur MVC Java Web. Menerapkan polimorfisme OOP, MySQL relasional, pencarian katalog fuzzy Levenshtein, dan dockerization.',
      tech: ['Java 17', 'Jakarta Servlet', 'JSP 3.1', 'MySQL', 'Docker', 'Railway'],
      liveLink: 'https://librarypro.up.railway.app',
      dirLink: 'file:///Users/fatirgibran/Kuliah/Library-Pro'
    },
    {
      title: 'Smart Student Finance',
      role: 'Lead Developer',
      desc: 'Aplikasi pencatatan pengeluaran anggaran dan target keuangan mahasiswa. Dilengkapi visualisasi analitik chart dinamis serta validasi data multi-akun.',
      tech: ['HTML5', 'CSS3 Custom', 'JavaScript', 'Java Servlets', 'MySQL'],
      dirLink: 'file:///Users/fatirgibran/Kuliah/WEB%20KEUANGAN'
    }
  ];

  return (
    <section id="proyek" className="py-20 px-6 md:px-12 max-w-6xl mx-auto scroll-mt-12">
      <div className="text-center md:text-left mb-12">
        <h2 className="text-3xl md:text-4xl font-space text-pastel-navy inline-block relative">
          Proyek Utama
          <span className="absolute bottom-1 left-0 w-1/2 h-2 bg-pastel-yellow/60 -z-10 rounded-full"></span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectsData.map((project, idx) => (
          <div key={idx} className="h-full">
            <ProjectCard
              project={project}
              isActive={idx === activeProjectIndex}
              index={idx}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
