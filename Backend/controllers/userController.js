const models = require("../models");
const asyncHandler = require('express-async-handler');

const User = models.User;

// Tagastab kõik kasutajad
exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] } 
  });

  return res.status(200).json({ users });
});

// Kustutab kasutaja id järgi
exports.deleteUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  const user = await User.findByPk(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  await user.destroy();
  res.status(200).json({ message: "User deleted successfully" });
});
