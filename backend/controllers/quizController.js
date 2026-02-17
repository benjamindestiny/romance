import User from "../models/user.js";

// POST /api/quiz/submit
export const submitQuiz = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { category, score } = req.body; // score = points earned

    // Update category score
    if (category === "communication") user.scores.communication += score;
    if (category === "emotionalIntelligence") user.scores.emotionalIntelligence += score;
    if (category === "conflictResolution") user.scores.conflictResolution += score;
    if (category === "selfAwareness") user.scores.selfAwareness += score;

    // Increment milestone (total quizzes completed)
    user.milestone += 1;

    await user.save();
    res.json({ message: "Quiz submitted successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
