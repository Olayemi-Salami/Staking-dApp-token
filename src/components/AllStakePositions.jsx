import React from 'react';
import { useContractRead } from 'wagmi';
import { ethers } from 'ethers';
import { stakingContractConfig } from '../constants';

const AllStakePositions = () => {
  const { data: stakes } = useContractRead({
    ...stakingContractConfig,
    functionName: "getAllStakes",
    watch: true,
  });

  return (
    <div className="bg-gradient-to-br from-indigo-950 to-purple-900 p-6 rounded-2xl shadow-lg shadow-cyan-500/20">
      <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
        All Stake Positions
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-white/90">
          <thead className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white uppercase text-xs">
            <tr>
              <th className="py-3 px-4">Staker</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Unlock Time</th>
            </tr>
          </thead>
          <tbody>
            {stakes &&
              stakes.map((stake, index) => (
                <tr
                  key={index}
                  className="border-b border-white/10 hover:bg-white/5 transition"
                >
                  <td className="py-3 px-4 font-mono text-xs">{stake.staker}</td>
                  <td className="py-3 px-4">{ethers.formatUnits(stake.amount, 18)}</td>
                  <td className="py-3 px-4">
                    {new Date(Number(stake.unlockTime) * 1000).toLocaleString()}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AllStakePositions;