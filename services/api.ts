const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;


if (!API_KEY) {
    throw new Error("API_KEY is not defined. Make sure you added it to .env.local");
}


export const fetchFromAPI = async (endpoint: string, params: Record<string, any> = {}) => {
    try {

        const urlParams = new URLSearchParams({
            api_key: API_KEY,
            ...params,
        });


        const url = `${BASE_URL}/${endpoint}?${urlParams.toString()}`;


        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }


        return response.json();
    } catch (error) {
        console.error("API request failed:", error);
        throw error;
    }
};
