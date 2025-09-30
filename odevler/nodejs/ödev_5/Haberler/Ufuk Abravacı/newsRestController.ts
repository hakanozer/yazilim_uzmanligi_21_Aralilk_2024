import express from "express";
import { verifyToken, checkRole } from "../configs/auth";
import { eRoles } from "../utils/eRoles";
import {  removeNews, searchNews } from "../services/newsService";

const newsRestController = express.Router();

newsRestController.delete("/delete/:id", verifyToken, checkRole(eRoles.Admin), async (req, res) => {
  try {
    const { id } = req.params;
    const result = await removeNews(id);
    return res.status(result.code).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
});

// 2 rol gerektiği için auth.tsdeki checkrole middlewareini güncelledim.
newsRestController.get("/search", verifyToken, checkRole(eRoles.Admin, eRoles.User), async (req, res) => {
  try {
    const q = (req.query.q as string) || "";
    const page = parseInt(req.query.page as string) || 1;
    const result = await searchNews(q, page, 10);
    return res.status(result.code).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
});

export default newsRestController;