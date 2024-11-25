import React from "react";
import styles from "./Header.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
const goToHome = () => {
    window.location.href = "/"; // Полный перезапуск страницы
};

const toggleAuthModal = () => {
    setShowAuthModal((prev) => !prev);
};

const Header: React.FC = () => {

    const [searchQuery, setSearchQuery] = useState(""); // Добавлено состояние строки поиска
    const router = useRouter();

    const handleSearch = (event?: React.KeyboardEvent<HTMLInputElement>) => {
        if (event && event.key !== "Enter") {
            // Если событие существует, но клавиша не Enter, выходим
            return;
        }

        if (searchQuery.trim() !== "") {
            router.push(`/search?query=${encodeURIComponent(searchQuery)}`); // Перенаправление на страницу поиска
        }
    };
    return(
        <header className={styles.header}>
            <div className={styles.headerTop}>
                <p className={styles.nameOfHeader}>Trailer Hub</p>
                <button
                    className={styles.authButton}
                    onClick={toggleAuthModal}
                >
                    Login / Sign Up
                </button>
            </div>
            <div className={styles.headerBot}>
                <button onClick={goToHome} className={styles.homeButton}>
                    Home
                </button>
                <input
                    type="text"
                    value={searchQuery}
                    className={styles.searchInput}
                    onChange={(e) => setSearchQuery(e.target.value)} // Обновление состояния строки поиска
                    onKeyPress={handleSearch} // Обработка нажатия клавиш
                    placeholder="Search for a movie..."
                />

                <button className={styles.searchButton} onClick={() => handleSearch()}>Search</button>
            </div>

        </header>
    )
}

export default Header