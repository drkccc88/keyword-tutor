import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export type Explanation = {
    keyword: string;
    explanation: string;
    createDate: Date;
};

const ExplanationSchema = new Schema({
    keyword: String,
    explanation: String,
    createDate: Date,
});

const QuizSchema = new Schema({
    keyword: String,
    quiz: String,
    createDate: Date,
});

export type SingleQuiz = {
    _id: string;
    keyword: string;
    probrem: string;
    choices: string[];
    createDate: Date;
};

const SingleQuizSchema = new Schema({
    keyword: String,
    probrem: String,
    choices: [String],
    createDate: Date,
});

export const ExplanationModel =
    mongoose.models.Explanation ||
    mongoose.model('Explanation', ExplanationSchema);
export const QuizModel =
    mongoose.models.Quiz || mongoose.model('Quiz', QuizSchema);
export const SingleQuizModel =
    mongoose.models.SingleQuiz ||
    mongoose.model('SingleQuiz', SingleQuizSchema);
