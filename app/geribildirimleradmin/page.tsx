'use client';

import { useState, useEffect } from 'react';
import { FeedbackEntry, listFeedbackEntries, deleteFeedbackEntry, updateFeedbackStatus, FeedbackStatus } from '@/lib/feedback';
import toast from 'react-hot-toast';

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';

export default function AdminFeedbackPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [feedbacks, setFeedbacks] = useState<FeedbackEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<'all' | 'sikayet' | 'geri-bildirim'>('all');

  useEffect(() => {
    const savedAuth = sessionStorage.getItem('admin_authenticated');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
      // Otomatik yükleme - 500ms gecikme ile daha smooth
      setTimeout(() => {
        loadFeedbacks();
      }, 500);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_authenticated', 'true');
      toast.success('Giriş başarılı');
      // Smooth transition için kısa gecikme
      setTimeout(() => {
        loadFeedbacks();
      }, 300);
    } else {
      toast.error('Hatalı şifre');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_authenticated');
    setFeedbacks([]);
    setPassword('');
  };

  const loadFeedbacks = async () => {
    setLoading(true);
    console.log('📋 Admin panel - Geri bildirimler yükleniyor...');
    const startTime = Date.now();
    
    try {
      const data = await listFeedbackEntries();
      const loadTime = Date.now() - startTime;
      console.log(`✅ Geri bildirimler yüklendi! (${loadTime}ms) - Toplam: ${data.length}`);
      setFeedbacks(data);
      
      if (data.length === 0) {
        toast('Henüz geri bildirim bulunmuyor', { icon: 'ℹ️' });
      }
    } catch (error) {
      const loadTime = Date.now() - startTime;
      console.error(`❌ Geri bildirimler yüklenemedi (${loadTime}ms):`, error);
      
      if (error instanceof Error) {
        const errorLines = error.message.split('\n');
        toast.error(errorLines[0], {
          duration: 5000,
          style: { maxWidth: '500px' },
        });
        console.error('📋 Tam hata mesajı:\n', error.message);
      } else {
        toast.error('Geri bildirimler yüklenemedi');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu kaydı silmek istediğinizden emin misiniz?')) return;
    
    try {
      await deleteFeedbackEntry(id);
      setFeedbacks(feedbacks.filter(f => f.id !== id));
      toast.success('Kayıt silindi');
    } catch (error) {
      toast.error('Silme işlemi başarısız');
    }
  };

  const handleStatusChange = async (id: string, status: FeedbackStatus) => {
    try {
      await updateFeedbackStatus(id, status);
      setFeedbacks(feedbacks.map(f => f.id === id ? { ...f, status } : f));
      toast.success('Durum güncellendi');
    } catch (error) {
      toast.error('Durum güncellenemedi');
    }
  };

  const filteredFeedbacks = filter === 'all' 
    ? feedbacks 
    : feedbacks.filter(f => f.type === filter);

  const getStatusBadge = (status: FeedbackStatus) => {
    const badges = {
      new: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      in_review: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
      resolved: 'bg-green-500/20 text-green-300 border-green-500/30',
    };
    const labels = {
      new: 'Yeni',
      in_review: 'İnceleniyor',
      resolved: 'Çözüldü',
    };
    return (
      <span className={`px-2 py-1 rounded text-xs border ${badges[status]}`}>
        {labels[status]}
      </span>
    );
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center p-4">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-glass-xl p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-white mb-6 text-center">Admin Girişi</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Şifre
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent text-white placeholder-gray-400"
                placeholder="Admin şifresi"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary-red text-white py-3 rounded-lg font-semibold hover:bg-primary-red-dark transition-all duration-300 shadow-glow hover:shadow-glow-lg hover:scale-105"
            >
              Giriş Yap
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-black to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Geri Bildirim Yönetimi</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Çıkış Yap
          </button>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'all' 
                ? 'bg-primary-red text-white' 
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            Tümü ({feedbacks.length})
          </button>
          <button
            onClick={() => setFilter('sikayet')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'sikayet' 
                ? 'bg-primary-red text-white' 
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            Şikayetler ({feedbacks.filter(f => f.type === 'sikayet').length})
          </button>
          <button
            onClick={() => setFilter('geri-bildirim')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'geri-bildirim' 
                ? 'bg-primary-red text-white' 
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            Geri Bildirimler ({feedbacks.filter(f => f.type === 'geri-bildirim').length})
          </button>
          <button
            onClick={loadFeedbacks}
            className="ml-auto px-4 py-2 bg-white/10 text-gray-300 rounded-lg hover:bg-white/20 transition-colors"
          >
            🔄 Yenile
          </button>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl shadow-glass-xl p-6 animate-pulse"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-3">
                    <div className="h-6 w-24 bg-white/10 rounded"></div>
                    <div className="h-6 w-20 bg-white/10 rounded"></div>
                  </div>
                  <div className="h-4 w-32 bg-white/10 rounded"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-white/10 rounded w-full"></div>
                  <div className="h-4 bg-white/10 rounded w-3/4"></div>
                </div>
              </div>
            ))}
            <div className="text-center text-gray-400 py-4">
              🔄 Geri bildirimler yükleniyor...
            </div>
          </div>
        ) : filteredFeedbacks.length === 0 ? (
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-glass-xl p-12 text-center">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-gray-300 text-xl font-semibold mb-2">
              {filter === 'all' ? 'Henüz Geri Bildirim Yok' : `${filter === 'sikayet' ? 'Şikayet' : 'Geri Bildirim'} Bulunamadı`}
            </p>
            <p className="text-gray-400 text-sm">
              {feedbacks.length === 0 
                ? 'Kullanıcılar form gönderdikçe burada görünecektir.' 
                : 'Başka bir filtre deneyin.'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFeedbacks.map((feedback) => (
              <div
                key={feedback.id}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl shadow-glass-xl p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-3 items-center">
                    <span className={`px-3 py-1 rounded-lg text-sm font-medium ${
                      feedback.type === 'sikayet' 
                        ? 'bg-red-500/20 text-red-300 border border-red-500/30' 
                        : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                    }`}>
                      {feedback.type === 'sikayet' ? '⚠️ Şikayet' : '💡 Geri Bildirim'}
                    </span>
                    {getStatusBadge(feedback.status)}
                  </div>
                  <div className="text-sm text-gray-400">
                    {feedback.createdAt && (
                      'seconds' in feedback.createdAt 
                        ? new Date(feedback.createdAt.seconds * 1000).toLocaleString('tr-TR')
                        : feedback.createdAt.toLocaleString('tr-TR')
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-white text-lg mb-2">{feedback.message}</p>
                  {(feedback.name || feedback.phone) && (
                    <div className="flex gap-4 text-sm text-gray-400 mt-3">
                      {feedback.name && <span>👤 {feedback.name}</span>}
                      {feedback.phone && <span>📞 {feedback.phone}</span>}
                    </div>
                  )}
                </div>

                <div className="flex gap-2 pt-4 border-t border-white/10">
                  <select
                    value={feedback.status}
                    onChange={(e) => handleStatusChange(feedback.id!, e.target.value as FeedbackStatus)}
                    className="px-3 py-1 bg-white/10 border border-white/20 rounded text-white text-sm focus:ring-2 focus:ring-primary-red"
                  >
                    <option value="new" className="bg-gray-900">Yeni</option>
                    <option value="in_review" className="bg-gray-900">İnceleniyor</option>
                    <option value="resolved" className="bg-gray-900">Çözüldü</option>
                  </select>
                  <button
                    onClick={() => handleDelete(feedback.id!)}
                    className="ml-auto px-3 py-1 bg-red-600/20 text-red-300 border border-red-600/30 rounded hover:bg-red-600/30 transition-colors text-sm"
                  >
                    🗑️ Sil
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
