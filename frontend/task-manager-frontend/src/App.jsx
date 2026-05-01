import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import UserStats from "./components/UserStats";
import { useTasks } from "./hooks/useTasks";
import { useCategoryManager } from "./hooks/useCategoryManager";
import Header from "./components/Header";
import PlusIcon from "./icons/icons8-plus-30.png";
import { FiSearch, FiChevronRight, FiChevronLeft } from "react-icons/fi";
import TaskModal from "./components/TaskModal";
import { getUserStats } from "./services/taskService";
import SideBar from "./components/SideBar";

function App() {
    const [showRegister, setShowRegister] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userId, setUserId] = useState(sessionStorage.getItem("userId"));
    const [username, setUsername] = useState(sessionStorage.getItem("username"));
    const [stats, setStats] = useState(null);
    const [activeView, setActiveView] = useState("tasks");

    const {
        tasks, newLabel, setNewLabel, newPriority, setNewPriority,
        newTaskTitle, setNewTaskTitle, searchTitle, setSearchTitle,
        filterStatus, setFilterStatus, filterPriority, setFilterPriority,
        showUrgent, setShowUrgent, dueDate, setDueDate,
        page, setPage, totalPages,
        handleAddTask, handleDeleteTask, handleUpdate
    } = useTasks(userId);

    const {
        categories, selectedCategoryId, setSelectedCategoryId
    } = useCategoryManager(userId);

    useEffect(() => {
        getUserStats(userId)
            .then(data => setStats(data))
            .catch(err => console.error("Error fetching stats:", err));
    }, [userId, tasks]);

    // 🔐 Auth
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

    console.log("setSelectedCategoryId:", setSelectedCategoryId);

    return (
        <div className="flex min-h-screen">

            {/* Sidebar */}
            <div className="w-64 bg-gray-100 border-r h-screen sticky top-0">
                <SideBar
                    userId={userId}
                    onSelectCategory={(cat) => setSelectedCategoryId(cat.id)}
                />
            </div>

            {/* Main Content */}
            <div className="flex-1 px-6">

                <Header
                    onLogout={() => {
                        sessionStorage.removeItem("userId");
                        setUserId(null);
                        setUsername("");
                    }}
                />

                <h1 className="text-3xl font-bold text-gray-800 ml-8 my-8">
                    Welcome back, {username}! You have {stats?.pendingTasks} pending tasks.
                </h1>

                <p className="ml-8 my-8 -mt-6">Let's get organized.</p>

                {/* Tabs */}
                <nav className="flex gap-6 ml-8 my-6 border-b border-gray-200">
                    <button
                        onClick={() => setActiveView("tasks")}
                        className={`pb-2 font-semibold border-b-2 ${
                            activeView === "tasks"
                                ? "text-blue-600 border-blue-600"
                                : "text-gray-500 border-transparent"
                        }`}
                    >
                        1. My Tasks
                    </button>

                    <button
                        onClick={() => setActiveView("stats")}
                        className={`pb-2 font-semibold border-b-2 ${
                            activeView === "stats"
                                ? "text-blue-600 border-blue-600"
                                : "text-gray-500 border-transparent"
                        }`}
                    >
                        2. Statistics
                    </button>
                </nav>

                {activeView === "tasks" ? (
                    <>
                        {/* Add Task */}
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center ml-8 mb-8 gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
                        >
                            <img src={PlusIcon} alt="plus" className="w-4 h-4" />
                            New Task
                        </button>

                        {/* Filters */}
                        <div className="flex flex-wrap items-center gap-4 ml-8 mb-6">
                            <div className="relative flex-1 min-w-[200px]">
                                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search Tasks..."
                                    value={searchTitle}
                                    onChange={(e) => setSearchTitle(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg"
                                />
                            </div>

                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="w-40 px-3 py-2 border rounded-lg"
                            >
                                <option value="">All Statuses</option>
                                <option value="TODO">TODO</option>
                                <option value="IN_PROGRESS">IN PROGRESS</option>
                                <option value="REVIEW">REVIEW</option>
                                <option value="DONE">DONE</option>
                            </select>

                            <select
                                value={filterPriority}
                                onChange={(e) => setFilterPriority(e.target.value)}
                                className="w-40 px-3 py-2 border rounded-lg"
                            >
                                <option value="">All Priorities</option>
                                <option value="LOW">LOW</option>
                                <option value="MEDIUM">MEDIUM</option>
                                <option value="HIGH">HIGH</option>
                            </select>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={showUrgent}
                                    onChange={(e) => setShowUrgent(e.target.checked)}
                                />
                                <span className="text-red-600 text-sm">Urgent</span>
                            </div>
                        </div>

                        {/* Task List */}
                        <TaskList
                            tasks={tasks}
                            onDelete={handleDeleteTask}
                            onUpdate={handleUpdate}
                        />

                        {/* Pagination */}
                        <div className="flex justify-center gap-4 mt-12">
                            <button
                                disabled={page === 0}
                                onClick={() => setPage(p => p - 1)}
                            >
                                <FiChevronLeft /> Prev
                            </button>

                            <span>Page {page + 1} / {totalPages || 1}</span>

                            <button
                                disabled={page >= totalPages - 1}
                                onClick={() => setPage(p => p + 1)}
                            >
                                Next <FiChevronRight />
                            </button>
                        </div>
                    </>
                ) : (
                    <UserStats userId={userId} stats={stats} tasks={tasks} />
                )}
            </div>

            {/* Modal */}
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