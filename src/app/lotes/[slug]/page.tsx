import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LotDetail } from "@/components/lot-detail";
import { siteSettings } from "@/data/site";
import { getLotBySlug, getRelatedLots } from "@/lib/lots";

type LotPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const revalidate = 300;

export async function generateMetadata({
  params,
}: LotPageProps): Promise<Metadata> {
  const { slug } = await params;
  const lot = await getLotBySlug(slug);

  if (!lot) {
    return {
      title: `${siteSettings.brand} | Lote no encontrado`,
    };
  }

  return {
    title: `${lot.name} | ${siteSettings.brand}`,
    description: `${lot.summary} ${lot.area}. ${lot.price}.`,
  };
}

export default async function LotPage({ params }: LotPageProps) {
  const { slug } = await params;
  const lot = await getLotBySlug(slug);

  if (!lot) {
    notFound();
  }

  return <LotDetail lot={lot} relatedLots={await getRelatedLots(slug)} />;
}
