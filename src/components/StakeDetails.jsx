import React from 'react';
import { useAccount, useContractRead } from 'wagmi';
import { ethers } from 'ethers';
import { stakingContractConfig } from '../constants';

const StakeDetails = () => {
  const { address } = useAccount();
  const { data: stakedAmount } = useContractRead({
    ...stakingContractConfig,
    functionName: 'staked',
    args: [address],
    watch: true,
  });

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg mt-4">
      <h2 className="text-xl font-bold mb-4">Your Staked Amount</h2>
      <p className="text-white text-lg">{stakedAmount ? ethers.formatUnits(stakedAmount, 18) : '0'} Tokens</p>
    </div>
  );
};

export default StakeDetails;