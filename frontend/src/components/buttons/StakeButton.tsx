"use client"

import { useState } from "react"
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { toast } from "react-hot-toast"
import { stakingAbi, STAKING_CONTRACT_ADDRESS } from "@/config/contracts"

export function StakeButton({ refetch }: { refetch?: () => void }) {
  const [amount, setAmount] = useState("")
  const { data: hash, writeContract, isPending } = useWriteContract()
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash })

  const handleStake = async () => {
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
      toast.error("Stake failed")
    }
  }

  return (
    <div className="flex w-full gap-3 items-center">
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="flex-1 bg-purple-800/40 border border-purple-500 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-400"
      />
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
    </div>
  )
}
