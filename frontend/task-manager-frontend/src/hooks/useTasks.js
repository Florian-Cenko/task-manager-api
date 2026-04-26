import { useState, useEffect } from "react";
import { addTask, getAllTasks, updateTask, deleteTask, getTasksFiltered } from "../services/taskService";

export const useTasks = (userId) => {
    // --- State Management ---
    const [tasks, setTasks] = useState([]);
    const [newLabel, setNewLabel] = useState("");
    const [newPriority, setNewPriority] = useState("");
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [searchTitle, setSearchTitle] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [filterPriority, setFilterPriority] = useState("");
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [dueDate, setDueDate] = useState(""); // Πρόσθεσε αυτή τη γραμμή

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
                    setTasks(data.content); //Use data.content because i have pagination and sends me back
                    setTotalPages(data.totalPages);
                })
                .catch(err => console.error("Error filtering tasks:", err));
        }
    }, [userId, searchTitle, filterStatus, filterPriority, page]); 

    // --- CRUD Operations ---

    // POST: Add a new task
    const handleAddTask = async (selectedCategoryId) => {
        if(!newTaskTitle.trim()) return;
        if(!selectedCategoryId) { alert("Choose Category!"); return; }

        const newTaskPayload = {
            title: newTaskTitle,
            label: newLabel,
            status: "TODO",
            priority: newPriority,
            dueDate:dueDate,
            active: true
        };

        try {
            const savedTask = await addTask(userId, selectedCategoryId, newTaskPayload);
            setTasks([...tasks, savedTask]); // Update local state
            setNewTaskTitle(""); // Clear input
            setNewLabel("");
            setNewPriority("");
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

    return {
        tasks, newLabel, setNewLabel, newPriority, setNewPriority,
        newTaskTitle, setNewTaskTitle, searchTitle, setSearchTitle,
        filterStatus, setFilterStatus, filterPriority, setFilterPriority,
        dueDate, setDueDate,
        page, setPage, totalPages, handleAddTask, handleDeleteTask, handleUpdate
    };
};