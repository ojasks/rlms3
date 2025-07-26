import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import formRoutes from "./routes/form.routes.js";
import adminRoutes from "./routes/admin.routes.js";
// import groupHeadRoutes from "./routes/groupHead.routes.js";

const app = express();

// app.use(cors({
//   origin: process.env.CORS_ORIGIN,
//   credentials: true
// }));

export default app;
const allowedOrigins = process.env.CORS_ORIGIN.split(",");

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow requests like curl or Postman
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/forms", formRoutes);
app.use("/api/admin", adminRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/api/grouphead", groupHeadRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});
