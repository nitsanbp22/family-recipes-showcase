const TRACKING_PARAMETERS = new Set([
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_id",
  "fbclid",
  "gclid",
  "igsh",
  "si",
  "_r",
  "_t",
  "s",
  "sfnsn",
  "ref",
  "ref_src",
  "ref_url",
  "mibextid",
  "mc_eid",
]);

function normalizeInstagram(url: URL) {
  const match = url.pathname.match(/^\/(reel|reels|p)\/([^/]+)/i);
  if (!match) return null;
  const type = match[1].toLowerCase() === "reels" ? "reel" : match[1].toLowerCase();
  return `https://instagram.com/${type}/${match[2]}`;
}

function normalizeYouTube(url: URL) {
  if (url.hostname === "youtu.be") {
    const id = url.pathname.split("/").filter(Boolean)[0];
    return id ? `https://youtube.com/watch?v=${id}` : null;
  }

  const id = url.searchParams.get("v");
  return id ? `https://youtube.com/watch?v=${id}` : null;
}

function normalizeTikTok(url: URL) {
  if (url.hostname === "vm.tiktok.com" || url.hostname === "vt.tiktok.com") {
    const id = url.pathname.split("/").filter(Boolean)[0];
    return id ? `https://${url.hostname}/${id}` : null;
  }
  const match = url.pathname.match(/\/(?:video|v)\/(\d+)/i);
  if (match) {
    return `https://www.tiktok.com/video/${match[1]}`;
  }
  return null;
}

function normalizeFacebook(url: URL) {
  if (url.hostname === "fb.watch" || url.hostname === "fb.me") {
    const id = url.pathname.split("/").filter(Boolean)[0];
    return id ? `https://${url.hostname}/${id}` : null;
  }
  const reelMatch = url.pathname.match(/\/reel\/([^/]+)/i);
  if (reelMatch) {
    return `https://www.facebook.com/reel/${reelMatch[1]}`;
  }
  const watchMatch = url.pathname.match(/\/watch\/?/i);
  if (watchMatch && url.searchParams.get("v")) {
    const v = url.searchParams.get("v");
    return `https://www.facebook.com/watch/?v=${v}`;
  }
  return null;
}

export function normalizeSourceUrl(value: string): string {
  const trimmed = value.trim();
  const urlMatch = trimmed.match(/https?:\/\/[^\s]+/i);
  const targetStr = urlMatch ? urlMatch[0] : trimmed;

  const url = new URL(targetStr);

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("Unsupported URL protocol");
  }

  url.protocol = "https:";
  url.hostname = url.hostname.toLowerCase();

  if (url.hostname.startsWith("m.")) {
    url.hostname = url.hostname.slice(2);
  }
  if (url.hostname === "mobile.twitter.com") {
    url.hostname = "twitter.com";
  }
  if (url.hostname === "instagram.com") {
    url.hostname = "www.instagram.com";
  }
  url.hash = "";

  for (const key of [...url.searchParams.keys()]) {
    if (TRACKING_PARAMETERS.has(key.toLowerCase())) {
      url.searchParams.delete(key);
    }
  }

  if (url.hostname.endsWith("instagram.com")) {
    return normalizeInstagram(url) ?? stripTrailingSlash(url.toString());
  }

  if (url.hostname === "youtube.com" || url.hostname === "youtu.be") {
    return normalizeYouTube(url) ?? stripTrailingSlash(url.toString());
  }

  if (url.hostname.endsWith("tiktok.com")) {
    return normalizeTikTok(url) ?? stripTrailingSlash(url.toString());
  }

  if (
    url.hostname.endsWith("facebook.com") ||
    url.hostname === "fb.watch" ||
    url.hostname === "fb.me"
  ) {
    return normalizeFacebook(url) ?? stripTrailingSlash(url.toString());
  }

  return stripTrailingSlash(url.toString());
}

function stripTrailingSlash(value: string) {
  const parsed = new URL(value);
  if (parsed.pathname !== "/") {
    parsed.pathname = parsed.pathname.replace(/\/+$/, "");
  }
  return parsed.toString();
}
