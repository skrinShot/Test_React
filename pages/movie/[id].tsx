import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "@/components/MoviesListCard/MoviesListCard.module.css";
import { Movie, Video, Actor } from "@/interfaces/Movie";
import Header from "@/components/Header/Header";


const MovieDetail = () => {
    const router = useRouter();
    const { id } = router.query;
    const [actors, setActors] = useState<Actor[]>([]);
    const [movie, setMovie] = useState<Movie | null>(null);
    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    useEffect(() => {
        const fetchActors = async () => {
            if (id) {
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
                );
                const data = await response.json();
                setActors(data.cast.slice(0, 10));
            }
        };

        fetchActors();
    }, [id]);
    useEffect(() => {
        if (!API_KEY) {
            console.error("API Key is missing!");
            return;
        }

        if (id) {
            const fetchMovieData = async () => {
                try {
                    const res = await fetch(
                        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
                    );

                    if (!res.ok) throw new Error(`Fetch error: ${res.status}`);

                    const data = await res.json();
                    setMovie(data);
                } catch (error) {
                    console.error("Error fetching movie data:", error);
                }
            };

            fetchMovieData();
        }
    }, [id, API_KEY]);

    const [trailer, setTrailer] = useState<string>("");
    useEffect(() => {
        const fetchTrailer = async () => {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
            );
            const data = await response.json();
            const trailerData = data.results?.find(
                (video: Video) => video.type === "Trailer" && video.site === "YouTube"
            );

            if (trailerData) {
                setTrailer(`https://www.youtube.com/embed/${trailerData.key}`);
            }
        };

        fetchTrailer();
    }, [id]);

    if (!movie) return <div>Loading...</div>;

    return (
        <div>
            <Header/>
            <div className={styles.box}
                 style={{
                     backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
                     backgroundSize: "cover",
                     backgroundPosition: "center",
                 }}
            >
                <div className={styles.boxInBox}>
                    <div className={styles.box_left}>
                        <img
                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                            alt={movie.title}
                            className={styles.soloPoster}
                        />
                    </div>
                    <div className={styles.box_right}>
                        <h3 className={styles.p1}>{movie.title}</h3>
                        <p className={styles.p1}>
                            <strong>Release Date:</strong> {movie.release_date}
                        </p>
                        <p className={styles.p1}>
                            <strong>Rating:</strong> {movie.vote_average}/10
                        </p>
                        <p className={styles.p1}>
                            <strong>Overview:</strong> {movie.overview}
                        </p>
                        <div>
                            {/* Секция с трейлером */}
                            {trailer && (
                                <div className={styles.trailer}>
                                    <h2>Trailer</h2>
                                    <iframe
                                        width="560"
                                        height="315"
                                        src={trailer}
                                        title="Trailer"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className={styles.boxInBoxBot}>
                    <div className={styles.asdasd}>
                        {/* Секция с актёрами */}
                        <div className={styles.actors}>
                            <h2>Actors</h2>
                            <div className={styles.actorsGrid}>
                                {actors.map((actor) => (
                                    <div key={actor.id} className={styles.actorCard}>
                                        {actor.profile_path ? (
                                            <img
                                                src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
                                                alt={actor.name}
                                                className={styles.actorPhoto}
                                            />
                                        ) : (
                                            <div className={styles.actorPlaceholder}>No Image</div>
                                        )}
                                        <p className={styles.nameActor}>{actor.name}</p>
                                        <p className={styles.character}>{actor.character}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default MovieDetail;
