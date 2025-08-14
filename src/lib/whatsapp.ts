// lib/whatsapp.ts
import { CartItem } from '@/store/useCartStore';

/**
 * Devuelve el TEXTO en claro (sin encode) con emojis literales.
 * Asegúrate de que este archivo esté guardado como UTF-8 (sin BOM).
 */
export function buildWhatsAppText(
  items: CartItem[],
  subtotal: number,
  moneda = 'PEN'
): string {
  const lines = items.map(
    (it) => `• ${it.name} (x${it.qty}) — S/ ${(it.price * it.qty).toFixed(2)}`
  );

  // Emojis como literales (👋🍍💰🙌), sin escapes
  const body = [
    '¡Hola! Te escribo desde la web de *Pineapple* para confirmar mi pedido:',
    '',
    ...lines,
    '',
    `*Subtotal:* S/ ${subtotal.toFixed(2)} ${moneda}`,
    '',
    'Por favor, indícame el costo total con envío y los pasos para finalizar mi compra. ¡Gracias! 🙌',
  ].join('\n');

  // Normaliza a NFC por si copiaste texto desde alguna fuente “rara”
  return body.normalize('NFC');
}

/**
 * Construye el enlace a WhatsApp codificando SOLO aquí.
 */
export function buildWhatsAppLink({
  phone, // sin +, ej: "51973181599"
  text,  // texto EN CLARO (salida de buildWhatsAppText)
}: {
  phone: string;
  text: string;
}) {
  const encoded = encodeURIComponent(text); // encode una sola vez
  return `https://wa.me/${phone}?text=${encoded}`;
}
