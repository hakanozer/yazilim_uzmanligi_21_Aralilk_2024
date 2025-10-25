export const swaggerOptions = {
    swaggerDefinition: {
                openapi: '3.0.0',
                info: {
                    title: 'My API',
                    version: '1.0.0',
                    description: 'API documentation using Swagger',
                    contact: {
                        name: 'API Support',
                        email: 'support@example.com',
                        url: 'https://example.com',
                    },
                    license: {
                        name: 'MIT',
                        url: 'https://opensource.org/licenses/MIT',
                    },
                    termsOfService: 'https://example.com/terms',
                },
                servers: [
                    {
                        url: 'http://localhost:4000/api/v1',
                    },
                ],
                // Tags sıralamasını buraya ekliyoruz
                tags: [
                    {
                        name: 'Users',
                        description: 'Kullanıcı yönetimi işlemleri',
                    },
                    {
                        name: 'Categories',
                        description: 'Kategori yönetimi işlemleri',
                    },
                    {
                        name: 'Comments',
                        description: 'Yorum yönetimi işlemleri',
                    },
                    {
                        name: 'Post',
                        description: 'Haber (İçerik) yönetimi işlemleri',
                    },
                ],
            components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT', 
                },
            },
        },
    },
    apis: ['./src/controllers/api/*.ts', './src/models/*.ts'], // Path to the API docs
};