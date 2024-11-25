import React from "react";
import {Movie} from "@/interfaces/Movie"; // Интерфейс фильма
import styles from "./MoviesListCard.module.css"; // Стили для карточки фильма
import Link from "next/link";

// Описание пропсов для MovieCard
interface MovieCardProps {
    movie: Movie,
}

// Функциональный компонент MovieCard
const MoviesListCard: React.FC<MovieCardProps> = ({movie}) => {


    return (

        <Link href={`/movie/${movie.id}`} className={styles.card}>
            <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                className={styles.poster}
            />
            <h3 className={styles.title}>{movie.title}</h3>
            <p className={styles.rating}>Rating: {movie.vote_average}/10</p>
        </Link>

    );
};

export default MoviesListCard;
