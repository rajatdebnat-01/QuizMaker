import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema(
  {
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
    questionText: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswer: { type: Number, required: true }, // Index of the correct answer
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", QuestionSchema);
export default Question;
