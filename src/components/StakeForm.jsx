import React, { useState } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi';
import { stakingContractConfig, tokenContractConfig } from '../constants';
import { parseUnits } from 'viem';
import { STAKING_CONTRACT_ADDRESS } from '../constants/stakingContract';

const StakeForm = () => {
  const { address } = useAccount();
  const [amount, setAmount] = useState('');
  const [showApprovalSuccess, setShowApprovalSuccess] = useState(false);
  const [showStakeSuccess, setShowStakeSuccess] = useState(false);

  const { data: decimals } = useReadContract({
    ...tokenContractConfig,
    functionName: 'decimals',
  });

  const { data: allowance, refetch } = useReadContract({
    ...tokenContractConfig,
    functionName: 'allowance',
    args: [address, STAKING_CONTRACT_ADDRESS],
    enabled: !!address,
  });

  const { data: approveHash, writeContract: approve } = useWriteContract();
  const { isLoading: isApproving } = useWaitForTransactionReceipt({
    hash: approveHash,
    onSuccess(data) {
      refetch();
      setShowApprovalSuccess(true);
      setTimeout(() => setShowApprovalSuccess(false), 5000);
    },
  });

  const { data: stakeHash, writeContract: stake } = useWriteContract();
  const { isLoading: isStaking } = useWaitForTransactionReceipt({
    hash: stakeHash,
    onSuccess(data) {
      refetch();
      setShowStakeSuccess(true);
      setTimeout(() => setShowStakeSuccess(false), 5000);
    },
  });

  const handleApprove = async () => {
    if (!amount || decimals === undefined) return;
    try {
      await approve({
        ...tokenContractConfig,
        functionName: 'approve',
        args: [STAKING_CONTRACT_ADDRESS, parseUnits(amount, decimals)],
      });
    } catch (error) {
      console.log("Error", error)
    }
  };

  const handleStake = () => {
    if (!amount || decimals === undefined) return;
    stake({
      ...stakingContractConfig,
      functionName: 'stake',
      args: [parseUnits(amount, decimals)],
    });
  };

  const needsApproval = (allowance !== undefined && amount && decimals !== undefined) ? allowance < parseUnits(amount, decimals) : true;

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Stake Tokens</h2>
      <div className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Amount to stake"
          className="p-2 rounded bg-gray-700 text-white"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        {needsApproval ? (
          <button
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${isApproving ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleApprove}
            disabled={isApproving || !amount}
          >
            {isApproving ? 'Approving...' : 'Approve'}
          </button>
        ) : (
          <button
            className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ${isStaking ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleStake}
            disabled={isStaking || !amount}
          >
            {isStaking ? 'Staking...' : 'Stake'}
          </button>
        )}
      </div>
      {showApprovalSuccess && (
        <p className="mt-4 text-green-400">Approved successfully</p>
      )}
      {showStakeSuccess && (
        <p className="mt-4 text-green-400">Staked successfully!</p>
      )}
    </div>
  );
};

export default StakeForm;