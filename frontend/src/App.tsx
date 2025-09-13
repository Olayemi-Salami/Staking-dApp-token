import Header from "@/components/Header";
import UserDashboard from "@/components/UserDashboard";
import ProtocolStats from "@/components/ProtocolStats";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import Actions from "./components/Actions";
import Footer from "./components/Footer"; // Import the Footer component

export default function App() {
  const [refreshIndex, setRefreshIndex] = useState(0);

  const refetch = () => setRefreshIndex((prev) => prev + 1);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="p-6 space-y-6 flex-grow">
        <ProtocolStats />
        <UserDashboard key={refreshIndex} />
        <Actions refetch={refetch} />
      </main>
      {/* This renders all toasts */}
      <Toaster position="top-right" />
      <Footer />
    </div>
  );
}