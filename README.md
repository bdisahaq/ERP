# ERP Backend

Enterprise Resource Planning Backend built with Express.js, Prisma, and TypeScript.

## 📋 Features

### User Management
- User authentication and authorization
- Role-based access control (Admin, Manager, Supplier, Customer, User)
- Employee management with departments and positions

### Customer Management
- CRUD operations for customers
- Customer orders and invoicing
- Payment tracking
- Credit limit management

### Product Management
- Product catalog with categories
- SKU management
- Inventory tracking
- Cost and selling price management
- Reorder level alerts

### Order Management
- Sales orders with status tracking
- Order items with pricing
- Multiple order statuses (Pending, Confirmed, Processing, Shipped, Delivered, etc.)

### Supplier Management
- Supplier information management
- Purchase orders
- Payment tracking to suppliers
- Purchase order items

### Invoicing
- Invoice generation from orders
- Invoice status tracking
- Payment recording and reconciliation
- Partial payment support

### Accounting
- Chart of accounts (Assets, Liabilities, Equity, Revenue, Expense)
- Transaction logging
- Debit/Credit recording

### Inventory Management
- Real-time stock tracking
- Warehouse location tracking
- Reserved quantity tracking
- Available quantity calculation

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 12+
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository>
cd ERP
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
cp .env.example .env
```

Edit `.env` with your database credentials and JWT secret:
```
DATABASE_URL="postgresql://user:password@localhost:5432/erp_db"
PORT=3000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_here
```

4. **Create database and run migrations**
```bash
npm run prisma:migrate
```

5. **Seed database with sample data**
```bash
npm run prisma:seed
```

6. **Start development server**
```bash
npm run dev
```

The API will be available at `http://localhost:3000`

## 📚 API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login and get JWT token

### Users
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user (Admin only)
- `DELETE /api/users/:id` - Delete user (Admin only)

### Customers
- `GET /api/customers` - List all customers
- `POST /api/customers` - Create new customer
- `GET /api/customers/:id` - Get customer details
- `PUT /api/customers/:id` - Update customer
- `DELETE /api/customers/:id` - Delete customer

### Products
- `GET /api/products` - List all products with inventory
- `POST /api/products` - Create new product
- `GET /api/products/:id` - Get product details
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Orders
- `GET /api/orders` - List all orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order details
- `PATCH /api/orders/:id/status` - Update order status

### Invoices
- `GET /api/invoices` - List all invoices
- `POST /api/invoices` - Create new invoice
- `GET /api/invoices/:id` - Get invoice details
- `PATCH /api/invoices/:id/status` - Update invoice status

### Suppliers
- `GET /api/suppliers` - List all suppliers
- `POST /api/suppliers` - Create new supplier
- `GET /api/suppliers/:id` - Get supplier details
- `PUT /api/suppliers/:id` - Update supplier
- `DELETE /api/suppliers/:id` - Delete supplier

## 🏗️ Database Schema

The database includes the following main tables:

- **users** - Application users with roles
- **employees** - Employee information linked to users
- **customers** - Customer details and contact information
- **suppliers** - Supplier information for purchases
- **products** - Product catalog with pricing
- **categories** - Product categories
- **inventory** - Stock tracking per product
- **orders** - Customer sales orders
- **order_items** - Line items in orders
- **purchase_orders** - Supplier purchase orders
- **purchase_order_items** - Line items in purchase orders
- **invoices** - Customer invoices
- **payments** - Customer payment records
- **supplier_payments** - Supplier payment records
- **accounts** - Chart of accounts
- **transactions** - Accounting transactions

## 🔒 Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## 📋 Scripts

```bash
npm run dev              # Start development server
npm run build           # Build TypeScript to JavaScript
npm start              # Run production build
npm run prisma:generate # Generate Prisma client
npm run prisma:migrate # Run migrations
npm run prisma:studio  # Open Prisma Studio
npm run prisma:seed    # Seed database with sample data
```

## 📁 Project Structure

```
src/
  ├── index.ts          # Express app entry point
  ├── middleware/
  │   └── auth.ts       # Authentication middleware
  ├── services/
  │   └── index.ts      # Business logic services
  └── routes/
      ├── users.ts      # User routes
      ├── customers.ts  # Customer routes
      ├── products.ts   # Product routes
      ├── orders.ts     # Order routes
      ├── invoices.ts   # Invoice routes
      └── suppliers.ts  # Supplier routes
prisma/
  ├── schema.prisma     # Database schema
  ├── migrations/       # Database migrations
  └── seed.ts          # Sample data seeding
```

## 🔧 Configuration

### JWT Expiration
Tokens expire after 24 hours. Implement token refresh logic in your frontend.

### Role-Based Access Control
- **ADMIN** - Full system access
- **MANAGER** - Can manage orders, invoices, products
- **SUPPLIER** - Can manage purchase orders and products
- **CUSTOMER** - Can view own orders and invoices
- **USER** - Basic read access

## 🚨 Error Handling

All endpoints return standard HTTP status codes:
- `200 OK` - Successful retrieval
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid input
- `401 Unauthorized` - Missing or invalid token
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

## 📝 Example Usage

### Register a User
```bash
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### Get Customers (Requires Token)
```bash
curl -X GET http://localhost:3000/api/customers \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 📚 Further Development

Implement the following features:
- [ ] Reports and analytics
- [ ] Dashboard with KPIs
- [ ] Email notifications
- [ ] Document generation (PDF invoices)
- [ ] API documentation with Swagger/OpenAPI
- [ ] Unit and integration tests
- [ ] Logging and monitoring
- [ ] Multi-tenant support
- [ ] Webhooks integration
- [ ] API rate limiting

## 📄 License

MIT License

## 👤 Author

Your Name

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
