import { site } from "@/content/site";

/**
 * Sends a form to site.formEndpoint (e.g. Formspree) when one is configured.
 * Returns "sent", "failed", or "unconfigured" (no endpoint: show copy-to-send).
 */
export async function submitForm(
  subject: string,
  fields: Record<string, string>,
  endpoint: string = site.formEndpoint,
): Promise<"sent" | "failed" | "unconfigured"> {
  if (!endpoint) return "unconfigured";
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ _subject: subject, ...fields }),
    });
    return res.ok ? "sent" : "failed";
  } catch {
    return "failed";
  }
}
