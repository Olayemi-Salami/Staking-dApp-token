import { ethers } from "ethers";
import { STAKING_CONTRACT_ADDRESS, STAKING_CONTRACT_ABI } from "./stakingContract";

export const getStakingContract = (providerOrSigner) => {
  return new ethers.Contract(
    STAKING_CONTRACT_ADDRESS,
    STAKING_CONTRACT_ABI,
    providerOrSigner
  );
};