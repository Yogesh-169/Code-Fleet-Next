// Simple in-memory rate limiter (per-IP + route). For production, replace with Redis.
const hits = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string, limit = 10, windowMs = 60_000) {
  const now = Date.now();
  const entry = hits.get(key);
  if (!entry || entry.resetAt < now) {
    hits.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true };
  }
  if (entry.count >= limit) {
    return { ok: false, retryAfterMs: entry.resetAt - now } as const;
  }
  entry.count += 1;
  hits.set(key, entry);
  return { ok: true } as const;
}


