'use client';

import { motion } from 'framer-motion';

interface TrustBadgeProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color?: 'blue' | 'green' | 'orange' | 'purple';
  delay?: number;
}

export default function TrustBadge({ 
  icon, 
  title, 
  description, 
  color = 'blue',
  delay = 0 
}: TrustBadgeProps) {
  const colorClasses = {
    blue: {
      bg: 'from-blue-500 to-blue-600',
      text: 'text-blue-600',
      iconBg: 'bg-blue-100',
      border: 'border-blue-200',
    },
    green: {
      bg: 'from-success-500 to-success-600',
      text: 'text-success-600',
      iconBg: 'bg-success-100',
      border: 'border-success-200',
    },
    orange: {
      bg: 'from-warning-500 to-warning-600',
      text: 'text-warning-600',
      iconBg: 'bg-warning-100',
      border: 'border-warning-200',
    },
    purple: {
      bg: 'from-purple-500 to-purple-600',
      text: 'text-purple-600',
      iconBg: 'bg-purple-100',
      border: 'border-purple-200',
    },
  };

  const classes = colorClasses[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="relative group"
    >
      <div className={`bg-white rounded-2xl p-6 shadow-lg border-2 ${classes.border} hover:shadow-2xl transition-all duration-300`}>
        {/* Icon */}
        <div className={`inline-flex p-4 ${classes.iconBg} rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
          <div className={classes.text}>{icon}</div>
        </div>

        {/* Badge */}
        <div className={`inline-block px-3 py-1 bg-gradient-to-r ${classes.bg} text-white text-xs font-bold rounded-full mb-3`}>
          ✓ Güvenilir
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
        
        {/* Description */}
        <p className="text-sm text-gray-600">{description}</p>

        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 group-hover:animate-pulse rounded-2xl pointer-events-none"></div>
      </div>
    </motion.div>
  );
}
