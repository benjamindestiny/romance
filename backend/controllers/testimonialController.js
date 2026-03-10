// ====================== testimonialController.js ======================
import Testimonial from "../models/testimonial.js";

/* ================= ADD TESTIMONIAL ================= */
export const addTestimonial = async (req, res) => {
  try {
    const { content, rating } = req.body;
    const userId = req.user.id;

    const testimonial = await Testimonial.create({
      userId,
      content,
      rating: rating || 5,
    });

    res.status(201).json({
      success: true,
      message: "Testimonial added successfully",
      testimonial,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= GET TESTIMONIALS ================= */
export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find()
      .populate("userId", "name")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      testimonials,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
