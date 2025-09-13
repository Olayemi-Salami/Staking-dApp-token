"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useBalance } from "wagmi";
import { STAKING_TOKEN_ADDRESS } from "@/config/contracts";

export default function Header() {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({
    address,
    token: STAKING_TOKEN_ADDRESS, 
    watch: true,
  });

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b bg-white dark:bg-gray-900 shadow-md">
      {/* Logo / Title */}
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        StakingVault
      </h1>

      {/* Wallet Info + Connect */}
      <div className="flex items-center gap-6">
        {isConnected && (
          <div className="text-sm text-right">
            <p className="text-gray-500 dark:text-gray-400 text-xs">Address</p>
            <p className="font-mono text-gray-800 dark:text-gray-200 truncate w-32">
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </p>

            <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
              Balance
            </p>
            <p className="font-semibold text-gray-900 dark:text-gray-100">
              {balance?.formatted ?? "0.0"} {balance?.symbol ?? "USDC"}
            </p>
          </div>
        )}

        {/* Wallet Connect Button */}
        <div className="shrink-0">
          <ConnectButton />
        </div>
      </div>
    </header>
  );
}
