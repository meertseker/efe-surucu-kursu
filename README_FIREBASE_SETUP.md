# Firebase Kurulum Rehberi

Bu proje Firebase Firestore kullanarak müşteri geri bildirim ve şikayet yönetimi sağlar.

## Gereksinimler

1. Firebase projesi oluşturulması
2. Firestore veritabanı aktif edilmesi
3. Environment değişkenlerinin yapılandırılması

## Adım Adım Kurulum

### 1. Firebase Projesi Oluşturma

1. [Firebase Console](https://console.firebase.google.com/) adresine gidin
2. "Add project" veya "Proje ekle" butonuna tıklayın
3. Proje adını girin (örn: "efe-surucu-kursu")
4. Google Analytics'i isteğe bağlı olarak aktif edin
5. Projeyi oluşturun

### 2. Firestore Veritabanı Kurulumu

1. Firebase Console'da sol menüden "Firestore Database" seçin
2. "Create database" butonuna tıklayın
3. **Test mode** veya **Production mode** seçin
   - Production mode için `firestore.rules` dosyasını kullanacaksınız
4. Lokasyon seçin (örn: europe-west1)
5. Veritabanını oluşturun

### 3. Web Uygulaması Yapılandırması

1. Firebase Console'da proje ayarlarına gidin (⚙️ simgesi)
2. "Your apps" bölümünde Web uygulaması ekleyin (`</>` simgesi)
3. App nickname girin
4. Firebase Hosting'i şimdilik atlayabilirsiniz
5. Firebase config bilgilerini kopyalayın

### 4. Environment Değişkenlerini Ayarlama

Proje kök dizininde `.env.local` dosyası oluşturun ve Firebase config bilgilerinizi ekleyin:

```bash
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# Admin Panel Şifresi (istediğiniz şifreyi buraya yazın)
NEXT_PUBLIC_ADMIN_PASSWORD=gizli_sifreniz
```

### 5. Firestore Güvenlik Kurallarını Yükleme

1. Firebase Console'da "Firestore Database" > "Rules" sekmesine gidin
2. `firestore.rules` dosyasındaki kuralları kopyalayın
3. Firebase Console'a yapıştırın ve "Publish" (Yayınla) butonuna tıklayın

Alternatif olarak Firebase CLI ile:
```bash
npm install -g firebase-tools
firebase login
firebase init firestore
firebase deploy --only firestore:rules
```

### 6. Test Etme

1. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```

2. `/geri-bildirim` sayfasını ziyaret edin ve test geri bildirimi gönderin

3. `/geribildirimleradmin` sayfasına gidin ve şifre ile giriş yapın

4. Gönderdiğiniz geri bildirimi görebildiğinizi kontrol edin

## Güvenlik Notları

⚠️ **ÖNEMLİ**: Bu kurulum **client-side** şifre koruması kullanır ve tam güvenli değildir:

- Admin şifresi ve Firestore erişimi client-side'dadır
- Teknik bilgisi olan kişiler Firestore'a doğrudan erişebilir
- **Üretim ortamı için önerilmez**

### Güvenlik İyileştirmeleri (Opsiyonel)

Daha güvenli bir sistem için:

1. **Firebase Authentication** kullanın
2. **Firestore Security Rules**'da auth kontrolü ekleyin:
   ```javascript
   allow read, update, delete: if request.auth != null && request.auth.token.admin == true;
   ```
3. **Cloud Functions** ile server-side doğrulama ekleyin

## Kullanım

### Müşteri Geri Bildirimi
- Adres: `/geri-bildirim`
- Herkes erişebilir
- Form doldurup gönderilebilir

### Admin Paneli  
- Adres: `/geribildirimleradmin`
- Şifre ile korumalı
- Tüm geri bildirimleri gösterir
- Durum güncelleme ve silme özellikleri

## Sorun Giderme

### "Firebase: Error (auth/operation-not-allowed)"
- Firebase Console'da Authentication'ı aktif edin (gerekirse)

### "Missing or insufficient permissions"
- Firestore rules'u kontrol edin
- Rules'un doğru deploy edildiğinden emin olun

### "Firebase is not defined" 
- `.env.local` dosyasının doğru yapılandırıldığından emin olun
- Sunucuyu yeniden başlatın

## Destek

Sorularınız için: info@efesurucukursu.com
