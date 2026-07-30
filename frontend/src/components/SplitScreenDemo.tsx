import { RedactedAmount } from "./RedactedAmount";

/**
 * Side-by-side "what the public chain sees" vs "what you see" panel.
 * Intended to be the centerpiece of the demo video: left side is a real
 * screenshot/iframe of the Sepolia Etherscan tx, right side is this app
 * decrypting the same transaction for an authorized viewer.
 */
export function SplitScreenDemo({ etherscanUrl }: { etherscanUrl?: string }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded border border-ink-700/15 dark:border-paper-200/15 overflow-hidden">
      <div className="p-4 bg-ink-900/[0.02] dark:bg-paper-50/[0.02]">
        <p className="text-xs font-mono uppercase tracking-wide text-ink-700 dark:text-paper-200/60 mb-3">
          What Etherscan sees
        </p>
        {etherscanUrl ? (
          <a href={etherscanUrl} target="_blank" rel="noreferrer" className="text-xs underline text-ink-700 dark:text-paper-200/70">
            View on Sepolia Etherscan ↗
          </a>
        ) : null}
        <div className="mt-3 space-y-2 font-mono text-xs text-ink-700 dark:text-paper-200/70">
          <p>Method: sendPrivate</p>
          <p>From: 0xA11c…9e2F</p>
          <p>To: 0x7Bd4…41aA</p>
          <p>Value: <span className="redacted-bar rounded px-2 py-0.5">••••••</span></p>
        </div>
      </div>

      <div className="p-4">
        <p className="text-xs font-mono uppercase tracking-wide text-brass-600 dark:text-brass-400 mb-3">
          What GhostPay reveals to you
        </p>
        <div className="space-y-2 font-mono text-xs text-ink-950 dark:text-paper-50">
          <p>Method: Private payment</p>
          <p>From: 0xA11c…9e2F</p>
          <p>To: 0x7Bd4…41aA</p>
          <p className="flex items-center gap-2">
            Value:{" "}
            <RedactedAmount label="demo amount" onDecrypt={async () => "240.00 gUSD"} />
          </p>
        </div>
      </div>
    </div>
  );
}
