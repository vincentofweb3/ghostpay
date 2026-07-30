import { useState } from "react";

interface RedactedAmountProps {
  /** Called to actually decrypt — wire this to handleClient.decrypt(handleId) */
  onDecrypt: () => Promise<string>;
  label?: string;
}

/**
 * Renders a hidden amount as a redaction bar. On click, calls the real
 * Nox `decrypt` method and reveals the plaintext with a stamp-wipe
 * animation. This is the component the "Etherscan vs GhostPay" demo
 * moment is built around — Etherscan shows nothing, this shows the
 * censor bar lifting to reveal the real number to an authorized viewer.
 */
export function RedactedAmount({
  onDecrypt,
  label = "amount",
}: RedactedAmountProps) {
  const [state, setState] = useState<"locked" | "loading" | "revealed">(
    "locked",
  );

  const [value, setValue] = useState<string | null>(null);

  async function handleClick() {
    if (state === "revealed") return;

    setState("loading");

    try {
      const plaintext = await onDecrypt();

      setValue(plaintext);
      setState("revealed");
    } catch (err) {
      console.error(err);

      // Wallet isn't authorized.
      // Keep the secret hidden and return to the locked state.
      setState("locked");
    }
  }

  if (state === "revealed" && value !== null) {
    return (
      <span className="stamp-reveal font-mono font-medium text-brass-500 dark:text-brass-400">
        {value}
      </span>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={state === "loading"}
      aria-label={`Decrypt ${label}`}
      className="redacted-bar inline-flex items-center gap-2 rounded px-3 py-1 text-xs font-mono text-paper-100/80 transition-opacity hover:opacity-80 disabled:cursor-wait"
    >
      {state === "loading" ? "decrypting..." : "•••••• decrypt"}
    </button>
  );
}
