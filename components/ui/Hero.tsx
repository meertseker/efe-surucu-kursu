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
                    boxShadow: '0 0 50px rgba(154, 50, 34, 0.7)',
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
              
              <a href={secondaryCta.href} target="_blank" rel="noopener noreferrer">
                <motion.div
                  className="group relative px-8 py-4 backdrop-blur-2xl bg-gradient-to-r from-green-500/90 to-green-600/90 border-2 border-green-400/50 text-white rounded-2xl font-semibold text-lg shadow-glass-xl overflow-hidden hover:from-green-600/90 hover:to-green-700/90"
                  whileHover={{ 
                    scale: 1.05, 
                    y: -4,
                    boxShadow: '0 0 40px rgba(34, 197, 94, 0.6)',
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={springs.smooth}
                >
                  {/* Glass reflection */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <span className="relative z-10 flex items-center gap-2">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    {secondaryCta.text}
                  </span>
                </motion.div>
              </a>
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
                    whileHover={{ scale: 1.05, y: -4, borderColor: 'rgba(154, 50, 34, 0.8)' }}
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
                    src="https://images.unsplash.com/photo-1630406144797-821be1f35d75?auto=compress&cs=tinysrgb&w=800"
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
                  <div className="text-2xl font-bold bg-gradient-to-r from-white to-secondary-gold bg-clip-text text-transparent">2003</div>
                  <div className="text-xs text-white font-medium">Büyükçekmece&apos;de faaliyet</div>
                </div>
              </div>
              
              <div className="absolute bottom-10 -left-4 backdrop-blur-2xl bg-white/10 p-4 rounded-2xl shadow-glow-orange border-2 border-secondary-orange/50 overflow-hidden">
                {/* Glass reflection */}
                <div className="absolute inset-0 bg-gradient-to-br from-secondary-orange/30 via-transparent to-transparent" />
                
                <div className="relative z-10">
                  <div className="text-2xl font-bold bg-gradient-to-r from-white to-secondary-gold bg-clip-text text-transparent">B / A1 / A2</div>
                  <div className="text-xs text-white font-medium">Ehliyet ve direksiyon dersi</div>
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
