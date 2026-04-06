"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = exports.recordFilterSchema = exports.updateRecordSchema = exports.createRecordSchema = exports.updateUserSchema = exports.registerSchema = exports.loginSchema = void 0;
const zod_1 = require("zod");
// Auth Schemas
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email format'),
    password: zod_1.z.string().min(1, 'Password is required'),
});
exports.registerSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email format'),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters'),
    name: zod_1.z.string().min(1, 'Name is required'),
    role: zod_1.z.enum(['VIEWER', 'ANALYST', 'ADMIN']).optional(),
});
// User Schemas
exports.updateUserSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).optional(),
    role: zod_1.z.enum(['VIEWER', 'ANALYST', 'ADMIN']).optional(),
    isActive: zod_1.z.boolean().optional(),
});
// Financial Record Schemas
exports.createRecordSchema = zod_1.z.object({
    amount: zod_1.z.number().positive('Amount must be positive'),
    type: zod_1.z.enum(['INCOME', 'EXPENSE']),
    category: zod_1.z.string().min(1, 'Category is required'),
    date: zod_1.z.string().datetime(),
    notes: zod_1.z.string().optional(),
});
exports.updateRecordSchema = zod_1.z.object({
    amount: zod_1.z.number().positive().optional(),
    type: zod_1.z.enum(['INCOME', 'EXPENSE']).optional(),
    category: zod_1.z.string().min(1).optional(),
    date: zod_1.z.string().datetime().optional(),
    notes: zod_1.z.string().optional(),
});
exports.recordFilterSchema = zod_1.z.object({
    startDate: zod_1.z.string().datetime().optional(),
    endDate: zod_1.z.string().datetime().optional(),
    category: zod_1.z.string().optional(),
    type: zod_1.z.enum(['INCOME', 'EXPENSE']).optional(),
    page: zod_1.z.coerce.number().min(1).optional(),
    limit: zod_1.z.coerce.number().min(1).max(100).optional(),
    search: zod_1.z.string().optional(),
});
const validateRequest = (schema, data) => {
    const result = schema.safeParse(data);
    if (result.success) {
        return { success: true, data: result.data };
    }
    const errors = result.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
    return { success: false, error: errors };
};
exports.validateRequest = validateRequest;
//# sourceMappingURL=validation.js.map