import express from "express";
import projectController from "../controllers/projectController";

const router = express.Router();

router.use("/", projectController);

export default router;