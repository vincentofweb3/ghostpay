import { Logo } from "../components/Logo";
import { ThemeToggle } from "../components/ThemeToggle";
import { Footer } from "../components/Footer";

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "how-it-works", label: "How it works" },
  { id: "architecture", label: "Architecture" },
  { id: "api", label: "Confirmed Nox APIs" },
  { id: "security", label: "Security & privacy" },
  { id: "deployment", label: "Deployment" },
];

export function Docs({ onBackToHome, onLaunch }: { onBackToHome: () => void; onLaunch: () => void }) {
  return (
    <div className="min-h-screen bg-paper-50 dark:bg-ink-950 transition-colors flex flex-col">
      <header className="flex items-center justify-between border-b border-ink-700/10 dark:border-paper-200/10 px-4 sm:px-6 py-3 sm:py-4">
        <button onClick={onBackToHome} className="hover:opacity-80 transition-opacity shrink-0" aria-label="Back to home">
          <Logo />
        </button>
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <button onClick={onLaunch} className="rounded bg-ink-950 dark:bg-paper-50 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-paper-50 dark:text-ink-950 hover:opacity-90 transition-opacity whitespace-nowrap">
            Launch Console
          </button>
        </div>
      </header>

      <div className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex gap-8 sm:gap-12 w-full">

      <div className="flex-1 max-w-5xl mx-auto px-6 py-12 flex gap-12 w-full">
        <aside className="hidden md:block w-48 shrink-0">
          <nav className="sticky top-24 space-y-1 text-sm">
            {SECTIONS.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="block rounded px-3 py-1.5 text-ink-700 dark:text-paper-200/70 hover:text-brass-600 dark:hover:text-brass-400 hover:bg-ink-700/5 dark:hover:bg-paper-100/5 transition-colors">
                {s.label}
              </a>
            ))}
          </nav>
        </aside>

        <main className="flex-1 min-w-0 space-y-16">
          <section id="overview">
            <span className="text-xs font-mono uppercase tracking-wide text-brass-600 dark:text-brass-400">Documentation</span>
            <h1 className="mt-2 font-display text-4xl text-ink-950 dark:text-paper-50">GhostPay documentation</h1>
            <p className="mt-6 text-lg text-ink-700 dark:text-paper-200/70 leading-relaxed">
              GhostPay lets anyone send a payment from their existing wallet where the recipient is
              public but the amount is not. It wraps an ordinary ERC-20 into a confidential ERC-7984
              token via iExec Nox, and adds encrypted category tags plus selective-disclosure receipts
              on top — without modifying the token it wraps.
            </p>
          </section>

          <section id="how-it-works">
            <h2 className="font-display text-2xl text-ink-950 dark:text-paper-50">How it works</h2>
            <ol className="mt-6 space-y-4 text-sm text-ink-700 dark:text-paper-200/70">
              <li>
                <strong className="text-ink-950 dark:text-paper-50">1. Wrap.</strong> Deposit a
                stablecoin once; it becomes a confidential balance, same value, now encrypted.
              </li>
              <li>
                <strong className="text-ink-950 dark:text-paper-50">2. Send.</strong> Amount and
                category are encrypted client-side (Nox's <code className="font-mono text-xs">encryptInput</code>) before touching the chain.
              </li>
              <li>
                <strong className="text-ink-950 dark:text-paper-50">3. Reveal.</strong> Only sender
                and recipient can decrypt by default. A receipt grants one more viewer, on one
                payment, on demand.
              </li>
            </ol>
          </section>

          <section id="architecture">
            <h2 className="font-display text-2xl text-ink-950 dark:text-paper-50">Architecture</h2>
            <p className="mt-4 text-sm text-ink-700 dark:text-paper-200/70">
              A wallet wraps a plain ERC-20 (<code className="font-mono text-xs">MockUSD</code>) into a
              confidential token via <code className="font-mono text-xs">GhostVault</code>
              (Nox's <code className="font-mono text-xs">ERC20ToERC7984Wrapper</code>). Payments route
              through <code className="font-mono text-xs">GhostPayRouter</code>, which tags each
              transfer with an encrypted category and can issue selective-disclosure receipts.
            </p>
            <pre className="mt-6 rounded-lg border border-ink-700/15 dark:border-paper-200/15 bg-paper-100 dark:bg-ink-900 p-5 text-xs font-mono text-ink-700 dark:text-paper-200/70 overflow-x-auto">
        {`Wallet -> MockUSD (unmodified ERC-20)
       -> GhostVault.wrap() -> confidential ERC-7984 balance
       -> GhostPayRouter.sendPrivate() -> tagged, encrypted transfer
       -> Nox.addViewer() -> decrypt rights for sender + recipient
       -> GhostPayRouter.issueReceipt() -> decrypt rights for one more viewer`}
            </pre>
          </section>

          <section id="api">
            <h2 className="font-display text-2xl text-ink-950 dark:text-paper-50">Confirmed Nox APIs</h2>
            <p className="mt-4 text-sm text-ink-700 dark:text-paper-200/70">
              Every call below was verified against the real installed <code className="font-mono text-xs">@iexec-nox</code> package
              source, not assumed from documentation.
            </p>
            <div className="mt-6 rounded-lg border border-ink-700/15 dark:border-paper-200/15 divide-y divide-ink-700/10 dark:divide-paper-200/10 overflow-hidden">
              {[
                ["Nox.fromExternal", "(externalEuint256, bytes) -> euint256"],
                ["Nox.allow", "(handle, account) - on-chain compute permission"],
                ["Nox.addViewer", "(handle, viewer) - off-chain decrypt permission"],
                ["IERC7984.confidentialTransferFrom", "(from, to, euint256 amount) -> euint256"],
              ].map(([call, desc]) => (
                <div key={call} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 px-5 py-3">
                  <code className="font-mono text-xs text-brass-600 dark:text-brass-400 sm:w-72 shrink-0">{call}</code>
                  <span className="text-xs text-ink-700 dark:text-paper-200/70">{desc}</span>
                </div>
              ))}
            </div>
          </section>

          <section id="security">
            <h2 className="font-display text-2xl text-ink-950 dark:text-paper-50">Security & privacy</h2>
            <p className="mt-4 text-sm text-ink-700 dark:text-paper-200/70 leading-relaxed">
              Amounts and categories exist on-chain only as encrypted handles, computed inside
              TEEs - plaintext never touches calldata or storage. Two permissions are kept
              deliberately separate: <code className="font-mono text-xs">allow</code> lets a contract
              compute with a handle; <code className="font-mono text-xs">addViewer</code> is the only
              thing that lets a human decrypt one. Selective-disclosure receipts use <code className="font-mono text-xs">addViewer</code> exclusively, scoped to one payment
              at a time.
            </p>
          </section>

          <section id="deployment">
            <h2 className="font-display text-2xl text-ink-950 dark:text-paper-50">Deployment</h2>
            <div className="mt-6 rounded-lg border border-ink-700/15 dark:border-paper-200/15 divide-y divide-ink-700/10 dark:divide-paper-200/10 overflow-hidden text-sm">
              <div className="flex justify-between px-5 py-3">
                <span className="text-ink-700 dark:text-paper-200/60">Network</span>
                <span className="font-mono text-ink-950 dark:text-paper-50">Ethereum Sepolia · chainId 11155111</span>
              </div>
              <div className="flex justify-between px-5 py-3">
                <span className="text-ink-700 dark:text-paper-200/60">Confidential compute</span>
                <span className="font-mono text-ink-950 dark:text-paper-50">iExec Nox</span>
              </div>
              <div className="flex justify-between px-5 py-3">
                <span className="text-ink-700 dark:text-paper-200/60">GhostVault</span>
                <span className="font-mono text-ink-950 dark:text-paper-50">0x1234…7890</span>
              </div>
            </div>
            <p className="mt-4 text-xs text-ink-700/60 dark:text-paper-200/50">
              Addresses update automatically once deployed - see <code className="font-mono">frontend/src/lib/addresses.ts</code>.
            </p>
          </section>
        </main>
      </div>
    </div>

      <Footer onLaunch={onLaunch} onDocs={() => window.scrollTo({ top: 0, behavior: "smooth" })} />
    </div>
  );
}
