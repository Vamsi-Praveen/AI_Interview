import express from "express"
import { getQuestions } from "../controllers/questions.controller.js";

const questionRouter = express.Router();

questionRouter.post('/get-questions', getQuestions)

export default questionRouter