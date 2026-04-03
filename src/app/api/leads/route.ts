import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 6;
const MAX_LENGTHS = {
  name: 80,
  phone: 30,
  email: 120,
  interest: 140,
  project: 120,
  source: 80,
  message: 2000,
};

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

type LeadPayload = {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
  lotInterest?: string;
  project?: string;
  source?: string;
  website?: string;
};

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store, max-age=0",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}

function sanitizeSingleLine(value: unknown, maxLength: number) {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .replace(/[\u0000-\u001F\u007F<>]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function sanitizeMultiline(value: unknown, maxLength: number) {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F<>]/g, " ")
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, maxLength);
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhone(value: string) {
  return /^[0-9+\-() ]{7,30}$/.test(value);
}

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const netlifyIp = request.headers.get("x-nf-client-connection-ip");
  const realIp = request.headers.get("x-real-ip");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return netlifyIp || realIp || "unknown";
}

function isAllowedOrigin(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");

  if (!origin || !host) {
    return true;
  }

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

function cleanupRateLimit(now: number) {
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetAt <= now) {
      rateLimitStore.delete(key);
    }
  }
}

function checkRateLimit(ip: string) {
  const now = Date.now();
  cleanupRateLimit(now);

  const current = rateLimitStore.get(ip);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(ip, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return { allowed: true };
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, retryAfterMs: current.resetAt - now };
  }

  current.count += 1;
  rateLimitStore.set(ip, current);
  return { allowed: true };
}

export async function POST(request: Request) {
  if (!isAllowedOrigin(request)) {
    return jsonResponse(
      {
        ok: false,
        message: "No pudimos validar el origen de la solicitud.",
      },
      403,
    );
  }

  const rateLimit = checkRateLimit(getClientIp(request));

  if (!rateLimit.allowed) {
    return jsonResponse(
      {
        ok: false,
        message: "Recibimos demasiadas solicitudes seguidas. Intenta nuevamente en unos minutos.",
      },
      429,
    );
  }

  let payload: LeadPayload;

  try {
    payload = (await request.json()) as LeadPayload;
  } catch {
    return jsonResponse(
      {
        ok: false,
        message: "No pudimos procesar los datos enviados.",
      },
      400,
    );
  }

  const honeypot = sanitizeSingleLine(payload.website, 120);

  if (honeypot) {
    return jsonResponse({
      ok: true,
      message: "Tu consulta fue enviada correctamente. Te contactaremos pronto.",
    });
  }

  const name = sanitizeSingleLine(payload.name, MAX_LENGTHS.name);
  const phone = sanitizeSingleLine(payload.phone, MAX_LENGTHS.phone);
  const email = sanitizeSingleLine(payload.email, MAX_LENGTHS.email);
  const message = sanitizeMultiline(payload.message, MAX_LENGTHS.message);
  const lotInterest = sanitizeSingleLine(payload.lotInterest, MAX_LENGTHS.interest);
  const project = sanitizeSingleLine(payload.project, MAX_LENGTHS.project);
  const source = sanitizeSingleLine(payload.source, MAX_LENGTHS.source);

  if (!name || !phone || !email || !message) {
    return jsonResponse(
      {
        ok: false,
        message: "Faltan datos para enviar tu consulta.",
      },
      400,
    );
  }

  if (!isValidEmail(email)) {
    return jsonResponse(
      {
        ok: false,
        message: "Ingresa un correo valido.",
      },
      400,
    );
  }

  if (!isValidPhone(phone)) {
    return jsonResponse(
      {
        ok: false,
        message: "Ingresa un telefono valido.",
      },
      400,
    );
  }

  if (!AIRTABLE_TOKEN || !AIRTABLE_BASE) {
    return jsonResponse(
      {
        ok: false,
        fallbackToWhatsApp: true,
        message:
          "No pudimos registrar tu consulta automaticamente. Te atenderemos por WhatsApp para no perder tu interes.",
      },
      503,
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

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  let response: Response;

  try {
    response = await fetch(
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
        signal: controller.signal,
      },
    );
  } catch {
    clearTimeout(timeout);
    return jsonResponse(
      {
        ok: false,
        fallbackToWhatsApp: true,
        message:
          "No pudimos guardar tu consulta en este momento. Te abrimos WhatsApp para atenderte ahora mismo.",
      },
      502,
    );
  }

  clearTimeout(timeout);

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

    return jsonResponse(
      {
        ok: false,
        fallbackToWhatsApp: true,
        message:
          airtableMessage.includes("MODEL_NOT_FOUND")
            ? "La tabla LEADS_WEB aun no existe o no tiene permisos activos. Te abrimos WhatsApp para no perder tu consulta."
            : "No pudimos guardar tu consulta en Airtable. Te abrimos WhatsApp para atenderte ahora mismo.",
      },
      502,
    );
  }

  return jsonResponse({
    ok: true,
    message: "Tu consulta fue enviada correctamente. Te contactaremos pronto.",
  });
}
