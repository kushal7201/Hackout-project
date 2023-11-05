import express from "express";
const router = express.Router();
import dotenv from 'dotenv';
import teamControllers from "../controllers/team.controllers.js";
import userAuth from "../middlewares/auth.middleware.js";
dotenv.config();
router.post('/create', userAuth, teamControllers.createTeam);
router.post('/join/:teamId', userAuth, teamControllers.joinTeam);
export default router;