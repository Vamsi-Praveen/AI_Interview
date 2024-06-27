import { chatSession } from "../services/Gemini.js";
import Feedback from "../models/feedback.model.js";

export const verifyAnswer = async (req, res) => {
    try {
        const { question, answer, questionId } = req.body;
        if (!question || !answer || !questionId) {
            return res.status(400).send({ error: 'All Parameters Required' })
        }
        const response = await chatSession.sendMessage(process.env.GEMINI_ANSWER_PROMPT + " " + "Question: " + question + " Answer: " + answer);
        var feedbackRes = response?.response?.text();
        feedbackRes = feedbackRes.replaceAll('```json', '');
        feedbackRes = feedbackRes.replaceAll('```', '');


        let feedbackDoc = await Feedback.findOne({ questionsId: questionId });

        if (!feedbackDoc) {
            feedbackDoc = new Feedback({
                questionsId: questionId,
                feedback: [feedbackRes]
            })
        }
        else {
            feedbackDoc.feedback.push(feedbackRes)
        }
        await feedbackDoc.save();
        return res.status(200).send({ message: "Saved Successfull" });

    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
}