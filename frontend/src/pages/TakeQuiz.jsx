import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import BackBtn from "../components/BackBtn";
import Loader from "../components/Loader";

const TakeQuiz = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [username, setUsername] = useState("");
  const [nameSubmitted, setNameSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/quizes/get/${id}`)
      .then((response) => {
        setQuiz(response.data);
        console.log(response.data)
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching quiz:", error);
        setLoading(false);
      });
  }, [id]);

  const handleSelect = (questionId, optionIndex) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: optionIndex,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < quiz.questions.length) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleSubmitQuiz = () => {
    const formattedAnswers = Object.entries(answers).map(([questionId, selectedOption]) => ({
      questionId,
      selectedOption,
    }));

    const quizData = {
      username,
      quizId: id,
      answers: formattedAnswers,
    };

    axios
      .post("http://localhost:5001/api/results/submit", quizData)
      .then((res) => {
        setScore(res.data.score);
      
        setQuizCompleted(true);
      })
      .catch((error) => {
        console.error("Error submitting quiz:", error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center px-4 py-6">
      <div className="w-full max-w-2xl flex justify-start">
        <BackBtn />
      </div>

      {loading ? (
        <Loader />
      ) : !quiz ? (
        <p className="text-gray-400">Quiz not found.</p>
      ) : (
        <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-lg shadow-lg mt-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4">
            {quiz.questions[0].questionText}
          </h1>

          {!nameSubmitted ? (
            <div className="flex flex-col items-center">
              <input
                type="text"
                placeholder="Enter your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="p-3 w-full rounded bg-gray-700 text-white placeholder-gray-400 mb-4"
              />
              <button
                onClick={() => username.trim() && setNameSubmitted(true)}
                disabled={!username.trim()}
                className={`px-4 py-2 rounded w-full ${
                  username.trim()
                    ? "bg-blue-500 hover:bg-blue-600 text-white"
                    : "bg-gray-600 text-gray-400 cursor-not-allowed"
                }`}
              >
                Start Quiz
              </button>
            </div>
          ) : quizCompleted ? (
            <div className="text-center">
              <h2 className="text-xl font-semibold">Quiz Completed! 🎉</h2>
              <p className="text-lg">
                {username}, Your Score: {score} / {quiz.questions.length}
              </p>
              <button
                onClick={() => navigate("/all-quiz")}
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Back to Quizzes
              </button>
            </div>
          ) : (
            <div>
              {/* ✅ Updated this section to ensure the question is visible */}
              <h2 className="text-xl font-bold text-center mb-4">
                {quiz.questions[currentQuestionIndex].question}
              </h2>

              <div className="grid grid-cols-1 gap-3">
                {quiz.questions[currentQuestionIndex].options.map(
                  (option, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        handleSelect(
                          quiz.questions[currentQuestionIndex]._id,
                          index
                        )
                      }
                      className={`p-3 rounded border w-full text-center ${
                        answers[quiz.questions[currentQuestionIndex]._id] ===
                        index
                          ? "bg-blue-500 text-white"
                          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      }`}
                    >
                      {option}
                    </button>
                  )
                )}
              </div>

              {currentQuestionIndex + 1 === quiz.questions.length ? (
                <button
                  onClick={handleSubmitQuiz}
                  disabled={
                    answers[quiz.questions[currentQuestionIndex]._id] ===
                    undefined
                  }
                  className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded w-full"
                >
                  Submit Quiz
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  disabled={
                    answers[quiz.questions[currentQuestionIndex]._id] ===
                    undefined
                  }
                  className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-full"
                >
                  Next Question
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TakeQuiz;
