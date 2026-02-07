import jwt from "jsonwebtoken";

// Middleware: Verify JWT token and extract userId
// WHY: Protects endpoints - only logged-in users can access protected routes
const authMiddleware = (req, res, next) => {
  try {
    // Get token from Authorization header
    // Expected format: "Bearer token123"
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token found. Please login first.",
      });
    }

    // Verify token signature and expiry
    // WHY: Ensures token wasn't tampered with and hasn't expired
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Store userId in request for use in route handlers
    // WHY: Controllers can now access req.userId to know who made request
    req.userId = decoded.userId;
    req.user = decoded; // Full user data if needed

    next();
  } catch (error) {
    // Token is invalid or expired
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired. Please login again.",
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid token. Authentication failed.",
    });
  }
};

export default authMiddleware;
