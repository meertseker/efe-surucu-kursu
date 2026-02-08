'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface HeroProps {
  title: string;
  subtitle: string;
  primaryCta: { text: string; href: string };
  secondaryCta: { text: string; href: string };
  stats?: { value: string; label: string }[];
}

export default function Hero({ title, subtitle, primaryCta, secondaryCta, stats }: HeroProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-warning-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-success-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="relative container mx-auto px-4 py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight drop-shadow-lg"
            >
              {title}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl mb-8 text-white/95 drop-shadow-md"
            >
              {subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href={primaryCta.href}
                className="group relative px-8 py-4 bg-white text-primary-700 rounded-xl font-semibold text-lg shadow-2xl hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.4)] transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10">📚 {primaryCta.text}</span>
              </Link>
              
              <Link
                href={secondaryCta.href}
                className="px-8 py-4 bg-success-500 text-white rounded-xl font-semibold text-lg border-2 border-success-400/50 hover:bg-success-600 transition-all duration-300 hover:scale-105 shadow-2xl"
              >
                ✓ {secondaryCta.text}
              </Link>
            </motion.div>

            {/* Stats */}
            {stats && stats.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-12 grid grid-cols-3 gap-6"
              >
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
                    <div className="text-sm text-blue-200">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* Right illustration - Modern Car Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Placeholder: Modern driving school car */}
              <div className="relative w-full h-96 rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-100 to-gray-200">
                {/* Car placeholder image */}
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="relative w-full h-full">
                    {/* Modern car illustration */}
                    <svg viewBox="0 0 400 300" className="w-full h-full" fill="none">
                      {/* Car body */}
                      <rect x="50" y="120" width="300" height="100" rx="20" fill="#0284c7" opacity="0.9"/>
                      <rect x="80" y="80" width="240" height="80" rx="15" fill="#0369a1"/>
                      {/* Windows */}
                      <rect x="90" y="90" width="100" height="50" rx="8" fill="#bae6fd" opacity="0.7"/>
                      <rect x="210" y="90" width="100" height="50" rx="8" fill="#bae6fd" opacity="0.7"/>
                      {/* Wheels */}
                      <circle cx="110" cy="220" r="30" fill="#1e293b"/>
                      <circle cx="110" cy="220" r="20" fill="#475569"/>
                      <circle cx="290" cy="220" r="30" fill="#1e293b"/>
                      <circle cx="290" cy="220" r="20" fill="#475569"/>
                      {/* L Badge (Learner) */}
                      <rect x="320" y="95" width="25" height="25" rx="4" fill="#22c55e"/>
                      <text x="332.5" y="112" fontSize="18" fontWeight="bold" fill="white" textAnchor="middle">L</text>
                      {/* Headlight */}
                      <circle cx="60" cy="150" r="8" fill="#fbbf24" opacity="0.8"/>
                    </svg>
                  </div>
                </div>
                {/* Info overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary-900/90 to-transparent p-6">
                  <p className="text-white text-sm font-medium">
                    🚗 2024 Model Eğitim Aracı<br/>
                    <span className="text-xs text-primary-200">Kendi aracınızın fotoğrafını ekleyin</span>
                  </p>
                </div>
              </div>
              
              {/* Floating elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 -right-4 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-xl"
              >
                <div className="text-2xl font-bold text-blue-600">%95</div>
                <div className="text-xs text-gray-600">Başarı Oranı</div>
              </motion.div>
              
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-10 -left-4 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-xl"
              >
                <div className="text-2xl font-bold text-purple-600">5000+</div>
                <div className="text-xs text-gray-600">Mezun Öğrenci</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </div>
  );
}
