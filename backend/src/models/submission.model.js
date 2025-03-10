import mongoose from "mongoose";

const SubmissionSchema = new mongoose.Schema(
  {
    username: { type: String, required: true }, // No user authentication
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
    answers: [
      {
        questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
        selectedOption: { type: Number },
      },
    ],
    score: { type: Number, required: true },
  },
  { timestamps: true }
);

const Submission = mongoose.model("Submission", SubmissionSchema);
export default Submission;
