import express from "express";
import userManagementController from "../controllers/userManagementController";

const router = express.Router();

// Tüm user management endpoint'leri controller'da tanımlı
router.use("/", userManagementController);

export default router;