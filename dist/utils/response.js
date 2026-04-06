"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationErrorResponse = exports.badRequestResponse = exports.notFoundResponse = exports.forbiddenResponse = exports.unauthorizedResponse = exports.errorResponse = exports.createdResponse = exports.successResponse = void 0;
const successResponse = (res, data, message = 'Success') => {
    const response = {
        success: true,
        message,
        data,
    };
    return res.status(200).json(response);
};
exports.successResponse = successResponse;
const createdResponse = (res, data, message = 'Created successfully') => {
    const response = {
        success: true,
        message,
        data,
    };
    return res.status(201).json(response);
};
exports.createdResponse = createdResponse;
const errorResponse = (res, message = 'An error occurred', statusCode = 500) => {
    const response = {
        success: false,
        error: message,
    };
    return res.status(statusCode).json(response);
};
exports.errorResponse = errorResponse;
const unauthorizedResponse = (res, message = 'Unauthorized') => {
    return (0, exports.errorResponse)(res, message, 401);
};
exports.unauthorizedResponse = unauthorizedResponse;
const forbiddenResponse = (res, message = 'Forbidden') => {
    return (0, exports.errorResponse)(res, message, 403);
};
exports.forbiddenResponse = forbiddenResponse;
const notFoundResponse = (res, message = 'Resource not found') => {
    return (0, exports.errorResponse)(res, message, 404);
};
exports.notFoundResponse = notFoundResponse;
const badRequestResponse = (res, message = 'Bad request') => {
    return (0, exports.errorResponse)(res, message, 400);
};
exports.badRequestResponse = badRequestResponse;
const validationErrorResponse = (res, message = 'Validation failed') => {
    return (0, exports.errorResponse)(res, message, 422);
};
exports.validationErrorResponse = validationErrorResponse;
//# sourceMappingURL=response.js.map