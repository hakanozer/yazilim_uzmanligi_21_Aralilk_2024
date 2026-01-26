import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import { sessionMiddleware } from "./config/session";
import viewRoutes from "./routes/view.routes";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

import routes from "./routes";
import { notFound, errorHandler } from "./middlewares/error.middleware";

const app = express();

// Global middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(sessionMiddleware);

// EJS config
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src", "views"));

// Swagger Docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "NewsHub çalışıyor" });
});

/**
 * VIEW ROUTES (EJS)
 * DİKKAT: Bunu API routes'tan ÖNCE koyuyoruz.
 * /login, /register, /dashboard vb buradan gelir.
 */
app.use("/", viewRoutes);

/**
 * API ROUTES
 * /api/v1/... buradan gelir.
 */
app.use(routes);

// 404 + Global Error Handler (EN SON)
app.use(notFound);
app.use(errorHandler);

export default app;
