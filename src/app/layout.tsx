import type { Metadata } from "next";
import type { Viewport } from "next";
import { FloatingWhatsApp } from "@/components/floating-whatsapp";
import { MobileCtaBar } from "@/components/mobile-cta-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Corporacion Ayllu Laguna Huaypo | Lotes y estilo de vida",
  description:
    "Web publica premium de Corporacion Ayllu Laguna Huaypo para lotes, ubicaciones y experiencias de visita alrededor de Huaypo.",
  keywords: [
    "Huaypo",
    "lotes en Huaypo",
    "terrenos en Huaypo",
    "Corporacion Ayllu Laguna Huaypo",
    "lotes Cusco",
  ],
  openGraph: {
    title: "Corporacion Ayllu Laguna Huaypo | Lotes y estilo de vida",
    description:
      "Lotes, naturaleza, club y una forma mas serena de habitar Huaypo.",
    locale: "es_PE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Corporacion Ayllu Laguna Huaypo",
    description:
      "Lotes, naturaleza y estilo de vida alrededor de Huaypo con una mirada aspiracional y serena.",
  },
  category: "real estate",
};

export const viewport: Viewport = {
  themeColor: "#171b14",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full bg-[#f5f0e8] pb-24 text-stone-900 md:pb-0">
        <SiteHeader />
        <div className="flex min-h-[calc(100vh-80px)] flex-col">{children}</div>
        <SiteFooter />
        <FloatingWhatsApp />
        <MobileCtaBar />
      </body>
    </html>
  );
}
