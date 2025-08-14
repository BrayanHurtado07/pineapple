'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ShoppingCart, X, MessageCircle, ChevronDown } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { cx } from '@/lib/cx';
import { buildWhatsAppLink, buildWhatsAppText } from '@/lib/whatsapp';
import s from './ImageModal.module.css';

type Price = { price: number; regularPrice?: number };
type Props = {
  open: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
    image?: string;
    desc?: string;
    badge?: 'bestseller' | 'popular' | 'new' | 'sale' | null;
    features?: string[];
  } & Price;
};

function Accordion({
  title, children, defaultOpen = true,
}: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-t pt-4">
      <button
        className="flex w-full items-center justify-between text-left"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <span className="text-base font-semibold">{title}</span>
        <ChevronDown className={cx('h-5 w-5 transition-transform', open && 'rotate-180')} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-3 text-sm text-gray-700">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ImageModal({ open, onClose, product }: Props) {
  const [qty, setQty] = useState(1);
  const addItem = useCartStore(s => s.addItem);

  // Bloquear scroll del body mientras está abierto
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  // Cerrar con ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const handleAdd = () => {
    addItem({ id: product.id, name: product.name, price: product.price, image: product.image }, qty);
    onClose();
  };

  const handleBuyWhatsApp = () => {
    const text = buildWhatsAppText(
      [{ id: product.id, name: product.name, price: product.price, qty }],
      product.price * qty,
      'PEN'
    );
    const url = buildWhatsAppLink({ phone: '51973181599', text });
    window.open(url, '_blank');
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={s.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={s.modal}          // position: relative -> X queda dentro
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={product.name}
          >
            {/* X dentro del modal */}
            <button className={s.closeBtn} onClick={onClose} aria-label="Cerrar">
              <X className="h-5 w-5" />
            </button>

            {/* Columna Imagen */}
            <div className={s.imgCol}>
              <img
                src={product.image || '/placeholder.png'}
                alt={product.name}
                className={s.img}
                loading='lazy'
              />
              {product.badge && (
                <span
                  className={cx(
                    s.badge,
                    product.badge === 'bestseller' && 'bg-emerald-600',
                    product.badge === 'popular' && 'bg-indigo-600',
                    product.badge === 'new' && 'bg-rose-600',
                    product.badge === 'sale' && 'bg-orange-600',
                  )}
                >
                  {product.badge === 'bestseller' ? 'Más vendido'
                    : product.badge === 'popular' ? 'Popular'
                      : product.badge === 'new' ? 'Nuevo'
                        : 'Oferta'}
                </span>
              )}
            </div>

            {/* Columna Info */}
            <div className={s.infoCol}>
              {/* Contenido scrolleable */}
              <div className={s.contentScroll}>
                <h3 className="text-lg font-semibold">{product.name}</h3>

                {/* Precios */}
                <div className="mt-1 flex items-baseline gap-3">
                  <p className="text-xl font-semibold">S/ {product.price.toFixed(2)}</p>
                  {typeof product.regularPrice === 'number' && product.regularPrice > product.price && (
                    <span className="select-none text-sm text-gray-500 line-through">
                      S/ {product.regularPrice.toFixed(2)}
                    </span>
                  )}

                </div>

                {product.desc && (
                  <p className="mt-2 text-sm text-gray-700">{product.desc}</p>
                )}



                {/* Acordeones */}
                <div className="mt-4">
                  <Accordion title="Características Generales" defaultOpen>
                    {product.features?.length ? (
                      <ul className="ml-4 list-disc space-y-1">
                        {product.features.map((f, i) => <li key={i}>{f}</li>)}
                      </ul>
                    ) : (
                      <p>No especificadas.</p>
                    )}
                  </Accordion>

                  <Accordion title="¿Cuándo llegará mi pedido?" defaultOpen>
                    <div className="space-y-2">
                      <p>Para productos en venta regular:</p>
                      <ul className="ml-4 list-disc space-y-1">
                        <li>Lima Metropolitana: 2 – 5 días hábiles</li>
                        <li>Callao: 2 – 5 días hábiles</li>
                        <li>Provincias del Perú: 2 – 7 días hábiles</li>
                      </ul>
                      <p className="text-sm">
                        Para más detalles sobre la entrega, haz click <a href="/envios" className="underline">aquí</a>.
                      </p>
                    </div>
                  </Accordion>
                </div>

                {/* Cantidad */}
                <p className="mt-4 text-sm font-semibold text-gray-700">Cantidad</p>
                <div className="mt-1 inline-flex items-center gap-2">
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} className="h-10 w-10 rounded-full border" aria-label="Disminuir">
                    <Minus className="mx-auto h-4 w-4" />
                  </button>
                  <span className="w-8 text-center text-base">{qty}</span>
                  <button onClick={() => setQty(q => q + 1)} className="h-10 w-10 rounded-full border" aria-label="Aumentar">
                    <Plus className="mx-auto h-4 w-4" />
                  </button>
                </div>

                {/* Footer como parte del flujo (NO sticky en mobile) */}
                <div className="mx-auto flex max-w-[640px] flex-col gap-3">
                  <button
                    onClick={handleAdd}
                    className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm text-white hover:opacity-90"
                    style={{ backgroundColor: '#558992' }}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Añadir al carrito
                  </button>

                  <button
                    onClick={handleBuyWhatsApp}
                    className="inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm hover:bg-gray-50"
                    title="Comprar ahora por WhatsApp"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Comprar por WhatsApp
                  </button>
                </div>

              </div>
              {/* Fin contentScroll */}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
