import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import db from '../db/connection';
import { JWT_SECRET, requireAuth } from '../middleware/auth';
import { validate } from '../middleware/validate';

const router = Router();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

router.post('/login', validate(loginSchema), async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as any;
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role, flatId: user.flatId, isOwner: !!user.isOwner },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Remove password before sending to client
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error during login' });
  }
});

router.get('/me', requireAuth, (req: Request, res: Response) => {
  if (!req.user?.id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const user = db.prepare('SELECT id, name, email, phone, role, flatId, flatNumber, tower, isOwner, avatar, vehiclesCount FROM users WHERE id = ?').get(req.user.id) as any;
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json({ user });
});

export default router;
