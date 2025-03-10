import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded flex items-center gap-2 shadow-lg"
    >
      ⬅ Back
    </button>
  );
};

export default BackButton;
