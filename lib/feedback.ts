import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  getDocs, 
  deleteDoc, 
  doc,
  updateDoc,
  Timestamp,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './firebase';

export type FeedbackType = 'sikayet' | 'geri-bildirim' | 'iletisim';
export type FeedbackStatus = 'new' | 'in_review' | 'resolved';

export interface FeedbackEntry {
  id?: string;
  type: FeedbackType;
  sourceForm?: 'iletisim';
  message: string;
  name?: string;
  email?: string;
  phone?: string;
  courseInterest?: string;
  createdAt: Timestamp | Date;
  status: FeedbackStatus;
}

export interface CreateFeedbackInput {
  type: FeedbackType;
  sourceForm?: 'iletisim';
  message: string;
  name?: string;
  email?: string;
  phone?: string;
  courseInterest?: string;
}

const COLLECTION_NAME = 'feedbackEntries';

type FeedbackError = Error & {
  code?: string;
};

function normalizeFeedbackError(error: unknown): FeedbackError {
  if (error instanceof Error) {
    return error as FeedbackError;
  }

  const fallback = new Error('Bilinmeyen hata') as FeedbackError;
  if (typeof error === 'object' && error !== null) {
    return Object.assign(fallback, error);
  }

  if (typeof error === 'string') {
    fallback.message = error;
  }

  return fallback;
}

export async function createFeedbackEntry(input: CreateFeedbackInput): Promise<string> {
  const buildDataToWrite = (type: FeedbackType) => ({
    type,
    ...(input.sourceForm ? { sourceForm: input.sourceForm } : {}),
    message: input.message,
    name: input.name || '',
    email: input.email || '',
    phone: input.phone || '',
    courseInterest: input.courseInterest || '',
    status: 'new' as FeedbackStatus,
    createdAt: serverTimestamp(),
  });

  const writeFeedbackDoc = async (type: FeedbackType) => {
    const dataToWrite = buildDataToWrite(type);

    console.log('🔥 Firestore yazma başlıyor...', { ...input, type });
    console.log('🔥 DB instance:', db);
    console.log('🔥 DB app name:', db.app.name);
    console.log('🔥 DB app options:', db.app.options);
    console.log('🔥 Collection name:', COLLECTION_NAME);
    console.log('🔥 Yazılacak veri:', dataToWrite);
    console.log('🔥 addDoc fonksiyonu çağrılıyor...');

    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => {
        console.error('⏰ 30 saniye timeout! Firebase yanıt vermiyor.');
        reject(new Error('TIMEOUT_ERROR'));
      }, 30000);
    });

    const addDocPromise = addDoc(collection(db, COLLECTION_NAME), dataToWrite)
      .then((docRef) => {
        console.log('✅ addDoc başarılı!', docRef.id);
        return docRef;
      })
      .catch((error) => {
        console.error('❌ addDoc hatası yakalandı:', error);
        console.error('❌ Hata tipi:', typeof error);
        console.error('❌ Hata constructor:', error.constructor.name);
        console.error('❌ Hata code:', error.code);
        console.error('❌ Hata name:', error.name);
        console.error('❌ Hata message:', error.message);
        console.error('❌ Tam hata objesi:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
        throw error;
      });

    return Promise.race([addDocPromise, timeoutPromise]);
  };

  try {
    const docRef = await writeFeedbackDoc(input.type);
    
    console.log('✅ Firestore yazma başarılı! Doc ID:', docRef.id);
    return docRef.id;
  } catch (error: unknown) {
    let feedbackError = normalizeFeedbackError(error);

    // Canlıda rules güncellenmediyse "iletisim" yazımı permission-denied verebilir.
    // Bu durumda geri-bildirim tipine düşüp sourceForm ile adminde iletişim olarak göstereceğiz.
    if (input.type === 'iletisim' && feedbackError.code === 'permission-denied') {
      try {
        console.warn('⚠️ iletisim type permission-denied. Fallback: geri-bildirim');
        const docRef = await writeFeedbackDoc('geri-bildirim');
        console.log('✅ Fallback yazma başarılı! Doc ID:', docRef.id);
        return docRef.id;
      } catch (fallbackError: unknown) {
        feedbackError = normalizeFeedbackError(fallbackError);
      }
    }

    console.error('❌ CATCH bloğunda yakalanan hata:', error);
    console.error('❌ Hata tipi:', typeof error);
    console.error('❌ Hata constructor:', feedbackError.constructor?.name);
    console.error('❌ Hata code:', feedbackError.code);
    console.error('❌ Hata name:', feedbackError.name);
    console.error('❌ Hata message:', feedbackError.message);
    console.error('❌ Tam hata:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
    
    // Timeout hatası mı?
    if (feedbackError.message === 'TIMEOUT_ERROR') {
      throw new Error('❌ FIREBASE YANIT VERMİYOR!\n\n' +
        'Olası nedenler:\n' +
        '1. Firestore Database oluşturulmamış (Firebase Console > Firestore Database > Create Database)\n' +
        '2. Firebase project ID yanlış (.env.local dosyasını kontrol edin)\n' +
        '3. Network hatası (internet bağlantınızı kontrol edin)\n' +
        '4. Firebase API anahtarı geçersiz\n\n' +
        'Lütfen Firebase Console\'u kontrol edin: https://console.firebase.google.com/project/efesurucukursu-da77d/firestore');
    }
    
    // Firebase hata kodları
    if (feedbackError.code === 'permission-denied') {
      throw new Error('❌ İZİN HATASI (permission-denied)\n\n' +
        'Firestore Security Rules izin vermiyor.\n' +
        'Firebase Console > Firestore Database > Rules\n' +
        'Veya komutu çalıştırın: firebase deploy --only firestore:rules');
    } else if (feedbackError.code === 'unavailable') {
      throw new Error('❌ BAĞLANTI HATASI (unavailable)\n\n' +
        'Firestore\'a bağlanılamıyor.\n' +
        '1. İnternet bağlantınızı kontrol edin\n' +
        '2. Firebase servisi çalışıyor mu kontrol edin: https://status.firebase.google.com/');
    } else if (feedbackError.code === 'failed-precondition') {
      throw new Error('❌ DATABASE BULUNAMADI (failed-precondition)\n\n' +
        'Firestore Database oluşturulmamış!\n' +
        'Firebase Console > Firestore Database > Create Database\n' +
        'Link: https://console.firebase.google.com/project/efesurucukursu-da77d/firestore');
    } else if (feedbackError.code === 'invalid-argument') {
      throw new Error('❌ GEÇERSİZ VERİ (invalid-argument)\n\n' +
        'Gönderilen veri formatı hatalı: ' + feedbackError.message);
    } else if (feedbackError.code === 'not-found') {
      throw new Error('❌ COLLECTION BULUNAMADI (not-found)\n\n' +
        'Collection veya database bulunamadı.\n' +
        'Database oluşturulmuş mu kontrol edin.');
    } else {
      throw new Error(`❌ BİLİNMEYEN FIREBASE HATASI\n\n` +
        `Hata Kodu: ${feedbackError.code || 'YOK'}\n` +
        `Hata Mesajı: ${feedbackError.message}\n` +
        `Hata Tipi: ${feedbackError.constructor?.name}\n\n` +
        `Detaylı log için konsola bakın.`);
    }
  }
}

