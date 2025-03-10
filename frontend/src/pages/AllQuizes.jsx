import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackBtn from "../components/BackBtn";
import Loader from "../components/Loader"; // Import Loader component

const AllQuizes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/quizes/get")
      .then((response) => {
        setQuizzes(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching quizzes:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center relative">
      {/* Fixed Back Button positioning */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
        <BackBtn />
      </div>

      {/* Heading with better spacing */}
      <h1 className="text-2xl sm:text-3xl font-bold mt-16 mb-6 text-center">
        📝 Available Quizzes
      </h1>

      {/* Display quizzes */}
      {loading ? (
        <Loader /> // Show loader while fetching data
      ) : quizzes.length === 0 ? (
        <p className="text-gray-400">No quizzes available.</p>
      ) : (
        <div className="w-full max-w-2xl">
          {quizzes.map((quiz) => (
            <div
              key={quiz._id}
              className="bg-gray-800 p-4 rounded-lg shadow-lg mb-4 flex flex-col sm:flex-row justify-between items-center"
            >
              <div className="text-center sm:text-left">
                <h3 className="text-xl font-semibold">{quiz.title}</h3>
                <p className="text-gray-300">{quiz.description}</p>
              </div>
              <button
                onClick={() => navigate(`/take-quiz/${quiz._id}`)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-3 sm:mt-0"
              >
                Start Quiz ➡️
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllQuizes;
