// ====================== authMiddleware.js ======================
import jwt from "jsonwebtoken";

// Middleware to verify JWT and attach user info to request
const authMiddleware = (req, res, next) => {
  try {
    // Get token from Authorization header (format: 'Bearer <token>')
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ success: false, message: "No token found. Please login first." });
    }

    // Verify token signature and expiry
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Standardize: attach user object with id to request for controllers
    req.user = { id: decoded.id };

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Token expired. Please login again." });
    }
    return res.status(401).json({ success: false, message: "Invalid token. Authentication failed." });
  }
};

export default authMiddleware;