import React from 'react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { stakingContractConfig } from '../constants';

const EmergencyWithdraw = () => {
  const { data: hash, writeContract } = useWriteContract();
  const { isLoading: isWithdrawing } = useWaitForTransactionReceipt({
    hash,
    onSuccess() {
      alert("Emergency withdrawal successful!");
    },
  });

  const handleEmergencyWithdraw = () => {
    writeContract({
      ...stakingContractConfig,
      functionName: "emergencyWithdraw",
    });
  };

  return (
    <div className="bg-gradient-to-br from-red-900 to-red-700 p-6 rounded-2xl shadow-lg shadow-red-500/30">
      <h2 className="text-xl font-bold mb-4 text-red-300">Emergency Withdraw</h2>
      <button
        onClick={handleEmergencyWithdraw}
        disabled={isWithdrawing}
        className={`w-full py-3 rounded-xl font-bold text-white tracking-wide transition-all transform
          ${
            isWithdrawing
              ? "bg-gray-600 cursor-not-allowed opacity-60"
              : "bg-gradient-to-r from-red-500 to-pink-600 shadow-lg shadow-red-500/40 hover:scale-105 hover:shadow-red-400/60 active:scale-95"
          }`}
      >
        {isWithdrawing ? "Processing..." : "Withdraw Immediately"}
      </button>
    </div>
  );
};

export default EmergencyWithdraw;