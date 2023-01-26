const express = require("express");
const {
  loginController,
  registerController,
} = require("../controllers/userController");

//Router
const router = express.Router();

//list of routes
//login routes
router.post("/login", loginController);

//register route POST
router.post("/register", registerController);

module.exports = router;
