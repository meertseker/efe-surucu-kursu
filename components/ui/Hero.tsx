'use client';

import Link from 'next/link';
import { motion, useMotionValue } from 'framer-motion';
import { springs, floatingAnimation } from '@/lib/spring-animations';
import { useEffect, useState } from 'react';

interface HeroProps {
  title: string;
  subtitle: string;
  primaryCta: { text: string; href: string };
  secondaryCta: { text: string; href: string };
  stats?: { value: string; label: string }[];
}

export default function Hero({ title, subtitle, primaryCta, secondaryCta, stats }: HeroProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate parallax based on window dimensions
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black dark:from-black dark:via-gray-900 dark:to-gray-800">
      {/* Mesh Gradient Background - Red Centered */}
      <motion.div 
        className="absolute inset-0"
        animate={{ x: mousePos.x, y: mousePos.y }}
        transition={{ type: 'spring', stiffness: 50, damping: 20 }}
      >
        {/* Multi-layer gradient mesh */}
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-primary-red/30 via-transparent to-transparent"
          animate={{
            scale: [1, 1.2, 1],
            x: ['0%', '20%', '0%'],
            y: ['0%', '30%', '0%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-secondary-orange/25 via-transparent to-transparent"
          style={{ left: '50%', top: '20%' }}
          animate={{
            scale: [1.2, 1, 1.2],
            x: ['-10%', '10%', '-10%'],
            y: ['10%', '-10%', '10%'],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-accent-rose/20 via-transparent to-transparent"
          style={{ right: '10%', bottom: '20%' }}
          animate={{
            scale: [1, 1.3, 1],
            x: ['10%', '-10%', '10%'],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-secondary-gold/15 via-transparent to-transparent"
          style={{ left: '70%', top: '60%' }}
          animate={{
            scale: [1.1, 1, 1.1],
            y: ['0%', '20%', '0%'],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>

      {/* Glass Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="glass-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#glass-grid)" />
        </svg>
      </div>
      
      {/* Floating Glass Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-[10%] w-64 h-64 rounded-full backdrop-blur-3xl bg-primary-red/20 shadow-glow-red"
          animate={floatingAnimation}
          transition={{ duration: 8, delay: 0 }}
        />
        
        <motion.div
          className="absolute top-40 right-[15%] w-96 h-96 rounded-full backdrop-blur-3xl bg-secondary-orange/20 shadow-glow-orange"
          animate={floatingAnimation}
          transition={{ duration: 10, delay: 1 }}
        />
        
        <motion.div
          className="absolute bottom-32 left-[20%] w-80 h-80 rounded-full backdrop-blur-3xl bg-accent-rose/15 shadow-glass"
          animate={floatingAnimation}
          transition={{ duration: 12, delay: 2 }}
        />
      </div>

      <div className="relative container mx-auto px-4 py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={springs.smooth}
            className="relative"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.2, ...springs.smooth }}
              className="text-display font-bold mb-6 leading-tight text-white dark:text-white"
            >
              {title}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.4, ...springs.smooth }}
              className="text-xl md:text-2xl mb-8 text-gray-700 dark:text-gray-300"
            >
              {subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ...springs.smooth }}
              className="flex flex-wrap gap-4"
            >
              <Link href={primaryCta.href}>
                <motion.div
                  className="relative px-8 py-4 bg-gradient-to-r from-primary-red to-primary-red-dark text-white rounded-2xl font-semibold text-lg shadow-glow-red overflow-hidden"
                  whileHover={{ 
                    scale: 1.05, 
                    y: -4,
                    boxShadow: '0 0 50px rgba(220, 38, 38, 0.7)',
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={springs.smooth}
                >
                  {/* Glass overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent" />
                  
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{ x: ['-200%', '200%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  />
                  
                  <span className="relative z-10 flex items-center gap-2">
                    <span>🚗</span> {primaryCta.text}
                  </span>
                </motion.div>
              </Link>
              
              <Link href={secondaryCta.href}>
                <motion.div
                  className="group relative px-8 py-4 backdrop-blur-2xl bg-white/10 border-2 border-white/30 text-white rounded-2xl font-semibold text-lg shadow-glass-xl overflow-hidden hover:bg-white/20"
                  whileHover={{ 
                    scale: 1.05, 
                    y: -4,
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={springs.smooth}
                >
                  {/* Glass reflection */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <span className="relative z-10 flex items-center gap-2">
                    <span>✓</span> {secondaryCta.text}
                  </span>
                </motion.div>
              </Link>
            </motion.div>

            {/* Stats */}
            {stats && stats.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8, ...springs.smooth }}
                className="mt-12 grid grid-cols-3 gap-4"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="relative backdrop-blur-xl bg-white/10 rounded-2xl p-4 border border-primary-red/50 shadow-glow-red text-center overflow-hidden"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 + index * 0.1, ...springs.bouncy }}
                    whileHover={{ scale: 1.05, y: -4, borderColor: 'rgba(220, 38, 38, 0.8)' }}
                  >
                    {/* Glass reflection */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-red/20 via-transparent to-transparent" />
                    
                    <div className="relative z-10">
                      <div className="text-3xl md:text-4xl font-bold mb-1 bg-gradient-to-r from-white via-secondary-gold to-white bg-clip-text text-transparent">
                        {stat.value}
                      </div>
                      <div className="text-xs md:text-sm text-white font-medium">
                        {stat.label}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* Right illustration - Driving School Image */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Glass Card Container */}
              <div 
                className="relative w-full h-96 rounded-3xl overflow-hidden backdrop-blur-2xl bg-white/5 shadow-glow-red border-2 border-primary-red/40"
              >
                {/* Glass reflection overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none z-10" />
                
                {/* Hero Image */}
                <div className="absolute inset-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src="https://images.pexels.com/photos/7144217/pexels-photo-7144217.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Sürücü Kursu Eğitimi"
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Dark overlay for better contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
                </div>
              </div>
              
              {/* Floating glass badges */}
              <div className="absolute top-10 -right-4 backdrop-blur-2xl bg-white/10 p-4 rounded-2xl shadow-glow-red border-2 border-primary-red/50 overflow-hidden">
                {/* Glass reflection */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-red/30 via-transparent to-transparent" />
                
                <div className="relative z-10">
                  <div className="text-2xl font-bold bg-gradient-to-r from-white to-secondary-gold bg-clip-text text-transparent">%95</div>
                  <div className="text-xs text-white font-medium">Başarı Oranı</div>
                </div>
              </div>
              
              <div className="absolute bottom-10 -left-4 backdrop-blur-2xl bg-white/10 p-4 rounded-2xl shadow-glow-orange border-2 border-secondary-orange/50 overflow-hidden">
                {/* Glass reflection */}
                <div className="absolute inset-0 bg-gradient-to-br from-secondary-orange/30 via-transparent to-transparent" />
                
                <div className="relative z-10">
                  <div className="text-2xl font-bold bg-gradient-to-r from-white to-secondary-gold bg-clip-text text-transparent">5000+</div>
                  <div className="text-xs text-white font-medium">Mezun Öğrenci</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Glass Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
              <stop offset="100%" stopColor="rgba(255,255,255,1)" />
            </linearGradient>
          </defs>
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="url(#waveGradient)"
            className="dark:hidden"
          />
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="rgba(17,24,39,0.95)"
            className="hidden dark:block"
          />
        </svg>
      </div>
    </div>
  );
}
