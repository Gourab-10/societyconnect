import { Router, Request, Response } from 'express';
import { z } from 'zod';
import db from '../db/connection';
import { requireAuth } from '../middleware/auth';
import { validate } from '../middleware/validate';

const router = Router();

router.use(requireAuth);

router.get('/', (req: Request, res: Response) => {
  try {
    const amenities = db.prepare('SELECT * FROM amenities').all();
    res.json(amenities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch amenities' });
  }
});

router.get('/bookings', (req: Request, res: Response) => {
  try {
    const bookings = db.prepare('SELECT * FROM amenity_bookings').all();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

const bookingSchema = z.object({
  amenityId: z.string(),
  amenityName: z.string(),
  residentName: z.string(),
  flatNumber: z.string(),
  tower: z.string(),
  date: z.string(),
  timeSlot: z.string(),
  amountPaid: z.number(),
  depositPaid: z.number(),
});

router.post('/bookings', validate(bookingSchema), (req: Request, res: Response) => {
  try {
    const id = `BK-${Math.floor(500 + Math.random() * 500)}`;
    const createdAt = new Date().toISOString().split('T')[0];

    db.prepare(`
      INSERT INTO amenity_bookings (
        id, amenityId, amenityName, residentName, flatNumber, tower,
        date, timeSlot, amountPaid, depositPaid, status, createdAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id, req.body.amenityId, req.body.amenityName, req.body.residentName,
      req.body.flatNumber, req.body.tower, req.body.date, req.body.timeSlot,
      req.body.amountPaid, req.body.depositPaid, 'confirmed', createdAt
    );

    const newBooking = db.prepare('SELECT * FROM amenity_bookings WHERE id = ?').get(id);
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

export default router;
