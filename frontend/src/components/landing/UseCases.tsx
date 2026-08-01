const USE_CASES = [
  {
    tag: "Payroll",
    title: "Run payroll without publishing salaries",
    text: "Pay employees from a single treasury while keeping individual compensation confidential on-chain.",
  },
  {
    tag: "Treasury",
    title: "DAO and company treasury payouts",
    text: "Pay vendors, contributors and partners without exposing internal spending to public blockchain explorers.",
  },
  {
    tag: "Freelance",
    title: "Private client-to-freelancer payments",
    text: "Project budgets, milestones and payment values remain confidential between both parties.",
  },
  {
    tag: "Donation",
    title: "Confidential charitable donations",
    text: "Organizations receive funds transparently while donor contribution amounts remain private.",
  },
];

export function UseCases() {
  return (
    <section className="py-24 border-t border-ink-700/10 dark:border-paper-200/10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center">
          <p className="text-xs font-mono uppercase tracking-[0.35em] text-brass-600 dark:text-brass-400">
            Use Cases
          </p>

          <h2 className="mt-3 font-display text-4xl text-ink-950 dark:text-paper-50">
            Built for real payments, not just demos
          </h2>

          <p className="mt-4 max-w-2xl mx-auto leading-7 text-ink-700 dark:text-paper-200/70">
            GhostPay brings confidential payments to everyday financial
            workflows without requiring new wallets or custom infrastructure.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {USE_CASES.map((useCase) => (
            <div
              key={useCase.tag}
              className="
rounded-2xl
border border-ink-700/10
dark:border-paper-200/10
bg-paper-50
dark:bg-ink-900
p-8
transition-all
duration-300
hover:-translate-y-1
hover:scale-[1.02]
hover:border-brass-500/40
hover:shadow-xl
dark:hover:shadow-black/30
"
            >
              <span
                className="
    inline-flex
    rounded-full
    border border-brass-500/40
    bg-brass-500/10
    px-3 py-1
    text-xs
    font-mono
    uppercase
    tracking-wide
    text-brass-700
    dark:text-brass-300
  "
              >
                {useCase.tag}
              </span>

              <h3 className="mt-5 font-display text-1xl text-ink-950 dark:text-paper-50">
                {useCase.title}
              </h3>

              <p className="mt-4 leading-7 text-ink-700 dark:text-paper-200/70">
                {useCase.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
