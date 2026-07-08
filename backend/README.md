# Backend - Food Order Platform

Node.js + Express backend API sunucusu MySQL veritabanı ile.

## 🛠️ Kurulum

### Gereksinimler
- Node.js (v14+)
- MySQL (v5.7+)
- npm

### Adımlar

1. **Bağımlılıkları yükle**
```bash
npm install
```

2. **.env dosyası oluştur**
```bash
cp .env.example .env
```

3. **.env dosyasını düzenle**
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=food_order_db
PORT=5000
JWT_SECRET=your_jwt_secret_key
```

4. **Veritabanını oluştur**
```bash
mysql -u root -p < ../database/schema.sql
```

5. **Sunucuyu başlat**
```bash
npm start
```

Sunucu `http://localhost:5000` adresinde çalışacak.

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Kullanıcı kaydı
- `POST /api/auth/login` - Giriş
- `GET /api/auth/verify` - Token doğrulama

### Categories
- `GET /api/categories` - Tüm kategorileri getir
- `GET /api/categories/:id` - Kategori detayı
- `POST /api/categories` - Kategori oluştur (Admin)

### Products
- `GET /api/products` - Tüm ürünleri getir (filtreleme ve arama)
- `GET /api/products/:id` - Ürün detayı ve yorumlar
- `POST /api/products` - Ürün oluştur (Admin)
- `PUT /api/products/:id` - Ürün güncelle (Admin)

### Cart
- `GET /api/cart` - Sepeti getir
- `POST /api/cart/add` - Sepete ürün ekle
- `PUT /api/cart/update/:itemId` - Sepet ürünü güncelle
- `DELETE /api/cart/remove/:itemId` - Sepetten kaldır
- `DELETE /api/cart/clear` - Sepeti temizle

### Orders
- `GET /api/orders` - Kullanıcı siparişleri
- `GET /api/orders/:orderId` - Sipariş detayı
- `POST /api/orders` - Sipariş oluştur
- `PUT /api/orders/:orderId/status` - Sipariş durumunu güncelle (Admin)

### Reviews
- `GET /api/reviews/product/:productId` - Ürün yorumları
- `POST /api/reviews` - Yorum ve puan ekle
- `DELETE /api/reviews/:reviewId` - Yorum sil

### Locations
- `GET /api/locations/cities` - Tüm şehirler
- `GET /api/locations/districts/:cityId` - Şehir ilçeleri
- `GET /api/locations/neighborhoods/:districtId` - İlçe semtleri

### Users
- `GET /api/users/profile` - Kullanıcı profili
- `GET /api/users/addresses` - Kullanıcı adresleri
- `POST /api/users/addresses` - Adres ekle
- `PUT /api/users/addresses/:addressId` - Adres güncelle
- `DELETE /api/users/addresses/:addressId` - Adres sil

## 🔐 Authentication

JWT token kullanarak autentikasyon yapılır. Login işleminden sonra token'ı alıp, Authorization header'ında gönderin:

```
Authorization: Bearer <token>
```

## 📝 Geliştirme

Development modu için:
```bash
npm run dev
```

Bu nodemon ile sunucuyu otomatik yeniden başlatır.

## 🐛 Troubleshooting

**Veritabanı bağlantısı hatası:**
- MySQL servisinin çalıştığını kontrol edin
- .env dosyasındaki veritabanı bilgilerini doğrulayın

**Port zaten kullanımda:**
- .env dosyasında PORT değerini değiştirebilirsiniz
