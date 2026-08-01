# Architecture

```
 User's existing wallet (MetaMask / Rabby / Rainbow — unmodified)
        │
        │  wraps                     sends encrypted amount + tag
        ▼                                   ▼
 ┌─────────────┐   wrap()/unwrap()   ┌──────────────────┐
 │  MockUSD    │ ──────────────────▶ │   GhostVault     │
 │ (plain      │                     │ (ERC20ToERC7984  │
 │  ERC-20,    │ ◀────────────────── │  Wrapper — Nox)  │
 │  untouched) │   finalizeUnwrap()  └──────────────────┘
 └─────────────┘                               │
                                               │ confidential transfer
                                               ▼
                                     ┌──────────────────┐
                                     │ GhostPayRouter    │
                                     │ - tags payments   │
                                     │   (encrypted)     │
                                     │ - issues receipts │
                                     │   (ACL grants)    │
                                     └──────────────────┘
                                               │
                              only sender/recipient/
                              granted viewer can decrypt
                                               ▼
                            Frontend (Send / Activity / Receipts)
```

## Design decisions

- **Why a wrapper instead of a fork**: the brief explicitly asks for privacy added on top of transparent infrastructure "without needing to modify the underlying protocols." Wrapping means the original ERC-20 (standing in for a real token like USDC) never changes — anyone not using GhostPay keeps using it exactly as before.
- **Why tags instead of four separate apps**: reusing one confidential-transfer flow across Payroll/Donation/Freelance/Treasury keeps the engineering surface small (one contract, one UI) while still demonstrating breadth of use case, which is what the brief's suggested categories are gesturing at.
- **Why receipts are the standout feature**: hiding an amount is the obvious use of Nox. Selectively revealing it to exactly one party, without touching anything else in someone's history, uses the ACL/viewer-grant primitives most entrants are likely to skip — and it's the part of the brief's "how cleanly Nox integrates" criterion that's hardest to fake.
