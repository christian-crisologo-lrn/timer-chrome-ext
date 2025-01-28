import { useEffect, useState } from 'react';

const useDarkMode = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Check the initial theme preference from localStorage or system preference
        const savedTheme = localStorage.getItem('theme');
        return savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    return [isDarkMode, toggleDarkMode] as const;
};

export default useDarkMode;