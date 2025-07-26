import express from "express";
import { register, login } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

export default router;


// import express from "express";
// import { register, login } from "../controllers/auth.controller.js";
// import { registerValidator, loginValidator } from "../utils/validators.js";

// const router = express.Router();

// // Apply validation middleware to register route
// router.post("/register", registerValidator, register);
// router.post("/login", loginValidator, login);

// export default router;