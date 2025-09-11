import React from 'react';
import { useAccount, useContractRead, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { stakingContractConfig } from '../constants';
import { formatUnits } from 'viem';

const Rewards = () => {
  const { address } = useAccount();

  const { data: pendingRewards, isLoading: isReadingRewards } = useContractRead({
    ...stakingContractConfig,
    functionName: 'getReward',
    args: [address],
    watch: true,
  });

  const { data: hash, writeContract, isPending: isClaiming } = useWriteContract();

  const handleClaimRewards = () => {
    writeContract({
      ...stakingContractConfig,
      functionName: 'claimRewards',
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  React.useEffect(() => {
    if (isConfirmed) {
      alert('Rewards claimed successfully!');
    }
  }, [isConfirmed]);

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Claim Rewards</h2>
      <div className="flex flex-col space-y-4">
        <p className="text-white">
          Pending Rewards:{' '}
          <span className="font-bold">
            {isReadingRewards && 'Loading...'}
            {pendingRewards ? formatUnits(pendingRewards, 18) : '0'}
          </span>
        </p>
        <button
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleClaimRewards}
          disabled={isClaiming || isConfirming}
        >
          {isClaiming || isConfirming ? 'Claiming...' : 'Claim Rewards'}
        </button>
      </div>
    </div>
  );
};

export default Rewards;