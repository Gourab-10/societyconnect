import { Router, Request, Response } from 'express';
import { z } from 'zod';
import db from '../db/connection';
import { requireAuth } from '../middleware/auth';
import { validate } from '../middleware/validate';

const router = Router();

router.use(requireAuth);

router.get('/', (req: Request, res: Response) => {
  try {
    const visitors = db.prepare('SELECT * FROM visitors ORDER BY entryTime DESC').all();
    res.json(visitors);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch visitors' });
  }
});

const visitorSchema = z.object({
  name: z.string(),
  phone: z.string(),
  type: z.enum(['guest', 'delivery', 'cab', 'service']),
  flatNumber: z.string(),
  tower: z.string(),
  vehicleNumber: z.string().optional(),
});

router.post('/', validate(visitorSchema), (req: Request, res: Response) => {
  try {
    const id = `VIS-${Math.floor(900 + Math.random() * 100)}`;
    const passCode = Math.floor(1000 + Math.random() * 9000).toString();
    const entryTime = new Date().toISOString().replace('T', ' ').slice(0, 16);
    
    db.prepare(`
      INSERT INTO visitors (
        id, name, phone, type, flatNumber, tower, passCode, entryTime, status, vehicleNumber
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id, req.body.name, req.body.phone, req.body.type, req.body.flatNumber, 
      req.body.tower, passCode, entryTime, 'expected', req.body.vehicleNumber || null
    );

    const newPass = db.prepare('SELECT * FROM visitors WHERE id = ?').get(id);
    res.status(201).json(newPass);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create visitor pass' });
  }
});

router.get('/staff', (req: Request, res: Response) => {
  try {
    const staff = db.prepare('SELECT * FROM staff').all() as any[];
    staff.forEach(s => s.flatsAssigned = JSON.parse(s.flatsAssigned));
    res.json(staff);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch staff' });
  }
});

export default router;
