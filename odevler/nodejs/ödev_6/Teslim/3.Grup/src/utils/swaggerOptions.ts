export const swaggerOptions = {
       swaggerDefinition: {
           openapi: '3.0.0',
           info: {
               title: 'TeamTask',
               version: '1.0.0',
               description: 'Rol Tabanlı Proje Yönetim Sistemi - Rest Servisi',
           },
           servers: [
               {
                   url: `http://localhost:4000/api`,
               },
           ],
           tags: [
               { name: 'Users', description: 'User management and authentication' },
               { name: 'Projects', description: 'Project management' },
               { name: 'Tasks', description: 'Task management' },
           ],
      components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT', 
            },
        },
        schemas: {
            User: {
                type: 'object',
                required: ['name', 'email', 'password'],
                properties: {
                    name: { type: 'string' },
                    email: { type: 'string', format: 'email' },
                    password: { type: 'string', format: 'password' },
                    roles: { type: 'array', items: { type: 'string' }, default: ['user'] },
                    jwt: { type: 'string' },
                    date: { type: 'string', format: 'date-time' }
                },
                example: {
                    name: 'Caglar',
                    email: 'caglar@mail.com',
                    password: '123456',
                    roles: ['user'],
                    jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                    date: '2024-06-01T10:00:00Z'
                }
            },
            Project: {
                type: 'object',
                required: ['name', 'description'],
                properties: {
                    name: { type: 'string' },
                    description: { type: 'string' },
                    createdBy: { type: 'string', description: 'User ObjectId' },
                    createdAt: { type: 'string', format: 'date-time' }
                },
                example: {
                    name: 'TeamTask Backend',
                    description: 'RBAC tabanlı görev yönetim servisi',
                    createdBy: '665f1c8b9b1234567890abcd',
                    createdAt: '2024-06-01T10:00:00Z'
                }
            },
            Task: {
                type: 'object',
                required: ['title', 'description'],
                properties: {
                    title: { type: 'string' },
                    description: { type: 'string' },
                    status: { type: 'string', enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
                    priority: { type: 'string', enum: ['low', 'medium', 'high'], default: 'medium' },
                    dueDate: { type: 'string', format: 'date-time' },
                    assignedTo: { type: 'string' },
                    createdBy: { type: 'string' }
                },
                example: {
                    title: 'Swagger şemalarını ekle',
                    description: 'OpenAPI bileşenlerine User/Project/Task ekle',
                    status: 'pending',
                    priority: 'medium',
                    dueDate: '2024-06-05T12:00:00Z',
                    assignedTo: 'caglar',
                    createdBy: 'admin'
                }
            }
        }
    },
       },
       apis: ['./src/controllers/*.ts', './src/models/*.ts'],
   }
