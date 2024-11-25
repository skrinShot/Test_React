import React from "react";
import styles from "./Pagination.module.css";

interface PaginationProps {
    currentPage: number; // Текущая страница
    totalPages: number; // Общее количество страниц
    onPageChange: (page: number) => void; // Функция, вызываемая при смене страницы
}

const Pagination: React.FC<PaginationProps> = ({
                                                   currentPage,
                                                   totalPages,
                                                   onPageChange,
                                               }) => {
    // Генерация массива номеров страниц
    const getPageNumbers = () => {
        const pageNumbers = [];
        const startPage = Math.max(1, currentPage - 2); // Две страницы перед текущей
        const endPage = Math.min(totalPages, currentPage + 2); // Две страницы после текущей

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        return pageNumbers;
    };

    const handlePageClick = (page: number) => {
        if (page !== currentPage) {
            onPageChange(page);
        }
    };

    return (
        <div className={styles.pagination}>
            {/* Кнопка "Previous" */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={styles.button}
            >
                Previous
            </button>

            {/* Номера страниц */}
            {getPageNumbers().map((page) => (
                <button
                    key={page}
                    onClick={() => handlePageClick(page)}
                    className={`${styles.button} ${
                        page === currentPage ? styles.activeButton : ""
                    }`}
                >
                    {page}
                </button>
            ))}

            {/* Кнопка "Next" */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={styles.button}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
