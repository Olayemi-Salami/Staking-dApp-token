"use client";

import { useState } from "react";
import { parseUnits } from "viem";
import { stakingContract } from "@/config/contract";
import { useStaking } from "@/hooks/useStaking";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "react-hot-toast";

export default function StakeForm() {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const { approveToken, stake } = useStaking();

  async function handleStake() {
    if (!amount || Number(amount) <= 0) {
      toast.error("Enter a valid amount");
      return;
    }

    try {
      setLoading(true);
      const value = parseUnits(amount, 18); // change 18 to your token decimals
      await approveToken(value);
      await stake({
        ...stakingContract,
        functionName: "stake",
        args: [value],
      });
      toast.success("Stake successful!");
      setAmount("");
    } catch (error) {
      console.error(error);
      toast.error("Stake failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stake Tokens</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <Button
          onClick={handleStake}
          disabled={loading}
          className="w-full"
        >
          {loading ? "Processing..." : "Approve & Stake"}
        </Button>
      </CardContent>
    </Card>
  );
}
