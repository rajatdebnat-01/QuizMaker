import Question from "../models/questions.model.js";
import Submission from "../models/submission.model.js";
import Quiz from "../models/quiz.model.js";

//  Submit Quiz Answers
export const submitQuiz = async (req, res) => {
    try {
      console.log("Received request body:", req.body); // Log incoming data
  
      const { username, quizId, answers } = req.body;
  
      if (!username || !quizId || !answers || answers.length === 0) {
        return res.status(400).json({ message: "Missing required fields." });
      }
  
      let score = 0;
  
      for (const ans of answers) {
        console.log("Checking question:", ans.questionId, "Selected:", ans.selectedOption);
        const question = await Question.findById(ans.questionId);
        if (!question) {
          console.error("Question not found:", ans.questionId);
          continue;
        }
        if (question.correctAnswer === ans.selectedOption) {
          score++;
        }
      }
  
      const submission = new Submission({
        username,
        quizId,
        answers,
        score,
      });
  
      await submission.save();
  
      res.status(201).json({
        message: "Quiz submitted successfully!",
        submissionId: submission._id,
        score,
      });
    } catch (error) {
      console.error("Error submitting quiz:", error);
      res.status(500).json({ message: "Error submitting quiz", error: error.message });
    }
  };

// Get Quiz Results for a User
export const getQuizResults = async (req, res) => {
  try {
    const { quizId, username } = req.params;

    const submission = await Submission.findOne({ quizId, username }).populate("quizId");

    if (!submission) {
      return res.status(404).json({ message: "No results found for this quiz." });
    }

    res.json({
      username: submission.username,
      quizTitle: submission.quizId.title,
      score: submission.score,
      answers: submission.answers,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching results", error: error.message });
  }
};
