# GhostPay — Progress Log

**Read this file first, every time you come back to this project.** It's the answer to "where did we stop."

---

## Current status (most recent — 5 days left until submission)

**Contracts: written and compiling successfully.** All Nox API calls have been verified against the real installed package source (not guessed) — see "Confirmed Nox APIs" below.

**Not yet done:**
- Nothing has been deployed to Sepolia yet
- Frontend is UI-complete but NOT wired to real contract calls (buttons currently simulate with `setTimeout`, marked with `TODO` comments)
- No end-to-end test has actually succeeded yet (local Hardhat tests were intentionally skipped — see "Known blocker" below)
- `feedback.md`, demo video, and X post are all still pending

**Immediate next step:** deploy `MockUSD` + `GhostVault` + `GhostPayRouter` to Sepolia, then verify `wrap()` actually works with a real transaction (a small script, not a local test — see Known Blocker). Everything else follows from that working.

---

## What's been built

### Contracts (`contracts/contracts/`)
- **`GhostVault.sol`** — wraps a plain ERC-20 into a confidential ERC-7984 token via Nox's official `ERC20ToERC7984Wrapper`. Constructor signature confirmed: `ERC20ToERC7984Wrapper(name, symbol, contractURI, underlying)`.
- **`GhostPayRouter.sol`** — the standout feature. Adds two things on top of the bare wrapper:
  1. Encrypted payment-category tags (Payroll/Donation/Freelance/Treasury) on every transfer
  2. Selective-disclosure receipts — `issueReceipt(paymentId, viewer)` grants exactly one third party decrypt rights on exactly one payment, via Nox's `addViewer`
- **`mocks/MockUSD.sol`** — simple mintable ERC-20 standing in for a real testnet token (e.g. USDC), since the wrapped/underlying token must stay unmodified per the hackathon brief.

### Confirmed Nox APIs (verified against `node_modules/@iexec-nox`, not assumed)
- `Nox.fromExternal(externalEuint256, bytes) -> euint256` — converts an encrypted input + proof into a usable handle
- `Nox.allow(handle, account)` — grants a contract/account permission to use a handle in further on-chain computation
- `Nox.allowThis(handle)` — shorthand for `allow(handle, address(this))`
- `Nox.addViewer(handle, viewer)` — grants an address permission to **decrypt** a handle off-chain (this is the selective-disclosure mechanism `issueReceipt()` is built on — distinct from `allow`, which only governs on-chain computation)
- `IERC7984.confidentialTransferFrom(from, to, euint256 amount) -> euint256` — the real transfer entrypoint. **Caller must be `from` or an approved operator for `from`** — meaning the frontend needs a one-time `vault.setOperator(routerAddress, expiryTimestamp)` approval step before a wallet's first send (same pattern as an ERC-20 `approve`).
- **Ethereum Sepolia is confirmed supported** — `Nox.sol`'s `noxComputeContract()` hardcodes a dedicated address for chain id `11155111` (`0x24Ef36Ec5b626D7DCD09a98F3083c2758F0F77bF`), alongside Hardhat local (31337) and Arbitrum Sepolia (421614).

### Frontend (`frontend/src/`)
UI-complete with the "redacted ledger" visual identity (censor-bar amounts, brass ink stamp-reveal animation, light/dark toggle, three-tab nav: Send / Activity / Receipts). Every place that needs a real contract call is marked `// TODO` — search the codebase for `TODO` to find every remaining wiring point.

---

## Known blocker: no local Nox mock

Hardhat's local test network (chain id 31337) resolves to a NoxCompute address that needs a real mock contract deployed there to work. The official `nox-hardhat-plugin` repo, as of building this, is explicitly a **template for building a plugin** (per its own README), not a finished drop-in mock — so local unit tests that touch any Nox function (wrap, transfer, etc.) will revert.

**Decision made:** stop trying to get local tests passing. Test everything against real Sepolia instead, where a live NoxCompute contract genuinely exists. The two tests in `contracts/test/GhostPay.test.ts` are marked `.skip()` with a comment explaining why — don't waste time re-enabling them locally. If a local mock plugin becomes available/documented later and there's spare time, revisit.

---

## Environment notes

- Windows (Boot Camp partition), PowerShell, **not** WSL or Docker — this is the right call given very limited disk space (started at 1.37GB free, freed up to ~5GB via Disk Cleanup + DISM component cleanup + shadow storage resize). WSL2 and Docker Desktop both carry several GB of overhead that would likely recreate the same `ENOSPC` problems.
- Project lives under OneDrive (`...\OneDrive\Desktop\ghostpay\ghostpay\`) — this caused file-lock issues once already during a `node_modules` deletion (OneDrive syncing mid-operation). Pause OneDrive sync before any bulk `node_modules` operations if it happens again.
- `contracts/` dependencies installed successfully (645 packages). Compiler is Solidity `0.8.35` (bumped from `0.8.28` — Nox's protocol contracts require `^0.8.35`).

---

## Session log

- **Session 1:** Chose GhostPay concept, scaffolded full repo (contracts + frontend + docs), delivered as zip.
- **Session 2:** Debugged disk space (`ENOSPC`) blocking `npm install`, freed ~3.6GB via cleanup, got `npm install` to succeed.
- **Session 3:** Pulled real Nox source from `node_modules`, fixed `GhostVault.sol` constructor and `GhostPayRouter.sol` transfer/ACL calls to match confirmed real signatures. Fixed `tsconfig.json` and Solidity version mismatches. **Got a full successful compile** ("Compiled 28 Solidity files successfully"). Local test run revealed the Nox-mock blocker above; tests marked skipped with explanation. Reassessed timeline — 5 days left, re-scoping to prioritize Sepolia deployment over local test coverage.

---

## Revised 5-day plan (from here)

- **Day 1 (today):** Get a Sepolia RPC URL + funded testnet wallet, fill in `.env`, run `npm run deploy:sepolia`, then write and run a small verification script that calls `wrap()` for real and confirms it doesn't revert.
- **Day 2:** Wire the frontend's `TODO`s to real `wagmi` calls — wallet connect, `encryptAmount`/`sendPrivate` in the Send tab, the one-time `setOperator` approval step.
- **Day 3:** Wire Activity (real event reads + decrypt) and Receipts (`issueReceipt` + viewer decrypt) tabs. Full end-to-end pass with two real wallets.
- **Day 4:** Record the Etherscan-vs-GhostPay split-screen demo, write `feedback.md` for real, finalize README, architecture diagram.
- **Day 5:** Buffer for bugs, record the final 4-minute video, write the X post, submit — don't wait until the deadline hour.
