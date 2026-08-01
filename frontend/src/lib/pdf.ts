import jsPDF from "jspdf";

interface ReceiptData {
  paymentId: number | string;
  from: string;
  to: string;
  amount: string;
  category: string;
  timestamp: number;
}

export function downloadReceipt({
  paymentId,
  from,
  to,
  amount,
  category,
  timestamp,
}: ReceiptData) {
  const pdf = new jsPDF("portrait", "mm", "a4");

  // ===========================
  // COLORS
  // ===========================

  const brass = [201, 137, 46] as const;
  const dark = [17, 24, 39] as const;
  const gray = [107, 114, 128] as const;
  const green = [34, 197, 94] as const;

  // ===========================
  // BACKGROUND
  // ===========================

  pdf.setFillColor(250, 250, 248);
  pdf.rect(0, 0, 210, 297, "F");

  // ===========================
  // HEADER
  // ===========================

  pdf.setDrawColor(...brass);
  pdf.setLineWidth(0.8);
  pdf.circle(20, 22, 7);

  pdf.setFillColor(...brass);
  pdf.circle(20, 20, 1.6, "F");
  pdf.rect(18.8, 21.5, 2.4, 3.6, "F");

  pdf.setTextColor(...dark);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(24);
  pdf.text("GhostPay", 32, 25);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(11);
  pdf.setTextColor(...gray);
  pdf.text("Confidential Payment Receipt", 32, 32);

  pdf.setFontSize(9);
  pdf.text(
    "Built for the iExec Write The Future Hackathon",
    32,
    37
  );

  pdf.setDrawColor(...brass);
  pdf.setLineWidth(0.6);
  pdf.line(15, 43, 195, 43);

  // ===========================
  // VERIFIED BADGE
  // ===========================

  pdf.setFillColor(...green);
  pdf.roundedRect(145, 18, 45, 10, 2, 2, "F");

  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(11);
  pdf.text("✓ VERIFIED", 154, 24.8);

  // ===========================
  // PAYMENT DETAILS
  // ===========================

  let y = 58;

  const row = (label: string, value: string) => {
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(11);
    pdf.setTextColor(...gray);
    pdf.text(label, 20, y);

    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(...dark);

    const wrapped = pdf.splitTextToSize(value, 110);

    pdf.text(wrapped, 70, y);

    y += Math.max(12, wrapped.length * 6 + 3);

    pdf.setDrawColor(230);
    pdf.line(20, y - 5, 190, y - 5);
  };

  row("Receipt ID", `#${paymentId}`);

  row("Network", "Ethereum Sepolia");

  row(
    "Sender",
    `${from.slice(0, 10)}...${from.slice(-6)}`
  );

  row(
    "Recipient",
    `${to.slice(0, 10)}...${to.slice(-6)}`
  );

  // ===========================
  // AMOUNT (Highlighted)
  // ===========================

  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(...gray);
  pdf.setFontSize(11);
  pdf.text("Amount", 20, y);

  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(...brass);
  pdf.setFontSize(18);
  pdf.text(amount ?? "Hidden", 70, y);

  y += 14;

  pdf.setDrawColor(230);
  pdf.line(20, y - 5, 190, y - 5);

  // ===========================
  // CATEGORY BADGE
  // ===========================

  pdf.setFontSize(11);

  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(...gray);
  pdf.text("Category", 20, y);

  pdf.setFillColor(247, 236, 214);
  pdf.roundedRect(70, y - 5, 42, 9, 2, 2, "F");

  pdf.setTextColor(...brass);
  pdf.setFont("helvetica", "bold");
  pdf.text(category, 74, y + 1);

  y += 14;

  pdf.setDrawColor(230);
  pdf.line(20, y - 5, 190, y - 5);

  // ===========================
  // DATE & TIME
  // ===========================

  row(
    "Date",
    new Date(timestamp * 1000).toLocaleDateString()
  );

  row(
    "Time",
    new Date(timestamp * 1000).toLocaleTimeString()
  );

  // ===========================
  // CONFIDENTIALITY BOX
  // ===========================

  pdf.setFillColor(245, 245, 245);
  pdf.roundedRect(20, 220, 170, 48, 3, 3, "F");

  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(...dark);
  pdf.setFontSize(12);

  pdf.text("Confidentiality", 28, 232);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);

  pdf.text(
    [
      "✓ Amount encrypted with iExec Nox",
      "",
      "✓ Category encrypted",
      "",
      "✓ Receipt shared using GhostPay selective disclosure",
    ],
    28,
    240
  );

  // ===========================
  // FOOTER
  // ===========================

  pdf.setDrawColor(...brass);
  pdf.line(15, 280, 195, 280);

  pdf.setFont("helvetica", "italic");
  pdf.setFontSize(9);
  pdf.setTextColor(...gray);

  pdf.text(
    "GhostPay • Ethereum Sepolia • ERC-7984 • Powered by iExec Nox",
    20,
    287
  );

  pdf.save(`ghostpay-receipt-${paymentId}.pdf`);
}