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
        filterStatus, setFilterStatus, filterPriority, setFilterPriority,
        dueDate,setDueDate,
        page, setPage, totalPages, handleAddTask, handleDeleteTask, handleUpdate 
    } = useTasks(userId);

    const { 
        categories, selectedCategoryId, setSelectedCategoryId, 
        newCatName, setNewCatName, handleAddCategory 
    } = useCategoryManager(userId);



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
        <div className="max-w-7xl mx-auto px-1 py-4">
            <Header onLogout={() => {
                sessionStorage.removeItem("userId");
                setUserId(null);
                setUsername("");
                }} 
            />

            {/*An yparxei to stats timi tote tha parei to stats.pendingtasks*/}
            <h1 className="text-3xl font-bold text-gray-800 ml-8 my-8">Welcome back,{username}! You have {stats?.pendingTasks} pending tasks.</h1>
            <p className="ml-8 my-8 -mt-6">Let's get organized.</p>
            <button
                type="button" onClick={() => setIsModalOpen(true)} className="flex items-center ml-8 my-8 -mt-6 gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg">
                <img src={PlusIcon} alt="plus" className="w-4 h-4"/>
                New Task
            </button>
            
            <div className="flex w-full">
                <div className="relative w-full ml-8 mb-4">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                    <input
                        type="text"
                        placeholder="Search Tasks..."
                        value={searchTitle}
                        onChange={(e) => setSearchTitle(e.target.value)}
                        className="w-full pl-10 py-2 border rounded-lg"
                    />

                </div>             
                <select value={filterStatus}  className="w-full px-3 py-2 border rounded-lg  ml-5 mb-4" onChange={(e) => setFilterStatus(e.target.value)}>
                    <option value="">All Statuses</option>
                    <option value="TODO">TODO</option>
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="REVIEW">REVIEW</option>
                    <option value="DONE">DONE</option>
                </select>
                <select value={filterPriority}   className="w-full px-3 py-2 border rounded-lg ml-8 -mr-6 mb-4" onChange={(e) => setFilterPriority(e.target.value)}>
                    <option value="">All Priorities</option>
                    <option value="LOW">LOW</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HIGH">HIGH</option>
                </select>
            </div>

            <TaskList 
                tasks={tasks} 
                onDelete={handleDeleteTask} 
                onUpdate={handleUpdate}
            />
            
            <div className="flex items-center justify-center gap-4 mt-12 py-6 border-t border-gray-100">
                {/* Previous Button */}
                <button
                    disabled={page === 0}
                    onClick={() => setPage(prev => prev - 1)}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
                >
                    <FiChevronLeft className="w-4 h-4" /> Previous
                </button>

                {/* Page Info */}
                <span className="text-sm font-semibold text-gray-600 px-4">
                    Page {page + 1} of {totalPages || 1}
                </span>

                {/* Next Button */}
                <button
                    disabled={page >= totalPages - 1}
                    onClick={() => setPage(prev => prev + 1)}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
                >
                    Next <FiChevronRight className="w-4 h-4" />
                </button>
            </div>

        
            <div style={{ margin: "20px 0", padding: "10px", border: "1px solid #ccc" }}>
                <h3>Create New Category</h3>
                <input type="text" placeholder="Category Name" value={newCatName} onChange={(e) => setNewCatName(e.target.value)} />
                <button onClick={handleAddCategory}>Add Category</button>
            </div>
           

            <TaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2 className="text-xl font-bold mb-6">Create New Task</h2>

                {/*Ετσι γνωριζει οτι TaskForm ειναι chlidren*/}
                <TaskForm
                     taskTitle={newTaskTitle} 
                     onTitleChange={setNewTaskTitle}
                     label={newLabel} 
                     onLabelChange={setNewLabel}
                     priority={newPriority} 
                     onPriorityChange={setNewPriority}
                     categories={categories}
                     category = {selectedCategoryId}
                     onCategoryChange = {setSelectedCategoryId}
                     dueDate={dueDate}
                     onChangeDueDate={setDueDate}
                     onAdd={() => {
                        handleAddTask(selectedCategoryId);
                        setIsModalOpen(false); // Κλείνει αυτόματα μετά την προσθήκη
                     }}
                />
            </TaskModal>

            <UserStats userId={userId} tasks={tasks} onStatsLoaded={setStats}/>
        </div>
    );
}

export default App;