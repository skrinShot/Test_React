export interface Movie {
    id: number;
    title: string;
    poster_path: string;
    backdrop_path: string;
    overview: string;
    release_date: string;
    vote_average: number;
}
export interface Video {
    key: string;
    site: string;
    type: string;
}
export interface Actor {
    id: number;
    name: string;
    profile_path: string | null;
    character: string;
}