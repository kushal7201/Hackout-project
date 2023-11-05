import express from 'express';
const router = express.Router();
import authRoute from './auth.routes.js';
import userRoute from './user.routes.js';
import teamRoute from './team.routes.js';
router.use("/auth", authRoute);
router.use("/team", teamRoute);
router.use("/", userRoute); //Add homepage
export default router;