import { BrowserProvider, Contract } from "ethers";

import { ADDRESSES } from "./addresses";

import GhostPayRouter from "../abis/GhostPayRouter.json";
import GhostVault from "../abis/GhostVault.json";
import MockUSD from "../abis/MockUSD.json";

async function getSigner() {
  if (!window.ethereum) {
    throw new Error("No wallet found");
  }

  const provider = new BrowserProvider(window.ethereum);

  await provider.send("eth_requestAccounts", []);

  return provider.getSigner();
}

export async function getRouterContract() {
  const signer = await getSigner();

  return new Contract(
    ADDRESSES.ghostPayRouter,
    GhostPayRouter.abi,
    signer
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

  console.log("Receipt tx:", tx.hash);

  await tx.wait();

  console.log("Receipt confirmed");

  return tx.hash;
}

export async function getAllPayments() {
  const router = await getRouterContract();

  const nextPaymentId = Number(await router.nextPaymentId());

  console.log("nextPaymentId =", nextPaymentId);

  const payments = [];

  for (let i = 0; i < nextPaymentId; i++) {
    const payment = await router.getPayment(i);

    console.log("RAW PAYMENT");
    console.dir(payment);

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

  console.log("Final payments:", payments);

  return payments;
}

export async function getVaultContract() {
  const signer = await getSigner();

  return new Contract(
    ADDRESSES.ghostVault,
    GhostVault.abi,
    signer
  );
}

export async function getMockUSDContract() {
  const signer = await getSigner();

  return new Contract(
    ADDRESSES.mockUSD,
    MockUSD.abi,
    signer
  );
}

export async function getViewerReceipts(address: string) {
  const router = await getRouterContract();

  const ids = await router.getViewerReceipts(address);

  const payments = [];

  for (const id of ids) {
    const payment = await router.getPayment(Number(id));

    payments.push({
      id: Number(id),
      from: payment[0],
      to: payment[1],
      amountHandle: payment[2],
      tagHandle: payment[3],
      timestamp: Number(payment[4]),
    });
  }

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