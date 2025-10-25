"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
const base_1 = require("./swagger/base");
const auth_1 = require("./swagger/auth");
const blogs_1 = require("./swagger/blogs");
const news_1 = require("./swagger/news");
const categories_1 = require("./swagger/categories");
const profile_1 = require("./swagger/profile");
const comments_1 = require("./swagger/comments");
exports.swaggerSpec = {
    ...base_1.baseSpec,
    paths: {
        ...auth_1.authPaths,
        ...blogs_1.blogPaths,
        ...news_1.newsPaths,
        ...categories_1.categoryPaths,
        ...profile_1.profilePaths,
        ...comments_1.commentPaths
    },
    components: {
        ...base_1.baseSpec.components,
        securitySchemes: {
            ...base_1.baseSpec.components.securitySchemes
        },
        schemas: {
            ...(base_1.baseSpec.components.schemas || {}),
            ...blogs_1.blogSchemas,
            ...news_1.newsSchemas,
            ...categories_1.categorySchemas,
            ...profile_1.profileSchemas,
            ...comments_1.commentSchemas
        }
    }
};
