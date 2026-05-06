import { Router, Response } from 'express';
import { invoiceService } from '../services/index';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = Router();

router.get('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const invoices = await invoiceService.getAllInvoices();
    res.json(invoices);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const invoice = await invoiceService.createInvoice(req.body);
    res.status(201).json(invoice);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const invoice = await invoiceService.getInvoiceById(req.params.id);
    res.json(invoice);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.patch(
  '/:id/status',
  authenticateToken,
  async (req: AuthRequest, res: Response) => {
    try {
      const { status } = req.body;
      const invoice = await invoiceService.updateInvoiceStatus(
        req.params.id,
        status
      );
      res.json({ message: 'Invoice status updated', invoice });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
);

export default router;
