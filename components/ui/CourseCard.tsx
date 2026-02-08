'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface CourseCardProps {
  title: string;
  description: string;
  price: number;
  duration: string;
  features: string[];
  popular?: boolean;
  className?: string;
}

export default function CourseCard({
  title,
  description,
  price,
  duration,
  features,
  popular = false,
  className = '',
}: CourseCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden ${className}`}
    >
      {/* Popular badge */}
      {popular && (
        <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-warning-500 to-warning-600 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
          ⭐ Popüler
        </div>
      )}

      {/* Image placeholder */}
      <div className="relative h-48 overflow-hidden">
        <div className={`absolute inset-0 ${popular ? 'bg-gradient-to-br from-primary-500 to-primary-700' : 'bg-gradient-to-br from-road-600 to-road-800'}`}>
          <svg viewBox="0 0 400 200" className="w-full h-full opacity-20" fill="white">
            <circle cx="100" cy="140" r="35" />
            <circle cx="300" cy="140" r="35" />
            <rect x="60" y="80" width="280" height="80" rx="15" />
          </svg>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6 text-sm">{description}</p>

        {/* Price */}
        <div className="mb-6 bg-gray-50 p-4 rounded-xl">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-gray-900">
              {price.toLocaleString('tr-TR')}
            </span>
            <span className="text-gray-500 font-medium">₺</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">💳 {duration}</p>
        </div>

        {/* Features */}
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3"
            >
              <svg
                className="w-5 h-5 text-success-500 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-gray-700 text-sm">{feature}</span>
            </motion.li>
          ))}
        </ul>

        {/* CTA Button */}
        <Link
          href="/iletisim"
          className={`block w-full py-4 rounded-xl font-semibold text-center transition-all duration-300 ${
            popular
              ? 'bg-gradient-to-r from-success-500 to-success-600 text-white hover:shadow-lg hover:scale-105'
              : 'bg-primary-600 text-white hover:bg-primary-700 hover:scale-105'
          }`}
        >
          Hemen Kayıt Ol →
        </Link>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-400/0 via-success-400/0 to-warning-400/0 hover:from-primary-400/10 hover:via-success-400/10 hover:to-warning-400/10 pointer-events-none transition-all duration-500 rounded-2xl"></div>
    </motion.div>
  );
}
