'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { springs } from '@/lib/spring-animations';
import { glassNavbar } from '@/lib/glass-effects';

interface NavigationProps {
  siteName: string;
  logo?: string;
}

export default function Navigation({ siteName, logo }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Ana Sayfa', href: '/' },
    { label: 'Kurslar', href: '/kurslar' },
    { label: 'Hakkımızda', href: '/hakkimizda' },
    { label: 'Blog', href: '/blog' },
    { label: 'İletişim', href: '/iletisim' },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={springs.smooth}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${glassNavbar(isScrolled)}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div 
              className="relative w-12 h-12 bg-gradient-to-br from-primary-red to-secondary-orange rounded-2xl flex items-center justify-center shadow-glow-red"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              transition={springs.bouncy}
            >
              {/* Glass overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent rounded-2xl" />
              
              <svg
                className="w-7 h-7 text-white relative z-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              
              {/* Pulsing glow effect */}
              <motion.div
                className="absolute inset-0 bg-primary-red rounded-2xl opacity-50 blur-lg"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.3, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>
            
            <span className="text-2xl font-bold text-white dark:text-white">
              {siteName}
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, ...springs.smooth }}
              >
                <Link
                  href={item.href}
                  className="relative text-white dark:text-white hover:text-secondary-gold dark:hover:text-secondary-gold font-semibold transition-colors duration-300 group py-2"
                >
                  {item.label}
                  <motion.span 
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary-red to-secondary-orange rounded-full"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={springs.snappy}
                  />
                  
                  {/* Hover glow effect */}
                  <span className="absolute inset-0 bg-primary-red/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div 
            className="hidden md:block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, ...springs.bouncy }}
          >
            <Link href="/iletisim">
              <motion.div
                className="relative px-6 py-3 bg-gradient-to-r from-primary-red to-secondary-orange text-white rounded-2xl font-semibold shadow-glow-red overflow-hidden"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 0 40px rgba(220, 38, 38, 0.7)',
                }}
                whileTap={{ scale: 0.95 }}
                transition={springs.smooth}
              >
                {/* Glass overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent" />
                
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: ['-200%', '200%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
                
                <span className="relative z-10">Kayıt Ol</span>
              </motion.div>
            </Link>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl backdrop-blur-lg bg-white/60 dark:bg-white/10 hover:bg-white/80 dark:hover:bg-white/20 transition-all duration-300"
            whileTap={{ scale: 0.9 }}
            transition={springs.snappy}
          >
            <motion.svg
              className="w-6 h-6 text-gray-900 dark:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
              transition={springs.smooth}
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </motion.svg>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={springs.smooth}
            className="md:hidden backdrop-blur-2xl bg-white/90 dark:bg-depth-dark-elevated border-t border-white/20 dark:border-white/10 shadow-glass-lg"
          >
            <motion.div 
              className="container mx-auto px-4 py-4 space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, ...springs.smooth }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-xl backdrop-blur-lg bg-white/60 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 text-gray-900 dark:text-white font-medium transition-all duration-300 border border-white/30 dark:border-white/10"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: menuItems.length * 0.05, ...springs.smooth }}
              >
                <Link
                  href="/iletisim"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 bg-gradient-to-r from-primary-red to-secondary-orange text-white rounded-xl font-semibold text-center shadow-glow-red"
                >
                  Kayıt Ol
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
