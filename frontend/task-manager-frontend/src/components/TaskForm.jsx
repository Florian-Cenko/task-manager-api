export default function TaskForm({ taskTitle, onTitleChange, onAdd }) {
    return (
        <div>
            <input
                type="text"
                value={taskTitle}
                onChange={(e) => onTitleChange(e.target.value)}
                placeholder="Add a Task..."
            />
            <button onClick={onAdd}>Add Task</button>
        </div>
    );
}

