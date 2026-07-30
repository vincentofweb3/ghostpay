import { useEffect, useState } from "react";

export function Hero({ onLaunch }: { onLaunch: () => void }) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 ledger-watermark text-ink-950 dark:text-paper-50 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-24 grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
        <div>
          <span className="fade-up inline-flex items-center gap-2 rounded-full border border-brass-500/40 px-3 py-1 text-[11px] sm:text-xs font-mono text-brass-600 dark:text-brass-400">
            <span className="w-1.5 h-1.5 rounded-full bg-brass-500 shrink-0" />
            Confidential payments · Ethereum Sepolia
          </span>

          <h1 className="fade-up fade-up-delay-1 mt-5 sm:mt-6 font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.1] sm:leading-[1.05] text-ink-950 dark:text-paper-50">
            Public chain,
            <br />
            private terms.
          </h1>

          <p className="fade-up fade-up-delay-2 mt-5 sm:mt-6 text-base sm:text-lg text-ink-700 dark:text-paper-200/70 leading-relaxed max-w-lg">
            Send from your existing wallet — MetaMask, Rabby, Rainbow, no migration. The recipient
            is public. What you paid them is between you two — until you decide to prove it to
            someone else.
          </p>

          <div className="fade-up fade-up-delay-3 flex flex-wrap items-center gap-3 sm:gap-4 mt-8 sm:mt-10">
            <button
              onClick={onLaunch}
              className="rounded bg-ink-950 dark:bg-paper-50 px-6 py-3 text-sm font-medium text-paper-50 dark:text-ink-950 hover:opacity-90 transition-opacity"
            >
              Launch Console
            </button>
            <a
              href="#comparison"
              className="rounded border border-ink-700/20 dark:border-paper-200/20 px-6 py-3 text-sm font-medium text-ink-950 dark:text-paper-50 hover:bg-ink-700/5 dark:hover:bg-paper-100/5 transition-colors"
            >
              See the difference
            </a>
          </div>

          <div className="fade-up fade-up-delay-3 mt-10 flex flex-wrap gap-x-6 gap-y-2 text-xs font-mono text-ink-700/60 dark:text-paper-200/50">
            <span>GhostVault <span className="text-ink-950 dark:text-paper-50">0x0000…0000</span></span>
            <span>Network <span className="text-ink-950 dark:text-paper-50">Sepolia</span></span>
            <span>Nox chain <span className="text-ink-950 dark:text-paper-50">11155111</span></span>
          </div>
        </div>

        <div className="fade-up fade-up-delay-2 rounded-xl border border-ink-700/15 dark:border-paper-200/15 bg-paper-50 dark:bg-ink-900 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-ink-700/10 dark:border-paper-200/10">
            <span className="text-xs font-mono text-ink-700 dark:text-paper-200/60">payment · preview</span>
            <span className="rounded-full border border-brass-500/40 px-2 py-0.5 text-[10px] font-mono text-brass-600 dark:text-brass-400">DRAFT</span>
          </div>
          <div className="divide-y divide-ink-700/10 dark:divide-paper-200/10 text-sm">
            <div className="flex items-center justify-between px-5 py-4">
              <span className="text-ink-700 dark:text-paper-200/60">Recipient</span>
              <span className="font-mono text-ink-950 dark:text-paper-50">0x7Bd4…41aA</span>
            </div>
            <div className="flex items-center justify-between px-5 py-4">
              <span className="text-ink-700 dark:text-paper-200/60">Category</span>
              <span className="redacted-bar rounded px-2 py-0.5 font-mono text-xs">••••••</span>
            </div>
            <div className="flex items-center justify-between px-5 py-4">
              <span className="text-ink-700 dark:text-paper-200/60">Amount</span>
              {revealed ? (
                <span className="stamp-reveal font-mono text-brass-500 dark:text-brass-400 font-medium">240.00 gUSD</span>
              ) : (
                <span className="redacted-bar rounded px-2 py-0.5 font-mono text-xs">••••••••</span>
              )}
            </div>
          </div>
          <div className="px-5 py-3 text-[11px] font-mono text-ink-700/50 dark:text-paper-200/40 border-t border-ink-700/10 dark:border-paper-200/10">
            visible to sender &amp; recipient only — nothing on Etherscan
          </div>
        </div>
      </div>
    </section>
  );
}
