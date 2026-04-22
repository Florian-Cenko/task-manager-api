import { useState, useEffect, use } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { addTask, getAllTasks, updateTask, deleteTask, getTasksFiltered } from "./services/taskService";

function App(){

    const [tasks, setTasks] = useState([]);
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [searchTitle, setSearchTitle] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [filterPriority, setFilterPriority] = useState("");
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const userId = 1;
    const categoryId = 1;


     useEffect(() => {

        const hasFilters = searchTitle || filterStatus || filterPriority;

        if (!hasFilters) {
        // Αν δεν υπάρχουν φίλτρα, φέρνουμε όλα τα tasks (απλό fetch)
        getAllTasks(userId)
            .then(data => {
                 console.log("Data to be set:", data); // Έλεγχος: Εδώ πρέπει να δεις τον πίνακα
                 setTasks(data); // Απευθείας το data, αφού είναι πίνακας
                 setTotalPages(1);
            })
            .catch(err => console.error(err));
    } else {
    // Φτιάχνουμε ένα προσωρινό αντικείμενο
    const rawFilters = {
        userId: userId,
        title: searchTitle,
        status: filterStatus,
        priority: filterPriority
    };

    // ΚΑΘΑΡΙΣΜΟΣ: Κρατάμε μόνο όσα πεδία έχουν τιμή (δεν είναι κενά)
    const cleanFilters = {};
    Object.keys(rawFilters).forEach(key => {
        if (rawFilters[key] !== "" && rawFilters[key] !== null && rawFilters[key] !== undefined) {
            cleanFilters[key] = rawFilters[key];
        }
    });

    getTasksFiltered(cleanFilters,page)
        .then(data => {
            setTasks(data.content);
            setTotalPages(data.totalPages);
            console.log(data.totalPages);
        })
        .catch(err => console.error(err));
}

}, [userId, searchTitle, filterStatus, filterPriority,page]); // Τρέχει όποτε αλλάζει οτιδήποτε

        

    // 2. Function to  POST a new Task
    const handleAddTask = async () => {
        
        if(!newTaskTitle.trim()) return; //I don't add an empty task
        // 2. Κατασκευή του Object (Πρέπει να περιέχει ΟΛΑ τα υποχρεωτικά πεδία)
    const newTaskPayload = {
        title: newTaskTitle,
        label: "General",        // @NotBlank στο Java
        status: "TODO",          // Enum (πρέπει να είναι κεφαλαία όπως στο Status.java)
        priority: "LOW",         // Enum (πρέπει να είναι κεφαλαία όπως στο Priority.java)
        dueDate: new Date().toISOString().split('T')[0], // Σήμερα (YYYY-MM-DD) για να περνάει το @FutureOrPresent
        active: true
    };

    try{

        const savedTask = await addTask(userId,categoryId,newTaskPayload);
        setTasks([...tasks,savedTask]);
        setNewTaskTitle("");
    } catch (err) {
            console.error("Error adding task:", err);
        }
    };

    const handleDeleteTask = async (id) => {

        try{
            await deleteTask(id,userId);
            const newTasks = tasks.filter(task => task.id !== id);
            setTasks(newTasks);
        } catch (err) {
            console.error("Error deleting:", err);
        }

    };

    const handleUpdate = async (task,newStatus) =>{

        const updatedData = {
            title: task.title,
            status: newStatus,             // Το νέο status
            priority: task.priority,       // Πρέπει να υπάρχει
            dueDate: task.dueDate ? task.dueDate.split("T")[0] : null,         // Πρέπει να υπάρχει
            label: task.label ?? "General",
        };

        try{

            await updateTask(task.id,updatedData);
            setTasks(tasks.map(t => t.id === task.id ? {...t, status: newStatus } : t));
        }catch (error) {
                console.error("Error:", error);
                alert("Task not Updated");
        }
    };




    
 

    return(
        <div>
            <h1>My Task List!</h1>
            
            <div className="filters" style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
            {/* Input for search title */}
            <input
                type="text"
                placeholder="Search Title"
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
            />

            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="">All Status</option>
            <option value="TODO">TODO</option>
            <option value="IN_PROGRESS">IN PROGRESS</option>
            <option value="REVIEW">REVIEW</option>
            <option value="DONE">DONE</option>
            </select>

            <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
            <option value="">All Priorities</option>
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
            </select>
            
            </div>
            <TaskList tasks={tasks} onDelete={handleDeleteTask} onUpdate = {handleUpdate}/>
            <div>
                <button 
                    disabled={page===0}
                    onClick={() => setPage(prev => prev-1)}>Previous
                </button>
                <span>Page {page +1} of {totalPages}</span>

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
    )
}

export default App;