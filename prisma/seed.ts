import prisma from '../src/database/prisma';
import bcrypt from 'bcryptjs';

async function main() {
  console.log('Seeding database...');

  // Create users
  const hashedPassword = await bcrypt.hash('password123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'ADMIN',
      active: true,
    },
  });

  const analyst = await prisma.user.upsert({
    where: { email: 'analyst@example.com' },
    update: {},
    create: {
      email: 'analyst@example.com',
      password: hashedPassword,
      name: 'Analyst User',
      role: 'ANALYST',
      active: true,
    },
  });

  const viewer = await prisma.user.upsert({
    where: { email: 'viewer@example.com' },
    update: {},
    create: {
      email: 'viewer@example.com',
      password: hashedPassword,
      name: 'Viewer User',
      role: 'VIEWER',
      active: true,
    },
  });

  console.log('Created users:', { admin, analyst, viewer });

  // Create financial records
  const now = new Date();
  const records = [
    { amount: 5000, type: 'INCOME', category: 'Salary', date: new Date(now.getFullYear(), now.getMonth(), 1), notes: 'Monthly salary', userId: admin.id },
    { amount: 1500, type: 'INCOME', category: 'Freelance', date: new Date(now.getFullYear(), now.getMonth(), 5), notes: 'Project payment', userId: admin.id },
    { amount: 500, type: 'EXPENSE', category: 'Rent', date: new Date(now.getFullYear(), now.getMonth(), 2), notes: 'Monthly rent', userId: admin.id },
    { amount: 200, type: 'EXPENSE', category: 'Utilities', date: new Date(now.getFullYear(), now.getMonth(), 3), notes: 'Electricity bill', userId: admin.id },
    { amount: 150, type: 'EXPENSE', category: 'Groceries', date: new Date(now.getFullYear(), now.getMonth(), 4), notes: 'Weekly groceries', userId: admin.id },
    { amount: 3000, type: 'INCOME', category: 'Salary', date: new Date(now.getFullYear(), now.getMonth() - 1, 1), notes: 'Previous month salary', userId: admin.id },
    { amount: 400, type: 'EXPENSE', category: 'Rent', date: new Date(now.getFullYear(), now.getMonth() - 1, 2), notes: 'Previous month rent', userId: admin.id },
    { amount: 180, type: 'EXPENSE', category: 'Utilities', date: new Date(now.getFullYear(), now.getMonth() - 1, 3), notes: 'Previous month utilities', userId: admin.id },
    { amount: 800, type: 'EXPENSE', category: 'Entertainment', date: new Date(now.getFullYear(), now.getMonth() - 1, 15), notes: 'Movies and games', userId: admin.id },
    { amount: 2500, type: 'INCOME', category: 'Salary', date: new Date(now.getFullYear(), now.getMonth() - 2, 1), notes: 'Two months ago salary', userId: admin.id },
  ];

  for (const record of records) {
    await prisma.financialRecord.create({ data: record });
  }

  console.log('Created financial records');

  console.log('Seeding completed!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
