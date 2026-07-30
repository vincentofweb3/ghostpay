export function CTA({ onLaunch }: { onLaunch: () => void }) {
  return (
    <section className="py-24 border-t border-ink-700/10 dark:border-paper-200/10">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <h2 className="font-display text-3xl sm:text-4xl text-ink-950 dark:text-paper-50">
          Ready to send privately?
        </h2>
        <p className="mt-4 text-ink-700 dark:text-paper-200/70">
          Connect your wallet in the console - no new wallet, no migration.
        </p>
        <button
          onClick={onLaunch}
          className="mt-8 rounded bg-ink-950 dark:bg-paper-50 px-6 py-3 text-sm font-medium text-paper-50 dark:text-ink-950 hover:opacity-90 transition-opacity"
        >
          Launch Console
        </button>
      </div>
    </section>
  );
}
