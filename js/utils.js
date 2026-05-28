/**
 * Shared utility functions used across multiple page scripts.
 */

export const IMAGE_FALLBACK = "Pictures/Icons/camera-circle.svg";

export function setPageMeta({ title, description, image } = {}) {
  if (title) {
    document.title = `${title} — Earth to Ian`;
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", `${title} — Earth to Ian`);
  }
  if (description) {
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", description);
  }
  if (image) {
    document.querySelector('meta[property="og:image"]')?.setAttribute("content", image);
  }
}

export function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function loadMarkdown(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Could not load markdown: ${path}`);
  return await res.text();
}

export function markdownToHtml(md) {
  let html = md
    .replace(/\r\n/g, "\n")
    .replace(/^### (.*)$/gm, "<h3>$1</h3>")
    .replace(/^## (.*)$/gm, "<h2>$1</h2>")
    .replace(/^# (.*)$/gm, "<h1>$1</h1>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>");

  html = html.replace(/^\s*-\s+(.*)$/gm, "<li>$1</li>");
  html = html.replace(/(?:<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`);

  return html
    .split("\n\n")
    .map((block) => {
      const t = block.trim();
      if (!t) return "";
      if (t.startsWith("<h") || t.startsWith("<ul")) return t;
      return `<p>${t.replace(/\n/g, "<br>")}</p>`;
    })
    .join("\n");
}
