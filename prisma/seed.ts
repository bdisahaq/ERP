import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create categories
  const electronics = await prisma.category.create({
    data: {
      name: 'Electronics',
      description: 'Electronic equipment and devices',
    },
  });

  const furniture = await prisma.category.create({
    data: {
      name: 'Furniture',
      description: 'Office and home furniture',
    },
  });

  // Create supplier
  const supplier = await prisma.supplier.create({
    data: {
      name: 'Tech Supplies Inc',
      email: 'contact@techsupplies.com',
      phone: '555-0100',
      companyName: 'Tech Supplies Inc',
      contactPerson: 'John Doe',
      billingAddress: '123 Business Ave',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
      taxId: 'TAX12345',
    },
  });

  // Create products
  const product1 = await prisma.product.create({
    data: {
      sku: 'LAPTOP-001',
      name: 'Dell Laptop',
      description: 'High-performance laptop',
      categoryId: electronics.id,
      supplierId: supplier.id,
      costPrice: 600,
      sellingPrice: 999,
      quantity: 50,
      reorderLevel: 10,
    },
  });

  const product2 = await prisma.product.create({
    data: {
      sku: 'DESK-001',
      name: 'Office Desk',
      description: 'Wooden office desk',
      categoryId: furniture.id,
      supplierId: supplier.id,
      costPrice: 150,
      sellingPrice: 299,
      quantity: 30,
      reorderLevel: 5,
    },
  });

  // Create customer
  const customer = await prisma.customer.create({
    data: {
      name: 'Acme Corp',
      email: 'orders@acmecorp.com',
      phone: '555-0101',
      companyName: 'Acme Corporation',
      contactPerson: 'Jane Smith',
      billingAddress: '456 Commerce St',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90001',
      country: 'USA',
      creditLimit: 50000,
    },
  });

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@erp.com',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
    },
  });

  // Create accounts
  const assetsAccount = await prisma.account.create({
    data: {
      accountNo: '1000',
      accountName: 'Cash',
      accountType: 'ASSET',
      balance: 100000,
    },
  });

  const revenueAccount = await prisma.account.create({
    data: {
      accountNo: '4000',
      accountName: 'Sales Revenue',
      accountType: 'REVENUE',
    },
  });

  console.log('✅ Database seeded successfully!');
  console.log('Sample data created:');
  console.log('- Admin user:', adminUser.email);
  console.log('- Supplier:', supplier.name);
  console.log('- Products:', product1.name, ',', product2.name);
  console.log('- Customer:', customer.name);
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
