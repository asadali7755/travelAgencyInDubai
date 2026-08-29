import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

type Window = `${number} ${"s" | "m" | "h"}`;

const cache = new Map<string, Ratelimit>();

/**
 * Returns true when the caller is over budget.
 * Fails open when Upstash is not configured (local dev), so the app still runs.
 */
export async function rateLimit(
  req: Request,
  o: { key: string; limit: number; window: Window },
): Promise<boolean> {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return false;
  }

  const rl =
    cache.get(o.key) ??
    new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(o.limit, o.window),
      prefix: o.key,
    });
  cache.set(o.key, rl);

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anon";
  const { success } = await rl.limit(ip);
  return !success;
}
