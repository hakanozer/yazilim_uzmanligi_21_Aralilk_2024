import { baseSpec } from './swagger/base';
import { authPaths } from './swagger/auth';
import { blogPaths, blogSchemas } from './swagger/blogs';
import { newsPaths, newsSchemas } from './swagger/news';
import { categoryPaths, categorySchemas } from './swagger/categories';
import { profilePaths, profileSchemas } from './swagger/profile';
import { commentPaths, commentSchemas } from './swagger/comments';

export const swaggerSpec = {
  ...baseSpec,
  paths: {
    ...authPaths,
    ...blogPaths,
    ...newsPaths,
    ...categoryPaths,
    ...profilePaths,
    ...commentPaths
  },
  components: {
    ...baseSpec.components,
    securitySchemes: {
      ...baseSpec.components.securitySchemes
    },
    schemas: {
      ...(baseSpec.components.schemas || {}),
      ...blogSchemas,
      ...newsSchemas,
      ...categorySchemas,
      ...profileSchemas,
      ...commentSchemas
    }
  }
};