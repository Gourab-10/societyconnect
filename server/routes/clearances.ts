import { Router, Request, Response } from 'express';
import { z } from 'zod';
import db from '../db/connection';
import { requireAuth } from '../middleware/auth';
import { validate } from '../middleware/validate';

const router = Router();

router.use(requireAuth);

router.get('/', (req: Request, res: Response) => {
  try {
    const clearances = db.prepare('SELECT * FROM clearances ORDER BY moveOutDate DESC').all();
    res.json(clearances);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch clearances' });
  }
});

const clearanceSchema = z.object({
  flatNumber: z.string(),
  tower: z.string(),
  residentName: z.string(),
  moveOutDate: z.string(),
  duesCleared: z.boolean(),
  parkingBadgeReturned: z.boolean(),
  liftPaddingRequested: z.boolean(),
});

router.post('/', validate(clearanceSchema), (req: Request, res: Response) => {
  try {
    const id = `CLR-${Math.floor(500 + Math.random() * 500)}`;
    
    db.prepare(`
      INSERT INTO clearances (
        id, flatNumber, tower, residentName, moveOutDate, duesCleared, 
        parkingBadgeReturned, liftPaddingRequested, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id, req.body.flatNumber, req.body.tower, req.body.residentName, 
      req.body.moveOutDate, req.body.duesCleared ? 1 : 0, 
      req.body.parkingBadgeReturned ? 1 : 0, req.body.liftPaddingRequested ? 1 : 0, 
      'approved'
    );

    const newClearance = db.prepare('SELECT * FROM clearances WHERE id = ?').get(id) as any;
    // convert integers back to booleans for the response
    newClearance.duesCleared = !!newClearance.duesCleared;
    newClearance.parkingBadgeReturned = !!newClearance.parkingBadgeReturned;
    newClearance.liftPaddingRequested = !!newClearance.liftPaddingRequested;

    res.status(201).json(newClearance);
  } catch (error) {
    res.status(500).json({ error: 'Failed to apply for clearance' });
  }
});

export default router;
