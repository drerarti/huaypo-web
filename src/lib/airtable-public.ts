import "server-only";
import { cache } from "react";
import { lots as fallbackLots, projectCatalog, type Lot } from "@/data/site";

type AirtableRecord = {
  id: string;
  fields: Record<string, unknown>;
};

const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
const AIRTABLE_BASE = process.env.AIRTABLE_BASE;
const AIRTABLE_UNITS_TABLE = process.env.AIRTABLE_UNITS_TABLE ?? "UNIDADES";
const AIRTABLE_PUBLIC_PROJECTS = (process.env.AIRTABLE_PUBLIC_PROJECTS ?? "ALP,VG,PR")
  .split(",")
  .map((item) => item.trim())
  .filter(Boolean);

function formatCurrency(value?: number) {
  if (!value || Number.isNaN(value)) {
    return "Consultar";
  }

  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeStatus(value: unknown) {
  const raw = typeof value === "string" ? value.trim().toLowerCase() : "";

  if (raw.includes("vend")) {
    return "Vendido";
  }

  if (raw.includes("reserv")) {
    return "Reservado";
  }

  return "Disponible";
}

function toNumber(value: unknown) {
  if (typeof value === "number") {
    return value;
  }

  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    return Number.isNaN(parsed) ? undefined : parsed;
  }

  return undefined;
}

function normalizeCopyArtifacts(value: string) {
  return value.replace(/ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â·|ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â·|Ãƒâ€šÃ‚Â·|Ã‚Â·/g, "/");
}

function normalizeLotText(lot: Lot): Lot {
  return {
    ...lot,
    name: normalizeCopyArtifacts(lot.name),
    heroLabel: normalizeCopyArtifacts(lot.heroLabel),
    features: lot.features.map(normalizeCopyArtifacts),
    idealFor: lot.idealFor.map(normalizeCopyArtifacts),
    access: lot.access.map(normalizeCopyArtifacts),
  };
}

async function fetchAllRecords(table: string) {
  if (!AIRTABLE_TOKEN || !AIRTABLE_BASE) {
    return [] as AirtableRecord[];
  }

  const records: AirtableRecord[] = [];
  let offset: string | undefined;

  do {
    const params = new URLSearchParams({ pageSize: "100" });

    if (offset) {
      params.set("offset", offset);
    }

    const response = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE}/${encodeURIComponent(table)}?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${AIRTABLE_TOKEN}`,
        },
        next: { revalidate: 300 },
      },
    );

    if (!response.ok) {
      throw new Error(`No se pudo consultar Airtable (${table}).`);
    }

    const data = (await response.json()) as {
      records: AirtableRecord[];
      offset?: string;
    };

    records.push(...data.records);
    offset = data.offset;
  } while (offset);

  return records;
}

function transformRecord(record: AirtableRecord): Lot | null {
  const projectCode =
    typeof record.fields.proyecto === "string" ? record.fields.proyecto.trim() : "";

  if (!AIRTABLE_PUBLIC_PROJECTS.includes(projectCode)) {
    return null;
  }

  const project = projectCatalog[projectCode as keyof typeof projectCatalog];

  if (!project) {
    return null;
  }

  const code =
    typeof record.fields.unidad_id === "string"
      ? record.fields.unidad_id
      : record.id;
  const phase =
    typeof record.fields.Fase === "string" ? record.fields.Fase : undefined;
  const block =
    typeof record.fields.Manzana === "string" ? record.fields.Manzana : undefined;
  const lotNumber =
    typeof record.fields.Lote === "number" || typeof record.fields.Lote === "string"
      ? String(record.fields.Lote)
      : undefined;
  const areaValue = toNumber(record.fields.area_m2);
  const priceValue = toNumber(record.fields.precio_lista);
  const status = normalizeStatus(record.fields.estado_unidad);
  const namePieces: string[] = [project.name];

  if (block) {
    namePieces.push(`Mza. ${block}`);
  }

  if (lotNumber) {
    namePieces.push(`Lote ${lotNumber}`);
  }

  return {
    id: record.id,
    code,
    slug: slugify(code),
    name: namePieces.join(" / "),
    area: areaValue ? `${areaValue} m2` : "Area por confirmar",
    price: formatCurrency(priceValue),
    stage: phase ? `Fase ${phase}` : "Fase por confirmar",
    status,
    summary: `${project.summary} ${status === "Disponible" ? "Disponible para una visita guiada y una lectura serena del lugar." : `Estado actual: ${status.toLowerCase()}.`}`,
    location: project.name,
    view: `Proyecto ${project.name}`,
    heroLabel: `${project.name} / ${phase ? `Fase ${phase}` : "Proyecto"} / ${status}`,
    intro: `Este lote forma parte de ${project.name} y abre una posibilidad concreta de vivir Huaypo con mas calma, horizonte y proyeccion.`,
    description: `${project.summary} Su ficha concentra lo esencial para imaginar ubicacion, escala y la forma en que este terreno podria convertirse en refugio, patrimonio o segunda vida.`,
    features: [
      `Codigo de inventario: ${code}.`,
      phase ? `Pertenece a la fase ${phase}.` : "Etapa por confirmar.",
      block && lotNumber
        ? `Referencia interna: manzana ${block}, lote ${lotNumber}.`
        : "Referencia interna disponible para seguimiento comercial.",
    ],
    idealFor: [
      "Quienes buscan una tierra con paisaje y proyeccion.",
      "Compradores que desean descanso, patrimonio o una segunda vida cerca de la naturaleza.",
      "Personas que prefieren decidir despues de recorrer el lugar con contexto claro.",
    ],
    access: [
      "Coordina una visita guiada por WhatsApp o dejando tus datos.",
      "Recibe acompanamiento comercial segun el lote que mas resuene contigo.",
      "Avanza con claridad sobre disponibilidad, entorno y siguientes pasos.",
    ],
    projectCode,
    projectName: project.name,
    phase,
    block,
    lotNumber,
    areaValue,
    priceValue,
    image: project.image,
    mapKey: project.mapKey,
    featured: status === "Disponible",
  } satisfies Lot;
}

export const getAirtableLots = cache(async (): Promise<Lot[]> => {
  try {
    const records = await fetchAllRecords(AIRTABLE_UNITS_TABLE);
    const transformed = records
      .map(transformRecord)
      .filter((lot): lot is Lot => Boolean(lot))
      .map(normalizeLotText);

    if (transformed.length === 0) {
      return fallbackLots;
    }

    return transformed.sort((a, b) => {
      const statusOrder: Record<string, number> = { Disponible: 0, Reservado: 1, Vendido: 2 };
      const statusDiff = statusOrder[a.status] - statusOrder[b.status];

      if (statusDiff !== 0) {
        return statusDiff;
      }

      return a.code.localeCompare(b.code);
    });
  } catch {
    return fallbackLots;
  }
});
