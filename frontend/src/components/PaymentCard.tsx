import { useState } from "react";
import { RedactedAmount } from "./RedactedAmount";
import { decryptHandle } from "../lib/nox";
import { downloadReceipt } from "../lib/pdf";

type Props = {
  payment: any;
  isSent: boolean;
  onGrantReceipt?: () => void;
  receiptGranted?: boolean;
};

export function PaymentCard({
  payment,
  isSent,
  onGrantReceipt,
  receiptGranted,
}: Props) {
  const [amount, setAmount] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);

  return (
    <div className="flex justify-between items-start py-5 border-b border-ink-700/10 dark:border-paper-200/10">
      {/* LEFT */}
      <div className="space-y-2">
        <p
          className={`text-xs font-semibold ${
            isSent ? "text-orange-500" : "text-green-500"
          }`}
        >
          {isSent ? "↑ Sent" : "↓ Received"}
        </p>

        <p className="text-sm font-medium text-ink-950 dark:text-paper-50">
          {isSent ? "To" : "From"}{" "}
          <a
            href={`https://sepolia.etherscan.io/address/${
              isSent ? payment.to : payment.from
            }`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-amber-500 hover:text-amber-400 underline inline-flex items-center gap-1"
          >
            {(isSent ? payment.to : payment.from).slice(0, 8)}...
            {(isSent ? payment.to : payment.from).slice(-6)}
            <span className="text-xs">↗</span>
          </a>
        </p>

        <p className="text-xs text-gray-500">
          {new Date(payment.timestamp * 1000).toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </p>

        <a
          href={`https://sepolia.etherscan.io/address/${
            isSent ? payment.to : payment.from
          }`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-amber-500 hover:text-amber-400 underline"
        >
          View on Sepolia ↗
        </a>
      </div>

      {/* RIGHT */}
      <div className="flex flex-col items-end gap-4">
        <div className="text-right">
          <p className="text-xs text-gray-500 mb-1">Amount</p>

          {amount ? (
            <p className="font-semibold text-green-500">{amount}</p>
          ) : (
            <RedactedAmount
              label="amount"
              onDecrypt={async () => {
                try {
                  const result = await decryptHandle(payment.amountHandle);

                  const value = `${result.value.toString()} gUSD`;

                  setAmount(value);

                  return value;
                } catch (err) {
                  console.error(err);
                  alert("You are not authorized to decrypt this amount.");
                }
              }}
            />
          )}
        </div>

        <div className="text-right">
          <p className="text-xs text-gray-500 mb-1">Category</p>

          {category ? (
            <p className="font-semibold text-amber-500">{category}</p>
          ) : (
            <RedactedAmount
              label="category"
              onDecrypt={async () => {
                try {
                  const result = await decryptHandle(payment.tagHandle);

                  const map: Record<number, string> = {
                    1: "Payroll",
                    2: "Donation",
                    3: "Freelance",
                    4: "Treasury",
                  };

                  const value = map[Number(result.value)] ?? "Unknown";

                  setCategory(value);

                  return value;
                } catch (err) {
                  console.error(err);
                  alert("You are not authorized to decrypt this category.");
                }
              }}
            />
          )}
        </div>

        {!isSent &&
          onGrantReceipt &&
          (receiptGranted ? (
            <div className="flex flex-col gap-2">
              <div className="rounded-md bg-green-600 px-3 py-2 text-sm font-medium text-white text-center">
                ✓ Receipt Granted
              </div>

              <button
                onClick={() =>
                  downloadReceipt({
                    paymentId: payment.id,
                    from: payment.from,
                    to: payment.to,
                    amount: amount ?? "Hidden",
                    category: category ?? "Hidden",
                    timestamp: payment.timestamp,
                  })
                }
                className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-500 transition"
              >
                Download Receipt
              </button>
            </div>
          ) : (
            <button
              onClick={() => onGrantReceipt?.()}
              className="rounded-md bg-amber-500 px-3 py-2 text-sm font-medium text-black hover:bg-amber-400 transition"
            >
              Grant Receipt
            </button>
          ))}

        {amount && category && (
          <button
            onClick={() => downloadReceipt(payment, amount, category)}
            className="rounded-md bg-black px-3 py-2 text-sm font-medium text-white hover:bg-gray-800 transition"
          >
            Download Receipt
          </button>
        )}
      </div>
    </div>
  );
}
