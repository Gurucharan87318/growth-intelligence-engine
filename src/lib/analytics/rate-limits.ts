type Bucket = {
  count: number;
  resetAt: number;
};

const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 30;

const store = new Map<string, Bucket>();

export function checkRateLimit(key: string) {
  const now = Date.now();
  const current = store.get(key);

  if (!current || now > current.resetAt) {
    const freshBucket: Bucket = {
      count: 1,
      resetAt: now + WINDOW_MS,
    };

    store.set(key, freshBucket);

    return {
      allowed: true,
      remaining: MAX_REQUESTS - 1,
      resetAt: freshBucket.resetAt,
    };
  }

  if (current.count >= MAX_REQUESTS) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: current.resetAt,
    };
  }

  current.count += 1;
  store.set(key, current);

  return {
    allowed: true,
    remaining: MAX_REQUESTS - current.count,
    resetAt: current.resetAt,
  };
}
