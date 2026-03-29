import { NextResponse } from "next/server";

const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
const AIRTABLE_BASE = process.env.AIRTABLE_BASE;
const AIRTABLE_LEADS_TABLE = process.env.AIRTABLE_LEADS_TABLE ?? "LEADS_WEB";

const FIELD_NAME = process.env.AIRTABLE_LEADS_FIELD_NAME ?? "Nombre";
const FIELD_PHONE = process.env.AIRTABLE_LEADS_FIELD_PHONE ?? "Telefono";
const FIELD_EMAIL = process.env.AIRTABLE_LEADS_FIELD_EMAIL ?? "Email";
const FIELD_MESSAGE = process.env.AIRTABLE_LEADS_FIELD_MESSAGE ?? "Mensaje";
const FIELD_LOT = process.env.AIRTABLE_LEADS_FIELD_LOT ?? "Lote";
const FIELD_PROJECT = process.env.AIRTABLE_LEADS_FIELD_PROJECT ?? "Proyecto";
const FIELD_SOURCE = process.env.AIRTABLE_LEADS_FIELD_SOURCE;

type LeadPayload = {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
  lotInterest?: string;
  project?: string;
  source?: string;
};

function sanitize(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  const payload = (await request.json()) as LeadPayload;

  const name = sanitize(payload.name);
  const phone = sanitize(payload.phone);
  const email = sanitize(payload.email);
  const message = sanitize(payload.message);
  const lotInterest = sanitize(payload.lotInterest);
  const project = sanitize(payload.project);
  const source = sanitize(payload.source);

  if (!name || !phone || !email || !message) {
    return NextResponse.json(
      {
        ok: false,
        message: "Faltan datos para enviar tu consulta.",
      },
      { status: 400 },
    );
  }

  if (!AIRTABLE_TOKEN || !AIRTABLE_BASE) {
    return NextResponse.json(
      {
        ok: false,
        fallbackToWhatsApp: true,
        message:
          "No pudimos registrar tu consulta automaticamente. Te atenderemos por WhatsApp para no perder tu interes.",
      },
      { status: 500 },
    );
  }

  const record: Record<string, string> = {
    [FIELD_NAME]: name,
    [FIELD_PHONE]: phone,
    [FIELD_EMAIL]: email,
    [FIELD_MESSAGE]: message,
    [FIELD_LOT]: lotInterest || "Consulta general",
    [FIELD_PROJECT]: project || "Corporacion Ayllu Laguna Huaypo",
  };

  if (FIELD_SOURCE && source) {
    record[FIELD_SOURCE] = source;
  }

  const response = await fetch(
    `https://api.airtable.com/v0/${AIRTABLE_BASE}/${encodeURIComponent(AIRTABLE_LEADS_TABLE)}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AIRTABLE_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        records: [{ fields: record }],
      }),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    let airtableMessage = "";

    try {
      const errorData = (await response.json()) as {
        error?: { message?: string };
      };
      airtableMessage = errorData.error?.message ?? "";
    } catch {
      airtableMessage = "";
    }

    return NextResponse.json(
      {
        ok: false,
        fallbackToWhatsApp: true,
        message:
          airtableMessage.includes("MODEL_NOT_FOUND")
            ? "La tabla LEADS_WEB aun no existe o no tiene permisos activos. Te abrimos WhatsApp para no perder tu consulta."
            : "No pudimos guardar tu consulta en Airtable. Te abrimos WhatsApp para atenderte ahora mismo.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    message: "Tu consulta fue enviada correctamente. Te contactaremos pronto.",
  });
}
