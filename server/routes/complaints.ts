import { Router, Request, Response } from 'express';
import { z } from 'zod';
import db from '../db/connection';
import { requireAuth } from '../middleware/auth';
import { validate } from '../middleware/validate';

const router = Router();

router.use(requireAuth);

router.get('/', (req: Request, res: Response) => {
  try {
    const complaints = db.prepare('SELECT * FROM complaints ORDER BY createdAt DESC').all();
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch complaints' });
  }
});

const complaintSchema = z.object({
  flatNumber: z.string(),
  tower: z.string(),
  residentName: z.string(),
  category: z.string(),
  title: z.string(),
  description: z.string(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
});

router.post('/', validate(complaintSchema), (req: Request, res: Response) => {
  try {
    const id = `TKT-${Math.floor(800 + Math.random() * 200)}`;
    const now = new Date();
    const createdAt = now.toISOString().replace('T', ' ').slice(0, 16);
    
    // Simple SLA logic (24 hours)
    const deadline = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const slaDeadline = deadline.toISOString().replace('T', ' ').slice(0, 16);
    
    db.prepare(`
      INSERT INTO complaints (
        id, flatNumber, tower, residentName, category, title, description,
        priority, status, createdAt, slaDeadline
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id, req.body.flatNumber, req.body.tower, req.body.residentName,
      req.body.category, req.body.title, req.body.description, req.body.priority,
      'open', createdAt, slaDeadline
    );

    const newTicket = db.prepare('SELECT * FROM complaints WHERE id = ?').get(id);
    res.status(201).json(newTicket);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create complaint ticket' });
  }
});

export default router;
