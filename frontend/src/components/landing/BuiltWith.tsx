export function BuiltWith() {
  const stack = [
    "Ethereum Sepolia",
    "iExec Nox",
    "ERC-20",
    "ERC-7984",
    "React",
    "TypeScript",
  ];

  return (
    <section className="border-y border-ink-700/10 dark:border-paper-200/10 bg-paper-100/40 dark:bg-ink-900/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-12">
        <p className="text-center text-xs font-mono uppercase tracking-[0.35em] text-ink-700/60 dark:text-paper-200/50">
          Built with
        </p>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stack.map((item) => (
            <div
              key={item}
              className="
                flex items-center justify-center
                rounded-xl
                border border-brass-500/30
                bg-paper-50
                dark:bg-ink-950
                px-4 py-4
                transition-all duration-300
                hover:-translate-y-1
                hover:border-brass-500
                hover:shadow-lg
              "
            >
              <span className="text-sm font-medium text-ink-950 dark:text-paper-50">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
