import { useState } from "react";
import { Landing } from "./pages/Landing";
import { Dashboard } from "./pages/Dashboard";
import { Docs } from "./pages/Docs";
// import { ReceiptVerificationTab } from "./components/ReceiptVerificationTab";

type View = "landing" | "dashboard" | "docs";

export default function App() {
  const [view, setView] = useState<View>("landing");

  if (view === "dashboard") {
    return <Dashboard onBackToHome={() => setView("landing")} onDocs={() => setView("docs")} />;
  }
  if (view === "docs") {
    return <Docs onBackToHome={() => setView("landing")} onLaunch={() => setView("dashboard")} />;
  }
  return <Landing onLaunch={() => setView("dashboard")} onDocs={() => setView("docs")} />;
}
