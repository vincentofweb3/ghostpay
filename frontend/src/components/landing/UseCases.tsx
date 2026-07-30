const USE_CASES = [
  {
    tag: "Payroll",
    title: "Run payroll without publishing salaries",
    text: "Pay a team from one treasury without every member's compensation becoming public record.",
  },
  {
    tag: "Treasury",
    title: "DAO and company treasury payouts",
    text: "Vendor and contributor payments stay off public dashboards, without giving up an on-chain audit trail.",
  },
  {
    tag: "Freelance",
    title: "Client-to-freelancer invoices",
    text: "Neither side has to disclose project budgets to the rest of the internet.",
  },
  {
    tag: "Donation",
    title: "Donations without a public ledger of who gave what",
    text: "The organization sees what it received. Nobody else sees who gave how much.",
  },
];

export function UseCases() {
  return (
    <section className="py-24 border-t border-ink-700/10 dark:border-paper-200/10">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-display text-3xl sm:text-4xl text-ink-950 dark:text-paper-50">
          Built for real payments, not just demos
        </h2>
        <div className="grid sm:grid-cols-2 gap-6 mt-12">
          {USE_CASES.map((u) => (
            <div key={u.tag} className="rounded-lg border border-ink-700/15 dark:border-paper-200/15 p-6">
              <span className="inline-block rounded-full border border-brass-500/40 px-3 py-0.5 text-xs font-mono text-brass-600 dark:text-brass-400">
                {u.tag}
              </span>
              <h3 className="mt-3 font-display text-lg text-ink-950 dark:text-paper-50">{u.title}</h3>
              <p className="mt-2 text-sm text-ink-700 dark:text-paper-200/70">{u.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
