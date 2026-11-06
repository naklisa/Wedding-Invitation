/**
 * Utility to generate clean, short, human-readable slugs for wedding guests.
 * Examples:
 * - "Nahli Saud Ramdani" -> "nahli"
 * - "Bpk. Dr. H. Bambang Pamungkas, S.E." -> "bambang"
 * - "Keluarga Besar Bpk. Suhali" -> "suhali"
 * - "Dimas & Rina" -> "dimas-rina"
 */

export function cleanGuestNameForSlug(name: string): string {
  if (!name) return "";

  let cleaned = name.trim();

  // 1. Remove honorifics/prefixes commonly used in Indonesian wedding invitations
  const prefixRegex =
    /^(yth\.?|bapak|bpk\.?|ibu\.?|ibunda|ayahanda|saudara\/i|saudara|saudari|sdr\.?|sdri\.?|keluarga besar|keluarga|kel\.?|dr\.?|drg\.?|drh\.?|prof\.?|h\.|hj\.|ustadz|ustad|ust\.|kh\.|k\.h\.|tuan|nyonya)\s+/gi;

  for (let i = 0; i < 3; i++) {
    cleaned = cleaned.replace(prefixRegex, "").trim();
  }

  // 2. Remove titles/degrees at the end or middle
  const degreeRegex =
    /(,\s*(s\.pd|s\.m|s\.kom|s\.t|s\.e|s\.h|s\.ked|m\.m|m\.pd|m\.kom|m\.ti|m\.ba|ph\.d|alm\.?|almarhum\.?|almarhumah\.?|d\.k\.k\.?|dkk\.?|partner|pasangan|cs\.?))+/gi;
  cleaned = cleaned.replace(degreeRegex, "").trim();

  // 3. Replace "&" with "-"
  cleaned = cleaned.replace(/&/g, " ");

  // 4. Remove special characters, keep only letters, numbers, spaces, and hyphens
  cleaned = cleaned.replace(/[^a-zA-Z0-9\s-]/g, "");

  // 5. Condense multiple spaces/hyphens
  cleaned = cleaned.trim().replace(/\s+/g, " ");

  return cleaned;
}

export function sanitizeSlug(raw: string): string {
  return raw
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function generateSlug(name: string, existingSlugs: Set<string> = new Set()): string {
  const cleaned = cleanGuestNameForSlug(name);
  const words = cleaned.toLowerCase().split(/\s+/).filter(Boolean);

  let baseSlug = "";

  if (words.length === 0) {
    baseSlug = "tamu-" + Math.random().toString(36).substring(2, 6);
  } else if (words.length === 1) {
    baseSlug = words[0];
  } else {
    // Pick the first word as primary (e.g. "nahli")
    baseSlug = words[0];
  }

  baseSlug = sanitizeSlug(baseSlug);
  if (!baseSlug) {
    baseSlug = "tamu-" + Math.random().toString(36).substring(2, 6);
  }

  // If already taken, try adding second word if available
  if (existingSlugs.has(baseSlug) && words.length > 1 && !baseSlug.includes(words[1])) {
    const candidateWithSecondWord = sanitizeSlug(`${words[0]}-${words[1]}`);
    if (!existingSlugs.has(candidateWithSecondWord)) {
      return candidateWithSecondWord;
    }
  }

  // If still taken, append number
  let finalSlug = baseSlug;
  let counter = 2;
  while (existingSlugs.has(finalSlug)) {
    finalSlug = `${baseSlug}-${counter}`;
    counter++;
  }

  return finalSlug;
}
