"use client"

import { useReadContract } from "wagmi"
import { stakingAbi, STAKING_CONTRACT_ADDRESS } from "@/config/contracts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { formatUnits } from "viem"

export default function ProtocolStats() {
  const [refreshIndex, setRefreshIndex] = useState(0)
  const refetch = () => setRefreshIndex((prev) => prev + 1)

  const { data: totalStaked } = useReadContract({
    abi: stakingAbi,
    address: STAKING_CONTRACT_ADDRESS,
    functionName: "totalStaked",
    watch: true,
    query: { queryKey: ["totalStaked", refreshIndex], staleTime: 0 },
  })

  const { data: rewardRate } = useReadContract({
    abi: stakingAbi,
    address: STAKING_CONTRACT_ADDRESS,
    functionName: "currentRewardRate",
    watch: true,
    query: { queryKey: ["rewardRate", refreshIndex], staleTime: 0 },
  })

  const { data: apr } = useReadContract({
    abi: stakingAbi,
    address: STAKING_CONTRACT_ADDRESS,
    functionName: "initialApr",
    watch: true,
    query: { queryKey: ["apr", refreshIndex], staleTime: 0 },
  })

  return (
    <Card className="bg-gray-900 text-white shadow-lg">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-white">Protocol Statistics</CardTitle>
        <button
          onClick={refetch}
          className="text-xs px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white transition-colors"
        >
          Refresh
        </button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded bg-gray-800 hover:bg-gray-700 transition-colors">
            <p className="text-xs text-gray-300">Total Staked</p>
            <p className="text-lg font-bold text-white">
              {totalStaked ? formatUnits(totalStaked, 6) : "…"} USDC
            </p>
          </div>
          <div className="p-4 rounded bg-gray-800 hover:bg-gray-700 transition-colors">
            <p className="text-xs text-gray-300">Reward Rate</p>
            <p className="text-lg font-bold text-white">{rewardRate?.toString() ?? "…"}%</p>
          </div>
          <div className="p-4 rounded bg-gray-800 hover:bg-gray-700 transition-colors">
            <p className="text-xs text-gray-300">Initial APR</p>
            <p className="text-lg font-bold text-white">{apr?.toString() ?? "…"}%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
