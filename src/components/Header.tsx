import React, { useState, useEffect } from 'react';

export default function Header() {
  const [time, setTime] = useState<string>(new Date().toLocaleTimeString());
  const [isDark, setIsDark] = useState<boolean>(document.documentElement.classList.contains('dark'));

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
    setIsDark(!isDark);
  };

  return (
    <header className="flex items-center justify-between p-4 bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg rounded-xl shadow-md transition-colors duration-300">
      <h1 className="text-2xl font-semibold text-primary">Sistem Monitoring Tambak Garam</h1>
      <div className="flex items-center space-x-4">
        <span className="bg-green-500 px-2 py-1 rounded text-sm">Connected</span>
        <span id="clock" className="text-sm font-mono">{time}</span>
        <button
          onClick={toggleDarkMode}
          className="px-2 py-1 rounded bg-gray-800 hover:bg-gray-700 transition-colors"
          aria-label="Toggle dark mode"
        >
          {isDark ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
}
