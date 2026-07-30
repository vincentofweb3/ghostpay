You're picking up an in-progress hackathon project called GhostPay. Read `docs/PROGRESS.md` in this repo first — it's the running status log and is more up to date than anything below. This prompt is your onboarding; that file is the source of truth going forward, and I expect you to keep it updated as we work (see "Your job going forward" at the bottom).

## Context

GhostPay is an entry in the iExec WTF Hackathon (Summer Edition) — a privacy layer built on Nox (iExec's confidential smart contract protocol) that lets anyone send a payment from their existing wallet (MetaMask/Rabby/Rainbow, no migration) where the recipient is public but the amount is not. It wraps a plain ERC-20 into a confidential ERC-7984 token, adds encrypted payment-category tags, and — its standout feature — lets a sender grant one specific third party (an accountant, an auditor) decrypt rights on exactly one payment without making it public or exposing anything else in their history.

We have **5 days left until submission** (deadline: 2026/08/01 22:59). The deliverables that get judged: a public GitHub repo, README with install/usage instructions, a functional frontend, a 4-minute demo video, an X post tagging @iEx_ec, a `feedback.md` on the Nox tooling, and deployment on ETH Sepolia.

## Environment — read before running anything

- **Windows, native PowerShell — not WSL, not Docker.** This is deliberate: the machine is a Boot Camp partition with very limited disk space (was down to 1.37GB free at one point; currently ~5GB after cleanup). Do NOT suggest WSL2 or Docker — both carry several GB of overhead and will likely recreate disk-space failures. Be disk-conscious generally: avoid redundant `npm install` runs, don't suggest heavy tooling.
- Project root: `contracts/` (Hardhat) and `frontend/` (Vite + React + Tailwind) as sibling folders.
- `contracts/` dependencies are already installed and the project **compiles successfully** (Solidity 0.8.35).
- **Critical known limitation:** Hardhat's local test network can't run anything that touches Nox's confidential compute functions — there's no working local mock yet (the official `nox-hardhat-plugin` is currently just a plugin-building template, not a finished mock). Two tests in `contracts/test/GhostPay.test.ts` are intentionally `.skip()`-ed with a comment explaining this. Don't spend time trying to un-skip them or build a local mock — test against real Sepolia instead, where a live NoxCompute contract exists at a confirmed address.

## What's done vs. what's left

Full detail is in `docs/PROGRESS.md` and `docs/architecture.md`. Summary:

**Done:** `GhostVault.sol`, `GhostPayRouter.sol`, `MockUSD.sol` — all written, all compiling, all API calls (`Nox.fromExternal`, `Nox.allow`, `Nox.allowThis`, `Nox.addViewer`, `IERC7984.confidentialTransferFrom`) verified against the real installed `@iexec-nox` package source, not guessed. Frontend UI is complete (Send/Activity/Receipts tabs, light/dark mode, the signature "redacted ledger" visual identity with a stamp-reveal decrypt animation) but not wired to real contract calls yet.

**Not done — search the codebase for `TODO` comments to find every remaining spot:**
1. Nothing has been deployed to Sepolia yet — need a `.env` with a Sepolia RPC URL and funded deployer key, then `npm run deploy:sepolia`
2. A verification script confirming `wrap()` actually works end-to-end against the real Sepolia NoxCompute contract (no local test coverage exists for this — see limitation above)
3. Frontend wiring: wallet connect via wagmi, `encryptAmount`/`decryptHandle` calls wired to the deployed addresses, and — important — a one-time `vault.setOperator(routerAddress, expiry)` approval step needs adding to the Send flow, since `GhostPayRouter.sendPrivate()` calls `confidentialTransferFrom` on the payer's behalf and that requires the router to be an approved operator
4. Activity tab needs real event reads (currently mock data)
5. Receipts tab needs `issueReceipt` wired to a real transaction
6. `feedback.md`, demo video, final README pass, X post

## Your job going forward

1. Start with the immediate next step in `docs/PROGRESS.md`'s "Revised plan" section.
2. **After any meaningful chunk of work** (a deploy, a fix, a wiring step, a bug resolved), update `docs/PROGRESS.md`: add a line to the session log, update the "Current status" section at the top, and update the plan if priorities shifted. This file is what tells us where we stopped — keep it honest and current, not aspirational.
3. If you hit an uncertain Nox API or contract behavior, verify it against the real source in `node_modules/@iexec-nox` before writing code that depends on it — don't guess at signatures. This project has already had several rounds of fixing guessed-at signatures against real source; keep that discipline.
4. Flag disk space or environment concerns before running anything heavy (large installs, etc.) given the constraints above.
