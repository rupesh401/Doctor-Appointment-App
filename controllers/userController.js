const bcrypt = require("bcryptjs");
const userModel = require("../models/userModels");
const jwt = require("jsonwebtoken");

const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(200).send({
        message: "User not found",
        success: false,
      });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Incorrect Username or Password", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_CODE, {
      expiresIn: "1d",
    });
    console.log(token);
    res.status(200).send({
      message: "Login Successful",
      success: true,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).status({
      message: "Error in Login",
      success: false,
    });
  }
};

const registerController = async (req, res) => {
  try {
    const existinguser = await userModel.findOne({ email: req.body.email });
    if (existinguser) {
      return res.status(200).send({
        message: "User Already exist",
        success: false,
      });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(200).send({
      message: "User Register Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Register controller error",
    });
  }
};

module.exports = { loginController, registerController };
