'use client';

import { useCartStore } from '@/lib/store';
import Link from 'next/link';

export default function CartPage() {
  const { items, total, removeItem, updateQuantity, clearCart } = useCartStore();

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-8">🛒 Sepet</h1>
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-500 text-lg mb-4">Sepetiniz boş</p>
            <Link
              href="/"
              className="inline-block bg-accent text-white px-6 py-2 rounded-lg hover:bg-red-500 transition"
            >
              Alışverişe Devam Et
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">🛒 Sepet</h1>

        <div className="grid grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md p-4 flex gap-4">
                {item.image_url && (
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                )}
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">{item.name}</h3>
                  <p className="text-gray-600">{item.price} TL</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700 font-bold"
                >
                  Sil
                </button>
              </div>
            ))}
          </div>

          {/* Checkout Summary */}
          <div className="bg-white rounded-lg shadow-md p-6 h-fit sticky top-20">
            <h2 className="text-xl font-bold mb-4">Özet</h2>
            <div className="space-y-3 border-b pb-4 mb-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.name} x{item.quantity}</span>
                  <span className="font-semibold">{item.price * item.quantity} TL</span>
                </div>
              ))}
            </div>
            <div className="text-2xl font-bold mb-6">
              Toplam: <span className="text-accent">{total.toFixed(2)} TL</span>
            </div>
            <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-lg transition mb-2">
              Ödeme Yap
            </button>
            <button
              onClick={clearCart}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 rounded-lg transition"
            >
              Sepeti Temizle
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
