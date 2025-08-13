'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useCartUI } from '@/store/useCartUI';   // <-- store UI del drawer
import CartDrawer from '@/components/CartDrawer'; // <-- el drawer

export default function Navbar() {
  const items = useCartStore((s) => s.items);
  const count = items.reduce((a, i) => a + i.qty, 0);
  const { openCart } = useCartUI();

  return (
    <header className="sticky top-0 z-50 border-b border-black bg-white">
      <div className="mx-auto max-w-7xl px-4 py-3">
        {/* ===== Mobile (md-) ===== */}
        <div className="flex items-center justify-between md:hidden">
          <span className="w-6" />
          <Link href="/" className="flex items-center gap-2">
            <img src="/icon-logo.png" alt="Pineapple" className="h-10 w-auto" />
            <span className="text-xl font-bold tracking-widest uppercase">Pineapple</span>
          </Link>

          {/* botón que abre el drawer */}
          <button
            onClick={openCart}
            className="relative flex items-center"
            aria-label="Abrir carrito"
          >
            <ShoppingCart className="h-6 w-6" />
            {count > 0 && (
              <motion.span
                key={count}
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 16 }}
                className="absolute -right-3 -top-2 rounded-full bg-black px-2 py-0.5 text-[10px] font-bold text-white"
              >
                {count}
              </motion.span>
            )}
          </button>
        </div>

        <nav className="mt-2 flex justify-center gap-8 text-sm font-semibold tracking-wide md:hidden">
          <Link href="/" className="hover:text-gray-500">Home</Link>
        </nav>

        {/* ===== Desktop / Tablet (md+) ===== */}
        <div className="mt-2 hidden grid-cols-3 items-center md:grid">
          {/* Izquierda */}
          <div className="justify-self-end">
            <nav className="flex items-center gap-8 text-sm font-semibold tracking-wide">
              <Link href="/" className="hover:text-gray-500">Home</Link>
            </nav>
          </div>

          {/* Centro: Logo */}
          <div className="justify-self-center">
            <Link href="/" className="flex items-center gap-2">
              <img src="/icon-logo.png" alt="Pineapple" className="h-14 w-auto" />
            </Link>
          </div>

          {/* Derecha: carrito */}
          <div className="flex items-center justify-self-start gap-6">
            <button
              onClick={openCart}
              className="relative ml-2 flex items-center hover:text-gray-500"
              aria-label="Abrir carrito"
            >
              <ShoppingCart className="h-6 w-6" />
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 16 }}
                  className="absolute -right-3 -top-2 rounded-full bg-black px-2 py-0.5 text-[10px] font-bold text-white"
                >
                  {count}
                </motion.span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Monta el drawer una sola vez */}
      <CartDrawer />
    </header>
  );
}
