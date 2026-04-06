interface RecordFilter {
    startDate?: string;
    endDate?: string;
    category?: string;
    type?: string;
    page?: number;
    limit?: number;
    search?: string;
}
export declare const recordService: {
    getAll(filter?: RecordFilter): Promise<{
        records: any;
        pagination: {
            page: number;
            limit: number;
            total: any;
            totalPages: number;
        };
    }>;
    getById(id: number): Promise<any>;
    create(data: {
        amount: number;
        type: string;
        category: string;
        date: string;
        notes?: string;
        createdBy: number;
    }): Promise<any>;
    update(id: number, data: {
        amount?: number;
        type?: string;
        category?: string;
        date?: string;
        notes?: string;
    }): Promise<any>;
    delete(id: number): Promise<{
        message: string;
    }>;
    getSummary(): Promise<{
        totalIncome: any;
        totalExpenses: any;
        netBalance: number;
    }>;
    getCategoryTotals(): Promise<{
        [k: string]: {
            income: number;
            expense: number;
        };
    }>;
    getRecentTransactions(limit?: number): Promise<any>;
    getMonthlySummary(): Promise<{
        [k: string]: {
            income: number;
            expense: number;
        };
    }>;
};
export {};
//# sourceMappingURL=record.service.d.ts.map