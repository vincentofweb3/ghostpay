import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

import { getViewerReceipts } from "../lib/contracts";
import { PaymentCard } from "./PaymentCard";

export function ReceiptVerificationTab() {
  console.log("ReceiptVerificationTab rendered");
  const { address } = useAccount();

  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("ReceiptVerificationTab useEffect");

    async function load() {
      console.log("Loading receipts...");

      if (!address) {
        console.log("No wallet address");
        setPayments([]);
        setLoading(false);
        return;
      }

      console.log("Wallet:", address);

      try {
        setLoading(true);

        const receipts = await getViewerReceipts(address);

        console.log("Receipts:", receipts);

        setPayments(receipts);
      } catch (err) {
        console.error("LOAD ERROR:", err);
      } finally {
        setLoading(false);
      }
    }

    load();

    const refresh = () => load();

    window.addEventListener("receiptGranted", refresh);

    return () => {
      window.removeEventListener("receiptGranted", refresh);
    };
  }, [address]);

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h2 className="font-display text-2xl text-ink-950 dark:text-paper-50">
          Receipt Verification
        </h2>

        <p className="mt-1 text-sm text-ink-700 dark:text-paper-200/70">
          These are confidential receipts another wallet has explicitly shared
          with you. You can decrypt only the payments you've been granted access
          to.
        </p>
      </div>

      {loading ? (
        <div className="py-10 text-center text-gray-500">
          Loading receipts...
        </div>
      ) : payments.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-400 py-10 text-center text-gray-500">
          No receipts have been shared with you yet.
        </div>
      ) : (
        <div className="divide-y divide-ink-700/10 border-y border-ink-700/10 dark:divide-paper-200/10 dark:border-paper-200/10">
          {payments.map((payment) => (
            <PaymentCard key={payment.id} payment={payment} isSent={false} />
          ))}
        </div>
      )}
    </div>
  );
}
