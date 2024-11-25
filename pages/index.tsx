import React, { useEffect, useState } from "react";
import { fetchFromAPI } from "@/services/api";
import MoviesList from "@/components/MoviesList/MoviesList";
import { Movie } from "@/interfaces/Movie";
import Header from "@/components/Header/Header"



const Home: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const data = await fetchFromAPI("discover/movie", { language: "en-US" });
                setMovies(data.results);
            } catch (error) {
                console.error("Failed to fetch movies:", error);
            }
        };

        fetchMovies();
    }, []);

    return (
        <div>
            <Header/>
            <MoviesList movies={movies} />
        </div>
    );
};

export default Home;
