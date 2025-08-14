import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import Footer from "@/components/Footer"; // 👈 importación

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Pineapple",
  description: "Accesorios Apple minimalistas",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="bg-background" suppressHydrationWarning>
      <body
        className={`${poppins.className} bg-background text-foreground antialiased`}
        suppressHydrationWarning
      >
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow">{children}</main>
          <Footer /> {/* <- aquí lo reactivas */}
        </div>
      </body>
    </html>
  );
}

