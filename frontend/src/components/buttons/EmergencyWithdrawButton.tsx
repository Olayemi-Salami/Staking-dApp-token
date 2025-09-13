"use client"

import { useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { toast } from "react-hot-toast"
import { stakingAbi, STAKING_CONTRACT_ADDRESS } from "@/config/contracts"

export function EmergencyWithdrawButton({ amount, refetch }: { amount: string, refetch?: () => void }) {
  const { data: hash, writeContract, isPending } = useWriteContract()
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash })

  const handleEmergencyWithdraw = async () => {
    if (!amount || Number(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    try {
      await writeContract({
        abi: stakingAbi,
        address: STAKING_CONTRACT_ADDRESS,
        functionName: "emergencyWithdraw",
        args: [BigInt(amount) * 10n ** 18n],
      })
      toast.success("Emergency withdrawal submitted")
      refetch?.()
    } catch (err) {
      toast.error("Emergency withdrawal failed")
    }
  }

  return (
    <button
      disabled={isPending || isConfirming}
      onClick={handleEmergencyWithdraw}
      className={`w-full px-6 py-2 rounded-lg font-semibold transition ${
        isPending || isConfirming
          ? "bg-gray-500 text-gray-200 cursor-not-allowed"
          : "bg-red-600 text-white hover:bg-red-500"
      }`}
    >
      {isPending || isConfirming ? "Processing..." : "Emergency Withdraw"}
    </button>
  )
}