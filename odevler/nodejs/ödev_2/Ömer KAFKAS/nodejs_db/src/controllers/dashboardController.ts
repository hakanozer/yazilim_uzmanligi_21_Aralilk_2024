import { Request, Response, Router } from "express";
import { Note } from "../models/noteModel";

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const user = (req as any).session?.item;
    if (!user) return res.redirect('/login');
    const notes = await Note.find({ userId: user._id }).sort({ date: -1 });
    return res.render('dashboard', { notes });
  } catch (err: any) {
    return res.status(500).render('dashboard', { notes: [], error: 'Notlar yüklenemedi' });
  }
});

router.post('/notes', async (req: Request, res: Response) => {
  try {
    const user = (req as any).session?.item;
    if (!user) return res.status(401).json({ error: 'Oturum gerekli' });
    const { title, detail, color } = req.body;
    if (!title || !detail) {
      return res.status(400).json({ error: 'title ve detail alanları zorunludur' });
    }
    const created = await Note.create({ title, detail, color, userId: user._id });
    return res.status(201).json({
      id: created._id,
      title: created.title,
      detail: created.detail,
      color: created.color,
      date: created.date
    });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
});

export const dashboardController = router;
