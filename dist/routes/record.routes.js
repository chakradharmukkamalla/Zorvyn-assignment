"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const record_controller_1 = require("../controllers/record.controller");
const auth_1 = require("../middleware/auth");
const rbac_1 = require("../middleware/rbac");
const router = (0, express_1.Router)();
// Dashboard APIs - Viewer and above can access
router.use(auth_1.authenticate);
router.use(rbac_1.isViewerOrAbove);
// Dashboard summary endpoints
router.get('/summary', (req, res) => record_controller_1.recordController.getSummary(req, res));
router.get('/category-totals', (req, res) => record_controller_1.recordController.getCategoryTotals(req, res));
router.get('/recent', (req, res) => record_controller_1.recordController.getRecentTransactions(req, res));
router.get('/monthly', (req, res) => record_controller_1.recordController.getMonthlySummary(req, res));
// Record CRUD - Analyst and Admin can read, Admin can write
router.get('/', rbac_1.isAnalystOrAdmin, (req, res) => record_controller_1.recordController.getAll(req, res));
router.get('/:id', rbac_1.isAnalystOrAdmin, (req, res) => record_controller_1.recordController.getById(req, res));
// Admin only - Create, Update, Delete
router.post('/', rbac_1.isAdmin, (req, res) => record_controller_1.recordController.create(req, res));
router.put('/:id', rbac_1.isAdmin, (req, res) => record_controller_1.recordController.update(req, res));
router.delete('/:id', rbac_1.isAdmin, (req, res) => record_controller_1.recordController.delete(req, res));
exports.default = router;
//# sourceMappingURL=record.routes.js.map