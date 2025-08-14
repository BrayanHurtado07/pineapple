// app/cart/page.tsx
'use client';

import Navbar from '@/components/Navbar';
import { useCartStore } from '@/store/useCartStore';
import { buildWhatsAppLink, buildWhatsAppText } from '@/lib/whatsapp';

export default function CartPage() {
  const { items, updateQty, removeItem, subtotal, clear } = useCartStore();

  const total = subtotal();
  const phone = '51973181599'; // <-- REEMPLAZA con tu WhatsApp

  const handleCheckout = () => {
    if (items.length === 0) return;
    const text = buildWhatsAppText(items, total, 'PEN');
    const url = buildWhatsAppLink({ phone, text });
    window.open(url, '_blank');
  };

  return (
    <main>
      <Navbar />
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="mb-6 text-2xl font-semibold tracking-tight">Tu carrito</h1>

        {items.length === 0 ? (
          <p className="text-gray-600">Aún no has agregado productos.</p>
        ) : (
          <>
            <ul className="divide-y rounded-2xl border">
              {items.map((it) => (
                <li key={it.id} className="flex flex-wrap items-center justify-center gap-4 p-4">
                  <div>
                    <p className="text-sm text-gray-800">{it.name}</p>
                    <p className="text-xs text-gray-500">S/ {it.price.toFixed(2)} c/u</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min={1}
                      value={it.qty}
                      onChange={(e) => updateQty(it.id, Math.max(1, Number(e.target.value)))}
                      className="w-16 rounded-md border px-2 py-1 text-sm"
                    />
                    <button
                      onClick={() => removeItem(it.id)}
                      className="rounded-full border px-3 py-1 text-sm hover:bg-gray-50"
                    >
                      Quitar
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-center justify-between">
              <p className="text-lg">
                Subtotal: <span className="font-medium">S/ {total.toFixed(2)}</span>
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={clear}
                  className="rounded-full border px-4 py-2 text-sm hover:bg-gray-50"
                >
                  Vaciar
                </button>
                <button
                  onClick={handleCheckout}
                  className="rounded-full bg-black px-5 py-2 text-sm text-white hover:opacity-90"
                >
                  Finalizar por WhatsApp
                </button>
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
