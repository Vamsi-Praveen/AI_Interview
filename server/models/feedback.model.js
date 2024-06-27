import mongoose from "mongoose"

const FeedbackSchema = new mongoose.Schema({
    questionsId: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    feedback: {
        type: [],
        required: true
    }
}, { collection: 'feedback' })

export default mongoose.model('Feedback', FeedbackSchema)