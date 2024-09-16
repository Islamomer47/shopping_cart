const authService = require("../services/authService");
const { generateToken } = require("../utils/jwtUtils");

exports.register = async (req, res, next) => {
  try {
    const { username, password, role } = req.body;
    const user = await authService.registerUser(username, password, role);
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await authService.loginUser(username, password);
    const token = generateToken({ id: user.id, role: user.role });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    res.status(200).json({ success: true, token });
  } catch (error) {
    next(error);
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
};
