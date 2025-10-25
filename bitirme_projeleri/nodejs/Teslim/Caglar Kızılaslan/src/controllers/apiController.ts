import express from 'express';
import jwt from 'jsonwebtoken';
import UserDB from '../models/userModel';
import NewsDB from '../models/newsModel';
import CommentDB from '../models/commentModel';
import { decrypt } from '../Config/cryptoJS';
import { authJWT } from '../middlewares/authJWT';

export const apiController = express.Router();

// Helper: standard error response
const internalError = (res: express.Response, err: unknown) => {
  console.error('API error:', err);
  return res.status(500).json({ error: 'Internal Server Error' });
};


apiController.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: 'email and password are required' });
    const user = await UserDB.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Email or password wrong' });
    const plain = decrypt(user.password);
    if (plain !== password) return res.status(401).json({ error: 'Email or password wrong' });
    const secret = process.env.JWT_SECRET || 'jwt_secret_123';
    const token = jwt.sign({ _id: String(user._id), role: user.role }, secret, { expiresIn: '2h' });
    return res.json({ token });
  } catch (err) {
    return internalError(res, err);
  }
});


apiController.get('/me', authJWT, async (req, res) => {
  try {
    const u = (req as any).jwtUser as { _id: string };
    const user = await UserDB.findById(u._id).select('_id surname lastname email role date');
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.json(user);
  } catch (err) {
    return internalError(res, err);
  }
});


apiController.get('/health', (_req, res) => {
  return res.json({ status: 'ok' });
});

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Haber listesini getirir
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Başlık arama
 *       - in: query
 *         name: owner
 *         schema:
 *           type: string
 *         description: Kullanıcı ID (sadece admin)
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date
 *         description: Başlangıç tarihi
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date
 *         description: Bitiş tarihi
 *     responses:
 *       200:
 *         description: Haber listesi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   detail:
 *                     type: string
 *                   date:
 *                     type: string
 *                     format: date-time
 *                   color:
 *                     type: string
 *                   userID:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       surname:
 *                         type: string
 *                       lastname:
 *                         type: string
 *                       email:
 *                         type: string
 *       401:
 *         description: Yetkisiz erişim
 *       500:
 *         description: Sunucu hatası
 */
apiController.get('/posts', authJWT, async (req, res) => {
  try {
    const u = (req as any).jwtUser as { _id: string; role: 'user' | 'admin' };
    const { q, owner, from, to } = req.query as { [key: string]: string };

    const filter: any = {};
    if (q) filter.title = { $regex: q, $options: 'i' };
    if (from || to) {
      filter.date = {};
      if (from) filter.date.$gte = new Date(from);
      if (to) filter.date.$lte = new Date(to);
    }

    if (u.role === 'admin') {
      if (owner) filter.userID = owner;
    } else {
      filter.userID = u._id;
    }

    const posts = await NewsDB.find(filter).populate('userID', 'surname lastname email').sort({ date: -1 });
    return res.json(posts);
  } catch (err) {
    return internalError(res, err);
  }
});

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Yeni haber oluşturur
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Yeni Haber Başlığı"
 *               detail:
 *                 type: string
 *                 example: "Haber detayı burada yer alır"
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-01-15T10:30:00Z"
 *               color:
 *                 type: string
 *                 example: "#ff5733"
 *     responses:
 *       201:
 *         description: Haber başarıyla oluşturuldu
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 detail:
 *                   type: string
 *                 date:
 *                   type: string
 *                   format: date-time
 *                 color:
 *                   type: string
 *                 userID:
 *                   type: string
 *       400:
 *         description: Eksik parametreler
 *       401:
 *         description: Yetkisiz erişim
 *       500:
 *         description: Sunucu hatası
 */
apiController.post('/posts', authJWT, async (req, res) => {
  try {
    const u = (req as any).jwtUser as { _id: string };
    const { title, detail, date, color } = req.body || {};
    if (!title) return res.status(400).json({ error: 'title is required' });
    const payload: any = { title, detail, color, userID: u._id };
    if (date) payload.date = date;
    const created = new NewsDB(payload);
    await created.save();
    return res.status(201).json(created);
  } catch (err) {
    return internalError(res, err);
  }
});


apiController.get('/posts/:id', authJWT, async (req, res) => {
  try {
    const u = (req as any).jwtUser as { _id: string; role: 'user' | 'admin' };
    const post = await NewsDB.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Not found' });
    const isOwner = String(post.userID) === String(u._id);
    const isAdmin = u.role === 'admin';
    if (!isOwner && !isAdmin) return res.status(403).json({ error: 'Unauthorized' });
    return res.json(post);
  } catch (err) {
    return internalError(res, err);
  }
});

/**
 * @swagger
 * /api/posts/{id}:
 *   put:
 *     summary: Haberi günceller
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Haber ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Güncellenmiş Haber Başlığı"
 *               detail:
 *                 type: string
 *                 example: "Güncellenmiş haber detayı"
 *               date:
 *                 type: string
 *                 format: date-time
 *               color:
 *                 type: string
 *                 example: "#ff5733"
 *     responses:
 *       200:
 *         description: Haber başarıyla güncellendi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       401:
 *         description: Yetkisiz erişim
 *       403:
 *         description: Bu haberi güncelleme yetkiniz yok
 *       404:
 *         description: Haber bulunamadı
 *       500:
 *         description: Sunucu hatası
 */
