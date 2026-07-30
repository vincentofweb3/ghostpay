import { useEffect, useState } from "react";

type Props = {
  open: boolean;
  payment: any | null;
  loading: boolean;
  onClose: () => void;
  onGrant: (viewer: string) => Promise<void>;
};

export function GrantReceiptModal({
  open,
  payment,
  loading,
  onClose,
  onGrant,
}: Props) {
  const [viewer, setViewer] = useState("");

  useEffect(() => {
    if (!open) {
      setViewer("");
    }
  }, [open]);

  if (!open || !payment) return null;

  async function submit() {
    if (!viewer.trim()) return;

    await onGrant(viewer);

    setViewer("");
  }

  return (
    <div
      className="
    fixed
    left-7
    right-7
    bottom-7
    top-7
    z-40
    bg-black/60
    backdrop-blur-md
    flex
    items-center
    justify-center
    p-5
  "
    >
      <div
        className="
    w-full
    max-w-xl
    rounded-3xl

    bg-white
    dark:bg-zinc-900

    text-gray-900
    dark:text-white

    shadow-2xl
    p-8
  "
      >
        <h2 className="text-2xl font-display text-ink-950 dark:text-paper-50">
          Grant Receipt
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Allow exactly one wallet to decrypt this payment.
        </p>

        <div
          className="mt-6  rounded-xl
    border

    border-amber-300
    dark:border-amber-700

    bg-amber-50
    dark:bg-amber-950/20

    p-6"
        >
          <p className="text-xs uppercase tracking-wider text-amber-700 dark:text-amber-300">
            Selected Payment
          </p>

          <p className="mt-3 text-lg font-semibold text-green-600">
            ↓ Received
          </p>

          <p className="mt-2 text-sm">
            <span className="text-gray-500">From </span>

            <a
              href={`https://sepolia.etherscan.io/address/${payment.from}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-amber-500 underline hover:text-amber-400"
            >
              {payment.from.slice(0, 8)}...
              {payment.from.slice(-6)} ↗
            </a>
          </p>

          <p className="mt-3 text-xs text-gray-500">
            {new Date(payment.timestamp * 1000).toLocaleString()}
          </p>
        </div>

        <div className="mt-6">
          <label className="mb-2 block text-sm font-medium">
            Viewer Wallet Address
          </label>

          <input
            value={viewer}
            onChange={(e) => setViewer(e.target.value)}
            placeholder="0x..."
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-ink-950 text-ink-950 dark:text-paper-50 placeholder:text-gray-400 dark:placeholder:text-gray-500 px-4 py-3 font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
          />

          <p className="mt-2 text-xs text-gray-500">
            Only this wallet will be able to decrypt this payment.
          </p>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="
rounded-lg
border
border-gray-300
dark:border-gray-700

bg-white
dark:bg-zinc-900

px-5
py-2.5

hover:bg-gray-100
dark:hover:bg-zinc-800

transition
"
          >
            Cancel
          </button>

          <button
            disabled={!viewer || loading}
            onClick={submit}
            className="rounded-lg bg-amber-500 px-5 py-2 font-medium text-black hover:bg-amber-400 disabled:opacity-40 transition"
          >
            {loading ? "Granting..." : "Grant Receipt"}
          </button>
        </div>
      </div>
    </div>
  );
}
