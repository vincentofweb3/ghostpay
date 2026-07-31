#  GhostPay

> **Private payments on public blockchains using iExec Nox**
>
> Built for the **iExec WTF Hackathon – Summer Edition**

[![Live Demo](https://img.shields.io/badge/Live-Demo-success?logo=vercel)](https://ghostpay-psi.vercel.app)

![Solidity](https://img.shields.io/badge/Solidity-0.8.28-363636?logo=solidity)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Nox](https://img.shields.io/badge/iExec-Nox-orange)
![License](https://img.shields.io/badge/license-MIT-green)

---

![GhostPay banner](docs/banner.png)

---

## The Problem

Public blockchains expose every payment.

Even if a wallet address is pseudonymous, anyone can see:

- who paid whom
- how much was paid
- when it happened
- every future transaction

This makes confidential activities like payroll, freelance work, donations, treasury operations and supplier payments impossible without sacrificing privacy.

---

## Our Solution

GhostPay enables **confidential payments on public infrastructure**.

Instead of hiding the transaction itself, GhostPay keeps the transaction public while encrypting the sensitive information.

The recipient remains visible.

The payment amount remains confidential.

Only authorized wallets can decrypt payment details.

Everything is powered by **iExec Nox confidential smart contracts**.

---

## Features

- 🔒 Confidential payment amounts
- 🏷️ Encrypted payment categories
- 👛 Works with existing wallets (MetaMask, Rabby)
- 📄 Selective receipt sharing
- 🔑 Fine-grained decryption permissions
- ⚡ Built on Ethereum Sepolia + Nox

---

## Architecture

```text
Sender
   │
Encrypt amount & category
   │
   ▼
GhostPay Router
   │
   ▼
GhostVault (ERC7984 Wrapper)
   │
   ▼
Wrapped ERC20

           │

Recipient decrypts
           │

Authorized third-party
(Accountant/Auditor)
can decrypt only
shared receipts
```

---

## 🔐 Privacy Model

GhostPay does **not** modify ERC20 tokens.

Instead:

- ERC20 tokens are wrapped with Nox
- confidential values are stored as encrypted handles
- access is managed through Nox ACL permissions

Only wallets explicitly granted permission can decrypt.

---

## Screenshots

### Landing Page

![Landing Page](docs/screenshots/landing-page.png)

### Send Payment

![Send Payment](docs/screenshots/send-payment.png)

### Shared Receipts

![Shared Receipts](docs/screenshots/shared-receipts.png)

---

## Tech Stack

- Solidity
- Hardhat
- React
- TypeScript
- Vite
- Tailwind CSS
- Wagmi
- Viem
- iExec Nox SDK
- Ethereum Sepolia

---

## Repository Structure

```text
contracts/
frontend/
docs/
feedback.md
```

---

## Running Locally

### Contracts

```bash
cd contracts
npm install
cp .env.example .env
npm run compile
npm run deploy:sepolia
```

Update

```text
frontend/src/lib/addresses.ts
```

with the deployed addresses.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Demo

The demo showcases:

- Wallet connection
- Sending confidential payments
- Encrypted categories
- Receipt sharing
- Third-party receipt verification
- Public vs confidential comparison

---

## Future Work

- Multi-recipient payments
- Time-limited receipt permissions
- Revocable receipt access
- DAO treasury support
- Payroll automation
- Batch confidential transfers

---

## It's Built For

**iExec WTF Hackathon (Summer Edition)**

Powered by:

- iExec Nox
- Ethereum
- React
- Hardhat
