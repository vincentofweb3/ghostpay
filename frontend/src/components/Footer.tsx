import { Logo } from "./Logo";
import { ADDRESSES } from "../lib/addresses";

const IEXEC_URL = "https://www.iex.ec/";
const SEPOLIA_URL = "https://sepolia.etherscan.io/";
const GITHUB_URL = "https://github.com/vincentofweb3/ghostpay";

function truncateAddr(addr: string) {
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

export function Footer({ onLaunch, onDocs }: { onLaunch: () => void; onDocs: () => void }) {
  return (
    <footer className="border-t border-ink-700/10 dark:border-paper-200/10">
      <div className="max-w-6xl mx-auto px-6 py-16 grid sm:grid-cols-4 gap-10">
        <div>
          <Logo />
          <p className="mt-4 text-sm text-ink-700 dark:text-paper-200/70">The amount is between you two.</p>
        </div>

        <div>
          <p className="text-xs font-mono uppercase tracking-wide text-ink-700/60 dark:text-paper-200/50">Product</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><button onClick={onLaunch} className="text-ink-700 dark:text-paper-200/70 hover:text-brass-600 dark:hover:text-brass-400 transition-colors">Console</button></li>
            <li><button onClick={onDocs} className="text-ink-700 dark:text-paper-200/70 hover:text-brass-600 dark:hover:text-brass-400 transition-colors">Documentation</button></li>
            <li><a href={GITHUB_URL} target="_blank" rel="noreferrer" className="text-ink-700 dark:text-paper-200/70 hover:text-brass-600 dark:hover:text-brass-400 transition-colors">GitHub ↗</a></li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-mono uppercase tracking-wide text-ink-700/60 dark:text-paper-200/50">Resources</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><button onClick={onDocs} className="text-ink-700 dark:text-paper-200/70 hover:text-brass-600 dark:hover:text-brass-400 transition-colors">Architecture</button></li>
            <li><button onClick={onDocs} className="text-ink-700 dark:text-paper-200/70 hover:text-brass-600 dark:hover:text-brass-400 transition-colors">Security &amp; privacy</button></li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-mono uppercase tracking-wide text-ink-700/60 dark:text-paper-200/50">Built with</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href={IEXEC_URL} target="_blank" rel="noreferrer" className="text-ink-700 dark:text-paper-200/70 hover:text-brass-600 dark:hover:text-brass-400 transition-colors">iExec Confidential Computing ↗</a></li>
            <li><a href={SEPOLIA_URL} target="_blank" rel="noreferrer" className="text-ink-700 dark:text-paper-200/70 hover:text-brass-600 dark:hover:text-brass-400 transition-colors">Ethereum Sepolia ↗</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ink-700/10 dark:border-paper-200/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between gap-2 text-xs font-mono text-ink-700/60 dark:text-paper-200/50">
          <span>GhostVault {truncateAddr(ADDRESSES.ghostVault)}</span>
          <span>Ethereum Sepolia · chain 11155111</span>
        </div>
      </div>
    </footer>
  );
}
