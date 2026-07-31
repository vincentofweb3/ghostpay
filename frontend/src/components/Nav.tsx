export type Tab = "send" | "activity" | "receipts" | "verification";

const TABS: { id: Tab; label: string; hint: string }[] = [
  { id: "send", label: "Send", hint: "01" },
  { id: "activity", label: "Activity", hint: "02" },
  { id: "receipts", label: "Receipts", hint: "03" },
  { id: "verification", label: "Shared With Me", hint: "04" },
];

export function Nav({
  active,
  onChange,
}: {
  active: Tab;
  onChange: (t: Tab) => void;
}) {
  return (
    <nav className="flex md:flex-col gap-1 md:w-44 shrink-0">
      {TABS.map((tab) => {
        const isActive = tab.id === active;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex items-center justify-between rounded px-3 py-2 text-sm text-left transition-colors ${
              isActive
                ? "bg-ink-900 text-paper-50 dark:bg-paper-50 dark:text-ink-950"
                : "text-ink-800 dark:text-paper-200/80 hover:bg-ink-700/5 dark:hover:bg-paper-100/5"
            }`}
          >
            <span>{tab.label}</span>
            <span className="font-mono text-[10px] opacity-50">{tab.hint}</span>
          </button>
        );
      })}
    </nav>
  );
}
