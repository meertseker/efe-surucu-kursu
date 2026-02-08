'use client';

import { motion } from 'framer-motion';

interface InstructorCardProps {
  name: string;
  title: string;
  experience: string;
  bio: string;
  specialties: string[];
  image?: string;
  delay?: number;
}

export default function InstructorCard({
  name,
  title,
  experience,
  bio,
  specialties,
  image,
  delay = 0,
}: InstructorCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8 }}
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
    >
      {/* Image / Avatar */}
      <div className="relative h-64 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl">
            <h3 className="text-xl font-bold text-gray-900">{name}</h3>
            <p className="text-blue-600 font-medium">{title}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Experience Badge */}
        <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full mb-4">
          <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path
              fillRule="evenodd"
              d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm font-semibold text-blue-600">{experience} deneyim</span>
        </div>

        {/* Bio */}
        <p className="text-gray-600 mb-4 line-clamp-3">{bio}</p>

        {/* Specialties */}
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-2">Uzmanlık Alanları:</p>
          <div className="flex flex-wrap gap-2">
            {specialties.map((specialty, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 text-sm rounded-full border border-blue-100"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Hover gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/0 via-purple-400/0 to-pink-400/0 group-hover:from-blue-400/5 group-hover:via-purple-400/5 group-hover:to-pink-400/5 pointer-events-none transition-all duration-500"></div>
    </motion.div>
  );
}
