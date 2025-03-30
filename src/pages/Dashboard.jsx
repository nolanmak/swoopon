import { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = ({ isConnected, walletAddress, connectWallet }) => {
  const [nativeBalance, setNativeBalance] = useState(null);
  const [tokenBalances, setTokenBalances] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // API base URL - points to our local server
  const API_BASE_URL = 'http://localhost:5001/api';

  useEffect(() => {
    // Fetch blockchain data when wallet is connect
    if (isConnected && walletAddress) {
      fetchWalletData();
    }
  }, [isConnected, walletAddress]);

  const fetchWalletData = async () => {
    if (!walletAddress) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Fetch native balance and token balances in parallel using our server API
      const [balanceResponse, tokensResponse] = await Promise.all([
        axios.get(`${API_BASE_URL}/balance/${walletAddress}`),
        axios.get(`${API_BASE_URL}/tokens/${walletAddress}`)
      ]);

      // Set state with fetched data
      setNativeBalance(balanceResponse.data.balance);
      setTokenBalances(tokensResponse.data.tokens);
    } catch (error) {
      console.error("Error fetching wallet data:", error);
      setError("Failed to fetch blockchain data. Please make sure the server is running.");
    } finally {
      setIsLoading(false);
    }
  };

  // If wallet is not connected, show connect prompt
  if (!isConnected) {
    return (
      <div className="container py-12">
        <div className="card text-center p-8 my-8">
          <div className="w-16 h-16 rounded-full bg-uniswap-pink bg-opacity-10 flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FC72FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
          <h2 className="mb-4">Connect Your Wallet</h2>
          <p className="text-uniswap-light-text-secondary dark:text-uniswap-dark-text-secondary mb-6">Please connect your wallet to view your dashboard.</p>
          <button 
            className="btn btn-gradient mx-auto"
            onClick={connectWallet}
          >
            Connect Wallet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <h1 className="bg-clip-text text-transparent bg-uniswap-gradient mb-8">Your Dashboard</h1>
      
      <div className="card wallet-overview">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-uniswap-blue bg-opacity-10 flex items-center justify-center mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4C82FB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path>
              <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path>
              <path d="M18 12H9"></path>
            </svg>
          </div>
          <h2 className="m-0">Wallet Overview</h2>
        </div>
        <p className="wallet-address-full">Address: {walletAddress}</p>
        {isLoading ? (
          <div className="flex items-center justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-uniswap-pink"></div>
          </div>
        ) : (
          <div className="mt-4">
            <div>
              <h3 className="m-0">Native Balance</h3>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-3">
                  <span className="text-sm font-bold">Ξ</span>
                </div>
                <p className="text-2xl font-bold text-uniswap-pink">{nativeBalance} ETH</p>
              </div>
            </div>
          </div>
        )}
      </div>
      

      
      <div className="mb-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-uniswap-pink"></div>
          </div>
        ) : error ? (
          <div className="card border-uniswap-red bg-red-50 dark:bg-red-900/20 mb-6">
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mr-3 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF5E69" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>
              <div>
                <p className="font-medium text-uniswap-red mb-2">{error}</p>
                <p className="mb-2 text-uniswap-light-text-secondary dark:text-uniswap-dark-text-secondary">Make sure to:</p>
                <ul className="list-disc pl-5 text-uniswap-light-text-secondary dark:text-uniswap-dark-text-secondary">
                  <li>Start the server with <code className="bg-red-100 dark:bg-red-900/30 px-1.5 py-0.5 rounded text-sm">node server.js</code></li>
                  <li>Set your Moralis API key in server.js</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full bg-uniswap-blue bg-opacity-10 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4C82FB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 6v6l4 2"></path>
                </svg>
              </div>
              <h2 className="m-0">Your Tokens</h2>
            </div>
            {tokenBalances.length > 0 ? (
              <div className="space-y-3">
                {tokenBalances.map((token, index) => (
                  <div key={index} className="token-card">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-3">
                        <span className="text-xs font-bold">{token.symbol?.charAt(0) || '?'}</span>
                      </div>
                      <div>
                        <h3 className="text-base font-semibold m-0">{token.name || 'Unknown Token'}</h3>
                        <p className="text-uniswap-light-text-secondary dark:text-uniswap-dark-text-secondary text-sm">{token.symbol}</p>
                      </div>
                    </div>
                    <div className="font-bold text-lg">
                      {(token.balance / (10 ** token.decimals)).toFixed(6)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="card text-center py-12">
                <p className="text-uniswap-light-text-secondary dark:text-uniswap-dark-text-secondary">No token balances found.</p>
              </div>
            )}
          </div>

        )}
      </div>
      
      <button 
        className="btn btn-gradient flex items-center justify-center"
        onClick={fetchWalletData}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
            Loading...
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M21 2v6h-6"></path>
              <path d="M3 12a9 9 0 0 1 15-6.7l3-3"></path>
              <path d="M3 12a9 9 0 0 0 15 6.7l3 3"></path>
              <path d="M21 22v-6h-6"></path>
            </svg>
            Refresh Data
          </>
        )}
      </button>
    </div>
  );
};

export default Dashboard;
