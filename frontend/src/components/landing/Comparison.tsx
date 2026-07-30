import { SplitScreenDemo } from "../SplitScreenDemo";

export function Comparison() {
  return (
    <section id="comparison" className="py-24 border-t border-ink-700/10 dark:border-paper-200/10">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="font-display text-3xl sm:text-4xl text-ink-950 dark:text-paper-50 text-center">
          What Etherscan sees vs. what you see
        </h2>
        <p className="mt-4 text-center text-ink-700 dark:text-paper-200/70 max-w-xl mx-auto">
          Same transaction, two audiences. GhostPay decides who gets which view.
        </p>
        <div className="mt-12">
          <SplitScreenDemo />
        </div>
      </div>
    </section>
  );
}
