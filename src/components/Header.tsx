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
    if (document.documentElement.classList.contains('dark')) {
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    } else {
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    }
  };

  return (
    <header className="flex items-center justify-between p-6 mb-4 glass-panel glass-edge rounded-b-3xl">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-800 dark:text-white">
          Monitoring Tambak Garam
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">Vision Dashboard</p>
      </div>
      <div className="flex items-center space-x-6">
        <div className="flex items-center px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-800/50">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-2"></span>
          <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">Terhubung</span>
        </div>
        <span className="text-lg font-medium tracking-tight text-slate-700 dark:text-slate-200">
          {time}
        </span>
        <button
          onClick={toggleDarkMode}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors shadow-inner"
          aria-label="Toggle dark mode"
        >
          {isDark ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
}
