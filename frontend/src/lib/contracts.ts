import { BrowserProvider, Contract } from "ethers";

import { ADDRESSES } from "./addresses";

import GhostPayRouter from "../abis/GhostPayRouter.json";
import GhostVault from "../abis/GhostVault.json";
import MockUSD from "../abis/MockUSD.json";

let router: Contract | null = null;
let vault: Contract | null = null;
let mockUSD: Contract | null = null;

let provider: BrowserProvider | null = null;

function getProvider() {
  if (!window.ethereum) {
    throw new Error("No wallet found");
  }

  if (!provider) {
    provider = new BrowserProvider(window.ethereum);
  }

  return provider;
}

async function getSigner() {
  const provider = getProvider();

  const accounts = await provider.listAccounts();

  if (accounts.length === 0) {
    throw new Error("Wallet not connected");
  }

  return provider.getSigner();
}

export async function getRouterContract() {
    if (router) return router;

    const signer = await getSigner();

    router = new Contract(
        ADDRESSES.ghostPayRouter,
        GhostPayRouter.abi,
        signer
    );

    return router;
}

export function getReadOnlyRouterContract() {
  const provider = getProvider();

  return new Contract(
    ADDRESSES.ghostPayRouter,
    GhostPayRouter.abi,
    provider
  );
}

export async function issueReceipt(
  paymentId: number,
  viewer: string
) {
  const router = await getRouterContract();

  const tx = await router.issueReceipt(
    paymentId,
    viewer
  );

  await tx.wait();

  return tx.hash;
}

export async function getAllPayments() {
  const router = getReadOnlyRouterContract();

  const nextPaymentId = Number(await router.nextPaymentId());

  const payments = [];

  for (let i = 0; i < nextPaymentId; i++) {
    const payment = await router.getPayment(i);

    payments.push({
      id: i,

      // sender
      from: payment[0],

      // recipient
      to: payment[1],

      // encrypted amount handle
      amountHandle: payment[2],

      // encrypted category handle
      tagHandle: payment[3],

      // unix timestamp
      timestamp: Number(payment[4]),
    });
  }

  return payments;
}

export async function getVaultContract() {
  if (vault) return vault;

  const signer = await getSigner();

  vault = new Contract(
    ADDRESSES.ghostVault,
    GhostVault.abi,
    signer
  );

  return vault;
}

export async function getMockUSDContract() {
  if (mockUSD) return mockUSD;

  const signer = await getSigner();

  mockUSD = new Contract(
    ADDRESSES.mockUSD,
    MockUSD.abi,
    signer
  );

  return mockUSD;
}

export async function getViewerReceipts(address: string) {
  const router = await getRouterContract();

  console.log("=================================");
  console.log("Viewer:", address);

  const ids = await router.getViewerReceipts(address);

  console.log("Receipt IDs:", ids);

  const payments = [];

  for (const id of ids) {
    console.log("Loading payment:", Number(id));

    const payment = await router.getPayment(Number(id));

    console.log("Payment:", payment);

    payments.push({
      id: Number(id),
      from: payment[0],
      to: payment[1],
      amountHandle: payment[2],
      tagHandle: payment[3],
      timestamp: Number(payment[4]),
    });
  }

  console.log("Viewer payments:", payments);
  console.log("=================================");

  return payments;
}






// import { BrowserProvider, Contract } from "ethers";

// import { ADDRESSES } from "./addresses";

// import GhostPayRouter from "../abis/GhostPayRouter.json";
// import GhostVault from "../abis/GhostVault.json";
// import MockUSD from "../abis/MockUSD.json";

// async function getSigner() {
//   if (!window.ethereum)
//     throw new Error("No wallet found");

//   const provider = new BrowserProvider(window.ethereum);

//   await provider.send("eth_requestAccounts", []);

//   return provider.getSigner();
// }

// export async function getRouterContract() {
//   const signer = await getSigner();

//   return new Contract(
//     ADDRESSES.ghostPayRouter,
//     GhostPayRouter.abi,
//     signer
//   );
// }

// export async function getAllPayments() {
//   const router = await getRouterContract();

//   const nextPaymentId = await router.nextPaymentId();

//   console.log("nextPaymentId =", Number(nextPaymentId));

//   const payments = [];

//   for (let i = 0; i < Number(nextPaymentId); i++) {
//     const payment = await router.getPayment(i);

//     console.log(`Payment ${i}:`, payment);

//     payments.push({
//       id: i,
//       from: payment[0],
//       to: payment[1],
//       timestamp: Number(payment[2]),
//     });
//   }

//   console.log("Final payments:", payments);

//   return payments;
// }

// export async function getVaultContract() {
//   const signer = await getSigner();

//   return new Contract(
//     ADDRESSES.ghostVault,
//     GhostVault.abi,
//     signer
//   );
// }

// export async function getMockUSDContract() {
//   const signer = await getSigner();

//   return new Contract(
//     ADDRESSES.mockUSD,
//     MockUSD.abi,
//     signer
//   );
// }