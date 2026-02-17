import User from "../models/user.js";

export const saveDailyPrompt = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { response } = req.body;

    user.dailyPromptResponse = response;
    await user.save();

    res.json({ message: "Daily prompt saved", dailyPromptResponse: response });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
