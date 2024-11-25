import React, { useState, useEffect } from "react";
import MoviesListCard from "@/components/MoviesListCard/MoviesListCard";
import Pagination from "@/components/Pagination/Pagination"; // Импортируем компонент пагинации
import styles from "./MoviesList.module.css";

const MoviesList: React.FC = () => {
    const [movies, setMovies] = useState([]); // Фильмы для текущей страницы
    const [currentPage, setCurrentPage] = useState(1); // Текущая страница
    const [totalPages, setTotalPages] = useState(0); // Общее количество страниц

    // Функция для получения фильмов с сервера
    const fetchMovies = async (page: number) => {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${page}`
        );
        const data = await response.json();
        setMovies(data.results); // Устанавливаем фильмы для текущей страницы
        setTotalPages(data.total_pages); // Устанавливаем общее количество страниц
    };

    // Вызываем fetchMovies при изменении текущей страницы
    useEffect(() => {
        fetchMovies(currentPage);
    }, [currentPage]);

    // Смена страницы
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <div className={styles.moviesList}>
                {movies.map((movie) => (
                    <MoviesListCard key={movie.id} movie={movie} />
                ))}
            </div>

            {/* Пагинация */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}

            />
        </div>
    );
};

export default MoviesList;
