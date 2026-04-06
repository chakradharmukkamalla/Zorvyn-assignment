"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recordService = void 0;
const prisma_1 = __importDefault(require("../database/prisma"));
exports.recordService = {
    async getAll(filter = {}) {
        const { startDate, endDate, category, type, page = 1, limit = 10, search, } = filter;
        const skip = (page - 1) * limit;
        const where = { isDeleted: false };
        if (startDate || endDate) {
            where.date = {};
            if (startDate)
                where.date.gte = new Date(startDate);
            if (endDate)
                where.date.lte = new Date(endDate);
        }
        if (category)
            where.category = category;
        if (type)
            where.type = type;
        if (search) {
            where.OR = [
                { notes: { contains: search } },
                { category: { contains: search } },
            ];
        }
        const [records, total] = await Promise.all([
            prisma_1.default.financialRecord.findMany({
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
            prisma_1.default.financialRecord.count({ where }),
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
    async getById(id) {
        const record = await prisma_1.default.financialRecord.findUnique({
            where: { id },
            include: {
                user: {
                    select: { id: true, name: true, email: true },
                },
            },
        });
        return record;
    },
    async create(data) {
        const record = await prisma_1.default.financialRecord.create({
            data: {
                amount: data.amount,
                type: data.type,
                category: data.category,
                date: new Date(data.date),
                notes: data.notes,
                createdBy: data.createdBy,
            },
            include: {
                user: {
                    select: { id: true, name: true, email: true },
                },
            },
        });
        return record;
    },
    async update(id, data) {
        const updateData = {};
        if (data.amount !== undefined)
            updateData.amount = data.amount;
        if (data.type !== undefined)
            updateData.type = data.type;
        if (data.category !== undefined)
            updateData.category = data.category;
        if (data.date !== undefined)
            updateData.date = new Date(data.date);
        if (data.notes !== undefined)
            updateData.notes = data.notes;
        const record = await prisma_1.default.financialRecord.update({
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
    async delete(id) {
        // Soft delete
        await prisma_1.default.financialRecord.update({
            where: { id },
            data: { isDeleted: true },
        });
        return { message: 'Record deleted successfully' };
    },
    async getSummary() {
        const records = await prisma_1.default.financialRecord.findMany({
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
        const records = await prisma_1.default.financialRecord.findMany({
            where: { isDeleted: false },
            select: { amount: true, type: true, category: true },
        });
        const categoryMap = new Map();
        records.forEach(r => {
            const current = categoryMap.get(r.category) || { income: 0, expense: 0 };
            if (r.type === 'INCOME') {
                current.income += r.amount;
            }
            else {
                current.expense += r.amount;
            }
            categoryMap.set(r.category, current);
        });
        return Object.fromEntries(categoryMap);
    },
    async getRecentTransactions(limit = 10) {
        const records = await prisma_1.default.financialRecord.findMany({
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
        const records = await prisma_1.default.financialRecord.findMany({
            where: { isDeleted: false },
            select: { amount: true, type: true, date: true },
        });
        const monthlyMap = new Map();
        records.forEach(r => {
            const month = r.date.toISOString().substring(0, 7);
            const current = monthlyMap.get(month) || { income: 0, expense: 0 };
            if (r.type === 'INCOME') {
                current.income += r.amount;
            }
            else {
                current.expense += r.amount;
            }
            monthlyMap.set(month, current);
        });
        return Object.fromEntries(monthlyMap);
    },
};
//# sourceMappingURL=record.service.js.map