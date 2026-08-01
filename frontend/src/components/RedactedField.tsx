import { useState } from "react";

interface RedactedFieldProps {
  /** Called to decrypt any confidential field */
  onDecrypt: () => Promise<string>;
  label?: string;
}

/**
 * Generic confidential field revealer.
 *
 * Unlike RedactedAmount, this component can be reused for
 * Category
 * Receipt ID
 * Invoice Number
 * Payroll Type
 * Treasury
 * Donation
 * or any future confidential metadata.
 */
export function RedactedField({
  onDecrypt,
  label = "field",
}: RedactedFieldProps) {
  const [state, setState] = useState<
    "locked" | "loading" | "revealed"
  >("locked");

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
      setState("locked");
    }
  }

  if (state === "revealed" && value) {
    return (
      <span className="stamp-reveal font-mono font-semibold text-amber-500">
        {value}
      </span>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={state === "loading"}
      aria-label={`Decrypt ${label}`}
      className="redacted-bar inline-flex items-center gap-2 rounded px-3 py-1 text-xs font-mono transition hover:opacity-80 disabled:cursor-wait"
    >
      {state === "loading"
        ? "decrypting..."
        : "•••••• decrypt"}
    </button>
  );
}