import { Router, Request, Response } from 'express';
import { z } from 'zod';
import db from '../db/connection';
import { requireAuth } from '../middleware/auth';
import { validate } from '../middleware/validate';

const router = Router();

router.use(requireAuth);

router.get('/', (req: Request, res: Response) => {
  try {
    const bills = db.prepare('SELECT * FROM bills').all() as any[];
    
    // Attach items to bills
    for (const bill of bills) {
      bill.items = db.prepare('SELECT description, amount, category FROM bill_items WHERE billId = ?').all(bill.id);
    }
    
    res.json(bills);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bills' });
  }
});

const paySchema = z.object({
  method: z.string().min(1),
});

router.post('/:id/pay', validate(paySchema), (req: Request, res: Response) => {
  const { method } = req.body;
  const billId = req.params.id as string;

  try {
    const bill = db.prepare('SELECT * FROM bills WHERE id = ?').get(billId) as any;
    if (!bill) return res.status(404).json({ error: 'Bill not found' });
    if (bill.status === 'paid') return res.status(400).json({ error: 'Bill already paid' });

    const transactionRef = `PAY/${Math.floor(100000 + Math.random() * 900000)}/SUCCESS`;
    const paidDate = new Date().toISOString().split('T')[0];

    db.prepare(`
      UPDATE bills 
      SET status = 'paid', paidDate = ?, paymentMethod = ?, transactionRef = ?
      WHERE id = ?
    `).run(paidDate, method, transactionRef, billId);

    const updatedBill = db.prepare('SELECT * FROM bills WHERE id = ?').get(billId) as any;
    updatedBill.items = db.prepare('SELECT description, amount, category FROM bill_items WHERE billId = ?').all(billId);

    res.json(updatedBill);
  } catch (error) {
    res.status(500).json({ error: 'Failed to process payment' });
  }
});

export default router;
