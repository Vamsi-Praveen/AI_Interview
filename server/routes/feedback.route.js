import express from "express"
import { verifyAuth } from "../middlewares/auth.middleware.js";
import { fetchFeedback, verifyAnswer } from "../controllers/feedback.controller.js";

const feedBackRouter = express.Router();

feedBackRouter.post('/verify-answer', verifyAuth, verifyAnswer)
feedBackRouter.get('/get-feedback/:id', verifyAuth, fetchFeedback)

export default feedBackRouter