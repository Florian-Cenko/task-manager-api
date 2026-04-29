import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    return (
        <div className="flex items-center justify-center gap-6 mt-10 py-6 border-t border-gray-100">
            
            {/* Previous Button */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
                <FiChevronLeft className="w-4 h-4" /> Previous
            </button>

            {/* Page indicator */}
            <span className="text-sm font-medium text-gray-600">
                Page <span className="font-bold text-blue-600">{currentPage}</span> of {totalPages}
            </span>

            {/* Next Button */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
                Next <FiChevronRight className="w-4 h-4" />
            </button>
        </div>
    );
}