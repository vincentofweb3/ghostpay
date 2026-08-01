const FEATURES = [
  {
    icon: "🔒",
    n: "01",
    title: "Encrypted Amounts",
    text: "Payment values are encrypted locally with iExec Nox before reaching Ethereum. No plaintext amounts ever appear in calldata or on-chain.",
    footer: "Confidential by default",
  },
  {
    icon: "🏷️",
    n: "02",
    title: "Private Categories",
    text: "Payroll, donations, freelance payments, treasury transfers and other payment labels remain encrypted alongside the transaction amount.",
    footer: "Metadata stays private",
  },
  {
    icon: "📜",
    n: "03",
    title: "Selective Disclosure",
    text: "Reveal a single payment to an auditor, accountant or regulator without exposing your entire transaction history.",
    footer: "Share only what you choose",
  },
  {
    icon: "⚡",
    n: "04",
    title: "Powered by iExec Nox",
    text: "GhostPay combines Ethereum settlement with confidential execution inside Trusted Execution Environments for real on-chain privacy.",
    footer: "Built for Web3",
  },
];

export function Features() {
  return (
    <section
      id="features"
      className="py-24 border-t border-ink-700/10 dark:border-paper-200/10"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center">
          <p className="text-xs font-mono uppercase tracking-[0.35em] text-brass-600 dark:text-brass-400">
            Features
          </p>

          <h2 className="mt-3 font-display text-4xl text-ink-950 dark:text-paper-50">
            Why GhostPay?
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-ink-700 dark:text-paper-200/70 leading-7">
            Built for confidential payments without sacrificing the security and
            transparency of Ethereum.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {FEATURES.map((feature) => (
            <div
              key={feature.n}
              className="
                group
                rounded-2xl
                border border-ink-700/10
                dark:border-paper-200/10
                bg-paper-50
                dark:bg-ink-900
                p-8
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-brass-500/50
                hover:shadow-xl
              "
            >
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-brass-500/30 bg-brass-500/10 text-2xl">
                  {feature.icon}
                </div>

                <span className="font-mono text-xs text-brass-600 dark:text-brass-400">
                  {feature.n}
                </span>
              </div>

              <h3 className="mt-6 font-display text-2xl text-ink-950 dark:text-paper-50">
                {feature.title}
              </h3>

              <p className="mt-4 leading-7 text-ink-700 dark:text-paper-200/70">
                {feature.text}
              </p>

              <div className="mt-8 border-t border-ink-700/10 dark:border-paper-200/10 pt-4">
                <span className="text-sm font-medium text-brass-600 dark:text-brass-400">
                  {feature.footer}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
