import { verifyAccessToken } from "../utils/jwt.js";
import jwt from 'jsonwebtoken';

export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new Error("Authorization token missing");

    const decoded = verifyAccessToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }
    res.status(401).json({ error: error.message });
  }
};