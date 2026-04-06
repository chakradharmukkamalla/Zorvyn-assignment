"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const auth_1 = require("../middleware/auth");
const rbac_1 = require("../middleware/rbac");
const router = (0, express_1.Router)();
router.use(auth_1.authenticate);
router.use(rbac_1.isAdmin);
router.get('/', (req, res) => user_controller_1.userController.getAll(req, res));
router.get('/:id', (req, res) => user_controller_1.userController.getById(req, res));
router.put('/:id', (req, res) => user_controller_1.userController.update(req, res));
router.post('/:id/deactivate', (req, res) => user_controller_1.userController.deactivate(req, res));
router.post('/:id/activate', (req, res) => user_controller_1.userController.activate(req, res));
router.delete('/:id', (req, res) => user_controller_1.userController.delete(req, res));
exports.default = router;
//# sourceMappingURL=user.routes.js.map