const PRIMITIVES = [
  { call: "Nox.fromExternal", desc: "Turns an encrypted client-side input into a usable on-chain handle." },
  { call: "confidentialTransferFrom", desc: "Moves value between confidential balances - the actual private payment." },
  { call: "Nox.allow", desc: "Grants a contract permission to compute with a handle." },
  { call: "Nox.addViewer", desc: "Grants a person permission to decrypt a handle - the basis of selective-disclosure receipts." },
];

export function TechStack() {
  return (
    <section className="py-24 border-t border-ink-700/10 dark:border-paper-200/10">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="font-display text-3xl sm:text-4xl text-ink-950 dark:text-paper-50">Under the hood</h2>
        <p className="mt-4 text-ink-700 dark:text-paper-200/70 max-w-xl">
          GhostPay doesn't fork or modify the token it wraps. It layers Nox's confidential compute
          primitives on top.
        </p>
        <div className="mt-10 rounded-lg border border-ink-700/15 dark:border-paper-200/15 divide-y divide-ink-700/10 dark:divide-paper-200/10 overflow-hidden">
          {PRIMITIVES.map((p) => (
            <div key={p.call} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 px-5 py-4">
              <code className="font-mono text-sm text-brass-600 dark:text-brass-400 sm:w-64 shrink-0">{p.call}</code>
              <span className="text-sm text-ink-700 dark:text-paper-200/70">{p.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
