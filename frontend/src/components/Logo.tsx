export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        viewBox="0 0 32 32"
        className="w-6 h-6 text-brass-500 dark:text-brass-400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2" />
        <circle cx="16" cy="13" r="3.2" fill="currentColor" />
        <path d="M14.2 15.5 L17.8 15.5 L19 22 L13 22 Z" fill="currentColor" />
      </svg>
      <span className="font-display text-lg text-ink-950 dark:text-paper-50">GhostPay</span>
    </div>
  );
}
