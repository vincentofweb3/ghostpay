import { useState } from "react";
import { Logo } from "../components/Logo";
import { Nav, type Tab } from "../components/Nav";
import { ThemeToggle } from "../components/ThemeToggle";
import { ConnectWalletButton } from "../components/ConnectWalletButton";
import { SendTab } from "../components/SendTab";
import { ActivityTab } from "../components/ActivityTab";
import { ReceiptsTab } from "../components/ReceiptsTab";
import { SplitScreenDemo } from "../components/SplitScreenDemo";
import { Footer } from "../components/Footer";

export function Dashboard({ onBackToHome, onDocs }: { onBackToHome: () => void; onDocs: () => void }) {
  const [tab, setTab] = useState<Tab>("send");
  const [showDemo, setShowDemo] = useState(false);

  return (
    <div className="min-h-screen bg-paper-50 dark:bg-ink-950 transition-colors flex flex-col">
      <header className="flex flex-wrap items-center justify-between gap-2 border-b border-ink-700/10 dark:border-paper-200/10 px-4 sm:px-6 py-3 sm:py-4">
        <button onClick={onBackToHome} className="hover:opacity-80 transition-opacity shrink-0" aria-label="Back to home">
          <Logo />
        </button>
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-end">
          <button
            onClick={() => setShowDemo((v) => !v)}
            className="text-[11px] sm:text-xs font-mono text-ink-700 dark:text-paper-200/70 underline hover:opacity-70 whitespace-nowrap"
          >
            {showDemo ? "hide compare" : "show compare"}
          </button>
          <ThemeToggle />
          <ConnectWalletButton />
        </div>
      </header>

      <main className="flex-1 flex flex-col md:flex-row gap-6 sm:gap-8 px-4 sm:px-6 py-6 sm:py-8 max-w-5xl mx-auto w-full">
        <Nav active={tab} onChange={setTab} />

        <div className="flex-1 space-y-8 min-w-0">
          {showDemo && <SplitScreenDemo />}
          {tab === "send" && <SendTab />}
          {tab === "activity" && <ActivityTab />}
          {tab === "receipts" && <ReceiptsTab />}
        </div>
      </main>

      <Footer onLaunch={() => window.scrollTo({ top: 0, behavior: "smooth" })} onDocs={onDocs} />
    </div>
  );
}
