import { chatSession } from "../services/Gemini.js";
import moment from "moment"
import Question from "../models/questions.model.js";

export const generateQuestions = async (req, res) => {
    try {
        const email = req?.user?.email;
        const { jobPosition, skills, experience } = req.body;

        if (!email) {
            return res.status(400).send({ error: "Email Invalid" });
        }

        const response = await chatSession.sendMessage(process.env.GEMINI_QUESTION_PROMPT + " " + "JobPosition " + jobPosition + " Skills " + skills.join(",") + " Experience " + experience);
        // console.log("Question " + process.env.GEMINI_QUESTION_PROMPT + " " + "JobPosition " + jobPosition + " Skills " + skills.join(",") + " Experience " + experience)

        // console.log(questions.response.text())
        var questions = response?.response?.text();
        questions = questions.replace('```json', '');
        questions = questions.replace('```', '');

        const createdDate = moment().format('DD-MM-YYYY');

        const newQuestion = new Question({
            questions: questions,
            createdAt: createdDate,
            createdBy: email,
            jobPosition: jobPosition,
            skills: skills,
            experience: experience
        })

        await newQuestion.save();

        return res.status(200).send(newQuestion);


    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export const getQuestions = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'Invalid Id' });
        }
        await Question.findById(id).then((data) => {
            return res.status(200).send(data)
        })
            .catch((err) => {
                return res.status(400).send({ error: 'Invalid Id' })
            })

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}