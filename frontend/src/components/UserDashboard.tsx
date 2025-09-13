"use client"

import { useAccount, useReadContract } from "wagmi"
import { stakingAbi, STAKING_CONTRACT_ADDRESS } from "@/config/contracts"
import { ApproveButton } from "@/components/buttons/ApproveButton"
import { StakeButton } from "@/components/buttons/StakeButton"
// import { WithdrawButton } from "@/components/buttons/WithdrawButton"
import { ClaimButton } from "@/components/buttons/ClaimButton"
import { EmergencyWithdrawButton } from "@/components/buttons/EmergencyWithdrawButton"
import { useState } from "react"

export default function UserDashboard() {
  const { address } = useAccount()
  const [refreshIndex, setRefreshIndex] = useState(0)

  const refetch = () => setRefreshIndex((prev) => prev + 1)

  const { data: userDetails } = useReadContract({
    abi: stakingAbi,
    address: STAKING_CONTRACT_ADDRESS,
    functionName: "getUserDetails",
    args: [address!],
    watch: true,
    query: {
      enabled: !!address,
      staleTime: 0,
      cacheTime: 0,
      refetchInterval: 10000,
      queryKey: ["user", address, refreshIndex],
    },
  })

  if (!address) {
    return (
      <div className="bg-gradient-to-br from-purple-800 via-purple-900 to-black rounded-2xl shadow-lg p-6 text-center text-white">
        <h2 className="text-2xl font-bold mb-2">User Dashboard</h2>
        <p className="text-gray-300">Please connect your wallet to view your staking details.</p>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-purple-800 via-purple-900 to-black rounded-2xl shadow-lg p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">Your Staking Position</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-purple-700/40 p-4 rounded-xl">
          <p className="text-sm text-gray-300">Staked Amount</p>
          <p className="text-xl font-semibold">
            {userDetails?.stakedAmount?.toString() ?? "0"} TOKEN
          </p>
        </div>
        <div className="bg-purple-700/40 p-4 rounded-xl">
          <p className="text-sm text-gray-300">Pending Rewards</p>
          <p className="text-xl font-semibold">
            {userDetails?.pendingRewards?.toString() ?? "0"} TOKEN
          </p>
        </div>
        <div className="bg-purple-700/40 p-4 rounded-xl">
          <p className="text-sm text-gray-300">Time Until Unlock</p>
          <p className="text-xl font-semibold">
            {userDetails?.timeUntilUnlock?.toString() ?? "0"} sec
          </p>
        </div>
        <div className="bg-purple-700/40 p-4 rounded-xl">
          <p className="text-sm text-gray-300">Withdrawable</p>
          <p className="text-xl font-semibold">
            {userDetails?.canWithdraw ? "Yes" : "No"}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <ApproveButton refetch={refetch} />
        <StakeButton refetch={refetch} />
        {/* <WithdrawButton refetch={refetch} /> */}
        <ClaimButton refetch={refetch} />
        <EmergencyWithdrawButton refetch={refetch} />
      </div>
    </div>
  )
}
