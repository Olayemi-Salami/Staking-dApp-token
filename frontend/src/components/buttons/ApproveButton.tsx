"use client"

import { useState } from "react"
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { toast } from "react-hot-toast"
import { stakingTokenAbi, STAKING_TOKEN_ADDRESS, STAKING_CONTRACT_ADDRESS } from "@/config/contracts"

export function ApproveButton({ amount, refetch }: { amount: string, refetch?: () => void }) {
  const { data: hash, writeContract, isPending } = useWriteContract()
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash })

  const handleApprove = async () => {
    if (!amount || Number(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    try {
      await writeContract({
        abi: stakingTokenAbi,
        address: STAKING_TOKEN_ADDRESS,
        functionName: "approve",
        args: [STAKING_CONTRACT_ADDRESS, BigInt(amount) * 10n ** 18n],
      })
      toast.success("Approval transaction submitted")
      refetch?.()
    } catch (err) {
      console.error(err)
      toast.error("Approval failed")
    }
  }

  return (
    <button
      onClick={handleApprove}
      disabled={isPending || isConfirming}
      className={`px-6 py-2 rounded-lg font-semibold transition ${
        isPending || isConfirming
          ? "bg-gray-500 text-gray-200 cursor-not-allowed"
          : "bg-yellow-400 text-black hover:bg-yellow-300"
      }`}
    >
      {isPending || isConfirming ? "Approving..." : "Approve"}
    </button>
  )
}