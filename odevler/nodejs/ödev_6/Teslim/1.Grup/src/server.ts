import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import connectDB from "./config/db";
import authRoutes from "./routes/auth.routes";
import userManagementRoutes from "./routes/userManagement.routes";
import projectRoutes from "./routes/project.routes";
import taskRoutes from "./routes/task.routes";

// Ortam değişkenlerini yükle
dotenv.config();

// Veritabanına bağlan
connectDB();

// Express uygulaması oluştur
const app = express();
app.use(cors());
app.use(express.json());

// Swagger JSDoc configuration
// Swagger JSDoc configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "TeamTask API",
      description: "TeamTask – Rol Tabanlı Proje Yönetim Sistemi REST API",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Development server"
      }
    ],
    tags: [
      {
        name: "Auth",
        description: "Authentication endpoints"
      },
      {
        name: "User Management", 
        description: "User management endpoints"
      }
    ],
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "507f1f77bcf86cd799439011"
            },
            name: {
              type: "string", 
              example: "John Doe"
            },
            email: {
              type: "string",
              example: "john@example.com"
            },
            roles: {
              type: "array",
              items: {
                type: "string",
                enum: ["Admin", "ProjectManager", "Developer"]
              },
              example: ["Developer"]
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2023-10-05T14:48:00.000Z"
            },
            updatedAt: {
              type: "string", 
              format: "date-time",
              example: "2023-10-05T14:48:00.000Z"
            }
          }
        },
        ApiResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true
            },
            message: {
              type: "string",
              example: "Success message"
            },
            data: {
              type: "object"
            }
          }
        }
      },
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer", 
          bearerFormat: "JWT"
        }
      }
    }
  },
  apis: ["./src/controllers/*.ts"], // Tüm controller dosyalarını tara
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/auth", authRoutes);
app.use("/users", userManagementRoutes);
app.use("/projects", projectRoutes);
app.use("/", taskRoutes);

// Port'u ENV'den ya da 5000'den al
const PORT = process.env.PORT || 5000;

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📚 Swagger docs: http://localhost:${PORT}/api-docs`);
});