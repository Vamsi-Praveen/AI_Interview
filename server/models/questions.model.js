import mongoose from "mongoose"

const questionsSchema = new mongoose.Schema({
    questions: {
        type: String,
        required: true
    },
    jobPosition: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        required: true
    }
}, { collection: 'questions' })

export default mongoose.model('Question', questionsSchema)