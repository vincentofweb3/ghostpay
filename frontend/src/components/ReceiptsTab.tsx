import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

import { PaymentCard } from "./PaymentCard";
import { GrantReceiptModal } from "./GrantReceiptModal";

import { getAllPayments, issueReceipt } from "../lib/contracts";

export function ReceiptsTab() {
  const { address } = useAccount();

  const [payments, setPayments] = useState<any[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<any | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [issuing, setIssuing] = useState(false);

  const [grantedId, setGrantedId] = useState<number | null>(null);

  const [toast, setToast] = useState("");

  const loadPayments = async () => {
    if (!address) {
      setPayments([]);
      return;
    }

    const data = await getAllPayments();

    setPayments(
      data.filter((p) => p.to.toLowerCase() === address.toLowerCase()),
    );
  };

  useEffect(() => {
    loadPayments();
  }, [address]);

  return (
    <div className="max-w-2xl space-y-8">
      {/* Header */}

      <div>
        <h2 className="font-display text-2xl text-ink-950 dark:text-paper-50">
          Receipts
        </h2>

        <p className="text-sm text-ink-700 dark:text-paper-200/70 mt-1">
          Prove one payment to one person - an accountant, an auditor, or a
          landlord - without making it public and without exposing anything else
          you've sent or received.
        </p>
      </div>

      {/* Received Payments */}

      <div>
        <p className="text-xs font-mono uppercase tracking-wide text-ink-700 dark:text-paper-200/60 mb-3">
          Received Payments
        </p>

        <div className="divide-y divide-ink-700/10 dark:divide-paper-200/10 border-y border-ink-700/10 dark:border-paper-200/10">
          {payments.length === 0 ? (
            <div className="py-8 text-center text-sm text-gray-500">
              No payments received yet.
            </div>
          ) : (
            payments.map((payment) => (
              <PaymentCard
                key={payment.id}
                payment={payment}
                isSent={false}
                receiptGranted={grantedId === payment.id}
                onGrantReceipt={() => {
                  setSelectedPayment(payment);
                  setModalOpen(true);
                }}
              />
            ))
          )}
        </div>
      </div>

      {/* Grant Receipt Modal */}

      <GrantReceiptModal
        open={modalOpen}
        payment={selectedPayment}
        loading={issuing}
        onClose={() => {
          setModalOpen(false);
          setSelectedPayment(null);
        }}
        onGrant={async (viewer) => {
          if (!selectedPayment) return;

          try {
            setIssuing(true);

            await issueReceipt(selectedPayment.id, viewer);

            window.dispatchEvent(new Event("receiptGranted"));

            setGrantedId(selectedPayment.id);

            setModalOpen(false);
            setSelectedPayment(null);

            setToast("✅ Receipt granted successfully!");

            setTimeout(() => {
              setToast("");
            }, 2500);
          } catch (err) {
            console.error(err);
            alert("Unable to grant receipt.");
          } finally {
            setIssuing(false);
          }
        }}
      />

      {/* Success Toast */}

      {toast && (
        <div className="fixed bottom-6 right-6 rounded-lg bg-green-600 text-white px-5 py-3 shadow-xl z-50 animate-pulse">
          {toast}
        </div>
      )}
    </div>
  );
}
