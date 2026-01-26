import { Router } from "express";
import { register, login, profile, refresh, logout } from "../controllers/auth.controller";
import { requireAuth } from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", requireAuth, profile);
router.post("/refresh", refresh);
router.post("/logout", requireAuth, logout);

export default router;
