import express from "express";
import { submitForm, getUserSubmissions } from "../controllers/form.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { checkRole } from "../middlewares/role.middleware.js";
import { ROLES } from "../constants.js";

const router = express.Router();

router.use(authenticate);

// Form submission (only users)
router.post("/submit", checkRole([ROLES.USER]), submitForm);

// Get user's own submissions
router.get("/my-submissions", checkRole([ROLES.USER]), getUserSubmissions);

export default router;