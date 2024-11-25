import { useRouter } from "next/router";
import styles from "../styles/Search.module.css";
import React, { useEffect, useState } from "react";
import { Movie } from "@/interfaces/Movie";
import Header from "@/components/Header/Header"; // Интерфейс фильма

const Search = () => {
    const router = useRouter();
    const { query } = router.query;
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchMovies = async () => {
            if (query) {
                const response = await fetch(
                    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${query}`
                );
                const data = await response.json();
                setMovies(data.results);
            }
        };

        fetchMovies();
    }, [query]);

    const handleMovieClick = (id: number) => {
        router.push(`/movie/${id}`);
    };

    return (
        <div>
            <Header/>
        <div className={styles.container}>

            <h1>Search Results for "{query}"</h1>
            <div className={styles.moviesGrid}>
                {movies.length > 0 ? (
                    movies.map((movie) => (
                        <div
                            key={movie.id}
                            className={styles.movieCard}
                            onClick={() => handleMovieClick(movie.id)}
                        >
                            <img
                                src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                                alt={movie.title}
                                className={styles.moviePoster}
                            />
                            <p className={styles.name}>{movie.title}</p>
                        </div>
                    ))
                ) : (
                    <p>No results found.</p>
                )}
            </div>
        </div>
        </div>
    );
};

export default Search;
