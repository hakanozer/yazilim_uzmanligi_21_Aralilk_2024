import express from "express";
import authController from "../controllers/authController";

const router = express.Router();

// Tüm auth endpoint'leri controller'da tanımlı
router.use("/", authController);

export default router;