
import Question from "../models/questions.model.js";
import Quiz from "../models/quiz.model.js";

//  Create a new quiz
export const createQuiz = async (req, res) => {
    try {
      const { title, description, createdBy, questions } = req.body;
  
      if (!title || !questions || questions.length === 0) {
        return res.status(400).json({ message: "Title and questions are required" });
      }
  
      // ✅ Create quiz first
      const newQuiz = new Quiz({ title, description, createdBy });
      await newQuiz.save();
  
      // ✅ Assign quizId to each question and save
      const questionDocs = questions.map(q => ({
        ...q,
        quizId: newQuiz._id // 🔥 Assign quiz ID here
      }));
  
      const savedQuestions = await Question.insertMany(questionDocs);
  
      // ✅ Update quiz with question IDs
      newQuiz.questions = savedQuestions.map(q => q._id);
      await newQuiz.save();
  
      res.status(201).json({
        message: "Quiz created successfully!",
        quiz: newQuiz
      });
  
    } catch (error) {
      res.status(500).json({ message: "Error creating quiz", error });
    }
  };



//  Get all quizzes
export const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate("questions");
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching quizzes", error });
  }
};



//  Get a single quiz by ID
export const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate("questions");
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: "Error fetching quiz", error });
  }
};



// Delete a quiz
export const deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.json({ message: "Quiz deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting quiz", error });
  }
};
