'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Minus, Plus, Trash2, X, MessageCircle } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useCartUI } from '@/store/useCartUI';
import { buildWhatsAppLink, buildWhatsAppText } from '@/lib/whatsapp';

const PHONE = '51973181599';

export default function CartDrawer() {
  const { cartOpen, closeCart } = useCartUI();
  const { items, updateQty, removeItem, clear } = useCartStore();

  const [accepted, setAccepted] = useState(false);
  const [shake, setShake] = useState(false);
  const termsRef = useRef<HTMLLabelElement>(null);

  useEffect(() => {
    if (!cartOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeCart();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [cartOpen, closeCart]);

  const subtotal = useMemo(
    () => items.reduce((a, i) => a + i.price * i.qty, 0),
    [items]
  );

  const checkoutWhatsApp = () => {
    const text = buildWhatsAppText(
      items.map(i => ({ id: i.id, name: i.name, price: i.price, qty: i.qty })),
      subtotal,
      'PEN'
    );
    const url = buildWhatsAppLink({ phone: PHONE, text });
    window.open(url, '_blank');
  };

  const canCheckout = accepted && items.length > 0;

  const handleCheckoutClick = () => {
    if (!canCheckout) {
      // UX: vibrar, resaltar y hacer scroll al bloque de términos
      setShake(true);
      termsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // quitar shake al terminar la animación (fallback por si no llega el callback)
      setTimeout(() => setShake(false), 600);
      return;
    }
    checkoutWhatsApp();
  };

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          {/* overlay */}
          <motion.div
            className="fixed inset-0 z-[90] bg-black/50"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={closeCart}
          />

          {/* drawer */}
          <motion.aside
            className="fixed right-0 top-0 z-[100] flex h-dvh w-[92vw] max-w-[420px] flex-col overflow-hidden bg-white shadow-2xl"
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            aria-label="Carrito de compras"
          >
            {/* header */}
            <div className="flex items-center justify-between border-b px-4 py-3">
              <h2 className="text-lg font-semibold">Tu carrito</h2>
              <button onClick={closeCart} className="rounded-full p-2 hover:bg-gray-100" aria-label="Cerrar">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* items (scroll) */}
            <div className="flex-1 overflow-y-auto px-4 py-3">
              {items.length === 0 ? (
                <p className="py-8 text-center text-sm text-gray-500">Aún no agregaste productos.</p>
              ) : (
                <ul className="space-y-3">
                  {items.map((i) => (
                    <li key={i.id} className="flex gap-3 rounded-xl border p-3">
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-50">
                        <img src={i.image || '/placeholder.png'} alt={i.name} className="h-full w-full object-contain" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{i.name}</p>
                        <p className="mt-0.5 text-sm text-gray-600">S/ {(i.price * i.qty).toFixed(2)}</p>

                        {/* qty controls */}
                        <div className="mt-2 inline-flex items-center gap-2">
                          <button
                            className="h-8 w-8 rounded-full border hover:bg-gray-50"
                            onClick={() => updateQty(i.id, Math.max(1, i.qty - 1))}
                            aria-label="Disminuir"
                          >
                            <Minus className="mx-auto h-4 w-4" />
                          </button>
                          <span className="w-6 text-center text-sm">{i.qty}</span>
                          <button
                            className="h-8 w-8 rounded-full border hover:bg-gray-50"
                            onClick={() => updateQty(i.id, i.qty + 1)}
                            aria-label="Aumentar"
                          >
                            <Plus className="mx-auto h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {/* remove */}
                      <button
                        className="self-start rounded-full p-2 text-gray-500 hover:bg-gray-100"
                        onClick={() => removeItem(i.id)}
                        aria-label="Eliminar"
                        title="Eliminar"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* footer */}
            <div className="border-t p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm text-gray-600">Subtotal</span>
                <span className="text-base font-semibold">S/ {subtotal.toFixed(2)}</span>
              </div>
              <p className="text-xs text-gray-500">
                * Envíos: Lima 2–5 días hábiles, Callao 2–5, Provincias 2–7.
              </p>

              {/* términos (shake + highlight) */}
              <motion.label
                ref={termsRef}
                tabIndex={-1}
                className={`mt-3 flex cursor-pointer items-start gap-2 rounded-md p-2 text-xs text-gray-600 transition
    ${!accepted && shake ? 'ring-2 ring-primary/50 bg-primary/10' : ''}
  `}
                animate={shake ? { x: [0, -8, 8, -6, 6, -3, 3, 0] } : { x: 0 }}
                transition={{ duration: 0.48 }}
                onAnimationComplete={() => setShake(false)}
              >

                <input
                  type="checkbox"
                  className="mt-0.5 h-4 w-4 rounded border-gray-300"
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                />
                <span>
                  Acepto los{' '}
                  <a href="/terminos" target="_blank" rel="noopener noreferrer" className="underline">
                    Términos y Condiciones
                  </a>{' '}
                  y la{' '}
                  <a href="/privacidad" target="_blank" rel="noopener noreferrer" className="underline">
                    Política de Privacidad
                  </a>.
                </span>
              </motion.label>

              {/* <div className="mt-1 min-h-[18px]" aria-live="polite">
                {!accepted && shake && (
                  <span className="text-xs text-black">Para continuar, acepta los términos y condiciones.</span>
                )}
              </div> */}

              {/* acciones */}
              <div className="mt-3 grid gap-2">
                <button
                  onClick={handleCheckoutClick}
                  aria-disabled={!canCheckout}
                  className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm text-white transition
                    ${canCheckout ? '' : 'opacity-50 cursor-not-allowed'}
                  `}
                  style={{ backgroundColor: '#558992' }}
                  title={!canCheckout ? 'Acepta los términos para continuar' : 'Continuar por WhatsApp'}
                >
                  <MessageCircle className="h-4 w-4" />
                  Finalizar por WhatsApp
                </button>

                <button
                  onClick={clear}
                  disabled={items.length === 0}
                  className="rounded-full border px-5 py-3 text-sm hover:bg-gray-50 disabled:opacity-50"
                >
                  Vaciar carrito
                </button>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
