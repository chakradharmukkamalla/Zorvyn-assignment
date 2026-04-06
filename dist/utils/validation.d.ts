import { z } from 'zod';
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const registerSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    name: z.ZodString;
    role: z.ZodOptional<z.ZodEnum<["VIEWER", "ANALYST", "ADMIN"]>>;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    name: string;
    role?: "VIEWER" | "ANALYST" | "ADMIN" | undefined;
}, {
    email: string;
    password: string;
    name: string;
    role?: "VIEWER" | "ANALYST" | "ADMIN" | undefined;
}>;
export declare const updateUserSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodEnum<["VIEWER", "ANALYST", "ADMIN"]>>;
    isActive: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    role?: "VIEWER" | "ANALYST" | "ADMIN" | undefined;
    isActive?: boolean | undefined;
}, {
    name?: string | undefined;
    role?: "VIEWER" | "ANALYST" | "ADMIN" | undefined;
    isActive?: boolean | undefined;
}>;
export declare const createRecordSchema: z.ZodObject<{
    amount: z.ZodNumber;
    type: z.ZodEnum<["INCOME", "EXPENSE"]>;
    category: z.ZodString;
    date: z.ZodString;
    notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    type: "INCOME" | "EXPENSE";
    amount: number;
    date: string;
    category: string;
    notes?: string | undefined;
}, {
    type: "INCOME" | "EXPENSE";
    amount: number;
    date: string;
    category: string;
    notes?: string | undefined;
}>;
export declare const updateRecordSchema: z.ZodObject<{
    amount: z.ZodOptional<z.ZodNumber>;
    type: z.ZodOptional<z.ZodEnum<["INCOME", "EXPENSE"]>>;
    category: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    type?: "INCOME" | "EXPENSE" | undefined;
    amount?: number | undefined;
    date?: string | undefined;
    category?: string | undefined;
    notes?: string | undefined;
}, {
    type?: "INCOME" | "EXPENSE" | undefined;
    amount?: number | undefined;
    date?: string | undefined;
    category?: string | undefined;
    notes?: string | undefined;
}>;
export declare const recordFilterSchema: z.ZodObject<{
    startDate: z.ZodOptional<z.ZodString>;
    endDate: z.ZodOptional<z.ZodString>;
    category: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodEnum<["INCOME", "EXPENSE"]>>;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    search: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    type?: "INCOME" | "EXPENSE" | undefined;
    category?: string | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    search?: string | undefined;
}, {
    type?: "INCOME" | "EXPENSE" | undefined;
    category?: string | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    search?: string | undefined;
}>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type CreateRecordInput = z.infer<typeof createRecordSchema>;
export type UpdateRecordInput = z.infer<typeof updateRecordSchema>;
export type RecordFilterInput = z.infer<typeof recordFilterSchema>;
export declare const validateRequest: <T>(schema: z.Schema<T>, data: unknown) => {
    success: true;
    data: T;
} | {
    success: false;
    error: string;
};
//# sourceMappingURL=validation.d.ts.map