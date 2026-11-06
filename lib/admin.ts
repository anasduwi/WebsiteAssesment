export function isAdminEmail(email?: string | null) {
  const allowlist = (process.env.ADMIN_ALLOWED_EMAILS ?? "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);

  if (allowlist.length === 0) {
    return true;
  }

  return Boolean(email && allowlist.includes(email.toLowerCase()));
}