apiController.put('/posts/:id', authJWT, async (req, res) => {
  try {
    const u = (req as any).jwtUser as { _id: string; role: 'user' | 'admin' };
    const post = await NewsDB.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Not found' });
    const isOwner = String(post.userID) === String(u._id);
    const isAdmin = u.role === 'admin';
    if (!isOwner && !isAdmin) return res.status(403).json({ error: 'Unauthorized' });
    await NewsDB.findByIdAndUpdate(req.params.id, req.body);
    const updated = await NewsDB.findById(req.params.id);
    return res.json(updated);
  } catch (err) {
    return internalError(res, err);
  }
});

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: Haberi siler
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Haber ID
 *     responses:
 *       204:
 *         description: Haber başarıyla silindi
 *       401:
 *         description: Yetkisiz erişim
 *       403:
 *         description: Bu haberi silme yetkiniz yok
 *       404:
 *         description: Haber bulunamadı
 *       500:
 *         description: Sunucu hatası
 */
apiController.delete('/posts/:id', authJWT, async (req, res) => {
  try {
    const u = (req as any).jwtUser as { _id: string; role: 'user' | 'admin' };
    const post = await NewsDB.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Not found' });
    const isOwner = String(post.userID) === String(u._id);
    const isAdmin = u.role === 'admin';
    if (!isOwner && !isAdmin) return res.status(403).json({ error: 'Unauthorized' });
    await NewsDB.findByIdAndDelete(req.params.id);
    await CommentDB.deleteMany({ postID: req.params.id });
    return res.status(204).send();
  } catch (err) {
    return internalError(res, err);
  }
});

/**
 * @swagger
 * /api/posts/{id}/comments:
 *   get:
 *     summary: Haberin yorumlarını listeler
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Haber ID
 *     responses:
 *       200:
 *         description: Yorum listesi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   text:
 *                     type: string
 *                   date:
 *                     type: string
 *                     format: date-time
 *                   userID:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       surname:
 *                         type: string
 *                       lastname:
 *                         type: string
 *                       email:
 *                         type: string
 *       401:
 *         description: Yetkisiz erişim
 *       403:
 *         description: Bu habere erişim yetkiniz yok
 *       404:
 *         description: Haber bulunamadı
 *       500:
 *         description: Sunucu hatası
 */
apiController.get('/posts/:id/comments', authJWT, async (req, res) => {
  try {
    const u = (req as any).jwtUser as { _id: string; role: 'user' | 'admin' };
    const post = await NewsDB.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Not found' });
    const isOwner = String(post.userID) === String(u._id);
    const isAdmin = u.role === 'admin';
    if (!isOwner && !isAdmin) return res.status(403).json({ error: 'Unauthorized' });
    const comments = await CommentDB.find({ postID: req.params.id }).populate('userID', 'surname lastname email').sort({ date: -1 });
    return res.json(comments);
  } catch (err) {
    return internalError(res, err);
  }
});

/**
 * @swagger
 * /api/posts/{id}/comments:
 *   post:
 *     summary: Habere yorum ekler
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Haber ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *             properties:
 *               text:
 *                 type: string
 *                 example: "Bu haber çok güzel!"
 *     responses:
 *       201:
 *         description: Yorum başarıyla eklendi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 text:
 *                   type: string
 *                 date:
 *                   type: string
 *                   format: date-time
 *                 userID:
 *                   type: string
 *                 postID:
 *                   type: string
 *       400:
 *         description: Eksik parametreler
 *       401:
 *         description: Yetkisiz erişim
 *       404:
 *         description: Haber bulunamadı
 *       500:
 *         description: Sunucu hatası
 */
apiController.post('/posts/:id/comments', authJWT, async (req, res) => {
  try {
    const u = (req as any).jwtUser as { _id: string };
    const post = await NewsDB.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Not found' });
    const { text } = req.body || {};
    if (!text) return res.status(400).json({ error: 'text is required' });
    const comment = new CommentDB({ postID: post._id, userID: u._id, text });
    await comment.save();
    return res.status(201).json(comment);
  } catch (err) {
    return internalError(res, err);
  }
});

/**
 * @swagger
 * /api/posts/{id}/comments/{commentId}:
 *   delete:
 *     summary: Yorumu siler
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Haber ID
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: Yorum ID
 *     responses:
 *       204:
 *         description: Yorum başarıyla silindi
 *       401:
 *         description: Yetkisiz erişim
 *       403:
 *         description: Bu yorumu silme yetkiniz yok
 *       404:
 *         description: Haber veya yorum bulunamadı
 *       500:
 *         description: Sunucu hatası
 */
apiController.delete('/posts/:id/comments/:commentId', authJWT, async (req, res) => {
  try {
    const u = (req as any).jwtUser as { _id: string; role: 'user' | 'admin' };
    const post = await NewsDB.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Not found' });
    const isOwner = String(post.userID) === String(u._id);
    const isAdmin = u.role === 'admin';
    if (!isOwner && !isAdmin) return res.status(403).json({ error: 'Unauthorized' });
    await CommentDB.findByIdAndDelete(req.params.commentId);
    return res.status(204).send();
  } catch (err) {
    return internalError(res, err);
  }
});