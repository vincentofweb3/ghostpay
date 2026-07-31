import { useState } from "react";

type Props = {
  paymentId: number;
  open: boolean;
  onClose: () => void;
  onGrant: (viewer: string) => Promise<void>;
};

export function ReceiptModal({ paymentId, open, onClose, onGrant }: Props) {
  const [viewer, setViewer] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  async function handleGrant() {
    try {
      setLoading(true);

      await onGrant(viewer);

      setViewer("");
      onClose();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-start sm:items-center justify-center p-4 sm:p-5 py-8 sm:py-5 overflow-y-auto"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-xl bg-paper-50 dark:bg-ink-900 border border-ink-700/10 dark:border-paper-200/10 p-5 sm:p-6 space-y-5 my-auto max-h-[90vh] overflow-y-auto"
      >
        <div>
          <h3 className="font-display text-xl text-ink-950 dark:text-paper-50">
            Grant Receipt
          </h3>
          <p className="text-sm text-ink-700/70 dark:text-paper-200/50 mt-2">
            Payment #{paymentId}
          </p>
          <p className="text-sm text-ink-700 dark:text-paper-200/70 mt-3">
            This grants one wallet permission to decrypt ONLY this payment.
          </p>
        </div>

        <input
          value={viewer}
          onChange={(e) => setViewer(e.target.value)}
          placeholder="0x..."
          className="w-full rounded border border-ink-700/20 dark:border-paper-200/20 bg-transparent px-3 py-2 font-mono text-sm text-ink-950 dark:text-paper-50 focus:outline-none focus:ring-2 focus:ring-brass-500"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto rounded border border-ink-700/20 dark:border-paper-200/20 px-4 py-2 text-sm text-ink-950 dark:text-paper-50 hover:bg-ink-700/5 dark:hover:bg-paper-100/5 transition-colors"
          >
            Cancel
          </button>

          <button
            disabled={!viewer || loading}
            onClick={handleGrant}
            className="w-full sm:w-auto rounded bg-brass-500 px-4 py-2 text-sm font-medium text-ink-950 disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
          >
            {loading ? "Granting..." : "Grant Access"}
          </button>
        </div>
      </div>
    </div>
  );
}
