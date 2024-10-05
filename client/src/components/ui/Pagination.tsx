import React from 'react';
import { useNavigate } from 'react-router-dom';

interface PaginationProps {
    totalPosts: number;
    currentPage: number;
    refreshTimeLine: ()=>void
}

const Pagination: React.FC<PaginationProps> = ({ totalPosts, currentPage,refreshTimeLine  }) => {
    const navigate = useNavigate();

    const postsPerPage = 10;
    const totalPages = Math.ceil(totalPosts / postsPerPage);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            navigate(`/${page}`)
            refreshTimeLine();
        }
    };

    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            // Show all pages if total pages is less than or equal to 5
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show the first page, last page, and up to 2 pages before and after the current page
            pages.push(1); // First page

            // Show "..." if current page is more than 3
            if (currentPage > 3) {
                pages.push('...');
            }

            // Show pages around the current page
            for (let i = Math.max(2, currentPage - 1); i <= Math.min(currentPage + 1, totalPages - 1); i++) {
                pages.push(i);
            }

            // Show "..." if current page is less than totalPages - 2
            if (currentPage < totalPages - 2) {
                pages.push('...');
            }

            pages.push(totalPages); // Last page
        }

        return pages;
    };

    return (
        <div className="flex flex-wrap justify-center content-center border border-gray-700 p-6 bg-gray-900 text-white rounded-lg shadow-md">
            <div className="flex justify-between items-center w-full">
                {/* Previous Button */}
                <button
                    className={`${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                        } bg-transparent border border-gray-700 text-gray-300 py-2 px-4 rounded-full hover:bg-gray-700 transition-colors duration-200`}
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    Previous
                </button>

                {/* Page Buttons */}
                <div className="flex flex-wrap justify-center space-x-2">
                    {getPageNumbers().map((page, index) =>
                        typeof page === 'number' ? (
                            <button
                                key={index}
                                className={`${currentPage === page
                                        ? 'bg-blue-500 text-white cursor-default'
                                        : 'bg-transparent text-gray-300 border-gray-700 hover:bg-gray-700'
                                    } border py-2 px-4 rounded-full transition-colors duration-200`}
                                onClick={currentPage===page?()=>{}:() => handlePageChange(page)}
                            >
                                {page}
                            </button>
                        ) : (
                            <span key={index} className="text-gray-500 py-2 px-4">
                                {page}
                            </span>
                        )
                    )}
                </div>

                {/* Next Button */}
                <button
                    className={`${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
                        } bg-transparent border border-gray-700 text-gray-300 py-2 px-4 rounded-full hover:bg-gray-700 transition-colors duration-200`}
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    Next
                </button>
            </div>
        </div>


    );
};

export default Pagination;