import React, { useState } from 'react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { stakingContractConfig } from '../constants';
import { parseEther } from 'viem';

const WithdrawalForm = () => {
  const [amount, setAmount] = useState('');
  const { data: hash, writeContract } = useWriteContract();

  const { isLoading: isWithdrawing, isSuccess: isWithdrawn } = useWaitForTransactionReceipt({
    hash,
    onSuccess() {
      alert('Withdrawal successful!');
      setAmount('');
    },
  });

  const handleWithdraw = () => {
    if (!amount) return;
    writeContract({
      ...stakingContractConfig,
      functionName: 'withdraw',
      args: [parseEther(amount)],
    });
  };

  return (
    <div className="bg-gradient-to-br from-[#0a0b1e] via-[#111827] to-[#1e1b4b] p-6 rounded-2xl border border-white/10 shadow-lg shadow-cyan-500/20 font-orbitron">
      {/* Title */}
      <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
        Withdraw Tokens
      </h2>

      {/* Input */}
      <div className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Amount to withdraw"
          className="p-3 rounded-lg bg-black/40 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        {/* Withdraw Button */}
        <button
          onClick={handleWithdraw}
          disabled={isWithdrawing || !amount}
          className={`w-full py-3 rounded-xl font-bold text-white tracking-wide transition-all transform
            ${isWithdrawing || !amount
              ? 'bg-gray-600 cursor-not-allowed opacity-60'
              : 'bg-gradient-to-r from-cyan-400 to-blue-600 shadow-lg shadow-cyan-500/40 hover:scale-105 hover:shadow-cyan-400/60 active:scale-95'
            }`}
        >
          {isWithdrawing ? 'Processing...' : 'Withdraw'}
        </button>
      </div>

      {/* Success message */}
      {isWithdrawn && (
        <p className="mt-4 text-green-400 text-sm animate-pulse">
          Withdrawal confirmed on-chain!
        </p>
      )}
    </div>
  );
};

export default WithdrawalForm;
