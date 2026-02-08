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
        <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-bl-2xl font-semibold text-sm shadow-lg">
          ⭐ Popüler Seçim
        </div>
      )}

      {/* Gradient header */}
      <div className={`p-6 ${popular ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gradient-to-r from-gray-600 to-gray-700'} text-white`}>
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-sm opacity-90">{duration}</p>
      </div>

      <div className="p-6">
        <p className="text-gray-600 mb-6 line-clamp-2">{description}</p>

        {/* Price */}
        <div className="mb-6">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-gray-900">
              {price.toLocaleString('tr-TR')}
            </span>
            <span className="text-gray-500 font-medium">₺</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">Toplam kurs ücreti</p>
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
                className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
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
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:scale-105'
              : 'bg-gray-800 text-white hover:bg-gray-900 hover:scale-105'
          }`}
        >
          Hemen Kayıt Ol
        </Link>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-purple-400/0 to-blue-400/0 hover:from-blue-400/10 hover:via-purple-400/10 hover:to-blue-400/10 pointer-events-none transition-all duration-500 rounded-2xl"></div>
    </motion.div>
  );
}
