import { useState } from "react";


export default function TaskItem({task, onDelete, onUpdate}){
    return (
        <li>
            {task.title}
            <button onClick={() => onDelete(task.id)}>Delete</button>
            <select value={task.status} onChange={(e) => onUpdate(task, e.target.value)}> 
                <option value="TODO">TO DO</option>
                <option value="IN_PROGRESS">IN PROGRESS</option>
                <option value="REVIEW">REVIEW</option>
                <option value="DONE">DONE</option>


            </select>
        </li>
    );
}
