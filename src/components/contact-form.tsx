"use client";

import { useMemo, useState } from "react";
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
};

type FormState = {
  name: string;
  phone: string;
  email: string;
  interest: string;
  message: string;
};

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm({
  source,
  title,
  copy,
  intentLabel = "Quiero recibir informacion",
  submitLabel = "Enviar consulta",
  lotName,
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
    }

    if (!values.email.trim()) {
      nextErrors.email = "Ingresa tu correo.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      nextErrors.email = "Ingresa un correo valido.";
    }

    if (!values.message.trim()) {
      nextErrors.message = "Cuéntanos brevemente que necesitas.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
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
          source,
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
    <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_18px_50px_rgba(31,24,15,0.08)] md:p-8">
      <p className="text-xs uppercase tracking-[0.34em] text-amber-700">Contacto directo</p>
      <h2 className="mt-4 font-serif text-4xl leading-tight text-stone-900">{title}</h2>
      <p className="mt-4 max-w-2xl text-base leading-8 text-stone-600 md:text-lg">{copy}</p>

      <form onSubmit={handleSubmit} className="mt-10 grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-stone-700">
          Nombre completo
          <input
            name="name"
            required
            value={values.name}
            onChange={(event) => updateField("name", event.target.value)}
            className="rounded-2xl border border-stone-200 px-4 py-3 outline-none transition"
          />
          {errors.name ? <span className="text-xs text-rose-600">{errors.name}</span> : null}
        </label>

        <label className="grid gap-2 text-sm font-medium text-stone-700">
          Telefono
          <input
            name="phone"
            required
            value={values.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            className="rounded-2xl border border-stone-200 px-4 py-3 outline-none transition"
          />
          {errors.phone ? <span className="text-xs text-rose-600">{errors.phone}</span> : null}
        </label>

        <label className="grid gap-2 text-sm font-medium text-stone-700">
          Correo
          <input
            type="email"
            name="email"
            required
            value={values.email}
            onChange={(event) => updateField("email", event.target.value)}
            className="rounded-2xl border border-stone-200 px-4 py-3 outline-none transition"
          />
          {errors.email ? <span className="text-xs text-rose-600">{errors.email}</span> : null}
        </label>

        <label className="grid gap-2 text-sm font-medium text-stone-700">
          Interes
          <input
            name="interest"
            value={values.interest}
            onChange={(event) => updateField("interest", event.target.value)}
            className="rounded-2xl border border-stone-200 px-4 py-3 outline-none transition"
          />
        </label>

        <label className="grid gap-2 text-sm font-medium text-stone-700 md:col-span-2">
          Mensaje
          <textarea
            name="message"
            rows={5}
            value={values.message}
            onChange={(event) => updateField("message", event.target.value)}
            className="rounded-3xl border border-stone-200 px-4 py-3 outline-none transition"
          />
          {errors.message ? (
            <span className="text-xs text-rose-600">{errors.message}</span>
          ) : null}
        </label>

        <div className="flex flex-col gap-4 md:col-span-2 md:flex-row md:items-center">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-stone-50 transition hover:bg-stone-700 disabled:cursor-wait disabled:opacity-70"
          >
            {status === "submitting" ? "Enviando..." : submitLabel}
          </button>
          <p
            className={
              status === "success"
                ? "text-sm text-emerald-700"
                : status === "error"
                  ? "text-sm text-amber-800"
                  : "text-sm text-stone-500"
            }
          >
            {feedback || "Tambien puedes escribirnos directo por WhatsApp si prefieres una atencion mas rapida."}
          </p>
        </div>
      </form>
    </div>
  );
}
