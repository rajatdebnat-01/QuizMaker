import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/quizes/get")
      .then((response) => setQuizzes(response.data))
      .catch((error) => console.error("Error fetching quizzes:", error));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col items-center p-8">
      <h1 className="text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
        🚀 Welcome to Quiz Master
      </h1>
      <p className="text-lg text-gray-300 mb-8 text-center max-w-2xl">
        Challenge yourself with exciting quizzes! Create your own or test your knowledge now.
      </p>

      <div className="flex gap-6 mb-10">
        <Link to="/create">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-lg transition-transform transform hover:scale-105 flex items-center gap-2">
            ➕ Create Quiz
          </button>
        </Link>

        <Link to="/all-quiz">
          <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-lg transition-transform transform hover:scale-105 flex items-center gap-2">
            🎯 Take a Quiz
          </button>
        </Link>
      </div>

      <h2 className="text-3xl font-bold mb-6 text-purple-400">🔥 Available Quizzes</h2>
      <div className="mt-4 w-full max-w-3xl space-y-4">
        {quizzes.length === 0 ? (
          <p className="text-gray-400 text-center">No quizzes available yet.</p>
        ) : (
          quizzes.map((quiz) => (
            <div
              key={quiz._id}
              className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 hover:border-purple-500 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-white">{quiz.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{quiz.description}</p>
              <Link to={`/take-quiz/${quiz._id}`}>
                <button className="bg-purple-500 hover:bg-purple-600 text-white px-5 py-2 rounded-md text-lg font-medium transition-transform transform hover:scale-105">
                  Take Quiz
                </button>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;