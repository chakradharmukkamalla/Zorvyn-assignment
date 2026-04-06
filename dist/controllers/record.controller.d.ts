import { Request, Response } from 'express';
export declare const recordController: {
    getAll(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    create(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    update(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    delete(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getSummary(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getCategoryTotals(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getRecentTransactions(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getMonthlySummary(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
};
//# sourceMappingURL=record.controller.d.ts.map