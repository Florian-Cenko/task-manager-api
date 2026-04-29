export default function TaskModal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg relative animate-in fade-in zoom-in duration-200">
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    ✕
                </button>
                
                {/* Εδώ μέσα θα μπει το TaskForm */}
                {children}
            </div>
        </div>
    );
}