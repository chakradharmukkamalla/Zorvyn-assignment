import { Request, Response } from 'express';
import { recordService } from '../services/record.service';
import {
  successResponse,
  notFoundResponse,
  badRequestResponse,
  createdResponse,
} from '../utils/response';
import {
  validateRequest,
  createRecordSchema,
  updateRecordSchema,
  recordFilterSchema,
} from '../utils/validation';

export const recordController = {
  async getAll(req: Request, res: Response) {
    const validation = validateRequest(recordFilterSchema, req.query);
    if (!validation.success) {
      return badRequestResponse(res, validation.error);
    }

    try {
      const result = await recordService.getAll(validation.data);
      return successResponse(res, result);
    } catch (error: any) {
      return badRequestResponse(res, error.message);
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const record = await recordService.getById(id);
      if (!record || record.isDeleted) {
        return notFoundResponse(res, 'Record not found');
      }
      return successResponse(res, record);
    } catch (error: any) {
      return badRequestResponse(res, error.message);
    }
  },

  async create(req: Request, res: Response) {
    const validation = validateRequest(createRecordSchema, req.body);
    if (!validation.success) {
      return badRequestResponse(res, validation.error);
    }

    try {
      const record = await recordService.create({
        ...validation.data,
        userId: req.user!.id,
      });
      return createdResponse(res, record, 'Record created successfully');
    } catch (error: any) {
      return badRequestResponse(res, error.message);
    }
  },

  async update(req: Request, res: Response) {
    const validation = validateRequest(updateRecordSchema, req.body);
    if (!validation.success) {
      return badRequestResponse(res, validation.error);
    }

    try {
      const { id } = req.params;
      const record = await recordService.update(id, validation.data);
      if (!record) {
        return notFoundResponse(res, 'Record not found');
      }
      return successResponse(res, record, 'Record updated successfully');
    } catch (error: any) {
      return badRequestResponse(res, error.message);
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await recordService.delete(id);
      return successResponse(res, null, 'Record deleted successfully');
    } catch (error: any) {
      return badRequestResponse(res, error.message);
    }
  },

  // Dashboard APIs
  async getSummary(req: Request, res: Response) {
    try {
      const summary = await recordService.getSummary();
      return successResponse(res, summary);
    } catch (error: any) {
      return badRequestResponse(res, error.message);
    }
  },

  async getCategoryTotals(req: Request, res: Response) {
    try {
      const totals = await recordService.getCategoryTotals();
      return successResponse(res, totals);
    } catch (error: any) {
      return badRequestResponse(res, error.message);
    }
  },

  async getRecentTransactions(req: Request, res: Response) {
    try {
      const limit = parseInt(req.query.limit as string, 10) || 10;
      const records = await recordService.getRecentTransactions(limit);
      return successResponse(res, records);
    } catch (error: any) {
      return badRequestResponse(res, error.message);
    }
  },

  async getMonthlySummary(req: Request, res: Response) {
    try {
      const summary = await recordService.getMonthlySummary();
      return successResponse(res, summary);
    } catch (error: any) {
      return badRequestResponse(res, error.message);
    }
  },
};
