import { Router, Request, Response } from 'express';
import { z } from 'zod';
import db from '../db/connection';
import { requireAuth } from '../middleware/auth';
import { validate } from '../middleware/validate';

const router = Router();

router.use(requireAuth);

router.get('/tankers', (req: Request, res: Response) => {
  try {
    const tankers = db.prepare('SELECT * FROM water_tankers ORDER BY date DESC').all();
    res.json(tankers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch water tankers' });
  }
});

const tankerSchema = z.object({
  vendorName: z.string(),
  capacityLiters: z.number(),
  costPerTanker: z.number(),
  verifiedByGuard: z.string(),
  slipNumber: z.string(),
});

router.post('/tankers', validate(tankerSchema), (req: Request, res: Response) => {
  try {
    const id = `TNK-${Math.floor(100 + Math.random() * 900)}`;
    const date = new Date().toISOString().split('T')[0];
    
    db.prepare(`
      INSERT INTO water_tankers (id, date, vendorName, capacityLiters, costPerTanker, verifiedByGuard, slipNumber)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(id, date, req.body.vendorName, req.body.capacityLiters, req.body.costPerTanker, req.body.verifiedByGuard, req.body.slipNumber);

    const newTanker = db.prepare('SELECT * FROM water_tankers WHERE id = ?').get(id);
    res.status(201).json(newTanker);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create water tanker log' });
  }
});

router.get('/dg-logs', (req: Request, res: Response) => {
  try {
    const logs = db.prepare('SELECT * FROM dg_logs ORDER BY date DESC').all();
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch DG logs' });
  }
});

const dgSchema = z.object({
  dieselLitresAdded: z.number(),
  cost: z.number(),
  runtimeHours: z.number(),
  powerCutDuration: z.string(),
});

router.post('/dg-logs', validate(dgSchema), (req: Request, res: Response) => {
  try {
    const id = `DG-${Math.floor(200 + Math.random() * 800)}`;
    const date = new Date().toISOString().split('T')[0];
    
    db.prepare(`
      INSERT INTO dg_logs (id, date, dieselLitresAdded, cost, runtimeHours, powerCutDuration)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(id, date, req.body.dieselLitresAdded, req.body.cost, req.body.runtimeHours, req.body.powerCutDuration);

    const newLog = db.prepare('SELECT * FROM dg_logs WHERE id = ?').get(id);
    res.status(201).json(newLog);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create DG log' });
  }
});

router.get('/ev-sessions', (req: Request, res: Response) => {
  try {
    const sessions = db.prepare('SELECT * FROM ev_sessions ORDER BY date DESC').all();
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch EV sessions' });
  }
});

export default router;
