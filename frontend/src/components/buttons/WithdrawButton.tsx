// "use client"

// import { useState } from "react"
// import { useWriteContract, useWaitForTransactionReceipt } from "wagmi"
// import { toast } from "react-hot-toast"
// import { stakingAbi, STAKING_CONTRACT_ADDRESS } from "@/config/contracts"

// export function WithdrawButton({ refetch }: { refetch?: () => void }) {
//   const [amount, setAmount] = useState("")
//   const { data: hash, writeContract, isPending } = useWriteContract()
//   const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash })

//   const handleWithdraw = async () => {
//     try {
//       await writeContract({
//         abi: stakingAbi,
//         address: STAKING_CONTRACT_ADDRESS,
//         functionName: "withdraw",
//         args: [BigInt(amount) * 10n ** 18n], // assumes 18 decimals
//       })
//       toast.success("Withdrawal submitted")
//       refetch?.()
//     } catch (err) {
//       toast.error("Withdrawal failed")
//     }
//   }

//   return (
//     <div className="flex gap-2 w-full">
//       <input
//         type="number"
//         placeholder="Amount"
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//         className="flex-1 border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
//       />
//       <button
//         disabled={isPending || isConfirming}
//         onClick={handleWithdraw}
//         className={`px-6 py-2 rounded-lg font-semibold transition ${
//           isPending || isConfirming
//             ? "bg-gray-500 text-gray-200 cursor-not-allowed"
//             : "bg-blue-600 text-white hover:bg-blue-500"
//         }`}
//       >
//         {isPending || isConfirming ? "Withdrawing..." : "Withdraw"}
//       </button>
//     </div>
//   )
// }
