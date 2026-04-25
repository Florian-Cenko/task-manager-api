export default function TaskItem({ task, onDelete, onUpdate }) {
    return (
        <li style={{ marginBottom: "10px", padding: "5px", borderBottom: "1px solid #eee" }}>
            {/* Τίτλος Task */}
            <span style={{ fontWeight: "bold", marginRight: "10px" }}>{task.title}</span>

            {/* Category Badge */}
            <span style={{ 
                backgroundColor: "#e2e8f0", 
                padding: "2px 8px", 
                borderRadius: "12px", 
                fontSize: "0.8rem",
                marginRight: "10px" 
            }}>
                {task.categoryName || "No Category"}
            </span>

            {/* Delete Button */}
            <button onClick={() => onDelete(task.id)}>Delete</button>
            
            {/* Status Dropdown */}
            <select 
                style={{ marginLeft: "10px" }}
                value={task.status} 
                onChange={(e) => onUpdate(task, e.target.value)}
            > 
                <option value="TODO">TO DO</option>
                <option value="IN_PROGRESS">IN PROGRESS</option>
                <option value="REVIEW">REVIEW</option>
                <option value="DONE">DONE</option>
            </select>
        </li>
    );
}