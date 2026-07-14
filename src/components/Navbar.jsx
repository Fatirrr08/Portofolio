import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navItems = [
    { id: 'tentang', label: 'Tentang' },
    { id: 'simulator', label: 'Simulator' },
    { id: 'keterampilan', label: 'Keterampilan' },
    { id: 'proyek', label: 'Proyek' },
    { id: 'kontak', label: 'Kontak' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Detect active section
      const sections = ['hero', 'tentang', 'simulator', 'keterampilan', 'proyek', 'kontak'];
      let current = 'hero';
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 200) {
          current = section;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl z-50 rounded-full border transition-all duration-500 spring-transition-fast ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-md shadow-pastel-md border-pastel-yellow/30 py-3 px-6'
          : 'bg-white/50 backdrop-blur-sm border-transparent py-4 px-6'
      }`}
    >
      <div className="flex justify-between items-center">
        <a href="#hero" className="flex items-center gap-2 text-xl font-extrabold text-pastel-navy group">
          <Sparkles className="w-5 h-5 text-pastel-blue-dark group-hover:rotate-45 transition-transform" />
          <span>Fatir Gibran</span>
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`font-medium text-sm transition-colors relative py-1 px-3 rounded-full hover:bg-pastel-peach/50 ${
                  activeSection === item.id
                    ? 'text-pastel-blue-dark font-semibold bg-pastel-blue/60'
                    : 'text-pastel-navy/70 hover:text-pastel-navy'
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-full hover:bg-pastel-peach/50 text-pastel-navy transition-colors"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Links */}
      <div
        className={`md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-lg border border-pastel-yellow/20 rounded-3xl p-6 shadow-pastel-lg transition-all duration-300 ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <ul className="flex flex-col gap-4 text-center">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setIsOpen(false)}
                className={`block py-2 rounded-2xl font-medium transition-colors ${
                  activeSection === item.id
                    ? 'text-pastel-blue-dark bg-pastel-blue/70 font-semibold'
                    : 'text-pastel-navy/70 hover:text-pastel-navy hover:bg-pastel-peach/50'
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
