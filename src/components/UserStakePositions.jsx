import React from 'react';
import { useAccount, useContractRead } from 'wagmi';
import { ethers } from 'ethers';
import { stakingContractConfig } from '../constants';

const UserStakePositions = () => {
  const { address } = useAccount();
  const { data: userStakes } = useContractRead({
    ...stakingContractConfig,
    functionName: 'getStakes',
    args: [address],
    watch: true,
  });

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Your Stake Positions</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-700 text-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Amount</th>
              <th className="py-2 px-4 border-b">Unlock Time</th>
            </tr>
          </thead>
          <tbody>
            {userStakes && userStakes.map((stake, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{ethers.formatUnits(stake.amount, 18)}</td>
                <td className="py-2 px-4 border-b">{new Date(Number(stake.unlockTime) * 1000).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserStakePositions;
