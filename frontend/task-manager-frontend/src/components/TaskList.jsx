import TaskItem from "./TaskItem";

export default function TaskList({tasks, onDelete, onUpdate}){

    // Αν το tasks δεν έχει φορτωθεί ακόμα (είναι null/undefined), δείξε Loading.
    // Αν είναι πίνακας (ακόμα και άδειος []), άσε το να πάει στο map.
    if (!tasks) {
        return <p>Loading tasks...</p>;
    }

    return (
        <ul>
            {tasks.length > 0 ? (
                tasks.map(task => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onDelete={onDelete}
                        onUpdate={onUpdate}
                    />
                ))
            ) : (
                <p>No tasks found.</p>
            )}
        </ul>
    );
};