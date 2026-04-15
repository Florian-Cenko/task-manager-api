import CategoryList from './components/CategoryList';
import TaskList from './components/TaskList';

function App() {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5 text-primary">Task Manager Dashboard</h1>
      <div className="row">
        {/* Αριστερή Στήλη: Κατηγορίες */}
        <div className="col-md-4">
          <div className="p-3 border rounded bg-light">
            <CategoryList />
          </div>
        </div>

        {/* Δεξιά Στήλη: Tasks */}
        <div className="col-md-8">
          <div className="p-3 border rounded shadow-sm">
            <TaskList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;