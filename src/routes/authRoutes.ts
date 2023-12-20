import express from "express";

const router = express.Router();

const AuthController = require("../controllers/authController")


// Register a new user
router.post("/register", AuthController.register)

// Login
router.post("/login", AuthController.login )

// Logout
router.post("/logout", AuthController.logout)



module.exports = router;

