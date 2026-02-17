import express from "express";
import { addTestimonial, getTestimonials } from "../controllers/testimonialController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", authMiddleware, addTestimonial);
router.get("/", authMiddleware, getTestimonials);

export default router;
