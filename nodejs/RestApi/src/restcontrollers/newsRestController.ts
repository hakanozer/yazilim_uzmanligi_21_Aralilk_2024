import express from 'express'
import { AuthRequest, checkRole, verifyToken } from '../configs/auth';
import { eRoles } from '../utils/eRoles';
import { addNews, removeNews, searchNews } from '../services/newsService';
import { JwtPayload } from 'jsonwebtoken';

const newsRestController = express.Router()

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
newsRestController.get("/search", verifyToken, checkRole(eRoles.Admin), async (req, res) => {
  try {
    const q = (req.query.q as string) || "";
    const page = parseInt(req.query.page as string) || 1;
    const result = await searchNews(q, page, 10);
    return res.status(result.code).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
});

// Haber ekleme (Admin)
/*
newsRestController.post(
  "/add",
  verifyToken,
  checkRole(eRoles.Admin),
  async (req, res) => {
    try {
      const result = await addNews(req.body)
      return res.status(result.code).json(result)
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error })
    }
  }
)*/

// Haber güncelleme (Admin)
newsRestController.put("/update/:id", verifyToken, checkRole(eRoles.Admin), async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await updateNews(id, data)
    return res.status(result.code).json(result)
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error })
  }
})

newsRestController.post("/add", verifyToken, checkRole(eRoles.Admin), async (req: AuthRequest, res) => {
  try {
    const data = req.body;
    const user = req.user as JwtPayload;
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
newsRestController.get("/list", verifyToken, checkRole(eRoles.Admin), async (req, res) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const result = await newsListAll(page, limit);
        return res.status(result.code).json(result);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }
});

export default newsRestController

function updateNews(id: string, data: any) {
    throw new Error('Function not implemented.');
}
