// searchController.ts: makeNewsSearchFilter ekleniyor
import { Request } from 'express';
import { makeSafeRegex } from '../utils/validators';

export function getQueryFromReq(req: Request): string {
  const qRaw = (req.query.q ?? req.query.search ?? '') as string;
  return String(qRaw).trim();
}

export function makeBlogSearchFilter(q: string) {
  const rx = makeSafeRegex(q);
  return {
    isPublished: true,
    $or: [
      { title: rx },
      { content: rx },
      { tags: { $in: [rx] } }
    ]
  };
}

// Yeni: News arama filtresi (aktif haberlerde title/content eşleşmesi)
export function makeNewsSearchFilter(q: string) {
  const rx = makeSafeRegex(q);
  return {
    isActive: true,
    $or: [
      { title: rx },
      { content: rx }
    ]
  };
}

export function normalizeLimit(limit?: any, max = 50, def = 20): number {
  const n = Number(limit ?? def);
  if (Number.isNaN(n) || n <= 0) return def;
  return Math.min(n, max);
}