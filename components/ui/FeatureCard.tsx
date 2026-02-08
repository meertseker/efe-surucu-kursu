'use client';

import { motion } from 'framer-motion';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

export default function FeatureCard({ icon, title, description, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8 }}
      className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      {/* Icon */}
      <div className="inline-flex p-4 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
        <div className="text-white w-8 h-8">{icon}</div>
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 leading-relaxed">{description}</p>

      {/* Hover effect gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-400/0 via-success-400/0 to-primary-400/0 group-hover:from-primary-400/5 group-hover:via-success-400/5 group-hover:to-primary-400/5 rounded-2xl transition-all duration-500 pointer-events-none"></div>

      {/* Decorative corner */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary-400/10 to-success-400/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </motion.div>
  );
}
