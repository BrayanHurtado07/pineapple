import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";

const products = [
  { id: "pack-1", name: "AirPods Pro 2da Generación", price: 99,  regularPrice: 129, image: "/airpods_pro_2da_generacion.png", badge: 'bestseller' as const, desc: "Cancelación de ruido. Estuche MagSafe." },
  { id: "pack-2", name: "Pack Pineapple",              price: 145, regularPrice: 169, image: "/pack_pineapple.png",            badge: 'bestseller' as const,       desc: "Combo lanzamiento: cable + cubo + case." },
  { id: "pack-3", name: "Pack Charger",                price: 49,  regularPrice: 59,  image: "/pack_charger.png",                 desc: "Cubo 20W + Cable 1m USB-C." },
  { id: "pack-4", name: "Cubo Cargador 20W Tipo C",    price: 35,                          image: "/cargador_cubo_20w.png",                        desc: "Carga rápida y segura." },
  { id: "pack-5", name: "Cable Tipo C a Lightning",    price: 29,                          image: "/cable_c_a_lightning.png",                      desc: "1 metro. Alta durabilidad." },
  { id: "pack-6", name: "Case Silicona",               price: 19,  regularPrice: 25,  image: "/case_silicona.png",                     desc: "Ajuste perfecto y suave al tacto." },
] as const;

export default function HomePage() {
  return (
    <main>
      <Navbar />

      <section className="mx-auto max-w-7xl px-3 sm:px-6">
        {/* HERO */}
        <div
          className="relative overflow-hidden rounded-2xl border border-gray-100"
          style={{ backgroundImage: "url('/hero_pineapple.jpg')" }}
        >
          <div className="absolute inset-0 bg-white/70 sm:bg-white/60" />
          <div className="relative z-10 px-5 py-8 text-center sm:py-10">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Accesorios Apple</h1>
            <p className="mt-2 text-gray-700 sm:mt-3">Combos de lanzamiento, temporada y packs Pineapple.</p>
          </div>
        </div>

        {/* Grid */}
        <div className="mt-8 grid grid-cols-0 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} {...p} redirectToCart />
          ))}
        </div>
      </section>
    </main>
  );
}
