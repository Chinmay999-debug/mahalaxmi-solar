export const PHONE_DISPLAY = "+91 82909 88831";
export const PHONE_HREF = "tel:+918290988831";
export const WHATSAPP_NUMBER = "918290988831";
export const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER}`;
export const EMAIL_DISPLAY = "hello@mahalaxmisolar.in";
export const EMAIL_HREF = "mailto:hello@mahalaxmisolar.in";
export const LOCATION = "Jaipur, Rajasthan";
export const FOUNDED = 2011;
/** Public address of the live site (GitHub Pages). Used for share previews and canonical URL. */
export const SITE_URL = "https://chinmay999-debug.github.io/mahalaxmi-solar/";

/** WhatsApp deep link with a pre-filled message. */
export function whatsappLink(message?: string) {
  return message ? `${WHATSAPP_HREF}?text=${encodeURIComponent(message)}` : WHATSAPP_HREF;
}
