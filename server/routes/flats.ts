import { Router, Request, Response } from 'express';
import db from '../db/connection';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.use(requireAuth);

router.get('/', (req: Request, res: Response) => {
  try {
    const flats = db.prepare('SELECT * FROM flats').all();
    res.json(flats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch flats' });
  }
});

router.get('/:id', (req: Request, res: Response) => {
  try {
    const flat = db.prepare('SELECT * FROM flats WHERE id = ?').get(req.params.id as string);
    if (!flat) return res.status(404).json({ error: 'Flat not found' });
    res.json(flat);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch flat' });
  }
});

export default router;
