# Frontend - Food Order Platform

React ile yapılan modern yemek sipariş platformu frontendu.

## 🛠️ Kurulum

### Gereksinimler
- Node.js (v14+)
- npm

### Adımlar

1. **Bağımlılıkları yükle**
```bash
npm install
```

2. **Geliştirme sunucusunu başlat**
```bash
npm start
```

Uygulama `http://localhost:3000` adresinde açılacak.

## 📁 Proje Yapısı

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/        # React bileşenleri
│   ├── pages/            # Sayfa bileşenleri
│   ├── context/          # Context API (Auth, Cart)
│   ├── services/         # API servisleri
│   ├── App.js
│   ├── index.js
│   └── index.css
└── package.json
```

## 🎨 Sayfalar

- **HomePage** - Ürünleri listele, kategorilere göre filtrele, ara
- **LoginPage** - Kullanıcı girişi
- **RegisterPage** - Yeni hesap oluşturma
- **CartPage** - Sepet (Planlanmış)
- **OrdersPage** - Sipariş geçmişi (Planlanmış)
- **ProfilePage** - Kullanıcı profili (Planlanmış)
- **CheckoutPage** - Ödeme (Planlanmış)

## 🔧 Kullanılan Teknolojiler

- **React** - UI framework
- **React Router** - Sayfa yönlendirmesi
- **Axios** - API istekleri
- **Context API** - Durum yönetimi

## 📝 Geliştirme

Production build oluştur:
```bash
npm run build
```

## 🐛 Troubleshooting

**API bağlantısı hatası:**
- Backend sunucunun çalıştığını doğrulayın
- package.json dosyasında proxy ayarını kontrol edin
