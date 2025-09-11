import React from 'react';
import WalletConnect from './WalletConnect';

const Header = () => {
  return (
    <header className="flex justify-between items-center py-4 px-6 bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-950 shadow-lg rounded-xl mb-6">
      <h1 className="text-2xl md:text-3xl font-bold font-orbitron bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
        StakedApp
      </h1>
      <WalletConnect />
    </header>
  );
};

export default Header;