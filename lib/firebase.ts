import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Config validasyonu
console.log('🔥 Firebase Config Kontrolü:');
console.log('  ✓ API Key:', firebaseConfig.apiKey ? '✅ Var' : '❌ YOK!');
console.log('  ✓ Auth Domain:', firebaseConfig.authDomain ? '✅ Var' : '❌ YOK!');
console.log('  ✓ Project ID:', firebaseConfig.projectId ? '✅ Var' : '❌ YOK!');
console.log('  ✓ Storage Bucket:', firebaseConfig.storageBucket ? '✅ Var' : '❌ YOK!');
console.log('  ✓ Messaging Sender ID:', firebaseConfig.messagingSenderId ? '✅ Var' : '❌ YOK!');
console.log('  ✓ App ID:', firebaseConfig.appId ? '✅ Var' : '❌ YOK!');

if (!firebaseConfig.projectId) {
  throw new Error('❌ FIREBASE PROJECT ID BULUNAMADI!\n.env.local dosyasını kontrol edin.');
}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

console.log('🔥 Firebase App başlatıldı:', app.name);
console.log('🔥 Firestore instance oluşturuldu');

export { db };
