import { useState, useEffect } from "react";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/api/tasks/1/allTasks')
      .then(response => response.json())
      .then(data => {
        setTasks(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, []);

  // 1. Η ΣΥΝΑΡΤΗΣΗ ΠΡΕΠΕΙ ΝΑ ΕΙΝΑΙ ΕΔΩ (Πάνω από το return του loading)
  const deleteTask = (taskId) => {
    const userId = 1; 
    if (!window.confirm("Are you sure?")) return; // Προαιρετικό confirmation

    fetch(`http://localhost:8080/api/tasks/${taskId}/users/${userId}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        setTasks(tasks.filter(t => t.id !== taskId));
      } else {
        alert("Something went wrong with deletion.");
      }
    })
    .catch(error => console.error('Error:', error));
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'HIGH': return 'bg-danger';
      case 'MEDIUM': return 'bg-warning text-dark';
      case 'LOW': return 'bg-success';
      default: return 'bg-secondary';
    }
  };

  // 2. ΤΟ LOADING ΠΡΕΠΕΙ ΝΑ ΕΙΝΑΙ ΜΕΤΑ ΤΟΝ ΟΡΙΣΜΟ ΤΩΝ ΣΥΝΑΡΤΗΣΕΩΝ
  if (loading) return <div className="text-center p-5">Tasks Loading...</div>;

  return (
    <div>
      <h2 className="mb-4">My Tasks</h2>
      <div className="row">
        {tasks.length === 0 ? (
          <p className="text-muted">You don't have any Task!</p>
        ) : (
          tasks.map(task => (
            <div key={task.id} className="col-12 mb-3">
              <div className="card shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between">
                         <h5 className="card-title">{task.title}</h5>
                         {/* Το κουμπί Delete */}
                         <button 
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => deleteTask(task.id)}>
                            Delete
                         </button>
                      </div>
                      <h6 className="card-subtitle mb-2 text-muted">
                        {task.label}
                      </h6>
                    </div>
                    <span className={`badge ${getPriorityClass(task.priority)} ms-2`}>
                      {task.priority}
                    </span>
                  </div>

                  <p className="card-text small mt-2">
                    <strong>Category:</strong> {task.categoryName || 'Without Category'}
                  </p>

                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <span className="text-muted small">Due: {task.dueDate}</span>
                    <span className="badge border text-primary border-primary">
                      {task.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TaskList;