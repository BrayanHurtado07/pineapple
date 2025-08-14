export const metadata = {
    title: 'Política de Privacidad | Pineapple',
    description: 'Política de tratamiento de datos personales de Pineapple.',
  };
  
  export default function PrivacidadPage() {
    return (
      <main className="mx-auto max-w-3xl px-4 py-12">
        {/* Encabezado con estilo Pineapple */}
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-extrabold tracking-wide text-[#558992]">
            Política de Privacidad
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Última actualización: 13/08/2025
          </p>
        </header>
  
        {/* Contenedor con fondo suave y sombra */}
        <div className="rounded-2xl bg-white shadow-lg ring-1 ring-gray-100 p-8 space-y-8">
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              1. Datos que recopilamos
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Nombre, teléfono, correo y dirección de entrega (cuando se requiera).</li>
              <li>Datos de navegación básicos (cookies necesarias para el funcionamiento del sitio).</li>
            </ul>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              2. Uso de la información
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Gestionar pedidos, envíos y atención al cliente.</li>
              <li>Comunicar novedades y promociones (si lo autorizas).</li>
            </ul>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              3. Conservación y seguridad
            </h2>
            <p className="text-gray-700">
              Conservamos los datos el tiempo necesario para brindarte el servicio.
              Aplicamos medidas razonables de seguridad para proteger tu información.
            </p>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              4. Derechos del titular
            </h2>
            <p className="text-gray-700">
              Puedes solicitar acceso, rectificación o eliminación de tus datos
              escribiéndonos por{' '}
              <a
                href="https://wa.me/51973181599"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#558992] hover:underline"
              >
                WhatsApp
              </a>.
            </p>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              5. Terceros
            </h2>
            <p className="text-gray-700">
              Podemos usar proveedores (por ejemplo, mensajería) para completar tu pedido.
              Solo comparten los datos mínimos necesarios.
            </p>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              6. Contacto
            </h2>
            <p className="text-gray-700">
            Dudas sobre privacidad: contáctanos en{' '}
              <a
                href="https://wa.me/51973181599"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#558992] hover:underline"
              >
                WhatsApp (+51 973 181 599)
              </a>.
            </p>
          </section>
        </div>
      </main>
    );
  }
  