import { Router, Request, Response } from 'express';
import { z } from 'zod';
import db from '../db/connection';
import { requireAuth } from '../middleware/auth';
import { validate } from '../middleware/validate';

const router = Router();

router.use(requireAuth);

router.get('/nocs', (req: Request, res: Response) => {
  try {
    const nocs = db.prepare('SELECT * FROM tenant_nocs').all();
    res.json(nocs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch NOCs' });
  }
});

const nocSchema = z.object({
  flatId: z.string(),
  flatNumber: z.string(),
  tower: z.string(),
  ownerId: z.string(),
  tenantName: z.string(),
  tenantPhone: z.string(),
  tenantEmail: z.string().email(),
  leaseStartDate: z.string(),
  leaseEndDate: z.string(),
  monthlyRent: z.number(),
  policeVerificationStatus: z.enum(['verified', 'pending', 'rejected']),
  nocStatus: z.enum(['approved', 'pending', 'rejected']),
});

router.post('/nocs', validate(nocSchema), (req: Request, res: Response) => {
  try {
    const id = `NOC-${Math.floor(1000 + Math.random() * 9000)}`;
    const createdAt = new Date().toISOString().split('T')[0];
    
    db.prepare(`
      INSERT INTO tenant_nocs (
        id, flatId, flatNumber, tower, ownerId, tenantName, tenantPhone, 
        tenantEmail, leaseStartDate, leaseEndDate, monthlyRent, 
        policeVerificationStatus, nocStatus, createdAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id, req.body.flatId, req.body.flatNumber, req.body.tower, req.body.ownerId,
      req.body.tenantName, req.body.tenantPhone, req.body.tenantEmail,
      req.body.leaseStartDate, req.body.leaseEndDate, req.body.monthlyRent,
      req.body.policeVerificationStatus, req.body.nocStatus, createdAt
    );

    const newNoc = db.prepare('SELECT * FROM tenant_nocs WHERE id = ?').get(id);
    res.status(201).json(newNoc);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create NOC' });
  }
});

export default router;
