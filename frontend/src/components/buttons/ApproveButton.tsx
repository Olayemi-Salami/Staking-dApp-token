"use client"

import { useState } from "react"
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { toast } from "react-hot-toast"
import { stakingTokenAbi, STAKING_TOKEN_ADDRESS, STAKING_CONTRACT_ADDRESS } from "@/config/contracts"

export function ApproveButton({ refetch }: { refetch?: () => void }) {
  const [amount, setAmount] = useState("")
  const { data: hash, writeContract, isPending } = useWriteContract()
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash })

  const handleApprove = async () => {
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
      toast.error("Approval failed")
    }
  }

  return (
    <div className="flex w-full gap-3 items-center">
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="flex-1 bg-purple-800/40 border border-purple-500 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-400"
      />
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
    </div>
  )
}
