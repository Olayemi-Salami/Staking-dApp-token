"use client"

import { useState } from "react"
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { toast } from "react-hot-toast"
import { stakingAbi, STAKING_CONTRACT_ADDRESS } from "@/config/contracts"

export function StakeButton({ amount, refetch }: { amount: string, refetch?: () => void }) {
  const { data: hash, writeContract, isPending } = useWriteContract()
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash })

  const handleStake = async () => {
    if (!amount || Number(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    try {
      await writeContract({
        abi: stakingAbi,
        address: STAKING_CONTRACT_ADDRESS,
        functionName: "stake",
        args: [BigInt(amount) * 10n ** 18n], // assumes 18 decimals
      })
      toast.success("Stake submitted")
      refetch?.()
    } catch (err) {
      console.error(err)
      toast.error("Stake failed")
    }
  }

  return (
    <button
      onClick={handleStake}
      disabled={isPending || isConfirming}
      className={`px-6 py-2 rounded-lg font-semibold text-white transition ${
        isPending || isConfirming
          ? "bg-gray-500 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-500"
      }`}
    >
      {isPending || isConfirming ? "Staking..." : "Stake"}
    </button>
  )
}