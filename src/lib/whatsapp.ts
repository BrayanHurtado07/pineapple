// lib/whatsapp.ts
import { CartItem } from '@/store/useCartStore';

export function buildWhatsAppMessage(
  items: CartItem[],
  subtotal: number,
  moneda = 'PEN'
) {
  const lines = items.map(
    (it) => `• ${it.name} x${it.qty} — S/ ${(it.price * it.qty).toFixed(2)}`
  );
  const body = [
    'Hola, quiero realizar el siguiente pedido:',
    ...lines,
    `\nSubtotal: S/ ${subtotal.toFixed(2)} ${moneda}`,
  ].join('\n');

  return encodeURIComponent(body);
}

export function buildWhatsAppLink({
  phone, // sin +, ej: "51XXXXXXXXX"
  text,
}: {
  phone: string;
  text: string;
}) {
  return `https://wa.me/${phone}?text=${text}`;
}
