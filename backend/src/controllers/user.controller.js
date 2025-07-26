import { User } from "../models/user.model.js";
import { ROLES } from "../constants.js";

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select("-password -refreshToken -__v");
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["username", "email", "phone", "profilephoto"];
  const isValidUpdate = updates.every(update => allowedUpdates.includes(update));

  if (!isValidUpdate) {
    return res.status(400).json({ error: "Invalid updates!" });
  }

  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      req.body,
      { new: true, runValidators: true }
    ).select("-password -refreshToken -__v");

    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Admin-only: Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({})
      .select("-password -refreshToken -__v");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};