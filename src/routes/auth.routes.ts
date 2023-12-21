import express from "express";
import * as AuthController from '../controllers/auth.controller'; 

const router = express.Router();


// Register a new user
router.post("/register", AuthController.register)

// Login
router.post("/login", AuthController.login )

// Logout
router.post("/logout", AuthController.logout)



export default router

