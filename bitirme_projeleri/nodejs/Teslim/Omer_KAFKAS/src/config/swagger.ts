import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'NewsHub API',
            version: '1.0.0',
            description: 'Haber & Blog Platformu - REST API Dokümantasyonu',
            contact: {
                name: 'NewsHub Team',
                email: 'support@newshub.com'
            },
            license: {
                name: 'MIT',
                url: 'https://opensource.org/licenses/MIT'
            }
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development Server'
            },
            {
                url: 'https://newshub-api.com',
                description: 'Production Server'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'JWT Authorization header using the Bearer scheme. Example: "Authorization: Bearer {token}"'
                }
            },
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'Kullanıcı ID'
                        },
                        name: {
                            type: 'string',
                            description: 'Kullanıcı adı'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'Email adresi'
                        },
                        role: {
                            type: 'string',
                            enum: ['User', 'Moderator', 'Admin'],
                            description: 'Kullanıcı rolü'
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time'
                        }
                    }
                },
                News: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string'
                        },
                        title: {
                            type: 'string'
                        },
                        content: {
                            type: 'string'
                        },
                        category: {
                            type: 'string',
                            enum: ['Teknoloji', 'Spor', 'Ekonomi', 'Sağlık', 'Eğitim', 'Gündem', 'Diğer']
                        },
                        image: {
                            type: 'string',
                            description: 'Haber görseli URL'
                        },
                        slug: {
                            type: 'string'
                        },
                        author: {
                            $ref: '#/components/schemas/User'
                        },
                        views: {
                            type: 'number'
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time'
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time'
                        }
                    }
                },
                Comment: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string'
                        },
                        content: {
                            type: 'string'
                        },
                        author: {
                            $ref: '#/components/schemas/User'
                        },
                        news: {
                            type: 'string',
                            description: 'Haber ID'
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time'
                        }
                    }
                },
                Error: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: false
                        },
                        message: {
                            type: 'string'
                        },
                        error: {
                            type: 'string'
                        }
                    }
                },
                Success: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: true
                        },
                        message: {
                            type: 'string'
                        },
                        data: {
                            type: 'object'
                        }
                    }
                }
            }
        },
        tags: [
            {
                name: 'Auth',
                description: 'Kimlik doğrulama işlemleri'
            },
            {
                name: 'News',
                description: 'Haber yönetimi'
            },
            {
                name: 'Comments',
                description: 'Yorum işlemleri'
            }
        ]
    },
    apis: [
        path.join(__dirname, '../routes/authRoutes.ts'),
        path.join(__dirname, '../routes/newsRoutes.ts'),
        path.join(__dirname, '../routes/commentRoutes.ts'),
        path.join(__dirname, '../routes/adminRoutes.ts')
    ]
};

export const swaggerSpec = swaggerJsdoc(options);
