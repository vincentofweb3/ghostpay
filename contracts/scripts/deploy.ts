import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  const MockUSD = await ethers.getContractFactory("MockUSD");
  const mockUSD = await MockUSD.deploy();
  await mockUSD.waitForDeployment();
  console.log("MockUSD deployed to:", await mockUSD.getAddress());

  const GhostVault = await ethers.getContractFactory("GhostVault");
  const ghostVault = await GhostVault.deploy(await mockUSD.getAddress());
  await ghostVault.waitForDeployment();
  console.log("GhostVault deployed to:", await ghostVault.getAddress());

  const GhostPayRouter = await ethers.getContractFactory("GhostPayRouter");
  const router = await GhostPayRouter.deploy(await ghostVault.getAddress());
  await router.waitForDeployment();
  console.log("GhostPayRouter deployed to:", await router.getAddress());

  console.log("\nSave these into frontend/src/lib/addresses.ts:");
  console.log({
    mockUSD: await mockUSD.getAddress(),
    ghostVault: await ghostVault.getAddress(),
    ghostPayRouter: await router.getAddress(),
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
