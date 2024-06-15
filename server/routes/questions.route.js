import express from "express";
import { generateQuestions, getQuestions } from "../controllers/questions.controller.js";
import { verifyAuth } from "../middlewares/auth.middleware.js";

const questionRouter = express.Router();

questionRouter.post('/generate-questions', verifyAuth, generateQuestions)

questionRouter.get('/get-questions/:id', verifyAuth, getQuestions)

export default questionRouter