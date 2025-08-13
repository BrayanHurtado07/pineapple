import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";

const promos = [
    { id: "combo-20w", name: "Combo 20W + Cable 1m", price: 69.9, image: "/pack_pineapple_1.png" },
    { id: "combo-airpods", name: "AirPods 2 + MacPad", price: 539.0, image: "/pack_pineapple_2.png" },
    { id: "combo-watch", name: "Correa + Cubo 20W", price: 119.9, image: "/pack_pineapple_3.png" },
];

export default function PromotionsPage() {
    return (
        <main>
            <Navbar />
            <section className="mx-auto max-w-6xl px-4 py-10">
                <header className="mb-8 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">Promociones</h1>
                    <p className="mt-2 text-gray-600">Lanzamiento, temporada y packs especiales.</p>
                </header>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                    {promos.map((p) => (
                        <div key={p.id} className="relative">
                            <span className="absolute left-3 top-3 z-10 rounded-full bg-black px-2 py-0.5 text-xs text-white">
                                -10%
                            </span>
                            <ProductCard key={p.id} {...p} redirectToCart />
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
