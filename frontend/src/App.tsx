import Header from "@/components/Header";
import { ApproveButton } from "@/components/buttons/ApproveButton";
import { StakeButton } from "@/components/buttons/StakeButton";
import { WithdrawButton } from "@/components/buttons/WithdrawButton";
import { ClaimButton } from "@/components/buttons/ClaimButton";
import { EmergencyWithdrawButton } from "@/components/buttons/EmergencyWithdrawButton";
import UserDashboard from "@/components/UserDashboard";
import ProtocolStats from "@/components/ProtocolStats";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="p-6 space-y-6">
        <ProtocolStats />
        <UserDashboard />
        <div className="space-y-3">
          <ApproveButton />
          <StakeButton />
          <WithdrawButton />
          <ClaimButton />
          <EmergencyWithdrawButton />
        </div>
      </main>
      {/* This renders all toasts */}
      <Toaster position="top-right" />
    </div>
  );
}
