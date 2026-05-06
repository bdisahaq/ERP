import { Router, Response } from 'express';
import { orderService } from '../services/index';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = Router();

router.get('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const orders = await orderService.getAllOrders();
    res.json(orders);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const order = await orderService.createOrder(req.body);
    res.status(201).json(order);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const order = await orderService.getOrderById(req.params.id);
    res.json(order);
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
      const order = await orderService.updateOrderStatus(req.params.id, status);
      res.json({ message: 'Order status updated', order });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
);

export default router;
