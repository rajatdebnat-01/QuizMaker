import express from "express";
import { getQuizResults, submitQuiz } from "../controllers/results.controller.js";
// import { getAllQuizzes } from "../controllers/quiz.controller.js";


const resRouter = express.Router();

resRouter.post("/submit", submitQuiz); // Submit answers
resRouter.get("/:quizId/:username", getQuizResults); // Get user results

export default resRouter;