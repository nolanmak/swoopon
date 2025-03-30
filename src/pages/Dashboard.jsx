import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import FloatingTokens from '../components/FloatingTokens';
import Swap from '../components/Swap';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './Dashboard.css';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = ({ isConnected, walletAddress, connectWallet }) => {
  const location = useLocation();
  const [nativeBalance, setNativeBalance] = useState(null);
  const [tokenBalances, setTokenBalances] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [swapInfo, setSwapInfo] = useState(null);
  const [swouponCount, setSwouponCount] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Liquidity Pool states
  const [timeFrame, setTimeFrame] = useState('1D');
  const [chartData, setChartData] = useState({
    labels: generateTimeLabels(24),
    datasets: [
      {
        label: 'Volume',
        data: generateRandomData(24, 5, 25),
        borderColor: '#FC72FF',
        backgroundColor: 'rgba(252, 114, 255, 0.2)',
        tension: 0.4,
        fill: true,
        pointRadius: 0,
        borderWidth: 4,
        pointHoverRadius: 0,
      },
    ],
  });

  // API base URL - points to our local server
  const API_BASE_URL = 'http://localhost:5001/api';

  useEffect(() => {
    // Check if redirected from swap with swap completion info
    if (location.state?.swapCompleted) {
      setSwapInfo(location.state);
      // Increment swoupon count when swap is completed
      setSwouponCount(prev => prev + location.state.swouponsEarned);
    }
    
    // Fetch blockchain data when wallet is connected
    if (isConnected && walletAddress) {
      fetchWalletData();
    }
  }, [isConnected, walletAddress, location.state]);

  // Check if dark mode is active
  useEffect(() => {
    const checkDarkMode = () => {
      if (document.documentElement.classList.contains('dark')) {
        setIsDarkMode(true);
      } else {
        setIsDarkMode(false);
      }
    };
    
    // Check initially
    checkDarkMode();
    
    // Create a mutation observer to watch for class changes on the html element
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          checkDarkMode();
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    return () => observer.disconnect();
  }, []);
  
  // Preload the background image
  useEffect(() => {
    const img = new Image();
    img.src = '/landscape.png';
    img.onload = () => {
      setImageLoaded(true);
    };
  }, []);

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
  
  // Generate time labels for chart
  function generateTimeLabels(count) {
    const labels = [];
    const now = new Date();
    now.setMinutes(0, 0, 0); // Round to current hour
    
    for (let i = 0; i < count; i++) {
      const time = new Date(now);
      time.setHours(time.getHours() - (count - i - 1));
      
      // Format time as "11:52 PM", "2:52 AM", etc.
      labels.push(time.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      }));
    }
    
    return labels;
  }

  // Generate random data for chart
  function generateRandomData(count, min, max) {
    return Array.from({ length: count }, () => 
      Math.floor(Math.random() * (max - min + 1)) + min
    );
  }
  
  // Generate date labels for chart (for timeframes other than 1D)
  function generateDateLabels(count, timeFrame) {
    const labels = [];
    const now = new Date();
    
    let format;
    let step;
    
    if (timeFrame === '1W') {
      format = { weekday: 'short' };
      step = 1; // days
    } else if (timeFrame === '1M') {
      format = { month: 'short', day: 'numeric' };
      step = 1; // days
    } else if (timeFrame === '1Y') {
      format = { month: 'short' };
      step = 1; // months
    } else { // 1H
      return generateTimeLabels(count);
    }
    
    for (let i = 0; i < count; i++) {
      const date = new Date(now);
      
      if (timeFrame === '1Y') {
        date.setMonth(date.getMonth() - (count - i - 1));
      } else {
        date.setDate(date.getDate() - (count - i - 1));
      }
      
      labels.push(date.toLocaleDateString('en-US', format));
    }
    
    return labels;
  }

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    backgroundColor: 'transparent',
    animation: {
      duration: 1000
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.7)',
        titleColor: isDarkMode ? '#fff' : '#333',
        bodyColor: isDarkMode ? '#fff' : '#333',
        borderColor: '#FC72FF',
        borderWidth: 1,
        callbacks: {
          label: function(context) {
            return '$' + context.raw + 'M';
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Volume (in millions $)',
          color: '#ffffff',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          drawOnChartArea: true,
          drawTicks: true,
        },
        ticks: {
          color: '#ffffff',
          callback: function(value) {
            return '$' + value + 'M';
          }
        }
      },
      x: {
        title: {
          display: true,
          text: 'Time',
          color: '#ffffff',
        },
        grid: {
          display: false,
          drawBorder: false,
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#ffffff',
          maxTicksLimit: 8, // Only show a subset of ticks for readability
        }
      }
    }
  };

  // Handle timeframe change
  const handleTimeFrameChange = (frame) => {
    setTimeFrame(frame);
    
    let count;
    switch(frame) {
      case '1H':
        count = 12;
        break;
      case '1W':
        count = 7;
        break;
      case '1M':
        count = 30;
        break;
      case '1Y':
        count = 12;
        break;
      default: // 1D
        count = 24;
    }
    
    setChartData({
      labels: frame === '1D' ? generateTimeLabels(count) : generateDateLabels(count, frame),
      datasets: [
        {
          ...chartData.datasets[0],
          data: generateRandomData(count, 5, 25),
        },
      ],
    });
  };

  // If wallet is not connected, show connect prompt
  if (!isConnected) {
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0"> 
          <img
            src="/landscape.png"
            alt="Dashboard Background"
            className={`w-full h-full object-cover transition-opacity duration-1000 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
        </div>
        
        {/* Floating Tokens Background */}
        <FloatingTokens isDarkMode={isDarkMode} />
        
        <div className="relative z-10 w-full max-w-md px-4">
          <div className="card text-center p-8 shadow-lg">
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
      </div>
    );
  }

  // Styles for liquidity pool section
  const styles = {
    page: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '5rem 1rem 1rem 1rem'
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '24px'
    },
    headerContent: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      padding: '16px 24px 0px 24px',
      display: 'inline-block',
      color: '#ffffff'
    },
    headerTitle: {
      marginLeft: '24px'
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      color: '#ffffff'
    },
    versionTag: {
      fontSize: '12px',
      backgroundColor: isDarkMode ?'#F5F5F5' : '#333',
      padding: '2px 8px',
      borderRadius: '4px',
      marginLeft: '8px'
    },
    feeTag: {
      fontSize: '12px',
      color: '#666',
      marginLeft: '8px'
    },
    iconButton: {
      marginLeft: '16px',
      color: '#666',
      background: 'none',
      border: 'none',
      cursor: 'pointer'
    },
    mainContent: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gap: '24px'
    },
    chartContainer: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(5px)',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      padding: '24px',
      color: '#ffffff'
    },
    volumeHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px',
      color: '#ffffff'
    },
    volumeValue: {
      fontSize: '30px',
      fontWeight: 'bold',
      margin: 0,
      color: '#ffffff'
    },
    volumeLabel: {
      fontSize: '14px',
      color: 'rgba(255, 255, 255, 0.8)',
      margin: 0
    },
    timeFrameButtons: {
      display: 'flex',
      gap: '4px'
    },
    timeFrameButton: {
      padding: '4px 12px',
      borderRadius: '6px',
      fontSize: '14px',
      border: 'none',
      cursor: 'pointer',
      background: 'none',
      color: 'rgba(255, 255, 255, 0.7)'
    },
    activeTimeFrameButton: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      fontWeight: '500',
      color: '#ffffff'
    },
    chartWrapper: {
      height: '400px'
    },
    timeMarkers: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '12px',
      color: '#666',
      marginTop: '8px'
    },
    timeMarkersRight: {
      display: 'flex',
      gap: '32px'
    },
    volumeSelector: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '16px',
      paddingTop: '16px',
      borderTop: '1px solid #EEEEEE'
    },
    volumeSelectorButtons: {
      display: 'flex',
      gap: '16px'
    },
    smallButton: {
      fontSize: '12px',
      padding: '4px 8px',
      borderRadius: '4px',
      border: 'none',
      cursor: 'pointer'
    },
    activeSmallButton: {
      backgroundColor: '#F0F0F0'
    },
    dropdownSelector: {
      display: 'flex',
      alignItems: 'center'
    },
    dropdownLabel: {
      fontSize: '14px',
      marginRight: '8px'
    },
    statsContainer: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      color: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      padding: '24px'
    },
    statsTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      marginBottom: '24px',
      color: '#ffffff'
    },
    statLabel: {
      fontSize: '14px',
      color: 'rgba(255, 255, 255, 0.8)',
      marginBottom: '8px'
    },
    poolBalances: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      color: '#ffffff'
    },
    balanceRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    progressBar: {
      height: '8px',
      backgroundColor: '#4C82FB',
      borderRadius: '4px'
    },
    statValue: {
      fontSize: '24px',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center'
    },
    percentageUp: {
      marginLeft: '8px',
      fontSize: '14px',
      color: '#22C55E'
    },
    percentageDown: {
      marginLeft: '8px',
      fontSize: '14px',
      color: '#EF4444'
    },
    walletBalanceSection: {
      marginBottom: '24px',
      borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
      paddingBottom: '20px',
      backgroundColor: 'transparent',
      backdropFilter: 'none'
    },
    walletAddressText: {
      fontSize: '14px',
      color: '#666',
      wordBreak: 'break-all'
    }
  };

  return (
    <div className="dashboard-page relative" style = {{'overflow-y': 'hidden'}}>
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0"> 
        <img
          src="/landscape.png"
          alt="Dashboard Background"
          className={`w-full h-full object-cover transition-opacity duration-1000 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>
      
      <div className="relative z-10">
        
        {/* Liquidity Pool Section */}
        <div style={styles.page}>
          {/* Pool Header */}
          <div style={styles.header}>
            <div style={styles.headerContent}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={styles.headerTitle}>
                  <h1 style={styles.title}>
                    WBTC / ETH
                    <span style={styles.versionTag}>v4</span>
                    <span style={styles.feeTag}>0.05%</span>
                  </h1>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Chart and Stats */}
          <div id="mainContent" style={styles.mainContent}>
            {/* Left Column - Chart */}
            <div>
              <div style={styles.chartContainer} className="bg-transparent">
                {/* Volume Header */}
                <div style={styles.volumeHeader}>
                  <div>
                    <h2 style={styles.volumeValue}>$182.47M</h2>
                    <p style={styles.volumeLabel}>Past day</p>
                  </div>
                  <div style={styles.timeFrameButtons}>
                    <button 
                      style={{
                        ...styles.timeFrameButton,
                        ...(timeFrame === '1H' ? styles.activeTimeFrameButton : {})
                      }}
                      onClick={() => handleTimeFrameChange('1H')}
                    >
                      1H
                    </button>
                    <button 
                      style={{
                        ...styles.timeFrameButton,
                        ...(timeFrame === '1D' ? styles.activeTimeFrameButton : {})
                      }}
                      onClick={() => handleTimeFrameChange('1D')}
                    >
                      1D
                    </button>
                    <button 
                      style={{
                        ...styles.timeFrameButton,
                        ...(timeFrame === '1W' ? styles.activeTimeFrameButton : {})
                      }}
                      onClick={() => handleTimeFrameChange('1W')}
                    >
                      1W
                    </button>
                    <button 
                      style={{
                        ...styles.timeFrameButton,
                        ...(timeFrame === '1M' ? styles.activeTimeFrameButton : {})
                      }}
                      onClick={() => handleTimeFrameChange('1M')}
                    >
                      1M
                    </button>
                    <button 
                      style={{
                        ...styles.timeFrameButton,
                        ...(timeFrame === '1Y' ? styles.activeTimeFrameButton : {})
                      }}
                      onClick={() => handleTimeFrameChange('1Y')}
                    >
                      1Y
                    </button>
                  </div>
                </div>
                
                {/* Chart */}
                <div style={styles.chartWrapper} className="w-full rounded-lg">
                  <Line data={chartData} options={chartOptions} />
                </div>
              </div>
            </div>
            
            {/* Right Column - Wallet Balance and Stats */}
            <div style={styles.statsContainer}>
              {/* Swap Component */}
              <div style={styles.walletBalanceSection}>
                <Swap 
                  isConnected={isConnected}
                  walletAddress={walletAddress}
                  connectWallet={connectWallet}
                  embedded={true}
                />
              </div>
              
              {/* Pool Balances */}
              <div style={styles.statSection}>
                <h3 style={styles.statLabel}>Pool balances</h3>
                <div style={styles.poolBalances}>
                  <div style={styles.balanceRow}>
                    <span>15K WBTC</span>
                    <div style={{ ...styles.progressBar, width: '96px' }}></div>
                  </div>
                  <div style={styles.balanceRow}>
                    <span>86.3K ETH</span>
                    <div style={{ ...styles.progressBar, width: '128px' }}></div>
                  </div>
                </div>
              </div>
              
              {/* TVL */}
              {/* <div style={styles.statSection}>
                <h3 style={styles.statLabel}>TVL</h3>
                <div style={styles.statValue}>
                  <span>$144.3M</span>
                  <span style={styles.percentageDown}>▼ 0.87%</span>
                </div>
              </div> */}
              
              {/* 24H Volume */}
              {/* <div style={styles.statSection}>
                <h3 style={styles.statLabel}>24H volume</h3>
                <div style={styles.statValue}>
                  <span>$182.5M</span>
                  <span style={styles.percentageUp}>▲ 50.34%</span>
                </div>
              </div> */}
              
              {/* 24H Fees */}
              {/* <div style={styles.statSection}>
                <h3 style={styles.statLabel}>24H fees</h3>
                <span style={{ fontSize: '24px', fontWeight: 'bold' }}>$91.2K</span>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
