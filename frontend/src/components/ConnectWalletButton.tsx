import { useAccount, useConnect, useDisconnect } from "wagmi";

function truncate(address: string) {
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

export function ConnectWalletButton() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected && address) {
    return (
      <button
        onClick={() => disconnect()}
        className="rounded border border-brass-500/40 bg-paper-100 dark:bg-ink-800 px-3 py-1.5 text-xs font-mono text-brass-600 dark:text-brass-400 hover:opacity-80"
        title="Click to disconnect"
      >
        {truncate(address)}
      </button>
    );
  }

  const injectedConnector = connectors.find((c) => c.id === "injected") ?? connectors[0];

  return (
    <button
      onClick={() => injectedConnector && connect({ connector: injectedConnector })}
      disabled={!injectedConnector || isPending}
      className="rounded border border-ink-700/20 dark:border-paper-200/20 bg-paper-100 dark:bg-ink-800 px-3 py-1.5 text-xs font-mono text-ink-950 dark:text-paper-50 disabled:opacity-40 hover:bg-ink-700/10 dark:hover:bg-paper-100/10"
    >
      {isPending ? "Connecting…" : injectedConnector ? "Connect wallet" : "No wallet found"}
    </button>
  );
}
