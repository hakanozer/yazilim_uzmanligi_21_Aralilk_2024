"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blog = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const blogSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    coverImageUrl: { type: String, trim: true },
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    tags: [{ type: String, trim: true }],
    categories: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Category' }],
    isPublished: { type: Boolean, default: false },
    publishedAt: { type: Date },
    likesID: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User', default: [] }],
    dislikesID: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User', default: [] }],
    comments: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Comment', default: [] }]
}, { timestamps: true });
blogSchema.pre('validate', function (next) {
    const doc = this;
    if (doc.isPublished && !doc.publishedAt) {
        doc.publishedAt = new Date();
    }
    next();
});
exports.Blog = mongoose_1.default.models.Blog || mongoose_1.default.model('Blog', blogSchema);
exports.default = exports.Blog;
