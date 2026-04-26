export default function TaskForm({ taskTitle, onTitleChange, label, onLabelChange, priority, onPriorityChange,categories,category,onCategoryChange,dueDate,onChangeDueDate, onAdd }) {
    return (
        <div className="grid grid-cols-2 gap-4">
            {/* Task Title */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
                <input
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    value={taskTitle}
                    onChange={(e) => onTitleChange(e.target.value)}
                    placeholder="e.g., Python Project"
                />
            </div>

            {/* Label */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Task Label</label>
                <input
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    value={label}
                    onChange={(e) => onLabelChange(e.target.value)}
                    placeholder="e.g., Finalization"
                />
            </div>

             {/* Category Selection */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select value={category} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" onChange={(e) => onCategoryChange(e.target.value)}>
                    <option value="">Select a category</option>
                    {categories.map(cat => (<option key={cat.id} value={cat.id}>{cat.name}</option>))}
                </select>
            </div>

            {/* Priority */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    value={priority}
                    onChange={(e) => onPriorityChange(e.target.value)}
                >
                    <option value="" disabled>Select Priority</option>
                    <option value="LOW">LOW</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HIGH">HIGH</option>
                </select>
            </div>

            {/*Due Date*/}
            <div>
                <label className="block text-sm font-medium mb-1">Due Date</label>
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => onChangeDueDate(e.target.value)}
                    className="w-full p-3 border rounded-lg"
                />
            </div>

            {/* Submit Button */}
            <button 
                onClick={onAdd}
                className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition"
            >
                Create Task
            </button>
        </div>
    );
}