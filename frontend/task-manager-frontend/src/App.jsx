import { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import UserStats from "./components/UserStats";
import { useTasks } from "./hooks/useTasks";
import { useCategoryManager } from "./hooks/useCategoryManager";
import  Header  from "./components/Header";

function App() {
    const [showRegister, setShowRegister] = useState(false);
    const [userId, setUserId] = useState(sessionStorage.getItem("userId")); 

    // Χρήση των Hooks
    const { 
        tasks, newLabel, setNewLabel, newPriority, setNewPriority,
        newTaskTitle, setNewTaskTitle, searchTitle, setSearchTitle,
        filterStatus, setFilterStatus, filterPriority, setFilterPriority,
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
        <div>
            <Header onLogout={() => {
                sessionStorage.removeItem("userId");
                setUserId(null);
                }} 
            />
            <h1 className="text-3xl font-bold text-center text-gray-800 my-80">My Task List!</h1>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => { sessionStorage.removeItem("userId"); setUserId(null); }}>Logout</button>
            
            <div className="filters" style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
                <input type="text" placeholder="Search Title" value={searchTitle} onChange={(e) => setSearchTitle(e.target.value)}/>
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

            <TaskList tasks={tasks} onDelete={handleDeleteTask} onUpdate={handleUpdate}/>
            
            <div>
                <button disabled={page === 0} onClick={() => setPage(prev => prev - 1)}>Previous</button>
                <span>Page {page + 1} of {totalPages}</span>
                <button disabled={page >= totalPages - 1} onClick={() => setPage(prev => prev + 1)}>Next</button>
            </div>

            <div style={{ margin: "10px 0" }}>
                <label>Category: </label>
                <select value={selectedCategoryId} onChange={(e) => setSelectedCategoryId(e.target.value)}>
                    <option value="">Select a category</option>
                    {categories.map(cat => (<option key={cat.id} value={cat.id}>{cat.name}</option>))}
                </select>

                <div style={{ margin: "20px 0", padding: "10px", border: "1px solid #ccc" }}>
                    <h3>Create New Category</h3>
                    <input type="text" placeholder="Category Name" value={newCatName} onChange={(e) => setNewCatName(e.target.value)} />
                    <button onClick={handleAddCategory}>Add Category</button>
                </div>
            </div>

            <TaskForm
                taskTitle={newTaskTitle} onTitleChange={setNewTaskTitle}
                label={newLabel} onLabelChange={setNewLabel}
                priority={newPriority} onPriorityChange={setNewPriority}
                onAdd={() => handleAddTask(selectedCategoryId)}
            />

            <UserStats userId={userId} tasks={tasks}/>
        </div>
    );
}

export default App;