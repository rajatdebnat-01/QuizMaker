import { useState } from "react";
import axios from "axios";
import BackButton from "../components/BackBtn";

const CreateQuiz = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState(0);

  const addQuestion = () => {
    if (newQuestion.trim() === "" || options.some(opt => opt.trim() === "")) {
      alert("Please fill in the question and all options");
      return;
    }
    setQuestions([...questions, { questionText: newQuestion, options, correctAnswer }]);
    setNewQuestion("");
    setOptions(["", "", "", ""]);
    setCorrectAnswer(0);
  };

  const submitQuiz = async () => {
    if (!title.trim() || questions.length === 0) {
      alert("Title and at least one question are required");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5001/api/quizes/create", {
        title,
        description,
        createdBy: "Guest",
        questions,
      });
      alert("Quiz Created Successfully!");
      console.log(response.data);
      setTitle("");
      setDescription("");
      setQuestions([]);
    } catch (error) {
      console.error("Error creating quiz:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center">
        
      <h1 className="text-3xl font-bold mb-6">📚 Create a New Quiz</h1>
      <input
        type="text"
        placeholder="Quiz Title"
        className="p-2 rounded bg-gray-800 text-white mb-4 w-80"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Quiz Description (Optional)"
        className="p-2 rounded bg-gray-800 text-white mb-4 w-80"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="bg-gray-800 p-4 rounded w-80">
        <input
          type="text"
          placeholder="Enter Question"
          className="p-2 rounded bg-gray-700 text-white w-full mb-2"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
        />
        {options.map((opt, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Option ${index + 1}`}
            className="p-2 rounded bg-gray-700 text-white w-full mb-2"
            value={opt}
            onChange={(e) => {
              const newOptions = [...options];
              newOptions[index] = e.target.value;
              setOptions(newOptions);
            }}
          />
        ))}
        <label className="text-sm">Select Correct Answer:</label>
        <select
          className="p-2 rounded bg-gray-700 text-white w-full mb-2"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(Number(e.target.value))}
        >
          {options.map((_, index) => (
            <option key={index} value={index}>{`Option ${index + 1}`}</option>
          ))}
        </select>
        <button
          onClick={addQuestion}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          ➕ Add Question
        </button>
      </div>

      <h2 className="text-xl font-semibold mt-6">📝 Questions</h2>
      {questions.length === 0 ? (
        <p className="text-gray-400">No questions added yet.</p>
      ) : (
        <ul className="mt-2 w-80">
          {questions.map((q, index) => (
            <li key={index} className="bg-gray-800 p-2 rounded mt-2">{q.questionText}</li>
          ))}
        </ul>
      )}

      <button
        onClick={submitQuiz}
        className="mt-6 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded text-lg font-semibold shadow-lg"
      >
        ✅ Submit Quiz
      </button>
    </div>
  );
};

export default CreateQuiz;