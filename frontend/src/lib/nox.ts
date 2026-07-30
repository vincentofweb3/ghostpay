import { createEthersHandleClient } from "@iexec-nox/handle";
import { BrowserProvider } from "ethers";
import type { HandleClient } from "@iexec-nox/handle";

let clientPromise: Promise<HandleClient> | null = null;

/**
 * Lazily creates and caches the Nox HandleClient bound to the connected
 * wallet. Call this once a wallet is connected (e.g. after wagmi's
 * useAccount reports isConnected), not on every render.
 */
export function getHandleClient(): Promise<HandleClient> {
  if (!clientPromise) {
    if (!window.ethereum) throw new Error("No injected wallet found");
    const provider = new BrowserProvider(window.ethereum);
    clientPromise = createEthersHandleClient(provider);
  }
  return clientPromise;
}

/** Encrypt a plaintext amount for a target contract, returning a handle + proof. */
// export async function encryptAmount(amount: bigint, contractAddress: string) {
//   const client = await getHandleClient();
//   return client.encryptInput(amount, contractAddress);
// }

export async function encryptAmount(
  amount: bigint,
  contractAddress: string
) {
  const client = await getHandleClient();

  const result = await client.encryptInput(
    amount,
    "uint256",
    contractAddress
  );

  console.log("Encrypted result:", result);

  return result;
}

/** Decrypt a handle the connected wallet has been granted ACL access to. */
export async function decryptHandle(handle: any) {
  const client = await getHandleClient();

  return client.decrypt(handle);
}

/** Category tags — kept as plain constants client-side; on-chain they're
 * always passed through encryptInput before touching the contract, so the
 * category itself stays private per-payment. */
export const PAYMENT_TAGS = {
  Payroll: 1,
  Donation: 2,
  Freelance: 3,
  Treasury: 4,
} as const;

