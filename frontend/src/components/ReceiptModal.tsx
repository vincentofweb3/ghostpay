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
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-5">
      <div className="w-full max-w-md rounded-xl bg-paper-50 dark:bg-ink-900 border border-ink-700/10 dark:border-paper-200/10 p-6 space-y-5">
        <div>
          <h3 className="text-xl font-semibold">Grant Receipt</h3>

          <p className="text-sm text-gray-500 mt-2">Payment #{paymentId}</p>

          <p className="text-sm mt-3">
            This grants one wallet permission to decrypt ONLY this payment.
          </p>
        </div>

        <input
          value={viewer}
          onChange={(e) => setViewer(e.target.value)}
          placeholder="0x..."
          className="w-full rounded border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 font-mono"
        />

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="rounded border px-4 py-2">
            Cancel
          </button>

          <button
            disabled={!viewer || loading}
            onClick={handleGrant}
            className="rounded bg-brass-500 px-4 py-2 text-black disabled:opacity-40"
          >
            {loading ? "Granting..." : "Grant Access"}
          </button>
        </div>
      </div>
    </div>
  );
}
