export const metadata = {
    title: 'Términos y Condiciones | Pineapple',
    description: 'Términos y Condiciones de compra de Pineapple.',
  };
  
  export default function TerminosPage() {
    return (
      <main className="mx-auto max-w-3xl px-4 py-12">
        {/* Encabezado */}
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-extrabold tracking-wide text-[#558992]">
            Términos y Condiciones
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Última actualización: 05/07/2025
          </p>
        </header>
  
        {/* Contenedor principal */}
        <div className="rounded-2xl bg-white shadow-lg ring-1 ring-gray-100 p-8 space-y-8">
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              1. Identificación
            </h2>
            <p className="text-gray-700">
              Pineapple (en adelante, “la Tienda”) ofrece accesorios y packs para
              productos Apple. Si tienes dudas, escríbenos por{' '}
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
  
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              2. Compras y pagos
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Los precios están expresados en Soles (PEN) e incluyen IGV cuando aplique.</li>
              <li>Los medios de pago se coordinan por WhatsApp (transferencia, billeteras, etc.).</li>
              <li>Una orden se considera confirmada al recibir comprobante de pago.</li>
            </ul>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              3. Envíos
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Lima Metropolitana y Callao: 2–5 días hábiles.</li>
              <li>Provincias del Perú: 2–7 días hábiles.</li>
              <li>El costo/condiciones pueden variar según zona y promociones vigentes.</li>
            </ul>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              4. Cambios y devoluciones
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Se aceptan cambios por fallas de fábrica dentro de 7 días de recibido.</li>
              <li>El producto debe estar en perfecto estado, con empaques y accesorios.</li>
              <li>No se aceptan cambios por desgaste normal o mal uso.</li>
            </ul>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              5. Garantía
            </h2>
            <p className="text-gray-700">
              La garantía aplica ante defectos de fabricación de acuerdo al fabricante y
              no cubre daños por uso indebido, golpes o humedad.
            </p>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              6. Propiedad intelectual
            </h2>
            <p className="text-gray-700">
              Marcas, nombres, logos e imágenes son de sus respectivos titulares. Pineapple
              no es una marca de Apple.
            </p>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              7. Contacto
            </h2>
            <p className="text-gray-700">
              Para consultas o reclamos escríbenos a{' '}
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
  