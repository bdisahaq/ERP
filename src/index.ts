import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

// Import routes
import userRoutes from './routes/users';
import customerRoutes from './routes/customers';
import productRoutes from './routes/products';
import orderRoutes from './routes/orders';
import invoiceRoutes from './routes/invoices';
import supplierRoutes from './routes/suppliers';

dotenv.config();

const app: Express = express();
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: err.message || 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
});

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.get('/api', (req: Request, res: Response) => {
  res.json({
    message: 'ERP Backend API',
    version: '1.0.0',
    endpoints: {
      users: '/api/users',
      customers: '/api/customers',
      suppliers: '/api/suppliers',
      products: '/api/products',
      orders: '/api/orders',
      invoices: '/api/invoices',
      purchases: '/api/purchases',
    },
  });
});

// Register route handlers
app.use('/api/users', userRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/invoices', invoiceRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`ERP Backend running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});
