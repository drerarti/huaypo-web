import { type Lot } from "@/data/site";
import { getAirtableLots } from "@/lib/airtable";

export async function getAllLots() {
  return getAirtableLots();
}

export async function getFeaturedLots() {
  const lots = await getAirtableLots();
  return lots.filter((lot) => lot.featured).slice(0, 6);
}

export async function getLotBySlug(slug: string) {
  const lots = await getAirtableLots();
  return lots.find((lot) => lot.slug === slug);
}

export async function getRelatedLots(currentSlug: string, limit = 3) {
  const lots = await getAirtableLots();
  return lots.filter((lot) => lot.slug !== currentSlug).slice(0, limit);
}

export function getLotPath(lot: Lot) {
  return `/lotes/${lot.slug}`;
}
