const Loader = () => {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-gray-700 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="text-gray-400 mt-4 text-center">Loading...</p>
        </div>
      </div>
    );
  };
  
  export default Loader;