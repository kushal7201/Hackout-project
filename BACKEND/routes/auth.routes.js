import express from "express";
const router = express.Router();
import authController from "../controllers/auth.controllers.js";

router.get('/login',authController.signup_get);
router.get('/signup',authController.signup_get)
router.post('/signup', authController.signup_post);
router.post('/login', authController.login_post);
export default router;
