"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("../services/user.service");
const response_1 = require("../utils/response");
const validation_1 = require("../utils/validation");
exports.userController = {
    async getAll(req, res) {
        try {
            const { page, limit, search } = req.query;
            const result = await user_service_1.userService.getAll({
                page: page ? parseInt(page, 10) : undefined,
                limit: limit ? parseInt(limit, 10) : undefined,
                search: search,
            });
            return (0, response_1.successResponse)(res, result);
        }
        catch (error) {
            return (0, response_1.badRequestResponse)(res, error.message);
        }
    },
    async getById(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            const user = await user_service_1.userService.getById(id);
            if (!user) {
                return (0, response_1.notFoundResponse)(res, 'User not found');
            }
            return (0, response_1.successResponse)(res, user);
        }
        catch (error) {
            return (0, response_1.badRequestResponse)(res, error.message);
        }
    },
    async update(req, res) {
        const validation = (0, validation_1.validateRequest)(validation_1.updateUserSchema, req.body);
        if (!validation.success) {
            return (0, response_1.badRequestResponse)(res, validation.error);
        }
        try {
            const id = parseInt(req.params.id, 10);
            const user = await user_service_1.userService.update(id, validation.data);
            if (!user) {
                return (0, response_1.notFoundResponse)(res, 'User not found');
            }
            return (0, response_1.successResponse)(res, user, 'User updated successfully');
        }
        catch (error) {
            return (0, response_1.badRequestResponse)(res, error.message);
        }
    },
    async deactivate(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            const user = await user_service_1.userService.deactivate(id);
            if (!user) {
                return (0, response_1.notFoundResponse)(res, 'User not found');
            }
            return (0, response_1.successResponse)(res, user, 'User deactivated successfully');
        }
        catch (error) {
            return (0, response_1.badRequestResponse)(res, error.message);
        }
    },
    async activate(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            const user = await user_service_1.userService.activate(id);
            if (!user) {
                return (0, response_1.notFoundResponse)(res, 'User not found');
            }
            return (0, response_1.successResponse)(res, user, 'User activated successfully');
        }
        catch (error) {
            return (0, response_1.badRequestResponse)(res, error.message);
        }
    },
    async delete(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            await user_service_1.userService.delete(id);
            return (0, response_1.successResponse)(res, null, 'User deleted successfully');
        }
        catch (error) {
            return (0, response_1.badRequestResponse)(res, error.message);
        }
    },
};
//# sourceMappingURL=user.controller.js.map