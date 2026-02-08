'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQ[];
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq) => (
        <div
          key={faq.id}
          className="border border-gray-200 rounded-lg overflow-hidden hover:border-primary-300 transition-colors"
        >
          <button
            onClick={() => toggleFAQ(faq.id)}
            className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors flex items-center justify-between gap-4"
            aria-expanded={openId === faq.id}
            aria-controls={`faq-answer-${faq.id}`}
          >
            <span className="font-semibold text-gray-900 text-lg">
              {faq.question}
            </span>
            <svg
              className={`w-6 h-6 text-primary-600 flex-shrink-0 transition-transform duration-300 ${
                openId === faq.id ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          <AnimatePresence>
            {openId === faq.id && (
              <motion.div
                id={`faq-answer-${faq.id}`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
