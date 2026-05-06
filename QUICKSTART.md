# ERP Backend - Quick Start Guide

## What's Included

This ERP backend provides a complete enterprise resource planning system with:

### Core Modules
✅ **User Management** - Authentication, authorization, role-based access control
✅ **Customer Management** - Customer profiles, credit limits, order history
✅ **Supplier Management** - Supplier details, purchase orders, payment tracking
✅ **Product Management** - Product catalog, categories, inventory levels
✅ **Order Management** - Sales orders with full order lifecycle
✅ **Invoicing** - Invoice generation, payment tracking, reconciliation
✅ **Inventory** - Real-time stock tracking, warehouse locations
✅ **Accounting** - Chart of accounts, transaction logging

## Project Structure

```
ERP/
├── src/
│   ├── index.ts              # Express app entry point
│   ├── middleware/
│   │   └── auth.ts           # JWT authentication & authorization
│   ├── services/
│   │   └── index.ts          # Business logic (CRUD operations)
│   └── routes/
│       ├── users.ts          # User/Authentication routes
│       ├── customers.ts      # Customer management
│       ├── suppliers.ts      # Supplier management
│       ├── products.ts       # Product catalog
│       ├── orders.ts         # Sales orders
│       └── invoices.ts       # Invoicing
├── prisma/
│   ├── schema.prisma         # Database schema (17 tables)
│   ├── seed.ts               # Sample data generator
│   └── migrations/           # Database migrations
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript configuration
├── .env.example              # Environment template
└── README.md                 # Full documentation
```

## Database Tables

The Prisma schema includes 17 tables covering all ERP functions:

**User & Security**
- `users` - Application users with roles
- `employees` - Employee information

**Master Data**
- `customers` - Customer profiles
- `suppliers` - Supplier information
- `products` - Product catalog
- `categories` - Product categories

**Operations**
- `orders` - Customer sales orders
- `order_items` - Order line items
- `purchase_orders` - Supplier purchase orders
- `purchase_order_items` - Purchase order line items

**Financial**
- `invoices` - Customer invoices
- `payments` - Customer payments
- `supplier_payments` - Supplier payments
- `accounts` - Chart of accounts
- `transactions` - Accounting transactions

**Logistics**
- `inventory` - Stock tracking

## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Setup database**
   - Create a PostgreSQL database
   - Copy `.env.example` to `.env` and configure database URL

3. **Run migrations**
   ```bash
   npm run prisma:migrate
   ```

4. **Seed sample data**
   ```bash
   npm run prisma:seed
   ```

5. **Start development**
   ```bash
   npm run dev
   ```

6. **Test API**
   ```bash
   curl http://localhost:3000/health
   ```

## Available Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Run production build |
| `npm run prisma:generate` | Generate Prisma Client |
| `npm run prisma:migrate` | Run database migrations |
| `npm run prisma:studio` | Open Prisma database GUI |
| `npm run prisma:seed` | Populate sample data |

## Authentication

All protected endpoints require a Bearer token in the Authorization header:

```bash
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

**Credentials in seed data:**
- Email: `admin@erp.com`
- Password: `admin123`

Login to get a token:
```bash
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@erp.com","password":"admin123"}'
```

## Environment Variables

Create `.env` file:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/erp_db
PORT=3000
NODE_ENV=development
JWT_SECRET=your-secret-key-here
```

## Key Features

### Role-Based Access Control
- **ADMIN** - All permissions
- **MANAGER** - Manage orders, invoices, products
- **SUPPLIER** - Manage purchase orders
- **CUSTOMER** - View own orders/invoices
- **USER** - Read-only access

### Secure Authentication
- JWT token-based authentication
- Password hashing with bcryptjs
- Token expiration (24 hours)
- Role-based authorization

### Complete CRUD Operations
- Users: Register, login, list, update, delete
- Customers: Full lifecycle management
- Products: Inventory & category management
- Orders: Create, track, update status
- Invoices: Generate, track payments
- Suppliers: Manage & purchase orders

## What's Next

The foundation is ready! You can extend with:

- [ ] API documentation (Swagger/OpenAPI)
- [ ] Unit & integration tests (Jest)
- [ ] Input validation (Zod/Joi)
- [ ] Logging (Winston/Pino)
- [ ] Email notifications
- [ ] PDF invoice generation
- [ ] Reports & analytics
- [ ] Real-time updates (WebSockets)
- [ ] File uploads (S3)
- [ ] GraphQL API layer

## Troubleshooting

**Database connection error?**
- Verify PostgreSQL is running
- Check DATABASE_URL in .env
- Ensure database exists

**Prisma studio won't open?**
- Run `npm run prisma:generate` first
- Check database connection

**Type errors in routes?**
- Run `npm run prisma:generate` to update types
- Restart development server

## API Documentation

See [README.md](./README.md) for complete API endpoint documentation with examples.

## Support

For issues or questions:
1. Check the README.md for detailed docs
2. Review Prisma documentation: https://www.prisma.io/docs/
3. Check Express.js docs: https://expressjs.com/

---

**Happy coding! 🚀**
