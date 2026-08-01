import { useState } from "react";
import { PAYMENT_TAGS, encryptAmount } from "../lib/nox";
import { getRouterContract } from "../lib/contracts";
import { Loader2 } from "lucide-react";

const TAG_OPTIONS = Object.keys(PAYMENT_TAGS) as (keyof typeof PAYMENT_TAGS)[];
const SEND_STAGES = [
  "Encrypting amount…",
  "Creating proof…",
  "Sending…",
  "Confirmed ✓",
] as const;

export function SendTab() {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [tag, setTag] = useState<keyof typeof PAYMENT_TAGS>("Freelance");
  const [stageIndex, setStageIndex] = useState<number | null>(null);

  async function handleSend() {
    try {
      // Stage 1
      setStageIndex(0);

      const router = await getRouterContract();

      const routerAddress = await router.getAddress();

      const amountValue = BigInt(Math.floor(Number(amount)));

      const encryptedAmount = await encryptAmount(amountValue, routerAddress);

      // Stage 2
      setStageIndex(1);

      const encryptedTag = await encryptAmount(
        BigInt(PAYMENT_TAGS[tag]),
        routerAddress,
      );

      // Stage 3
      setStageIndex(2);

      console.log("Amount:", encryptedAmount);
      console.log("Tag:", encryptedTag);

      const tx = await router.sendPrivate(
        recipient,
        encryptedAmount.handle,
        encryptedAmount.handleProof,
        encryptedTag.handle,
        encryptedTag.handleProof,
      );

      await tx.wait();

      window.dispatchEvent(new Event("paymentSent"));

      // Stage 4
      setStageIndex(3);
    } catch (err) {
      console.error(err);

      alert("Transaction failed.");

      setStageIndex(null);
    }

    if (!recipient.startsWith("0x") || recipient.length !== 42) {
      alert("Enter a valid wallet address.");
      return;
    }

    if (Number(amount) <= 0) {
      alert("Amount must be greater than zero.");
      return;
    }
  }

  const sending = stageIndex !== null && stageIndex < SEND_STAGES.length - 1;
  const done = stageIndex === SEND_STAGES.length - 1;

  return (
    <div className="max-w-md space-y-6">
      <div>
        <h2 className="font-display text-2xl text-ink-950 dark:text-paper-50">
          Send privately
        </h2>
        <p className="text-sm text-ink-700 dark:text-paper-200/70 mt-1">
          The recipient's address is public. The amount never is - unless you
          choose to reveal it later.
        </p>
      </div>

      <div className="space-y-4">
        <label className="block">
          <span className="text-xs font-mono uppercase tracking-wide text-ink-700 dark:text-paper-200/60">
            Recipient
          </span>
          <input
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="0x…"
            className="mt-1 w-full rounded border border-ink-700/20 dark:border-paper-200/20 bg-transparent px-3 py-2 font-mono text-sm text-ink-950 dark:text-paper-50 focus:outline-none focus:ring-2 focus:ring-brass-500"
            disabled={sending}
          />
          <p className="mt-1 text-xs text-ink-700/60 dark:text-paper-200/50">
            The wallet address is public. Only the payment details remain
            confidential.
          </p>
        </label>

        <label className="block">
          <span className="text-xs font-mono uppercase tracking-wide text-ink-700 dark:text-paper-200/60">
            Amount (gUSD)
          </span>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            inputMode="decimal"
            className="mt-1 w-full rounded border border-ink-700/20 dark:border-paper-200/20 bg-transparent px-3 py-2 font-mono text-sm text-ink-950 dark:text-paper-50 focus:outline-none focus:ring-2 focus:ring-brass-500"
            disabled={sending}
          />
          <p className="mt-1 text-xs text-ink-700/60 dark:text-paper-200/50">
            Amount is encrypted before being sent on-chain.
          </p>
        </label>

        <div>
          <span className="text-xs font-mono uppercase tracking-wide text-ink-700 dark:text-paper-200/60">
            What's this for?
          </span>
          <div className="mt-2 flex flex-wrap gap-2">
            {TAG_OPTIONS.map((t) => (
              <button
                key={t}
                disabled={sending}
                onClick={() => setTag(t)}
                className={`rounded-full border px-3 py-1 text-xs transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  tag === t
                    ? "border-brass-500 bg-brass-500/10 text-brass-600 dark:text-brass-400"
                    : "border-ink-700/20 dark:border-paper-200/20 text-ink-700 dark:text-paper-200/70"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded border border-ink-700/15 dark:border-paper-200/15 px-3 py-2 space-y-1 text-xs font-mono">
          <p className="text-brass-600 dark:text-brass-400">
            ● Amount will be hidden
          </p>
          <p className="text-brass-600 dark:text-brass-400">
            ● Category ({tag}) will be hidden
          </p>
          <p className="text-ink-700/60 dark:text-paper-200/50">
            ○ Recipient address stays public
          </p>
        </div>
      </div>

      {sending && (
        <div className="rounded border border-brass-500/20 bg-brass-500/5 p-3">
          <div className="flex items-center gap-2">
            <span className="animate-spin">⟳</span>
            <div>
              <p className="text-sm font-medium">{SEND_STAGES[stageIndex!]}</p>
              <p className="text-xs text-ink-700/60">
                Your payment is being encrypted and processed by Nox.
              </p>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={handleSend}
        disabled={!recipient || !amount || sending}
        className="w-full rounded bg-ink-950 dark:bg-paper-50 px-4 py-2.5 text-sm font-medium text-paper-50 dark:text-ink-950 disabled:opacity-40 hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
      >
        {sending && <Loader2 className="h-4 w-4 animate-spin" />}

        {stageIndex !== null ? SEND_STAGES[stageIndex] : "Send privately"}
      </button>

      {done && (
        <div className="rounded border border-green-500/30 bg-green-500/5 p-3 text-sm">
          <p className="font-medium text-green-600">
            Private payment sent successfully.
          </p>

          <p className="mt-1 text-xs text-ink-700/70 dark:text-paper-200/60">
            The amount and payment category are encrypted with Nox. Only you and
            the recipient can decrypt this payment. View it in the Activity tab.
          </p>
        </div>
      )}
    </div>
  );
}
