
export const swaggerOptions = {
    swaggerDefinition: {
                openapi: '3.0.0',
                info: {
                    title: 'My API',
                    version: '1.0.0',
                    description: 'API documentation using Swagger',
                },
                servers: [
                    {
                        url: 'http://localhost:4000',
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
    apis: ['./src/restcontrollers/*.ts', './src/models/*.ts'], // Path to the API docs
};