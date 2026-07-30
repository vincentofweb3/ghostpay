import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("ghostpay-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored ? stored === "dark" : prefersDark;
    setDark(initial);
    document.documentElement.classList.toggle("dark", initial);
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("ghostpay-theme", next ? "dark" : "light");
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle light and dark mode"
      className="shrink-0 rounded-full border border-ink-700/40 dark:border-paper-200/20 px-2.5 py-1 sm:px-3 text-xs font-mono text-ink-800 dark:text-paper-100 hover:bg-ink-700/5 dark:hover:bg-paper-100/5 transition-colors"
    >
      <span>{dark ? "◐" : "◑"}</span>
      <span className="hidden sm:inline ml-1">{dark ? "dark" : "light"}</span>
    </button>
  );
}
