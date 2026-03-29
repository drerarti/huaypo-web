import type { Metadata } from "next";
import { MobileCtaBar } from "@/components/mobile-cta-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Corporacion Ayllu Laguna Huaypo | Lotes y estilo de vida",
  description:
    "Web publica premium de Corporacion Ayllu Laguna Huaypo para lotes, ubicaciones y experiencias de visita alrededor de Huaypo.",
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
        <MobileCtaBar />
      </body>
    </html>
  );
}
