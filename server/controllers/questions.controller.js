import { chatSession } from "../services/Gemini.js";
import moment from "moment"
import Question from "../models/questions.model.js";
import User from '../models/user.model.js';

export const generateQuestions = async (req, res) => {
    try {
        const email = req?.user?.email;
        const { jobPosition, skills, experience } = req.body;

        if (!email) {
            return res.status(400).send({ error: "Email Invalid" });
        }

        const response = await chatSession.sendMessage(process.env.GEMINI_QUESTION_PROMPT + " " + "JobPosition " + jobPosition + " Skills " + skills + " Experience " + experience);
        // console.log("Question " + process.env.GEMINI_QUESTION_PROMPT + " " + "JobPosition " + jobPosition + " Skills " + skills.join(",") + " Experience " + experience)

        // console.log(questions.response.text())
        var questions = response?.response?.text();
        questions = questions.replaceAll('```json', '');
        questions = questions.replaceAll('```', '');

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

        const user = await User.findOne({ email: email });

        const prevInterviews = [...user?.previousInterviews, newQuestion?._id];

        const data = await User.findOneAndUpdate({ email: email }, { previousInterviews: prevInterviews }, { new: true })
        if (data) {
            return res.status(200).send({ message: 'Created Successfull', id: newQuestion?._id });
        }

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

export const fetchPrevInterviews = async (req, res) => {
    try {
        const { email } = req.user;
        if (!email) {
            return res.status(400).json({ error: 'Email Required' });
        }
        await Question.find({ createdBy: email }).then((data) => {
            return res.status(200).send(data)
        })
            .catch((err) => {
                return res.status(400).send({ error: 'User Not Found' })
            })

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}