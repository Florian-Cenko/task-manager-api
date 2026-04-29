import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import UserStats from "./components/UserStats";
import { useTasks } from "./hooks/useTasks";
import { useCategoryManager } from "./hooks/useCategoryManager";
import  Header  from "./components/Header";
import PlusIcon from "./icons/icons8-plus-30.png";
import { FiSearch, FiChevronRight,FiChevronLeft } from "react-icons/fi";
import TaskModal from "./components/TaskModal";
import { getUserStats } from "./services/taskService";

function App() {
    const [showRegister, setShowRegister] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userId, setUserId] = useState(sessionStorage.getItem("userId")); 
    const [username, setUsername] = useState(sessionStorage.getItem("username"));
    const [newDueDate,setNewDueDate] = useState("");
    const [stats, setStats] = useState(null);

    // Χρήση των Hooks
    const { 
        tasks, newLabel, setNewLabel, newPriority, setNewPriority,
        newTaskTitle, setNewTaskTitle, searchTitle, setSearchTitle,
        filterStatus, setFilterStatus, filterPriority, setFilterPriority,showUrgent,setShowUrgent,
        dueDate,setDueDate,
        page, setPage, totalPages, handleAddTask, handleDeleteTask, handleUpdate 
    } = useTasks(userId);

    const { 
        categories, selectedCategoryId, setSelectedCategoryId, 
        newCatName, setNewCatName, handleAddCategory 
    } = useCategoryManager(userId);

    const [activeView, setActiveView] = useState('tasks');

    useEffect(() => {
        getUserStats(userId)
            .then(data => setStats(data))
            .catch(err => console.error("Error fetching stats:", err));
    }, [userId, tasks]); // Θα ξανατρέχει κάθε φορά που αλλάζουν τα tasks


    // --- Authentication Gatekeeper ---
    if (!userId) {
        return (
            <div>
        
                {showRegister ? (
                    <RegisterForm 
                        onRegisterSuccess={() => setShowRegister(false)}
                        onSwitchToLogin={() => setShowRegister(false)}
                    />
                ) : (
                    <LoginForm
                        onLoginSuccess={setUserId}
                        onSwitchToRegister={() => setShowRegister(true)}
                    />
                )}
            </div>
        );
}

    // --- Render ---
    return (
        <div className="px-6">
            <Header onLogout={() => {
                sessionStorage.removeItem("userId");
                setUserId(null);
                setUsername("");
            }}
            />

            <h1 className="text-3xl font-bold text-gray-800 ml-8 my-8">Welcome back, {username}! You have {stats?.pendingTasks} pending tasks.</h1>
            <p className="ml-8 my-8 -mt-6">Let's get organized.</p>

            {/* Navigation Tabs */}
            <nav className="flex gap-6 ml-8 my-6 border-b border-gray-200">
                <button
                    type="button"
                    onClick={() => setActiveView('tasks')}
                    className={`pb-2 font-semibold transition-all border-b-2 ${activeView === 'tasks' ? 'text-blue-600 border-blue-600' : 'text-gray-500 border-transparent hover:text-gray-700'}`}
                >
                    1. My Tasks
                </button>
                <button
                    type="button"
                    onClick={() => setActiveView('stats')}
                    className={`pb-2 font-semibold transition-all border-b-2 ${activeView === 'stats' ? 'text-blue-600 border-blue-600' : 'text-gray-500 border-transparent hover:text-gray-700'}`}
                >
                    2. Statistics
                </button>
            </nav>

            {/* Conditional Rendering based on activeView */}
            {activeView === 'tasks' ? (
                // --- TASKS VIEW ---
                <>
                    
                    <button
                        type="button" 
                        onClick={() => setIsModalOpen(true)} 
                        className="flex items-center ml-8 mb-8 gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    >
                        <img src={PlusIcon} alt="plus" className="w-4 h-4" />
                        New Task
                    </button>

                <div className="flex flex-wrap items-center gap-4 ml-8 mb-6">
                    
                    {/* Search Input - Πιάνει τον διαθέσιμο χώρο */}
                    <div className="relative flex-1 min-w-[200px]">
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                            <input
                                type="text"
                                placeholder="Search Tasks..."
                                value={searchTitle}
                                onChange={(e) => setSearchTitle(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                            />
                    </div>

                    {/* Selects - Σταθερό πλάτος για να μην αλλάζουν μέγεθος */}
                    <select value={filterStatus} className="w-40 px-3 py-2 border rounded-lg" onChange={(e) => setFilterStatus(e.target.value)}>
                        <option value="">All Statuses</option>
                        <option value="TODO">TODO</option>
                        <option value="IN_PROGRESS">IN PROGRESS</option>
                        <option value="REVIEW">REVIEW</option>
                        <option value="DONE">DONE</option>
                    </select>

                    <select value={filterPriority} className="w-40 px-3 py-2 border rounded-lg" onChange={(e) => setFilterPriority(e.target.value)}>
                        <option value="">All Priorities</option>
                        <option value="LOW">LOW</option>
                        <option value="MEDIUM">MEDIUM</option>
                        <option value="HIGH">HIGH</option>
                    </select>

                    {/* Urgent Filter Checkbox */}
                    <div className="flex flex-col items-start gap-1">
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="urgent-filter"
                                checked={showUrgent}
                                onChange={(e) => setShowUrgent(e.target.checked)}
                                className="w-5 h-5 accent-red-500 cursor-pointer"
                            />
                            <label htmlFor="urgent-filter" className="text-sm font-medium text-red-600 whitespace-nowrap">
                                Urgent
                            </label>
                        </div>
                        <span className="text-[10px] text-gray-400 leading-none">
                            Due within 5 days
                        </span>
                    </div>
                </div>

                    <TaskList
                        tasks={tasks}
                        onDelete={handleDeleteTask}
                        onUpdate={handleUpdate}
                    />

                    <div className="flex items-center justify-center gap-4 mt-12 py-6 border-t border-gray-100">
                        <button
                            disabled={page === 0}
                            onClick={() => setPage(prev => prev - 1)}
                            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-40 transition-all shadow-sm"
                        >
                            <FiChevronLeft className="w-4 h-4" /> Previous
                        </button>
                        <span className="text-sm font-semibold text-gray-600 px-4">
                            Page {page + 1} of {totalPages || 1}
                        </span>
                        <button
                            disabled={page >= totalPages - 1}
                            onClick={() => setPage(prev => prev + 1)}
                            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-40 transition-all shadow-sm"
                        >
                            Next <FiChevronRight className="w-4 h-4" />
                        </button>
                    </div>

                </>
            ) : (
                // --- STATISTICS VIEW ---
                <div className="mt-8">
                    <UserStats userId={userId} stats={stats} tasks={tasks} />
                </div>
            )}

            {/* Modal remains outside the conditional rendering so it's always accessible */}
            <TaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2 className="text-xl font-bold mb-6">Create New Task</h2>
                <TaskForm
                    userId={userId}
                    taskTitle={newTaskTitle}
                    onTitleChange={setNewTaskTitle}
                    label={newLabel}
                    onLabelChange={setNewLabel}
                    priority={newPriority}
                    onPriorityChange={setNewPriority}
                    categories={categories}
                    category={selectedCategoryId}
                    onCategoryChange={setSelectedCategoryId}
                    dueDate={dueDate}
                    onChangeDueDate={setDueDate}
                    onAdd={() => {
                        handleAddTask(selectedCategoryId);
                        setIsModalOpen(false);
                    }}
                />
            </TaskModal>
        </div>
    );
}

export default App;