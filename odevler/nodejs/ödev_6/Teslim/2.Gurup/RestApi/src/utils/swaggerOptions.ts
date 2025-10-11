export const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: '2.Gurup TeamTask',
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
        tags: [
            {
                name: 'Users',
                description: 'Kullanıcı yönetimi işlemleri',
            },
            { 
                name: 'Projects',
                description: 'Proje yönetim işlemleri'
            },
            { 
                name: 'Tasks',
                description: 'Görev yönetim işlemleri'
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
    apis: ['./src/restcontrollers/*.ts', './src/models/*.ts'],
};