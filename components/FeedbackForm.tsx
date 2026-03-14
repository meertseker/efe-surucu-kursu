'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { createFeedbackEntry, FeedbackType } from '@/lib/feedback';

const feedbackSchema = z.object({
  type: z.enum(['sikayet', 'geri-bildirim'], {
    message: 'Lütfen bir kategori seçiniz',
  }),
  name: z.string().optional(),
  phone: z.string().optional(),
  message: z.string().min(10, 'Mesajınız en az 10 karakter olmalıdır'),
});

type FeedbackFormData = z.infer<typeof feedbackSchema>;

export default function FeedbackForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
  });

  const onSubmit = async (data: FeedbackFormData) => {
    setIsSubmitting(true);

    try {
      console.log('Form gönderiliyor...', data);
      
      await createFeedbackEntry({
        type: data.type as FeedbackType,
        message: data.message,
        name: data.name,
        phone: data.phone,
      });

      console.log('Form başarıyla gönderildi!');
      
      toast.success(
        data.type === 'sikayet' 
          ? 'Şikayetiniz başarıyla kaydedildi. En kısa sürede değerlendireceğiz.' 
          : 'Geri bildiriminiz başarıyla kaydedildi. Teşekkür ederiz!'
      );
      reset();
    } catch (error) {
      console.error('Form gönderme hatası:', error);
      
      if (error instanceof Error) {
        // Hata mesajını satır satır göster
        const errorLines = error.message.split('\n');
        if (errorLines.length > 1) {
          // Çok satırlı hata - sadece ilk satırı toast'ta göster
          toast.error(errorLines[0], {
            duration: 6000,
            style: {
              maxWidth: '500px',
            },
          });
          // Konsola tam hata mesajını yaz
          console.error('📋 Tam hata mesajı:\n', error.message);
        } else {
          // Tek satırlı hata
          toast.error(error.message, { duration: 5000 });
        }
      } else {
        toast.error('Bir hata oluştu, lütfen tekrar deneyiniz.', { duration: 4000 });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const firstError = Object.values(errors)[0]?.message;
      if (firstError && typeof firstError === 'string') {
        toast.error(firstError);
      }
    }
  }, [errors]);

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg shadow-glass-xl p-8">
      <h2 className="text-2xl font-bold mb-6 text-white">Görüş ve Önerileriniz</h2>
      <p className="text-gray-300 mb-6">
        Hizmetlerimiz hakkındaki şikayet ve geri bildirimlerinizi bizimle paylaşın. 
        Görüşleriniz bizim için değerlidir.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-300 mb-2">
            Kategori *
          </label>
          <select
            id="type"
            {...register('type')}
            className="w-full px-4 py-2 backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent text-white"
            aria-required="true"
            aria-invalid={errors.type ? 'true' : 'false'}
            aria-describedby={errors.type ? 'type-error' : undefined}
          >
            <option value="" className="bg-gray-900">Seçiniz...</option>
            <option value="sikayet" className="bg-gray-900">Şikayet</option>
            <option value="geri-bildirim" className="bg-gray-900">Geri Bildirim / Öneri</option>
          </select>
          {errors.type && (
            <p id="type-error" className="mt-1 text-sm text-accent-rose" role="alert">
              {errors.type.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
            Adınız Soyadınız (İsteğe bağlı)
          </label>
          <input
            id="name"
            type="text"
            {...register('name')}
            className="w-full px-4 py-2 backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent text-white placeholder-gray-400"
            placeholder="Ad Soyad"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
            Telefon (İsteğe bağlı)
          </label>
          <input
            id="phone"
            type="tel"
            {...register('phone')}
            className="w-full px-4 py-2 backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent text-white placeholder-gray-400"
            placeholder="0555 123 45 67"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
            Mesajınız *
          </label>
          <textarea
            id="message"
            {...register('message')}
            rows={6}
            className="w-full px-4 py-2 backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent text-white placeholder-gray-400"
            placeholder="Şikayet veya geri bildiriminizi detaylı olarak yazınız..."
            aria-required="true"
            aria-invalid={errors.message ? 'true' : 'false'}
            aria-describedby={errors.message ? 'message-error' : undefined}
          ></textarea>
          {errors.message && (
            <p id="message-error" className="mt-1 text-sm text-accent-rose" role="alert">
              {errors.message.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary-red text-white py-3 rounded-lg font-semibold hover:bg-primary-red-dark transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed shadow-glow hover:shadow-glow-lg hover:scale-105 disabled:hover:scale-100"
        >
          {isSubmitting ? 'Gönderiliyor...' : 'Gönder'}
        </button>
      </form>
    </div>
  );
}
