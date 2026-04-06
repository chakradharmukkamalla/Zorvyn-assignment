import prisma from '../database/prisma';
import { isValidRecordType, RECORD_TYPES } from '../utils/constants';

interface RecordFilter {
  startDate?: string;
  endDate?: string;
  category?: string;
  type?: string;
  page?: number;
  limit?: number;
  search?: string;
}

export const recordService = {
  async getAll(filter: RecordFilter = {}) {
    const {
      startDate,
      endDate,
      category,
      type,
      page = 1,
      limit = 10,
      search,
    } = filter;
    const skip = (page - 1) * limit;

    const where: any = { isDeleted: false };

    if (startDate || endDate) {
      where.date = {};
      if (startDate) where.date.gte = new Date(startDate);
      if (endDate) where.date.lte = new Date(endDate);
    }
    if (category) where.category = category;
    if (type) where.type = type;
    if (search) {
      where.OR = [
        { notes: { contains: search } },
        { category: { contains: search } },
      ];
    }

    const [records, total] = await Promise.all([
      prisma.financialRecord.findMany({
        where,
        skip,
        take: limit,
        include: {
          user: {
            select: { id: true, name: true, email: true },
          },
        },
        orderBy: { date: 'desc' },
      }),
      prisma.financialRecord.count({ where }),
    ]);

    return {
      records,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  async getById(id: string) {
    const record = await prisma.financialRecord.findUnique({
      where: { id },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    });
    return record;
  },

  async create(data: {
    amount: number;
    type: string;
    category: string;
    date: string;
    notes?: string;
    userId: string;
  }) {
    // Validate type against constants
    if (!isValidRecordType(data.type)) {
      throw new Error(`Invalid record type. Must be one of: ${RECORD_TYPES.join(', ')}`);
    }

    const record = await prisma.financialRecord.create({
      data: {
        amount: data.amount,
        type: data.type,
        category: data.category,
        date: new Date(data.date),
        notes: data.notes,
        userId: data.userId,
      },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    });
    return record;
  },

  async update(
    id: string,
    data: {
      amount?: number;
      type?: string;
      category?: string;
      date?: string;
      notes?: string;
    }
  ) {
    // Validate type if provided
    if (data.type && !isValidRecordType(data.type)) {
      throw new Error(`Invalid record type. Must be one of: ${RECORD_TYPES.join(', ')}`);
    }

    const updateData: any = {};
    if (data.amount !== undefined) updateData.amount = data.amount;
    if (data.type !== undefined) updateData.type = data.type;
    if (data.category !== undefined) updateData.category = data.category;
    if (data.date !== undefined) updateData.date = new Date(data.date);
    if (data.notes !== undefined) updateData.notes = data.notes;

    const record = await prisma.financialRecord.update({
      where: { id },
      data: updateData,
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    });
    return record;
  },

  async delete(id: string) {
    // Soft delete
    await prisma.financialRecord.update({
      where: { id },
      data: { isDeleted: true },
    });
    return { message: 'Record deleted successfully' };
  },

  async getSummary() {
    const records = await prisma.financialRecord.findMany({
      where: { isDeleted: false },
      select: { amount: true, type: true },
    });

    const totalIncome = records
      .filter(r => r.type === 'INCOME')
      .reduce((sum, r) => sum + r.amount, 0);

    const totalExpenses = records
      .filter(r => r.type === 'EXPENSE')
      .reduce((sum, r) => sum + r.amount, 0);

    return {
      totalIncome,
      totalExpenses,
      netBalance: totalIncome - totalExpenses,
    };
  },

  async getCategoryTotals() {
    const records = await prisma.financialRecord.findMany({
      where: { isDeleted: false },
      select: { amount: true, type: true, category: true },
    });

    const categoryMap = new Map<string, { income: number; expense: number }>();

    records.forEach(r => {
      const current = categoryMap.get(r.category) || { income: 0, expense: 0 };
      if (r.type === 'INCOME') {
        current.income += r.amount;
      } else {
        current.expense += r.amount;
      }
      categoryMap.set(r.category, current);
    });

    return Object.fromEntries(categoryMap);
  },

  async getRecentTransactions(limit: number = 10) {
    const records = await prisma.financialRecord.findMany({
      where: { isDeleted: false },
      take: limit,
      include: {
        user: {
          select: { id: true, name: true },
        },
      },
      orderBy: { date: 'desc' },
    });
    return records;
  },

  async getMonthlySummary() {
    const records = await prisma.financialRecord.findMany({
      where: { isDeleted: false },
      select: { amount: true, type: true, date: true },
    });

    const monthlyMap = new Map<string, { income: number; expense: number }>();

    records.forEach(r => {
      const month = r.date.toISOString().substring(0, 7);
      const current = monthlyMap.get(month) || { income: 0, expense: 0 };
      if (r.type === 'INCOME') {
        current.income += r.amount;
      } else {
        current.expense += r.amount;
      }
      monthlyMap.set(month, current);
    });

    return Object.fromEntries(monthlyMap);
  },
};
