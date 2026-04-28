import { useState } from "react";
import { useCategoryManager } from "../hooks/useCategoryManager";
export default function TaskForm({ userId, taskTitle, onTitleChange, label, onLabelChange, priority, onPriorityChange,categories,category,onCategoryChange,dueDate,onChangeDueDate, onAdd }) {
   
    const [isCreating, setIsCreating] = useState(false);
    const { handleAddCategory, newCatName, setNewCatName } = useCategoryManager(userId);   
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

            {/*Category Selection-Creation*/}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                    value={isCreating ? 'NEW': category}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    onChange={(e) => {
                        if (e.target.value === 'NEW'){
                            setIsCreating(true);
                        }else {
                            setIsCreating(false);
                            onCategoryChange(e.target.value);
                        }
                    }}
                >

                    <option value="">Select a category</option>
                        {categories.map(cat => (<option key={cat.id} value={cat.id}>{cat.name}</option>))}
                    <option value="NEW" className="font-bold text-blue-600">+ Add New Category</option>
                </select>

                {isCreating && (
                    <div className="mt-2 flex gap-2">
                        <input 
                            type="text" 
                            placeholder="Enter new category name..."
                            className="w-full p-2 border border-blue-400 rounded-lg outline-none"
                            value={newCatName}
                            onChange={(e) => setNewCatName(e.target.value)}
                        />
                        <button 
                            type="button"
                            className="bg-green-500 text-white px-3 py-2 rounded-lg"
                            onClick={() => {
                            handleAddCategory();
                            setIsCreating(false);
                            }}
                         >
                             Save
                        </button>
                    </div>
                )}
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