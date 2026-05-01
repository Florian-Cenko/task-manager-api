import { useState } from "react";
import { useCategoryManager } from "../hooks/useCategoryManager";

export default function SideBar({userId, onSelectCategory}){

    // 1. Φέρνουμε τα δεδομένα και τις συναρτήσεις από το hook
    const {categories,handleAddCategory,handleDeleteCategory} = useCategoryManager(userId);

    // 2. Τοπικό state για τη φόρμα δημιουργίας μέσα στο Sidebar
    const [isAdding, setIsAdding] = useState(false);
    const [newCatName, setNewCatName] = useState("");

    // 3. Διαχωρισμός (Filtering)
    const systemCategories = categories.filter(c => c.isSystem);
    const userCategories = categories.filter(c => !c.isSystem);



    return (
        <div className="flex h-screen bg-gray-50 border-r border-gray-200 flex flex-col p-4">
            <h2 className="text-xl font-bold text-gray-800 mb-6">My Workspace</h2>
    
             {/* Εδώ θα μπουν οι λίστες */}
             <div className="mb-6">
                <p className="text-xs font-semibold text-gray-400 uppercase mb-2">System</p>
                {systemCategories.map(cat => (
                    <button 
                        key={cat.id}
                        onClick={() => onSelectCategory(cat)}
                        className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded-lg transition"
                    >
                        <span className="mr-2">📌</span>
                            {cat.name}
                    </button>
                    ))}
            </div>

            <div className="flex-1 overflow-y-auto">
                <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Custom</p>
                {userCategories.map(cat => (
                    <div key={cat.id} className="group flex items-center justify-between px-3 py-2 hover:bg-gray-200 rounded-lg transition cursor-pointer">
                        <button onClick={() => onSelectCategory(cat)} className="flex items-center text-sm text-gray-700">
                            <div className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: cat.color }} />
                                {cat.name}
                        </button>
                        <button 
                            onClick={() => handleDeleteCategory(cat.id)}
                            className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>
    
            {/* Εδώ θα μπει το κουμπί προσθήκης στο τέλος */}

            <div className="mt-auto border-t pt-4">
                {isAdding ? (
                    <div className="flex flex-col gap-2">
                        <input 
                            autoFocus
                            className="p-2 text-sm border rounded outline-none focus:ring-2 focus:ring-blue-400"
                            value={newCatName}
                            onChange={(e) => setNewCatName(e.target.value)}
                            placeholder="Category name..."
                        />
                        <div className="flex gap-2">
                            <button 
                                 onClick={() => {
                                 handleAddCategory(newCatName, "#3b82f6");
                                 setIsAdding(false);
                                 setNewCatName("");
                                }}
                                className="flex-1 bg-blue-600 text-white text-xs py-2 rounded font-bold"
                            >
                                Save
                            </button>
                            <button onClick={() => setIsAdding(false)} className="px-2 text-xs text-gray-500">Cancel</button>
                        </div>
                     </div>
                ) : (
                <button 
                    onClick={() => setIsAdding(true)}
                    className="w-full flex items-center justify-center p-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 transition"
                >
                    + New Category
                </button>
                )}
            </div>
        </div>
    );
};