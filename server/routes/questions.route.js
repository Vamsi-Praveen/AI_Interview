import express from "express";
import { fetchPrevInterviews, generateQuestions, getQuestions } from "../controllers/questions.controller.js";
import { verifyAuth } from "../middlewares/auth.middleware.js";

const questionRouter = express.Router();

questionRouter.post('/generate-questions', verifyAuth, generateQuestions)

questionRouter.get('/get-questions/:id', verifyAuth, getQuestions)

questionRouter.get('/get-prevInterviews',verifyAuth,fetchPrevInterviews)

export default questionRouter