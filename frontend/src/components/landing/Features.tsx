const FEATURES = [
  {
    n: "01",
    title: "Encrypted amounts",
    text: "Payment amounts exist on-chain only as encrypted handles - never plaintext, never in calldata.",
  },
  {
    n: "02",
    title: "Private categories",
    text: "Payroll, donations, freelance, treasury - the category itself is encrypted too, not just the number.",
  },
  {
    n: "03",
    title: "Selective-disclosure receipts",
    text: "Prove one payment to one auditor without making it public, or exposing anything else you've sent.",
  },
  {
    n: "04",
    title: "Built on iExec Nox",
    text: "Confidential computation inside TEEs, fully composable with the transparent infrastructure underneath.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 border-t border-ink-700/10 dark:border-paper-200/10">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-display text-3xl sm:text-4xl text-ink-950 dark:text-paper-50">Why GhostPay</h2>
        <div className="grid sm:grid-cols-2 gap-6 mt-12">
          {FEATURES.map((f) => (
            <div
              key={f.n}
              className="rounded-lg border border-ink-700/15 dark:border-paper-200/15 p-6 hover:border-brass-500/40 transition-colors"
            >
              <span className="text-xs font-mono text-brass-600 dark:text-brass-400">{f.n}</span>
              <h3 className="mt-2 font-display text-xl text-ink-950 dark:text-paper-50">{f.title}</h3>
              <p className="mt-2 text-sm text-ink-700 dark:text-paper-200/70">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
