import { Router } from 'express';
import Blog from '../models/blogModel';
import News from '../models/newsModel';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const [news, blogs] = await Promise.all([
      News.find({ isActive: true })
        .sort({ createdAt: -1 })
        .populate('category', 'name')
        .populate('author', 'name')
        .lean(),
      Blog.find({ isPublished: true })
        .sort({ createdAt: -1 })
        .populate('author', 'name')
        .lean(),
    ]);

    res.render('index', { title: 'Yggdrasil', news, blogs });
  } catch (err) {
    res.render('index', { title: 'Yggdrasil', news: [], blogs: [] });
  }
});

export default router;