"use client";

import { type FormEvent, useMemo, useState } from "react";
import { Reveal } from "@/components/reveal";
import { siteSettings } from "@/data/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type ContactFormProps = {
  formName: string;
  source: string;
  title: string;
  copy: string;
  intentLabel?: string;
  submitLabel?: string;
  lotName?: string;
  projectName?: string;
};

type FormState = {
  name: string;
  phone: string;
  email: string;
  interest: string;
  message: string;
  website: string;
};

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm({
  formName,
  source,
  title,
  copy,
  intentLabel = "Quiero recibir informacion",
  submitLabel = "Enviar consulta",
  lotName,
  projectName,
}: ContactFormProps) {
  const initialState = useMemo<FormState>(
    () => ({
      name: "",
      phone: "",
      email: "",
      interest: lotName ? `Me interesa ${lotName}` : intentLabel,
      message: lotName
        ? `Quiero coordinar informacion y visita para ${lotName}.`
        : "Quiero conocer disponibilidad, ubicacion y opciones de visita.",
      website: "",
    }),
    [intentLabel, lotName],
  );

  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedback, setFeedback] = useState("");

  const whatsappFallbackUrl = buildWhatsAppUrl(
    siteSettings.whatsappNumber,
    lotName
      ? `Hola, quiero informacion sobre ${lotName} y coordinar una visita.`
      : "Hola, quiero mas informacion sobre los lotes en Huaypo.",
  );

  function updateField(field: keyof FormState, value: string) {
    setValues((current) => ({
      ...current,
      [field]: value,
    }));
    setErrors((current) => ({
      ...current,
      [field]: undefined,
    }));
  }

  function validateForm() {
    const nextErrors: Partial<FormState> = {};

    if (!values.name.trim()) {
      nextErrors.name = "Ingresa tu nombre.";
    }

    if (!values.phone.trim()) {
      nextErrors.phone = "Ingresa tu telefono.";
    } else if (!/^[0-9+\-() ]{7,30}$/.test(values.phone.trim())) {
      nextErrors.phone = "Ingresa un telefono valido.";
    }

    if (!values.email.trim()) {
      nextErrors.email = "Ingresa tu correo.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      nextErrors.email = "Ingresa un correo valido.";
    }

    if (!values.message.trim()) {
      nextErrors.message = "Cuentanos brevemente que necesitas.";
    } else if (values.message.trim().length > 2000) {
      nextErrors.message = "Tu mensaje es demasiado largo.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validateForm()) {
      setStatus("error");
      setFeedback("Revisa los campos marcados antes de enviar.");
      return;
    }

    setStatus("submitting");
    setFeedback("Enviando tu consulta...");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name.trim(),
          phone: values.phone.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
          lotInterest: values.interest.trim(),
          project: projectName ?? siteSettings.brand,
          source,
          website: values.website.trim(),
        }),
      });

      const result = (await response.json()) as {
        ok?: boolean;
        message?: string;
        fallbackToWhatsApp?: boolean;
      };

      if (!response.ok || !result.ok) {
        setStatus("error");
        setFeedback(
          result.message ??
            "No pudimos registrar tu consulta automaticamente. Te abrimos WhatsApp para atenderte ahora mismo.",
        );

        if (result.fallbackToWhatsApp) {
          window.open(whatsappFallbackUrl, "_blank", "noopener,noreferrer");
        }

        return;
      }

      setStatus("success");
      setFeedback(result.message ?? "Tu consulta fue enviada correctamente.");
      setValues(initialState);
    } catch {
      setStatus("error");
      setFeedback(
        "Tuvimos un problema al enviar tu consulta. Te abrimos WhatsApp para no perder el contacto.",
      );
      window.open(whatsappFallbackUrl, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <Reveal className="lux-card relative overflow-hidden rounded-[2.6rem] p-5 sm:p-6 md:p-8">
      <div className="absolute -right-12 top-0 h-32 w-32 rounded-full bg-[rgba(208,192,143,0.12)] blur-3xl" />
      <div className="absolute bottom-0 left-0 h-36 w-36 rounded-full bg-[rgba(17,48,35,0.08)] blur-3xl" />
      <div className="relative flex flex-wrap items-center gap-3">
        <p className="text-[10px] uppercase tracking-[0.24em] text-[#8E6E35] sm:text-[11px] sm:tracking-[0.36em]">
          Contacto directo
        </p>
        <span className="h-px w-16 bg-[linear-gradient(90deg,_rgba(198,169,107,0.6),_transparent)]" />
        <span className="rounded-full border border-[#DDD4C5] bg-white/70 px-3 py-1.5 text-[10px] uppercase tracking-[0.28em] text-[#5B584F]">
          Respuesta guiada
        </span>
      </div>
      <h2 className="relative mt-4 break-words font-serif text-[2.15rem] leading-tight tracking-[-0.03em] text-[#0E0E0E] sm:text-3xl md:text-4xl">
        {title}
      </h2>
      <p className="relative mt-4 max-w-2xl text-base leading-8 text-[#4D4A43] md:text-lg">
        {copy}
      </p>

      <div className="relative mt-7 grid gap-3 sm:grid-cols-3">
        {[
          { label: "Canal", value: "Formulario y WhatsApp" },
          { label: "Proyecto", value: projectName ?? siteSettings.projectLabel },
          { label: "Atencion", value: "Rapida y personalizada" },
        ].map((item) => (
          <div key={item.label} className="min-w-0 rounded-[1.45rem] border border-[#DDD4C5] bg-white/60 px-4 py-4 shadow-[0_12px_28px_rgba(6,17,14,0.05)]">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#8B826F] sm:tracking-[0.3em]">{item.label}</p>
            <p className="mt-2 break-words text-sm font-medium leading-7 text-[#13211B]">{item.value}</p>
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        data-form-name={formName}
        noValidate
        className="relative mt-10 grid gap-5 md:grid-cols-2"
      >
        <input type="hidden" name="source" value={source} />

        <label className="hidden" aria-hidden="true">
          Website
          <input
            tabIndex={-1}
            autoComplete="off"
            name="website"
            value={values.website}
            onChange={(event) => updateField("website", event.target.value)}
          />
        </label>

        <label className="grid gap-2 text-sm font-medium text-[#2B2A25]">
          Nombre completo
          <input
            name="name"
            required
            autoComplete="name"
            value={values.name}
            onChange={(event) => updateField("name", event.target.value)}
            maxLength={80}
            aria-invalid={errors.name ? "true" : "false"}
            className="rounded-[1.2rem] border border-[#D7D0C4] bg-[rgba(255,255,255,0.74)] px-4 py-3.5 text-[#13211B] outline-none transition placeholder:text-[#9B9285] hover:border-[#C6A96B] focus:bg-white"
            placeholder="Tu nombre"
          />
          {errors.name ? <span className="text-xs text-rose-600">{errors.name}</span> : null}
        </label>

        <label className="grid gap-2 text-sm font-medium text-[#2B2A25]">
          Telefono
          <input
            name="phone"
            required
            autoComplete="tel"
            inputMode="tel"
            value={values.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            maxLength={30}
            aria-invalid={errors.phone ? "true" : "false"}
            className="rounded-[1.2rem] border border-[#D7D0C4] bg-[rgba(255,255,255,0.74)] px-4 py-3.5 text-[#13211B] outline-none transition placeholder:text-[#9B9285] hover:border-[#C6A96B] focus:bg-white"
            placeholder="Tu telefono"
          />
          {errors.phone ? <span className="text-xs text-rose-600">{errors.phone}</span> : null}
        </label>

        <label className="grid gap-2 text-sm font-medium text-[#2B2A25]">
          Correo
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            value={values.email}
            onChange={(event) => updateField("email", event.target.value)}
            maxLength={120}
            aria-invalid={errors.email ? "true" : "false"}
            className="rounded-[1.2rem] border border-[#D7D0C4] bg-[rgba(255,255,255,0.74)] px-4 py-3.5 text-[#13211B] outline-none transition placeholder:text-[#9B9285] hover:border-[#C6A96B] focus:bg-white"
            placeholder="tucorreo@ejemplo.com"
          />
          {errors.email ? <span className="text-xs text-rose-600">{errors.email}</span> : null}
        </label>

        <label className="grid gap-2 text-sm font-medium text-[#2B2A25]">
          Interes
          <input
            name="interest"
            value={values.interest}
            onChange={(event) => updateField("interest", event.target.value)}
            maxLength={140}
            className="rounded-[1.2rem] border border-[#D7D0C4] bg-[rgba(255,255,255,0.74)] px-4 py-3.5 text-[#13211B] outline-none transition placeholder:text-[#9B9285] hover:border-[#C6A96B] focus:bg-white"
          />
        </label>

        <label className="grid gap-2 text-sm font-medium text-[#2B2A25] md:col-span-2">
          Mensaje
          <textarea
            name="message"
            rows={5}
            value={values.message}
            onChange={(event) => updateField("message", event.target.value)}
            maxLength={2000}
            aria-invalid={errors.message ? "true" : "false"}
            className="rounded-[1.6rem] border border-[#D7D0C4] bg-[rgba(255,255,255,0.74)] px-4 py-3.5 text-[#13211B] outline-none transition placeholder:text-[#9B9285] hover:border-[#C6A96B] focus:bg-white"
            placeholder="Cuentanos que tipo de lote te interesa o si quieres coordinar una visita."
          />
          {errors.message ? (
            <span className="text-xs text-rose-600">{errors.message}</span>
          ) : null}
        </label>

        <div className="min-w-0 flex flex-col gap-4 md:col-span-2">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="lux-button-primary w-full px-6 py-3.5 text-sm font-semibold disabled:cursor-wait disabled:opacity-70 md:w-auto"
            >
              {status === "submitting" ? "Enviando..." : submitLabel}
            </button>
            <a
              href={whatsappFallbackUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="lux-button-secondary-light w-full px-6 py-3.5 text-center text-sm font-semibold md:w-auto"
            >
              Prefiero WhatsApp
            </a>
          </div>
          <p className="break-words text-[10px] uppercase tracking-[0.18em] text-[#8B826F] sm:text-[11px] sm:tracking-[0.3em]">
            {siteSettings.whatsappDisplay} / {siteSettings.email}
          </p>
          <p
            aria-live="polite"
            className={
              status === "success"
                ? "text-sm text-emerald-800"
                : status === "error"
                  ? "text-sm text-amber-900"
                  : "text-sm text-[#6A6359]"
            }
          >
            {feedback ||
              "Tambien puedes escribirnos directo por WhatsApp si prefieres una atencion mas rapida."}
          </p>
        </div>
      </form>
    </Reveal>
  );
}
