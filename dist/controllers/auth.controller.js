"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const auth_service_1 = require("../services/auth.service");
const response_1 = require("../utils/response");
const validation_1 = require("../utils/validation");
exports.authController = {
    async register(req, res) {
        const validation = (0, validation_1.validateRequest)(validation_1.registerSchema, req.body);
        if (!validation.success) {
            return (0, response_1.badRequestResponse)(res, validation.error);
        }
        try {
            const { email, password, name, role } = validation.data;
            const user = await auth_service_1.authService.register(email, password, name, role);
            return (0, response_1.createdResponse)(res, user, 'User registered successfully');
        }
        catch (error) {
            return (0, response_1.badRequestResponse)(res, error.message);
        }
    },
    async login(req, res) {
        const validation = (0, validation_1.validateRequest)(validation_1.loginSchema, req.body);
        if (!validation.success) {
            return (0, response_1.badRequestResponse)(res, validation.error);
        }
        try {
            const { email, password } = validation.data;
            const result = await auth_service_1.authService.login(email, password);
            return (0, response_1.successResponse)(res, result, 'Login successful');
        }
        catch (error) {
            return (0, response_1.badRequestResponse)(res, error.message);
        }
    },
    async getProfile(req, res) {
        try {
            const user = await auth_service_1.authService.getProfile(req.user.id);
            if (!user) {
                return (0, response_1.badRequestResponse)(res, 'User not found');
            }
            return (0, response_1.successResponse)(res, user);
        }
        catch (error) {
            return (0, response_1.badRequestResponse)(res, error.message);
        }
    },
};
//# sourceMappingURL=auth.controller.js.map