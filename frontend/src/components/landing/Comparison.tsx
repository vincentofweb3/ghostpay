import { SplitScreenDemo } from "../SplitScreenDemo";

export function Comparison() {
  return (
    <section
      id="comparison"
      className="py-28 border-t border-ink-700/10 dark:border-paper-200/10"
    >
      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xs font-mono uppercase tracking-[0.35em] text-brass-600 dark:text-brass-400">
            Privacy Comparison
          </p>

          <h2 className="mt-4 font-display text-4xl sm:text-5xl text-ink-950 dark:text-paper-50">
            Same transaction.
            <br />
            Completely different visibility.
          </h2>

          <p className="mt-6 text-lg leading-8 text-ink-700 dark:text-paper-200/70">
            Every blockchain explorer sees encrypted payment data.
            Only authorized GhostPay participants can reveal the actual
            amount and payment details.
          </p>
        </div>

        <div className="mt-16">
          <SplitScreenDemo />
        </div>
      </div>
    </section>
  );
}