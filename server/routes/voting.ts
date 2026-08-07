import { Router, Request, Response } from 'express';
import { z } from 'zod';
import db from '../db/connection';
import { requireAuth } from '../middleware/auth';
import { validate } from '../middleware/validate';

const router = Router();

router.use(requireAuth);

router.get('/resolutions', (req: Request, res: Response) => {
  try {
    const resolutions = db.prepare('SELECT * FROM resolutions').all() as any[];
    
    for (const resItem of resolutions) {
      resItem.options = db.prepare('SELECT id, label, votes FROM resolution_options WHERE resolutionId = ?').all(resItem.id);
    }
    
    res.json(resolutions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch resolutions' });
  }
});

const voteSchema = z.object({
  optionId: z.string(),
});

router.post('/resolutions/:id/vote', validate(voteSchema), (req: Request, res: Response) => {
  const optionId = req.body.optionId as string;
  const resolutionId = req.params.id as string;

  try {
    const resolution = db.prepare('SELECT * FROM resolutions WHERE id = ?').get(resolutionId);
    if (!resolution) return res.status(404).json({ error: 'Resolution not found' });

    db.prepare('UPDATE resolutions SET totalVotes = totalVotes + 1 WHERE id = ?').run(resolutionId);
    db.prepare('UPDATE resolution_options SET votes = votes + 1 WHERE id = ? AND resolutionId = ?').run(optionId, resolutionId);

    const updatedResolution = db.prepare('SELECT * FROM resolutions WHERE id = ?').get(resolutionId) as any;
    updatedResolution.options = db.prepare('SELECT id, label, votes FROM resolution_options WHERE resolutionId = ?').all(resolutionId);

    res.json(updatedResolution);
  } catch (error) {
    res.status(500).json({ error: 'Failed to cast vote' });
  }
});

export default router;
