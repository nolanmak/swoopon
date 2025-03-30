import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Swap.css';

const Swap = ({ isDarkMode, walletAddress }) => {
  const [fromToken, setFromToken] = useState('ETH');
  const [toToken, setToToken] = useState('WBTC');
  const [amount, setAmount] = useState('');
  const [isSwapping, setIsSwapping] = useState(false);
  const [error, setError] = useState('');
  const [rate, setRate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [balances, setBalances] = useState({
    ETH: '0.0',
    WBTC: '0.0'
  });
  const navigate = useNavigate();

  // Mock wallet address for testing - in a real app, this would come from props or context
  const userWallet = walletAddress;
  console.log(userWallet)

  // Fetch token balances from user's wallet
  useEffect(() => {
    const fetchBalances = async () => {
      try {
        // Fetch ETH balance
        const ethResponse = await fetch(`/api/balance/${userWallet}`);
        if (!ethResponse.ok) {
          throw new Error('Failed to fetch ETH balance');
        }
        const ethData = await ethResponse.json();
        console.log(ethData);
        
        // Fetch token balances
        const tokensResponse = await fetch(`/api/tokens/${userWallet}`);
        if (!tokensResponse.ok) {
          throw new Error('Failed to fetch token balances');
        }
        const tokensData = await tokensResponse.json();
        
        // Find WBTC in token list
        const wbtcToken = tokensData.tokens?.find(token => 
          token.symbol?.toLowerCase() === 'wbtc' || 
          token.name?.toLowerCase().includes('bitcoin')
        );
        
        const wbtcBalance = wbtcToken 
          ? (parseFloat(wbtcToken.balance) / Math.pow(10, wbtcToken.decimals)).toFixed(8)
          : '0.0';
        
        setBalances({
          ETH: ethData.balance || '0.0',
          WBTC: wbtcBalance
        });
      } catch (error) {
        console.error('Error fetching balances:', error);
        // Keep existing balances or set fallbacks
      }
    };

    fetchBalances();
  }, [userWallet]);

  // Fetch exchange rate on component mount or when tokens change
  useEffect(() => {
    const fetchExchangeRate = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/exchange-rate?fromToken=${fromToken}&toToken=${toToken}`);
        if (!response.ok) {
          throw new Error('Failed to fetch exchange rate');
        }
        const data = await response.json();
        setRate(data.rate);
      } catch (error) {
        console.error('Error fetching exchange rate:', error);
        setError('Failed to fetch exchange rate. Using fallback values.');
        // Fallback rate (roughly ETH to WBTC as of early 2025)
        setRate(fromToken === 'ETH' ? 0.056 : 17.8);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExchangeRate();
  }, [fromToken, toToken]);

  // Switch the from and to tokens
  const handleSwitchTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
  };

  // Handle the swap action - redirect to dashboard instead of actual swap
  const handleSwap = async () => {
    if (!amount || parseFloat(amount) <= 0) return;
    
    setIsSwapping(true);
    setError('');
    
    try {
      // Log the swap attempt to the server for analytics
      const response = await fetch('/api/log-swap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fromToken,
          toToken,
          amount: parseFloat(amount),
          userAddress: userWallet
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to log swap');
      }
      
      const data = await response.json();
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirect to dashboard after successful "swap"
      navigate('/dashboard', { 
        state: { 
          swapCompleted: true,
          fromToken,
          toToken,
          amount,
          swouponsEarned: data.swouponsEarned || 1
        } 
      });
      
    } catch (error) {
      console.error('Swap error:', error);
      setError('Failed to process swap. Please try again.');
      setIsSwapping(false);
    }
  };

  // Calculate the estimated output amount
  const calculateOutputAmount = () => {
    if (!amount || !rate) return '';
    return (parseFloat(amount) * rate).toFixed(8);
  };

  // Get the current balance for a token
  const getBalance = (token) => {
    return balances[token] || '0.0';
  };

  return (
    <div className="swap-container">
      <div className="swap-header">
        <h3 className="swap-title">Swap</h3>
        <span className="swap-subtitle">Earn rewards with every swap</span>
      </div>
      
      {/* From Token */}
      <div className="swap-input-container">
        <div className="swap-input-header">
          <span>From</span>
          <span className="swap-balance">Balance: {getBalance(fromToken)} {fromToken}</span>
        </div>
        <div className="swap-input-group">
          <input 
            type="number" 
            placeholder="0.0" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)}
            className="swap-input"
          />
          <button className="swap-token-selector">
            <img src={`/icons/${fromToken.toLowerCase()}.svg`} alt={fromToken} className="swap-token-icon" />
            <span>{fromToken}</span>
          </button>
        </div>
      </div>
      
      {/* Switch Button */}
      <button className="swap-switch-button" onClick={handleSwitchTokens}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <polyline points="19 12 12 19 5 12"></polyline>
        </svg>
      </button>
      
      {/* To Token */}
      <div className="swap-input-container">
        <div className="swap-input-header">
          <span>To</span>
          <span className="swap-balance">Balance: {getBalance(toToken)} {toToken}</span>
        </div>
        <div className="swap-input-group">
          <input 
            type="number" 
            placeholder="0.0" 
            value={isLoading ? 'Loading...' : calculateOutputAmount()} 
            disabled 
            className="swap-input"
          />
          <button className="swap-token-selector">
            <img src={`/icons/${toToken.toLowerCase()}.svg`} alt={toToken} className="swap-token-icon" />
            <span>{toToken}</span>
          </button>
        </div>
      </div>
      
      {/* Swap rates */}
      <div className="swap-rate">
        {isLoading ? (
          <span>Loading exchange rate...</span>
        ) : (
          <span>1 {fromToken} = {rate ? rate.toFixed(8) : '?'} {toToken}</span>
        )}
        <span>Earn 1 Swoupon for this swap</span>
      </div>
      
      {/* Error message */}
      {error && (
        <div className="swap-error">
          {error}
        </div>
      )}
      
      {/* Swap Button */}
      <button 
        className={`swap-button ${isSwapping ? 'swapping' : ''} ${!amount || parseFloat(amount) <= 0 || isLoading ? 'disabled' : ''}`}
        onClick={handleSwap}
        disabled={!amount || parseFloat(amount) <= 0 || isSwapping || isLoading}
      >
        {isSwapping ? (
          <div className="swap-loading">
            <div className="swap-spinner"></div>
            <span>Swapping...</span>
          </div>
        ) : isLoading ? (
          <span>Loading exchange rate...</span>
        ) : (
          <span>Swap</span>
        )}
      </button>
    </div>
  );
};

export default Swap;
