const STEPS = [
  {
    n: "01",
    title: "Wrap",
    text: "Deposit a stablecoin once. It becomes a confidential balance - same value, encrypted going forward.",
  },
  {
    n: "02",
    title: "Send",
    text: "Pick a recipient and amount. The amount and category are encrypted client-side before they ever touch the chain.",
  },
  {
    n: "03",
    title: "Reveal",
    text: "Only the sender and recipient can decrypt it by default. Grant a third party access to one payment, any time, without exposing the rest.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 border-t border-ink-700/10 dark:border-paper-200/10">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="font-display text-3xl sm:text-4xl text-ink-950 dark:text-paper-50">How it works</h2>
        <div className="mt-12 space-y-10">
          {STEPS.map((s, i) => (
            <div key={s.n} className="flex gap-6">
              <div className="flex flex-col items-center">
                <span className="font-mono text-sm text-brass-600 dark:text-brass-400">{s.n}</span>
                {i < STEPS.length - 1 && (
                  <span className="flex-1 w-px bg-ink-700/15 dark:bg-paper-200/15 mt-2" />
                )}
              </div>
              <div className="pb-2">
                <h3 className="font-display text-xl text-ink-950 dark:text-paper-50">{s.title}</h3>
                <p className="mt-2 text-sm text-ink-700 dark:text-paper-200/70 max-w-md">{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
