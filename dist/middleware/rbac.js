"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isViewerOrAbove = exports.isAnalystOrAdmin = exports.isAdmin = exports.requireRole = void 0;
const response_1 = require("../utils/response");
const requireRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return (0, response_1.forbiddenResponse)(res, 'Authentication required');
        }
        const userRole = req.user.role;
        if (!allowedRoles.includes(userRole)) {
            return (0, response_1.forbiddenResponse)(res, 'Insufficient permissions');
        }
        next();
    };
};
exports.requireRole = requireRole;
exports.isAdmin = (0, exports.requireRole)('ADMIN');
exports.isAnalystOrAdmin = (0, exports.requireRole)('ANALYST', 'ADMIN');
exports.isViewerOrAbove = (0, exports.requireRole)('VIEWER', 'ANALYST', 'ADMIN');
//# sourceMappingURL=rbac.js.map