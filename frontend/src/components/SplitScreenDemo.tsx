import { Lock, Eye } from "lucide-react";
import { RedactedField } from "./RedactedField";

export function SplitScreenDemo({ etherscanUrl }: { etherscanUrl?: string }) {
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* PUBLIC */}

      <div className="rounded-3xl border border-red-500/20 bg-paper-50 dark:bg-ink-900 overflow-hidden">
        <div className="flex items-center justify-between border-b border-ink-700/10 dark:border-paper-200/10 px-6 py-4">
          <div className="flex items-center gap-3">
            <Lock size={18} className="text-red-500" />

            <div>
              <p className="font-semibold text-ink-950 dark:text-paper-50">
                Public Blockchain
              </p>

              <p className="text-xs text-ink-700 dark:text-paper-200/60">
                What everyone sees
              </p>
            </div>
          </div>

          <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-medium text-red-500">
            Hidden
          </span>
        </div>

        <div className="p-6 space-y-5 font-mono text-sm text-ink-950 dark:text-paper-50">
          <div className="flex justify-between">
            <span className="font-medium">Method</span>
            <span>sendPrivate()</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">From</span>
            <span>0xA11c…9e2F</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">To</span>
            <span>0x7Bd4…41aA</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Amount</span>

            <span className="redacted-bar rounded px-3 py-1">••••••••</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Category</span>

            <span className="redacted-bar rounded px-3 py-1">•••••</span>
          </div>

          {etherscanUrl && (
            <a
              href={etherscanUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-5 text-sm underline"
            >
              View on Etherscan →
            </a>
          )}
        </div>
      </div>

      {/* GHOSTPAY */}

      <div className="rounded-3xl border border-brass-500/30 bg-paper-50 dark:bg-ink-900 overflow-hidden shadow-xl">
        <div className="flex items-center justify-between border-b border-ink-700/10 dark:border-paper-200/10 px-6 py-4">
          <div className="flex items-center gap-3">
            <Eye size={18} className="text-brass-500" />

            <div>
              <p className="font-semibold text-ink-950 dark:text-paper-50">
                GhostPay
              </p>

              <p className="text-xs text-ink-700 dark:text-paper-200/60">
                Authorized view
              </p>
            </div>
          </div>

          <span className="rounded-full bg-brass-500/10 px-3 py-1 text-xs font-medium text-brass-500">
            Decrypted
          </span>
        </div>

        <div className="p-6 space-y-5 font-mono text-sm text-ink-950 dark:text-paper-50">
          <div className="flex justify-between">
            <span className="font-medium">Method</span>
            <span>Private Payment</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">From</span>
            <span>0xA11c…9e2F</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">To</span>
            <span>0x7Bd4…41aA</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-medium">Amount</span>

            <RedactedField
              label="demo amount"
              onDecrypt={async () => "240.00 gUSD"}
            />
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Category</span>
            <RedactedField
              label="category"
              onDecrypt={async () => "Freelance"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
