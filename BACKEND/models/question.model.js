import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    title: string,
    optionA: string,
    optionB: string,
    optionC: string,
    answer: string
});

const Question = mongoose.model('User', questionSchema);
export default Question;