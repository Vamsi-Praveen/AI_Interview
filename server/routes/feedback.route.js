import express from "express"
import { verifyAuth } from "../middlewares/auth.middleware.js";
import { verifyAnswer } from "../controllers/feedback.controller.js";

const feedBackRouter = express.Router();

feedBackRouter.put('verify-answer',verifyAuth,verifyAnswer)

export default feedBackRouter