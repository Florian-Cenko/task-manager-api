import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import LoginForm from "./components/LoginForm";
import { addTask, getAllTasks, updateTask, deleteTask, getTasksFiltered } from "./services/taskService";

function App() {
    // --- State Management ---
    const [tasks, setTasks] = useState([]);
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [searchTitle, setSearchTitle] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [filterPriority, setFilterPriority] = useState("");
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    
    // Check if user is logged in via Session Storage
    const [userId, setUserId] = useState(sessionStorage.getItem("userId")); 
    const categoryId = 1;

    // --- Data Fetching Logic ---
    useEffect(() => {
        // Guard Clause: Stop execution if no user is logged in
        if (!userId) {
            return; 
        }

        const hasFilters = searchTitle || filterStatus || filterPriority;

        if (!hasFilters) {
            // Fetch all tasks if no filters are applied
            getAllTasks(userId)
                .then(data => {
                    setTasks(data); 
                    setTotalPages(1);
                })
                .catch(err => console.error("Error fetching tasks:", err));
        } else {
            // Prepare filter object
            const rawFilters = {
                userId: userId,
                title: searchTitle,
                status: filterStatus,
                priority: filterPriority
            };

            // Remove empty/null fields to send a clean payload
            const cleanFilters = {};
            Object.keys(rawFilters).forEach(key => {
                if (rawFilters[key] !== "" && rawFilters[key] !== null && rawFilters[key] !== undefined) {
                    cleanFilters[key] = rawFilters[key];
                }
            });

            // Fetch filtered and paginated tasks
            getTasksFiltered(cleanFilters, page)
                .then(data => {
                    setTasks(data.content);
                    setTotalPages(data.totalPages);
                })
                .catch(err => console.error("Error filtering tasks:", err));
        }
    }, [userId, searchTitle, filterStatus, filterPriority, page]); 

    // --- Conditional Rendering: Gatekeeper ---
    // If not logged in, show only the login form and exit
    if (!userId) {
        return <LoginForm onLoginSuccess={setUserId} />;
    }

    // --- CRUD Operations ---

    // POST: Add a new task
    const handleAddTask = async () => {
        if(!newTaskTitle.trim()) return; // Prevent adding empty tasks

        const newTaskPayload = {
            title: newTaskTitle,
            label: "General",
            status: "TODO",
            priority: "LOW",
            dueDate: new Date().toISOString().split('T')[0],
            active: true
        };

        try {
            const savedTask = await addTask(userId, categoryId, newTaskPayload);
            setTasks([...tasks, savedTask]); // Update local state
            setNewTaskTitle(""); // Clear input
        } catch (err) {
            console.error("Error adding task:", err);
        }
    };

    // DELETE: Remove a task
    const handleDeleteTask = async (id) => {
        try {
            await deleteTask(id, userId);
            setTasks(tasks.filter(task => task.id !== id)); // Remove from UI
        } catch (err) {
            console.error("Error deleting task:", err);
        }
    };

    // PUT: Update an existing task
    const handleUpdate = async (task, newStatus) => {
        const updatedData = {
            title: task.title,
            status: newStatus,
            priority: task.priority,
            dueDate: task.dueDate ? task.dueDate.split("T")[0] : null,
            label: task.label ?? "General",
        };

        try {
            await updateTask(task.id, updatedData);
            // Map through current tasks and update only the modified one
            setTasks(tasks.map(t => t.id === task.id ? {...t, status: newStatus } : t));
        } catch (error) {
            console.error("Error updating task:", error);
            alert("Task not updated");
        }
    };

    // --- Render ---
    return (
        <div>
            <h1>My Task List!</h1>

            {/* Logout: Clear session and reset state */}
            <button onClick={() => {
                sessionStorage.removeItem("userId");
                setUserId(null);
            }}>Logout</button>
            
            <div className="filters" style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Search Title"
                    value={searchTitle}
                    onChange={(e) => setSearchTitle(e.target.value)}
                />

                {/* Status Filter */}
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                    <option value="">All Status</option>
                    <option value="TODO">TODO</option>
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="REVIEW">REVIEW</option>
                    <option value="DONE">DONE</option>
                </select>

                {/* Priority Filter */}
                <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
                    <option value="">All Priorities</option>
                    <option value="LOW">LOW</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HIGH">HIGH</option>
                </select>
            </div>

            <TaskList tasks={tasks} onDelete={handleDeleteTask} onUpdate={handleUpdate}/>
            
            {/* Pagination Controls */}
            <div>
                <button 
                    disabled={page === 0}
                    onClick={() => setPage(prev => prev - 1)}>Previous
                </button>
                <span>Page {page + 1} of {totalPages}</span>
                <button
                    disabled={page >= totalPages - 1}
                    onClick={() => setPage(prev => prev + 1)}>Next</button>
            </div>

            <TaskForm
                taskTitle={newTaskTitle}
                onTitleChange={setNewTaskTitle}
                onAdd={handleAddTask}
            />
        </div>
    );
}

export default App;