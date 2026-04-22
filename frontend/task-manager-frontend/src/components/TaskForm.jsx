export default function TaskForm({ taskTitle, onTitleChange,
                                    label, onLabelChange,
                                    priority,onPriorityChange,
                                    onAdd }) {
    return (
        <div>
            <h3>Create New Task</h3>
            <input
                value={taskTitle}
                onChange={(e) => onTitleChange(e.target.value)}
                placeholder="Task Title"
            />
            <input
                value={label}
                onChange={(e) => onLabelChange(e.target.value)}
                placeholder="Label"
            />
            <select value={priority} onChange={(e) => onPriorityChange(e.target.value)}>
                <option value="" disabled>Select Priority</option>
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
            </select>
            <button onClick={onAdd}>Add Task</button>
        </div>
    );
}

