import Navbar from "@/components/Navbar";

const videos = [
  { id: "unboxing", title: "Unboxing Pack Pineapple", yt: "dQw4w9WgXcQ" },
  { id: "recepcion", title: "Cómo recibir tu pedido", yt: "ysz5S6PUM-U" },
  { id: "config", title: "Configurar tus accesorios", yt: "V-_O7nl0Ii0" },
];

function VideoCard({ title, yt }: { title: string; yt: string }) {
  return (
    <div className="rounded-2xl border">
      <div className="aspect-video w-full overflow-hidden rounded-t-2xl bg-black">
        <iframe
          className="h-full w-full"
          src={`https://www.youtube.com/embed/${yt}`}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div className="p-4">
        <h3 className="text-sm font-medium">{title}</h3>
        <p className="mt-1 text-xs text-gray-600">
          Tutorial oficial de Pineapple para una mejor experiencia.
        </p>
      </div>
    </div>
  );
}

export default function VideosPage() {
  return (
    <main>
      <Navbar />
      <section className="mx-auto max-w-6xl px-4 py-10">
        <header className="mb-8 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Videos</h1>
          <p className="mt-2 text-gray-600">
            Unboxing, recepción del paquete y configuración paso a paso.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {videos.map((v) => (
            <VideoCard key={v.id} title={v.title} yt={v.yt} />
          ))}
        </div>
      </section>
    </main>
  );
}
