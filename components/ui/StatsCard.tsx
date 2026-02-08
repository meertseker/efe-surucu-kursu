'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface StatsCardProps {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  icon?: React.ReactNode;
  delay?: number;
}

export default function StatsCard({
  value,
  label,
  suffix = '',
  prefix = '',
  icon,
  delay = 0,
}: StatsCardProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="relative group"
    >
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
        {/* Icon */}
        {icon && (
          <div className="inline-flex p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
            <div className="text-white">{icon}</div>
          </div>
        )}

        {/* Value */}
        <div className="mb-2">
          <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {prefix}
            {count.toLocaleString('tr-TR')}
            {suffix}
          </span>
        </div>

        {/* Label */}
        <p className="text-gray-600 font-medium">{label}</p>

        {/* Decorative gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/0 via-purple-400/0 to-blue-400/0 group-hover:from-blue-400/5 group-hover:via-purple-400/5 group-hover:to-blue-400/5 rounded-2xl transition-all duration-500 pointer-events-none"></div>
      </div>
    </motion.div>
  );
}
