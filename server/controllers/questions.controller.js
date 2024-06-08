import { chatSession } from "../services/Gemini.js";

export const getQuestions = async (req, res) => {
    try {
        const email = req?.user?.email;
        const { jobPosition, skills, experience } = req.body;

        const questions = await chatSession.sendMessage(process.env.GEMINI_QUESTION_PROMPT + " " + "JobPosition " + jobPosition + " Skills " + skills.join(",") + " Experience " + experience);
        console.log("Question " + process.env.GEMINI_QUESTION_PROMPT + " " + "JobPosition " + jobPosition + " Skills " + skills.join(",") + " Experience " + experience)

        console.log(questions.response.text())

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}