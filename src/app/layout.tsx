import type { Metadata, Viewport } from "next";
import "./globals.css";
import { StoreInitializer } from "@/components/providers/StoreInitializer";

export const metadata: Metadata = {
  title: "JajanKuy - Marketplace Mini Perumahan",
  description: "Jajan dari Tetangga, Mudah & Cepat! Pasar Ibu Perumahan Griya Indah Asri",
  manifest: "/manifest.json",
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
