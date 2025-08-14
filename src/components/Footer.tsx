'use client';

import Link from 'next/link';
import { FaInstagram, FaFacebook, FaTiktok, FaWhatsapp } from 'react-icons/fa';

const WHATSAPP = '51973181599'; // tu número (sin +)

export default function Footer() {
  return (
    <footer className="mt-16 bg-[#a3cace] text-white">
      {/* Contenido principal */}
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-6 px-4 py-3 text-center">

        {/* Col 1: Logo y marca */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-1">
            <img src="/icon-logo1.png" alt="Pineapple" className="h-20 w-auto" />
            <span className="text-xl font-extrabold tracking-widest">PINEAPPLE</span>
          </div>

          {/* redes sociales */}
          <div className="mt-4 flex items-center gap-4 text-3xl justify-center">
            <Link
              href="https://instagram.com/pineapple.go"
              aria-label="Instagram"
              className="hover:opacity-90"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </Link>

            <Link
              href="https://www.facebook.com/share/16efZJkJDm/?mibextid=wwXIfr"
              aria-label="Facebook"
              className="hover:opacity-90"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </Link>

            <Link
              href="https://www.tiktok.com/@pineapple.go?_t=ZS-8ypy1gkZmIa&_r=1"
              aria-label="TikTok"
              className="hover:opacity-90"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTiktok />
            </Link>

            <Link
              href={`https://wa.me/${WHATSAPP}`}
              aria-label="WhatsApp"
              className="hover:opacity-90"
              target="_blank"
            >
              <FaWhatsapp />
            </Link>
          </div>
        </div>

        {/* Col 2: Menú */}
        {/* <div className="md:col-span-3">
          <h4 className="mb-3 text-lg font-extrabold">MENÚ</h4>
          <ul className="space-y-2 text-white/90">
            <li><Link href="/" className="hover:opacity-80">Home</Link></li>
            <li><Link href="/promotions" className="hover:opacity-80">Promos</Link></li>
            <li><Link href="/videos" className="hover:opacity-80">Videos</Link></li>
            <li><Link href="/about" className="hover:opacity-80">Sobre Pineapple</Link></li>
          </ul>
        </div> */}

        {/* Col 3: Información */}
        {/* <div className="md:col-span-3">
          <h4 className="mb-3 text-lg font-extrabold">INFORMACIÓN</h4>
          <ul className="space-y-2 text-white/90">
            <li><Link href="/contacto" className="hover:opacity-80">Contacto</Link></li>
            <li><Link href="/preguntas" className="hover:opacity-80">Preguntas frecuentes</Link></li>
            <li><Link href="/terminos" className="hover:opacity-80">Términos y Condiciones</Link></li>
            <li><Link href="/privacidad" className="hover:opacity-80">Política de Privacidad</Link></li>
            <li><Link href="/devoluciones" className="hover:opacity-80">Cambios y Devoluciones</Link></li>
            <li><Link href="/libro-reclamaciones" className="hover:opacity-80">Libro de Reclamaciones</Link></li>
          </ul>
        </div> */}

        {/* Col 4: Newsletter */}
        {/* <div className="md:col-span-3">
          <h4 className="mb-3 text-lg font-extrabold">¡NOTICIAS!</h4>
          <p className="mb-3 text-sm text-white/90">
            Suscríbete para enterarte de lanzamientos, descuentos y novedades.
          </p>

          <form
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              // TODO: integra tu servicio de newsletter aquí
              alert('¡Gracias por suscribirte! (conecta tu backend/servicio)');
            }}
          >
            <input
              type="email"
              placeholder="Tu correo electrónico"
              required
              className="w-full rounded-lg border-0 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none"
            />
            <label className="flex items-start gap-2 text-xs text-white/90">
              <input type="checkbox" required className="mt-1 h-4 w-4 rounded border-white/40 bg-transparent" />
              <span>
                Acepto la <Link href="/suscripcion" className="underline">política de suscripción</Link>.
              </span>
            </label>
            <button
              type="submit"
              className="w-full rounded-lg border border-white/25 bg-white/10 px-4 py-3 text-sm font-semibold backdrop-blur hover:bg-white/20"
            >
              SUSCRIBIRME
            </button>
          </form>
        </div> */}
      </div>

      {/* Línea inferior */}
      <div className="border-t border-white/20">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-3 px-4 py-4 text-xs text-white/80 md:flex-row md:px-6">
          <p>2025 — Pineapple. Todos los derechos reservados.</p>
          {/* <p>
            RUC 20XXXXXXXX — Desarrollado por <a href="https://tusitio.dev" className="underline" target="_blank">Tu Estudio</a>
          </p> */}
        </div>
      </div>
    </footer>
  );
}
