"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recordController = void 0;
const record_service_1 = require("../services/record.service");
const response_1 = require("../utils/response");
const validation_1 = require("../utils/validation");
exports.recordController = {
    async getAll(req, res) {
        const validation = (0, validation_1.validateRequest)(validation_1.recordFilterSchema, req.query);
        if (!validation.success) {
            return (0, response_1.badRequestResponse)(res, validation.error);
        }
        try {
            const result = await record_service_1.recordService.getAll(validation.data);
            return (0, response_1.successResponse)(res, result);
        }
        catch (error) {
            return (0, response_1.badRequestResponse)(res, error.message);
        }
    },
    async getById(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            const record = await record_service_1.recordService.getById(id);
            if (!record || record.isDeleted) {
                return (0, response_1.notFoundResponse)(res, 'Record not found');
            }
            return (0, response_1.successResponse)(res, record);
        }
        catch (error) {
            return (0, response_1.badRequestResponse)(res, error.message);
        }
    },
    async create(req, res) {
        const validation = (0, validation_1.validateRequest)(validation_1.createRecordSchema, req.body);
        if (!validation.success) {
            return (0, response_1.badRequestResponse)(res, validation.error);
        }
        try {
            const record = await record_service_1.recordService.create({
                ...validation.data,
                createdBy: req.user.id,
            });
            return (0, response_1.createdResponse)(res, record, 'Record created successfully');
        }
        catch (error) {
            return (0, response_1.badRequestResponse)(res, error.message);
        }
    },
    async update(req, res) {
        const validation = (0, validation_1.validateRequest)(validation_1.updateRecordSchema, req.body);
        if (!validation.success) {
            return (0, response_1.badRequestResponse)(res, validation.error);
        }
        try {
            const id = parseInt(req.params.id, 10);
            const record = await record_service_1.recordService.update(id, validation.data);
            if (!record) {
                return (0, response_1.notFoundResponse)(res, 'Record not found');
            }
            return (0, response_1.successResponse)(res, record, 'Record updated successfully');
        }
        catch (error) {
            return (0, response_1.badRequestResponse)(res, error.message);
        }
    },
    async delete(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            await record_service_1.recordService.delete(id);
            return (0, response_1.successResponse)(res, null, 'Record deleted successfully');
        }
        catch (error) {
            return (0, response_1.badRequestResponse)(res, error.message);
        }
    },
    // Dashboard APIs
    async getSummary(req, res) {
        try {
            const summary = await record_service_1.recordService.getSummary();
            return (0, response_1.successResponse)(res, summary);
        }
        catch (error) {
            return (0, response_1.badRequestResponse)(res, error.message);
        }
    },
    async getCategoryTotals(req, res) {
        try {
            const totals = await record_service_1.recordService.getCategoryTotals();
            return (0, response_1.successResponse)(res, totals);
        }
        catch (error) {
            return (0, response_1.badRequestResponse)(res, error.message);
        }
    },
    async getRecentTransactions(req, res) {
        try {
            const limit = parseInt(req.query.limit, 10) || 10;
            const records = await record_service_1.recordService.getRecentTransactions(limit);
            return (0, response_1.successResponse)(res, records);
        }
        catch (error) {
            return (0, response_1.badRequestResponse)(res, error.message);
        }
    },
    async getMonthlySummary(req, res) {
        try {
            const summary = await record_service_1.recordService.getMonthlySummary();
            return (0, response_1.successResponse)(res, summary);
        }
        catch (error) {
            return (0, response_1.badRequestResponse)(res, error.message);
        }
    },
};
//# sourceMappingURL=record.controller.js.map