import { Router, Request, Response } from 'express';
import { userService } from '../services/index';
import { authenticateToken, AuthRequest, authorizeRole } from '../middleware/auth';

const router = Router();

// Public routes
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const user = await userService.registerUser(email, password, firstName, lastName);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await userService.loginUser(email, password);
    res.json({ message: 'Login successful', user, token });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
});

// Protected routes
router.get('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.put(
  '/:id',
  authenticateToken,
  authorizeRole(['ADMIN']),
  async (req: AuthRequest, res: Response) => {
    try {
      const user = await userService.updateUser(req.params.id, req.body);
      res.json({ message: 'User updated', user });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
);

router.delete(
  '/:id',
  authenticateToken,
  authorizeRole(['ADMIN']),
  async (req: AuthRequest, res: Response) => {
    try {
      await userService.deleteUser(req.params.id);
      res.json({ message: 'User deleted' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
);

export default router;
