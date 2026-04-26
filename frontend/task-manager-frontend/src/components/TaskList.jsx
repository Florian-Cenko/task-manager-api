import TaskItem from "./TaskItem";

export default function TaskList({tasks, onDelete, onUpdate}){

    // Αν το tasks δεν έχει φορτωθεί ακόμα (είναι null/undefined), δείξε Loading.
    // Αν είναι πίνακας (ακόμα και άδειος []), άσε το να πάει στο map.
    if (!tasks) {
        return <p>Loading tasks...</p>;
    }

return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tasks.length > 0 ? (
                    tasks.map(task => (
                        //Every Card
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
        </div>
    );
        
};