const BASE_URL = "https://api.themoviedb.org/3"; // Базовый URL API
const API_KEY = process.env.NEXT_PUBLIC_API_KEY; // Подключаем ключ из .env.local

// Проверка: если ключ отсутствует, выбрасываем ошибку
if (!API_KEY) {
    throw new Error("API_KEY is not defined. Make sure you added it to .env.local");
}

// Общая функция для выполнения запросов к API
export const fetchFromAPI = async (endpoint: string, params: Record<string, any> = {}) => {
    try {
        // Формируем параметры запроса
        const urlParams = new URLSearchParams({
            api_key: API_KEY, // Добавляем API-ключ
            ...params, // Добавляем дополнительные параметры
        });

        // Полный URL запроса
        const url = `${BASE_URL}/${endpoint}?${urlParams.toString()}`;

        // Выполняем запрос
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        // Возвращаем JSON-ответ
        return response.json();
    } catch (error) {
        console.error("API request failed:", error);
        throw error;
    }
};
