import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const userService = {
  async registerUser(email: string, password: string, firstName: string, lastName: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
      },
    });
  },

  async loginUser(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '24h' }
    );

    return { user, token };
  },

  async getUserById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      select: { id: true, email: true, firstName: true, lastName: true, role: true },
    });
  },

  async getAllUsers() {
    return prisma.user.findMany({
      select: { id: true, email: true, firstName: true, lastName: true, role: true, isActive: true },
    });
  },

  async updateUser(id: string, data: any) {
    return prisma.user.update({
      where: { id },
      data,
      select: { id: true, email: true, firstName: true, lastName: true, role: true },
    });
  },

  async deleteUser(id: string) {
    return prisma.user.delete({ where: { id } });
  },
};

export const customerService = {
  async createCustomer(data: any) {
    return prisma.customer.create({ data });
  },

  async getCustomerById(id: string) {
    return prisma.customer.findUnique({
      where: { id },
      include: { orders: true, invoices: true },
    });
  },

  async getAllCustomers() {
    return prisma.customer.findMany();
  },

  async updateCustomer(id: string, data: any) {
    return prisma.customer.update({ where: { id }, data });
  },

  async deleteCustomer(id: string) {
    return prisma.customer.delete({ where: { id } });
  },
};

export const productService = {
  async createProduct(data: any) {
    const product = await prisma.product.create({ data });
    
    // Create inventory record
    await prisma.inventory.create({
      data: {
        productId: product.id,
        quantityOnHand: data.quantity,
        quantityAvailable: data.quantity,
      },
    });

    return product;
  },

  async getProductById(id: string) {
    return prisma.product.findUnique({
      where: { id },
      include: { category: true, supplier: true, inventory: true },
    });
  },

  async getAllProducts() {
    return prisma.product.findMany({
      include: { category: true, supplier: true, inventory: true },
    });
  },

  async updateProduct(id: string, data: any) {
    return prisma.product.update({ where: { id }, data });
  },

  async deleteProduct(id: string) {
    return prisma.product.delete({ where: { id } });
  },
};

export const orderService = {
  async createOrder(data: any) {
    return prisma.order.create({
      data,
      include: { items: true, customer: true },
    });
  },

  async getOrderById(id: string) {
    return prisma.order.findUnique({
      where: { id },
      include: { items: { include: { product: true } }, customer: true },
    });
  },

  async getAllOrders() {
    return prisma.order.findMany({
      include: { items: true, customer: true },
    });
  },

  async updateOrderStatus(id: string, status: string) {
    return prisma.order.update({
      where: { id },
      data: { status },
    });
  },
};

export const invoiceService = {
  async createInvoice(data: any) {
    return prisma.invoice.create({
      data,
      include: { customer: true, order: true, payments: true },
    });
  },

  async getInvoiceById(id: string) {
    return prisma.invoice.findUnique({
      where: { id },
      include: { customer: true, order: true, payments: true },
    });
  },

  async getAllInvoices() {
    return prisma.invoice.findMany({
      include: { customer: true, order: true, payments: true },
    });
  },

  async updateInvoiceStatus(id: string, status: string) {
    return prisma.invoice.update({
      where: { id },
      data: { status },
    });
  },
};

export const supplierService = {
  async createSupplier(data: any) {
    return prisma.supplier.create({ data });
  },

  async getSupplierById(id: string) {
    return prisma.supplier.findUnique({
      where: { id },
      include: { products: true, purchaseOrders: true },
    });
  },

  async getAllSuppliers() {
    return prisma.supplier.findMany();
  },

  async updateSupplier(id: string, data: any) {
    return prisma.supplier.update({ where: { id }, data });
  },

  async deleteSupplier(id: string) {
    return prisma.supplier.delete({ where: { id } });
  },
};
