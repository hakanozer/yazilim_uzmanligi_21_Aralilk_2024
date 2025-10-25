"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQueryFromReq = getQueryFromReq;
exports.makeBlogSearchFilter = makeBlogSearchFilter;
exports.makeNewsSearchFilter = makeNewsSearchFilter;
exports.normalizeLimit = normalizeLimit;
const validators_1 = require("../utils/validators");
function getQueryFromReq(req) {
    const qRaw = (req.query.q ?? req.query.search ?? '');
    return String(qRaw).trim();
}
function makeBlogSearchFilter(q) {
    const rx = (0, validators_1.makeSafeRegex)(q);
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
function makeNewsSearchFilter(q) {
    const rx = (0, validators_1.makeSafeRegex)(q);
    return {
        isActive: true,
        $or: [
            { title: rx },
            { content: rx }
        ]
    };
}
function normalizeLimit(limit, max = 50, def = 20) {
    const n = Number(limit ?? def);
    if (Number.isNaN(n) || n <= 0)
        return def;
    return Math.min(n, max);
}
