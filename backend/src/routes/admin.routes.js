import express from "express";
import { registerAdmin } from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { checkRole } from "../middlewares/role.middleware.js";
import { ROLES } from "../constants.js";

const router = express.Router();

// Protect all admin routes
router.use(authenticate);
router.use(checkRole([ROLES.ADMIN]));

// Special admin-only registration route
router.post("/register-admin", registerValidator, registerAdmin);

export default router;