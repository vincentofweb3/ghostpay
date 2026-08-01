import { LandingNavbar } from "../components/landing/Navbar";
import { Hero } from "../components/landing/Hero";
import { HowItWorks } from "../components/landing/HowItWorks";
import { Features } from "../components/landing/Features";
import { UseCases } from "../components/landing/UseCases";
import { Comparison } from "../components/landing/Comparison";
import { TechStack } from "../components/landing/TechStack";
import { CTA } from "../components/landing/CTA";
import { Footer } from "../components/Footer";
import { BuiltWith } from "../components/landing/BuiltWith";

export function Landing({ onLaunch, onDocs }: { onLaunch: () => void; onDocs: () => void }) {
  return (
    <div className="min-h-screen bg-paper-50 dark:bg-ink-950 transition-colors">
      <LandingNavbar onLaunch={onLaunch} onDocs={onDocs} />
      <Hero onLaunch={onLaunch} />
      <HowItWorks />
      <Features />
      <UseCases />
      <Comparison />
      <TechStack />
      <CTA onLaunch={onLaunch} />
      <BuiltWith />
      <Footer onLaunch={onLaunch} onDocs={onDocs} />
    </div>
  );
}
