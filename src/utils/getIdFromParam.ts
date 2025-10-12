export function getIdFromParam(
  param: string | undefined | null
): string | null {
  if (!param) return null;

  // trim whitespace
  const s = String(param).trim();
  if (s.length === 0) return null;

  // UUIDv4-ish pattern at the start (8-4-4-4-12)
  const uuidPrefix = s.slice(0, 36);
  const uuidRegex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

  if (uuidRegex.test(uuidPrefix)) {
    // if string starts with a full UUID, return the 36-char UUID
    return uuidPrefix;
  }

  // Otherwise assume id doesn't contain '-' (common case: numeric id)
  const idx = s.indexOf("-");
  if (idx === -1) return s; // whole param is id
  if (idx === 0) return null; // starts with '-' unlikely, treat as invalid

  // return substring before first '-'
  return s.slice(0, idx);
}
