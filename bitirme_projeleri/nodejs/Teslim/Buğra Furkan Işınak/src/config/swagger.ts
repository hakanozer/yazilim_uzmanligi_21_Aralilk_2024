import swaggerJsdoc from 'swagger-jsdoc';
import { Express } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BFItalks API',
      version: '1.0.0',
      description: 'Modern News Platform API Documentation',
      contact: {
        name: 'BFItalks Team',
        email: 'info@bfitalks.com',
        url: 'https://bfitalks.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'API Server'
      },
      {
        url: 'https://bfitalks.com',
        description: 'Production Server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            email: { type: 'string', format: 'email' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            profilePicture: { type: 'string' },
            bio: { type: 'string' },
            roles: { 
              type: 'array', 
              items: { type: 'string', enum: ['user', 'author', 'admin'] }
            },
            isActive: { type: 'boolean' },
            lastLogin: { type: 'string', format: 'date-time' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        Article: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            title: { type: 'string' },
            slug: { type: 'string' },
            content: { type: 'string' },
            excerpt: { type: 'string' },
            coverImage: { type: 'string' },
            author: { $ref: '#/components/schemas/User' },
            category: { $ref: '#/components/schemas/Category' },
            tags: { type: 'array', items: { type: 'string' } },
            isPublished: { type: 'boolean' },
            publishedAt: { type: 'string', format: 'date-time' },
            views: { type: 'number' },
            likes: { type: 'array', items: { $ref: '#/components/schemas/User' } },
            dislikes: { type: 'array', items: { $ref: '#/components/schemas/User' } },
            comments: { type: 'array', items: { $ref: '#/components/schemas/Comment' } },
            featured: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        Category: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            name: { type: 'string' },
            slug: { type: 'string' },
            description: { type: 'string' },
            color: { type: 'string' },
            icon: { type: 'string' },
            isActive: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        Comment: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            content: { type: 'string' },
            author: { $ref: '#/components/schemas/User' },
            article: { $ref: '#/components/schemas/Article' },
            parentComment: { $ref: '#/components/schemas/Comment' },
            replies: { type: 'array', items: { $ref: '#/components/schemas/Comment' } },
            likes: { type: 'array', items: { $ref: '#/components/schemas/User' } },
            dislikes: { type: 'array', items: { $ref: '#/components/schemas/User' } },
            isApproved: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        Error: {
          type: 'object',
          properties: {
            status: { type: 'string' },
            message: { type: 'string' },
            error: { type: 'object' }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts']
};

const specs = swaggerJsdoc(options);

export { specs };
