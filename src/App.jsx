import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import StakeForm from './components/StakeForm';
import WithdrawalForm from './components/WithdrawalForm';
import Rewards from './components/Rewards';
import EmergencyWithdraw from './components/EmergencyWithdraw';
import AllStakePositions from './components/AllStakePositions';
import UserStakePositions from './components/UserStakePositions';

import StakeDetails from './components/StakeDetails';

function App() {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col font-orbitron">
      <Header />
      <main className="container mx-auto p-4 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <StakeForm />
            <StakeDetails />
            <WithdrawalForm />
            <Rewards />
            <EmergencyWithdraw />
          </div>
          <div className="lg:col-span-2 space-y-6">
            <UserStakePositions />
            <AllStakePositions />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;