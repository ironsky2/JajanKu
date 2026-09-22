import type { Metadata, Viewport } from "next";
import "./globals.css";
import { StoreInitializer } from "@/components/providers/StoreInitializer";

export const metadata: Metadata = {
  title: "JajanKuy - Dari Dapur Tetangga, Mudah & Cepat!",
  description: "Dapur Tetangga & Kreasi Rumahan Warga Sekitar. Pesan langsung via WhatsApp tanpa ribet.",
  manifest: "/manifest.json",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "JajanKuy",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#16a34a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="light">
      <body className="min-h-screen bg-surface text-on-surface antialiased">
        <StoreInitializer>
          {children}
        </StoreInitializer>
      </body>
    </html>
  );
}
