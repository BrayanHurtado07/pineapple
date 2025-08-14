'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Plus, Minus, Check } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useCartUI } from '@/store/useCartUI'; // <-- para abrir el drawer
import ImageModal from './ImageModal';
import { BadgePill } from './BadgePill';

type Badge = 'bestseller' | 'popular' | 'new' | 'sale' | null;

type Props = {
  id: string;
  name: string;
  price: number;
  regularPrice?: number;
  image?: string;
  badge?: Badge;
  redirectToCart?: boolean; // si true, abre el drawer
  desc?: string;
  features?: string[];
};

export default function ProductCard({
  id, name, price, regularPrice, image, badge = null, redirectToCart = false, desc, features,
}: Props) {
  const [qty, setQty] = useState(1);
  const addItem = useCartStore((s) => s.addItem);
  const { openCart } = useCartUI(); // <-- usamos el drawer
  const [added, setAdded] = useState(false);
  const [zoom, setZoom] = useState(false);

  const handleAdd = () => {
    // guardar también la imagen para las miniaturas
    addItem({ id, name, price, image }, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 900);
    // si se pide redireccionar, abrimos el drawer lateral
    if (redirectToCart) openCart();
  };

  // accesos rápidos +/-
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === '+' || e.key === '=') setQty((q) => q + 1);
      if (e.key === '-' && qty > 1) setQty((q) => q - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [qty]);

  return (
    <>
      <motion.div
        className="group relative rounded-2xl border border-gray-200 p-4 shadow-sm transition hover:shadow-md"
        whileHover={{ y: -2 }}
      >
        {/* Badge */}

        {badge && (
          <div className="absolute left-4 top-4 z-10">
            <BadgePill
              kind={badge}
              pulse
              tooltip={
                badge === 'bestseller' ? 'Producto más vendido'
                  : badge === 'popular' ? 'Muy solicitado'
                    : badge === 'new' ? 'Nuevo lanzamiento'
                      : 'Con descuento'
              }
            >
              {badge === 'bestseller' ? 'Más vendido'
                : badge === 'popular' ? 'Popular'
                  : badge === 'new' ? 'Nuevo'
                    : 'Oferta'}
            </BadgePill>
          </div>
        )}
        {/* Imagen (abre modal) */}
        <button
          className="aspect-square w-full overflow-hidden rounded-xl bg-gray-50"
          onClick={() => setZoom(true)}
          aria-label={`Ver ${name} en grande`}
        >
          <motion.img
            layoutId={`img-${id}`}
            src={image || '/placeholder.png'}
            alt={name}
            className="h-full w-full object-contain"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 220, damping: 18 }}
          />
        </button>

        {/* Info */}
        <div className="mt-3">
          <h3 className="text-base font-medium text-gray-900">{name}</h3>
          <div className="mt-1 flex items-baseline gap-3">
            <p className="text-lg font-semibold">S/ {price.toFixed(2)}</p>

            {/* Precio regular: tachado horizontal */}
            {typeof regularPrice === 'number' && regularPrice > price && (
              <span className="select-none text-sm text-gray-500 line-through decoration-gray-400 decoration-1">
                S/ {regularPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* Controles */}
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="inline-flex items-center gap-2 self-start">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="h-10 w-10 rounded-full border"
              aria-label="Disminuir cantidad"
            >
              <Minus className="mx-auto h-4 w-4" />
            </button>
            <span className="w-8 text-center text-base">{qty}</span>
            <button
              onClick={() => setQty((q) => q + 1)}
              className="h-10 w-10 rounded-full border"
              aria-label="Aumentar cantidad"
            >
              <Plus className="mx-auto h-4 w-4" />
            </button>
          </div>

          <motion.button
            onClick={handleAdd}
            className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-full border px-4 text-sm hover:bg-gray-50 sm:w-auto"
            whileTap={{ scale: 0.97 }}
          >
            {added ? <Check className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
            {added ? 'Añadido' : 'Añadir'}
          </motion.button>
        </div>

        {/* Toast */}
        <AnimatePresence>
          {added && (
            <motion.div
              className="pointer-events-none fixed bottom-6 right-6 rounded-full bg-black px-3 py-2 text-xs text-white shadow-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
            >
              Agregado al carrito
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Modal */}
      <ImageModal
        open={zoom}
        onClose={() => setZoom(false)}
        product={{ id, name, image, price, regularPrice, badge, desc, features }}
      />
    </>
  );
}