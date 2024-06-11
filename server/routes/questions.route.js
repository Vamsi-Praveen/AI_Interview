import express from "express"
import { getQuestions } from "../controllers/questions.controller.js";
import { verifyAuth } from "../middlewares/auth.middleware.js";

const questionRouter = express.Router();

questionRouter.post('/get-questions', verifyAuth, getQuestions)

export default questionRouter