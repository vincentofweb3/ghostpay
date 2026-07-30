import { Logo } from "../Logo";
import { ThemeToggle } from "../ThemeToggle";

const GITHUB_URL = "https://github.com/YOUR-USERNAME/ghostpay";

export function LandingNavbar({ onLaunch, onDocs }: { onLaunch: () => void; onDocs: () => void }) {
  return (
    <header className="sticky top-0 z-10 backdrop-blur bg-paper-50/80 dark:bg-ink-950/80 border-b border-ink-700/10 dark:border-paper-200/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-2">
        <Logo className="shrink-0" />
        <nav className="hidden sm:flex items-center gap-6 text-sm text-ink-700 dark:text-paper-200/70">
          <a href="#how-it-works" className="hover:text-brass-600 dark:hover:text-brass-400 transition-colors">How it works</a>
          <a href="#features" className="hover:text-brass-600 dark:hover:text-brass-400 transition-colors">Features</a>
          <a href="#comparison" className="hover:text-brass-600 dark:hover:text-brass-400 transition-colors">Privacy comparison</a>
          <button onClick={onDocs} className="hover:text-brass-600 dark:hover:text-brass-400 transition-colors">Documentation</button>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="hover:text-brass-600 dark:hover:text-brass-400 transition-colors">GitHub ↗</a>
        </nav>
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <ThemeToggle />
          <button
            onClick={onLaunch}
            className="rounded bg-ink-950 dark:bg-paper-50 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-paper-50 dark:text-ink-950 hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            Launch Console
          </button>
        </div>
      </div>
    </header>
  );
}
