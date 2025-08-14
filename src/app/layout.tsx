// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import Footer from "@/components/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Pineapple",
  description: "Accesorios Apple minimalistas",
  icons: {
    icon: "/icon-logo.png",
  },
  openGraph: {
    title: "Pineapple",
    description: "Accesorios Apple minimalistas",
    url: "https://tu-dominio.com",
    siteName: "Pineapple",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Pineapple" }],
    type: "website",
  },
  manifest: "/site.webmanifest",        // opcional, si lo tienes
  themeColor: "#558992",
};

export const viewport: Viewport = {
  themeColor: "#558992",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="bg-background" suppressHydrationWarning>
      <body className={`${poppins.className} bg-background text-foreground antialiased`} suppressHydrationWarning>
        <div className="flex min-h-screen flex-col">
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
