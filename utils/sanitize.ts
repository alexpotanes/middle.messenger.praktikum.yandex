export function sanitizeImages(dirtyHtml: unknown): string {
  if (typeof dirtyHtml !== "string") return "";

  const attrRegex =
    /\b([a-z][a-z0-9-]*)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]*))/gi;
  const allowedAttrs = new Set(["src", "alt", "title", "width", "height"]);
  const safeProtocols =
    /^(https?:\/\/|data:image\/(png|jpe?g|gif|webp);base64,)/i;
  const dangerousPatterns = /^on|javascript:|<script|<iframe/i;

  function escapeHtml(str: string): string {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function sanitizeTag(match: string): string {
    const tagName = match.slice(0, 4).toLowerCase();
    if (tagName !== "<img") {
      return "";
    }

    const attrs: Record<string, string> = {};
    let m;
    attrRegex.lastIndex = 0;

    while ((m = attrRegex.exec(match)) !== null) {
      const name = m[1].toLowerCase();
      const value = m[2] ?? m[3] ?? m[4] ?? "";

      if (dangerousPatterns.test(name) || dangerousPatterns.test(value)) {
        continue;
      }

      if (allowedAttrs.has(name)) {
        if (name === "src") {
          if (!safeProtocols.test(value)) continue;

          if (value.toLowerCase().includes("svg")) {
            continue;
          }
        }
        attrs[name] = escapeHtml(value);
      }
    }

    if (!attrs.src) return "";

    const parts = ["<img"];
    for (const [name, value] of Object.entries(attrs)) {
      parts.push(` ${name}="${value}"`);
    }
    parts.push(" />");
    return parts.join("");
  }

  const onlyImages = dirtyHtml.replace(
    /<\/?[\w-]+(?:\s+[^>]*)?>|<![^>]*>|<\?[^>]*>/gi,
    (tag) => {
      if (/^<img\b/i.test(tag)) {
        return sanitizeTag(tag);
      }
      return "";
    },
  );

  return onlyImages;
}
