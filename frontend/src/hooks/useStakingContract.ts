import { usePublicClient } from 'wagmi'
import { useWriteContract, useReadContract, useAccount, useBalance, useReadContracts } from 'wagmi'
import { formatEther, parseEther } from 'viem'
import toast from 'react-hot-toast'
import { stakingAbi, STAKING_CONTRACT_ADDRESS, STAKING_TOKEN_ADDRESS } from '../abi'
import { erc20Abi } from 'viem'

export function useStakingContract() {
  const { address } = useAccount()
  const { data: tokenBalance } = useBalance({ address, token: STAKING_TOKEN_ADDRESS, query: { enabled: !!address } })
  const formattedBalance = tokenBalance ? formatEther(tokenBalance.value) : '0'

  // Allowance check
  const { data: allowanceData } = useReadContracts({
    contracts: [
      {
        address: STAKING_TOKEN_ADDRESS,
        abi: erc20Abi,
        functionName: 'allowance',
        args: [address!, STAKING_CONTRACT_ADDRESS],
      },
    ],
    query: { enabled: !!address },
  })
  const allowance = allowanceData?.result ? formatEther(allowanceData.result as bigint) : '0'

  const { writeContract, isPending: isWriting, error: writeError } = useWriteContract()

  // Reads (same as before)
  const { data: userStakeData } = useReadContract({
    address: STAKING_CONTRACT_ADDRESS,
    abi: stakingAbi,
    functionName: 'userStakes',
    args: [address!],
    query: { enabled: !!address, staleTime: 5000 },
  })
  const userStake = userStakeData ? { amount: formatEther(userStakeData[0] as bigint), unlockTime: Number(userStakeData[1]) } : null

  const { data: pendingRewards } = useReadContract({
    address: STAKING_CONTRACT_ADDRESS,
    abi: stakingAbi,
    functionName: 'pendingRewards',
    args: [address!],
    query: { enabled: !!address, staleTime: 5000 },
  })
  const formattedRewards = pendingRewards ? formatEther(pendingRewards as bigint) : '0'

  const { data: totalStaked } = useReadContract({
    address: STAKING_CONTRACT_ADDRESS,
    abi: stakingAbi,
    functionName: 'totalStaked',
    query: { staleTime: 10000 },
  })
  const formattedTotalStaked = totalStaked ? formatEther(totalStaked as bigint) : '0'

  const { data: rewardRate } = useReadContract({
    address: STAKING_CONTRACT_ADDRESS,
    abi: stakingAbi,
    functionName: 'rewardRate',
    query: { staleTime: 10000 },
  })
  const formattedRewardRate = rewardRate ? formatEther(rewardRate as bigint) : '0'

  const { data: apr } = useReadContract({
    address: STAKING_CONTRACT_ADDRESS,
    abi: stakingAbi,
    functionName: 'apr',
    query: { staleTime: 10000 },
  })
  const formattedApr = apr ? `${Number(formatEther(apr as bigint))}%` : '0%'

  // Approve
  const approveStakingToken = async (amount: string) => {
    if (parseFloat(amount) > parseFloat(formattedBalance)) {
      toast.error('Insufficient balance')
      return
    }
    const value = parseEther(amount)
    await writeContract({
      address: STAKING_TOKEN_ADDRESS,
      abi: erc20Abi,
      functionName: 'approve',
      args: [STAKING_CONTRACT_ADDRESS, value],
    })
    toast.success('Approval confirmed!')
  }

  // Stake (with auto-approve if needed)
  const stake = async (amount: string) => {
    if (parseFloat(amount) > parseFloat(allowance)) {
      await approveStakingToken(amount)
    }
    const value = parseEther(amount)
    await writeContract({
      address: STAKING_CONTRACT_ADDRESS,
      abi: stakingAbi,
      functionName: 'stake',
      args: [value],
    })
    toast.success('Staked successfully!')
  }

  const withdraw = async (amount: string) => {
    const value = parseEther(amount)
    await writeContract({
      address: STAKING_CONTRACT_ADDRESS,
      abi: stakingAbi,
      functionName: 'withdraw',
      args: [value],
    })
    toast.success('Withdrawn successfully!')
  }

  const claimRewards = async () => {
    await writeContract({
      address: STAKING_CONTRACT_ADDRESS,
      abi: stakingAbi,
      functionName: 'claimRewards',
    })
    toast.success('Rewards claimed!')
  }

  const emergencyWithdraw = async () => {
    await writeContract({
      address: STAKING_CONTRACT_ADDRESS,
      abi: stakingAbi,
      functionName: 'emergencyWithdraw',
    })
    toast.success('Emergency withdrawal executed!')
  }

  const timeUntilUnlock = userStake?.unlockTime ? Math.max(0, userStake.unlockTime - Math.floor(Date.now() / 1000)) : 0
  const unlockTimeStr = timeUntilUnlock > 0 ? `${Math.floor(timeUntilUnlock / 86400)}d ${Math.floor((timeUntilUnlock % 86400) / 3600)}h` : 'Unlocked'

  if (writeError) toast.error(`Transaction failed: ${writeError.message}`)

  return {
    userStake,
    formattedRewards,
    formattedTotalStaked,
    formattedRewardRate,
    formattedApr,
    timeUntilUnlock: unlockTimeStr,
    formattedBalance,
    allowance,
    stake,
    withdraw,
    claimRewards,
    emergencyWithdraw,
    isWriting,
  }
}