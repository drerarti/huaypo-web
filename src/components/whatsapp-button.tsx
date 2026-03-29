import { siteSettings } from "@/data/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type WhatsAppButtonProps = {
  label: string;
  message: string;
  className?: string;
};

export function WhatsAppButton({
  label,
  message,
  className = "",
}: WhatsAppButtonProps) {
  const href = buildWhatsAppUrl(siteSettings.whatsappNumber, message);

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={className}
    >
      {label}
    </a>
  );
}
