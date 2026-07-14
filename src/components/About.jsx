import React from 'react';
import { User, GraduationCap, MapPin, CheckCircle, Code } from 'lucide-react';

export default function About() {
  const stats = [
    { icon: <User className="w-5 h-5 text-pastel-blue-dark" />, label: 'Nama', val: 'Fatir Gibran' },
    { icon: <Code className="w-5 h-5 text-pastel-blue-dark" />, label: 'Peran', val: 'Full-Stack Dev & NetSec' },
    { icon: <GraduationCap className="w-5 h-5 text-pastel-blue-dark" />, label: 'Studi', val: 'S1 Teknik Informatika' },
    { icon: <GraduationCap className="w-5 h-5 text-pastel-blue-dark" />, label: 'Kampus', val: 'Telkom University Purwokerto' },
    { icon: <MapPin className="w-5 h-5 text-pastel-blue-dark" />, label: 'Lokasi', val: 'Banyumas, Indonesia' },
  ];

  return (
    <section id="tentang" className="py-20 px-6 md:px-12 max-w-6xl mx-auto scroll-mt-12">
      <div className="text-center md:text-left mb-12">
        <h2 className="text-3xl md:text-4xl font-space text-pastel-navy inline-block relative">
          Tentang Saya
          <span className="absolute bottom-1 left-0 w-1/2 h-2 bg-pastel-blue/60 -z-10 rounded-full"></span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Side: Stats Card */}
        <div className="md:col-span-5 bg-white border-2 border-pastel-peach rounded-3xl p-6 shadow-pastel-md hover:shadow-pastel-lg transition-shadow duration-300 transform hover:-translate-y-1">
          <div className="flex items-center gap-2 pb-4 mb-6 border-b-2 border-pastel-peach/40">
            <span className="w-3.5 h-3.5 rounded-full bg-pastel-yellow border border-pastel-yellow-hover"></span>
            <span className="text-sm font-bold font-space uppercase text-pastel-navy/60 tracking-wider">Identitas Mahasiswa</span>
          </div>

          <ul className="flex flex-col gap-4">
            {stats.map((stat, i) => (
              <li key={i} className="flex gap-4 items-start">
                <div className="p-2 rounded-xl bg-pastel-peach/50 mt-0.5">
                  {stat.icon}
                </div>
                <div>
                  <span className="block text-xs font-bold text-pastel-navy/40 uppercase tracking-wider">{stat.label}</span>
                  <span className="text-sm font-bold text-pastel-navy">{stat.val}</span>
                </div>
              </li>
            ))}
            <li className="flex gap-4 items-start pt-2">
              <div className="p-2 rounded-xl bg-pastel-green/50 mt-0.5">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <span className="block text-xs font-bold text-pastel-navy/40 uppercase tracking-wider">Status Studi</span>
                <span className="text-sm font-bold text-emerald-600 font-space bg-pastel-green/60 py-0.5 px-3 rounded-full inline-block">
                  AKTIF (Semester 4)
                </span>
              </div>
            </li>
          </ul>
        </div>

        {/* Right Side: Narrative */}
        <div className="md:col-span-7 flex flex-col gap-6">
          <div className="bg-white border-2 border-pastel-blue rounded-3xl p-8 shadow-pastel-sm">
            <p className="text-base md:text-lg text-pastel-navy/80 leading-relaxed mb-6">
              Saya adalah mahasiswa semester 4 S1 Teknik Informatika di <strong>Telkom University Purwokerto</strong>. Minat belajar saya berfokus pada Jaringan Komputer, Keamanan Siber (Cyber Security), serta pemanfaatan Kecerdasan Buatan (AI) untuk menghadirkan otomasi interaktif pada website dan sistem komputer.
            </p>
            <p className="text-base md:text-lg text-pastel-navy/80 leading-relaxed">
              Selain fokus di aspek pemrograman dan sistem siber, saya aktif berpartisipasi dalam organisasi kemahasiswaan. Saya meyakini bahwa kemampuan komunikasi teknis (public speaking) dan kerja sama tim (leadership) sama bernilainya dengan kemampuan teknis pemrograman dalam merancang solusi yang ramah pengguna.
            </p>
          </div>

          {/* Quick Hobbies/Interests Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-pastel-purple/50 border border-pastel-purple/80 rounded-2xl p-4 text-center">
              <span className="block text-2xl mb-1">🛡️</span>
              <span className="font-bold text-sm text-pastel-navy">Keamanan Siber</span>
            </div>
            <div className="bg-pastel-blue/40 border border-pastel-blue/80 rounded-2xl p-4 text-center">
              <span className="block text-2xl mb-1">💻</span>
              <span className="font-bold text-sm text-pastel-navy">Rekayasa Web</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
