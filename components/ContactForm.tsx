'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import {
  trackContactFormStart,
  trackContactFormComplete,
  trackContactFormError,
  trackCourseInterest,
} from '@/lib/analytics';

const contactSchema = z.object({
  name: z.string().min(2, 'Ad soyad en az 2 karakter olmalıdır'),
  email: z.string().email('Geçerli bir e-posta adresi giriniz'),
  phone: z.string().min(10, 'Geçerli bir telefon numarası giriniz'),
  courseInterest: z.string().optional(),
  message: z.string().min(10, 'Mesajınız en az 10 karakter olmalıdır'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStarted, setFormStarted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  // Track form start when user focuses on first field
  const handleFormFocus = () => {
    if (!formStarted) {
      setFormStarted(true);
      trackContactFormStart();
    }
  };

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        // Track successful submission
        trackContactFormComplete();
        if (data.courseInterest) {
          trackCourseInterest(data.courseInterest);
        }
        
        toast.success('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.');
        reset();
        setFormStarted(false);
      } else {
        // Track error
        trackContactFormError(result.error || 'Submission failed');
        toast.error(result.error || 'Bir hata oluştu, lütfen tekrar deneyiniz.');
      }
    } catch (error) {
      trackContactFormError('Network error');
      toast.error('Bir hata oluştu, lütfen daha sonra tekrar deneyiniz.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Track validation errors
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const errorFields = Object.keys(errors).join(', ');
      trackContactFormError(`Validation: ${errorFields}`);
    }
  }, [errors]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6">Bize Mesaj Gönderin</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Adınız Soyadınız *
          </label>
          <input
            id="name"
            type="text"
            {...register('name')}
            onFocus={handleFormFocus}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ad Soyad"
            aria-required="true"
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            E-posta *
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="ornek@email.com"
            aria-required="true"
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Telefon *
          </label>
          <input
            id="phone"
            type="tel"
            {...register('phone')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="0555 123 45 67"
            aria-required="true"
            aria-invalid={errors.phone ? 'true' : 'false'}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
          />
          {errors.phone && (
            <p id="phone-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.phone.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="courseInterest" className="block text-sm font-medium text-gray-700 mb-2">
            İlgilendiğiniz Kurs
          </label>
          <select
            id="courseInterest"
            {...register('courseInterest')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Seçiniz...</option>
            <option value="B Sınıfı - Standart">B Sınıfı - Standart</option>
            <option value="B Sınıfı - Yoğun">B Sınıfı - Yoğun</option>
            <option value="B Sınıfı - Otomatik">B Sınıfı - Otomatik</option>
            <option value="Ek Ders">Ek Ders Paketi</option>
            <option value="Diğer">Diğer</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Mesajınız *
          </label>
          <textarea
            id="message"
            {...register('message')}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Mesajınızı buraya yazınız..."
            aria-required="true"
            aria-invalid={errors.message ? 'true' : 'false'}
            aria-describedby={errors.message ? 'message-error' : undefined}
          ></textarea>
          {errors.message && (
            <p id="message-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.message.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Gönderiliyor...' : 'Gönder'}
        </button>
      </form>
    </div>
  );
}
