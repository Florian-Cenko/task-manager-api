export default function Header({ onLogout }) {
  return (
    <header className="flex w-full justify-between items-center mb-8 bg-white shadow-lg rounded-lg p-8">
      <div>

        <h2 className="flex justify-center text-3xl font-bold text-gray-700">
                <img src="/src/icons/task-manager.png" alt="icon" className=" mr-2 w-10 h-10" />
                TaskFlow
      </h2>

      </div>

      <div className="flex items-center gap-4">
        <button>🔔</button>
        <div className="w-11 h-9 bg-gray-300 rounded-full"></div>

        <button
          type="submit" onClick={onLogout} className="p-2 mt-3 mb-3 mr-3 border text-white bg-blue-500 rounded-lg ">
          Logout
        </button>
      </div>
    </header>
  );
};