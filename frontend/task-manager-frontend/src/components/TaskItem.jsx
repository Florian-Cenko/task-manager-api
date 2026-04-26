import { FiCalendar, FiEdit2, FiTrash2, FiSearch} from 'react-icons/fi';

export default function TaskItem({ task, onDelete, onUpdate }) {

    // Συνάρτηση για δυναμικά χρώματα βάσει status
    const getStatusStyle = (status) => {
        switch(status) {
            case 'DONE': return 'bg-green-100 text-green-700';
            case 'IN_PROGRESS': return 'bg-yellow-100 text-yellow-700';
            case 'REVIEW': return 'bg-blue-100 text-blue-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };
   return (
        <div className="ml-8 w-full bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300 relative group">            
             {/* Header: Title and Category */}
            <div className="mb-4">
                <span className="-mt-5 bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
                    {task.categoryName || "General"}
                </span>
                <h3 className="flex font-bold text-lg text-gray-800 text-left mt-2">{task.title}</h3>  
            </div>

            {/* Status Dropdown */}
            <div className="mb-6 flex items-center gap-3">
               <span className="text-sm font-medium text-gray-800">Status</span>
               <select 
                    value={task.status} 
                    onChange={(e) => onUpdate(task, e.target.value)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-full cursor-pointer focus:ring-2 focus:ring-gray-300 outline-none transition ${getStatusStyle(task.status)}`}
                > 
                    <option value="TODO">TODO</option>
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="REVIEW">REVIEW</option>
                    <option value="DONE">DONE</option>
                </select>
            </div>

            {/* Footer: Due Date & Action Icons */}
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <FiCalendar className="w-4 h-4" />
                    <span>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No Date"}</span>
                </div>

                <div className="flex gap-3 text-gray-500 items-center opacity-0 group-hover:opacity-100 transition-opacity">
                    {/* <button className="hover:text-blue-600 transition">
                       <FiEdit2 className="w-4 h-4" />
                    </button> */}
                    <button 
                        onClick={() => onDelete(task.id)}
                        className="hover:text-red-600 transition"
                    >
                       <FiTrash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}



