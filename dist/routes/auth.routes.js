"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post('/register', (req, res) => auth_controller_1.authController.register(req, res));
router.post('/login', (req, res) => auth_controller_1.authController.login(req, res));
router.get('/profile', auth_1.authenticate, (req, res) => auth_controller_1.authController.getProfile(req, res));
exports.default = router;
//# sourceMappingURL=auth.routes.js.map