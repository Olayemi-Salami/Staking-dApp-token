"use client"

import { useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { toast } from "react-hot-toast"
import { stakingAbi, STAKING_CONTRACT_ADDRESS } from "@/config/contracts"

export function ClaimButton({ refetch }: { refetch?: () => void }) {
  const { data: hash, writeContract, isPending } = useWriteContract()
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash })

  const handleClaim = async () => {
    try {
      await writeContract({
        abi: stakingAbi,
        address: STAKING_CONTRACT_ADDRESS,
        functionName: "claimRewards",
      })
      toast.success("Rewards claimed")
      refetch?.()
    } catch (err) {
      toast.error("Claim failed")
    }
  }

  return (
    <button
      disabled={isPending || isConfirming}
      onClick={handleClaim}
      className={`w-full px-6 py-2 rounded-lg font-semibold transition ${
        isPending || isConfirming
          ? "bg-gray-500 text-gray-200 cursor-not-allowed"
          : "bg-green-500 text-white hover:bg-green-400"
      }`}
    >
      {isPending || isConfirming ? "Claiming..." : "Claim Rewards"}
    </button>
  )
}
