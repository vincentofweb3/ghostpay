import { useEffect, useState } from "react";
import { getAllPayments } from "../lib/contracts";
import { useAccount } from "wagmi";
import { PaymentCard } from "./PaymentCard";

export function ActivityTab() {
  const { address } = useAccount();

  const [payments, setPayments] = useState<any[]>([]);

  async function loadPayments() {
    const data = await getAllPayments();

    if (!address) {
      setPayments([]);
      return;
    }

    const myPayments = data.filter(
      (payment: any) =>
        payment.from.toLowerCase() === address.toLowerCase() ||
        payment.to.toLowerCase() === address.toLowerCase(),
    );

    setPayments(myPayments);
  }

  useEffect(() => {
    loadPayments();

    const refresh = () => {
      loadPayments();
    };

    window.addEventListener("paymentSent", refresh);

    return () => {
      window.removeEventListener("paymentSent", refresh);
    };
  }, [address]);

  return (
    <div className="max-w-2xl">
      <h2 className="font-display text-2xl text-ink-950 dark:text-paper-50">
        Activity
      </h2>

      <p className="text-sm text-ink-700 dark:text-paper-200/70 mt-1 mb-6">
        Every row exists on Sepolia. Only payments involving your wallet are
        shown. Confidential details remain encrypted unless you have permission
        to decrypt them.
      </p>

      <div className="divide-y divide-ink-700/10 dark:divide-paper-200/10 border-y border-ink-700/10 dark:border-paper-200/10">
        {payments.length === 0 ? (
          <div className="py-10 text-center text-gray-500 text-sm">
            No payments found.
          </div>
        ) : (
          payments.map((item) => {
            const isSent = address?.toLowerCase() === item.from.toLowerCase();

            return <PaymentCard key={item.id} payment={item} isSent={isSent} />;
          })
        )}
      </div>
    </div>
  );
}
