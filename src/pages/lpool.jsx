import { useState, useEffect } from 'react';
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

const LiquidityPool = ({ isConnected, walletAddress }) => {
  const [timeFrame, setTimeFrame] = useState('1D');
  const [chartData, setChartData] = useState({
    labels: generateTimeLabels(24),
    datasets: [
      {
        label: 'Volume',
        data: generateRandomData(24, 5, 25),
        borderColor: '#FC72FF',
        backgroundColor: 'rgba(252, 114, 255, 0.5)',
        tension: 0.4,
        fill: true,
      },
    ],
  });

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

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(200, 200, 200, 0.1)',
        },
        ticks: {
          callback: function(value) {
            return '$' + value + 'M';
          }
        }
      },
      x: {
        grid: {
          display: false,
        }
      }
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return '$' + context.raw + 'M';
          }
        }
      }
    },
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

  // Define styles
  const styles = {
    page: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '80px 16px'
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '32px'
    },
    tokenIconContainer: {
      position: 'relative',
      marginRight: '8px'
    },
    tokenIcon: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    usdcIcon: {
      backgroundColor: '#E6F0FF',
      color: '#4C82FB',
      fontWeight: 'bold'
    },
    ethIcon: {
      backgroundColor: '#F5F5F5',
      color: '#666',
      fontWeight: 'bold',
      position: 'absolute',
      right: '-16px',
      bottom: '-4px'
    },
    headerTitle: {
      marginLeft: '24px'
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center'
    },
    versionTag: {
      fontSize: '12px',
      backgroundColor: '#F5F5F5',
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
      gridTemplateColumns: '1fr',
      gap: '32px'
    },
    chartContainer: {
      backgroundColor: '#FFFFFF',
      borderRadius: '12px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      padding: '24px'
    },
    volumeHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px'
    },
    volumeValue: {
      fontSize: '30px',
      fontWeight: 'bold',
      margin: 0
    },
    volumeLabel: {
      fontSize: '14px',
      color: '#666',
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
      color: '#666'
    },
    activeTimeFrameButton: {
      backgroundColor: '#F0F0F0',
      fontWeight: '500'
    },
    chartWrapper: {
      height: '256px'
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
      backgroundColor: '#FFFFFF',
      borderRadius: '12px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      padding: '24px'
    },
    statsTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      marginBottom: '24px'
    },
    statSection: {
      marginBottom: '32px'
    },
    statLabel: {
      fontSize: '14px',
      color: '#666',
      marginBottom: '8px'
    },
    poolBalances: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
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
    }
  };

  // Apply media query styles for larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        document.getElementById('mainContent').style.gridTemplateColumns = '2fr 1fr';
      } else {
        document.getElementById('mainContent').style.gridTemplateColumns = '1fr';
      }
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={styles.page}>
      {/* Pool Header */}
      <div style={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={styles.tokenIconContainer}>
            <div style={{ ...styles.tokenIcon, ...styles.usdcIcon }}>
              <span>$</span>
            </div>
          </div>
          <div style={styles.headerTitle}>
            <h1 style={styles.title}>
              WBTC / ETH
              <span style={styles.versionTag}>v3</span>
              <span style={styles.feeTag}>0.05%</span>
              <button style={styles.iconButton}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="1"></circle>
                  <circle cx="19" cy="12" r="1"></circle>
                  <circle cx="5" cy="12" r="1"></circle>
                </svg>
              </button>
              <button style={styles.iconButton}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                  <polyline points="16 6 12 2 8 6"></polyline>
                  <line x1="12" y1="2" x2="12" y2="15"></line>
                </svg>
              </button>
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div id="mainContent" style={styles.mainContent}>
        {/* Left Column - Chart */}
        <div>
          <div style={styles.chartContainer}>
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
            <div style={styles.chartWrapper}>
              <Line data={chartData} options={chartOptions} />
            </div>
            
            {/* Time Markers */}
            <div style={styles.timeMarkers}>
              <span>Mar 28</span>
              <div style={styles.timeMarkersRight}>
                <span>11:52 PM</span>
                <span>2:52 AM</span>
                <span>5:52 AM</span>
                <span>8:52 AM</span>
                <span>11:52 AM</span>
                <span>2:52 PM</span>
                <span>5:52 PM</span>
              </div>
            </div>
            
            {/* Volume Selector */}
            <div style={styles.volumeSelector}>
              <div style={styles.volumeSelectorButtons}>
                <button style={{ ...styles.smallButton, ...styles.activeSmallButton }}>1H</button>
                <button style={styles.smallButton}>1D</button>
                <button style={styles.smallButton}>1W</button>
                <button style={styles.smallButton}>1M</button>
                <button style={styles.smallButton}>1Y</button>
              </div>
              <div style={styles.dropdownSelector}>
                <span style={styles.dropdownLabel}>Volume</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column - Stats */}
        <div style={styles.statsContainer}>
          <h2 style={styles.statsTitle}>Stats</h2>
          
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
          <div style={styles.statSection}>
            <h3 style={styles.statLabel}>TVL</h3>
            <div style={styles.statValue}>
              <span>$144.3M</span>
              <span style={styles.percentageDown}>▼ 0.87%</span>
            </div>
          </div>
          
          {/* 24H Volume */}
          <div style={styles.statSection}>
            <h3 style={styles.statLabel}>24H volume</h3>
            <div style={styles.statValue}>
              <span>$182.5M</span>
              <span style={styles.percentageUp}>▲ 50.34%</span>
            </div>
          </div>
          
          {/* 24H Fees */}
          <div style={styles.statSection}>
            <h3 style={styles.statLabel}>24H fees</h3>
            <span style={{ fontSize: '24px', fontWeight: 'bold' }}>$91.2K</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiquidityPool;