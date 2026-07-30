# GhostPay — private payments on public rails

Built for the iExec WTF Hackathon (Summer Edition), on Nox.

## What this is

GhostPay lets anyone send a payment from their existing wallet (MetaMask, Rabby, Rainbow — no new wallet, no migration) where the **recipient is public but the amount is not**, using Nox's confidential ERC-7984 layer on top of an ordinary, unmodified ERC-20. It adds two things on top of a bare confidential-transfer wrapper:

1. **Tagged categories** (Payroll / Donation / Freelance / Treasury) — encrypted per-payment, so the same flow covers multiple real use cases without multiplying contracts or UI.
2. **Selective-disclosure receipts** — a sender can grant one specific third party (an accountant, an auditor, a counterparty) decrypt rights on exactly one payment, without making it public and without exposing anything else in their history. Built directly on Nox's ACL primitives.

## Why this satisfies the brief

- The underlying token (`MockUSD`, standing in for a real ERC-20 like USDC) is never modified — `GhostVault` wraps it via Nox's official `ERC20ToERC7984Wrapper`.
- Privacy is added by **routing through Nox**, not by forking or altering the public protocol.
- It targets the brief's suggested "Wallets" category directly: works with any existing wallet, no special integration required from MetaMask/Rabby/Rainbow themselves.

## Repo structure

```
contracts/     Hardhat project — GhostVault, GhostPayRouter, MockUSD, deploy script, tests
frontend/      Vite + React + Tailwind dApp — Send / Activity / Receipts
docs/          Architecture notes
feedback.md    Feedback on the Nox tooling, as required by the deliverables
```

## Running it

### Contracts

```bash
cd contracts
npm install
cp .env.example .env   # fill in SEPOLIA_RPC_URL and DEPLOYER_PRIVATE_KEY
npm run compile
npm run deploy:sepolia
```

Copy the three printed addresses into `frontend/src/lib/addresses.ts`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Status / what's left before submission

This scaffold includes real contract logic and a real UI, but two things need to be confirmed/finished before this is submission-ready — see the TODO comments in `GhostPayRouter.sol` and `SendTab.tsx`/`ActivityTab.tsx`:

- [ ] Confirm the exact ERC-7984 confidential transfer entrypoint name against the installed `@iexec-nox/nox-confidential-contracts` version
- [ ] Wire the frontend's `encryptAmount`/`decryptHandle` calls to the deployed contract addresses via wagmi
- [ ] Confirm ETH Sepolia (not just Arbitrum Sepolia) is fully supported by the Nox KMS/gateway for this hackathon
- [ ] Record the 4-minute demo video using the built-in Etherscan comparison panel
- [ ] Fill in `feedback.md`
