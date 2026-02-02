// Frontend-only token validator (DEMO)
// IMPORTANT: This is a *client-side* placeholder. Do NOT use this for real authentication.
// Backend integration: Replace calls to validateToken with an API endpoint that verifies
// the token signature, expiry, and role server-side.

export async function validateToken(token) {
  // Simulate network delay
  await new Promise((r) => setTimeout(r, 400));

  if (!token || typeof token !== 'string') return false;

  // Demo rule: token must be opaque-like and long enough. Replace with server check.
  // Accepts tokens with length >= 20 and containing at least one dash or underscore
  const looksOpaque = token.length >= 20 && /[-_]/.test(token);

  // Extra safety: disallow tokens that include 'admin=true' or any plain query text
  const notObviouslyLeaky = !/admin=|\?|&|=/.test(token);

  return looksOpaque && notObviouslyLeaky;
}
