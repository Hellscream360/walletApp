import { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-200"
      aria-label="Toggle theme"
      title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          className="fill-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2a6 6 0 1 0 0-12 6 6 0 0 0 0 12ZM11 0h2v4.062a8.079 8.079 0 0 0-2 0V0ZM7.094 5.68 4.222 2.808 2.808 4.222 5.68 7.094A8.048 8.048 0 0 1 7.094 5.68ZM4.062 11H0v2h4.062a8.079 8.079 0 0 1 0-2Zm1.618 5.906-2.872 2.872 1.414 1.414 2.872-2.872a8.048 8.048 0 0 1-1.414-1.414ZM11 19.938V24h2v-4.062a8.079 8.079 0 0 1-2 0Zm5.906-1.618 2.872 2.872 1.414-1.414-2.872-2.872a8.048 8.048 0 0 1-1.414 1.414ZM19.938 13H24v-2h-4.062a8.079 8.079 0 0 1 0 2Zm-1.618-5.906 2.872-2.872-1.414-1.414-2.872 2.872a8.048 8.048 0 0 1 1.414 1.414Z"
          />
        </svg>
      ) : (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          className="fill-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.226 2.003a9.971 9.971 0 0 0-7.297 2.926c-3.905 3.905-3.905 10.237 0 14.142 3.905 3.905 10.237 3.905 14.142 0a9.972 9.972 0 0 0 2.926-7.297 10.037 10.037 0 0 0-.337-2.368 14.87 14.87 0 0 1-1.744 1.436c-1.351.97-2.733 1.686-4.129 2.167-1.395.48-2.917.783-4.496.783-1.579 0-3.101-.303-4.496-.783-1.396-.481-2.778-1.197-4.129-2.167-1.351-.97-2.447-2.074-3.417-3.425C.269 6.071-.447 4.689-.928 3.293-.952 3.215-.975 3.137-.997 3.059A9.971 9.971 0 0 1 2.003 4.93c3.905 3.905 10.237 3.905 14.142 0a9.971 9.971 0 0 1 1.871-3.019 10.037 10.037 0 0 0-5.79.092Z"
          />
        </svg>
      )}
    </button>
  );
};

export default ThemeToggle;
