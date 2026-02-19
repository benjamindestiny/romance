// Dynamic scoring – works for all 15 categories + future ones
export const submitQuiz = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { category, score } = req.body;

    // Dynamic update – no more if/else hell
    if (!user.scores[category]) user.scores[category] = 0;
    user.scores[category] += Number(score);

    user.milestone += 1; // existing milestone counter still works

    await user.save();

    res.json({ 
      message: "Solo quiz progress saved", 
      category,
      newScore: user.scores[category],
      milestone: user.milestone 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};