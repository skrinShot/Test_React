import React, { useState, useEffect } from "react";
import MoviesListCard from "@/components/MoviesListCard/MoviesListCard";
import Pagination from "@/components/Pagination/Pagination";
import styles from "./MoviesList.module.css";

const MoviesList: React.FC = () => {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    // Функция для получения фильмов с сервера
    const fetchMovies = async (page: number) => {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${page}`
        );
        const data = await response.json();
        setMovies(data.results);
        setTotalPages(data.total_pages);
    };


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
