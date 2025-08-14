import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";

type Product = {
  id: string;
  name: string;
  price: number;
  regularPrice?: number;
  image?: string;
  badge?: 'bestseller' | 'popular' | 'new' | 'sale' | null;
  desc?: string;
  features?: string[]; // 👈 aquí
};

const products: Product[] = [
  {
    id: "pack-1",
    name: "AirPods Pro 2da Generación",
    price: 99,
    regularPrice: 129,
    image: "/airpods_pro_2da_generacion.png",
    badge: "popular",
    desc: "Cancelación de ruido. Estuche MagSafe.",
    features: [
      "Cancelación activa de ruido",
      "Control táctil",
      "Hasta 24 h con estuche",
      "Incluye estuche MagSafe",
      "Case de silicona GRATIS",
      "Envío gratis (stock limitado)"
    ],
  },
  {
    id: "pack-2",
    name: "Pack Pineapple",
    price: 145,
    regularPrice: 169,
    image: "/pack_pineapple.png",
    badge: "bestseller",
    desc: "Combo lanzamiento: cable + cubo + case.",
    features: [
      "AirPods Pro 2da Gen",
      "Cable USB-C a Lightning",
      "Cubo cargador 20W tipo C",
      "Case de silicona GRATIS",
      "Envío gratis (stock limitado)"
    ],
  },
  {
    id: "pack-3",
    name: "Pack Charger",
    price: 49,
    regularPrice: 59,
    image: "/pack_charger.png",
    badge: "new",
    desc: "Cubo 20W + Cable 1m USB-C.",
    features: [
      "Cubo cargador 20W tipo C",
      "Cable USB-C a Lightning (1 m)",
      "Compatible con iPhone y iPad",
      "Carga rápida y segura"
    ],
  },
  {
    id: "pack-4",
    name: "Cubo Cargador 20W Tipo C",
    price: 35,
    image: "/cargador_cubo_20w.png",
    badge: "new",
    desc: "Carga rápida y segura.",
    features: [
      "Potencia de salida: 20 W",
      "Puerto USB-C",
      "Protección contra sobrecarga",
      "Compacto y ligero"
    ],
  },
  {
    id: "pack-5",
    name: "Cable Tipo C a Lightning",
    price: 29,
    image: "/cable_c_a_lightning.png",
    badge: "new",
    desc: "1 metro. Alta durabilidad.",
    features: [
      "USB-C a Lightning",
      "Longitud: 1 m",
      "Carga rápida y transferencia de datos",
      "Reforzado para mayor durabilidad"
    ],
  },
  {
    id: "pack-6",
    name: "Case Silicona",
    price: 19,
    regularPrice: 25,
    image: "/case_silicona.png",
    badge: "new",
    desc: "Ajuste perfecto y suave al tacto.",
    features: [
      "Silicona suave premium",
      "Ajuste preciso para AirPods",
      "Protege de golpes y rayaduras",
      "Colores disponibles (consultar stock)"
    ],
  },
];

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
        <div className="mt-8 grid grid-cols-1 gap-6 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} {...p} redirectToCart />
          ))}
        </div>
      </section>
    </main>
  );
}
