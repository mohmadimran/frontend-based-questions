const User = require("../database/Auth");

const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    await User.create({ name, email, password, role });
    res.status(201).json({ message: "register succefull" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "register denied" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    await User.findOne({ email });
    res.status(200).json({ message: "login succefully" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "login denied" });
  }
};
module.exports = { login, register };
