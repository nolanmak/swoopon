import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import LiquidityPool from './pages/lpool';
import Navbar from './components/Navbar';

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  // Check if wallet is already connected on component mount
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  // Function to check if wallet is connected
  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;
      
      if (!ethereum) {
        console.log("Make sure you have MetaMask installed!");
        return;
      }
      
      // Check if we're authorized to access the user's wallet
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setWalletAddress(account);
        setIsConnected(true);
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Function to connect wallet
  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      
      if (!ethereum) {
        alert("Please install MetaMask!");
        return;
      }

      // Prevent multiple simultaneous connection attempts
      if (isConnected) {
        console.log("Wallet already connected");
        return;
      }
      
      // Set a loading state to prevent multiple clicks
      setIsConnected(true);
      
      try {
        // Request account access
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        
        console.log("Connected:", accounts[0]);
        setWalletAddress(accounts[0]);
      } catch (error) {
        // If connection fails, reset the connection state
        setIsConnected(false);
        throw error;
      }
    } catch (error) {
      console.error("Error connecting to wallet:", error);
      alert("Failed to connect wallet. Please try again.");
    }
  };

  return (
    <div className="app">
      <Navbar 
        isConnected={isConnected} 
        walletAddress={walletAddress} 
        connectWallet={connectWallet} 
      />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home 
            isConnected={isConnected} 
            walletAddress={walletAddress} 
            connectWallet={connectWallet} 
          />} />
          <Route 
            path="/dashboard" 
            element={
              <Dashboard 
                isConnected={isConnected} 
                walletAddress={walletAddress} 
                connectWallet={connectWallet}
              />
            } 
          />
          <Route 
            path="/liquidity" 
            element={
              <LiquidityPool 
                isConnected={isConnected} 
                walletAddress={walletAddress}
              />
            } 
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
