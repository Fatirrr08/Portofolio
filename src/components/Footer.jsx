import React from 'react';
import { Mail, Heart } from 'lucide-react';

// Custom inline SVG icons for social media brands to ensure robust compilation under all Lucide versions
const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export default function Footer() {
  const socialLinks = [
    { icon: <Mail className="w-5 h-5" />, label: 'Email', href: 'mailto:fatirgibrann@gmail.com', bg: 'hover:bg-pastel-pink hover:border-pastel-pink' },
    { icon: <LinkedinIcon className="w-5 h-5" />, label: 'LinkedIn', href: 'http://www.linkedin.com/in/FatirGibran', bg: 'hover:bg-pastel-blue hover:border-pastel-blue' },
    { icon: <GithubIcon className="w-5 h-5" />, label: 'GitHub', href: 'https://github.com/Fatirrr08', bg: 'hover:bg-pastel-yellow hover:border-pastel-yellow-hover' },
    { icon: <InstagramIcon className="w-5 h-5" />, label: 'Instagram', href: 'https://instagram.com/spicytir', bg: 'hover:bg-pastel-peach hover:border-pastel-peach' }
  ];

  return (
    <footer id="kontak" className="bg-white border-t-2 border-pastel-peach/60 py-16 px-6 md:px-12 text-center mt-20 relative z-20">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-space text-pastel-navy mb-4 inline-block relative">
          Mari Berkolaborasi!
          <span className="absolute bottom-1 left-0 w-1/2 h-2 bg-pastel-pink/60 -z-10 rounded-full"></span>
        </h2>
        
        <p className="text-base md:text-lg text-pastel-navy/70 max-w-lg leading-relaxed mb-10">
          Saya selalu terbuka untuk berdiskusi mengenai proyek kolaborasi rekayasa web, arsitektur jaringan komputer, kustomisasi AI, atau sekadar bertukar ide inovatif!
        </p>

        {/* Social Grid */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {socialLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              target={link.label !== 'Email' ? '_blank' : undefined}
              rel={link.label !== 'Email' ? 'noopener noreferrer' : undefined}
              className={`flex items-center gap-2 px-6 py-3 border-2 border-pastel-navy/10 rounded-2xl font-bold font-space text-pastel-navy shadow-pastel-sm transition-all duration-300 transform hover:-translate-y-1 ${link.bg}`}
            >
              {link.icon}
              <span>{link.label}</span>
            </a>
          ))}
        </div>

        {/* Bottom Credits */}
        <div className="w-full pt-8 border-t border-pastel-peach/40 text-xs font-semibold text-pastel-navy/40 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-1.5 justify-center">
            <span>Dibuat dengan</span>
            <Heart className="w-4 h-4 text-pastel-pink fill-pastel-pink animate-pulse" />
            <span>oleh Fatir Gibran &copy; {new Date().getFullYear()}</span>
          </div>
          <div className="font-space uppercase tracking-wider text-[10px]">
            Secured & Powered by Antigravity Core
          </div>
        </div>
      </div>
    </footer>
  );
}