export async function listFeedbackEntries(): Promise<FeedbackEntry[]> {
  try {
    console.log('🔥 Firestore okuma başlıyor...');
    
    // Timeout ile race
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => {
        console.error('⏰ 10 saniye timeout! Firestore okuma yanıt vermiyor.');
        reject(new Error('TIMEOUT_ERROR'));
      }, 10000);
    });
    
    const q = query(
      collection(db, COLLECTION_NAME), 
      orderBy('createdAt', 'desc')
    );
    
    const queryPromise = getDocs(q)
      .then((querySnapshot) => {
        console.log('✅ Firestore okuma başarılı! Toplam kayıt:', querySnapshot.docs.length);
        return querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as FeedbackEntry[];
      });
    
    return await Promise.race([queryPromise, timeoutPromise]);
  } catch (error: unknown) {
    const feedbackError = normalizeFeedbackError(error);

    console.error('❌ Firestore okuma hatası:', error);
    console.error('❌ Hata kodu:', feedbackError.code);
    console.error('❌ Hata mesajı:', feedbackError.message);
    
    // Timeout hatası
    if (feedbackError.message === 'TIMEOUT_ERROR') {
      throw new Error('❌ FIRESTORE OKUMA ZAMAN AŞIMI\n\n' +
        'Veriler yüklenemedi (10 saniye timeout).\n' +
        'Olası nedenler:\n' +
        '1. Firestore Database oluşturulmamış\n' +
        '2. İnternet bağlantısı yavaş\n' +
        '3. Firestore servisi yanıt vermiyor');
    }
    
    // Firebase hata kodları
    if (feedbackError.code === 'permission-denied') {
      throw new Error('❌ İZİN HATASI\n\nFirestore Security Rules okuma izni vermiyor.');
    } else if (feedbackError.code === 'failed-precondition') {
      throw new Error('❌ INDEX EKSİK\n\nFirestore Console\'da index oluşturmanız gerekiyor.\n' +
        'createdAt field için descending index oluşturun.');
    } else if (feedbackError.code === 'unavailable') {
      throw new Error('❌ BAĞLANTI HATASI\n\nFirestore servisine bağlanılamıyor.\n' +
        'İnternet bağlantınızı kontrol edin.');
    } else if (feedbackError.code === 'not-found') {
      // Collection yok - boş array dön
      console.log('ℹ️ Collection henüz oluşturulmamış, boş array dönülüyor');
      return [];
    } else {
      throw new Error(`❌ GERİ BİLDİRİMLER YÜKLENEMEDİ\n\n` +
        `Hata: ${feedbackError.code || 'Bilinmeyen'}\n` +
        `Mesaj: ${feedbackError.message}`);
    }
  }
}

export async function deleteFeedbackEntry(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
  } catch (error) {
    console.error('Error deleting feedback entry:', error);
    throw new Error('Geri bildirim silinemedi.');
  }
}

export async function updateFeedbackStatus(id: string, status: FeedbackStatus): Promise<void> {
  try {
    await updateDoc(doc(db, COLLECTION_NAME, id), {
      status,
    });
  } catch (error) {
    console.error('Error updating feedback status:', error);
    throw new Error('Durum güncellenemedi.');
  }
}
