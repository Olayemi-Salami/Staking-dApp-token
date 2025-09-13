"use client";

import { useState } from "react";
import { ApproveButton } from "./buttons/ApproveButton";
import { StakeButton } from "./buttons/StakeButton";
import { ClaimButton } from "./buttons/ClaimButton";
import { EmergencyWithdrawButton } from "./buttons/EmergencyWithdrawButton";

export default function Actions({ refetch }: { refetch: () => void }) {
  const [approveAmount, setApproveAmount] = useState("");
  const [stakeAmount, setStakeAmount] = useState("");
  const [claimAmount, setClaimAmount] = useState("");
  const [emergencyWithdrawAmount, setEmergencyWithdrawAmount] = useState("");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Approve Tokens</h3>
        <div className="flex w-full gap-3 items-center">
          <input
            type="number"
            placeholder="Enter amount"
            value={approveAmount}
            onChange={(e) => setApproveAmount(e.target.value)}
            className="flex-1 bg-gray-100 border border-gray-300 text-black rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-500"
          />
          <ApproveButton amount={approveAmount} refetch={refetch} />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Stake Tokens</h3>
        <div className="flex w-full gap-3 items-center">
          <input
            type="number"
            placeholder="Enter amount"
            value={stakeAmount}
            onChange={(e) => setStakeAmount(e.target.value)}
            className="flex-1 bg-gray-100 border border-gray-300 text-black rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-500"
          />
          <StakeButton amount={stakeAmount} refetch={refetch} />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Claim Rewards</h3>
        <div className="flex w-full gap-3 items-center">
          <input
            type="number"
            placeholder="Enter amount"
            value={claimAmount}
            onChange={(e) => setClaimAmount(e.target.value)}
            className="flex-1 bg-gray-100 border border-gray-300 text-black rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-500"
          />
          <ClaimButton amount={claimAmount} refetch={refetch} />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Emergency Withdraw</h3>
        <div className="flex w-full gap-3 items-center">
          <input
            type="number"
            placeholder="Enter amount"
            value={emergencyWithdrawAmount}
            onChange={(e) => setEmergencyWithdrawAmount(e.target.value)}
            className="flex-1 bg-gray-100 border border-gray-300 text-black rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 placeholder-gray-500"
          />
          <EmergencyWithdrawButton amount={emergencyWithdrawAmount} refetch={refetch} />
        </div>
      </div>
    </div>
  );
}