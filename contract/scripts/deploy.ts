import { ethers } from "hardhat";

async function main() {
  // 👇 Fill in your token address + constructor params
  const stakingToken = "0xcD6a42782d230D7c13A74ddec5dD140e55499Df9"; // address of ERC20 to stake
  const initialApr = 100; // example: 100% APR
  const minLockDuration = 60 * 60 * 24 * 7; // 1 week in seconds
  const aprReductionPerThousand = 5; // e.g. reduce 0.5% per 1000 tokens
  const emergencyWithdrawPenalty = 10; // 10% penalty

  console.log("Deploying StakingContract...");

  const StakingContract = await ethers.getContractFactory("StakingContract");
  const staking = await StakingContract.deploy(
    stakingToken,
    initialApr,
    minLockDuration,
    aprReductionPerThousand,
    emergencyWithdrawPenalty
  );

  await staking.waitForDeployment();

  console.log("StakingContract deployed at:", await staking.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
