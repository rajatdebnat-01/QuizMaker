import express from "express";
import { createQuiz, getAllQuizzes, getQuizById, deleteQuiz } from "../controllers/quiz.controller.js";

const quizRouter = express.Router();

quizRouter.post("/create", createQuiz); // Create a quiz
quizRouter.get("/get", getAllQuizzes); // Get all quizzes
quizRouter.get("/get/:id", getQuizById); // Get quiz by ID
quizRouter.delete("/delete/:id", deleteQuiz); // Delete quiz by ID

export default quizRouter;
