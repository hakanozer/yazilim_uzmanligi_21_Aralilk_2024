import { verify } from "crypto";
import express from "express";
import { checkRole, verifyToken } from "../configs/auth";
import { addNews, newsListAll, removeNews, searchNews, uptadeNews } from "../services/newsService";
import { eRoles } from "../utils/enumRole";
import news from "../models/newsModel";

const newsRestController = express.Router();

// Haber Ekleme

newsRestController.post("/add", verifyToken, checkRole(eRoles.admin), async (req, res) => {
  try {
    const data = req.body;
    const result = await addNews(data);
    return res.status(result.code).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
});

//Haber Silme

newsRestController.delete("delete/:id", verifyToken, checkRole(eRoles.admin), async (req, res) => {
  try {
    const { id } = req.params;
    const result = await removeNews(id);
    return res.status(result.code).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
});

// Haber Arama
newsRestController.get("/search", verifyToken, checkRole(eRoles.admin, eRoles.user), async (req, res) => {
  try {
    const q = (req.query.q as string) || "";
    const page = parseInt(req.query.page as string) || 1;
    const result = await searchNews(q, page, 10);
    return res.status(result.code).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
});

// Haber Güncelleme
newsRestController.put("/uptade/:id", verifyToken, checkRole(eRoles.admin), async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await uptadeNews(id, data)
    return res.status(result.code).json(result)
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error })
  }
});


// Haber Listeleme
newsRestController.get("/list", verifyToken, checkRole(eRoles.admin, eRoles.user), async (req, res) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const result = await newsListAll(page, limit);
        return res.status(result.code).json(result);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }
});

export default newsRestController;