import { Router } from 'express';

const router = Router();

// Geçici route
router.get('/', (req, res) => {
  res.json({ message: 'Admin routes will be implemented soon' });
});

export default router;