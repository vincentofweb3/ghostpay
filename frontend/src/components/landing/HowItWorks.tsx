const STEPS = [
  {
    n: "01",
    icon: "💰",
    title: "Wrap Funds",
    text: "Deposit your ERC-20 stablecoin once into GhostVault. Your balance is converted into a confidential balance while preserving its value.",
  },
  {
    n: "02",
    icon: "🔐",
    title: "Encrypt & Send",
    text: "Choose a recipient and amount. GhostPay encrypts the payment locally with iExec Nox before anything is submitted on-chain.",
  },
  {
    n: "03",
    icon: "👁",
    title: "Selective Reveal",
    text: "Only sender and recipient can decrypt payment details. Grant auditors or third parties access to a single payment whenever needed.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-24 border-t border-ink-700/10 dark:border-paper-200/10"
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center">
          <p className="text-xs font-mono uppercase tracking-[0.35em] text-brass-600 dark:text-brass-400">
            Workflow
          </p>

          <h2 className="mt-3 font-display text-4xl text-ink-950 dark:text-paper-50">
            How GhostPay works
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-ink-700 dark:text-paper-200/70">
            Confidential payments in three simple steps. Privacy comes from
            iExec Nox confidential execution while keeping Ethereum settlement.
          </p>
        </div>

        <div className="mt-16 space-y-12">
          {STEPS.map((step, index) => (
            <div key={step.n} className="group flex gap-8">
              <div className="flex flex-col items-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-brass-500/30 bg-brass-500/10 text-2xl transition-transform duration-300 group-hover:scale-110">
                  {step.icon}
                </div>

                <span className="mt-3 font-mono text-sm text-brass-600 dark:text-brass-400">
                  {step.n}
                </span>

                {index !== STEPS.length - 1 && (
                  <div className="mt-3 h-20 w-px bg-brass-500/20" />
                )}
              </div>

              <div className="flex-1 rounded-xl border border-ink-700/10 dark:border-paper-200/10 bg-paper-50 dark:bg-ink-900 p-6 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
                <h3 className="font-display text-2xl text-ink-950 dark:text-paper-50">
                  {step.title}
                </h3>

                <p className="mt-3 leading-7 text-ink-700 dark:text-paper-200/70">
                  {step.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
